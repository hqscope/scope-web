import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/seo/JsonLd";
import ArticleShell from "@/components/site/ArticleShell";
import Mark from "@/components/site/Mark";
import NewsList from "@/components/site/NewsList";
import PageShell from "@/components/site/PageShell";
import PreferredSource from "@/components/site/PreferredSource";
import {
  articleSchema,
  breadcrumbSchema,
  itemListSchema,
} from "@/lib/structured-data";
import {
  articlePath,
  articleReadingMinutes,
  formatArticleDate,
  getNewsroomArticle,
  newsroomArticles,
} from "@/lib/newsroom";

type NewsroomArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsroomArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: NewsroomArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsroomArticle(slug);

  if (!article) {
    return {};
  }

  const path = articlePath(article);

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    keywords: [...article.keywords, article.category, "Scope", "Lectra"],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: path,
      publishedTime: article.date,
      modifiedTime: article.date,
      section: article.category,
      tags: article.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function NewsroomArticlePage({
  params,
}: NewsroomArticlePageProps) {
  const { slug } = await params;
  const article = getNewsroomArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = newsroomArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .filter((candidate) => candidate.category === article.category)
    .slice(0, 3);

  const fallbackRelatedArticles = newsroomArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 3);

  const surfacedRelatedArticles =
    relatedArticles.length > 0 ? relatedArticles : fallbackRelatedArticles;

  const readingMinutes = articleReadingMinutes(article);

  return (
    <PageShell active="newsroom">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Newsroom", path: "/newsroom" },
            { name: article.title, path: articlePath(article) },
          ]),
          articleSchema(article),
          itemListSchema(
            `Related Scope updates for ${article.title}`,
            articlePath(article),
            surfacedRelatedArticles.map((relatedArticle) => ({
              name: relatedArticle.title,
              path: articlePath(relatedArticle),
            })),
          ),
        ]}
      />

      <article aria-labelledby="post-title">
        <header className="mx-auto max-w-[1200px] px-5 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-16">
          {/* 70ch at 17px matches the reading column below. */}
          <div className="max-w-[70ch] text-[17px]">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 text-[14px] text-stone">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href="/newsroom" className="hover:text-ink">
                    Newsroom
                  </Link>
                </li>
              </ol>
            </nav>

            <h1
              id="post-title"
              className="mt-6 max-w-[22ch] text-[clamp(2.1rem,4.6vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.042em] text-balance"
            >
              {article.title}
            </h1>

            <p className="mt-6 max-w-[58ch] text-[18px] leading-[1.6] text-ink-soft">
              {article.lede ?? article.description}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
              <div>
                <dt className="text-[13.5px] text-stone">Published</dt>
                <dd className="mt-0.5 text-[15.5px] font-semibold text-ink">
                  <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                </dd>
              </div>
              <div>
                <dt className="text-[13.5px] text-stone">Topic</dt>
                <dd className="mt-0.5 text-[15.5px]">
                  <Link
                    href={`/newsroom?category=${encodeURIComponent(article.category)}`}
                    className="link"
                  >
                    {article.category}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="text-[13.5px] text-stone">Reading time</dt>
                <dd className="mt-0.5 text-[15.5px] font-semibold text-ink">
                  {readingMinutes} {readingMinutes === 1 ? "minute" : "minutes"}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <ArticleShell>
          {article.body.map((block, index) => {
            if (block.type === "list") {
              return (
                <ul key={index}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }

            return <p key={index}>{block.text}</p>;
          })}

          <footer className="mt-12 flex items-center gap-3.5 border-t border-line pt-6">
            <Mark size={26} className="shrink-0" />
            <Link href="/newsroom" className="link">
              Back to the newsroom
            </Link>
          </footer>
        </ArticleShell>
      </article>

      <section aria-labelledby="post-more-title" className="bg-wash">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <h2
              id="post-more-title"
              className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]"
            >
              {relatedArticles.length > 0
                ? `More in ${article.category}`
                : "More from the newsroom"}
            </h2>
            <Link href="/newsroom" className="link text-[15.5px]">
              All posts
            </Link>
          </div>

          {surfacedRelatedArticles.length > 0 ? (
            <div className="mt-8">
              <NewsList articles={surfacedRelatedArticles} showDescription={false} />
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            <a href="/feed.xml" className="link text-[15.5px]">
              Subscribe by RSS
            </a>
            <PreferredSource label="Prefer Scope on Google" markedLabel="Preferred on Google" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
