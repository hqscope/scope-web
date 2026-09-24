import { NextRequest, NextResponse } from "next/server";

import {
  copyResponseCookies,
  createRouteHandlerSupabaseClient,
} from "@/lib/supabase/server";
import { sanitizeNextPath } from "@/lib/site";
import { isSameOriginRequest } from "@/lib/http/same-origin";

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const nextPath = sanitizeNextPath(request.nextUrl.searchParams.get("next")) || "/";
  const response = NextResponse.next();
  const supabase = createRouteHandlerSupabaseClient(request, response);

  // scope: 'local' clears only this browser's session, not every device
  // signed in to the account (Lectra included).
  await supabase.auth.signOut({ scope: "local" });

  return copyResponseCookies(
    response,
    NextResponse.redirect(new URL(nextPath, request.url)),
  );
}
