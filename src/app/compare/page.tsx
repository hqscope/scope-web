import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import JsonLd from "@/components/seo/JsonLd";
import { comparePath, comparisons, comparisonsFor, type Comparison } from "@/lib/compare";
import { publicPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";

const description =
  "Honest comparisons of Scope for Canvas with BetterCampus and Tasks for Canvas, and of Lectra Notes with Goodnotes, Notability, and the iPad Python notebook apps — including where each competitor is stronger.";

export const metadata = publicPageMetadata({
  title: "Compare Scope and Lectra Notes",
  description,
  path: "/compare",
  keywords: [
    "Scope vs Better Canvas",
    "Scope vs Tasks for Canvas",
    "best Canvas Chrome extensions",
    "Lectra Notes vs Goodnotes",
    "Lectra Notes vs Notability",
    "free Goodnotes alternatives",
    "iPad Python notebook apps",
  ],
});

function CompareCards({ items }: { items: Comparison[] }) {
  return (
    <div className="plain-grid" data-reveal>
      {items.map((item) => (
        <Link
          key={item.slug}
          href={comparePath(item)}
          className="group block rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 transition-colors hover:border-[var(--color-line-strong)]"
        >
          <h3 className="text-[1.05rem] font-semibold text-[var(--color-ink)]">
            {item.title}
          </h3>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
            {item.copy}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)]">
            Read the comparison
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function ComparePage() {
  const scopeComparisons = comparisonsFor("scope");
  const lectraComparisons = comparisonsFor("lectra");

  return (
    <PublicPageFrame active="compare" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
          ]),
          itemListSchema(
            "Scope and Lectra Notes comparisons",
            "/compare",
            comparisons.map((item) => ({
              name: item.title,
              path: comparePath(item),
            })),
          ),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Compare</p>
          <h1>Pick the right app, even if it isn&apos;t ours.</h1>
          <p className="centered-hero-lede">
            Every comparison here names what the other app does better — dated,
            sourced, and corrected when we&apos;re wrong. If Scope for Canvas
            or Lectra Notes wins, we want it to win on the merits.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad" id="scope">
        <div className="section-heading" data-reveal>
          <p className="kicker">Scope for Canvas</p>
          <h2>Canvas Chrome extensions, compared.</h2>
        </div>
        <CompareCards items={scopeComparisons} />
      </section>

      <section className="page-wrap section-pad" id="lectra">
        <div className="section-heading" data-reveal>
          <p className="kicker">Lectra Notes</p>
          <h2>iPad note-taking apps, compared.</h2>
        </div>
        <CompareCards items={lectraComparisons} />
      </section>

      <section className="page-wrap final-cta" id="guides" data-reveal>
        <div>
          <h2>Looking for a how-to instead?</h2>
          <p>
            The <Link href="/guides">guides</Link> cover the manual way first —
            searching Canvas, checking an extension before you install it,
            getting lecture slides onto an iPad — and only then mention ours.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
