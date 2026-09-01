import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import ComparisonTable from "@/components/public/ComparisonTable";
import MethodologyNote from "@/components/public/MethodologyNote";
import RelatedLinks from "@/components/public/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import { comparePath, comparisonsFor, getComparison } from "@/lib/compare";
import { getGuide, guidePath } from "@/lib/guides";
import { publicPageMetadata } from "@/lib/seo";
import { LECTRA_APP_STORE_CAMPAIGN_URL, LECTRA_DEFINITION } from "@/lib/site";
import {
  breadcrumbSchema,
  comparisonArticleSchema,
  competitorAppNode,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";

const comparison = getComparison("lectra-notes-vs-notability");
const annotateGuide = getGuide("annotate-lecture-slides-on-ipad");

export const metadata = publicPageMetadata({
  title: comparison.title,
  absoluteTitle: comparison.absoluteTitle,
  description: comparison.description,
  path: comparePath(comparison),
  keywords: comparison.keywords,
  type: "article",
  publishedTime: comparison.datePublished,
  modifiedTime: comparison.dateModified,
});

/* The other Lectra Notes comparisons, plus the iPad annotation guide. */
const relatedLinks = [
  ...comparisonsFor("lectra")
    .filter((item) => item.slug !== comparison.slug)
    .map((item) => ({
      href: comparePath(item),
      label: item.title,
      copy: item.copy,
    })),
  {
    href: guidePath(annotateGuide),
    label: annotateGuide.title,
    copy: annotateGuide.copy,
  },
];

const faqs: FaqEntry[] = [
  {
    question: "Is Lectra Notes better than Notability?",
    answer:
      "For lecture-heavy classes, Notability is hard to beat: audio recording synced to your notes is its signature feature, and paid tiers add transcription with AI summaries. Lectra Notes has no lecture recording today. But Lectra Notes is completely free without Notability's 5-note cap, its AI runs on-device instead of in the cloud, and it adds a computing environment — Python notebooks, a terminal with Git, a code editor, and SSH — that Notability doesn't have. Pick by which of those matters more to your classes.",
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
      "On the device. The study tools — summaries, answers about the open document, flashcards, and quizzes — run on supported iPads and iPhones without sending your documents off the device, and they are free. Notability's Learn AI features are processed on its servers (with a stated no-training policy) and require the Plus or Pro plan.",
  },
  {
    question: "Can Notability run Python or code?",
    answer:
      "No. Notability has no code or notebook capability. Lectra Notes runs Jupyter-format .ipynb notebooks with Python on the device, plus a terminal with Git and an SSH client, free and with no server required.",
  },
];

export default function LectraVsNotabilityPage() {
  return (
    <PublicPageFrame active="compare" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            { name: comparison.title, path: comparePath(comparison) },
          ]),
          comparisonArticleSchema(
            comparison.title,
            comparePath(comparison),
            comparison.description,
            comparison.datePublished,
            comparison.dateModified,
            "#lectra-ipad",
          ),
          competitorAppNode("Notability", "https://notability.com"),
          faqSchema(faqs),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Compare · Updated September 2026</p>
          <h1>Lectra Notes vs Notability</h1>
          <p className="centered-hero-lede">
            Notability owns lecture audio — recording synced to your notes is
            its signature feature. Lectra Notes is free without note caps and
            adds a computing environment: Python notebooks, a terminal, and
            Git that run on the iPad. Here is where each one wins.
          </p>
          <p className="hero-note">
            {LECTRA_DEFINITION} Notability is a handwriting and lecture-audio
            note-taking app for iPhone, iPad, Mac, Android, and the web, with a
            free Starter plan and paid tiers.
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
              // verify: whether recording is included on the free Starter
              // plan. Notability's pricing page on 2026-09-01 lists "Record &
              // transcribe audio" under Plus and does not mention recording
              // under Starter; the earlier "every tier, including free" claim
              // was compiled on 2026-08-14, so the copy no longer asserts it.
              {
                label: "Audio",
                cells: [
                  "None — Lectra Notes does not record lectures or sync audio to notes today.",
                  "Recording synced to notes, its signature feature. As of September 1, 2026 its pricing page lists recording and transcription under Plus, with unlimited live transcription and real-time AI summaries on Pro; we could not confirm recording on the free Starter plan. Audio is processed on Notability's servers and deleted after transcription.",
                ],
              },
              {
                label: "Handwriting",
                cells: [
                  "Pressure-responsive pen, shape recognition, ruler, and saved signatures. Handwriting is searchable; no handwriting-to-text conversion.",
                  "Mature ink engine incl. a tilt-responsive calligraphy pen. Handwriting recognition, search, and handwritten-math-to-LaTeX — on paid tiers, in the apps (not web).",
                ],
              },
              {
                label: "PDF markup",
                cells: [
                  "Full markup with page management. Exports keep the PDF's selectable text and make scanned pages searchable; the exported PDF re-imports with editable ink.",
                  "PDF, doc, and slide import with annotation and scanning on all tiers.",
                ],
              },
              {
                label: "AI / study tools",
                cells: [
                  "On the device and free: summaries, answers about the open document, flashcards, and quizzes on supported devices.",
                  "Notability Learn (cloud-based, paid): summaries, quizzes, flashcards, YouTube-to-note, chat with your notes. Capped on Plus; unlimited on Pro at $99.99/yr.",
                ],
              },
              {
                label: "Code & notebooks",
                cells: [
                  "Jupyter-format .ipynb notebooks with Python on the device (numpy, pandas, matplotlib), a code editor, a terminal with Git, and SSH — no server required.",
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
                Lecture audio synced to your handwriting, transcribed on paid
                tiers.
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
                AI study tools that are free and run on the device, with no
                monthly question caps.
              </li>
              <li>
                The computing environment: Python notebooks, terminal, Git,
                code editor, SSH, and a{" "}
                <Link href="/mac">remote desktop to your Mac</Link>.
              </li>
              <li>
                Exports that keep the PDF&apos;s selectable text, make scanned
                pages searchable, and re-import with editable ink.
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

      <RelatedLinks title="More comparisons" links={relatedLinks} />

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>No note cap. No question cap. No bill.</h2>
          <p>
            <StoreLink store="app-store" href={LECTRA_APP_STORE_CAMPAIGN_URL}>
              Lectra Notes on the App Store
            </StoreLink>{" "}
            — free with everything included. If lecture recording is your
            workflow, Notability earns its place, and we said so above.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
