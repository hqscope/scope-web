import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  FileText,
  PenLine,
  Radio,
  RefreshCw,
} from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import NewsroomTeaserGrid from "@/components/public/NewsroomTeaserGrid";
import LectraWorkspacePreview from "@/components/public/LectraWorkspacePreview";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  lectraSoftwareSchema,
  videoObjectSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { getNewsroomArticlesBySlugs } from "@/lib/newsroom";
import { LECTRA_APP_STORE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lectra Notes — Pencil Notes, PDFs & Python on iPad",
  description:
    "Lectra Notes is the free iPad workspace for students: Apple Pencil PDF markup, real Jupyter notebooks with on-device Python, a terminal with Git, on-device AI study tools, and a two-way handoff with Scope.",
  alternates: {
    canonical: "/product/lectra",
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
    url: "/product/lectra",
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


const workflow = [
  {
    icon: FileText,
    title: "Your readings, on your iPad",
    copy:
      "Import PDFs directly or send course readings from Scope to Lectra through DropBridge v3.",
  },
  {
    icon: PenLine,
    title: "Write right on the page",
    copy:
      "Highlight, underline, and take notes by hand with your Apple Pencil. Just the reading, nothing in the way.",
  },
  {
    icon: RefreshCw,
    title: "Send finished files back",
    copy:
      "Finished PDFs can return through Scope's browser picker in supported upload flows.",
  },
  {
    icon: Radio,
    title: "Built for realtime receive",
    copy:
      "Sends arrive in the background the moment they are ready, and are picked up on the next check if the realtime path is unavailable.",
  },
];

const boundaries = [
  "Open course PDFs on your iPad without emailing them to yourself.",
  "Annotate by hand with your Apple Pencil: highlights, underlines, and notes.",
  "Keep document status and course metadata attached to the original Scope handoff.",
  "Use private on-device document intelligence for summaries, tags, flashcards, quizzes, and grounded Q&A where supported.",
  "Bring finished PDFs back into Scope's supported browser upload flows.",
  "Built for focused reading and assignment work, not another generic file bucket.",
];

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

const lectraNewsroomArticles = getNewsroomArticlesBySlugs([
  "lectra-notes-is-now-on-the-app-store",
  "python-notebooks-are-first-class-lectra-documents",
  "lectra-runs-a-real-terminal-git-and-python-on-ipad",
  "lectra-remote-desktop-reach-your-mac-from-your-ipad",
  "introducing-the-lectra-document-format",
  "lectra-pdfs-can-now-come-back-into-browser-workflows",
]);

export default function LectraProductPage() {
  return (
    <PublicPageFrame
      active="lectra"
      footerVariant="slim"
      headerCta={{ label: "Get Lectra", href: LECTRA_APP_STORE_URL, external: true }}
    >
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lectra", path: "/product/lectra" },
          ]),
          lectraSoftwareSchema(),
          faqSchema(faqs),
          videoObjectSchema(
            "Lectra Notes iPad Workspace Demonstration",
            "A demonstration of using Lectra Notes on iPad with Apple Pencil to annotate course readings and hand finished PDFs back to Scope.",
            "/brand/lectra-canvascope-lockup.png",
            "2026-06-19T08:00:00Z",
            "/brand/lectra-horizontal.mp4",
          ),
          videoObjectSchema(
            "Lectra Notes iPhone Interface Walkthrough",
            "Explore the Lectra Notes interface on iPhone, including document search, summaries, and Scope sync.",
            "/brand/lectra-canvascope-lockup.png",
            "2026-06-19T08:00:00Z",
            "/brand/lectra-vertical.mp4",
          ),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Lectra · Now on the App Store</p>
          <h1>The workspace for documents you think on.</h1>
          <p className="centered-hero-lede">
            Lectra Notes is Apple-Pencil-first PDF markup, real Python
            notebooks, and an offline-first library for iPad and iPhone —
            connected to Scope with one click.
          </p>
          <div className="pill-actions">
            <a
              href={LECTRA_APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="button-primary"
            >
              Download on the App Store
            </a>
            <Link href="/mac" className="button-secondary">
              Lectra for Mac →
            </Link>
          </div>
          <p className="hero-note">iPadOS 18+ · Free</p>
        </div>

        <div
          className="device-bezel"
          data-reveal
          style={{ "--reveal-delay": "120ms", marginTop: "clamp(3rem, 6vw, 4.5rem)" } as CSSProperties}
          aria-label="Lectra Notes App Store launch preview"
        >
          <video
            src="/brand/lectra-horizontal.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Lectra Notes document workspace on iPad"
          />
        </div>
      </section>

      <section className="page-wrap section-pad" id="handoff">
        <h2 className="sr-only">Lectra workflow features</h2>
        <div className="plain-grid" data-reveal>
          {workflow.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title}>
                <Icon
                  className="h-5 w-5 text-[var(--color-brand)]"
                  aria-hidden="true"
                />
                <h3 className="mt-3">{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="page-wrap section-pad-sm">
        <div className="step-band" data-reveal>
          <p className="kicker">The loop</p>
          <h2>Browser to iPad and back, without exporting anything.</h2>
          <div className="step-grid">
            <div>
              <span>01</span>
              <h3>Send from Chrome</h3>
              <p>
                Tap Send to Lectra on any course PDF and it lands on your iPad
                in seconds.
              </p>
            </div>
            <div>
              <span>02</span>
              <h3>Annotate with Pencil</h3>
              <p>
                Highlight, write, and sketch. Your notes stay tied to the
                original course file.
              </p>
            </div>
            <div>
              <span>03</span>
              <h3>It comes back</h3>
              <p>
                Attach from Lectra returns the finished file to supported browser
                upload flows, ready to submit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band" id="experience">
        <div className="page-wrap split-section" style={{ paddingBlock: 0 }}>
          <div data-reveal>
            <p className="kicker kicker-muted">What it&apos;s for</p>
            <h2>Just your readings and your Apple Pencil.</h2>
          </div>
          <div className="check-list" data-reveal>
            {boundaries.map((item) => (
              <div key={item}>
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap section-pad" id="work">
        <div className="section-heading" data-reveal>
          <p className="kicker">When reading turns into work</p>
          <h2>The only notes app with a real computing environment.</h2>
          <p className="section-copy mt-4">
            Lectra Notes is the only student workspace we found that combines
            Apple Pencil notes and course documents with a local Python
            runtime, .ipynb notebooks, Git, a shell, and a code editor — all
            offline, all free.
          </p>
        </div>
        <div
          data-reveal
          style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}
        >
          <LectraWorkspacePreview />
        </div>
        <div
          className="pill-actions"
          data-reveal
          style={{ marginTop: "clamp(2rem, 4vw, 3rem)", justifyContent: "center" }}
        >
          <Link href="/product/lectra/notebooks" className="button-secondary">
            Jupyter notebooks on iPad →
          </Link>
          <Link href="/product/lectra/code" className="button-secondary">
            Terminal, Git &amp; editor →
          </Link>
          <Link href="/mac" className="button-secondary">
            Your Mac, from your iPad →
          </Link>
        </div>
      </section>

      <section className="page-wrap split-section" id="mac">
        <div data-reveal>
          <p className="kicker kicker-muted">Lectra for Mac</p>
          <h2>The same app, waiting on your Mac.</h2>
          <p
            style={{
              margin: "1.125rem 0 1.625rem",
              color: "var(--color-ink-soft)",
              fontSize: "1rem",
              lineHeight: 1.65,
            }}
          >
            Lectra runs on macOS too — readings, markup, notebooks, and a
            terminal. It also catches documents you send from your iPad, and
            puts the Mac itself on your iPad: the screen, the keyboard, the
            trackpad, and wake, a tap away. Free, like everything else.
          </p>
          <Link href="/mac" className="button-dark">
            Download for Mac
          </Link>
        </div>
        <div className="media-note" data-reveal>
          <p>Free · Notarized · macOS</p>
          <p>
            Install it on the Mac you want to reach, sign in with your Lectra
            account, and open the Remote Desktop tab.
          </p>
        </div>
      </section>

      <div id="updates">
        <NewsroomTeaserGrid
          articles={lectraNewsroomArticles}
          kicker="Lectra updates"
          title="Lectra is live."
          copy="The launch note, Python notebooks, the on-iPad terminal and Git, the remote desktop, the .lectra format, and the two-way Scope handoff — from the engineering notebook."
        />
      </div>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>What students ask about Lectra.</h2>
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
          <h2>Bring your readings to your iPad.</h2>
          <p>
            Scope finds your coursework in seconds. Lectra gives your
            readings a calm place to live — then hands the finished file back.
          </p>
        </div>
        <div className="pill-actions">
          <a
            href={LECTRA_APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            Download on the App Store
          </a>
          <Link href="/product/scope" className="button-secondary">
            Start with Scope
          </Link>
        </div>
      </section>
    </PublicPageFrame>
  );
}
