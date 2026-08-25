import type { Metadata } from "next";
import type { CSSProperties } from "react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import NewsroomTeaserGrid from "@/components/public/NewsroomTeaserGrid";
import CommandPaletteMock from "@/components/public/mocks/CommandPaletteMock";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  canvascopeSoftwareSchema,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { getNewsroomArticlesBySlugs } from "@/lib/newsroom";
import { CHROME_WEB_STORE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Scope Extension",
  description:
    "The free Chrome extension that lives inside Canvas and Brightspace. Press ⌘K and everything your instructors have ever posted is one search away — indexed on your device, with cited course answers, practice exams, a planner, and DropBridge handoff to Lectra.",
  alternates: {
    canonical: "/products/extension",
  },
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
  ],
};

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
      "Files, pages, assignments, announcements, media — across every course, including OCR on scanned PDFs. Nothing leaves your device.",
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
      "See where you stand and what the final needs to be. Computed locally, never uploaded.",
  },
  {
    label: "Bridge",
    title: "DropBridge to iPad",
    copy:
      "Send any course file to Lectra Notes, work on it, and it returns to attach in any upload flow.",
  },
];

const faqs: FaqEntry[] = [
  {
    question: "Is Scope free?",
    answer:
      "Yes. Scope is a free Chrome extension. Install it from the Chrome Web Store and start searching your courses right away, with no subscription required.",
  },
  {
    question: "Does Scope work with both Canvas and Brightspace?",
    answer:
      "Yes. Scope searches across Canvas (Instructure) and Brightspace (D2L) courses, including assignments, readings, files, quizzes, pages, and due dates.",
  },
  {
    question: "Where is my course data stored?",
    answer:
      "Scope is local-first. Your course index and search data live in browser-local storage by default. Connected features like Google sign-in, calendar sync, cloud AI fallback, and Lectra handoff only run when you explicitly choose them.",
  },
  {
    question: "Can Scope search inside PDFs?",
    answer:
      "Yes. Scope parses PDF text locally and can OCR scanned pages and images so their contents show up in future searches.",
  },
  {
    question: "What are the cited AI answers?",
    answer:
      "The Ask side panel retrieves the active LMS page plus your indexed course files, tasks, notes, and PDF pages, then returns answers with clickable [n] citations back to the source material.",
  },
  {
    question: "How does the Lectra handoff work?",
    answer:
      "Open a reading or PDF, tap Send to Lectra, and DropBridge v3 delivers it to the Lectra iPad app with realtime wakeups and delivery receipts. After annotating with Apple Pencil, Attach from Lectra can bring the finished PDF back into supported browser upload flows.",
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
        <p className="kicker">Scope extension — Chrome · free</p>
        <h1>
          Your courses, one <em>keystroke</em> away.
        </h1>
        <p className="section-copy">
          The extension lives inside Canvas and Brightspace. Press ⌘K anywhere in
          the browser and everything your instructors have ever posted is one
          search away — indexed on your device.
        </p>
        <div className="pill-actions">
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            Add Scope to Chrome — free
          </a>
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
          footnote="Indexed locally · OCR on scans"
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
              <span className="stat-label">Ad trackers</span>
            </div>
          </div>
          <p className="section-copy privacy-strip-copy">
            The index is built and searched on your device. Features that reach
            the cloud — like practice-exam generation — are explicit, optional,
            and clearly marked before anything is sent.
          </p>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="page-wrap faq-section">
        <h2 className="section-heading" data-reveal>
          Questions people actually ask.
        </h2>
        <div className="faq-list" data-reveal>
          {faqs.map((faq) => (
            <div key={faq.question} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <NewsroomTeaserGrid
        articles={relatedArticles}
        kicker="Newsroom"
        title="What shipped recently."
        ctaLabel="All posts →"
      />

      {/* --- CTA --- */}
      <section className="page-wrap final-cta" data-reveal>
        <h2>Open a course. Press ⌘K.</h2>
        <div className="pill-actions">
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            Add Scope to Chrome — free
          </a>
        </div>
        <p className="hero-note">Works with Canvas and Brightspace</p>
      </section>
    </PublicPageFrame>
  );
}
