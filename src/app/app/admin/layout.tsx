import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Internal",
    template: "%s | Scope",
  },
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * The shell for the internal admin surface. Deliberately does no auth work of
 * its own — each page under here carries its own gate (metrics uses
 * getAdminUser(), which fails closed to a 404). The workspace this used to sit
 * beside is gone; all that survives is the dark .app-page canvas.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-page">
      <div className="mx-auto flex min-h-screen max-w-[80rem] flex-col gap-6 px-4 py-6 lg:px-6 lg:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="app-label">
            ← Scope
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit" className="app-label">
              Sign out
            </button>
          </form>
        </div>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
