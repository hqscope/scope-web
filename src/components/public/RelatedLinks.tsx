import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type RelatedLink = {
  href: string;
  label: string;
  copy: string;
};

/**
 * A row of cards pointing at the pages that continue the reader's question:
 * comparisons from a product page, sibling guides from a guide, and so on.
 * Rendered as plain links so every page in the compare and guide trees is
 * reachable from the pages people actually land on.
 */
export default function RelatedLinks({
  kicker = "Keep reading",
  title,
  links,
  id = "related",
}: {
  kicker?: string;
  title: string;
  links: RelatedLink[];
  id?: string;
}) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="page-wrap section-pad-sm" id={id}>
      <div className="section-heading" data-reveal>
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      <div className="plain-grid" data-reveal>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group block rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 transition-colors hover:border-[var(--color-line-strong)]"
          >
            <h3 className="text-[1.05rem] font-semibold text-[var(--color-ink)]">
              {link.label}
            </h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
              {link.copy}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)]">
              Read
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
