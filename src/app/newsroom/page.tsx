import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rss } from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  itemListSchema,
  newsroomCollectionSchema,
} from "@/lib/structured-data";
import {
  articlePath,
  articleReadingMinutes,
  formatArticleDate,
  newsroomArticles,
} from "@/lib/newsroom";

export const metadata: Metadata = {
  title: "Canvascope Newsroom",
  description:
    "Product updates, engineering notes, launch milestones, and release updates for Canvascope, Lectra, DropBridge, local-first LMS search, and cited AI study workflows.",
  alternates: {
    canonical: "/newsroom",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  keywords: [
    "Canvascope blog",
    "Canvascope newsroom",
    "Lectra updates",
    "Canvas LMS search",
    "Brightspace search",
    "DropBridge",
    "on-device AI",
    "student productivity",
  ],
  openGraph: {
    title: "Canvascope Newsroom",
    description:
      "Product updates and engineering notes from the team behind Canvascope and Lectra.",
    type: "website",
    url: "/newsroom",
  },
  twitter: {
    card: "summary_large_image",
    title: "Canvascope Newsroom",
    description:
      "Product updates, engineering notes, and milestones from Canvascope and Lectra.",
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

  const [featuredArticle, ...restArticles] = visibleArticles;
  const latestArticles = restArticles.slice(0, 3);
  const moreArticles = restArticles.slice(3, 6);

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
            "Canvascope Newsroom articles",
            "/newsroom",
            newsroomArticles.map((article) => ({
              name: article.title,
              path: articlePath(article),
            })),
          ),
        ]}
      />

      <section className="page-wrap news-hero">
        <div className="news-hero-top" data-reveal>
          <div>
            <p className="kicker">Newsroom</p>
            <h1>News &amp; updates</h1>
          </div>
          <p>
            Product releases, engineering notes, and company news from the team
            behind Canvascope and Lectra.
          </p>
        </div>

        <nav className="news-filter-row" aria-label="Filter by category">
          <Link
            href="/newsroom"
            aria-current={activeCategory === null ? "page" : undefined}
          >
            All
          </Link>
          {categories.map((item) => (
            <Link
              key={item}
              href={`/newsroom?category=${encodeURIComponent(item)}`}
              aria-current={activeCategory === item ? "page" : undefined}
            >
              {item}
            </Link>
          ))}
          <a href="/feed.xml" aria-label="RSS feed">
            <Rss className="inline h-3.5 w-3.5" aria-hidden="true" /> RSS
          </a>
        </nav>
      </section>

      {featuredArticle ? (
        <section className="page-wrap news-split">
          <Link
            href={articlePath(featuredArticle)}
            className="news-featured"
            data-reveal
          >
            <div className="news-meta">
              <span>{featuredArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{formatArticleDate(featuredArticle.date)}</span>
              <span aria-hidden="true">·</span>
              <span>{articleReadingMinutes(featuredArticle)} min read</span>
            </div>
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.lede ?? featuredArticle.description}</p>
          </Link>

          {latestArticles.length > 0 ? (
            <div className="news-latest" data-reveal>
              <p>LATEST</p>
              {latestArticles.map((article) => (
                <Link key={article.slug} href={articlePath(article)}>
                  <span>{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{formatArticleDate(article.date)}</p>
                </Link>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {moreArticles.length > 0 ? (
        <section className="page-wrap section-pad-sm">
          <div className="news-section-head">
            <h2>More stories</h2>
            <Link href="#archive" className="text-link">
              View archive →
            </Link>
          </div>
          <div className="news-more-grid" data-reveal>
            {moreArticles.map((article) => (
              <Link key={article.slug} href={articlePath(article)}>
                <div className="news-meta">
                  <span>{article.category}</span>
                  <span>{formatArticleDate(article.date)}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-band" id="archive">
        <div className="page-wrap newsroom-archive">
          <div className="section-heading">
            <p className="kicker kicker-muted">Archive</p>
            <h2>
              {activeCategory
                ? `All ${activeCategory} notes.`
                : "All Canvascope product notes."}
            </h2>
          </div>

          <div className="newsroom-archive-list">
            {visibleArticles.map((article) => (
              <Link
                key={article.slug}
                href={articlePath(article)}
                className="newsroom-archive-row"
              >
                <span>{formatArticleDate(article.date)}</span>
                <div>
                  <h3>{article.title}</h3>
                  <p>
                    {article.category} · {articleReadingMinutes(article)} min read
                  </p>
                </div>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicPageFrame>
  );
}
