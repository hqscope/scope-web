import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";

const description =
  "Honest comparisons of Lectra Notes with Goodnotes, Notability, and the iPad Python notebook apps — including where each competitor is stronger.";

export const metadata: Metadata = {
  title: "Compare Lectra Notes",
  description,
  alternates: {
    canonical: "/compare",
  },
  keywords: [
    "Lectra Notes vs Goodnotes",
    "Lectra Notes vs Notability",
    "best note taking app for CS students",
    "iPad Python notebook apps",
    "free Goodnotes alternatives",
  ],
};

const comparisons = [
  {
    slug: "lectra-notes-vs-goodnotes",
    title: "Lectra Notes vs Goodnotes",
    copy: "Handwriting, PDFs, pricing, and the computing environment — where each app genuinely wins.",
  },
  {
    slug: "lectra-notes-vs-notability",
    title: "Lectra Notes vs Notability",
    copy: "Notability owns lecture audio. Lectra Notes owns notes-plus-code. The honest breakdown.",
  },
  {
    slug: "best-note-taking-apps-for-cs-students",
    title: "Best note-taking apps for CS students",
    copy: "Goodnotes, Notability, OneNote, Juno, and Lectra Notes — matched to how CS coursework actually works.",
  },
  {
    slug: "ipad-python-notebook-apps",
    title: "iPad Python notebook apps",
    copy: "Juno, Carnets, Pythonista, a-Shell, and Lectra Notes — every real way to run Python on an iPad.",
  },
  {
    slug: "free-goodnotes-alternatives",
    title: "Free Goodnotes alternatives",
    copy: "The genuinely free iPad note apps in 2026, and what each one gives up.",
  },
];

export default function ComparePage() {
  return (
    <PublicPageFrame active="lectra" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
          ]),
          itemListSchema(
            "Lectra Notes comparisons",
            "/compare",
            comparisons.map((item) => ({
              name: item.title,
              path: `/compare/${item.slug}`,
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
            sourced, and corrected when we&apos;re wrong. If Lectra Notes wins,
            we want it to win on the merits.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad" id="comparisons">
        <h2 className="sr-only">All comparisons</h2>
        <div className="plain-grid" data-reveal>
          {comparisons.map((item) => (
            <Link
              key={item.slug}
              href={`/compare/${item.slug}`}
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
      </section>
    </PublicPageFrame>
  );
}
