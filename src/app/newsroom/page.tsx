import type { Metadata } from "next";
import Link from "next/link";

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

const filterBase =
  "inline-flex min-h-11 items-center rounded-full px-[18px] text-[14.5px] font-semibold ring-1 ring-inset transition-colors";
const filterIdle = "text-ink-soft ring-line hover:text-ink hover:ring-[#d6d0c7]";
const filterActive = "bg-ink text-white ring-ink";

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

      <PageHead
        crumbs={[{ href: "/", label: "Home" }]}
        context="The Scope newsroom"
        title="Building in the open."
        lede={
          <p>
            Releases, format announcements, and the occasional argument about where
            course software should go.
          </p>
        }
      />

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 sm:gap-10 sm:px-8">
        {categories.length > 1 ? (
          <nav aria-label="Filter posts by topic" className="flex flex-wrap gap-x-2.5 gap-y-2">
            <Link
              href="/newsroom"
              aria-current={activeCategory ? undefined : "page"}
              scroll={false}
              className={`${filterBase} ${activeCategory ? filterIdle : filterActive}`}
            >
              All posts
            </Link>
            {categories.map((name) => (
              <Link
                key={name}
                href={`/newsroom?category=${encodeURIComponent(name)}`}
                aria-current={activeCategory === name ? "page" : undefined}
                scroll={false}
                className={`${filterBase} ${activeCategory === name ? filterActive : filterIdle}`}
              >
                {name}
              </Link>
            ))}
          </nav>
        ) : null}

        {featured ? (
          <Link
            href={articlePath(featured)}
            className="group grid gap-4 rounded-[22px] bg-wash p-6 ring-1 ring-inset ring-transparent transition-shadow hover:ring-line sm:p-10 lg:p-12"
          >
            <span className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-stone">
              <span className="rounded-full bg-paper px-3 py-1 text-[13px] font-semibold text-ink ring-1 ring-line">
                {featured.category}
              </span>
              <time dateTime={featured.date}>
                {formatArticleDate(featured.date)}
              </time>
              <span>{articleReadingMinutes(featured)} minute read</span>
            </span>
            <span className="block max-w-[26ch] text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.038em] text-balance text-ink">
              {featured.title}
            </span>
            <span className="block max-w-[62ch] text-[17px] leading-[1.6] text-ink-soft">
              {featured.description}
            </span>
            <span className="mt-1 justify-self-start text-[15.5px] font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors group-hover:decoration-red">
              Read the post
            </span>
          </Link>
        ) : (
          <div className="rounded-[22px] bg-wash p-6 sm:p-10">
            <h2 className="text-[clamp(1.4rem,2.4vw,1.75rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
              No posts yet
            </h2>
            <p className="mt-2 max-w-[56ch] text-[16px] leading-[1.6] text-stone">
              The first one is on its way. Subscribe below and it will reach you when
              it is published.
            </p>
          </div>
        )}
      </div>

      <section
        aria-labelledby="archive-title"
        className="mx-auto max-w-[1200px] px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h2
            id="archive-title"
            className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]"
          >
            {activeCategory ? `Earlier posts in ${activeCategory}` : "Earlier posts"}
          </h2>
          <p className="text-[15px] text-stone">
            {visibleArticles.length === 1
              ? "One post so far."
              : `${visibleArticles.length} posts, newest first.`}
          </p>
        </div>

        <div className="mt-8">
          {rest.length > 0 ? (
            <NewsList articles={rest} showDescription={false} />
          ) : (
            <p className="text-[16px] leading-[1.6] text-stone">
              {featured
                ? "The post above is the only one here so far."
                : "Nothing here yet."}
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
          <a href="/feed.xml" className="link text-[15.5px]">
            Subscribe by RSS
          </a>
          <PreferredSource />
        </div>
      </section>
    </PageShell>
  );
}
