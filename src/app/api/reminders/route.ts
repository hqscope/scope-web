import { NextRequest, NextResponse } from "next/server";

import { getCanvascopeSessionSecret } from "@/lib/server/canvascopeEnv";
import { getCanvascopeSessionFromRequest } from "@/lib/server/canvascopeSession";
import { listReminders } from "@/lib/server/reminderStore";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const sessionSecret = getCanvascopeSessionSecret();
  const session = getCanvascopeSessionFromRequest(request, sessionSecret);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reminders, error } = await listReminders(session.sub);
  if (error) {
    return NextResponse.json({ error }, { status: 503 });
  }

  return NextResponse.json({ reminders });
}
