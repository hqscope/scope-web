import type { Metadata } from "next";
import Link from "next/link";

import PreferredSourceLink from "@/components/public/PreferredSourceLink";
import PublicPageFrame from "@/components/public/PublicPageFrame";
import ScopeMark from "@/components/public/ScopeMark";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  itemListSchema,
  newsroomCollectionSchema,
} from "@/lib/structured-data";
import {
  articlePath,
  formatArticleDate,
  newsroomArticles,
} from "@/lib/newsroom";

export const metadata: Metadata = {
  title: "Scope Newsroom",
  description:
    "Product updates, engineering notes, launch milestones, and release updates for Scope, Lectra, DropBridge, local-first LMS search, and cited AI study workflows.",
  alternates: {
    canonical: "/newsroom",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  keywords: [
    "Scope blog",
    "Scope newsroom",
    "Lectra updates",
    "Canvas LMS search",
    "Brightspace search",
    "DropBridge",
    "on-device AI",
    "student productivity",
  ],
  openGraph: {
    title: "Scope Newsroom",
    description:
      "Product updates and engineering notes from the team behind Scope and Lectra.",
    type: "website",
    url: "/newsroom",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scope Newsroom",
    description:
      "Product updates, engineering notes, and milestones from Scope and Lectra.",
  },
};

const categories = Array.from(
  new Set(newsroomArticles.map((article) => article.category)),
);

export default async function NewsroomPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory =
    category && categories.includes(category) ? category : null;

  const visibleArticles = activeCategory
    ? newsroomArticles.filter((article) => article.category === activeCategory)
    : newsroomArticles;

  // The newest post leads. Filtering swaps it for the newest in that
  // category, so the featured slot is never empty or stale.
  const [featured, ...rest] = visibleArticles;

  return (
    <PublicPageFrame active="newsroom" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Newsroom", path: "/newsroom" },
          ]),
          newsroomCollectionSchema(newsroomArticles),
          itemListSchema(
            "Scope newsroom posts",
            "/newsroom",
            newsroomArticles.slice(0, 12).map((article) => ({
              name: article.title,
              path: articlePath(article),
            })),
          ),
        ]}
      />

      {/* --- Hero --- */}
      <section className="page-wrap news-hero" data-reveal>
        <p className="kicker">Newsroom</p>
        <h1>Building in the open.</h1>
        <p className="section-copy">
          Releases, format announcements, and the occasional argument about
          where course software should go.
        </p>
        <div className="news-filter-row">
          <Link
            href="/newsroom"
            className={activeCategory ? undefined : "is-active"}
          >
            All
          </Link>
          {categories.map((name) => (
            <Link
              key={name}
              href={`/newsroom?category=${encodeURIComponent(name)}`}
              className={activeCategory === name ? "is-active" : undefined}
            >
              {name}
            </Link>
          ))}
        </div>
      </section>

      {/* --- The lead --- */}
      {featured ? (
        <section className="page-wrap strip-section" data-reveal>
          <Link href={articlePath(featured)} className="news-featured">
            <span className="news-featured-plate">
              <ScopeMark size={72} />
              <span>{featured.category}</span>
            </span>
            <span className="news-featured-copy">
              <span className="news-meta">
                {formatArticleDate(featured.date)} · {featured.category}
              </span>
              <strong>{featured.title}</strong>
              <span className="section-copy">{featured.description}</span>
              <span className="text-link">Read the post →</span>
            </span>
          </Link>
        </section>
      ) : null}

      {/* --- The archive --- */}
      <section className="section-band">
        <div className="page-wrap newsroom-archive-list">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={articlePath(article)}
              className="newsroom-archive-row"
            >
              <span>{formatArticleDate(article.date)}</span>
              <span>{article.title}</span>
              <span>{article.category}</span>
            </Link>
          ))}
        </div>

        <div className="page-wrap stack-top link-row">
          <a href="/feed.xml" className="text-link">
            Subscribe by RSS →
          </a>
          <PreferredSourceLink />
        </div>
      </section>
    </PublicPageFrame>
  );
}
