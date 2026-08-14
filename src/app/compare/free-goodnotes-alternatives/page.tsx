import type { Metadata } from "next";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import MethodologyNote from "@/components/public/MethodologyNote";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  comparisonArticleSchema,
  competitorAppNode,
  faqSchema,
  itemListSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { LECTRA_APP_STORE_URL } from "@/lib/site";

const description =
  "The genuinely free Goodnotes alternatives for iPad in 2026 — what each one actually includes without paying, and what it gives up.";

export const metadata: Metadata = {
  title: "Free Goodnotes Alternatives",
  description,
  alternates: {
    canonical: "/compare/free-goodnotes-alternatives",
  },
  keywords: [
    "free Goodnotes alternatives",
    "free note taking app iPad",
    "Goodnotes free alternative 2026",
    "free Apple Pencil notes app",
    "free PDF annotation iPad",
  ],
};

type Alternative = {
  name: string;
  free: string;
  strength: string;
  tradeoff: string;
};

const alternatives: Alternative[] = [
  {
    name: "Lectra Notes",
    free:
      "Everything — unlimited documents, Apple Pencil markup, scanner, on-device AI study tools, Python notebooks, terminal with Git, SSH, and the Mac app. No tiers, watermarks, ads, or analytics.",
    strength:
      "The only app on this list with a computing environment: Jupyter notebooks with on-device Python, a code editor, and a terminal beside your notes.",
    tradeoff:
      "No lecture audio recording, no cross-device annotation sync yet, and it's the newest app here (2026). iPad drawing is Apple Pencil-only.",
  },
  {
    name: "Apple Notes",
    free:
      "Everything — handwriting with Scribble, audio recording with automatic transcripts (iOS 18.1+), Math Notes, collaboration, iCloud sync.",
    strength:
      "Zero setup, deepest OS integration, and free audio transcripts — a feature most rivals charge for.",
    tradeoff:
      "PDF annotation is basic Markup on attachments, not a paged notebook workflow; no custom paper templates; Apple-only.",
  },
  {
    name: "Microsoft OneNote",
    free:
      "All core note-taking — ink, scanning, voice capture, and sync across iPad, Windows, Android, Mac, and web (within the free 5GB OneDrive).",
    strength:
      "The widest platform coverage of any free option — the pick if you live on Windows or Android too.",
    tradeoff:
      "PDFs import as flat printouts, which makes annotating lecture slides clunky; Copilot AI needs Microsoft 365.",
  },
  {
    name: "CollaNote",
    free:
      "Unlimited notebooks, 25+ pens, PDF/PowerPoint/doc markup, real-time collaboration, flashcards, scanner. One-time $13.90 lifetime premium for extras.",
    strength:
      "Free real-time collaboration and the closest free match to Goodnotes' notebook-plus-PDF workflow.",
    tradeoff:
      "Small indie team with reported reliability bugs; some formerly free features (including audio recording) moved behind premium in 2.0; requires iPadOS 18.6+.",
  },
  {
    name: "Flexcil",
    free:
      "Full pen-based PDF annotation plus its signature gesture: drag text or figures from a PDF into a side study note. One-time $9.99 upgrade, never a subscription.",
    strength:
      "The PDF-to-study-note extraction gesture is genuinely unique for working through textbooks; also on Android.",
    tradeoff:
      "Free caps bite fast — 5 notes of up to 50 pages, 5 folders, watermarked exports — and lasso, text, and templates are paid.",
  },
  {
    name: "Kilonotes",
    free:
      "Core handwriting, unlimited notebooks, and PDF markup, with a large student-oriented template library behind a cheap membership.",
    strength:
      "Handwriting feel that reviewers consistently praise, with strong palm rejection.",
    tradeoff:
      "Ads in the free tier, cloud sync is a paid add-on, and reviewers report bugs and weak OCR/audio quality.",
  },
];

const faqs: FaqEntry[] = [
  {
    question: "What is the best free alternative to Goodnotes?",
    answer:
      "It depends on the job. Lectra Notes is fully free with unlimited documents, Apple Pencil PDF markup, on-device AI study tools, and a Python/terminal workspace no other note app has. Apple Notes is the zero-setup default with free audio transcripts. OneNote is the free pick for Windows or Android sync. CollaNote is the closest free match to Goodnotes' notebook feel, and Flexcil's free tier is a capable PDF annotator with unique study gestures.",
  },
  {
    question: "How limited is Goodnotes' own free version?",
    answer:
      "As of August 2026, Goodnotes' free tier is capped at 3 files total, exports carry a watermark, audio recording is limited to about 20 minutes, and AI use is minimal. Full use requires Essential ($11.99/yr), Pro ($35.99/yr), or a $35.99 one-time Apple-only edition without cloud sync.",
  },
  {
    question: "Is Lectra Notes actually free, or freemium?",
    answer:
      "Actually free. There are no tiers, subscriptions, in-app purchases, file caps, watermarks, ads, or analytics — the full app, including the notebooks, terminal, Git, SSH, on-device AI, and Lectra for Mac, is free.",
  },
  {
    question: "What do free apps give up compared to Goodnotes?",
    answer:
      "Goodnotes still leads on handwriting-to-text conversion, ink intelligence, its template marketplace, and years of cross-platform polish. Honest examples from this list: Lectra Notes lacks lecture audio and cross-device annotation sync; Apple Notes lacks a paged PDF workflow; OneNote flattens PDFs; Flexcil's free caps are tight.",
  },
];

export default function FreeAlternativesPage() {
  return (
    <PublicPageFrame active="lectra" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            {
              name: "Free Goodnotes alternatives",
              path: "/compare/free-goodnotes-alternatives",
            },
          ]),
          comparisonArticleSchema(
            "Free Goodnotes Alternatives",
            "/compare/free-goodnotes-alternatives",
            description,
            "2026-08-14",
            "2026-08-14",
          ),
          itemListSchema(
            "Free Goodnotes alternatives",
            "/compare/free-goodnotes-alternatives",
            alternatives.map((app) => ({
              name: app.name,
              path: "/compare/free-goodnotes-alternatives",
            })),
          ),
          competitorAppNode("Goodnotes", "https://www.goodnotes.com"),
          competitorAppNode(
            "Apple Notes",
            "https://apps.apple.com/us/app/notes/id1110145109",
          ),
          competitorAppNode(
            "Microsoft OneNote",
            "https://www.microsoft.com/microsoft-365/onenote",
          ),
          competitorAppNode("CollaNote", "https://www.collanote.com"),
          competitorAppNode("Flexcil", "https://www.flexcil.com"),
          faqSchema(faqs),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Compare · Updated August 2026</p>
          <h1>The free Goodnotes alternatives that are actually free.</h1>
          <p className="centered-hero-lede">
            Goodnotes&apos; free tier stops at three files. These six apps
            don&apos;t — here&apos;s what each genuinely includes without
            paying, and what it gives up.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="picks">
        <h2 className="sr-only">The free alternatives</h2>
        <div className="space-y-6" data-reveal>
          {alternatives.map((app, index) => (
            <article
              key={app.name}
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6"
            >
              <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                {index + 1}. {app.name}
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
                <strong className="text-[var(--color-ink)]">
                  Free for real:
                </strong>{" "}
                {app.free}
              </p>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
                <strong className="text-[var(--color-ink)]">Standout:</strong>{" "}
                {app.strength}
              </p>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
                <strong className="text-[var(--color-ink)]">Trade-off:</strong>{" "}
                {app.tradeoff}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="methodology">
        <div data-reveal>
          <MethodologyNote
            dateChecked="August 14, 2026"
            extraConcessions={[
              "This list is published by the maker of Lectra Notes, which appears first. Every other entry's strengths are stated plainly, and Goodnotes itself remains the leader on handwriting intelligence and polish.",
            ]}
          />
        </div>
      </section>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>Free note apps, answered.</h2>
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

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>Free shouldn&apos;t mean a three-file cap.</h2>
          <p>
            <a href={LECTRA_APP_STORE_URL} target="_blank" rel="noreferrer">
              Lectra Notes on the App Store
            </a>{" "}
            — unlimited documents, full markup, notebooks, and a terminal.
            Free, with nothing held back.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
