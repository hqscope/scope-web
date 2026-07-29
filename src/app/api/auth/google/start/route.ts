import { createHash, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import {
  getCanvascopeSessionSecret,
  getGoogleOAuthConfig,
  isProduction,
} from "@/lib/server/canvascopeEnv";
import {
  createGoogleOAuthStateToken,
  sanitizeReturnPath,
  setOAuthStateCookie,
} from "@/lib/server/canvascopeSession";

function buildCodeChallenge(verifier: string): string {
  return createHash("sha256").update(verifier).digest("base64url");
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const googleConfig = getGoogleOAuthConfig();
  const sessionSecret = getCanvascopeSessionSecret();

  const state = randomBytes(16).toString("base64url");
  const codeVerifier = randomBytes(32).toString("base64url");
  const codeChallenge = buildCodeChallenge(codeVerifier);
  const returnTo = sanitizeReturnPath(request.nextUrl.searchParams.get("return_to"));

  const oauthStateToken = createGoogleOAuthStateToken(
    state,
    codeVerifier,
    sessionSecret,
    returnTo,
  );

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", googleConfig.clientId);
  authUrl.searchParams.set("redirect_uri", googleConfig.redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("code_challenge", codeChallenge);
  authUrl.searchParams.set("code_challenge_method", "S256");
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");

  const response = NextResponse.redirect(authUrl);
  setOAuthStateCookie(response, oauthStateToken, isProduction());
  return response;
}
