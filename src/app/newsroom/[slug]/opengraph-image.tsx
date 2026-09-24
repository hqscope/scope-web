import {
  formatArticleDate,
  getNewsroomArticle,
  newsroomArticles,
} from "@/lib/newsroom";
import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "@/lib/og-card";

export const alt = "Scope Newsroom";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return newsroomArticles.map((article) => ({ slug: article.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsroomArticle(slug);

  return renderCard({
    label: article ? `Newsroom, ${article.category}` : "Newsroom",
    title: article
      ? article.title
      : "Product updates and engineering notes from Scope and Lectra Notes",
    footer: "canvascope.org/newsroom",
    note: article ? formatArticleDate(article.date) : undefined,
  });
}
