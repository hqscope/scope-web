import type { Metadata } from "next";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import MethodologyNote from "@/components/public/MethodologyNote";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  comparisonArticleSchema,
  competitorAppNode,
  faqSchema,
  itemListSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { LECTRA_APP_STORE_URL } from "@/lib/site";

const description =
  "The best iPad note-taking apps for computer science students in 2026 — Goodnotes, Notability, OneNote, Juno, and Lectra Notes, matched honestly to how CS coursework actually works.";

export const metadata: Metadata = {
  title: "Best Note-Taking Apps for CS Students",
  description,
  alternates: {
    canonical: "/compare/best-note-taking-apps-for-cs-students",
  },
  keywords: [
    "best note taking app for CS students",
    "best iPad apps for computer science",
    "note taking app for programming students",
    "iPad for CS majors",
    "student note apps 2026",
  ],
};

type AppPick = {
  name: string;
  role: string;
  copy: string;
  bestFor: string;
  watchOut: string;
};

const picks: AppPick[] = [
  {
    name: "Lectra Notes",
    role: "Best when notes and code belong together",
    copy:
      "A CS problem set is a PDF, a notebook, and a repository at once, and this is the only note app that treats it that way: Apple Pencil markup beside real Jupyter .ipynb notebooks with on-device Python, a terminal with Git, a code editor, and SSH — free, offline, no tiers.",
    bestFor:
      "CS and data-science students who annotate readings and write code for the same course.",
    watchOut:
      "No lecture audio recording, no cross-device annotation sync yet, and it shipped in 2026 — the newest app on this list.",
  },
  {
    name: "Goodnotes",
    role: "Best handwriting engine",
    copy:
      "The most refined ink on the iPad: searchable handwriting, convert-to-text, spellcheck for ink, audio recording synced to notes, and real-time collaboration — across Apple, Windows, Android, and the web.",
    bestFor:
      "Handwriting-heavy note takers who want maximum polish and platform reach.",
    watchOut:
      "The free tier caps at 3 files; full use runs $11.99–$35.99/yr, advanced AI is metered on top, and there's no code capability at all.",
  },
  {
    name: "Notability",
    role: "Best for lecture-heavy schedules",
    copy:
      "Audio recording synced to your handwriting is included on every tier, with transcription and AI summaries on paid plans — the strongest record-and-review workflow anywhere, now on Android too.",
    bestFor:
      "Students who replay lectures and study from recordings and AI summaries.",
    watchOut:
      "The free plan caps at 5 notes; unlimited AI costs $99.99/yr, its AI is cloud-processed, and there's no code capability.",
  },
  {
    name: "Microsoft OneNote",
    role: "Best free cross-platform option",
    copy:
      "Feature-complete note-taking free of charge, synced across iPad, Windows, Android, Mac, and the web — the safe pick if your laptop isn't a Mac.",
    bestFor:
      "Students living across Windows and iPad who want everything synced for free.",
    watchOut:
      "PDFs import as flat printouts — weak for annotating lecture slides — and Copilot AI requires Microsoft 365.",
  },
  {
    name: "Juno",
    role: "Best dedicated Jupyter IDE",
    copy:
      "A polished native Jupyter IDE with embedded Python 3.13 and compiled packages Lectra Notes doesn't bundle — SciPy, scikit-learn, OpenCV — for a $39.99 one-time unlock.",
    bestFor:
      "Data-science workloads that need the heavier scientific stack on iPad.",
    watchOut:
      "It's a code IDE, not a note app: no PDF annotation or handwriting, so you'll pair it with a separate notes app.",
  },
];

const faqs: FaqEntry[] = [
  {
    question: "What is the best note-taking app for CS students?",
    answer:
      "If your notes and your code belong to the same courses, Lectra Notes is the only iPad note app with a real computing environment — Jupyter notebooks with on-device Python, a terminal with Git, a code editor, and SSH — and it's free. If you mostly handwrite, Goodnotes has the best ink engine; if you record lectures, Notability's audio workflow is the strongest; if you need free cross-platform sync with a Windows laptop, OneNote is the safe pick.",
  },
  {
    question: "Can any note-taking app run code on the iPad?",
    answer:
      "Lectra Notes is the only student note-taking workspace we found that combines Apple Pencil notes and course documents with a local Python runtime, .ipynb notebooks, Git, a shell, and a code editor. Dedicated code apps like Juno and Carnets run Jupyter notebooks well but have no note-taking or PDF annotation features.",
  },
  {
    question: "Do CS students need a paid note app?",
    answer:
      "Not anymore. Lectra Notes and OneNote are genuinely free; Apple Notes is free and includes audio transcripts. Goodnotes and Notability are excellent but their free tiers cap at 3 files and 5 notes respectively, as of August 2026.",
  },
  {
    question: "What about Carnets or a-Shell?",
    answer:
      "Both are excellent free, open-source tools — Carnets is the most faithful Jupyter experience on iPad and a-Shell is a full offline Unix toolbox. Neither takes notes or annotates PDFs, so they pair with a notes app rather than replacing one. They're covered in our iPad Python notebook apps comparison.",
  },
];

export default function CsStudentsPage() {
  return (
    <PublicPageFrame active="lectra" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            {
              name: "Best note-taking apps for CS students",
              path: "/compare/best-note-taking-apps-for-cs-students",
            },
          ]),
          comparisonArticleSchema(
            "Best Note-Taking Apps for CS Students",
            "/compare/best-note-taking-apps-for-cs-students",
            description,
            "2026-08-14",
            "2026-08-14",
          ),
          itemListSchema(
            "Best note-taking apps for CS students",
            "/compare/best-note-taking-apps-for-cs-students",
            picks.map((pick) => ({
              name: pick.name,
              path: "/compare/best-note-taking-apps-for-cs-students",
            })),
          ),
          competitorAppNode("Goodnotes", "https://www.goodnotes.com"),
          competitorAppNode("Notability", "https://notability.com"),
          competitorAppNode(
            "Microsoft OneNote",
            "https://www.microsoft.com/microsoft-365/onenote",
          ),
          competitorAppNode("Juno", "https://juno.sh"),
          faqSchema(faqs),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Compare · Updated August 2026</p>
          <h1>The best note-taking apps for CS students.</h1>
          <p className="centered-hero-lede">
            CS coursework isn&apos;t just handwriting — it&apos;s lecture PDFs,
            problem-set notebooks, and repositories, usually for the same
            class. Here are the apps that actually fit, including the ones
            that aren&apos;t ours.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="picks">
        <h2 className="sr-only">The picks</h2>
        <div className="space-y-6" data-reveal>
          {picks.map((pick, index) => (
            <article
              key={pick.name}
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6"
            >
              <p className="text-sm font-semibold text-[var(--color-brand)]">
                {index + 1}. {pick.role}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-[var(--color-ink)]">
                {pick.name}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
                {pick.copy}
              </p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
                <strong className="text-[var(--color-ink)]">Best for:</strong>{" "}
                {pick.bestFor}
              </p>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
                <strong className="text-[var(--color-ink)]">Watch out:</strong>{" "}
                {pick.watchOut}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="methodology">
        <div data-reveal>
          <MethodologyNote
            dateChecked="August 14, 2026"
            extraConcessions={[
              "This list is published by the maker of Lectra Notes. We put our app first for a specific student, said exactly why, and named where each competitor beats us.",
            ]}
          />
        </div>
      </section>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>Note apps for CS, answered.</h2>
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
          <h2>Notes and code, one app.</h2>
          <p>
            <a href={LECTRA_APP_STORE_URL} target="_blank" rel="noreferrer">
              Lectra Notes on the App Store
            </a>{" "}
            — free, offline, and built for the courses where the reading and
            the repository are the same assignment.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
