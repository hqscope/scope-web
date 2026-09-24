import Link from "next/link";

import ComparisonTable from "@/components/site/ComparisonTable";
import FaqList from "@/components/site/FaqList";
import MethodologyNote from "@/components/site/MethodologyNote";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import { comparePath, getComparison } from "@/lib/compare";
import { publicPageMetadata } from "@/lib/seo";
import { LECTRA_APP_STORE_CAMPAIGN_URL, LECTRA_DEFINITION } from "@/lib/site";
import {
  breadcrumbSchema,
  comparisonArticleSchema,
  competitorAppNode,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";

import CompareArticle, { lectraCta, lectraRelatedLinks, Pen, WinsGrid } from "../CompareArticle";

const comparison = getComparison("lectra-notes-vs-notability");

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

const faqs: FaqEntry[] = [
  {
    question: "Is Lectra Notes better than Notability?",
    answer:
      "For lecture-heavy classes, Notability is hard to beat. Audio recording synced to your notes has been its signature feature for years, and paid tiers add transcription with AI summaries. Lectra Notes added lecture recording in version 8.0 on September 1, 2026. It records while you write, a tap on a stroke plays what was said at that moment, and transcription runs on the device, but it is brand new and has not been through a full semester yet. Lectra Notes is also completely free without Notability's 5-note cap, its AI runs on-device instead of in the cloud, and it adds a computing environment with Python notebooks, a terminal with Git, a code editor, and SSH that Notability doesn't have. Pick by which of those matters more to your classes.",
  },
  {
    question: "Is Notability free?",
    answer:
      "Notability's free Starter plan is capped at 5 notes as of the July 2026 restructure. Paid plans run from Lite at $14.99/year to Pro at $99.99/year (AI features included only on Plus and Pro), plus a $39.99 to $49.99 one-time Classic option without AI.",
  },
  {
    question: "Does Lectra Notes record lectures?",
    answer:
      "Yes, since version 8.0 on September 1, 2026. Lectra Notes records the lecture while you write. Tap a handwritten stroke to hear what was said at that moment, or drag the playhead and watch the page fill back in stroke by stroke. Transcription runs on the device, and it is free. It is also brand new and has not been through a full semester yet. Notability has years of polish on lecture audio, and its paid tiers add transcription with AI summaries, so if recording is central to how you study, Notability is the more proven choice today.",
  },
  {
    question: "Where does Lectra Notes' AI run?",
    answer:
      "On the device. The study tools (summaries, answers about the open document, flashcards, and quizzes) run on supported iPads and iPhones without sending your documents off the device, and they are free. Notability's Learn AI features are processed on its servers (with a stated no-training policy) and require the Plus or Pro plan.",
  },
  {
    question: "Can Notability run Python or code?",
    answer:
      "No. Notability has no code or notebook capability. Lectra Notes runs Jupyter-format .ipynb notebooks with Python on the device, plus a terminal with Git and an SSH client, free and with no server required.",
  },
];

export default function LectraVsNotabilityPage() {
  return (
    <>
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

      <CompareArticle
        cta={lectraCta}
        context="Updated September 2026. Lectra Notes is ours."
        title="Lectra Notes vs Notability"
        lede={
          <>
            Notability has years of polish on lecture audio, and recording synced
            to your notes is its signature feature. Lectra Notes now records
            lectures too (new in version 8.0, September 1, 2026), is free{" "}
            <Pen>without note caps</Pen>, and adds a computing environment with
            Python notebooks, a terminal, and Git that run on the iPad. Here is
            where each one wins.
          </>
        }
        definition={
          <>
            {LECTRA_DEFINITION} Notability is a handwriting and lecture-audio
            note-taking app for iPhone, iPad, Mac, Android, and the web, with a
            free Starter plan and paid tiers.
          </>
        }
        actions={
          <>
            <StoreLink
              store="app-store"
              href={LECTRA_APP_STORE_CAMPAIGN_URL}
              className="btn btn-primary"
            >
              Get Lectra Notes for free
            </StoreLink>
            <a href="#table" className="btn btn-line">
              See the comparison
            </a>
          </>
        }
        sections={[
          {
            id: "table",
            title: "Feature by feature.",
            outline: "Feature by feature",
            content: (
              <ComparisonTable
                caption="Feature comparison of Lectra Notes and Notability, September 2026"
                columns={["Lectra Notes", "Notability"]}
                ours={0}
                rows={[
                  {
                    label: "Price",
                    cells: [
                      "Free, with everything included. No tiers, caps, or ads.",
                      "Free Starter capped at 5 notes. Lite $14.99/yr, Plus $19.99/yr, Pro $99.99/yr (AI on Plus and Pro only), or Classic one-time $39.99 to $49.99 without AI.",
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
                      "New in version 8.0 (September 1, 2026). It records the lecture while you write. Tap a handwritten stroke to hear what was said at that moment, and transcription runs on the device. Free, and not yet through a full semester.",
                      "Recording synced to notes is its signature feature. As of September 1, 2026 its pricing page lists recording and transcription under Plus, with unlimited live transcription and real-time AI summaries on Pro. We could not confirm recording on the free Starter plan. Audio is processed on Notability's servers and deleted after transcription.",
                    ],
                  },
                  {
                    label: "Handwriting",
                    cells: [
                      "Pressure-responsive pen, shape recognition, ruler, and saved signatures. Handwriting is searchable, with no handwriting-to-text conversion.",
                      "A mature ink engine, including a tilt-responsive calligraphy pen. Handwriting recognition, search, and handwritten-math-to-LaTeX are on paid tiers, in the apps (not web).",
                    ],
                  },
                  {
                    label: "PDF markup",
                    cells: [
                      "Full markup with page management. Exports keep the PDF's selectable text and make scanned pages searchable, and the exported PDF re-imports with editable ink.",
                      "PDF, doc, and slide import with annotation and scanning on all tiers.",
                    ],
                  },
                  {
                    label: "AI and study tools",
                    cells: [
                      "On the device and free: summaries, answers about the open document, flashcards, and quizzes on supported devices.",
                      "Notability Learn (cloud-based, paid): summaries, quizzes, flashcards, YouTube-to-note, and chat with your notes. Capped on Plus, unlimited on Pro at $99.99/yr.",
                    ],
                  },
                  {
                    label: "Code and notebooks",
                    cells: [
                      "Jupyter-format .ipynb notebooks with Python on the device (numpy, pandas, matplotlib), a code editor, a terminal with Git, and SSH, with no server required.",
                      "None.",
                    ],
                  },
                  {
                    label: "Sync and backup",
                    cells: [
                      "Offline-first. Documents back up when you sign in, with an optional iCloud mirror. Annotations do not yet sync between devices.",
                      "Free Notability Cloud sync across iOS, Android, Mac, and web, with version history from 7 to 90 days by tier.",
                    ],
                  },
                ]}
              />
            ),
          },
          {
            id: "verdict",
            title: "Where each one wins.",
            outline: "Where each one wins",
            content: (
              <WinsGrid
                ours={1}
                columns={[
                  {
                    title: "Where Notability wins",
                    items: [
                      "Years of polish on lecture audio synced to your handwriting, with transcription and AI summaries on paid tiers. Lectra Notes only added recording in version 8.0 (September 1, 2026).",
                      "Cross-device sync today, now including Android.",
                      "Handwriting-to-text and handwritten-math-to-LaTeX conversion.",
                      "Years of polish and a 20,000+ template gallery.",
                    ],
                  },
                  {
                    title: "Where Lectra Notes wins",
                    items: [
                      "Free without the 5-note cap, with unlimited documents, no watermark, and no subscription.",
                      "AI study tools that are free and run on the device, with no monthly question caps.",
                      <>
                        The computing environment: Python notebooks, terminal, Git,
                        code editor, SSH, and a{" "}
                        <Link href="/mac">remote desktop to your Mac</Link>.
                      </>,
                      "Exports that keep the PDF's selectable text, make scanned pages searchable, and re-import with editable ink.",
                    ],
                  },
                ]}
              />
            ),
          },
          {
            id: "methodology",
            outline: "How this was made",
            content: (
              <MethodologyNote
                dateChecked="August 14, 2026"
                extraConcessions={[
                  "Handwriting conversion: Lectra Notes searches handwriting but does not convert it to text or LaTeX.",
                  "Android: Notability now has a native Android app, and Lectra Notes is Apple-only.",
                ]}
              />
            ),
          },
          {
            id: "faq",
            title: "Lectra Notes vs Notability, answered.",
            outline: "Questions",
            content: <FaqList items={faqs} />,
          },
        ]}
        related={{
          title: "More comparisons.",
          links: lectraRelatedLinks(comparison.slug),
        }}
        closing={{
          title: "No note cap. No question cap. No bill.",
          body: (
            <p>
              Lectra Notes is free with everything included, now with lecture
              recording (new in version 8.0). If recording is central to your
              workflow, Notability&apos;s years of polish still earn its place, and
              we said so above.
            </p>
          ),
          actions: (
            <StoreLink
              store="app-store"
              href={LECTRA_APP_STORE_CAMPAIGN_URL}
              className="btn btn-primary"
            >
              Lectra Notes on the App Store
            </StoreLink>
          ),
        }}
      />
    </>
  );
}
