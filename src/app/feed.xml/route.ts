import { NextResponse } from "next/server";

import { articlePath, newsroomArticles } from "@/lib/newsroom";
import { absoluteUrl } from "@/lib/structured-data";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const latestArticle = newsroomArticles[0];
  const feedUrl = absoluteUrl("/feed.xml");
  const newsroomUrl = absoluteUrl("/newsroom");
  const lastBuildDate = latestArticle
    ? new Date(`${latestArticle.date}T00:00:00.000Z`).toUTCString()
    : new Date().toUTCString();

  const items = newsroomArticles
    .map((article) => {
      const url = absoluteUrl(articlePath(article));

      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(`${article.date}T00:00:00.000Z`).toUTCString()}</pubDate>
      <category>${escapeXml(article.category)}</category>
      <description>${escapeXml(article.description)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Canvascope Newsroom</title>
    <link>${escapeXml(newsroomUrl)}</link>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
    <description>Product updates, engineering notes, and milestones from Canvascope and Lectra.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${items}
  </channel>
</rss>
`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
