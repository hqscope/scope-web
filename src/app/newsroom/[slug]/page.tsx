import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Sheet from "@/components/motion/Sheet";
import JsonLd from "@/components/seo/JsonLd";
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

import "../newsroom.css";

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

      <Sheet as="article" className="post" labelledBy="post-title">
        <div className="shell post-column">
          <header className="post-head">
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/newsroom">Newsroom</Link>
                </li>
              </ol>
            </nav>

            <h1 id="post-title" className="t-title post-title" data-focus>
              {article.title}
            </h1>

            <p className="lede post-lede">{article.lede ?? article.description}</p>

            <dl className="post-meta">
              <div>
                <dt>Published</dt>
                <dd>
                  <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                </dd>
              </div>
              <div>
                <dt>Topic</dt>
                <dd>
                  <Link
                    href={`/newsroom?category=${encodeURIComponent(article.category)}`}
                    className="link"
                  >
                    {article.category}
                  </Link>
                </dd>
              </div>
              <div>
                <dt>Reading time</dt>
                <dd>
                  {readingMinutes} {readingMinutes === 1 ? "minute" : "minutes"}
                </dd>
              </div>
            </dl>
          </header>

          <div className="prose post-body">
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
          </div>

          <footer className="post-sign">
            <Mark size={26} />
            <Link href="/newsroom" className="link">
              Back to the newsroom
            </Link>
          </footer>
        </div>
      </Sheet>

      <Sheet className="section-tight post-more" labelledBy="post-more-title">
        <div className="shell post-more-inner">
          <div className="newsroom-archive-head">
            <h2 id="post-more-title" className="t-head" data-focus>
              {relatedArticles.length > 0
                ? `More in ${article.category}`
                : "More from the newsroom"}
            </h2>
            <Link href="/newsroom" className="link">
              All posts
            </Link>
          </div>

          {surfacedRelatedArticles.length > 0 ? (
            <NewsList articles={surfacedRelatedArticles} showDescription={false} />
          ) : null}

          <div className="newsroom-follow">
            <a href="/feed.xml" className="link">
              Subscribe by RSS
            </a>
            <PreferredSource label="Prefer Scope on Google" markedLabel="Preferred on Google" />
          </div>
        </div>
      </Sheet>
    </PageShell>
  );
}
