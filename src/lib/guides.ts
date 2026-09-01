import type { CompareProduct } from "@/lib/compare";

/**
 * The registry of /guides pages — evergreen how-tos, as opposed to the dated
 * newsroom. Same role as src/lib/compare.ts: one entry feeds the hub, the
 * sitemap, llms.txt, related-links blocks, and the page's Article node.
 */
export type Guide = {
  slug: string;
  product: CompareProduct;
  title: string;
  absoluteTitle?: boolean;
  copy: string;
  description: string;
  keywords: string[];
  datePublished: string;
  dateModified: string;
};

export const guides: readonly Guide[] = [
  {
    slug: "how-to-search-canvas",
    product: "scope",
    title: "How to Search Canvas: Every Course, Every File (2026)",
    copy: "Canvas search is per course and often switched off. Every way to find a file, page, or old assignment across all your courses.",
    description:
      "Canvas search is per course and often switched off. Every way to find a file, page, or old assignment across all your Canvas courses — Smart Search, the Ctrl+F trick, downloaders, and the Scope extension.",
    keywords: [
      "how to search in Canvas",
      "Canvas search all courses",
      "find old assignment Canvas",
      "Canvas Smart Search",
      "Canvas search extension",
      "search Canvas files",
    ],
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
  },
  {
    slug: "canvas-extension-safety",
    product: "scope",
    title: "Are Canvas Chrome Extensions Safe? A 2026 Checklist",
    copy: "After the 2026 Canvas data breach, what a browser extension can see, what to check before installing one, and what Scope does and doesn't do.",
    description:
      "After the 2026 Canvas data breach, students are right to ask what a browser extension can see. A plain checklist — permissions, where data goes, who publishes it — and what Scope does and doesn't do.",
    keywords: [
      "are Canvas extensions safe",
      "Canvas extension permissions",
      "Canvas data breach 2026",
      "is Better Canvas safe",
      "Canvas Chrome extension privacy",
    ],
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
  },
  {
    slug: "annotate-lecture-slides-on-ipad",
    product: "lectra",
    title: "Annotate Canvas Lecture Slides on iPad — Apple Pencil Guide (2026)",
    absoluteTitle: true,
    copy: "Get a lecture PDF from Canvas onto your iPad and mark it up with Apple Pencil — the share-sheet route and the one-tap route.",
    description:
      "Get a lecture PDF from Canvas onto your iPad and mark it up with Apple Pencil: the Goodnotes and Notability share-sheet route step by step, and the one-tap route with Scope and Lectra Notes.",
    keywords: [
      "annotate lecture slides iPad",
      "open Canvas PDF in Goodnotes",
      "write on lecture slides iPad",
      "Apple Pencil lecture notes",
      "note app that works with Canvas",
      "Canvas to iPad",
    ],
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
  },
];

export function guidePath(guide: Pick<Guide, "slug">): string {
  return `/guides/${guide.slug}`;
}

export function getGuide(slug: string): Guide {
  const match = guides.find((item) => item.slug === slug);

  if (!match) {
    throw new Error(`Unknown guide slug: ${slug}`);
  }

  return match;
}

export function guidesFor(product: CompareProduct): Guide[] {
  return guides.filter((item) => item.product === product);
}
