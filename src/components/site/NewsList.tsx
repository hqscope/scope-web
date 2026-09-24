import Link from "next/link";

import type { NewsroomArticle } from "@/lib/newsroom";
import { articlePath, formatArticleDate } from "@/lib/newsroom";

/** Newsroom posts as an index: title, description, date. */
export default function NewsList({
  articles,
  showDescription = true,
}: {
  articles: NewsroomArticle[];
  showDescription?: boolean;
}) {
  return (
    <ul className="index-list">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link href={articlePath(article)}>
            <span className="index-title">
              <span>{article.title}</span>
            </span>
            {showDescription ? (
              <span className="index-copy">{article.description}</span>
            ) : (
              <span className="index-copy">{article.category}</span>
            )}
            <time className="index-meta" dateTime={article.date}>
              {formatArticleDate(article.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
