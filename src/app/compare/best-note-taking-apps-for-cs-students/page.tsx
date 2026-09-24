import Link from "next/link";

import ComparisonTable from "@/components/site/ComparisonTable";
import FaqList from "@/components/site/FaqList";
import MethodologyNote from "@/components/site/MethodologyNote";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import { comparePath, getComparison, productEntityId } from "@/lib/compare";
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

import CompareArticle, {
  lectraCta,
  lectraRelatedLinks,
  Pen,
  PickList,
} from "../CompareArticle";

const comparison = getComparison("best-note-taking-apps-for-cs-students");

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
    copy: `${LECTRA_DEFINITION} A CS problem set is a PDF, a notebook, and a repository at once, and Lectra Notes keeps them together: Apple Pencil markup beside Jupyter-format .ipynb notebooks, a terminal with Git, a code editor, and SSH, all free with no server required and no tiers. Version 8.0 (September 1, 2026) added lecture recording, so you can tap a stroke to hear what was said at that moment.`,
    bestFor:
      "CS and data-science students who annotate readings and write code for the same course.",
    watchOut:
      "Lecture recording is new (version 8.0, September 1, 2026) and untested over a full term. There is no cross-device annotation sync yet, and it shipped in 2026, which makes it the newest app on this list.",
  },
  {
    name: "Goodnotes",
    url: "https://www.goodnotes.com",
    role: "Best handwriting engine",
    copy:
      "The most refined ink on the iPad, with searchable handwriting, convert-to-text, spellcheck for ink, audio recording synced to notes, and real-time collaboration across Apple, Windows, Android, and the web.",
    bestFor:
      "Handwriting-heavy note takers who want maximum polish and platform reach.",
    watchOut:
      "The free tier caps at 3 files. Full use runs $11.99 to $35.99/yr, advanced AI is metered on top, and there's no code capability at all.",
  },
  {
    name: "Notability",
    url: "https://notability.com",
    role: "Best for lecture-heavy schedules",
    copy:
      "Audio recording synced to your handwriting, with transcription and AI summaries on paid plans. It is the strongest record-and-review workflow on this list, and it is now on Android too.",
    bestFor:
      "Students who replay lectures and study from recordings and AI summaries.",
    watchOut:
      "The free plan caps at 5 notes. Unlimited AI costs $99.99/yr, its AI is cloud-processed, and there's no code capability.",
  },
  {
    name: "Microsoft OneNote",
    url: "https://www.microsoft.com/microsoft-365/onenote",
    role: "Best free cross-platform option",
    copy:
      "Feature-complete note-taking free of charge, synced across iPad, Windows, Android, Mac, and the web. It is the safe pick if your laptop isn't a Mac.",
    bestFor:
      "Students living across Windows and iPad who want everything synced for free.",
    watchOut:
      "PDFs import as flat printouts, which is weak for annotating lecture slides, and Copilot AI requires Microsoft 365.",
  },
  {
    name: "Juno",
    url: "https://juno.sh",
    role: "Best dedicated Jupyter IDE",
    copy:
      "A polished native Jupyter IDE with embedded Python 3.13 and compiled packages Lectra Notes doesn't bundle (SciPy, scikit-learn, OpenCV) for a $39.99 one-time unlock.",
    bestFor:
      "Data-science workloads that need the heavier scientific stack on iPad.",
    watchOut:
      "It's a code IDE with no PDF annotation or handwriting, so you'll pair it with a separate notes app.",
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
      "If your notes and your code belong to the same courses, Lectra Notes pairs notes with a computing environment (Python notebooks that run on the device, a terminal with Git, a code editor, and SSH), and it is free. If you mostly handwrite, Goodnotes has the best ink engine. If you record lectures, Notability's audio workflow is the most proven (Lectra Notes added recording in version 8.0 on September 1, 2026). If you need free cross-platform sync with a Windows laptop, OneNote is the safe pick.",
  },
  {
    question: "Can any note-taking app run code on the iPad?",
    answer:
      "Of the apps we looked at, Lectra Notes is the one that combines Apple Pencil notes and course documents with Python on the device, .ipynb notebooks, Git, a shell, and a code editor. Dedicated code apps like Juno and Carnets run Jupyter notebooks well but have no note-taking or PDF annotation features.",
  },
  {
    question: "Do CS students need a paid note app?",
    answer:
      "Not anymore. Lectra Notes and OneNote are free, and Apple Notes is free and includes audio transcripts. Goodnotes and Notability are excellent, but their free tiers cap at 3 files and 5 notes respectively, as of August 2026.",
  },
  {
    question: "What about Carnets or a-Shell?",
    answer:
      "Both are excellent free, open-source tools. Carnets is the most faithful Jupyter experience on iPad, and a-Shell is a full offline Unix toolbox. Neither takes notes or annotates PDFs, so they pair with a notes app and do not replace one. They're covered in our iPad Python notebook apps comparison.",
  },
];

export default function CsStudentsPage() {
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
          appListSchema(comparison.title, comparePath(comparison), appList),
          faqSchema(faqs),
        ]}
      />

      <CompareArticle
        cta={lectraCta}
        context="Updated September 2026. Lectra Notes is ours."
        title="Best note-taking apps for CS students (2026)"
        lede={
          <>
            CS coursework is more than handwriting. It is lecture PDFs,
            problem-set notebooks, and repositories, usually{" "}
            <Pen>for the same class</Pen>. Here are the apps that actually fit,
            including the ones that aren&apos;t ours.
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
            <a href="#picks" className="btn btn-line">
              See the picks
            </a>
          </>
        }
        sections={[
          {
            id: "glance",
            title: "At a glance.",
            outline: "At a glance",
            content: (
              <div className="compare-table-wide">
              <ComparisonTable
                caption="Note-taking apps for CS students at a glance, August 2026"
                columns={picks.map((pick) => pick.name)}
                ours={0}
                rows={[
                  { label: "Where it is strongest", cells: picks.map((pick) => pick.role) },
                  { label: "Best for", cells: picks.map((pick) => pick.bestFor) },
                ]}
              />
              </div>
            ),
          },
          {
            id: "picks",
            title: "The picks.",
            outline: "The picks",
            content: (
              <PickList
                picks={picks.map((pick) => ({
                  name: pick.name,
                  role: pick.role,
                  copy: pick.copy,
                  facts: [
                    { label: "Best for", value: pick.bestFor },
                    { label: "Watch out", value: pick.watchOut },
                  ],
                }))}
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
                  "This list is published by the maker of Lectra Notes. We put our app first for a specific student, said exactly why, and named where each competitor beats us.",
                ]}
              />
            ),
          },
          {
            id: "faq",
            title: "Note apps for CS, answered.",
            outline: "Questions",
            content: (
              <FaqList
                items={faqs.map((faq) =>
                  faq.question === "What about Carnets or a-Shell?"
                    ? {
                        ...faq,
                        body: (
                          <p>
                            Both are excellent free, open-source tools. Carnets is
                            the most faithful Jupyter experience on iPad, and
                            a-Shell is a full offline Unix toolbox. Neither takes
                            notes or annotates PDFs, so they pair with a notes app
                            and do not replace one. They&apos;re covered in our{" "}
                            <Link className="link" href="/compare/ipad-python-notebook-apps">
                              iPad Python notebook apps comparison
                            </Link>
                            .
                          </p>
                        ),
                      }
                    : faq,
                )}
              />
            ),
          },
        ]}
        related={{
          title: "More comparisons.",
          links: lectraRelatedLinks(comparison.slug),
        }}
        closing={{
          title: "Notes and code, one app.",
          body: (
            <p>
              Lectra Notes is free, works offline, and is built for the courses
              where the reading and the repository are the same assignment.
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
