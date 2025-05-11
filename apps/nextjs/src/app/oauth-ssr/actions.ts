"use server";

import { quriaSSR } from "@/lib/quria";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TokenResponse } from "quria";

export async function generateAuthUrl(): Promise<void> {
  const AuthUrl = quriaSSR.oauth.GenerateAuthorizationURL();
  if (!AuthUrl) {
    throw new Error("Failed to generate authorization URL");
  }

  redirect(AuthUrl);
}

export async function getAccessTokenFromCookie(): Promise<TokenResponse | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("oahth_token");

  if (authToken) {
    return JSON.parse(authToken.value);
  }
  return null;
}
