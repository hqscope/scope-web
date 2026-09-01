import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import ComparisonTable from "@/components/public/ComparisonTable";
import NewsroomTeaserGrid from "@/components/public/NewsroomTeaserGrid";
import RelatedLinks from "@/components/public/RelatedLinks";
import CommandPaletteMock from "@/components/public/mocks/CommandPaletteMock";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import {
  breadcrumbSchema,
  canvascopeSoftwareSchema,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { getNewsroomArticlesBySlugs } from "@/lib/newsroom";
import { publicPageMetadata } from "@/lib/seo";
import { CHROME_WEB_STORE_URL, SCOPE_DEFINITION } from "@/lib/site";
import {
  SCOPE_EXTENSION_VERSION,
  STORE_FACTS_VERIFIED_ON,
} from "@/lib/siteRelease";
import { LIVE_USERS, VERIFIED_ON } from "@/lib/usage";

export const metadata: Metadata = publicPageMetadata({
  title: "Scope for Canvas: Chrome Extension That Searches Every Course",
  absoluteTitle: true,
  description:
    "Scope for Canvas is a free Chrome extension that searches every file, page, and assignment across your Canvas and Brightspace courses — indexed on your device, answers cited to source.",
  path: "/products/extension",
  keywords: [
    "Scope extension",
    "Scope for Canvas",
    // Retained so people still searching the former name find us.
    "Canvascope",
    "Canvascope extension",
    "Canvas LMS search",
    "Brightspace search",
    "Attach from Lectra",
    "student productivity extension",
    "LMS search extension",
    "Canvas Chrome extension",
    "search Canvas",
    "best Canvas extension",
    "Canvas search extension",
  ],
});

/** "2026-09-01" → "September 1, 2026", so dated copy tracks the constant. */
function formatCheckedOn(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

const storeFactsCheckedOn = formatCheckedOn(STORE_FACTS_VERIFIED_ON);
const usersCountedOn = formatCheckedOn(VERIFIED_ON);

const paletteRows = [
  {
    tag: "Slides",
    title: "Lecture 14 — Lagrange multipliers.pdf",
    meta: "Math 53 · Files · Week 8",
    active: true,
  },
  {
    tag: "Media",
    title: "Lecture 14 recording — 48:12",
    meta: "Math 53 · Media gallery",
  },
  {
    tag: "Page",
    title: "Week 8 overview — constrained optimization",
    meta: "Math 53 · Pages",
  },
];

const features = [
  {
    label: "Search",
    title: "Instant and local",
    copy:
      "Files, pages, assignments, announcements, media — across every course, including scanned PDFs. Search and indexing run entirely on your device.",
  },
  {
    label: "Ask",
    title: "Cited course answers",
    copy:
      "“When's the midterm? What's the late policy?” Answers come from your materials, with the source page linked.",
  },
  {
    label: "Practice",
    title: "Exams from real material",
    copy:
      "Practice tests generated from what the course actually covered — not generic question banks.",
  },
  {
    label: "Plan",
    title: "A planner that fills itself",
    copy:
      "Due dates gathered across courses, a morning briefing, and optional Google Calendar sync.",
  },
  {
    label: "Grades",
    title: "What-if calculator",
    copy:
      "See where you stand and what the final needs to be. Computed on your device.",
  },
  {
    label: "Bridge",
    title: "Hand off to iPad",
    copy:
      "Send a course file to Lectra Notes, mark it up, and bring the finished file back into supported upload flows.",
  },
];

/** An FAQ answer that ends in a link to the page that goes deeper. */
type ExtensionFaq = FaqEntry & { link?: { href: string; label: string } };

const faqs: ExtensionFaq[] = [
  {
    question: "Is Scope free?",
    answer:
      "Yes. Scope for Canvas is a free Chrome extension. Install it from the Chrome Web Store and start searching your courses right away, with no subscription and no account required.",
  },
  {
    question: "Does Scope work with both Canvas and Brightspace?",
    answer:
      "Yes. Scope searches across Canvas (Instructure) and Brightspace (D2L) courses, including assignments, readings, files, pages, and due dates.",
  },
  {
    // verify: Canvas Smart Search scope and availability. Instructure's
    // documentation was not reachable on September 1, 2026 (community site
    // returned 403, search engines returned no listing), so the answer below
    // is written in the hedged form the source supports.
    question: "How is Scope different from Canvas Smart Search?",
    answer:
      "Smart Search is Canvas's own search, and where a school has turned it on you use it from inside the course you are already in. Scope searches across every course you can open — files, pages, assignments, and scanned PDFs — from anywhere in the browser, and it works whether or not your school has enabled Smart Search. What Smart Search offers is set by your school, so check what yours has turned on.",
  },
  {
    question: "Is Scope a quiz-answer or homework-solver tool?",
    answer:
      "No. Scope answers questions from the materials your instructors posted and links every answer to its source. It does not take quizzes, write submissions, or interact with Canvas quiz logs.",
  },
  {
    question: "Is a Canvas extension safe to install?",
    answer:
      "It depends entirely on the extension: check what permissions it asks for, where your course data goes, and whether the developer says so plainly. Scope builds and searches its index on your device, and our guide walks through the questions worth asking before you install anything that can read your coursework.",
    link: {
      href: "/guides/canvas-extension-safety",
      label: "Read the Canvas extension safety guide",
    },
  },
  {
    question: "Is Scope affiliated with Instructure or D2L?",
    answer:
      "No. Scope is an independent product from Scope Inc. It works with Canvas and Brightspace but is not made or endorsed by Instructure or D2L.",
  },
  {
    question: "Where is my course data stored?",
    answer:
      "Scope is local-first. Your course index and search data live in your browser, on your device, by default. Connected features like Google sign-in, calendar sync, the cloud AI fallback, and the handoff to Lectra Notes only run when you explicitly choose them. The privacy policy lists everything the extension stores and syncs.",
    link: { href: "/privacy", label: "Read the privacy policy" },
  },
  {
    question: "Can Scope search inside PDFs?",
    answer:
      "Yes. Scope reads PDF text on your device and can read scanned pages and images, so their contents show up in future searches.",
  },
  {
    question: "What are the cited AI answers?",
    answer:
      "Ask reads the course page you are on plus your indexed course files, tasks, notes, and PDF pages, then returns an answer with clickable [n] citations back to the source material. Answers try Chrome's on-device model first; when it is unavailable, an optional, clearly marked cloud fallback is used.",
  },
  {
    question: "How does the Lectra Notes handoff work?",
    answer:
      "Send a PDF from Canvas to your iPad in one tap with the Scope extension. Mark it up with Apple Pencil in Lectra Notes, and finished files can come back into supported upload flows in the browser.",
  },
];

const glanceRows = [
  { label: "Price", cells: ["Free, no account required."] },
  { label: "Browser", cells: ["Chrome, and other Chromium browsers."] },
  { label: "Works with", cells: ["Canvas and Brightspace courses."] },
  {
    label: "Where the index lives",
    cells: ["Your browser, on your device."],
  },
  {
    label: "AI answers",
    cells: [
      "Chrome's on-device model first; when it is unavailable, an optional, clearly marked cloud fallback is used.",
    ],
  },
  {
    label: "Version",
    cells: [`${SCOPE_EXTENSION_VERSION} (checked ${storeFactsCheckedOn})`],
  },
  {
    label: "People using it",
    cells: [
      <>
        {LIVE_USERS} across Scope for Canvas and Lectra Notes, counted by hand
        on {usersCountedOn}.{" "}
        <Link
          className="text-link"
          href="/newsroom/how-we-count-people-using-scope"
        >
          How we count
        </Link>
        .
      </>,
    ],
  },
];

const relatedArticles = getNewsroomArticlesBySlugs([
  "who-teaches-this-and-does-it-fit-my-week",
  "how-we-count-people-using-scope",
  "course-indexing-stops-getting-stuck",
]);

export default function ExtensionPage() {
  return (
    <PublicPageFrame active="extension" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Extension", path: "/products/extension" },
          ]),
          canvascopeSoftwareSchema(),
          faqSchema(faqs),
        ]}
      />

      {/* --- Hero --- */}
      <section className="page-wrap companion-hero" data-reveal>
        <p className="kicker">
          Scope for Canvas — free Chrome extension for Canvas and Brightspace
        </p>
        <h1>
          Search every Canvas and Brightspace course, one <em>keystroke</em>{" "}
          away.
        </h1>
        <p className="section-copy">
          {SCOPE_DEFINITION} Press ⌘K anywhere in the browser and everything
          your instructors have ever posted — files, pages, assignments,
          announcements, scanned PDFs — is one search away, indexed on your
          device.
        </p>
        <div className="pill-actions">
          <StoreLink
            store="chrome-web-store"
            href={CHROME_WEB_STORE_URL}
            className="button-primary"
          >
            Add Scope to Chrome — free
          </StoreLink>
          <span className="hero-note">No account required</span>
        </div>
      </section>

      {/* --- The palette --- */}
      <section className="page-wrap strip-section" data-reveal="scale">
        <CommandPaletteMock
          large
          query="lagrange multipliers lecture"
          scope="All courses"
          rows={paletteRows}
          footnote="Indexed on your device · finds text in scans"
        />
      </section>

      {/* --- What it does --- */}
      <section className="section-band">
        <div className="page-wrap">
          <h2 className="section-heading" data-reveal>
            Everything the LMS knows, finally at hand.
          </h2>
          <div
            className="plain-grid stack-top"
            data-reveal="stagger"
            style={{ "--stagger-step": "70ms" } as CSSProperties}
          >
            {features.map((feature, index) => (
              <div
                key={feature.label}
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <p className="kicker kicker--bare">{feature.label}</p>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- At a glance --- */}
      <section className="page-wrap section-pad-sm" id="at-a-glance">
        <div className="section-heading" data-reveal>
          <p className="kicker">At a glance</p>
          <h2>What Scope for Canvas is</h2>
        </div>
        <div data-reveal>
          <ComparisonTable
            caption="Scope for Canvas at a glance: price, browser, supported course systems, where the index lives, how AI answers work, current version, and how many people use it"
            columns={["Scope for Canvas"]}
            rows={glanceRows}
          />
          <p className="hero-note">
            Store facts checked on {storeFactsCheckedOn}.
          </p>
        </div>
      </section>

      {/* --- Privacy --- */}
      <section className="section-band section-band--sunken">
        <div className="page-wrap privacy-strip" data-reveal>
          <div className="privacy-strip-stats">
            <div>
              <span className="stat-zero">0</span>
              <span className="stat-label">Data sold</span>
            </div>
            <span className="privacy-strip-rule" />
            <div>
              <span className="stat-zero">0</span>
              <span className="stat-label">Subscriptions</span>
            </div>
          </div>
          <p className="section-copy privacy-strip-copy">
            The index is built and searched on your device. Features that reach
            the cloud — like practice-exam generation when the on-device model
            is unavailable — are explicit, optional, and clearly marked before
            anything is sent.
          </p>
        </div>
      </section>

      {/* --- iPad handoff --- */}
      <section className="page-wrap section-pad-sm" id="ipad">
        <div className="section-heading" data-reveal>
          <p className="kicker">Lectra Notes</p>
          <h2>Send the reading to your iPad in one tap.</h2>
        </div>
        <div data-reveal>
          <p className="section-copy">
            Send a PDF from Canvas to your iPad in one tap with the Scope
            extension; finished files can come back into supported upload
            flows. Mark up lecture slides with Apple Pencil in{" "}
            <Link className="text-link" href="/products/lectra">
              Lectra Notes
            </Link>
            , the free iPad and iPhone app from Scope, then pick the annotated
            file from the browser in a supported upload flow when it&apos;s
            time to submit.
          </p>
          <p className="section-copy">
            New to it? The{" "}
            <Link
              className="text-link"
              href="/guides/annotate-lecture-slides-on-ipad"
            >
              guide to annotating lecture slides on iPad
            </Link>{" "}
            walks through the whole loop, from the course page to the finished
            PDF.
          </p>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="page-wrap faq-section" id="faq">
        <h2 className="section-heading" data-reveal>
          Questions people actually ask.
        </h2>
        <div className="faq-list" data-reveal>
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>{faq.question}</summary>
              <p>
                {faq.answer}
                {faq.link ? (
                  <>
                    {" "}
                    <Link className="text-link" href={faq.link.href}>
                      {faq.link.label}
                    </Link>
                    .
                  </>
                ) : null}
              </p>
            </details>
          ))}
        </div>
      </section>

      <NewsroomTeaserGrid
        articles={relatedArticles}
        kicker="Newsroom"
        title="What shipped recently."
        ctaLabel="All posts →"
      />

      <RelatedLinks
        title="Keep comparing."
        links={[
          {
            href: "/compare/best-canvas-chrome-extensions",
            label: "Best Canvas Chrome extensions",
            copy: "The round-up, including the ones that beat Scope at their own thing — and the categories we leave out on purpose.",
          },
          {
            href: "/compare/scope-vs-bettercampus",
            label: "Scope vs BetterCampus",
            copy: "Search and cited answers against a Canvas restyling and dashboard toolkit with a far larger install base.",
          },
          {
            href: "/compare/scope-vs-tasks-for-canvas",
            label: "Scope vs Tasks for Canvas",
            copy: "A full course index against a far more widely installed assignment tracker.",
          },
          {
            href: "/guides/how-to-search-canvas",
            label: "How to search Canvas",
            copy: "What Canvas can and cannot find on its own, and how to get to a file when you only remember a phrase from it.",
          },
        ]}
      />

      {/* --- CTA --- */}
      <section className="page-wrap final-cta" data-reveal>
        <h2>Open a course. Press ⌘K.</h2>
        <div className="pill-actions">
          <StoreLink
            store="chrome-web-store"
            href={CHROME_WEB_STORE_URL}
            className="button-primary"
          >
            Add Scope to Chrome — free
          </StoreLink>
        </div>
        <p className="hero-note">Works with Canvas and Brightspace</p>
      </section>
    </PublicPageFrame>
  );
}
