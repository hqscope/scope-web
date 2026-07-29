import { NextRequest, NextResponse } from "next/server";

import { getCanvascopeSessionSecret } from "@/lib/server/canvascopeEnv";
import { getCanvascopeSessionFromRequest } from "@/lib/server/canvascopeSession";
import {
  copyResponseCookies,
  createRouteHandlerSupabaseClient,
} from "@/lib/supabase/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const supabaseResponse = NextResponse.next();
  const supabase = createRouteHandlerSupabaseClient(request, supabaseResponse);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const metadata = user.user_metadata ?? {};
    return copyResponseCookies(
      supabaseResponse,
      NextResponse.json({
        authenticated: true,
        provider: "supabase",
        user: {
          sub: user.id,
          email: user.email,
          name:
            (typeof metadata.full_name === "string" && metadata.full_name) ||
            (typeof metadata.name === "string" && metadata.name) ||
            null,
          picture:
            typeof metadata.avatar_url === "string" ? metadata.avatar_url : null,
        },
      }),
    );
  }

  const sessionSecret = getCanvascopeSessionSecret();
  const session = getCanvascopeSessionFromRequest(request, sessionSecret);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return copyResponseCookies(
    supabaseResponse,
    NextResponse.json({
      authenticated: true,
      provider: "legacy",
      user: {
        sub: session.sub,
        email: session.email,
        name: session.name,
        picture: session.picture,
        scopes: session.scopes,
        expiresAt: new Date(session.exp * 1000).toISOString(),
      },
    }),
  );
}
