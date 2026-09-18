import Link from "next/link";
import type { ReactNode } from "react";

export type Crumb = { href: string; label: string };

/**
 * The top of an inner page: optional trail, optional context line, the H1,
 * a lede, and actions. The H1 pulls into focus on load.
 */
export default function PageHead({
  crumbs,
  context,
  title,
  lede,
  children,
  wide = false,
}: {
  crumbs?: Crumb[];
  context?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  wide?: boolean;
}) {
  return (
    <header className="shell page-head">
      {crumbs && crumbs.length > 0 ? (
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            {crumbs.map((crumb) => (
              <li key={crumb.href}>
                <Link href={crumb.href}>{crumb.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      {context ? <p className="context-line">{context}</p> : null}
      <h1 className="t-title" data-focus style={wide ? { maxWidth: "24ch" } : undefined}>
        {title}
      </h1>
      {lede ? <div className="lede">{lede}</div> : null}
      {children ? <div className="actions">{children}</div> : null}
    </header>
  );
}
