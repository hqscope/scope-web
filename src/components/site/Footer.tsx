import Link from "next/link";

import StoreLink from "@/components/seo/StoreLink";
import { CHROME_WEB_STORE_URL, SUPPORT_EMAIL, TRADEMARK_DISCLAIMER } from "@/lib/site";

import Mark from "./Mark";
import PreferredSource from "./PreferredSource";

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Products",
    links: [
      { href: "/products/extension", label: "Extension" },
      { href: "/products/lectra", label: "Lectra Notes" },
      { href: "/products/polya", label: "Polya" },
      { href: "/mac", label: "Lectra for Mac" },
      { href: "/products/agent-workspace", label: "Agent Workspace" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/compare", label: "Compare" },
      { href: "/guides", label: "Guides" },
      { href: "/press", label: "Press kit" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/direction", label: "Direction" },
      { href: "/newsroom", label: "Newsroom" },
      { href: "/research", label: "Research" },
      { href: "/support", label: "Support" },
      { href: `mailto:${SUPPORT_EMAIL}`, label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

/* "Formerly Canvascope" appears in exactly two places site-wide: here and
   the legal pages. The trademark line is the nominative-use notice every
   page that names Canvas or Brightspace needs. */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand" aria-label="Scope home">
              <Mark size={32} />
              <span aria-hidden="true">Scope</span>
            </Link>
            <p className="footer-line">The LMS where students actually do the work.</p>
            <div className="actions" style={{ marginTop: 26 }}>
              <StoreLink
                store="chrome-web-store"
                href={CHROME_WEB_STORE_URL}
                className="btn btn-primary"
              >
                Get it on the Chrome Web Store
              </StoreLink>
            </div>
            <PreferredSource />
          </div>

          <div className="footer-cols">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2>{column.title}</h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("mailto:") ? (
                        <a href={link.href}>{link.label}</a>
                      ) : (
                        <Link href={link.href}>{link.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Scope, formerly Canvascope</p>
          <p>Works with Canvas and Brightspace</p>
          <p>{TRADEMARK_DISCLAIMER}</p>
        </div>
      </div>
    </footer>
  );
}
