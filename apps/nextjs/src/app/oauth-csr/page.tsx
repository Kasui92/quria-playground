"use client";

import { quriaCSR } from "@/lib/quria";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { PageHead } from "@/components/page";
import { TokenResponse } from "quria";
import clsx from "clsx";

export default function BtoaCSR() {
  const searchParams = useSearchParams();

  const [generating, setGenerating] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [oauthCode, setOAuthCode] = useState<string>("");
  const [oauthState, setOAuthState] = useState<TokenResponse | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      const code = searchParams.get("code");

      // Save the code to state if it exists
      if (code) {
        setOAuthCode(code);

        // Remove the code from URL immediately
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        window.history.replaceState({}, document.title, url.toString());

        setAuthenticating(true);

        try {
          const response = await quriaCSR.oauth.GetOAuthAccessToken(code);

          if ("access_token" in response) {
            setOAuthState(response);
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
      } else {
        // Clear the oauth code if no code is provided
        setOAuthCode("");
      }
    };

    handleAuthCallback();
  }, [searchParams]);

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
            {oauthCode && oauthCode !== "" && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg text-green-400 font-mono overflow-x-auto w-full">
                <div className="text-sm text-gray-400 mb-1">OAuth Code:</div>
                <code className="break-all">{oauthCode}</code>
              </div>
            )}
            {oauthState && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg font-mono overflow-x-auto w-full">
                <div className="text-sm text-gray-400 mb-1">
                  OAuth Response:
                </div>
                <pre className="overflow-auto max-h-96 w-full bg-gray-900 rounded-lg p-4">
                  <code className="break-all whitespace-pre-wrap">
                    {Object.entries(oauthState).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-pink-400">{`"${key}"`}</span>
                        <span className="text-gray-400">: </span>
                        <span className="text-green-400">
                          {typeof value === "string"
                            ? `"${value}"`
                            : typeof value === "object" && value !== null
                              ? JSON.stringify(value, null, 2)
                              : String(value)}
                        </span>
                        <span className="text-gray-400">,</span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
