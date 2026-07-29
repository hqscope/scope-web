import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Check, Search } from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import NewsroomTeaserGrid from "@/components/public/NewsroomTeaserGrid";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  canvascopeSoftwareSchema,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { getNewsroomArticlesBySlugs } from "@/lib/newsroom";
import { CHROME_WEB_STORE_URL } from "@/lib/site";
import { RELEASE_VERSION } from "@/lib/siteRelease";

export const metadata: Metadata = {
  title: "Scope for Canvas",
  description:
    "Scope 10.1 is the free Chrome extension that searches Canvas and Brightspace courses, indexes PDFs locally, answers cited AI questions, drafts study plans, sends selected documents to Lectra, and brings finished Lectra PDFs back into browser upload flows.",
  alternates: {
    canonical: "/product/scope",
  },
  keywords: [
    "Scope for Canvas",
    "Scope Chrome extension",
    "Scope 10.1",
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

const paletteResults = [
  {
    title: "Midterm 2 Review Slides",
    context: "2026 Spring Biology 1A · Modules",
    kind: "pdf",
    active: true,
  },
  {
    title: "“midterm covers ch. 6–9”",
    context: "Found inside Syllabus.pdf · page 3",
    kind: "ocr",
  },
  {
    title: "Practice problems, week 8",
    context: "Due Friday · assignment",
    kind: "due soon",
    tone: "brand" as const,
  },
];

const capabilities = [
  {
    title: "Instant search",
    copy:
      "Files, pages, quizzes, and deadlines across every course — ranked as you type, with course aliases like “MCB 102”.",
  },
  {
    title: "PDF & OCR indexing",
    copy:
      "Scope parses PDF text locally and can OCR scanned pages and images, so their contents show up in future searches. Nothing is uploaded.",
  },
  {
    title: "Cited AI answers",
    copy:
      "Ask across the active LMS page and your indexed courses. Every answer links back with clickable [n] citations to the file it came from.",
  },
  {
    title: "Smart Planner",
    copy:
      "Turn upcoming deadlines into editable study blocks, with date-aware search for “today”, “yesterday”, and “this week”.",
  },
  {
    title: "On-device AI first",
    copy:
      "Questions run offline with Gemini Nano when available; the cloud fallback is explicit and optional.",
  },
  {
    title: "Two-way Lectra handoff",
    copy:
      "Send PDFs to your iPad for Apple Pencil markup, then use Attach from Lectra to pull the finished file back into browser uploads.",
  },
];

const setupSteps = [
  {
    step: "Step 01",
    title: "Add to Chrome",
    copy: "Install free from the Chrome Web Store and pin it to your toolbar.",
  },
  {
    step: "Step 02",
    title: "Open your LMS",
    copy:
      "Visit Canvas or Brightspace and let auto-sync index your courses locally.",
  },
  {
    step: "Step 03",
    title: "Hit ⌘K",
    copy: "Search, ask, and plan from anywhere on the page. That's it.",
  },
];

const slashCommands = [
  {
    command: "/ask",
    title: "Ask with citations",
    copy: "Ask a course question and get an answer grounded in the active page plus indexed course material.",
  },
  {
    command: "/plan",
    title: "Plan the week",
    copy: "Let AI draft study blocks from upcoming deadlines, then edit before saving.",
  },
  {
    command: "/quiz",
    title: "Practice from sources",
    copy: "Generate practice questions and answers from the course context Scope has indexed.",
  },
  {
    command: "/autopilot",
    title: "Sync syllabus dates",
    copy: "Extract schedule items from a syllabus and optionally write them to Google Calendar.",
  },
];

const privacyModel = [
  {
    lead: "Local-first indexing.",
    copy: "Your search corpus lives in browser storage, not on our servers.",
  },
  {
    lead: "Optional sign-in.",
    copy:
      "Google sign-in exists only for connected features like calendar sync and Lectra handoff — and it's off by default.",
  },
  {
    lead: "No analytics, no ads.",
    copy:
      "Zero tracking SDKs. Uploads happen only when you explicitly send a PDF to Lectra.",
  },
  {
    lead: "Account protection is wired in.",
    copy:
      "Google cross-account protection events can revoke or block sessions when a connected account is compromised or disabled.",
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

const canvascopeNewsroomArticles = getNewsroomArticlesBySlugs([
  "lectra-pdfs-can-now-come-back-into-browser-workflows",
  "on-device-ai-comes-to-canvascope",
  "student-profiles-ai-that-doesnt-treat-every-student-the-same",
]);

export default function CanvascopeProductPage() {
  return (
    <PublicPageFrame active="extension" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Scope for Canvas", path: "/product/scope" },
          ]),
          canvascopeSoftwareSchema(),
          faqSchema(faqs),
        ]}
      />

      <section className="page-wrap centered-hero">
        <div data-reveal>
          <p className="kicker">The Scope extension · {RELEASE_VERSION}</p>
          <h1>One shortcut for your entire semester.</h1>
          <p className="centered-hero-lede">
            Hit <kbd>⌘K</kbd> on any Canvas or Brightspace page. Search
            everything you&apos;ve ever been assigned, ask questions with cited
            answers, and plan your week.
          </p>
          <div className="pill-actions">
            <a
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="button-primary"
            >
              Add to Chrome — free
            </a>
          </div>
          <p className="hero-note">Chrome 116+ · No account required</p>
        </div>

        <div
          className="palette-mock palette-mock-lg"
          aria-hidden="true"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          <div className="palette-mock-input">
            <Search className="h-4 w-4" />
            <span className="palette-mock-query" data-typed="true">
              bio midterm<i>|</i>
            </span>
            <kbd>⌘K</kbd>
          </div>
          <div className="palette-mock-label">Best matches</div>
          <div className="palette-mock-rows">
            {paletteResults.map((result) => (
              <div
                key={result.title}
                className="palette-mock-row"
                data-active={result.active ? "true" : undefined}
              >
                <div>
                  <strong>{result.title}</strong>
                  <small>{result.context}</small>
                </div>
                <span data-tone={result.tone}>{result.kind}</span>
              </div>
            ))}
          </div>
          <div className="palette-mock-footer">
            <span>● SCOPE</span>
            <span>↑↓ NAVIGATE</span>
            <span>↵ SELECT</span>
            <span>ESC CLOSE</span>
          </div>
        </div>
      </section>

      <section className="page-wrap section-pad">
        <div className="section-heading" data-reveal>
          <h2>Everything it does, in one panel.</h2>
        </div>
        <div
          className="plain-grid stack-top"
          data-reveal
          style={{ "--reveal-delay": "90ms" } as CSSProperties}
        >
          {capabilities.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-wrap section-pad-sm">
        <div className="step-band" data-reveal>
          <h2>Up and running in a minute.</h2>
          <div className="step-grid">
            {setupSteps.map((item) => (
              <div key={item.step}>
                <span>{item.step.toUpperCase()}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band" id="commands">
        <div className="page-wrap command-section">
          <div className="section-heading" data-reveal>
            <p className="kicker">Shortcuts</p>
            <h2>Type a shortcut, skip the clicking.</h2>
          </div>
          <div className="command-list" data-reveal>
            {slashCommands.map((item) => (
              <article key={item.command} className="command-row">
                <kbd>{item.command}</kbd>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap split-section">
        <div data-reveal>
          <p className="kicker kicker-muted">Privacy model</p>
          <h2>Your coursework stays your business.</h2>
        </div>
        <div className="check-list" data-reveal>
          {privacyModel.map((item) => (
            <div key={item.lead}>
              <Check className="h-4 w-4" aria-hidden="true" />
              <p>
                <strong>{item.lead}</strong> {item.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-wrap faq-section">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>Everything you might ask.</h2>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <NewsroomTeaserGrid
        articles={canvascopeNewsroomArticles}
        kicker="Engineering notes"
        title="How the extension is moving."
        copy="Read the product notes behind two-way Lectra upload flows, on-device Gemini Nano routing, Student Profiles, and cited course-context AI."
      />

      <section className="page-wrap install-section" data-reveal>
        <div>
          <h2>Your next search is ⌘K away.</h2>
        </div>
        <div className="pill-actions install-actions">
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            Add to Chrome — free
          </a>
          <Link href="/privacy" className="button-secondary">
            Read privacy policy
          </Link>
        </div>
      </section>
    </PublicPageFrame>
  );
}
