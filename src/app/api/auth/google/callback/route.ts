import { NextRequest, NextResponse } from "next/server";

import {
  getCanvascopeAuthBaseUrl,
  getCanvascopeSessionSecret,
  getGoogleOAuthConfig,
  isProduction,
} from "@/lib/server/canvascopeEnv";
import {
  CANVASCOPE_OAUTH_COOKIE,
  clearOAuthStateCookie,
  createCanvascopeSessionToken,
  parseGoogleOAuthStateToken,
  sanitizeReturnPath,
  setSessionCookie,
} from "@/lib/server/canvascopeSession";

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
  id_token?: string;
}

interface GoogleUserProfile {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
}

function jsonError(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const sessionSecret = getCanvascopeSessionSecret();
  const googleConfig = getGoogleOAuthConfig();
  const oauthToken = request.cookies.get(CANVASCOPE_OAUTH_COOKIE)?.value;

  if (!oauthToken) {
    return jsonError("Missing OAuth state cookie.", 400);
  }

  const savedState = parseGoogleOAuthStateToken(oauthToken, sessionSecret);
  if (!savedState) {
    return jsonError("Invalid OAuth state token.", 400);
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const googleError = request.nextUrl.searchParams.get("error");

  if (googleError) {
    return jsonError(`Google OAuth returned error: ${googleError}`, 400);
  }

  if (!code || !state) {
    return jsonError("Missing OAuth callback parameters.", 400);
  }

  if (state !== savedState.state) {
    return jsonError("OAuth state mismatch.", 400);
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: googleConfig.clientId,
      client_secret: googleConfig.clientSecret,
      redirect_uri: googleConfig.redirectUri,
      grant_type: "authorization_code",
      code_verifier: savedState.codeVerifier,
    }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    const details = await tokenResponse.text();
    return jsonError(`Google token exchange failed: ${details}`, 502);
  }

  const tokenPayload = (await tokenResponse.json()) as Partial<GoogleTokenResponse>;
  const accessToken = tokenPayload.access_token;

  if (!accessToken || typeof accessToken !== "string") {
    return jsonError("Google token response missing access_token.", 502);
  }

  const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!profileResponse.ok) {
    const details = await profileResponse.text();
    return jsonError(`Failed to fetch Google profile: ${details}`, 502);
  }

  const profilePayload = (await profileResponse.json()) as Partial<GoogleUserProfile>;
  if (
    !profilePayload.sub ||
    typeof profilePayload.sub !== "string" ||
    !profilePayload.email ||
    typeof profilePayload.email !== "string"
  ) {
    return jsonError("Google profile response missing required fields.", 502);
  }

  const sessionToken = createCanvascopeSessionToken(
    {
      sub: profilePayload.sub,
      email: profilePayload.email,
      name: typeof profilePayload.name === "string" ? profilePayload.name : undefined,
      picture:
        typeof profilePayload.picture === "string" ? profilePayload.picture : undefined,
    },
    sessionSecret,
  );

  const returnTo = sanitizeReturnPath(savedState.returnTo ?? null) ?? "/";
  const redirectUrl = new URL(returnTo, getCanvascopeAuthBaseUrl());

  const response = NextResponse.redirect(redirectUrl);
  setSessionCookie(response, sessionToken, isProduction());
  clearOAuthStateCookie(response, isProduction());
  return response;
}
