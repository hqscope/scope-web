import {
  CHROME_WEB_STORE_URL,
  LECTRA_APP_STORE_URL,
  SUPPORT_EMAIL,
  getConfiguredSiteUrl,
} from "@/lib/site";
import type { NewsroomArticle } from "@/lib/newsroom";

const FALLBACK_SITE_URL = "https://www.canvascope.org";

/** Absolute origin used for all structured-data URLs. */
export function siteOrigin(): string {
  return getConfiguredSiteUrl() ?? FALLBACK_SITE_URL;
}

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) {
    return path;
  }

  return `${siteOrigin()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema() {
  const origin = siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: "Canvascope Inc.",
    url: origin,
    logo: absoluteUrl("/brand/canvascope-logo-horizontal.png"),
    email: SUPPORT_EMAIL,
    sameAs: [CHROME_WEB_STORE_URL],
  };
}

export function websiteSchema() {
  const origin = siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: "Canvascope",
    url: origin,
    publisher: { "@id": `${origin}/#organization` },
    inLanguage: "en",
    about: [
      "Canvas LMS search",
      "Brightspace search",
      "local-first student productivity",
      "cited AI study tools",
      "PDF annotation workflow",
    ],
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export type FaqEntry = { question: string; answer: string };

export function faqSchema(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

function newsroomArticlePath(article: Pick<NewsroomArticle, "slug">): string {
  return `/newsroom/${article.slug}`;
}

function newsroomArticlePlainText(article: NewsroomArticle): string {
  return article.body
    .flatMap((block) => (block.type === "paragraph" ? [block.text] : block.items))
    .join(" ");
}

export function canvascopeSoftwareSchema() {
  const origin = siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${origin}/#canvascope-extension`,
    name: "Canvascope",
    alternateName: "Canvascope Chrome Extension",
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "Student productivity",
    operatingSystem: "ChromeOS, macOS, Windows, Linux",
    browserRequirements: "Requires Google Chrome or a Chromium browser that supports Chrome extensions.",
    url: absoluteUrl("/product/canvascope"),
    downloadUrl: CHROME_WEB_STORE_URL,
    image: absoluteUrl("/brand/canvascope-extension-screenshot.png"),
    description:
      "Canvascope is a local-first Chrome extension for Canvas and Brightspace search, cited course-context AI, PDF/OCR indexing, Smart Planner, and Lectra document handoff.",
    softwareVersion: "10.1",
    featureList: [
      "Canvas and Brightspace course search",
      "local PDF text extraction and OCR search",
      "cited AI answers grounded in course context",
      "Smart Planner study-block drafting",
      "Student Profile personalization",
      "DropBridge document handoff with Lectra",
      "Attach from Lectra browser upload picker",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: CHROME_WEB_STORE_URL,
      availability: "https://schema.org/InStock",
    },
    publisher: { "@id": `${origin}/#organization` },
  };
}

export function lectraSoftwareSchema() {
  const origin = siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": `${origin}/#lectra-ipad`,
    name: "Lectra Notes",
    alternateName: "Lectra",
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "PDF annotation",
    operatingSystem: "iOS, iPadOS",
    url: absoluteUrl("/product/lectra"),
    downloadUrl: LECTRA_APP_STORE_URL,
    image: absoluteUrl("/brand/lectra-canvascope-lockup.png"),
    description:
      "Lectra Notes is the App Store app from Canvascope for importing documents, organizing readings, annotating PDFs with Apple Pencil, using private on-device intelligence, backing up the library, and handing finished files back to Canvascope.",
    featureList: [
      "Apple Pencil PDF annotation",
      "document import and organization",
      "on-device document summaries and study aids",
      "Shortcuts and Siri App Intents",
      "Canvascope DropBridge export receipts",
      "Attach from Lectra browser return workflow",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: LECTRA_APP_STORE_URL,
      availability: "https://schema.org/InStock",
    },
    publisher: { "@id": `${origin}/#organization` },
  };
}

export function agentWorkspaceSoftwareSchema() {
  const origin = siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${origin}/#agent-workspace`,
    name: "Agent Workspace",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "AI agent mission control",
    operatingSystem: "macOS",
    url: absoluteUrl("/product/agent-workspace"),
    // No downloadUrl until launch — set it alongside
    // AGENT_WORKSPACE_DOWNLOAD_URL in src/lib/site.ts.
    description:
      "Agent Workspace is a Mac app that turns every live AI coding session into a worker in an animated office. Claude Code, Codex, and Gemini agents appear the moment they start — typing, thinking, and raising a hand when they need you.",
    featureList: [
      "live animated office view of coding agents",
      "a floor for every repository",
      "working, thinking, waiting, idle, and done at a glance",
      "click a worker to jump to its terminal",
      "menu-bar count of active agents",
      "always-on-top compact mode",
      "zero setup — sessions appear on their own",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      url: absoluteUrl("/product/agent-workspace"),
    },
    publisher: { "@id": `${origin}/#organization` },
  };
}

export function videoObjectSchema(
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  contentUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: absoluteUrl(thumbnailUrl),
    uploadDate,
    contentUrl: absoluteUrl(contentUrl),
  };
}


export function articleSchema(article: NewsroomArticle) {
  const origin = siteOrigin();
  const path = newsroomArticlePath(article);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#article`,
    headline: article.title,
    description: article.description,
    articleSection: article.category,
    keywords: article.keywords.join(", "),
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "en",
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl("/opengraph-image"),
    articleBody: newsroomArticlePlainText(article),
    isPartOf: {
      "@type": "Blog",
      "@id": `${origin}/newsroom#blog`,
      name: "Canvascope Newsroom",
    },
    author: { "@id": `${origin}/#organization` },
    publisher: { "@id": `${origin}/#organization` },
  };
}

export function newsroomCollectionSchema(articles: NewsroomArticle[]) {
  const origin = siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${origin}/newsroom#blog`,
    name: "Canvascope Newsroom",
    description:
      "Product updates, engineering notes, milestones, and release updates from Canvascope and Lectra.",
    url: absoluteUrl("/newsroom"),
    publisher: { "@id": `${origin}/#organization` },
    blogPost: articles.slice(0, 12).map((article) => ({
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(newsroomArticlePath(article))}#article`,
      headline: article.title,
      datePublished: article.date,
      url: absoluteUrl(newsroomArticlePath(article)),
    })),
  };
}

export function itemListSchema(
  name: string,
  path: string,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
