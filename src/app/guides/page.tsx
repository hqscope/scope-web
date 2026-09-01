import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import JsonLd from "@/components/seo/JsonLd";
import { guidePath, guides } from "@/lib/guides";
import { publicPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";

const description =
  "Step-by-step guides for students on Canvas and iPad: how to search every course, what to check before installing a Canvas extension, and how to annotate lecture slides with Apple Pencil.";

export const metadata = publicPageMetadata({
  title: "Guides for Canvas and iPad Note-Taking",
  description,
  path: "/guides",
  keywords: [
    "how to search in Canvas",
    "are Canvas extensions safe",
    "annotate lecture slides iPad",
    "Canvas tips for students",
    "iPad note-taking guide",
  ],
});

export default function GuidesPage() {
  return (
    <PublicPageFrame active="guides" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
          ]),
          itemListSchema(
            "Scope guides",
            "/guides",
            guides.map((guide) => ({
              name: guide.title,
              path: guidePath(guide),
            })),
          ),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Guides</p>
          <h1>The manual way first. Then ours.</h1>
          <p className="centered-hero-lede">
            Answers to the questions students actually search — how to find
            something in Canvas, whether an extension is safe, how to get a
            lecture deck onto an iPad. Each one covers what works without
            installing anything before it mentions Scope for Canvas or Lectra
            Notes.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad" id="all-guides">
        <h2 className="sr-only">All guides</h2>
        <div className="plain-grid" data-reveal>
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={guidePath(guide)}
              className="group block rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 transition-colors hover:border-[var(--color-line-strong)]"
            >
              <h3 className="text-[1.05rem] font-semibold text-[var(--color-ink)]">
                {guide.title}
              </h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
                {guide.copy}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)]">
                Read the guide
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-wrap final-cta" id="compare" data-reveal>
        <div>
          <h2>Deciding between apps?</h2>
          <p>
            The <Link href="/compare">comparisons</Link> put Scope and Lectra
            Notes next to BetterCampus, Tasks for Canvas, Goodnotes, and
            Notability — and say where the other app is better.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
