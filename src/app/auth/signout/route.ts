import { NextRequest, NextResponse } from "next/server";

import {
  copyResponseCookies,
  createRouteHandlerSupabaseClient,
} from "@/lib/supabase/server";
import { sanitizeNextPath } from "@/lib/site";

async function performSignOut(request: NextRequest): Promise<NextResponse> {
  const nextPath = sanitizeNextPath(request.nextUrl.searchParams.get("next")) || "/";
  const response = NextResponse.next();
  const supabase = createRouteHandlerSupabaseClient(request, response);

  await supabase.auth.signOut();

  return copyResponseCookies(
    response,
    NextResponse.redirect(new URL(nextPath, request.url)),
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return performSignOut(request);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return performSignOut(request);
}
