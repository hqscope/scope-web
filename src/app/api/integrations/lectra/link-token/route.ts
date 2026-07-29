import { NextRequest, NextResponse } from "next/server";

import { getCanvascopeSessionSecret } from "@/lib/server/canvascopeEnv";
import { getCanvascopeSessionFromRequest } from "@/lib/server/canvascopeSession";
import { createLectraLinkToken } from "@/lib/server/lectraTokens";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const sessionSecret = getCanvascopeSessionSecret();
  const session = getCanvascopeSessionFromRequest(request, sessionSecret);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = createLectraLinkToken(session, sessionSecret);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  return NextResponse.json({
    linkToken: token,
    expiresAt,
    deepLinkUrl: `lectra://auth/canvascope?linkToken=${encodeURIComponent(token)}`,
  });
}
