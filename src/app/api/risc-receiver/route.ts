import { NextRequest } from "next/server";

/**
 * Cross-Account Protection (RISC) delivery endpoint.
 *
 * Google requires the RISC receiver to live on a domain that's a verified
 * Authorized Domain on the OAuth project (canvascope.org is), not on
 * *.supabase.co. This route is a thin reverse proxy: it forwards Google's
 * signed Security Event Token to the Supabase `risc-receiver` edge function,
 * which performs all validation and session revocation, and passes the
 * upstream status straight back (400 = invalid token, 202 = accepted).
 *
 * Register this URL with Google, e.g.
 *   https://medmatch.canvascope.org/api/risc-receiver
 */

const RISC_FUNCTION_URL =
  "https://vcadcdgnwxjlgaoqktkd.supabase.co/functions/v1/risc-receiver";

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.text();

  const upstream = await fetch(RISC_FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type":
        request.headers.get("content-type") ?? "application/secevent+jwt",
    },
    body,
  });

  // Pass the edge function's status/body through unchanged.
  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: { "Content-Type": "text/plain" },
  });
}
