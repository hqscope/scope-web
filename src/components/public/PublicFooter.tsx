import Link from "next/link";

import PreferredSourceLink from "@/components/public/PreferredSourceLink";
import ScopeMark from "@/components/public/ScopeMark";
import StoreLink from "@/components/seo/StoreLink";
import {
  CHROME_WEB_STORE_URL,
  SUPPORT_EMAIL,
  TRADEMARK_DISCLAIMER,
} from "@/lib/site";

export type PublicFooterVariant = "full" | "slim";

const slimLinks = [
  { href: "/products/extension", label: "Extension" },
  { href: "/products/lectra", label: "Lectra Notes" },
  { href: "/products/polya", label: "Polya" },
  { href: "/compare", label: "Compare" },
  { href: "/guides", label: "Guides" },
  { href: "/newsroom", label: "Newsroom" },
];

/* The lines that close every page. "Formerly Canvascope" gets exactly two
   placements site-wide: here and the legal pages. The trademark line is the
   nominative-use notice every page that names Canvas or Brightspace needs. */
function Colophon() {
  return (
    <>
      <span>© 2026 Scope · formerly Canvascope</span>
      <span>Works with Canvas and Brightspace</span>
      <span className="public-footer-disclaimer">{TRADEMARK_DISCLAIMER}</span>
    </>
  );
}

function Brand() {
  return (
    <Link href="/" className="public-brand" aria-label="Scope home">
      <ScopeMark className="public-brand-mark" />
      <span className="public-brand-text">Scope</span>
    </Link>
  );
}

export default function PublicFooter({
  variant = "full",
}: {
  variant?: PublicFooterVariant;
}) {
  if (variant === "slim") {
    return (
      <footer className="public-footer public-footer-slim">
        <div className="page-wrap public-footer-slim-inner">
          <Brand />
          <nav aria-label="Footer links">
            {slimLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          {/* Both variants carry it, so every page offers it exactly once. */}
          <PreferredSourceLink tone="on-deep" />
        </div>
        <div className="page-wrap public-footer-slim-bottom">
          <Colophon />
        </div>
      </footer>
    );
  }

  return (
    <footer className="public-footer">
      <div className="page-wrap public-footer-grid">
        <div className="public-footer-lede">
          <Brand />
          <p>The LMS where students actually do the work.</p>
          <StoreLink
            store="chrome-web-store"
            href={CHROME_WEB_STORE_URL}
            className="public-footer-store"
          >
            Chrome Web Store →
          </StoreLink>
          {/* The lede column is the narrowest place the badge lands, so it
              takes the short label. */}
          <PreferredSourceLink
            tone="on-deep"
            label="Prefer Scope on Google"
            markedLabel="Preferred on Google"
          />
        </div>

        <div className="public-footer-links" aria-label="Footer links">
          <div>
            <p>Products</p>
            <Link href="/products/extension">Extension</Link>
            <Link href="/products/lectra">Lectra Notes</Link>
            <Link href="/products/polya">Polya</Link>
            <Link href="/mac">Lectra for Mac</Link>
            <Link href="/products/agent-workspace">Agent Workspace</Link>
          </div>
          <div>
            <p>Learn</p>
            <Link href="/compare">Compare</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/press">Press kit</Link>
          </div>
          <div>
            <p>Company</p>
            <Link href="/direction">Direction</Link>
            <Link href="/newsroom">Newsroom</Link>
            <Link href="/research">Research</Link>
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
        <Colophon />
      </div>
    </footer>
  );
}
