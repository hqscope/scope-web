import { NextRequest, NextResponse } from "next/server";

import {
  getCanvascopeAuthBaseUrl,
  getCanvascopeSessionSecret,
} from "@/lib/server/canvascopeEnv";
import { getCanvascopeSessionFromRequest } from "@/lib/server/canvascopeSession";
import { createLectraLinkToken } from "@/lib/server/lectraTokens";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const baseUrl = getCanvascopeAuthBaseUrl();
  const sessionSecret = getCanvascopeSessionSecret();
  const session = getCanvascopeSessionFromRequest(request, sessionSecret);

  if (!session) {
    const startUrl = new URL("/api/auth/google/start", baseUrl);
    startUrl.searchParams.set("return_to", "/api/integrations/lectra/bootstrap");
    return NextResponse.redirect(startUrl);
  }

  const linkToken = createLectraLinkToken(session, sessionSecret);
  const deepLinkUrl = `lectra://auth/canvascope?linkToken=${encodeURIComponent(linkToken)}`;

  return NextResponse.redirect(deepLinkUrl);
}
