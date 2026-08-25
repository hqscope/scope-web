import Link from "next/link";

import type { NewsroomArticle } from "@/lib/newsroom";
import { articlePath, formatArticleDate } from "@/lib/newsroom";

type NewsroomTeaserGridProps = {
  articles: NewsroomArticle[];
  kicker?: string;
  title: string;
  copy?: string;
  ctaLabel?: string;
};

export default function NewsroomTeaserGrid({
  articles,
  kicker,
  title,
  copy,
  ctaLabel = "Read the newsroom",
}: NewsroomTeaserGridProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="page-wrap newsroom-teaser-section">
      <div className="newsroom-teaser-heading">
        <div>
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h2>{title}</h2>
          {copy ? <p>{copy}</p> : null}
        </div>
        <Link href="/newsroom" className="text-link">
          {ctaLabel}
        </Link>
      </div>

      <div className="newsroom-teaser-grid">
        {articles.map((article) => (
          <Link key={article.slug} href={articlePath(article)} className="newsroom-teaser-card">
            <span className="newsroom-card-meta">
              {formatArticleDate(article.date)}
            </span>
            <h3>{article.title}</h3>
            <span className="text-link">Read →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
