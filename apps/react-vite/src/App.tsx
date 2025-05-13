import { quriaCSR } from "./lib/quria";
import { type TokenResponse } from "quria";
import clsx from "clsx";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import {
  Block,
  BlockCode,
  BlockContent,
  BlockKey,
  BlockSeparator,
  BlockTitle,
  BlockValue,
} from "./components/block";

function App() {
  const [searchParams] = useSearchParams();

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
    <main className="max-w-5xl mx-auto px-5 pt-16 md:pt-18 lg:pt-20">
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
              <Block>
                <BlockTitle>OAuth Code:</BlockTitle>
                <BlockValue>{oauthCode}</BlockValue>
              </Block>
            )}
            {oauthState && (
              <Block>
                <BlockTitle>OAuth Response:</BlockTitle>
                <BlockContent>
                  {Object.entries(oauthState).map(([key, value]) => (
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
    </main>
  );
}

export default App;
