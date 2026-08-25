import {
  CHROME_WEB_STORE_URL,
  LECTRA_APP_STORE_URL,
  LECTRA_MAC_DOWNLOAD_URL,
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
    name: "Scope Inc.",
    // Kept so search engines connect the former name to the new one.
    alternateName: ["Canvascope", "Canvascope Inc."],
    url: origin,
    // Same mark as the OAuth consent screen and the app icon, on the brand
    // plaster ground — search engines and Google's brand review see one logo.
    logo: absoluteUrl("/brand/scope-mark-plaster-2048.png"),
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
    name: "Scope",
    alternateName: "Canvascope",
    url: origin,
    publisher: { "@id": `${origin}/#organization` },
    inLanguage: "en",
    about: [
      "Canvas LMS search",
      "Brightspace search",
      "local-first student productivity",
      "cited AI study tools",
      "PDF annotation workflow",
      "iPad Python notebooks",
      "on-device coding workspace",
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
    name: "Scope",
    alternateName: ["Scope for Canvas", "Canvascope"],
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "Student productivity",
    operatingSystem: "ChromeOS, macOS, Windows, Linux",
    browserRequirements: "Requires Google Chrome or a Chromium browser that supports Chrome extensions.",
    url: absoluteUrl("/products/extension"),
    downloadUrl: CHROME_WEB_STORE_URL,
    image: absoluteUrl("/brand/canvascope-extension-screenshot.png"),
    description:
      "Scope is a local-first Chrome extension for Canvas and Brightspace search, cited course-context AI, PDF/OCR indexing, Smart Planner, and Lectra document handoff.",
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
    applicationSubCategory: "Note-taking, PDF annotation, and computational notebooks",
    operatingSystem: "iOS 18+, iPadOS 18+",
    url: absoluteUrl("/products/lectra"),
    downloadUrl: LECTRA_APP_STORE_URL,
    image: absoluteUrl("/brand/lectra-canvascope-lockup.png"),
    description:
      "Lectra Notes is the free App Store app from Scope: an Apple Pencil workspace for handwritten notes and PDF markup with a built-in computing environment — Jupyter-compatible .ipynb notebooks with on-device Python, a code editor, a terminal with git, SSH remote development, and remote desktop to your Mac — plus private on-device study intelligence and an offline-first library.",
    // Matches the live App Store version, not the in-development build.
    softwareVersion: "5.0",
    featureList: [
      "Apple Pencil PDF annotation with a custom vector ink engine",
      "handwritten notebooks with lined, grid, dotted, and Cornell paper styles",
      "document scanner with auto-capture",
      "typed text boxes that export as selectable PDF text",
      "document import and organization with folders, tags, and favorites",
      "in-document search and handwriting-aware library search",
      "Jupyter-compatible .ipynb notebooks running on-device Python with numpy, pandas, and matplotlib — fully offline",
      "code editor with syntax highlighting for Python, JavaScript, C++, and more",
      "built-in terminal with git, python, and pip",
      "GitHub repository browsing, clone, pull, and push",
      "SSH remote development with a full terminal emulator",
      "remote desktop to your Mac, using the free Lectra for Mac app",
      "on-device AI summaries, flashcards, quizzes, and grounded Q&A on supported devices",
      "flattened, text-preserving PDF export with an invisible OCR layer",
      "hybrid PDF export that opens in any PDF reader and re-imports with editable ink",
      "Shortcuts and Siri App Intents",
      "Scope DropBridge handoff to and from the browser",
      "works fully offline — free, with no tiers, subscriptions, or analytics",
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

/**
 * WebPage node for a Lectra feature subpage. References the single
 * `#lectra-ipad` entity by @id so every page describes one application —
 * never a second SoftwareApplication node with drifting facts.
 */
export function lectraFeaturePageSchema(
  name: string,
  path: string,
  description: string,
) {
  const origin = siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    name,
    url: absoluteUrl(path),
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${origin}/#website` },
    about: { "@id": `${origin}/#lectra-ipad` },
    publisher: { "@id": `${origin}/#organization` },
  };
}

export function howToSchema(
  name: string,
  path: string,
  description: string,
  steps: { name: string; text: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: absoluteUrl(path),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Article node for an evergreen /compare page. Deliberately not BlogPosting —
 * comparisons are versioned reference pages, not dated newsroom posts.
 */
export function comparisonArticleSchema(
  headline: string,
  path: string,
  description: string,
  datePublished: string,
  dateModified: string,
) {
  const origin = siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline,
    description,
    datePublished,
    dateModified,
    inLanguage: "en",
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    about: { "@id": `${origin}/#lectra-ipad` },
    author: { "@id": `${origin}/#organization` },
    publisher: { "@id": `${origin}/#organization` },
  };
}

/**
 * Minimal node for a competitor app on a comparison page: name and official
 * URL only. Never attach ratings, prices, or feature lists we don't control —
 * those live in the visible, dated page copy where they can be corrected.
 */
export function competitorAppNode(name: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url,
  };
}

export function lectraMacSoftwareSchema() {
  const origin = siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${origin}/#lectra-mac`,
    name: "Lectra for Mac",
    // Kept so the absorbed companion app's name still resolves to this page.
    alternateName: ["Lectra Receiver", "Lectra Mac app"],
    applicationCategory: "EducationalApplication",
    applicationSubCategory:
      "Note-taking, PDF annotation, and remote desktop host",
    operatingSystem: "macOS",
    url: absoluteUrl("/mac"),
    downloadUrl: absoluteUrl(LECTRA_MAC_DOWNLOAD_URL),
    image: absoluteUrl("/brand/lectra-canvascope-lockup.png"),
    description:
      "Lectra for Mac is the free, notarized Mac app from Scope: read and mark up documents by hand with a mouse or trackpad, run Jupyter-compatible notebooks on on-device Python, use a code editor and a terminal with git — and let Lectra on your iPad see and control the Mac, receive documents sent from the iPad, and share a clipboard. It replaces the standalone Lectra Receiver companion app.",
    featureList: [
      "handwritten markup and typed text boxes on PDFs, with mouse or trackpad",
      "document library with folders, favorites, and search",
      "Jupyter-compatible notebooks running on-device Python — fully offline",
      "code editor, shell, and git on device",
      "remote desktop host for Lectra on iPad — screen, keyboard, trackpad, and Pencil input",
      "multi-display remote sessions over an encrypted connection",
      "receives documents sent from Lectra on iPad",
      "shared clipboard between the iPad session and the Mac",
      "remote wake for the Mac",
      "notarized Developer ID direct download",
      "free, with no tiers or subscriptions",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: absoluteUrl("/mac"),
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
    url: absoluteUrl("/products/agent-workspace"),
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
      url: absoluteUrl("/products/agent-workspace"),
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
      name: "Scope Newsroom",
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
    name: "Scope Newsroom",
    description:
      "Product updates, engineering notes, milestones, and release updates from Scope and Lectra.",
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
