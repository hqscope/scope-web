import Link from "next/link";

import { CHROME_WEB_STORE_URL, SUPPORT_EMAIL } from "@/lib/site";

export type PublicFooterVariant = "full" | "slim";

const slimLinks = [
  { href: "/", label: "Home" },
  { href: "/product/scope", label: "Scope for Canvas" },
  { href: "/product/lectra", label: "Lectra" },
  { href: "/product/agent-workspace", label: "Agent Workspace" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function PublicFooter({
  variant = "full",
}: {
  variant?: PublicFooterVariant;
}) {
  if (variant === "slim") {
    return (
      <footer className="public-footer public-footer-slim">
        <div className="page-wrap public-footer-slim-inner">
          <span>© 2026 Scope Inc. (formerly Canvascope Inc.)</span>
          <nav aria-label="Footer links">
            {slimLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    );
  }

  return (
    <footer className="public-footer">
      <div className="page-wrap public-footer-grid">
        <div className="public-footer-lede">
          <p>Scope</p>
          <span>
            Local-first search for Canvas and Brightspace, cited AI answers, and
            two-way Lectra workflows.
          </span>
          <span>
            Scope was previously Canvascope. Same company, same product — the old
            name was too easily confused with Canvas LMS.
          </span>
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="public-footer-store"
          >
            Chrome Web Store →
          </a>
        </div>

        <div className="public-footer-links" aria-label="Footer links">
          <div>
            <p>Product</p>
            <Link href="/product/scope">Scope for Canvas</Link>
            <Link href="/product/lectra">Lectra</Link>
            <Link href="/product/agent-workspace">Agent Workspace</Link>
            <Link href="/receiver">Lectra Receiver for Mac</Link>
            <Link href="/support/lectra">Lectra Support</Link>
          </div>
          <div>
            <p>Company</p>
            <Link href="/mission">Mission</Link>
            <Link href="/newsroom">Newsroom</Link>
            <Link href="/research">Research</Link>
            <Link href="/#hiring">Build / test with us</Link>
            <Link href="/support">Support</Link>
            <a href={`mailto:${SUPPORT_EMAIL}`}>Contact</a>
          </div>
          <div>
            <p>Legal</p>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>

      <div className="page-wrap public-footer-bottom">
        <span>© 2026 Scope Inc. (formerly Canvascope Inc.)</span>
      </div>
    </footer>
  );
}
