import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

import { getSupabaseConfig } from "@/lib/supabase/config";
import { copyResponseCookies } from "@/lib/supabase/server";
import { sanitizeNextPath } from "@/lib/site";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAppRoute = pathname.startsWith("/app");
  const isLoginRoute = pathname === "/login";
  const hasAuthCode = request.nextUrl.searchParams.has("code");

  // Public marketing routes have no auth gating, so skip the Supabase session
  // round-trip entirely. This keeps the homepage and product pages from
  // hanging when Supabase is unreachable or unconfigured.
  if (!isAppRoute && !isLoginRoute && !hasAuthCode) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({
    request,
  });
  const { url, anonKey } = getSupabaseConfig();
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        supabaseResponse = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (hasAuthCode && pathname !== "/auth/callback") {
    const callbackUrl = request.nextUrl.clone();
    callbackUrl.pathname = "/auth/callback";

    if (!callbackUrl.searchParams.has("next")) {
      callbackUrl.searchParams.set("next", "/app");
    }

    return copyResponseCookies(
      supabaseResponse,
      NextResponse.redirect(callbackUrl),
    );
  }

  if (isAppRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set(
      "next",
      sanitizeNextPath(`${pathname}${request.nextUrl.search}`),
    );

    return copyResponseCookies(
      supabaseResponse,
      NextResponse.redirect(loginUrl),
    );
  }

  if (isLoginRoute && user) {
    return copyResponseCookies(
      supabaseResponse,
      NextResponse.redirect(new URL("/app", request.url)),
    );
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
