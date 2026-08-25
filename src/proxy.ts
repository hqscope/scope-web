import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

import { getSupabaseConfig } from "@/lib/supabase/config";
import { copyResponseCookies } from "@/lib/supabase/server";
import { sanitizeNextPath } from "@/lib/site";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // The student workspace under /app is gone; the internal admin dashboard is
  // all that is left there. Gating on /app/admin rather than /app means the
  // retired workspace paths 404 outright instead of bouncing signed-out
  // visitors to a login for something that no longer exists.
  const isAppRoute = pathname.startsWith("/app/admin");
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
      callbackUrl.searchParams.set("next", "/");
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

  // Nothing under /app is reachable to an ordinary account any more — the only
  // page left there gates on admin membership — so a signed-in visitor who
  // lands back on /login goes to the marketing home. Admins arrive at the
  // dashboard through the `next` parameter set by the gate above.
  if (isLoginRoute && user) {
    return copyResponseCookies(
      supabaseResponse,
      NextResponse.redirect(new URL("/", request.url)),
    );
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
