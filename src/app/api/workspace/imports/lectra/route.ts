import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import {
  copyResponseCookies,
  createRouteHandlerSupabaseClient,
} from "@/lib/supabase/server";

const BUCKET_NAME = "lectra_documents";
const MAX_FILE_BYTES = 25 * 1024 * 1024;

function parseCourseId(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function isPdfSignature(bytes: Uint8Array): boolean {
  if (bytes.length < 5) {
    return false;
  }

  return (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d
  );
}

function buildStoragePath(userId: string, rowId: string, date = new Date()): string {
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${userId}/lectra_documents/imported_from_canvascope/${year}/${month}/${rowId}.pdf`;
}

async function uploadWithFallback(
  requestClient: ReturnType<typeof createRouteHandlerSupabaseClient>,
  path: string,
  body: Uint8Array,
) {
  const result = await requestClient.storage
    .from(BUCKET_NAME)
    .upload(path, body, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (!result.error) {
    return { error: null };
  }

  const admin = createAdminSupabaseClient();
  if (!admin) {
    return { error: result.error.message };
  }

  const adminResult = await admin.storage
    .from(BUCKET_NAME)
    .upload(path, body, {
      contentType: "application/pdf",
      upsert: false,
    });

  return { error: adminResult.error?.message ?? null };
}

async function removeWithFallback(
  requestClient: ReturnType<typeof createRouteHandlerSupabaseClient>,
  path: string,
) {
  const userResult = await requestClient.storage.from(BUCKET_NAME).remove([path]);
  if (!userResult.error) {
    return;
  }

  const admin = createAdminSupabaseClient();
  if (!admin) {
    return;
  }

  await admin.storage.from(BUCKET_NAME).remove([path]);
}

async function insertDocumentRow(
  requestClient: ReturnType<typeof createRouteHandlerSupabaseClient>,
  payload: {
    id: string;
    user_id: string;
    item_type: string;
    item_data: Record<string, unknown>;
    sync_status: string;
  },
) {
  const requestResult = await requestClient
    .from("synced_items")
    .insert(payload)
    .select("id, item_data")
    .single();

  if (!requestResult.error) {
    return {
      data: requestResult.data as { id: string; item_data: Record<string, unknown> },
      error: null,
    };
  }

  const admin = createAdminSupabaseClient();
  if (!admin) {
    return { data: null, error: requestResult.error.message };
  }

  const adminResult = await admin
    .from("synced_items")
    .insert(payload)
    .select("id, item_data")
    .single();

  return {
    data: adminResult.data as { id: string; item_data: Record<string, unknown> } | null,
    error: adminResult.error?.message ?? null,
  };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
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

  const formData = await request.formData();
  const files = formData
    .getAll("files")
    .filter((entry): entry is File => entry instanceof File);

  if (files.length === 0) {
    return copyResponseCookies(
      response,
      NextResponse.json({ error: "Select at least one PDF." }, { status: 400 }),
    );
  }

  const preparedFiles: Array<{
    file: File;
    bytes: Uint8Array;
  }> = [];

  for (const file of files) {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return copyResponseCookies(
        response,
        NextResponse.json({ error: `${file.name} is not a PDF.` }, { status: 400 }),
      );
    }

    if (file.size > MAX_FILE_BYTES) {
      return copyResponseCookies(
        response,
        NextResponse.json(
          { error: `${file.name} is larger than 25 MB.` },
          { status: 400 },
        ),
      );
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!isPdfSignature(bytes)) {
      return copyResponseCookies(
        response,
        NextResponse.json(
          { error: `${file.name} does not look like a valid PDF.` },
          { status: 400 },
        ),
      );
    }

    preparedFiles.push({ file, bytes });
  }

  const courseId = parseCourseId(formData.get("courseId"));
  const documents: Array<{ id: string; title: string }> = [];

  for (const prepared of preparedFiles) {
    const rowId = randomUUID();
    const storagePath = buildStoragePath(user.id, rowId);
    const uploadResult = await uploadWithFallback(supabase, storagePath, prepared.bytes);

    if (uploadResult.error) {
      return copyResponseCookies(
        response,
        NextResponse.json(
          { error: `Unable to upload ${prepared.file.name}: ${uploadResult.error}` },
          { status: 502 },
        ),
      );
    }

    const itemData = {
      title: prepared.file.name.replace(/\.pdf$/i, ""),
      courseId,
      sourceUrl: null,
      storagePath,
      annotatedStoragePath: null,
      status: "pending_annotation",
      sourcePlatform: "canvascope_extension",
      sourceKind: "canvas_pdf_import",
    };

    const insertResult = await insertDocumentRow(
      supabase,
      {
        id: rowId,
        user_id: user.id,
        item_type: "pdf_document",
        item_data: itemData,
        sync_status: "synced",
      },
    );
    if (insertResult.error || !insertResult.data) {
      await removeWithFallback(supabase, storagePath);
      return copyResponseCookies(
        response,
        NextResponse.json(
          {
            error: `Unable to register ${prepared.file.name} in the workspace.`,
          },
          { status: 502 },
        ),
      );
    }

    documents.push({
      id: insertResult.data.id,
      title:
        typeof insertResult.data.item_data.title === "string"
          ? insertResult.data.item_data.title
          : prepared.file.name.replace(/\.pdf$/i, ""),
    });
  }

  revalidatePath("/app");
  revalidatePath("/app/documents");

  return copyResponseCookies(
    response,
    NextResponse.json({ documents }, { status: 201 }),
  );
}
