import Link from "next/link";

import { saveWorkspaceItemStateAction } from "@/app/app/actions";
import { WorkspaceActionItem } from "@/lib/data/models";
import { formatDateTimeLabel } from "@/lib/ui/format";

function toneForItemStatus(status: string | null | undefined): "good" | "warn" | "muted" {
  if (status === "done") {
    return "good";
  }

  if (status === "snoozed") {
    return "warn";
  }

  return "muted";
}

function primaryLabel(item: WorkspaceActionItem): string {
  if (!item.href) {
    return "No source link";
  }

  if (item.itemType === "upcoming_work") {
    return "Open assignment";
  }

  if (item.itemType === "document") {
    return "Open file";
  }

  return "Open item";
}

function completionLabel(item: WorkspaceActionItem): string {
  if (item.itemType === "upcoming_work") {
    return "Dismiss";
  }

  return "Mark done";
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function buildSnapshot(item: WorkspaceActionItem): string {
  return JSON.stringify({
    title: item.title,
    detail: item.detail,
    courseId: item.courseId,
    courseKey: item.courseKey,
    courseName: item.courseName,
    dueAt: item.dueAt,
    href: item.href,
    sourceStatus: item.sourceStatus,
  });
}

function HiddenFields({
  item,
  redirectTo,
}: {
  item: WorkspaceActionItem;
  redirectTo: string;
}) {
  return (
    <>
      <input type="hidden" name="itemKey" value={item.itemKey} />
      <input type="hidden" name="itemType" value={item.itemType} />
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <input type="hidden" name="sourceSnapshot" value={buildSnapshot(item)} />
    </>
  );
}

export default function WorkspaceActionCard({
  item,
  redirectTo,
  actionsEnabled = true,
}: {
  item: WorkspaceActionItem;
  redirectTo: string;
  actionsEnabled?: boolean;
}) {
  const currentStatus = item.state?.status ?? "open";

  return (
    <article className="app-card-soft rounded-[1.25rem] p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-white">{item.title}</p>
          <p className="mt-1 text-sm text-[var(--color-shell-copy-muted)]">
            {[item.courseName, item.moduleName].filter(Boolean).join(" · ") || "Workspace item"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="status-chip" data-tone={toneForItemStatus(currentStatus)}>
            {currentStatus.replaceAll("_", " ")}
          </span>
          {item.state?.pinned ? (
            <span className="status-chip" data-tone="warn">
              pinned
            </span>
          ) : null}
        </div>
      </div>

      <p className="mt-3 app-copy">{item.detail || "No extra detail yet."}</p>

      {item.dueAt ? (
        <p className="mt-3 text-sm text-[var(--color-shell-copy-muted)]">
          Due {formatDateTimeLabel(item.dueAt)}
        </p>
      ) : null}

      {item.state?.note ? (
        <p className="mt-3 rounded-xl border border-white/8 bg-white/4 px-3 py-3 text-sm text-[var(--color-shell-copy)]">
          {item.state.note}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {item.href ? (
          isExternalHref(item.href) ? (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white"
            >
              {primaryLabel(item)}
            </a>
          ) : (
            <Link href={item.href} className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white">
              {primaryLabel(item)}
            </Link>
          )
        ) : (
          <span className="button-secondary !cursor-not-allowed !border-white/10 !bg-white/3 !px-4 !py-2 !text-sm !text-[var(--color-shell-copy-muted)]">
            No source link
          </span>
        )}
        {item.courseKey ? (
          <Link href={`/app/courses/${item.courseKey}`} className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white">
            Open course
          </Link>
        ) : null}
      </div>

      {actionsEnabled ? (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            <form action={saveWorkspaceItemStateAction}>
              <HiddenFields item={item} redirectTo={redirectTo} />
              <input type="hidden" name="status" value="in_progress" />
              <input type="hidden" name="deferredUntil" value="" />
              <button type="submit" className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white">
                Start
              </button>
            </form>

            <form action={saveWorkspaceItemStateAction}>
              <HiddenFields item={item} redirectTo={redirectTo} />
              <input type="hidden" name="status" value="done" />
              <input type="hidden" name="deferredUntil" value="" />
              <button type="submit" className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white">
                {completionLabel(item)}
              </button>
            </form>

            <form action={saveWorkspaceItemStateAction}>
              <HiddenFields item={item} redirectTo={redirectTo} />
              <input type="hidden" name="status" value="snoozed" />
              <input type="hidden" name="deferredUntil" value="tomorrow" />
              <button type="submit" className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white">
                Snooze
              </button>
            </form>

            <form action={saveWorkspaceItemStateAction}>
              <HiddenFields item={item} redirectTo={redirectTo} />
              <input type="hidden" name="pinned" value={item.state?.pinned ? "false" : "true"} />
              <button type="submit" className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white">
                {item.state?.pinned ? "Unpin" : "Pin"}
              </button>
            </form>

            {currentStatus !== "open" ? (
              <form action={saveWorkspaceItemStateAction}>
                <HiddenFields item={item} redirectTo={redirectTo} />
                <input type="hidden" name="status" value="open" />
                <input type="hidden" name="deferredUntil" value="" />
                <button type="submit" className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white">
                  Reopen
                </button>
              </form>
            ) : null}
          </div>

          <details className="mt-4">
            <summary className="rounded-xl border border-white/10 bg-white/4 px-3 py-3 text-sm font-semibold text-white">
              Add note
            </summary>
            <form action={saveWorkspaceItemStateAction} className="mt-3 space-y-3">
              <HiddenFields item={item} redirectTo={redirectTo} />
              <textarea
                name="note"
                defaultValue={item.state?.note ?? ""}
                rows={4}
                className="min-h-28 w-full rounded-[1rem] border border-white/10 bg-[rgba(8,10,14,0.48)] px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--color-shell-copy-muted)]"
                placeholder="Capture what matters about this item."
              />
              <button type="submit" className="button-primary !px-4 !py-2 !text-sm">
                Save note
              </button>
            </form>
          </details>
        </>
      ) : null}
    </article>
  );
}
