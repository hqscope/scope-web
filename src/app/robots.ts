import type { MetadataRoute } from "next";

import { getConfiguredSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getConfiguredSiteUrl() ?? "https://www.canvascope.org";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/products/", "/newsroom/", "/feed.xml", "/privacy", "/terms"],
        disallow: ["/app/", "/api/", "/auth/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
