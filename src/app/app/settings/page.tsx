import type { Metadata } from "next";
import Link from "next/link";

import { saveWorkspacePreferencesAction } from "@/app/app/actions";
import { getWorkspaceData } from "@/lib/data/workspace";
import { SUPPORT_EMAIL } from "@/lib/site";
import { formatDateTimeLabel, formatRelativeTime } from "@/lib/ui/format";
import { getWorkspacePreferences } from "@/lib/workspace/preferences";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function AppSettingsPage() {
  const workspace = await getWorkspaceData();

  if (!workspace) {
    return null;
  }

  const preferences = await getWorkspacePreferences();

  return (
    <div className="space-y-6">
      <section className="app-card rounded-[1.75rem] p-6 sm:p-7">
        <p className="app-label">Settings</p>
        <h1 className="mt-3 text-4xl">Account, assignment defaults, and support controls</h1>
        <p className="mt-4 max-w-3xl app-copy">
          Keep the main student workspace simple, and place the extra controls here when you need them.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="app-card rounded-[1.75rem] p-6">
          <p className="app-label">Account</p>
          <h2 className="mt-2 text-2xl">Signed in with shared Supabase Auth</h2>
          <div className="mt-6 space-y-4">
            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="app-label">Display name</p>
              <p className="mt-3 text-lg font-semibold text-white">{workspace.user.displayName}</p>
            </div>
            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="app-label">Email</p>
              <p className="mt-3 text-lg font-semibold text-white">{workspace.user.email}</p>
            </div>
            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="app-label">Latest workspace sync</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {formatRelativeTime(workspace.latestSyncAt)}
              </p>
              <p className="mt-2 text-sm text-[var(--color-shell-copy-muted)]">
                {formatDateTimeLabel(workspace.latestSyncAt)}
              </p>
            </div>
            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="app-label">Workflow overlay</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {workspace.workflowAvailable ? "Available" : "Read-only fallback"}
              </p>
              <p className="mt-2 text-sm text-[var(--color-shell-copy-muted)]">
                {workspace.workflowAvailable
                  ? "Owner-scoped workspace actions are enabled."
                  : "Some workflow actions are temporarily unavailable, but your synced data is still visible."}
              </p>
            </div>
          </div>
        </article>

        <article className="app-card rounded-[1.75rem] p-6">
          <p className="app-label">Workflow defaults</p>
          <h2 className="mt-2 text-2xl">How the assignments view should open</h2>

          <form action={saveWorkspacePreferencesAction} className="mt-6 space-y-4">
            <div className="app-card-soft rounded-[1.25rem] p-4">
              <label className="app-label" htmlFor="defaultSection">
                Default assignments section
              </label>
              <select
                id="defaultSection"
                name="defaultSection"
                defaultValue={preferences.defaultSection}
                className="mt-3 h-12 w-full rounded-[1rem] border border-white/10 bg-[rgba(8,10,14,0.48)] px-4 text-sm text-white outline-none"
              >
                <option value="overdue">Overdue</option>
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="pinned">Pinned</option>
              </select>
            </div>

            <div className="app-card-soft rounded-[1.25rem] p-4">
              <label className="flex items-center justify-between gap-4 text-sm text-white">
                <span>Hide completed items by default</span>
                <input
                  type="hidden"
                  name="hideCompleted"
                  value="false"
                />
                <input
                  type="checkbox"
                  name="hideCompleted"
                  value="true"
                  defaultChecked={preferences.hideCompleted}
                  className="h-4 w-4"
                />
              </label>
            </div>

            <div className="app-card-soft rounded-[1.25rem] p-4">
              <label className="flex items-center justify-between gap-4 text-sm text-white">
                <span>Show snoozed items in queues</span>
                <input
                  type="hidden"
                  name="showSnoozed"
                  value="false"
                />
                <input
                  type="checkbox"
                  name="showSnoozed"
                  value="true"
                  defaultChecked={preferences.showSnoozed}
                  className="h-4 w-4"
                />
              </label>
            </div>

            <button type="submit" className="button-primary">
              Save workspace defaults
            </button>
          </form>

          <div className="mt-6 grid gap-4">
            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="font-medium text-white">Privacy posture</p>
              <p className="mt-2 app-copy">
                Core indexing stays local-first. Connected flows are explicit, and the web app only reflects records already created by the connected products you use.
              </p>
              <Link href="/privacy" className="mt-4 inline-flex font-semibold text-white underline underline-offset-4">
                Read privacy policy
              </Link>
            </div>

            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="font-medium text-white">Advanced tools</p>
              <p className="mt-2 app-copy">
                These routes stay available, but they are intentionally off the main student navigation now.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="/app/course-brain" className="font-semibold text-white underline underline-offset-4">
                  Open Course Brain
                </Link>
                <Link href="/app/integrations" className="font-semibold text-white underline underline-offset-4">
                  Open Integrations
                </Link>
              </div>
            </div>

            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="font-medium text-white">Terms and support</p>
              <p className="mt-2 app-copy">
                The workspace is part of the same Scope product system as the extension and Lectra.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="/terms" className="font-semibold text-white underline underline-offset-4">
                  Read terms
                </Link>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-white underline underline-offset-4">
                  Contact support
                </a>
              </div>
            </div>

            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="font-medium text-white">Sign out</p>
              <p className="mt-2 app-copy">
                Ends the Supabase-backed website session. Legacy compatibility cookies are also cleared on the legacy sign-out route.
              </p>
              <form action="/auth/signout" method="post" className="mt-4">
                <button type="submit" className="button-primary">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
