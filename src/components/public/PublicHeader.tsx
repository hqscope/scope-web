import Link from "next/link";
import { Menu } from "lucide-react";

import NavMenu from "@/components/public/NavMenu";
import ScopeMark from "@/components/public/ScopeMark";
import StoreLink from "@/components/seo/StoreLink";
import { CHROME_WEB_STORE_URL } from "@/lib/site";

/** The products the "Products" menu opens onto, in shipping order. */
const productLinks: { href: string; label: string }[] = [
  { href: "/products/extension", label: "Extension" },
  { href: "/products/lectra", label: "Lectra Notes" },
  { href: "/products/polya", label: "Polya" },
  { href: "/mac", label: "Lectra for Mac" },
  { href: "/products/agent-workspace", label: "Agent Workspace" },
];

const links: { href: string; label: string }[] = [
  { href: "/compare", label: "Compare" },
  { href: "/guides", label: "Guides" },
  { href: "/direction", label: "Direction" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/support", label: "Support" },
];

export type PublicNavSection =
  | "extension"
  | "lectra"
  | "polya"
  | "agent-workspace"
  | "compare"
  | "guides"
  | "direction"
  | "newsroom"
  | "support"
  | null;

const sectionByHref: Record<string, PublicNavSection> = {
  "/products/extension": "extension",
  "/products/lectra": "lectra",
  "/products/polya": "polya",
  "/products/agent-workspace": "agent-workspace",
  "/compare": "compare",
  "/guides": "guides",
  "/direction": "direction",
  "/newsroom": "newsroom",
  "/support": "support",
};

const productSections: PublicNavSection[] = [
  "extension",
  "lectra",
  "polya",
  "agent-workspace",
];

export type PublicHeaderCta = {
  label: string;
  href: string;
  external?: boolean;
};

const defaultCta: PublicHeaderCta = {
  label: "Add to Chrome",
  href: CHROME_WEB_STORE_URL,
  external: true,
};

function Cta({ cta, className }: { cta: PublicHeaderCta; className?: string }) {
  if (cta.external) {
    const store = cta.href.includes("apps.apple.com")
      ? "app-store"
      : "chrome-web-store";

    return (
      <StoreLink store={store} href={cta.href} className={className}>
        {cta.label}
      </StoreLink>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}

export default function PublicHeader({
  active = null,
  cta = defaultCta,
}: {
  active?: PublicNavSection;
  cta?: PublicHeaderCta;
}) {
  const productsActive = active !== null && productSections.includes(active);

  return (
    <header className="public-header">
      <div className="page-wrap public-header-inner">
        <Link href="/" className="public-brand" aria-label="Scope home">
          <ScopeMark className="public-brand-mark" />
          <span className="public-brand-text">Scope</span>
        </Link>

        <nav className="public-nav" aria-label="Public navigation">
          <NavMenu label="Products" active={productsActive}>
            {productLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </NavMenu>

          {links.map((link) => {
            const isActive =
              active !== null && sectionByHref[link.href] === active;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* The nav collapses below 860px. This never does. */}
        <div className="public-header-actions">
          <Cta cta={cta} className="button-dark public-header-cta" />

          <details className="public-mobile-menu">
            <summary aria-label="Open navigation">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </summary>
            <div className="public-mobile-panel">
              <span className="public-mobile-panel-label">Products</span>
              {productLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
              <span className="public-mobile-panel-label">Explore</span>
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
