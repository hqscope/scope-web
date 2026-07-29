import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight, LogOut } from "lucide-react";

import AppSidebarNav from "@/components/app/AppSidebarNav";
import { getWorkspaceData } from "@/lib/data/workspace";
import { formatRelativeTime } from "@/lib/ui/format";

export const metadata: Metadata = {
  title: {
    default: "Workspace",
    template: "%s | Canvascope",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const workspace = await getWorkspaceData();

  if (!workspace) {
    redirect("/login?next=/app");
  }

  return (
    <div className="app-page">
      <div className="mx-auto flex min-h-screen max-w-[88rem] gap-6 px-4 py-5 lg:px-6 lg:py-8">
        <aside className="app-card hidden w-[15rem] shrink-0 rounded-[1.75rem] p-4 md:flex md:flex-col xl:w-[17rem]">
          <Link href="/" className="rounded-2xl px-3 py-4 transition-colors hover:bg-white/4">
            <p className="app-label">Canvascope portal</p>
            <h2 className="mt-2 text-2xl">Student home</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--color-shell-copy-muted)]">
              Assignments, files, quick links, and the next thing to do.
            </p>
          </Link>

          <div className="mt-4">
            <AppSidebarNav />
          </div>

          <div className="app-card-soft mt-auto rounded-[1.5rem] p-4">
            <p className="app-label">Signed in</p>
            <p className="mt-3 text-lg font-semibold">{workspace.user.displayName}</p>
            <p className="mt-1 text-sm text-[var(--color-shell-copy-muted)]">
              {workspace.user.email}
            </p>
            <p className="mt-4 text-sm text-[var(--color-shell-copy)]">
              Latest sync {formatRelativeTime(workspace.dashboard.latestSyncAt)}
            </p>

            <div className="mt-5 flex gap-3">
              <Link href="/" className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-3 !text-sm !text-white">
                Public site
              </Link>
              <form action="/auth/signout" method="post" className="flex-1">
                <button type="submit" className="button-primary w-full !px-4 !py-3 !text-sm">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="app-card rounded-[1.75rem] p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="app-label">Workspace</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[var(--color-shell-copy-muted)]">
                  <span>{workspace.user.displayName}</span>
                  <ChevronRight className="h-4 w-4" />
                  <span>Student dashboard</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="status-chip" data-tone={workspace.dashboard.loadError ? "warn" : "good"}>
                  {workspace.dashboard.loadError ? "Data fallback" : "Live workspace"}
                </span>
                <span className="text-sm text-[var(--color-shell-copy-muted)]">
                  Latest sync {formatRelativeTime(workspace.dashboard.latestSyncAt)}
                </span>
              </div>
            </div>

            <details className="relative mt-4 md:hidden">
              <summary className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                Open workspace navigation
              </summary>
              <div className="absolute right-0 top-[calc(100%+0.75rem)] z-30 w-full rounded-[1.25rem] border border-white/10 bg-[#171a21] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
                <AppSidebarNav />
                <div className="mt-3 flex flex-col gap-2 p-2">
                  <Link href="/" className="rounded-xl px-3 py-2 text-sm text-[var(--color-shell-copy)] hover:bg-white/6">
                    Public site
                  </Link>
                  <form action="/auth/signout" method="post">
                    <button
                      type="submit"
                      className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-[var(--color-shell-copy)] hover:bg-white/6"
                    >
                      <span className="inline-flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </details>
          </header>

          {workspace.dashboard.loadError ? (
            <div className="mt-4 rounded-[1.5rem] border border-[rgba(243,179,90,0.28)] bg-[rgba(243,179,90,0.08)] p-4 text-sm leading-7 text-[#ffd08f]">
              Some synced records could not be loaded right now. The workspace
              is still available, but parts of the dashboard may be incomplete.
            </div>
          ) : null}

          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
