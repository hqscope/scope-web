import type { NextRequest, NextResponse } from "next/server";

import { verifySignedToken, createSignedToken } from "@/lib/server/signedToken";

export const CANVASCOPE_SESSION_COOKIE = "canvascope_session";
export const CANVASCOPE_OAUTH_COOKIE = "canvascope_oauth_state";

export interface CanvascopeSession {
  aud: "canvascope-session";
  sub: string;
  email: string;
  name?: string;
  picture?: string;
  scopes: string[];
  iat: number;
  exp: number;
}

export interface GoogleOAuthState {
  aud: "google-oauth-state";
  state: string;
  codeVerifier: string;
  returnTo?: string;
  iat: number;
  exp: number;
}

interface SessionInput {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
}

function isValidSessionPayload(value: unknown): value is CanvascopeSession {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const payload = value as Record<string, unknown>;

  return (
    payload.aud === "canvascope-session" &&
    typeof payload.sub === "string" &&
    typeof payload.email === "string" &&
    Array.isArray(payload.scopes)
  );
}

function isValidOAuthPayload(value: unknown): value is GoogleOAuthState {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const payload = value as Record<string, unknown>;

  return (
    payload.aud === "google-oauth-state" &&
    typeof payload.state === "string" &&
    typeof payload.codeVerifier === "string"
  );
}

export function createCanvascopeSessionToken(
  input: SessionInput,
  sessionSecret: string,
): string {
  const now = Math.floor(Date.now() / 1000);
  const thirtyDaysSeconds = 60 * 60 * 24 * 30;

  const payload: CanvascopeSession = {
    aud: "canvascope-session",
    sub: input.sub,
    email: input.email,
    name: input.name,
    picture: input.picture,
    scopes: ["lectra:link", "reminders:write"],
    iat: now,
    exp: now + thirtyDaysSeconds,
  };

  return createSignedToken(payload, sessionSecret);
}

export function parseCanvascopeSessionToken(
  token: string,
  sessionSecret: string,
): CanvascopeSession | null {
  const parsed = verifySignedToken<CanvascopeSession>(token, sessionSecret);
  return parsed && isValidSessionPayload(parsed) ? parsed : null;
}

export function createGoogleOAuthStateToken(
  state: string,
  codeVerifier: string,
  sessionSecret: string,
  returnTo?: string,
): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: GoogleOAuthState = {
    aud: "google-oauth-state",
    state,
    codeVerifier,
    returnTo,
    iat: now,
    exp: now + 600,
  };

  return createSignedToken(payload, sessionSecret);
}

export function parseGoogleOAuthStateToken(
  token: string,
  sessionSecret: string,
): GoogleOAuthState | null {
  const parsed = verifySignedToken<GoogleOAuthState>(token, sessionSecret);
  return parsed && isValidOAuthPayload(parsed) ? parsed : null;
}

export function getCanvascopeSessionFromRequest(
  request: NextRequest,
  sessionSecret: string,
): CanvascopeSession | null {
  const token = request.cookies.get(CANVASCOPE_SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  return parseCanvascopeSessionToken(token, sessionSecret);
}

export function setSessionCookie(
  response: NextResponse,
  token: string,
  isProduction: boolean,
): void {
  response.cookies.set({
    name: CANVASCOPE_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearSessionCookie(
  response: NextResponse,
  isProduction: boolean,
): void {
  response.cookies.set({
    name: CANVASCOPE_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function setOAuthStateCookie(
  response: NextResponse,
  token: string,
  isProduction: boolean,
): void {
  response.cookies.set({
    name: CANVASCOPE_OAUTH_COOKIE,
    value: token,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
}

export function clearOAuthStateCookie(
  response: NextResponse,
  isProduction: boolean,
): void {
  response.cookies.set({
    name: CANVASCOPE_OAUTH_COOKIE,
    value: "",
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function sanitizeReturnPath(raw: string | null): string | undefined {
  if (!raw) {
    return undefined;
  }

  if (!raw.startsWith("/") || raw.startsWith("//")) {
    return undefined;
  }

  return raw;
}
