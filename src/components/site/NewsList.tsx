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
    <ul className="divide-y divide-line border-y border-line">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link
            href={articlePath(article)}
            className="group grid gap-x-8 gap-y-1.5 py-6 sm:grid-cols-[minmax(0,1fr)_9rem]"
          >
            <span className="min-w-0">
              <span className="block text-[18px] font-semibold leading-snug tracking-[-0.02em] text-ink group-hover:text-red">
                {article.title}
              </span>
              <span className="mt-1.5 block max-w-[68ch] text-[15.5px] leading-[1.55] text-stone">
                {showDescription ? article.description : article.category}
              </span>
            </span>
            <time className="text-[14px] text-stone sm:pt-1 sm:text-right" dateTime={article.date}>
              {formatArticleDate(article.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
