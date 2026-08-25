import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import NewsroomTeaserGrid from "@/components/public/NewsroomTeaserGrid";
import NotebookMock from "@/components/public/mocks/NotebookMock";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  lectraSoftwareSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { getNewsroomArticlesBySlugs } from "@/lib/newsroom";
import { LECTRA_APP_STORE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lectra Notes — Pencil Notes, PDFs & Python on iPad",
  description:
    "Lectra Notes is the free iPad workspace for students: Apple Pencil PDF markup, real Jupyter notebooks with on-device Python, a terminal with Git, on-device AI study tools, and a two-way handoff with Scope.",
  alternates: {
    canonical: "/products/lectra",
  },
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
  ],
  openGraph: {
    title: "Lectra Notes — Pencil Notes, PDFs & Python on iPad",
    description:
      "Apple Pencil PDF markup, real Jupyter notebooks with on-device Python, a terminal with Git, and on-device AI study tools — free, offline-first, connected to Scope.",
    type: "website",
    url: "/products/lectra",
    images: [
      {
        url: "/brand/lectra-canvascope-lockup.png",
        width: 1200,
        height: 630,
        alt: "Lectra Notes — Pencil notes, PDFs, and Python on iPad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lectra Notes — Pencil Notes, PDFs & Python on iPad",
    description:
      "Apple Pencil PDF markup, real Jupyter notebooks with on-device Python, a terminal with Git, and on-device AI study tools — free and offline-first.",
    images: ["/brand/lectra-canvascope-lockup.png"],
  },
};

const faqs: FaqEntry[] = [
  {
    question: "What is Lectra?",
    answer:
      "Lectra Notes is the App Store app from Scope. It imports and organizes documents, receives course PDFs from the Scope Chrome extension, lets you annotate them with Apple Pencil, and can use private on-device intelligence for supported study aids.",
  },
  {
    question: "How do PDFs get from Scope to Lectra?",
    answer:
      "Scope sends documents to Lectra through DropBridge v3. Sends arrive in the background with delivery receipts the moment they are ready, and are picked up on the next check if realtime delivery is unavailable.",
  },
  {
    question: "Do I need Scope to use Lectra?",
    answer:
      "No. Lectra Notes can import and organize documents on its own. Scope adds the connected browser workflow for sending course PDFs to Lectra and bringing finished PDFs back into supported upload flows.",
  },
  {
    question: "Does Lectra keep my notes tied to the original course file?",
    answer:
      "Yes. Delivery state, receipts, and document metadata stay attached to the original course file from the Scope handoff, so your annotations and finished exports stay in context.",
  },
  {
    question: "Can finished Lectra PDFs return to browser uploads?",
    answer:
      "Yes. The Scope browser extension adds an Attach from Lectra picker to supported browser upload flows — starting with Gradescope's upload modal — so annotated PDFs can come back without digging through downloads.",
  },
  {
    question: "Is Lectra available now?",
    answer:
      "Yes. Lectra Notes is available now on the Apple App Store as a free download for iPhone and iPad.",
  },
  {
    question: "Is Lectra Notes free?",
    answer:
      "Yes — completely. There are no tiers, subscriptions, or paywalls, and no analytics. The notebooks, terminal, Git, code editor, and Lectra for Mac are all part of the free app.",
  },
  {
    question: "Can Lectra Notes run Python?",
    answer:
      "Yes. Lectra Notes runs real CPython on the device — Jupyter-compatible .ipynb notebooks with numpy, pandas, and matplotlib, plus python in the built-in terminal. Everything executes offline; there is no cloud kernel.",
  },
  {
    question: "How is Lectra Notes different from other note-taking apps?",
    answer:
      "Apps like Goodnotes and Notability are stronger today at lecture-audio recording and cross-platform sync. Lectra Notes adds what they don't have: a real computing environment — Python notebooks, a terminal with Git, a code editor, and SSH — beside your handwritten notes, and it's free with no subscription.",
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
      "Vector ink on PDFs, notebooks, and scanned pages. Low-latency, pressure-aware, and searchable — your handwriting is indexed like any text.",
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
      "Courses pull in via DropBridge. Everything opens on the train, in lecture, in the library basement.",
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

export default function LectraPage() {
  return (
    <PublicPageFrame
      active="lectra"
      footerVariant="slim"
      headerCta={{
        label: "Get Lectra Notes",
        href: LECTRA_APP_STORE_URL,
        external: true,
      }}
    >
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lectra Notes", path: "/products/lectra" },
          ]),
          lectraSoftwareSchema(),
          faqSchema(faqs),
        ]}
      />

      {/* --- Hero --- */}
      <section className="page-wrap product-hero">
        <div className="product-hero-grid">
          <div className="product-hero-copy" data-reveal>
            <p className="kicker">Lectra Notes — iPad · iPhone · Mac</p>
            <h1>
              The documents you <em>think</em> on.
            </h1>
            <p className="section-copy">
              Ink the reading. Run the notebook. Keep the whole library offline.
              Lectra Notes is where course work actually happens — with the
              course attached.
            </p>
            <div className="pill-actions">
              <a
                href={LECTRA_APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="button-primary"
              >
                Get it on the App Store
              </a>
              <Link href="/mac" className="button-secondary">
                Lectra for Mac →
              </Link>
            </div>
            <p className="hero-note">Free · works without the extension</p>
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
              No cloud kernel, no tab-switching. Code cells execute on-device,
              next to the handwritten derivation they implement. Dark is for
              computing moments — this is one.
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

      {/* --- FAQ --- */}
      <section className="page-wrap faq-section">
        <h2 className="section-heading" data-reveal>
          Questions people actually ask.
        </h2>
        <div className="faq-list" data-reveal>
          {faqs.map((faq) => (
            <div key={faq.question} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <NewsroomTeaserGrid
        articles={relatedArticles}
        kicker="Newsroom"
        title="What shipped recently."
        ctaLabel="All posts →"
      />

      {/* --- CTA --- */}
      <section className="page-wrap final-cta" data-reveal>
        <h2>Bring the course to the page.</h2>
        <div className="pill-actions">
          <a
            href={LECTRA_APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            Get it on the App Store
          </a>
          <Link href="/mac" className="button-secondary">
            Lectra for Mac →
          </Link>
        </div>
        <p className="hero-note">iPad · iPhone · Mac · free</p>
      </section>
    </PublicPageFrame>
  );
}
