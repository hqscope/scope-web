import type { Metadata } from "next";
import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import ComparisonTable from "@/components/public/ComparisonTable";
import MethodologyNote from "@/components/public/MethodologyNote";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  comparisonArticleSchema,
  competitorAppNode,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { LECTRA_APP_STORE_URL } from "@/lib/site";

const description =
  "An honest comparison of Lectra Notes and Notability: lecture audio, AI study tools, pricing, platforms, and the coding workspace only one of them has.";

export const metadata: Metadata = {
  title: "Lectra Notes vs Notability",
  description,
  alternates: {
    canonical: "/compare/lectra-notes-vs-notability",
  },
  keywords: [
    "Lectra Notes vs Notability",
    "Notability alternative",
    "Notability for students",
    "iPad note taking comparison",
    "free Notability alternative",
  ],
};

const faqs: FaqEntry[] = [
  {
    question: "Is Lectra Notes better than Notability?",
    answer:
      "For lecture-heavy classes, Notability is genuinely hard to beat: audio recording synced to your notes is included on every tier, and paid tiers add transcription with AI summaries. Lectra Notes has no lecture recording today. But Lectra Notes is completely free without Notability's 5-note cap, its AI runs on-device instead of in the cloud, and it adds a computing environment — Python notebooks, a terminal with Git, a code editor, and SSH — that Notability doesn't have. Pick by which of those matters more to your classes.",
  },
  {
    question: "Is Notability free?",
    answer:
      "Notability's free Starter plan is capped at 5 notes as of the July 2026 restructure. Paid plans run from Lite at $14.99/year to Pro at $99.99/year (AI features included only on Plus and Pro), plus a $39.99–$49.99 one-time Classic option without AI.",
  },
  {
    question: "Does Lectra Notes record lectures?",
    answer:
      "No. Audio recording synced to notes is Notability's signature feature and a real advantage today. If recording lectures is central to how you study, Notability is the stronger choice right now.",
  },
  {
    question: "Where does Lectra Notes' AI run?",
    answer:
      "On the device, exclusively — summaries, grounded Q&A, flashcards, and quizzes run on supported iPads and iPhones without sending your documents anywhere, and the features are free. Notability's Learn AI features are processed on its servers (with a stated no-training policy) and require the Plus or Pro plan.",
  },
  {
    question: "Can Notability run Python or code?",
    answer:
      "No. Notability has no code or notebook capability. Lectra Notes runs real Jupyter .ipynb notebooks with on-device Python, plus a terminal with Git and an SSH client, all offline and free.",
  },
];

export default function LectraVsNotabilityPage() {
  return (
    <PublicPageFrame active="lectra" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            {
              name: "Lectra Notes vs Notability",
              path: "/compare/lectra-notes-vs-notability",
            },
          ]),
          comparisonArticleSchema(
            "Lectra Notes vs Notability",
            "/compare/lectra-notes-vs-notability",
            description,
            "2026-08-14",
            "2026-08-14",
          ),
          competitorAppNode("Notability", "https://notability.com"),
          faqSchema(faqs),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Compare · Updated August 2026</p>
          <h1>Lectra Notes vs Notability</h1>
          <p className="centered-hero-lede">
            Notability owns lecture audio — recording synced to your notes is
            its signature, and it&apos;s earned. Lectra Notes is free without
            note caps and adds a real computing environment. The honest
            breakdown:
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="table">
        <div data-reveal>
          <ComparisonTable
            caption="Feature comparison of Lectra Notes and Notability, August 2026"
            columns={["Lectra Notes", "Notability"]}
            rows={[
              {
                label: "Price",
                cells: [
                  "Free — everything included. No tiers, caps, or ads.",
                  "Free Starter capped at 5 notes. Lite $14.99/yr, Plus $19.99/yr, Pro $99.99/yr (AI on Plus/Pro only), or Classic one-time $39.99–$49.99 without AI.",
                ],
              },
              {
                label: "Platforms",
                cells: [
                  "iPad and iPhone, plus the free Lectra for Mac.",
                  "iPhone, iPad, Mac, Vision Pro, web, and a new native Android app (launched August 2026). No native Windows app.",
                ],
              },
              {
                label: "Audio",
                cells: [
                  "None today.",
                  "Recording synced to notes on every tier, including free. Transcription on Plus; unlimited live transcription with real-time AI summaries on Pro. Audio is processed on Notability's servers and deleted after transcription.",
                ],
              },
              {
                label: "Handwriting",
                cells: [
                  "Custom vector ink engine — pressure-responsive pen, shape recognition, ruler, saved signatures. Handwriting is searchable; no handwriting-to-text conversion.",
                  "Mature ink engine incl. a tilt-responsive calligraphy pen. Handwriting recognition, search, and handwritten-math-to-LaTeX — on paid tiers, in the apps (not web).",
                ],
              },
              {
                label: "PDF markup",
                cells: [
                  "Full markup with page management; exports preserve the PDF's selectable text and add an OCR layer; hybrid PDFs re-import with editable ink.",
                  "PDF, doc, and slide import with annotation and scanning on all tiers.",
                ],
              },
              {
                label: "AI / study tools",
                cells: [
                  "Entirely on-device and free: summaries, grounded Q&A, flashcards, quizzes on supported devices. Nothing leaves the iPad.",
                  "Notability Learn (cloud-based, paid): summaries, quizzes, flashcards, YouTube-to-note, chat with your notes. Capped on Plus; unlimited on Pro at $99.99/yr.",
                ],
              },
              {
                label: "Code & notebooks",
                cells: [
                  "Jupyter-compatible .ipynb notebooks with on-device Python (numpy, pandas, matplotlib), a code editor, a terminal with Git, and SSH — all offline.",
                  "None.",
                ],
              },
              {
                label: "Sync & backup",
                cells: [
                  "Offline-first; documents back up when you sign in, with an optional iCloud mirror. Annotations do not yet sync between devices.",
                  "Free Notability Cloud sync across iOS, Android, Mac, and web; version history from 7 to 90 days by tier.",
                ],
              },
            ]}
          />
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="verdict">
        <div className="split-section" data-reveal>
          <div>
            <p className="kicker kicker-muted">Where Notability wins</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
              <li>
                Lecture audio synced to your handwriting — free to record,
                transcribed on paid tiers.
              </li>
              <li>Cross-device sync today, now including Android.</li>
              <li>
                Handwriting-to-text and handwritten-math-to-LaTeX conversion.
              </li>
              <li>Years of polish and a 20,000+ template gallery.</li>
            </ul>
          </div>
          <div>
            <p className="kicker kicker-muted">Where Lectra Notes wins</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
              <li>
                Free without the 5-note cap — unlimited documents, no
                watermark, no subscription.
              </li>
              <li>
                AI that is free and never leaves the device — no cloud
                processing, no monthly question caps.
              </li>
              <li>
                The computing environment: Python notebooks, terminal, Git,
                code editor, SSH, and a{" "}
                <Link href="/mac">remote desktop to your Mac</Link>.
              </li>
              <li>
                Lock-in-free exports: real selectable text, an OCR layer, and
                hybrid PDFs that stay editable.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="methodology">
        <div data-reveal>
          <MethodologyNote
            dateChecked="August 14, 2026"
            extraConcessions={[
              "Handwriting conversion: Lectra Notes searches handwriting but does not convert it to text or LaTeX.",
              "Android: Notability now has a native Android app; Lectra Notes is Apple-only.",
            ]}
          />
        </div>
      </section>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>Lectra Notes vs Notability, answered.</h2>
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
          <h2>No note cap. No question cap. No bill.</h2>
          <p>
            <a href={LECTRA_APP_STORE_URL} target="_blank" rel="noreferrer">
              Lectra Notes on the App Store
            </a>{" "}
            — free with everything included. If lecture recording is your
            workflow, Notability earns its place, and we said so above.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
