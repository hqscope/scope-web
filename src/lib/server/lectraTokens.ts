import { createSignedToken, verifySignedToken } from "@/lib/server/signedToken";
import type { CanvascopeSession } from "@/lib/server/canvascopeSession";

export interface LectraLinkTokenPayload {
  aud: "lectra-link";
  sub: string;
  email: string;
  name?: string;
  scopes: string[];
  iat: number;
  exp: number;
}

export interface LectraAccessTokenPayload {
  aud: "lectra-reminder-api";
  sub: string;
  email: string;
  source: "lectra";
  deviceId?: string;
  scopes: string[];
  iat: number;
  exp: number;
}

export interface ExchangedLectraToken {
  token: string;
  payload: LectraAccessTokenPayload;
}

function hasStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isValidLinkPayload(value: unknown): value is LectraLinkTokenPayload {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const payload = value as Record<string, unknown>;

  return (
    payload.aud === "lectra-link" &&
    typeof payload.sub === "string" &&
    typeof payload.email === "string" &&
    hasStringArray(payload.scopes)
  );
}

function isValidAccessPayload(value: unknown): value is LectraAccessTokenPayload {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const payload = value as Record<string, unknown>;

  return (
    payload.aud === "lectra-reminder-api" &&
    typeof payload.sub === "string" &&
    typeof payload.email === "string" &&
    payload.source === "lectra" &&
    hasStringArray(payload.scopes)
  );
}

export function createLectraLinkToken(
  session: CanvascopeSession,
  sessionSecret: string,
): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: LectraLinkTokenPayload = {
    aud: "lectra-link",
    sub: session.sub,
    email: session.email,
    name: session.name,
    scopes: ["reminders:write", "reminders:read"],
    iat: now,
    exp: now + 60 * 5,
  };

  return createSignedToken(payload, sessionSecret);
}

export function exchangeLectraLinkToken(
  linkToken: string,
  sessionSecret: string,
  deviceId?: string,
): ExchangedLectraToken | null {
  const parsed = verifySignedToken<LectraLinkTokenPayload>(linkToken, sessionSecret);
  if (!parsed || !isValidLinkPayload(parsed)) {
    return null;
  }

  if (!parsed.scopes.includes("reminders:write")) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: LectraAccessTokenPayload = {
    aud: "lectra-reminder-api",
    sub: parsed.sub,
    email: parsed.email,
    source: "lectra",
    deviceId,
    scopes: parsed.scopes,
    iat: now,
    exp: now + 60 * 60 * 24 * 30,
  };

  return {
    token: createSignedToken(payload, sessionSecret),
    payload,
  };
}

export function parseLectraAccessToken(
  token: string,
  sessionSecret: string,
): LectraAccessTokenPayload | null {
  const parsed = verifySignedToken<LectraAccessTokenPayload>(token, sessionSecret);
  return parsed && isValidAccessPayload(parsed) ? parsed : null;
}

export function getBearerToken(authorizationHeader: string | null): string | null {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (!scheme || !token || scheme.toLowerCase() !== "bearer") {
    return null;
  }

  return token;
}
