import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";

import PreferredSourceLink from "@/components/public/PreferredSourceLink";
import PublicPageFrame from "@/components/public/PublicPageFrame";
import JsonLd from "@/components/seo/JsonLd";
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

  return (
    <PublicPageFrame>
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

      <article className="article-page">
        <header className="page-wrap article-header">
          <Link href="/newsroom" className="article-back-link">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Newsroom
          </Link>
          <p className="newsroom-card-meta">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {formatArticleDate(article.date)} · {article.category} ·{" "}
            {articleReadingMinutes(article)} min read
          </p>
          <h1>{article.title}</h1>
          <p>{article.lede ?? article.description}</p>
        </header>

        <div className="page-wrap article-layout">
          <div className="article-body">
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

          <aside className="article-related" aria-label="Related updates">
            <p className="kicker">Related</p>
            <div>
              {surfacedRelatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  href={articlePath(relatedArticle)}
                  className="article-related-link"
                >
                  <span>{formatArticleDate(relatedArticle.date)}</span>
                  <strong>{relatedArticle.title}</strong>
                </Link>
              ))}
            </div>
            <Link href="/newsroom" className="article-all-link">
              All updates
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <PreferredSourceLink label="Prefer Scope on Google" />
          </aside>
        </div>
      </article>
    </PublicPageFrame>
  );
}
