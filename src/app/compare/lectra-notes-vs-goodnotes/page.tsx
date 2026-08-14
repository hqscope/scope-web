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
  "An honest comparison of Lectra Notes and Goodnotes for students: handwriting, PDF markup, audio, AI, pricing, and the computing environment only one of them has.";

export const metadata: Metadata = {
  title: "Lectra Notes vs Goodnotes",
  description,
  alternates: {
    canonical: "/compare/lectra-notes-vs-goodnotes",
  },
  keywords: [
    "Lectra Notes vs Goodnotes",
    "Goodnotes alternative",
    "Goodnotes for students",
    "iPad note taking comparison",
    "free Goodnotes alternative",
  ],
};

const faqs: FaqEntry[] = [
  {
    question: "Is Lectra Notes better than Goodnotes?",
    answer:
      "It depends on what you need. Goodnotes has the more mature handwriting engine — including handwriting-to-text conversion — plus audio recording synced to your notes, real-time collaboration, and apps on Windows, Android, and the web. Lectra Notes is completely free and adds a real computing environment: Jupyter notebooks with on-device Python, a terminal with Git, a code editor, and SSH. For STEM and CS students who write code, Lectra Notes does things Goodnotes cannot; for lecture audio or cross-platform sync, Goodnotes is the stronger pick today.",
  },
  {
    question: "Is Goodnotes free?",
    answer:
      "Goodnotes has a free tier limited to 3 files with watermarked exports and limited AI, as of August 2026. Full use requires a subscription — Essential at $11.99/year or Pro at $35.99/year — with advanced AI available via a $9.99/month add-on, or a $35.99 one-time Apple-only edition that excludes cross-platform cloud sync.",
  },
  {
    question: "Is Lectra Notes really free?",
    answer:
      "Yes. Lectra Notes is free with no tiers, subscriptions, watermarks, file caps, ads, or analytics. The notebooks, terminal, Git, code editor, on-device AI study tools, and Lectra for Mac are all included.",
  },
  {
    question: "Can Goodnotes run Python or code?",
    answer:
      "No. Goodnotes has no code editor, computational notebook, or Python capability. Lectra Notes runs real Jupyter .ipynb notebooks with on-device CPython (numpy, pandas, matplotlib), plus a terminal with Git and an SSH client — all offline.",
  },
  {
    question: "Does Lectra Notes record lectures like Goodnotes?",
    answer:
      "No. Goodnotes records audio time-synced to your notes with a transcription option, and that is a genuine advantage today. Lectra Notes does not offer lecture recording yet.",
  },
];

export default function LectraVsGoodnotesPage() {
  return (
    <PublicPageFrame active="lectra" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            {
              name: "Lectra Notes vs Goodnotes",
              path: "/compare/lectra-notes-vs-goodnotes",
            },
          ]),
          comparisonArticleSchema(
            "Lectra Notes vs Goodnotes",
            "/compare/lectra-notes-vs-goodnotes",
            description,
            "2026-08-14",
            "2026-08-14",
          ),
          competitorAppNode("Goodnotes", "https://www.goodnotes.com"),
          faqSchema(faqs),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Compare · Updated August 2026</p>
          <h1>Lectra Notes vs Goodnotes</h1>
          <p className="centered-hero-lede">
            Goodnotes is the most polished handwriting app on the iPad. Lectra
            Notes is the only one with a real computing environment — and
            it&apos;s free. Here&apos;s the honest breakdown, including where
            Goodnotes wins.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="table">
        <div data-reveal>
          <ComparisonTable
            caption="Feature comparison of Lectra Notes and Goodnotes, August 2026"
            columns={["Lectra Notes", "Goodnotes"]}
            rows={[
              {
                label: "Price",
                cells: [
                  "Free — everything included. No tiers, caps, watermarks, or ads.",
                  "Free tier capped at 3 files with watermarked exports. Essential $11.99/yr, Pro $35.99/yr, advanced AI ~$9.99/mo extra, or a $35.99 one-time Apple-only edition without cloud sync.",
                ],
              },
              {
                label: "Platforms",
                cells: [
                  "iPad and iPhone, plus the free Lectra for Mac.",
                  "Apple (most complete), plus Windows, Android, and web versions that trail the Apple apps; cross-platform cloud sync requires Pro.",
                ],
              },
              {
                label: "Handwriting",
                cells: [
                  "Custom vector ink engine — pressure-responsive pen, shape recognition, ruler, saved signatures. Handwriting is searchable, but there is no handwriting-to-text conversion.",
                  "Best-in-class: searchable handwriting plus convert-to-text, ink spellcheck, word complete, and handwriting reflow, much of it on-device.",
                ],
              },
              {
                label: "PDF markup",
                cells: [
                  "Full markup with page management; exports preserve the PDF's selectable text and add an invisible OCR layer. Hybrid PDFs open anywhere and re-import with editable ink.",
                  "Strong PDF import and annotation with searchable PDFs and outline support (multi-level outlines Apple-only as of early 2026).",
                ],
              },
              {
                label: "Audio",
                cells: [
                  "None today.",
                  "Recording time-synced to your notes, with on-device or cloud transcription. Unlimited recording requires a paid plan.",
                ],
              },
              {
                label: "AI / study tools",
                cells: [
                  "Entirely on-device: summaries, grounded Q&A, flashcards, and quizzes on supported devices. Free, with an opt-in consent model — nothing leaves the iPad.",
                  "Hybrid: on-device ink intelligence, while Ask Goodnotes, quizzes, and Create Mode run in the cloud and are credit-metered behind paid plans.",
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
                  "iCloud sync across Apple devices; Goodnotes Cloud sync across platforms is a Pro feature.",
                ],
              },
              {
                label: "Collaboration",
                cells: [
                  "Not available today.",
                  "Real-time collaboration and shared whiteboards on paid plans.",
                ],
              },
            ]}
          />
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="verdict">
        <div className="split-section" data-reveal>
          <div>
            <p className="kicker kicker-muted">Where Goodnotes wins</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
              <li>
                Handwriting-to-text conversion and the most refined ink
                intelligence on iPad.
              </li>
              <li>Audio recording synced to the moment you wrote.</li>
              <li>
                Windows, Android, and web apps, plus real-time collaboration.
              </li>
              <li>
                A decade of polish, a template marketplace, and roughly 25
                million monthly users.
              </li>
            </ul>
          </div>
          <div>
            <p className="kicker kicker-muted">Where Lectra Notes wins</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
              <li>
                Completely free — no 3-file cap, no watermark, no subscription,
                no AI credits.
              </li>
              <li>
                The computing environment: Python notebooks, terminal, Git,
                code editor, SSH, and a{" "}
                <Link href="/mac">remote desktop to your Mac</Link>.
              </li>
              <li>
                AI that never leaves the device, with a visible consent and
                audit model.
              </li>
              <li>
                Exports that keep the PDF&apos;s real text and stay
                re-editable — your documents are never locked in.
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
              "Handwriting-to-text: Lectra Notes searches handwriting but does not convert it to typed text.",
              "Collaboration: Goodnotes offers real-time collaboration; Lectra Notes does not today.",
            ]}
          />
        </div>
      </section>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>Lectra Notes vs Goodnotes, answered.</h2>
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
          <h2>Try the free one first.</h2>
          <p>
            <a href={LECTRA_APP_STORE_URL} target="_blank" rel="noreferrer">
              Lectra Notes on the App Store
            </a>{" "}
            — free with everything included. If you need lecture audio or
            Windows sync, Goodnotes remains a fine choice, and we said so
            above.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
