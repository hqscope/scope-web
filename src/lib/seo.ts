import type { Metadata } from "next";

type PublicPageMetadataInput = {
  /** Page title. Runs through the root "%s | Scope" template unless `absoluteTitle`. */
  title: string;
  /** Skip the " | Scope" suffix — for titles that already carry the brand. */
  absoluteTitle?: boolean;
  description: string;
  /** Site-relative canonical path, e.g. "/compare/scope-vs-bettercampus". */
  path: string;
  type?: "website" | "article";
  keywords?: string[];
  /** ISO dates for `type: "article"` pages. */
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * The card image for a page. A segment's own opengraph-image file wins over
 * this automatically, but a page that declares its own `openGraph` block does
 * not inherit a parent segment's image file — so nested compare and guide
 * pages have to name the section card explicitly.
 */
function cardImageFor(path: string): string {
  // Segments that ship their own opengraph-image route, most specific first.
  const segmentsWithCards = [
    "/products/lectra/code",
    "/products/lectra/notebooks",
    "/products/lectra",
    "/products/agent-workspace",
    "/compare",
    "/guides",
  ];

  const segment = segmentsWithCards.find(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );

  return segment ? `${segment}/opengraph-image` : "/opengraph-image";
}

/**
 * Metadata for an indexable public page: title, description, canonical, and
 * matching Open Graph / Twitter cards. Every page that used to set only a
 * title and description inherited the root layout's card ("Scope", og:url
 * "/"), so shares attributed the page to the homepage. Building the card here
 * keeps it per-page and identical across the three places it is declared.
 */
export function publicPageMetadata(input: PublicPageMetadataInput): Metadata {
  const {
    title,
    absoluteTitle = false,
    description,
    path,
    type = "website",
    keywords,
    publishedTime,
    modifiedTime,
  } = input;

  const cardTitle = absoluteTitle ? title : `${title} | Scope`;
  const image = cardImageFor(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      title: cardTitle,
      description,
      type,
      url: path,
      siteName: "Scope",
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: cardTitle }],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: cardTitle,
      description,
      images: [image],
    },
  };
}
