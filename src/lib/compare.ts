/**
 * The registry of /compare pages. One entry per page feeds the hub cards,
 * the sitemap, llms.txt, related-links blocks, and each page's Article node,
 * so a comparison's title, description, and dates cannot disagree across
 * surfaces. Adding a page = adding an entry and the route file.
 */

export type CompareProduct = "scope" | "lectra";

/** The @id fragment of the product entity a page is `about`. */
export type ProductEntityId = "#canvascope-extension" | "#lectra-ipad";

export const productEntityId: Record<CompareProduct, ProductEntityId> = {
  scope: "#canvascope-extension",
  lectra: "#lectra-ipad",
};

export type Comparison = {
  slug: string;
  product: CompareProduct;
  /** Page title; runs through the "%s | Scope" template unless `absoluteTitle`. */
  title: string;
  absoluteTitle?: boolean;
  /** One-line hub card copy. */
  copy: string;
  /** Meta description and Article.description. */
  description: string;
  keywords: string[];
  datePublished: string;
  dateModified: string;
};

export const comparisons: readonly Comparison[] = [
  // --- Scope for Canvas ------------------------------------------------
  {
    slug: "best-canvas-chrome-extensions",
    product: "scope",
    title: "Best Canvas Chrome Extensions for Students (2026)",
    copy: "BetterCampus, Tasks for Canvas, the Canvas downloaders, and Scope — sorted by the job you need done, with where each one wins.",
    description:
      "BetterCampus, Tasks for Canvas, Canvas Course Downloader & Exporter, Canvas Files Downloader, Canvas LMS Mods, and Scope compared by what each is for — with install counts, ratings, and update dates, and where each one wins.",
    keywords: [
      "best Canvas extension",
      "best Canvas Chrome extensions",
      "Canvas extensions for students",
      "Canvas LMS Chrome extension",
      "BetterCampus",
      "Tasks for Canvas",
    ],
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
  },
  {
    slug: "scope-vs-bettercampus",
    product: "scope",
    title: "Scope for Canvas vs BetterCampus (Better Canvas)",
    copy: "BetterCampus restyles Canvas. Scope searches it. Different jobs — and why most students can run both.",
    description:
      "BetterCampus restyles Canvas — dark mode, themes, GPA on the grades page — for two million students. Scope searches it. An honest comparison, and why most people should run both.",
    keywords: [
      "Scope vs Better Canvas",
      "Better Canvas alternative",
      "BetterCampus alternative",
      "Better Canvas vs",
      "Canvas extension with search",
    ],
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
  },
  {
    slug: "scope-vs-tasks-for-canvas",
    product: "scope",
    title: "Scope for Canvas vs Tasks for Canvas",
    copy: "Tasks for Canvas is the better to-do list. Scope is search plus a planner. Which to install, or whether to run both.",
    description:
      "Tasks for Canvas is the to-do list for Canvas, Blackboard, and Brightspace, used by a million students. Scope is search plus a planner. Which to install — or whether to run both.",
    keywords: [
      "Tasks for Canvas alternative",
      "Canvas assignment tracker extension",
      "Canvas checklist extension",
      "Canvas progress extension",
      "Scope vs Tasks for Canvas",
    ],
    datePublished: "2026-09-01",
    dateModified: "2026-09-01",
  },

  // --- Lectra Notes ----------------------------------------------------
  {
    slug: "lectra-notes-vs-goodnotes",
    product: "lectra",
    title: "Lectra Notes vs Goodnotes",
    copy: "Handwriting, PDFs, pricing, and the computing environment — where each app genuinely wins.",
    description:
      "An honest comparison of Lectra Notes and Goodnotes for students: handwriting, PDF markup, audio, AI, pricing, and the computing environment only one of them has.",
    keywords: [
      "Lectra Notes vs Goodnotes",
      "Goodnotes alternative",
      "Goodnotes for students",
      "iPad note taking comparison",
      "free Goodnotes alternative",
    ],
    datePublished: "2026-08-14",
    dateModified: "2026-09-01",
  },
  {
    slug: "lectra-notes-vs-notability",
    product: "lectra",
    title: "Lectra Notes vs Notability",
    copy: "Notability owns lecture audio. Lectra Notes owns notes-plus-code. The honest breakdown.",
    description:
      "An honest comparison of Lectra Notes and Notability: lecture audio, AI study tools, pricing, platforms, and the coding workspace only one of them has.",
    keywords: [
      "Lectra Notes vs Notability",
      "Notability alternative",
      "Notability for students",
      "iPad note taking comparison",
      "free Notability alternative",
    ],
    datePublished: "2026-08-14",
    dateModified: "2026-09-01",
  },
  {
    slug: "best-note-taking-apps-for-cs-students",
    product: "lectra",
    title: "Best Note-Taking Apps for CS Students (2026)",
    copy: "Goodnotes, Notability, OneNote, Juno, and Lectra Notes — matched to how CS coursework actually works.",
    description:
      "The best iPad note-taking apps for computer science students in 2026 — Goodnotes, Notability, OneNote, Juno, and Lectra Notes, matched honestly to how CS coursework actually works.",
    keywords: [
      "best note taking app for CS students",
      "best iPad apps for computer science",
      "note taking app for programming students",
      "iPad for CS majors",
      "student note apps 2026",
    ],
    datePublished: "2026-08-14",
    dateModified: "2026-09-01",
  },
  {
    slug: "ipad-python-notebook-apps",
    product: "lectra",
    title: "Python on iPad: Every Notebook App Compared (2026)",
    copy: "Juno, Carnets, Pythonista, a-Shell, and Lectra Notes — every real way to run Python on an iPad.",
    description:
      "Every real way to run Python and Jupyter notebooks on an iPad in 2026 — Juno, Carnets, Pythonista, a-Shell, and Lectra Notes — compared honestly, including where each is the right choice.",
    keywords: [
      "Python on iPad",
      "iPad Python notebook",
      "Jupyter on iPad",
      "run ipynb on iPad",
      "Juno vs Carnets",
      "iPad data science apps",
    ],
    datePublished: "2026-08-14",
    dateModified: "2026-09-01",
  },
  {
    slug: "free-goodnotes-alternatives",
    product: "lectra",
    title: "Free Goodnotes Alternatives for iPad (2026)",
    copy: "The genuinely free iPad note apps in 2026, and what each one gives up.",
    description:
      "The genuinely free Goodnotes alternatives for iPad in 2026 — what each one actually includes without paying, and what it gives up.",
    keywords: [
      "free Goodnotes alternatives",
      "free note taking app iPad",
      "Goodnotes free alternative 2026",
      "free Apple Pencil notes app",
      "free PDF annotation iPad",
    ],
    datePublished: "2026-08-14",
    dateModified: "2026-09-01",
  },
];

export function comparePath(comparison: Pick<Comparison, "slug">): string {
  return `/compare/${comparison.slug}`;
}

export function getComparison(slug: string): Comparison {
  const match = comparisons.find((item) => item.slug === slug);

  if (!match) {
    throw new Error(`Unknown comparison slug: ${slug}`);
  }

  return match;
}

export function comparisonsFor(product: CompareProduct): Comparison[] {
  return comparisons.filter((item) => item.product === product);
}
