import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import NewsroomTeaserGrid from "@/components/public/NewsroomTeaserGrid";
import RelatedLinks, {
  type RelatedLink,
} from "@/components/public/RelatedLinks";
import NotebookMock from "@/components/public/mocks/NotebookMock";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import {
  breadcrumbSchema,
  faqSchema,
  lectraSoftwareSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { comparePath, getComparison } from "@/lib/compare";
import { getGuide, guidePath } from "@/lib/guides";
import { getNewsroomArticlesBySlugs } from "@/lib/newsroom";
import { publicPageMetadata } from "@/lib/seo";
import { LECTRA_APP_STORE_CAMPAIGN_URL, LECTRA_DEFINITION } from "@/lib/site";

const PAGE_PATH = "/products/lectra";

// Open Graph and Twitter images come from the sibling opengraph-image.tsx and
// twitter-image.tsx routes, which take precedence over config metadata, so
// none are declared here.
export const metadata: Metadata = {
  ...publicPageMetadata({
    title: "Lectra Notes — Free iPad Note-Taking App for Students",
    description:
      "Lectra Notes is a free iPad note-taking app: Apple Pencil markup for lecture slides and PDFs, an offline library, plus Python notebooks, a terminal, and Git. No subscription.",
    path: PAGE_PATH,
    keywords: [
      "Lectra Notes",
      "Scope Lectra",
      "Lectra App Store",
      "Apple Pencil PDF annotation",
      "iPad Python notebook",
      "Jupyter iPad",
      "iPad terminal",
      "git on iPad",
      "Lectra on-device AI",
      "Attach from Lectra",
      "student PDF annotation",
      "iPad study companion",
      "iPad PDF editor",
      "handwritten notes iPad",
      "local-first document reader",
      "DropBridge v3",
      "iPad note-taking app for students",
      "free note taking app iPad",
      "annotate lecture slides iPad",
    ],
  }),
  // Safari's Smart App Banner on iPhone and iPad. The id is the one in
  // LECTRA_APP_STORE_URL; the argument sends the banner tap back here.
  itunes: {
    appId: "6759754531",
    appArgument: "https://www.canvascope.org/products/lectra",
  },
};

const faqs: FaqEntry[] = [
  {
    question: "What is Lectra Notes?",
    answer: `${LECTRA_DEFINITION} It imports and organizes documents on its own, receives course PDFs sent from the Scope for Canvas extension, and can use private on-device intelligence for supported study aids.`,
  },
  {
    question: "How do PDFs get from Scope to Lectra Notes?",
    answer:
      "Send a PDF from Canvas to your iPad in one tap with the Scope extension. It lands in your Lectra Notes library ready to mark up, and finished files can come back into supported upload flows.",
  },
  {
    question: "Do I need Scope to use Lectra Notes?",
    answer:
      "No. Lectra Notes imports and organizes documents on its own. The free Scope extension adds the one-tap handoff for sending course PDFs from Canvas to your iPad and bringing finished PDFs back into supported upload flows.",
  },
  {
    question: "Does Lectra Notes sync with Canvas?",
    answer:
      "Not automatically. With the free Scope extension you send any Canvas file to Lectra Notes in one tap, and finished PDFs can come back into supported upload flows. Lectra Notes does not log in to Canvas or pull files on its own.",
  },
  {
    question:
      "Does Lectra Notes keep my notes tied to the original course file?",
    answer:
      "Yes. A PDF sent from Scope stays linked to the course file it came from, so your annotations and finished exports stay in context.",
  },
  {
    question: "Can finished Lectra Notes PDFs return to browser uploads?",
    answer:
      "Yes. The Scope extension adds an Attach from Lectra picker to supported browser upload flows — starting with Gradescope's upload dialog — so annotated PDFs can come back without digging through downloads.",
  },
  {
    question: "Is Lectra Notes available now?",
    answer:
      "Yes. Lectra Notes is available now on the Apple App Store as a free download for iPhone and iPad.",
  },
  {
    question: "Is Lectra Notes free?",
    answer:
      "Yes — completely. There are no tiers, subscriptions, or paywalls, and no ads or third-party tracking. The notebooks, terminal, Git, code editor, and Lectra for Mac are all part of the free app.",
  },
  {
    question:
      "Is Lectra Notes related to Lectra SA or the other 'Lectra' study apps on the App Store?",
    answer:
      "No. Lectra Notes is made by Scope Inc. and is unrelated to Lectra SA, the fashion-software company, and to other apps that use the name Lectra. The App Store listing is at apps.apple.com/us/app/lectra-notes/id6759754531.",
  },
  {
    question: "Can Lectra Notes run Python?",
    answer:
      "Yes. Lectra Notes runs Python on the device — standard .ipynb notebooks with numpy, pandas, and matplotlib, plus python in the built-in terminal. Everything runs offline; nothing is sent to a server to execute.",
  },
  {
    question: "Does Lectra Notes record lectures?",
    answer:
      "Yes — added in version 8.0 on September 1, 2026. Lectra Notes records the lecture while you write; tap a stroke to hear what was said at that moment, and transcription runs on the device. It is new and has not been through a full semester of use yet. Notability and Goodnotes have years of polish on audio, and Notability offers transcription and AI summaries on its paid tiers.",
  },
  {
    question: "How is Lectra Notes different from other note-taking apps?",
    answer:
      "Goodnotes and Notability run on more platforms and have had years longer to mature — including their lecture-audio features, where Notability also offers transcription and AI summaries on paid tiers (checked September 1, 2026). Lectra Notes adds what they don't have: a real computing environment — Python notebooks, a terminal with Git, a code editor, and SSH — beside your handwritten notes, and it's free with no subscription. The Lectra Notes vs Goodnotes and Lectra Notes vs Notability comparisons have the feature-by-feature version.",
  },
  {
    question: "Does Lectra Notes work offline?",
    answer:
      "Yes. The library, Pencil markup, notebooks, Python, Git, and the terminal all work with no connection. The network is only needed for handoffs, backup, Git remotes, and SSH.",
  },
];

const pillars = [
  {
    label: "Ink",
    title: "Apple-Pencil-first",
    copy:
      "Vector ink on PDFs, notebooks, and scanned pages. Low-latency, pressure-aware, and searchable — you can find your own handwriting later.",
  },
  {
    label: "Compute",
    title: "A real environment",
    copy:
      "Python notebooks, a terminal, and Git — running offline, on the iPad. The problem set and the code live on the same page.",
  },
  {
    label: "Library",
    title: "Offline, organized",
    copy:
      "Send a PDF from Canvas to your iPad in one tap with the Scope extension. Everything opens on the train, in lecture, in the library basement.",
  },
];

/* What a .lectra file carries. The point of the format is that none of
   these travel separately. */
const formatParts = [
  { part: "The PDF", kind: "Source" },
  { part: "Your ink", kind: "Vector" },
  { part: "The notebook + outputs", kind: "Runnable" },
  { part: "Attachments & links", kind: "Intact" },
];

const relatedArticles = getNewsroomArticlesBySlugs([
  "lectra-studio",
  "lectra-v7-keyboard-commands-and-a-signature-that-saves",
  "introducing-the-lectra-document-format",
]);

// Labels and blurbs come from the compare and guide registries so this list
// never drifts from the pages it points at.
const relatedComparisons = [
  "lectra-notes-vs-goodnotes",
  "lectra-notes-vs-notability",
  "free-goodnotes-alternatives",
].map((slug) => getComparison(slug));
const annotateGuide = getGuide("annotate-lecture-slides-on-ipad");

const relatedLinks: RelatedLink[] = [
  ...relatedComparisons.map((comparison) => ({
    href: comparePath(comparison),
    label: comparison.title,
    copy: comparison.description,
  })),
  {
    href: guidePath(annotateGuide),
    label: annotateGuide.title,
    copy: annotateGuide.description,
  },
];

export default function LectraPage() {
  return (
    <PublicPageFrame
      active="lectra"
      footerVariant="slim"
      headerCta={{
        label: "Get Lectra Notes",
        href: LECTRA_APP_STORE_CAMPAIGN_URL,
        external: true,
      }}
    >
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lectra Notes", path: PAGE_PATH },
          ]),
          lectraSoftwareSchema(),
          faqSchema(faqs),
        ]}
      />

      {/* --- Hero --- */}
      <section className="page-wrap product-hero">
        <div className="product-hero-grid">
          <div className="product-hero-copy" data-reveal>
            <p className="kicker">
              Lectra Notes — free note-taking app for iPad · iPhone · Mac
            </p>
            <h1>
              The iPad note-taking app for the documents you <em>think</em> on.
            </h1>
            <p className="section-copy">
              {LECTRA_DEFINITION} Send a PDF from Canvas to your iPad in one
              tap with the Scope extension. No subscription, no tiers.
            </p>
            <div className="pill-actions">
              <StoreLink
                store="app-store"
                href={LECTRA_APP_STORE_CAMPAIGN_URL}
                className="button-primary"
              >
                Get it on the App Store
              </StoreLink>
              <Link href="/mac" className="button-secondary">
                Lectra for Mac →
              </Link>
            </div>
            <p className="hero-note">
              Free · No subscription · Works without the extension
            </p>
          </div>

          <div className="device-frame" data-reveal="scale">
            <Image
              src="/brand/lectra-markup-ipad.png"
              alt="Lectra Notes on iPad: an organic chemistry midterm review PDF marked up with a yellow highlight, a circled paragraph, and a red underline, with the ink toolbar at the bottom of the page."
              width={2064}
              height={2752}
              quality={90}
              priority
              sizes="(max-width: 860px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* --- Three pillars --- */}
      <section className="section-band">
        <div
          className="page-wrap plain-grid"
          data-reveal="stagger"
          style={{ "--stagger-step": "80ms" } as CSSProperties}
        >
          {pillars.map((pillar, index) => (
            <div
              key={pillar.label}
              style={{ "--stagger-index": index } as CSSProperties}
            >
              <p className="kicker kicker--bare">{pillar.label}</p>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- The computing moment. The one dark band on the site. --- */}
      <section className="section-band section-band--deep">
        <div className="page-wrap split-section split-section--center" data-reveal>
          <div>
            <p className="kicker kicker--on-deep">Computing moment</p>
            <h2>The notebook runs where the notes are.</h2>
            <p className="section-copy section-copy--on-deep">
              No server, no tab-switching. Code cells run on the iPad, next to
              the handwritten derivation they implement.
            </p>
          </div>
          <NotebookMock
            filename="pset4.ipynb"
            kernel="Python 3.11 · local"
            code={[
              "import numpy as np",
              "A = np.array([[2,1],[1,3]])",
              "np.linalg.eigvals(A)",
            ]}
            output="array([1.38196601, 3.61803399])"
          />
        </div>
      </section>

      {/* --- The .lectra format --- */}
      <section className="section-band">
        <div className="page-wrap split-section split-section--center" data-reveal>
          <div className="format-card">
            <div className="format-card-head">
              <span className="format-badge">.lectra</span>
              <span className="hero-note">One file</span>
            </div>
            <ul className="check-list">
              {formatParts.map((row) => (
                <li key={row.part} className="format-row">
                  <strong>{row.part}</strong>
                  <span className="hero-note">{row.kind}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker">The .lectra format</p>
            <h2>A document you can actually hand to someone.</h2>
            <p className="section-copy">
              Ink, source, code, and outputs travel as one file. Send it to a
              study partner, submit it, archive it — it opens with everything
              still live.
            </p>
            <Link
              href="/newsroom/introducing-the-lectra-document-format"
              className="text-link"
            >
              Read the announcement →
            </Link>
          </div>
        </div>
      </section>

      {/* --- Get files from Canvas --- */}
      <section className="section-band" id="canvas">
        <div className="page-wrap split-section" data-reveal>
          <div>
            <p className="kicker">With the Scope extension</p>
            <h2>From Canvas to your iPad in one tap.</h2>
            <p className="section-copy">
              Send a PDF from Canvas to your iPad in one tap with the Scope
              extension; finished files can come back into supported upload
              flows. No app syncs with Canvas automatically — you choose what
              to send, and Lectra Notes does not log in to Canvas on its own.
            </p>
            <Link href="/products/extension" className="text-link">
              Scope for Canvas, the free Chrome extension →
            </Link>
          </div>
          <div>
            <ol className="list-decimal space-y-3 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
              <li>
                <strong>Open the file in Canvas.</strong> Lecture slides, a
                reading, a problem set — any PDF in the course.
              </li>
              <li>
                <strong>Tap Send to Lectra.</strong> The Scope extension
                delivers it to your Lectra Notes library, ready to mark up.
              </li>
              <li>
                <strong>Annotate with Apple Pencil.</strong> When you&apos;re
                done, the finished PDF can come back into supported upload
                flows.
              </li>
            </ol>
            <Link
              href="/guides/annotate-lecture-slides-on-ipad"
              className="text-link"
            >
              How to annotate lecture slides on iPad →
            </Link>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="page-wrap faq-section" id="faq">
        <h2 className="section-heading" data-reveal>
          Questions people actually ask.
        </h2>
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
        articles={relatedArticles}
        kicker="Newsroom"
        title="What shipped recently."
        ctaLabel="All posts →"
      />

      <RelatedLinks
        kicker="Compare and learn"
        title="Lectra Notes next to the apps you already know."
        links={relatedLinks}
      />

      {/* --- CTA --- */}
      <section className="page-wrap final-cta" data-reveal>
        <h2>Bring the course to the page.</h2>
        <div className="pill-actions">
          <StoreLink
            store="app-store"
            href={LECTRA_APP_STORE_CAMPAIGN_URL}
            className="button-primary"
          >
            Get it on the App Store
          </StoreLink>
          <Link href="/mac" className="button-secondary">
            Lectra for Mac →
          </Link>
        </div>
        <p className="hero-note">iPad · iPhone · Mac · free</p>
      </section>
    </PublicPageFrame>
  );
}
