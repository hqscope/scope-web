import { NextRequest, NextResponse } from "next/server";

import { getCanvascopeSessionSecret } from "@/lib/server/canvascopeEnv";
import { exchangeLectraLinkToken } from "@/lib/server/lectraTokens";

interface ExchangeRequest {
  linkToken?: string;
  deviceId?: string;
}

function parseExchangeRequest(value: unknown): ExchangeRequest {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return {};
  }

  const payload = value as Record<string, unknown>;

  return {
    linkToken: typeof payload.linkToken === "string" ? payload.linkToken : undefined,
    deviceId: typeof payload.deviceId === "string" ? payload.deviceId : undefined,
  };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const sessionSecret = getCanvascopeSessionSecret();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseExchangeRequest(body);

  if (!parsed.linkToken) {
    return NextResponse.json({ error: "linkToken is required." }, { status: 400 });
  }

  const exchanged = exchangeLectraLinkToken(
    parsed.linkToken,
    sessionSecret,
    parsed.deviceId,
  );

  if (!exchanged) {
    return NextResponse.json({ error: "Invalid or expired link token." }, { status: 401 });
  }

  return NextResponse.json({
    accessToken: exchanged.token,
    tokenType: "Bearer",
    expiresAt: new Date(exchanged.payload.exp * 1000).toISOString(),
    scopes: exchanged.payload.scopes,
  });
}
