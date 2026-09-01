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

const comparison = getComparison("lectra-notes-vs-goodnotes");
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
    question: "Is Lectra Notes better than Goodnotes?",
    answer:
      "It depends on what you need. Goodnotes has the more mature handwriting engine — including handwriting-to-text conversion — plus years of polish on audio recording synced to your notes, real-time collaboration, and apps on Windows, Android, and the web. Lectra Notes is free, added lecture recording in version 8.0 on September 1, 2026, and adds a computing environment: Python notebooks (.ipynb) that run on the device, a terminal with Git, a code editor, and SSH. For STEM and CS students who write code, Lectra Notes does things Goodnotes cannot; for cross-platform sync or a lecture-audio workflow proven over years, Goodnotes is the stronger pick today.",
  },
  {
    question: "Is Goodnotes free?",
    answer:
      "Goodnotes has a free tier limited to 3 files with watermarked exports and limited AI, as of August 2026. Full use requires a subscription — Essential at $11.99/year or Pro at $35.99/year — with advanced AI available via an add-on of about $9.99 a month, or a $35.99 one-time Apple-only edition that excludes cross-platform cloud sync.",
  },
  {
    question: "Is Lectra Notes really free?",
    answer:
      "Yes. Lectra Notes is free with no tiers, subscriptions, watermarks, file caps, ads, or third-party analytics. The notebooks, terminal, Git, code editor, on-device AI study tools, lecture recording (new in version 8.0), and Lectra for Mac are all included.",
  },
  {
    question: "Can Goodnotes run Python or code?",
    answer:
      "No. Goodnotes has no code editor, computational notebook, or Python capability. Lectra Notes runs Jupyter-format .ipynb notebooks with Python on the device (numpy, pandas, matplotlib), plus a terminal with Git and an SSH client, no server required.",
  },
  {
    question: "Does Lectra Notes record lectures like Goodnotes?",
    answer:
      "Yes, since version 8.0 on September 1, 2026. Lectra Notes records the lecture while you write; tap a handwritten stroke to hear what was said at that moment, and transcription runs on the device. It is brand new and has not been through a full semester yet. Goodnotes has years of polish on time-synced recording and offers transcription on paid plans, so if lecture audio is central to how you study, Goodnotes is the more proven choice today.",
  },
];

export default function LectraVsGoodnotesPage() {
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
          competitorAppNode("Goodnotes", "https://www.goodnotes.com"),
          faqSchema(faqs),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Compare · Updated September 2026</p>
          <h1>Lectra Notes vs Goodnotes</h1>
          <p className="centered-hero-lede">
            Goodnotes has the more polished handwriting engine. Lectra Notes
            is free and adds a computing environment: Python notebooks, a
            terminal, and Git that run on the iPad. Here is where each one
            wins, including where Goodnotes does.
          </p>
          <p className="hero-note">
            {LECTRA_DEFINITION} Goodnotes is a handwriting and PDF note-taking
            app with a free tier and paid plans, on iPad, Mac, Windows,
            Android, and the web.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="table">
        <div data-reveal>
          <ComparisonTable
            caption="Feature comparison of Lectra Notes and Goodnotes, September 2026"
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
                  "Pressure-responsive pen, shape recognition, ruler, and saved signatures. Handwriting is searchable, but there is no handwriting-to-text conversion.",
                  "Best-in-class: searchable handwriting plus convert-to-text, ink spellcheck, word complete, and handwriting reflow, much of it on-device.",
                ],
              },
              {
                label: "PDF markup",
                cells: [
                  "Full markup with page management. Exports keep the PDF's selectable text and make scanned pages searchable; the exported PDF opens anywhere and re-imports with editable ink.",
                  "Strong PDF import and annotation with searchable PDFs and outline support (multi-level outlines Apple-only as of early 2026).",
                ],
              },
              {
                label: "Audio",
                cells: [
                  "New in version 8.0 (September 1, 2026): records the lecture while you write. Tap a handwritten stroke to hear what was said at that moment; transcription runs on the device. Free, and not yet through a full semester.",
                  "Recording time-synced to your notes, with on-device or cloud transcription, refined over years. Unlimited recording requires a paid plan.",
                ],
              },
              {
                label: "AI / study tools",
                cells: [
                  "On the device: summaries, answers about the open document, flashcards, and quizzes on supported devices. Free, and opt-in.",
                  "Hybrid: on-device ink intelligence, while Ask Goodnotes, quizzes, and Create Mode run in the cloud and are credit-metered behind paid plans.",
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
              <li>
                Years of polish on audio recording synced to the moment you
                wrote; Lectra Notes only added recording in version 8.0
                (September 1, 2026).
              </li>
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
                AI study tools that run on the device and are opt-in.
              </li>
              <li>
                Exports that keep the PDF&apos;s real text and re-import with
                editable ink, so your documents are not locked into the app.
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

      <RelatedLinks title="More comparisons" links={relatedLinks} />

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>Try the free one first.</h2>
          <p>
            <StoreLink store="app-store" href={LECTRA_APP_STORE_CAMPAIGN_URL}>
              Lectra Notes on the App Store
            </StoreLink>{" "}
            — free with everything included, now with lecture recording (new
            in version 8.0). If you need Windows sync or years of audio polish,
            Goodnotes remains a fine choice, and we said so above.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
