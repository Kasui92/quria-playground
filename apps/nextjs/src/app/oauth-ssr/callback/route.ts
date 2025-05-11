import { quriaSSR } from "@/lib/quria";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Extract the code from the request URL
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    // Check if the code is present
    if (!code) {
      throw new Error("Code not found");
    }

    // Call the OAuth function to get the access token
    const response = await quriaSSR.oauth.GetOAuthAccessToken(code);
    console.log("Response from OAuth server:", response);

    if ("access_token" in response) {
      // Istanzio un redirect verso oauth-ssr
      const res = NextResponse.redirect(new URL("/oauth-ssr", request.url));
      res.cookies.set({
        name: "oahth_token",
        value: JSON.stringify(response),
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });

      return res;
    }

    throw new Error("Invalid response from OAuth server");
  } catch (error) {
    console.error("Error during OAuth callback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
