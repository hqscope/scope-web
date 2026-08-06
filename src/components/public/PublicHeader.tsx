import Link from "next/link";
import { Menu } from "lucide-react";

import ScopeMark from "@/components/public/ScopeMark";
import { CHROME_WEB_STORE_URL } from "@/lib/site";

const links: { href: string; label: string; badge?: string }[] = [
  { href: "/product/scope", label: "Scope for Canvas" },
  { href: "/product/lectra", label: "Lectra" },
  { href: "/product/agent-workspace", label: "Agent Workspace", badge: "NEW" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/research", label: "Research" },
];

export type PublicNavSection =
  | "extension"
  | "lectra"
  | "agent-workspace"
  | "newsroom"
  | "research"
  | null;

const sectionByHref: Record<string, PublicNavSection> = {
  "/product/scope": "extension",
  "/product/lectra": "lectra",
  "/product/agent-workspace": "agent-workspace",
  "/newsroom": "newsroom",
  "/research": "research",
};

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

export default function PublicHeader({
  active = null,
  cta = defaultCta,
}: {
  active?: PublicNavSection;
  cta?: PublicHeaderCta;
}) {
  return (
    <header className="public-header">
      <div className="page-wrap public-header-inner">
        <Link href="/" className="public-brand" aria-label="Scope home">
          <ScopeMark className="public-brand-mark" />
          <span className="public-brand-text">
            <span>Scope</span>
            <span className="public-brand-former">prev. Canvascope</span>
          </span>
        </Link>

        <nav className="public-nav" aria-label="Public navigation">
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
                {link.badge ? (
                  <span className="public-nav-badge">{link.badge}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="public-header-actions">
          {cta.external ? (
            <a
              href={cta.href}
              target="_blank"
              rel="noreferrer"
              className="button-dark public-header-cta"
            >
              {cta.label}
            </a>
          ) : (
            <Link href={cta.href} className="button-dark public-header-cta">
              {cta.label}
            </Link>
          )}
        </div>

        <details className="public-mobile-menu">
          <summary aria-label="Open navigation">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </summary>
          <div className="public-mobile-panel">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
                {link.badge ? (
                  <span className="public-nav-badge">{link.badge}</span>
                ) : null}
              </Link>
            ))}
            {cta.external ? (
              <a href={cta.href} target="_blank" rel="noreferrer">
                {cta.label}
              </a>
            ) : (
              <Link href={cta.href}>{cta.label}</Link>
            )}
          </div>
        </details>
      </div>
    </header>
  );
}
