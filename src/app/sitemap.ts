import type { MetadataRoute } from "next";

import { articlePath, newsroomArticles } from "@/lib/newsroom";
import { getConfiguredSiteUrl } from "@/lib/site";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

const SEO_UPDATE_DATE = "2026-07-02";

const publicRoutes: {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  lastModified: string;
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly", lastModified: SEO_UPDATE_DATE },
  {
    path: "/product/canvascope",
    priority: 0.95,
    changeFrequency: "weekly",
    lastModified: SEO_UPDATE_DATE,
  },
  {
    path: "/product/lectra",
    priority: 0.92,
    changeFrequency: "weekly",
    lastModified: SEO_UPDATE_DATE,
  },
  {
    path: "/product/agent-workspace",
    priority: 0.9,
    changeFrequency: "weekly",
    lastModified: "2026-07-22",
  },
  {
    path: "/receiver",
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: "2026-07-15",
  },
  {
    path: "/support/lectra",
    priority: 0.45,
    changeFrequency: "monthly",
    lastModified: "2026-07-05",
  },
  {
    path: "/newsroom",
    priority: 0.8,
    changeFrequency: "weekly",
    lastModified: SEO_UPDATE_DATE,
  },
  {
    path: "/research",
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: SEO_UPDATE_DATE,
  },
  {
    path: "/privacy",
    priority: 0.35,
    changeFrequency: "yearly",
    lastModified: "2026-06-19",
  },
  {
    path: "/terms",
    priority: 0.35,
    changeFrequency: "yearly",
    lastModified: "2026-06-19",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getConfiguredSiteUrl() ?? "https://www.canvascope.org";
  const articleRoutes = newsroomArticles.map((article) => ({
    path: articlePath(article),
    priority: article.date >= "2026-06-01" ? 0.68 : 0.58,
    changeFrequency: "monthly" as ChangeFrequency,
    lastModified: article.date,
  }));

  return [...publicRoutes, ...articleRoutes].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(`${route.lastModified}T00:00:00.000Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
