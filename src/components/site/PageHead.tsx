import Link from "next/link";
import type { ReactNode } from "react";

export type Crumb = { href: string; label: string };

/**
 * The top of an inner page: optional trail, optional context line, the H1,
 * a lede, and actions.
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
    <header className="mx-auto max-w-[1200px] px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
      {crumbs && crumbs.length > 0 ? (
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-[14px] text-stone">
            {crumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                <Link href={crumb.href} className="hover:text-ink">
                  {crumb.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      {context ? (
        <p className={`text-[15px] font-medium text-stone ${crumbs?.length ? "mt-6" : ""}`}>{context}</p>
      ) : null}
      <h1
        className={`mt-5 text-[clamp(2.4rem,5.4vw,4.25rem)] font-semibold leading-[1] tracking-[-0.045em] text-balance ${
          wide ? "max-w-[24ch]" : "max-w-[18ch]"
        }`}
      >
        {title}
      </h1>
      {lede ? (
        <div className="mt-6 max-w-[60ch] space-y-4 text-[18px] leading-[1.6] text-ink-soft">{lede}</div>
      ) : null}
      {children ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div> : null}
    </header>
  );
}
