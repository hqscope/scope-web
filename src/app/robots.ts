import type { MetadataRoute } from "next";

import { getConfiguredSiteUrl } from "@/lib/site";

// Sign-in, auth callbacks, the admin area, and API routes. /login is kept
// out of this list on purpose: it carries a noindex tag, and a robots block
// would stop crawlers from ever reading it.
const PRIVATE_PATHS = ["/app/", "/api/", "/auth/"];

/**
 * The crawlers behind search and answer engines, named explicitly. The
 * wildcard rule already allows them; listing them documents the decision
 * and means a future tightening of "*" can never silently drop the agents
 * that decide whether this site can be cited at all.
 *
 *   - Retrieval (what an engine reads to answer a question): OAI-SearchBot,
 *     ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot,
 *     Claude-User, Bingbot, Applebot.
 *   - Training / grounding opt-in tokens: GPTBot, ClaudeBot, Google-Extended,
 *     Applebot-Extended. None of these affect Search ranking.
 */
const ANSWER_ENGINE_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getConfiguredSiteUrl() ?? "https://www.canvascope.org";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: ANSWER_ENGINE_AGENTS,
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
