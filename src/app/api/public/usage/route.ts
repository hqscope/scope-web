import { NextResponse } from "next/server";

import {
  APPLE_ACCOUNTS,
  EXTENSION_USERS,
  LIVE_USERS,
  VERIFIED_ON,
} from "@/lib/usage";

export const runtime = "nodejs";

/**
 * The public user count, in the shape noelsason.com already fetches:
 * `{ combined, extensionUsers, appleAccounts }`.
 *
 * Public and unauthenticated on purpose — these three integers are the same
 * ones printed on the home page, so there is nothing here to gate. It is
 * served cross-origin (see CORS below) because the consumer is a different
 * site; keep the key names stable, that page reads them by name.
 */

// Any origin: the payload is three numbers already published on the home
// page, and the endpoint is a plain GET with no cookies, no credentials, and
// nothing to write. Pinning this to noelsason.com would only mean editing a
// deploy every time the number gets quoted somewhere else.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
} as const;

// The counts are compile-time constants, so let the CDN hold the response for
// an hour and keep serving the old one while it revalidates. A deploy is what
// changes the number, and a deploy busts the cache.
const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
} as const;

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      combined: LIVE_USERS,
      extensionUsers: EXTENSION_USERS,
      appleAccounts: APPLE_ACCOUNTS,
      verifiedOn: VERIFIED_ON,
    },
    { headers: { ...CORS_HEADERS, ...CACHE_HEADERS } },
  );
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
