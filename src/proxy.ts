import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

import { getSupabaseConfig } from "@/lib/supabase/config";
import { copyResponseCookies } from "@/lib/supabase/server";
import { createFailFastAuthFetch } from "@/lib/supabase/fail-fast-auth-fetch";
import { sanitizeNextPath } from "@/lib/site";
import { AUTH_UNREACHABLE_HEADER, isAuthOutage } from "@/lib/auth/outage";

// An expired session during an auth outage used to hold every /login and
// /app/admin request for ~26 s while auth-js retried the refresh (P-36).
const failFastAuthFetch = createFailFastAuthFetch();

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

  // Only this proxy may say auth is unreachable.
  request.headers.delete(AUTH_UNREACHABLE_HEADER);

  // `setAll` below rewrites the request's cookies. Keep what the browser sent,
  // so an outage can pass it on untouched.
  const originalCookieHeader = request.headers.get("cookie");

  let supabaseResponse = NextResponse.next({
    request,
  });
  const { url, anonKey } = getSupabaseConfig();
  const supabase = createServerClient(url, anonKey, {
    global: { fetch: failFastAuthFetch },
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
    error,
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

  if (isAuthOutage(error)) {
    // We couldn't confirm the session — a 5xx, a 402 (over quota) or a
    // network failure, not GoTrue saying the session is invalid. A failed
    // refresh in this state may have already queued cookie-clearing writes
    // on `supabaseResponse` and emptied the cookies on `request`; drop the
    // former and pass on the cookies the browser actually sent, so an outage
    // never redirects to /login or wipes the session. The destination page
    // shows its own retry state, told not to try auth a second time.
    const headers = new Headers(request.headers);
    if (originalCookieHeader === null) {
      headers.delete("cookie");
    } else {
      headers.set("cookie", originalCookieHeader);
    }
    headers.set(AUTH_UNREACHABLE_HEADER, "1");
    return NextResponse.next({ request: { headers } });
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

  // A signed-in visitor can still land on /login (a bookmark, the back
  // button, a stale tab). Previously this silently bounced to the marketing
  // home with no sign of what happened; now /login itself checks the
  // session and renders a "you're signed in" state instead, so leave the
  // route alone here.

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
