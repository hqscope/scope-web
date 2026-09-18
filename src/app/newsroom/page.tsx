import type { Metadata } from "next";
import Link from "next/link";

import Sheet from "@/components/motion/Sheet";
import PenMark from "@/components/motion/PenMark";
import JsonLd from "@/components/seo/JsonLd";
import NewsList from "@/components/site/NewsList";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import PreferredSource from "@/components/site/PreferredSource";
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

import "./newsroom.css";

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
    <PageShell active="newsroom">
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

      <Sheet className="newsroom-top" labelledBy="newsroom-title">
        <PageHead
          crumbs={[{ href: "/", label: "Home" }]}
          context="The Scope newsroom"
          title={<span id="newsroom-title">Building in the open.</span>}
          lede={
            <p>
              Releases, format announcements, and the occasional argument about where
              course software should go.
            </p>
          }
        />

        <div className="shell newsroom-body">
          {categories.length > 1 ? (
            <nav className="newsroom-filter" aria-label="Filter posts by topic">
              <Link
                href="/newsroom"
                aria-current={activeCategory ? undefined : "page"}
                scroll={false}
              >
                All posts
              </Link>
              {categories.map((name) => (
                <Link
                  key={name}
                  href={`/newsroom?category=${encodeURIComponent(name)}`}
                  aria-current={activeCategory === name ? "page" : undefined}
                  scroll={false}
                >
                  {name}
                </Link>
              ))}
            </nav>
          ) : null}

          {featured ? (
            <Link href={articlePath(featured)} className="newsroom-lead plane">
              <span className="newsroom-lead-meta">
                <span className="chip chip-pen">{featured.category}</span>
                <time dateTime={featured.date}>{formatArticleDate(featured.date)}</time>
                <span>{articleReadingMinutes(featured)} minute read</span>
              </span>
              <span className="newsroom-lead-title">{featured.title}</span>
              <span className="newsroom-lead-copy">{featured.description}</span>
              <span className="newsroom-lead-cta">
                Read the post
                <PenMark kind="circle" inset="-10px -18px -12px -16px" delay={0.8} />
              </span>
            </Link>
          ) : (
            <div className="note">
              <h2>No posts yet</h2>
              <p style={{ marginTop: 8 }}>
                The first one is on its way. Subscribe below and it will reach you when
                it is published.
              </p>
            </div>
          )}
        </div>
      </Sheet>

      <Sheet className="section newsroom-archive" labelledBy="archive-title">
        <div className="shell">
          <div className="newsroom-archive-head">
            <h2 id="archive-title" className="t-head" data-focus>
              {activeCategory ? `Earlier posts in ${activeCategory}` : "Earlier posts"}
            </h2>
            <p className="margin-note">
              {visibleArticles.length === 1
                ? "One post so far."
                : `${visibleArticles.length} posts, newest first.`}
            </p>
          </div>

          {rest.length > 0 ? (
            <NewsList articles={rest} showDescription={false} />
          ) : (
            <p className="copy">
              {featured
                ? "The post above is the only one here so far."
                : "Nothing here yet."}
            </p>
          )}

          <div className="newsroom-follow">
            <a href="/feed.xml" className="link">
              Subscribe by RSS
            </a>
            <PreferredSource />
          </div>
        </div>
      </Sheet>
    </PageShell>
  );
}
