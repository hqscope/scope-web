import { NextResponse } from "next/server";

import { getAdminUser } from "@/lib/auth/admin";
import { getActivitySnapshot } from "@/lib/data/activity";

// Always fresh: the whole point of this endpoint is the live count.
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  const admin = await getAdminUser();
  if (!admin) {
    // 404 rather than 403, matching the page: an internal endpoint should not
    // confirm it exists to someone who cannot use it.
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const snapshot = await getActivitySnapshot();
  return NextResponse.json(snapshot, {
    headers: { "Cache-Control": "no-store" },
  });
}
