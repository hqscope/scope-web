import { NextRequest, NextResponse } from "next/server";

import { clearSessionCookie } from "@/lib/server/canvascopeSession";
import { isProduction } from "@/lib/server/canvascopeEnv";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.json({ ok: true });
  const supabase = createRouteHandlerSupabaseClient(request, response);

  await supabase.auth.signOut();
  clearSessionCookie(response, isProduction());
  return response;
}
