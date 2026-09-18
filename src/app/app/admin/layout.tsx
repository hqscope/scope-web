import type { Metadata } from "next";
import Link from "next/link";

import Mark from "@/components/site/Mark";

import "./admin.css";

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
 * its own. Each page under here carries its own gate (metrics uses
 * getAdminUser(), which fails closed to a 404). It sits on the desk, with
 * the content on one paper sheet.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-page">
      <div className="shell admin-bar">
        <Link href="/" className="brand">
          <Mark size={26} />
          Scope
        </Link>
        <form action="/auth/signout" method="post">
          <button type="submit" className="admin-bar-button">
            Sign out
          </button>
        </form>
      </div>

      <main className="sheet admin-sheet">
        <div className="shell">{children}</div>
      </main>
    </div>
  );
}
