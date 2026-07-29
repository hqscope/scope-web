import { NextRequest, NextResponse } from "next/server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import {
  copyResponseCookies,
  createRouteHandlerSupabaseClient,
} from "@/lib/supabase/server";

const BUCKET_NAME = "lectra_documents";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeObjectPath(path: string): string {
  return path
    .replace(new RegExp(`^${BUCKET_NAME}/`), "")
    .replace(/^\/+/, "");
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ documentId: string }> },
): Promise<NextResponse> {
  const { documentId } = await context.params;
  const variant = request.nextUrl.searchParams.get("variant");
  const response = NextResponse.next();
  const supabase = createRouteHandlerSupabaseClient(request, response);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return copyResponseCookies(
      response,
      NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    );
  }

  if (variant !== "original" && variant !== "annotated") {
    return copyResponseCookies(
      response,
      NextResponse.json({ error: "Invalid file variant." }, { status: 400 }),
    );
  }

  const { data, error } = await supabase
    .from("synced_items")
    .select("id, item_data")
    .eq("id", documentId)
    .eq("item_type", "pdf_document")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data || !isRecord(data.item_data)) {
    return copyResponseCookies(
      response,
      NextResponse.json({ error: "Document not found." }, { status: 404 }),
    );
  }

  const rawPath =
    variant === "annotated"
      ? data.item_data.annotatedStoragePath
      : data.item_data.storagePath;

  if (typeof rawPath !== "string" || !rawPath.trim()) {
    return copyResponseCookies(
      response,
      NextResponse.json({ error: "File not available." }, { status: 404 }),
    );
  }

  const objectPath = normalizeObjectPath(rawPath.trim());
  let signedUrl: string | null = null;

  const userClientResult = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(objectPath, 60);

  if (!userClientResult.error && userClientResult.data?.signedUrl) {
    signedUrl = userClientResult.data.signedUrl;
  } else {
    const admin = createAdminSupabaseClient();
    if (admin) {
      const adminResult = await admin.storage
        .from(BUCKET_NAME)
        .createSignedUrl(objectPath, 60);
      if (!adminResult.error && adminResult.data?.signedUrl) {
        signedUrl = adminResult.data.signedUrl;
      }
    }
  }

  if (!signedUrl) {
    return copyResponseCookies(
      response,
      NextResponse.json(
        { error: "Unable to create signed file URL." },
        { status: 502 },
      ),
    );
  }

  return copyResponseCookies(
    response,
    NextResponse.redirect(signedUrl),
  );
}
