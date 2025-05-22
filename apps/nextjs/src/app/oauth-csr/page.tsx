"use client";

import { quriaCSR } from "@/lib/quria";
import { TokenResponse } from "quria";
import clsx from "clsx";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { PageHead } from "@/components/page";

import {
  Block,
  BlockCode,
  BlockContent,
  BlockKey,
  BlockSeparator,
  BlockTitle,
  BlockValue,
} from "@/components/block";

interface OAuthState {
  code: string;
  state?: TokenResponse;
}

export default function BtoaCSR() {
  const searchParams = useSearchParams();

  const [generating, setGenerating] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const [oauthState, setOAuthState] = useState<OAuthState | null>(null);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const handleCode = () => {
      const code = searchParams.get("code");

      // Save the code to state if it exists
      if (code) {
        setCode(code);
      }
      // Clear the code if no code is provided
      else {
        setCode("");
      }
    };

    handleCode();
  }, [searchParams]);

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Save the code to state if it exists
      if (code) {
        setAuthenticating(true);

        try {
          const response = await quriaCSR.oauth.GetOAuthAccessToken(code);

          if ("access_token" in response) {
            setOAuthState({
              code: code,
              state: response,
            });
          } else {
            console.error("Error in authentication:", response);
            setOAuthState(null);
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          setOAuthState(null);
        } finally {
          setAuthenticating(false);
        }
      }
    };

    handleAuthCallback();
  }, [code]);

  const handleAuthenticate = async () => {
    try {
      setGenerating(true);
      const AuthUrl = quriaCSR.oauth.GenerateAuthorizationURL();
      if (!AuthUrl) {
        console.error("Error generating authorization URL");
        return;
      }

      window.location.href = AuthUrl;
    } catch (error) {
      console.error("Error during authentication:", error);
      setGenerating(false);
    }
  };

  return (
    <>
      <PageHead />
      <div className="flex flex-col items-center justify-center mt-8 mb-12">
        <button
          onClick={handleAuthenticate}
          className={clsx(
            "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out cursor-pointer",
            "flex items-center justify-center",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
          disabled={authenticating || generating}
        >
          {generating ? (
            <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent" />
          ) : (
            <span className="text-sm">Authenticate</span>
          )}
        </button>
        {authenticating ? (
          <div className="flex items-center justify-center mt-24">
            <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent mr-3"></div>
            <span className="text-sm">Authenticating...</span>
          </div>
        ) : (
          <div className="mt-16 w-full max-w-2xl">
            {oauthState?.code && oauthState?.code !== "" && (
              <Block>
                <BlockTitle>OAuth Code:</BlockTitle>
                <BlockValue>{oauthState?.code}</BlockValue>
              </Block>
            )}
            {oauthState?.state && (
              <Block>
                <BlockTitle>OAuth Response:</BlockTitle>
                <BlockContent>
                  {Object.entries(oauthState?.state).map(([key, value]) => (
                    <div key={key}>
                      <BlockCode>
                        <BlockKey>{key}</BlockKey>
                        <BlockValue>{value}</BlockValue>
                        <BlockSeparator />
                      </BlockCode>
                    </div>
                  ))}
                </BlockContent>
              </Block>
            )}
          </div>
        )}
      </div>
    </>
  );
}
