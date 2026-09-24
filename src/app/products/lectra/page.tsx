import type { Metadata } from "next";
import Link from "next/link";

import PenMark from "@/components/motion/PenMark";
import Sheet from "@/components/motion/Sheet";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import DeviceFrame from "@/components/site/DeviceFrame";
import FaqList, { type FaqItem } from "@/components/site/FaqList";
import NewsList from "@/components/site/NewsList";
import PageShell from "@/components/site/PageShell";
import RelatedLinks, { type RelatedLink } from "@/components/site/RelatedLinks";
import { comparePath, getComparison } from "@/lib/compare";
import { getGuide, guidePath } from "@/lib/guides";
import { getNewsroomArticlesBySlugs } from "@/lib/newsroom";
import { publicPageMetadata } from "@/lib/seo";
import { LECTRA_APP_STORE_CAMPAIGN_URL, LECTRA_DEFINITION } from "@/lib/site";
import {
  breadcrumbSchema,
  faqSchema,
  lectraSoftwareSchema,
} from "@/lib/structured-data";

import "./lectra.css";
import NotebookSheet from "./_visuals/NotebookSheet";

const PAGE_PATH = "/products/lectra";

// Open Graph and Twitter images come from the sibling opengraph-image.tsx and
// twitter-image.tsx routes, which take precedence over config metadata, so
// none are declared here.
export const metadata: Metadata = {
  ...publicPageMetadata({
    title: "Lectra Notes: Free iPad Note-Taking App for Students",
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

const faqs: FaqItem[] = [
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
      "Yes. The Scope extension adds an Attach from Lectra picker to supported browser upload flows, starting with Gradescope's upload dialog, so annotated PDFs can come back without digging through your downloads.",
  },
  {
    question: "Is Lectra Notes available now?",
    answer:
      "Yes. Lectra Notes is available now on the Apple App Store as a free download for iPhone and iPad.",
  },
  {
    question: "Is Lectra Notes free?",
    answer:
      "Yes, completely. There are no tiers, subscriptions, or paywalls, and there are no ads or third-party tracking. The notebooks, terminal, Git, code editor, and Lectra for Mac are all part of the free app.",
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
      "Yes. Lectra Notes runs Python on the device, in standard .ipynb notebooks with numpy, pandas, and matplotlib and as python in the built-in terminal. Everything runs offline, and nothing is sent to a server to execute.",
  },
  {
    question: "Does Lectra Notes record lectures?",
    answer:
      "Yes. Recording was added in version 8.0 on September 1, 2026. Lectra Notes records the lecture while you write, you can tap a stroke to hear what was said at that moment, and transcription runs on the device. It is new and has not been through a full semester of use yet. Notability and Goodnotes have years of polish on audio, and Notability offers transcription and AI summaries on its paid tiers.",
  },
  {
    question: "How is Lectra Notes different from other note-taking apps?",
    answer:
      "Goodnotes and Notability run on more platforms and have had years longer to mature, and that includes their lecture-audio features, where Notability also offers transcription and AI summaries on paid tiers (checked September 1, 2026). What Lectra Notes adds is something they don't have, a real computing environment beside your handwritten notes, with Python notebooks, a terminal with Git, a code editor, and SSH. It is also free with no subscription. The Lectra Notes vs Goodnotes and Lectra Notes vs Notability comparisons go through it feature by feature.",
    body: (
      <p>
        Goodnotes and Notability run on more platforms and have had years longer
        to mature, and that includes their lecture-audio features, where
        Notability also offers transcription and AI summaries on paid tiers
        (checked September 1, 2026). What Lectra Notes adds is something they
        don&rsquo;t have, a real computing environment beside your handwritten
        notes, with Python notebooks, a terminal with Git, a code editor, and
        SSH. It is also free with no subscription. The{" "}
        <Link href="/compare/lectra-notes-vs-goodnotes" className="link">
          Lectra Notes vs Goodnotes
        </Link>{" "}
        and{" "}
        <Link href="/compare/lectra-notes-vs-notability" className="link">
          Lectra Notes vs Notability
        </Link>{" "}
        comparisons go through it feature by feature.
      </p>
    ),
  },
  {
    question: "Does Lectra Notes work offline?",
    answer:
      "Yes. The library, Pencil markup, notebooks, Python, Git, and the terminal all work with no connection. The network is only needed for handoffs, backup, Git remotes, and SSH.",
  },
];

const pillars = [
  {
    title: "Apple Pencil first",
    copy: "Vector ink on PDFs, notebooks, and scanned pages. It is low-latency and pressure-aware, and your handwriting is searchable, so you can find it again later.",
  },
  {
    title: "A real computing environment",
    copy: "Python notebooks, a terminal, and Git run offline on the iPad, so the problem set and the code live on the same page.",
  },
  {
    title: "An offline, organized library",
    copy: "Send a PDF from Canvas to your iPad in one tap with the Scope extension. Everything opens on the train, in lecture, and in the library basement.",
  },
];

/* What a .lectra file carries. The point of the format is that none of
   these travel separately. */
const formatParts = [
  { part: "The PDF", kind: "Source" },
  { part: "Your ink", kind: "Vector" },
  { part: "The notebook and its outputs", kind: "Runnable" },
  { part: "Attachments and links", kind: "Intact" },
];

const canvasSteps = [
  {
    title: "Open the file in Canvas.",
    copy: "Lecture slides, a reading, or a problem set. Any PDF in the course works.",
  },
  {
    title: "Tap Send to Lectra.",
    copy: "The Scope extension delivers it to your Lectra Notes library, ready to mark up.",
  },
  {
    title: "Annotate with Apple Pencil.",
    copy: "When you're done, the finished PDF can come back into supported upload flows.",
  },
];

const relatedArticles = getNewsroomArticlesBySlugs([
  "lectra-studio",
  "lectra-v7-keyboard-commands-and-a-signature-that-saves",
  "introducing-the-lectra-document-format",
]);

// Link targets come from the compare and guide registries so they never
// drift from the pages they point at. The blurbs are written for this page.
const relatedLinks: RelatedLink[] = [
  {
    href: comparePath(getComparison("lectra-notes-vs-goodnotes")),
    label: getComparison("lectra-notes-vs-goodnotes").title,
    copy: "Handwriting, PDFs, pricing, and the computing environment, and where each app really wins.",
  },
  {
    href: comparePath(getComparison("lectra-notes-vs-notability")),
    label: getComparison("lectra-notes-vs-notability").title,
    copy: "Notability has years of audio polish. Lectra Notes now records too, and it adds notes plus code.",
  },
  {
    href: comparePath(getComparison("free-goodnotes-alternatives")),
    label: getComparison("free-goodnotes-alternatives").title,
    copy: "The iPad note apps that are really free in 2026, and what each one gives up.",
  },
  {
    href: guidePath(getGuide("annotate-lecture-slides-on-ipad")),
    label: "Annotate Canvas lecture slides on iPad",
    copy: "Get a lecture PDF from Canvas onto your iPad and mark it up with Apple Pencil, by the share-sheet route or in one tap.",
  },
];

function StoreActions() {
  return (
    <>
      <StoreLink
        store="app-store"
        href={LECTRA_APP_STORE_CAMPAIGN_URL}
        className="btn btn-primary"
      >
        Get it on the App Store
      </StoreLink>
      <Link href="/mac" className="btn btn-line">
        Lectra for Mac
      </Link>
    </>
  );
}

export default function LectraPage() {
  return (
    <PageShell
      active="lectra"
      cta={{
        label: "Get Lectra Notes",
        href: LECTRA_APP_STORE_CAMPAIGN_URL,
        store: "app-store",
      }}
    >
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lectra Notes", path: PAGE_PATH },
          ]),
          lectraSoftwareSchema(),
          faqSchema(faqs.map(({ question, answer }) => ({ question, answer }))),
        ]}
      />

      {/* The page you think on, in the first sheet. */}
      <Sheet labelledBy="lectra-title">
        <header className="shell page-head lx-hero lx-hero--device">
          <div>
            <p className="context-line">
              Lectra Notes, the free note-taking app for iPad, iPhone, and Mac
            </p>
            <h1 id="lectra-title" className="t-title" data-focus>
              The iPad note-taking app for the documents you think on.
            </h1>
            <div className="lede">
              {LECTRA_DEFINITION} Send a PDF from Canvas to your iPad in one tap
              with the Scope for Canvas extension. There is no subscription and
              there are no tiers.
            </div>
            <div className="actions">
              <StoreActions />
            </div>
            <p className="btn-note">
              Free, with no subscription, and it works without the extension.
            </p>
          </div>
          <DeviceFrame
            className="lx-hero-device"
            src="/brand/lectra-markup-ipad.png"
            alt="Lectra Notes on iPad: an organic chemistry midterm review PDF marked up with a yellow highlight, a circled paragraph, and a red underline, with the ink toolbar at the bottom of the page."
            width={2064}
            height={2752}
            priority
            sizes="(max-width: 999px) 400px, 460px"
          />
        </header>
      </Sheet>

      {/* Ink, compute, library. */}
      <Sheet className="section" labelledBy="pillars-title">
        <div className="shell">
          <h2 id="pillars-title" className="t-head lx-intro" data-focus>
            Ink, code, and the whole course library in one app.
          </h2>
          <div className="idea-grid idea-grid--3">
            {pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* The computing moment, on the desk. */}
      <section
        className="on-desk section lx-desk"
        aria-labelledby="compute-title"
      >
        <div className="shell split">
          <div>
            <p className="lx-tag">Notebooks in Lectra Notes</p>
            <h2 id="compute-title" className="t-head" data-focus>
              The notebook runs where the notes are.
            </h2>
            <p className="copy">
              Code cells run on the iPad, right next to the handwritten
              derivation they implement. There is no server to connect to and no
              switching between tabs.
            </p>
            <div className="link-row">
              <Link href="/products/lectra/notebooks" className="link">
                Jupyter notebooks on iPad
              </Link>
              <Link href="/products/lectra/code" className="link">
                The terminal, Git, and code editor
              </Link>
            </div>
          </div>
          <NotebookSheet
            label="A Lectra Notes notebook called pset4.ipynb, running Python 3.11 on the iPad. A cell computes the eigenvalues of a two by two matrix, the output is circled in red pen, and a pen note beside it checks the answer against the handwritten derivation."
            file="pset4.ipynb"
            kernel="Python 3.11, local"
            cells={[
              {
                n: 3,
                code: (
                  <>
                    <span className="k">import</span> numpy{" "}
                    <span className="k">as</span> np{"\n"}A = np.array([[2, 1],
                    [1, 3]]){"\n"}np.linalg.eigvals(A)
                  </>
                ),
                out: (
                  <pre className="nb-text">array([1.38196601, 3.61803399])</pre>
                ),
                circled: true,
              },
            ]}
            note="matches (5 ± √5) / 2 from the derivation"
          />
        </div>
      </section>

      {/* The .lectra format. */}
      <Sheet className="section" labelledBy="format-title">
        <div className="shell split split--flip">
          <div>
            <p className="lx-tag">The .lectra format</p>
            <h2 id="format-title" className="t-head" data-focus>
              A document you can actually hand to someone.
            </h2>
            <p className="copy lx-body">
              Ink, source, code, and outputs travel as one file. Send it to a
              study partner, submit it, or archive it, and it opens with
              everything still live.
            </p>
            <div className="link-row">
              <Link
                href="/newsroom/introducing-the-lectra-document-format"
                className="link"
              >
                Read the announcement
              </Link>
            </div>
          </div>
          <div className="lx-format-slot">
            <div className="plane lx-format">
              <div className="lx-format-head">
                <span className="lx-format-name">
                  .lectra
                  <PenMark
                    kind="underline"
                    inset="auto -6px -12px -4px"
                    delay={0.2}
                  />
                </span>
                <span>One file</span>
              </div>
              <ul>
                {formatParts.map((row) => (
                  <li key={row.part}>
                    <strong>{row.part}</strong>
                    <span>{row.kind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Sheet>

      {/* From Canvas to the iPad. */}
      <Sheet className="section" id="canvas" labelledBy="canvas-title">
        <div className="shell split split--top">
          <div>
            <p className="lx-tag">With the Scope extension</p>
            <h2 id="canvas-title" className="t-head" data-focus>
              From Canvas to your iPad in one tap.
            </h2>
            <p className="copy lx-body">
              Send a PDF from Canvas to your iPad in one tap with the Scope
              extension, and finished files can come back into supported upload
              flows. Nothing moves automatically. You choose what to send, and
              Lectra Notes does not log in to Canvas on its own.
            </p>
            <ol className="lx-steps">
              {canvasSteps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <span>{step.copy}</span>
                </li>
              ))}
            </ol>
            <div className="link-row">
              <Link href="/products/extension" className="link">
                Scope for Canvas, the free Chrome extension
              </Link>
              <Link
                href="/guides/annotate-lecture-slides-on-ipad"
                className="link"
              >
                How to annotate lecture slides on iPad
              </Link>
            </div>
          </div>
          <DeviceFrame
            className="lx-library"
            src="/brand/lectra-library-ipad.png"
            alt="The Lectra Notes library on iPad, showing recent course documents including an organic chemistry midterm review, a physics rotational dynamics reading, and a statics lab worksheet, with a Scope Inbox in the sidebar."
            width={2064}
            height={1548}
            sizes="(max-width: 899px) 92vw, 640px"
          />
        </div>
      </Sheet>

      {/* Questions. */}
      <Sheet className="section" id="faq" labelledBy="faq-title">
        <div className="shell shell-narrow">
          <h2 id="faq-title" className="t-head lx-faq-head" data-focus>
            Questions people actually ask.
          </h2>
          <FaqList items={faqs} />
        </div>
      </Sheet>

      {/* What shipped, and where to read next. */}
      <Sheet className="section-tight" labelledBy="news-title">
        <div className="shell lx-news">
          <div className="lx-section-head">
            <h2 id="news-title" className="t-head" data-focus>
              What shipped recently.
            </h2>
            <Link href="/newsroom" className="link">
              All posts
            </Link>
          </div>
          <NewsList articles={relatedArticles} showDescription={false} />
        </div>
        <RelatedLinks
          title="Lectra Notes next to the apps you already know."
          links={relatedLinks}
        />
      </Sheet>

      {/* Close, on the desk. */}
      <section
        className="on-desk shell section lx-closing"
        aria-labelledby="closing-title"
      >
        <h2 id="closing-title" className="t-title" data-focus>
          Bring the course to the page.
        </h2>
        <p className="lede">
          Lectra Notes is on iPad, iPhone, and Mac, and it is free.
        </p>
        <div className="actions">
          <StoreActions />
        </div>
      </section>
    </PageShell>
  );
}
