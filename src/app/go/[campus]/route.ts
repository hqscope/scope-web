import { after, type NextRequest, NextResponse } from "next/server";

import { campusLandingPath, findCampusLink } from "@/lib/campus-links";
import {
  deviceFromUserAgent,
  isLikelyHuman,
  recordCampusLinkScan,
} from "@/lib/data/campusLinkScans";

export const runtime = "nodejs";
// Every visit has to reach this function to be counted; nothing may cache it.
export const dynamic = "force-dynamic";

/**
 * The printed campus link: www.canvascope.org/go/<campus>. Counts the visit,
 * then sends the visitor to that campus's landing page. The count is written
 * after the redirect goes out, so a slow or failed write never delays or
 * blocks the page.
 *
 * Unknown slugs (a typo off a flyer) land on the generic page uncounted.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ campus: string }> },
): Promise<NextResponse> {
  const { campus: rawCampus } = await params;
  const campus = findCampusLink(rawCampus);

  const destination = new URL(campus ? campusLandingPath(campus) : "/start", request.url);
  const response = NextResponse.redirect(destination, 307);
  response.headers.set("Cache-Control", "no-store");

  const userAgent = request.headers.get("user-agent");
  // Browsers send Sec-Purpose (older ones Purpose) on speculative prefetches,
  // such as Chrome loading a page while the address is still being typed.
  const purpose = `${request.headers.get("sec-purpose") ?? ""} ${request.headers.get("purpose") ?? ""}`;
  const isPrefetch = /prefetch|prerender/i.test(purpose);

  // Next answers HEAD with this handler too; a HEAD is a link checker, not a scan.
  if (campus && request.method === "GET" && !isPrefetch && isLikelyHuman(userAgent)) {
    const device = deviceFromUserAgent(userAgent ?? "");
    after(() => recordCampusLinkScan(campus.slug, device));
  }

  return response;
}
