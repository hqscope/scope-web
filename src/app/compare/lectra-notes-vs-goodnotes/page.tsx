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

const comparison = getComparison("lectra-notes-vs-goodnotes");

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
    question: "Is Lectra Notes better than Goodnotes?",
    answer:
      "It depends on what you need. Goodnotes has the more mature handwriting engine, including handwriting-to-text conversion, plus years of polish on audio recording synced to your notes, real-time collaboration, and apps on Windows, Android, and the web. Lectra Notes is free, added lecture recording in version 8.0 on September 1, 2026, and adds a computing environment: Python notebooks (.ipynb) that run on the device, a terminal with Git, a code editor, and SSH. For STEM and CS students who write code, Lectra Notes does things Goodnotes cannot. For cross-platform sync or a lecture-audio workflow proven over years, Goodnotes is the stronger pick today.",
  },
  {
    question: "Is Goodnotes free?",
    answer:
      "Goodnotes has a free tier limited to 3 files with watermarked exports and limited AI, as of August 2026. Full use requires a subscription, either Essential at $11.99/year or Pro at $35.99/year, with advanced AI available through an add-on of about $9.99 a month. There is also a $35.99 one-time Apple-only edition that excludes cross-platform cloud sync.",
  },
  {
    question: "Is Lectra Notes really free?",
    answer:
      "Yes. Lectra Notes is free with no tiers, subscriptions, watermarks, file caps, ads, or third-party analytics. The notebooks, terminal, Git, code editor, on-device AI study tools, lecture recording (new in version 8.0), and Lectra for Mac are all included.",
  },
  {
    question: "Can Goodnotes run Python or code?",
    answer:
      "No. Goodnotes has no code editor, computational notebook, or Python capability. Lectra Notes runs Jupyter-format .ipynb notebooks with Python on the device (numpy, pandas, matplotlib), plus a terminal with Git and an SSH client, with no server required.",
  },
  {
    question: "Does Lectra Notes record lectures like Goodnotes?",
    answer:
      "Yes, since version 8.0 on September 1, 2026. Lectra Notes records the lecture while you write. Tap a handwritten stroke to hear what was said at that moment, and transcription runs on the device. It is brand new and has not been through a full semester yet. Goodnotes has years of polish on time-synced recording and offers transcription on paid plans, so if lecture audio is central to how you study, Goodnotes is the more proven choice today.",
  },
];

export default function LectraVsGoodnotesPage() {
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
          competitorAppNode("Goodnotes", "https://www.goodnotes.com"),
          faqSchema(faqs),
        ]}
      />

      <CompareArticle
        cta={lectraCta}
        context="Updated September 2026. Lectra Notes is ours."
        title="Lectra Notes vs Goodnotes"
        lede={
          <>
            Goodnotes has the more polished handwriting engine. Lectra Notes is
            free and adds <Pen>a computing environment</Pen>, with Python
            notebooks, a terminal, and Git that run on the iPad. Here is where each
            one wins, including where Goodnotes does.
          </>
        }
        definition={
          <>
            {LECTRA_DEFINITION} Goodnotes is a handwriting and PDF note-taking app
            with a free tier and paid plans, on iPad, Mac, Windows, Android, and
            the web.
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
                caption="Feature comparison of Lectra Notes and Goodnotes, September 2026"
                columns={["Lectra Notes", "Goodnotes"]}
                ours={0}
                rows={[
                  {
                    label: "Price",
                    cells: [
                      "Free, with everything included. No tiers, caps, watermarks, or ads.",
                      "Free tier capped at 3 files with watermarked exports. Essential $11.99/yr, Pro $35.99/yr, advanced AI about $9.99/mo extra, or a $35.99 one-time Apple-only edition without cloud sync.",
                    ],
                  },
                  {
                    label: "Platforms",
                    cells: [
                      "iPad and iPhone, plus the free Lectra for Mac.",
                      "Apple (most complete), plus Windows, Android, and web versions that trail the Apple apps. Cross-platform cloud sync requires Pro.",
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
                      "Full markup with page management. Exports keep the PDF's selectable text and make scanned pages searchable, and the exported PDF opens anywhere and re-imports with editable ink.",
                      "Strong PDF import and annotation with searchable PDFs and outline support (multi-level outlines Apple-only as of early 2026).",
                    ],
                  },
                  {
                    label: "Audio",
                    cells: [
                      "New in version 8.0 (September 1, 2026). It records the lecture while you write. Tap a handwritten stroke to hear what was said at that moment, and transcription runs on the device. Free, and not yet through a full semester.",
                      "Recording time-synced to your notes, with on-device or cloud transcription, refined over years. Unlimited recording requires a paid plan.",
                    ],
                  },
                  {
                    label: "AI and study tools",
                    cells: [
                      "On the device: summaries, answers about the open document, flashcards, and quizzes on supported devices. Free, and opt-in.",
                      "Hybrid. Ink intelligence runs on-device, while Ask Goodnotes, quizzes, and Create Mode run in the cloud and are credit-metered behind paid plans.",
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
                      "iCloud sync across Apple devices. Goodnotes Cloud sync across platforms is a Pro feature.",
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
                    title: "Where Goodnotes wins",
                    items: [
                      "Handwriting-to-text conversion and the most refined ink intelligence on iPad.",
                      "Years of polish on audio recording synced to the moment you wrote. Lectra Notes only added recording in version 8.0 (September 1, 2026).",
                      "Windows, Android, and web apps, plus real-time collaboration.",
                      "A decade of polish, a template marketplace, and roughly 25 million monthly users.",
                    ],
                  },
                  {
                    title: "Where Lectra Notes wins",
                    items: [
                      "Completely free, with no 3-file cap, no watermark, no subscription, and no AI credits.",
                      <>
                        The computing environment: Python notebooks, terminal, Git,
                        code editor, SSH, and a{" "}
                        <Link href="/mac">remote desktop to your Mac</Link>.
                      </>,
                      "AI study tools that run on the device and are opt-in.",
                      "Exports that keep the PDF's real text and re-import with editable ink, so your documents are not locked into the app.",
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
                  "Handwriting-to-text: Lectra Notes searches handwriting but does not convert it to typed text.",
                  "Collaboration: Goodnotes offers real-time collaboration, and Lectra Notes does not today.",
                ]}
              />
            ),
          },
          {
            id: "faq",
            title: "Lectra Notes vs Goodnotes, answered.",
            outline: "Questions",
            content: <FaqList items={faqs} />,
          },
        ]}
        related={{
          title: "More comparisons.",
          links: lectraRelatedLinks(comparison.slug),
        }}
        closing={{
          title: "Try the free one first.",
          body: (
            <p>
              Lectra Notes is free with everything included, now with lecture
              recording (new in version 8.0). If you need Windows sync or years of
              audio polish, Goodnotes remains a fine choice, and we said so above.
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
