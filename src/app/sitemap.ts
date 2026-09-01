import type { MetadataRoute } from "next";

import { comparePath, comparisons } from "@/lib/compare";
import { guidePath, guides } from "@/lib/guides";
import { articlePath, newsroomArticles } from "@/lib/newsroom";
import { getConfiguredSiteUrl } from "@/lib/site";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

/**
 * The day of the last content pass over the marketing pages. Dates are
 * hand-set per route and moved when a page's content actually changes —
 * never the build date, which crawlers learn to ignore.
 */
const MARKETING_LAST_MODIFIED = "2026-09-01";

const publicRoutes: {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  lastModified: string;
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly", lastModified: MARKETING_LAST_MODIFIED },
  {
    path: "/products/extension",
    priority: 0.95,
    changeFrequency: "weekly",
    lastModified: MARKETING_LAST_MODIFIED,
  },
  {
    path: "/products/lectra",
    priority: 0.92,
    changeFrequency: "weekly",
    lastModified: MARKETING_LAST_MODIFIED,
  },
  {
    path: "/products/lectra/notebooks",
    priority: 0.85,
    changeFrequency: "monthly",
    lastModified: "2026-08-25",
  },
  {
    path: "/products/lectra/code",
    priority: 0.85,
    changeFrequency: "monthly",
    lastModified: "2026-08-25",
  },
  {
    path: "/products/polya",
    priority: 0.85,
    changeFrequency: "monthly",
    lastModified: "2026-08-25",
  },
  {
    path: "/products/agent-workspace",
    priority: 0.9,
    changeFrequency: "weekly",
    lastModified: MARKETING_LAST_MODIFIED,
  },
  {
    path: "/compare",
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified: MARKETING_LAST_MODIFIED,
  },
  {
    path: "/guides",
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified: MARKETING_LAST_MODIFIED,
  },
  // /receiver still serves this page for shipped Receiver builds, but it
  // canonicalises to /mac, so only /mac belongs in the sitemap.
  {
    path: "/mac",
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: "2026-08-14",
  },
  {
    path: "/press",
    priority: 0.5,
    changeFrequency: "monthly",
    lastModified: MARKETING_LAST_MODIFIED,
  },
  {
    path: "/support",
    priority: 0.5,
    changeFrequency: "monthly",
    lastModified: MARKETING_LAST_MODIFIED,
  },
  {
    path: "/support/lectra",
    priority: 0.45,
    changeFrequency: "monthly",
    lastModified: MARKETING_LAST_MODIFIED,
  },
  {
    path: "/newsroom",
    priority: 0.8,
    changeFrequency: "weekly",
    lastModified: "2026-08-24",
  },
  {
    path: "/direction",
    priority: 0.75,
    changeFrequency: "monthly",
    lastModified: MARKETING_LAST_MODIFIED,
  },
  {
    path: "/research",
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: MARKETING_LAST_MODIFIED,
  },
  {
    path: "/privacy",
    priority: 0.35,
    changeFrequency: "yearly",
    lastModified: MARKETING_LAST_MODIFIED,
  },
  {
    path: "/terms",
    priority: 0.35,
    changeFrequency: "yearly",
    lastModified: MARKETING_LAST_MODIFIED,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getConfiguredSiteUrl() ?? "https://www.canvascope.org";

  const comparisonRoutes = comparisons.map((comparison) => ({
    path: comparePath(comparison),
    priority: 0.8,
    changeFrequency: "monthly" as ChangeFrequency,
    lastModified: comparison.dateModified,
  }));

  const guideRoutes = guides.map((guide) => ({
    path: guidePath(guide),
    priority: 0.8,
    changeFrequency: "monthly" as ChangeFrequency,
    lastModified: guide.dateModified,
  }));

  const articleRoutes = newsroomArticles.map((article) => ({
    path: articlePath(article),
    priority: article.date >= "2026-06-01" ? 0.68 : 0.58,
    changeFrequency: "monthly" as ChangeFrequency,
    lastModified: article.date,
  }));

  return [
    ...publicRoutes,
    ...comparisonRoutes,
    ...guideRoutes,
    ...articleRoutes,
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(`${route.lastModified}T00:00:00.000Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
