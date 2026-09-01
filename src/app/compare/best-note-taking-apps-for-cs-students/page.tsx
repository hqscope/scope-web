import PublicPageFrame from "@/components/public/PublicPageFrame";
import MethodologyNote from "@/components/public/MethodologyNote";
import RelatedLinks from "@/components/public/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import {
  comparePath,
  comparisonsFor,
  getComparison,
  productEntityId,
} from "@/lib/compare";
import { getGuide, guidePath } from "@/lib/guides";
import { publicPageMetadata } from "@/lib/seo";
import { LECTRA_APP_STORE_CAMPAIGN_URL, LECTRA_DEFINITION } from "@/lib/site";
import {
  appListSchema,
  breadcrumbSchema,
  comparisonArticleSchema,
  faqSchema,
  type AppListItem,
  type FaqEntry,
} from "@/lib/structured-data";

const comparison = getComparison("best-note-taking-apps-for-cs-students");
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

type AppPick = {
  name: string;
  /** Official site of a third-party app; our own app is referenced by entity id instead. */
  url?: string;
  role: string;
  copy: string;
  bestFor: string;
  watchOut: string;
};

const picks: AppPick[] = [
  {
    name: "Lectra Notes",
    role: "For notes and code in the same course",
    copy: `${LECTRA_DEFINITION} A CS problem set is a PDF, a notebook, and a repository at once, and Lectra Notes keeps them together: Apple Pencil markup beside Jupyter-format .ipynb notebooks, a terminal with Git, a code editor, and SSH — free, no server required, no tiers. Version 8.0 (September 1, 2026) added lecture recording: tap a stroke to hear what was said at that moment.`,
    bestFor:
      "CS and data-science students who annotate readings and write code for the same course.",
    watchOut:
      "Lecture recording is new (version 8.0, September 1, 2026) and untested over a full term; no cross-device annotation sync yet; and it shipped in 2026 — the newest app on this list.",
  },
  {
    name: "Goodnotes",
    url: "https://www.goodnotes.com",
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
    url: "https://notability.com",
    role: "Best for lecture-heavy schedules",
    copy:
      "Audio recording synced to your handwriting, with transcription and AI summaries on paid plans — the strongest record-and-review workflow on this list, now on Android too.",
    bestFor:
      "Students who replay lectures and study from recordings and AI summaries.",
    watchOut:
      "The free plan caps at 5 notes; unlimited AI costs $99.99/yr, its AI is cloud-processed, and there's no code capability.",
  },
  {
    name: "Microsoft OneNote",
    url: "https://www.microsoft.com/microsoft-365/onenote",
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
    url: "https://juno.sh",
    role: "Best dedicated Jupyter IDE",
    copy:
      "A polished native Jupyter IDE with embedded Python 3.13 and compiled packages Lectra Notes doesn't bundle — SciPy, scikit-learn, OpenCV — for a $39.99 one-time unlock.",
    bestFor:
      "Data-science workloads that need the heavier scientific stack on iPad.",
    watchOut:
      "It's a code IDE, not a note app: no PDF annotation or handwriting, so you'll pair it with a separate notes app.",
  },
];

/* Third-party apps carry their official site; Lectra Notes points at its own entity node. */
const appList: AppListItem[] = picks.map((pick) =>
  pick.url
    ? { name: pick.name, url: pick.url }
    : { name: pick.name, id: productEntityId.lectra },
);

const faqs: FaqEntry[] = [
  {
    question: "What is the best note-taking app for CS students?",
    answer:
      "If your notes and your code belong to the same courses, Lectra Notes pairs notes with a computing environment — Python notebooks that run on the device, a terminal with Git, a code editor, and SSH — and it is free. If you mostly handwrite, Goodnotes has the best ink engine; if you record lectures, Notability's audio workflow is the most proven (Lectra Notes added recording in version 8.0 on September 1, 2026); if you need free cross-platform sync with a Windows laptop, OneNote is the safe pick.",
  },
  {
    question: "Can any note-taking app run code on the iPad?",
    answer:
      "Of the apps we looked at, Lectra Notes is the one that combines Apple Pencil notes and course documents with Python on the device, .ipynb notebooks, Git, a shell, and a code editor. Dedicated code apps like Juno and Carnets run Jupyter notebooks well but have no note-taking or PDF annotation features.",
  },
  {
    question: "Do CS students need a paid note app?",
    answer:
      "Not anymore. Lectra Notes and OneNote are free; Apple Notes is free and includes audio transcripts. Goodnotes and Notability are excellent but their free tiers cap at 3 files and 5 notes respectively, as of August 2026.",
  },
  {
    question: "What about Carnets or a-Shell?",
    answer:
      "Both are excellent free, open-source tools — Carnets is the most faithful Jupyter experience on iPad and a-Shell is a full offline Unix toolbox. Neither takes notes or annotates PDFs, so they pair with a notes app rather than replacing one. They're covered in our iPad Python notebook apps comparison.",
  },
];

export default function CsStudentsPage() {
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
          appListSchema(comparison.title, comparePath(comparison), appList),
          faqSchema(faqs),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Compare · Updated September 2026</p>
          <h1>Best note-taking apps for CS students (2026)</h1>
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

      <RelatedLinks title="More comparisons" links={relatedLinks} />

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>Notes and code, one app.</h2>
          <p>
            <StoreLink store="app-store" href={LECTRA_APP_STORE_CAMPAIGN_URL}>
              Lectra Notes on the App Store
            </StoreLink>{" "}
            — free, offline, and built for the courses where the reading and
            the repository are the same assignment.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
