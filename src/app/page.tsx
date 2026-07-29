import type { Metadata } from "next";
import { Fragment, type CSSProperties } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import NewsroomTeaserGrid from "@/components/public/NewsroomTeaserGrid";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, canvascopeSoftwareSchema } from "@/lib/structured-data";
import { getNewsroomArticlesBySlugs } from "@/lib/newsroom";
import { CHROME_WEB_STORE_URL, LECTRA_APP_STORE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Canvascope | Local-First Canvas and Brightspace Search",
  description:
    "Install Canvascope 10.1, the local-first Chrome extension for searching Canvas and Brightspace coursework, asking cited AI questions, indexing PDFs, using Smart Planner, and moving Lectra PDFs back into browser workflows.",
  alternates: {
    canonical: "/",
  },
};

const flowSteps = [
  {
    step: "01 · Chrome",
    title: "Find & ask",
    copy:
      "Canvascope searches every course and answers questions with cited sources — right in your browser.",
  },
  {
    step: "02 · iPad",
    title: "Read & annotate",
    copy:
      "One click sends any PDF to Lectra over DropBridge for Apple Pencil markup.",
  },
  {
    step: "03 · Back",
    title: "Submit & done",
    copy:
      "Finished files flow back into browser upload pickers. No exporting, no email-to-self.",
  },
];

const paletteResults = [
  {
    title: "Academic Integrity Pledge",
    context: "2026 Spring Biology 1A",
    kind: "quiz",
    active: true,
  },
  {
    title: "PLWS 22",
    context: "Chem 3A (Spring 2025)",
    kind: "assignment",
  },
  {
    title: "Enzyme Kinetics Worksheet",
    context: "Biology 1A · inside PDF",
    kind: "pdf",
  },
];

const bridgeReceipts = [
  {
    label: "Enzyme Kinetics Worksheet.pdf",
    meta: "Chrome → iPad",
  },
  {
    label: "Delivered to Lectra",
    meta: "Receipt",
    done: true,
  },
  {
    label: "Worksheet — annotated.pdf",
    meta: "iPad → Chrome",
  },
];

const privacyStats = [
  { value: "0", label: "Data sold" },
  { value: "0", label: "Ad trackers" },
  // Milestone published in the newsroom on 2026-03-12.
  { value: "100K+", label: "Files indexed locally" },
];

const homeNewsroomArticles = getNewsroomArticlesBySlugs([
  "lectra-pdfs-can-now-come-back-into-browser-workflows",
  "on-device-ai-comes-to-canvascope",
  "canvascope-v10-connected-ai-planning-and-dropbridge",
]);

export default function HomePage() {
  const breadcrumbJsonLd = breadcrumbSchema([{ name: "Home", path: "/" }]);

  return (
    <PublicPageFrame>
      <JsonLd data={[canvascopeSoftwareSchema(), breadcrumbJsonLd]} />

      <section className="page-wrap centered-hero">
        <div data-reveal>
          <p className="kicker">One system for your coursework</p>
          <h1>Every course file. Every device. One&nbsp;flow.</h1>
          <p className="centered-hero-lede">
            Find anything in Canvas from Chrome, ask questions with real
            citations, mark up readings on iPad — and send it all back where it
            belongs. Local-first, always free.
          </p>
          <div className="pill-actions" aria-label="Primary actions">
            <a
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="button-primary"
            >
              Add to Chrome — free
            </a>
            <Link href="/product/lectra" className="button-secondary">
              Get Lectra for iPad →
            </Link>
          </div>
        </div>

        <div
          className="flow-strip"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          {flowSteps.map((item, index) => (
            <Fragment key={item.step}>
              {index > 0 ? (
                <div className="flow-arrow" aria-hidden="true">
                  →
                </div>
              ) : null}
              <article className="flow-card">
                <p>{item.step.toUpperCase()}</p>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="page-wrap section-pad">
        <div className="section-heading" data-reveal>
          <p className="kicker kicker-muted">The family</p>
          <h2>Three pieces, one workflow.</h2>
        </div>

        <div className="stack-top">
          <div className="feature-band" data-reveal>
            <div className="feature-band-copy">
              <p className="kicker">Canvascope · Chrome extension</p>
              <h3>Find any coursework in seconds.</h3>
              <p>
                Assignments, files, deadlines, and text inside PDFs across all
                your courses — one ⌘K away. Ask questions and get answers with
                citations from your own materials.
              </p>
              <Link href="/product/canvascope" className="text-link">
                Explore the extension →
              </Link>
            </div>

            <div className="palette-mock" aria-hidden="true">
              <div className="palette-mock-input">
                <Search className="h-4 w-4" />
                <span className="palette-mock-query">
                  Search · type, title, course
                </span>
                <kbd>⌘K</kbd>
              </div>
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
                    <span>{result.kind}</span>
                  </div>
                ))}
              </div>
              <div className="palette-mock-footer">
                <span>● CANVASCOPE</span>
                <span>↑↓ NAVIGATE</span>
                <span>↵ SELECT</span>
                <span>ESC CLOSE</span>
              </div>
            </div>
          </div>

          <div className="feature-band feature-band-filled feature-band-reverse" data-reveal>
            <div className="feature-band-copy">
              <p className="kicker">Lectra · iPad</p>
              <h3>The reading desk your syllabus deserves.</h3>
              <p>
                An Apple-Pencil-first PDF workspace. Highlight, annotate, and
                organize readings — and everything syncs back through DropBridge
                when you&apos;re done.
              </p>
              <Link href="/product/lectra" className="text-link">
                Meet Lectra →
              </Link>
            </div>

            <div className="media-frame">
              <video
                src="/brand/lectra-horizontal.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Lectra Notes document workspace on iPad"
              />
            </div>
          </div>

          <div className="feature-band" data-reveal>
            <div className="feature-band-copy">
              <p className="kicker">DropBridge · the connection</p>
              <h3>Files move themselves.</h3>
              <p>
                DropBridge is the realtime link between your browser and your
                iPad. Push a PDF from Chrome, get a delivery receipt, and pick up
                the annotated file in any upload flow — both directions.
              </p>
              <Link href="/product/canvascope" className="text-link">
                How the handoff works →
              </Link>
            </div>

            <div className="receipt-list" aria-hidden="true">
              {bridgeReceipts.map((receipt) => (
                <div key={receipt.label} className="receipt-row">
                  <i data-tone={receipt.done ? "done" : undefined} />
                  <strong>{receipt.label}</strong>
                  <span>{receipt.meta.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap privacy-band" data-reveal>
        <p className="kicker kicker-muted">Privacy, by design</p>
        <h2>Local-first isn&apos;t a feature. It&apos;s the whole point.</h2>
        <p>
          Your course index lives on your devices. Handoffs are end-to-end.
          On-device AI when available. Nothing sold, ever.
        </p>
        <div className="privacy-stats">
          {privacyStats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <NewsroomTeaserGrid
        articles={homeNewsroomArticles}
        title="From the newsroom"
        ctaLabel="All updates →"
      />

      <section className="page-wrap final-cta" data-reveal>
        <div>
          <h2>One flow, from found to submitted.</h2>
        </div>
        <div className="pill-actions">
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            Add to Chrome — free
          </a>
          <a
            href={LECTRA_APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="button-secondary"
          >
            Get Lectra for iPad
          </a>
        </div>
        <p className="hero-note">
          Works with Canvas and Brightspace · No account required · Free
        </p>
      </section>
    </PublicPageFrame>
  );
}
