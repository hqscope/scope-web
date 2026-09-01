import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import ComparisonTable from "@/components/public/ComparisonTable";
import MethodologyNote from "@/components/public/MethodologyNote";
import RelatedLinks from "@/components/public/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import { comparePath, getComparison, productEntityId } from "@/lib/compare";
import { publicPageMetadata } from "@/lib/seo";
import { CHROME_WEB_STORE_URL, SCOPE_DEFINITION } from "@/lib/site";
import { SCOPE_EXTENSION_VERSION } from "@/lib/siteRelease";
import {
  breadcrumbSchema,
  comparisonArticleSchema,
  competitorAppNode,
} from "@/lib/structured-data";
import { LIVE_USERS } from "@/lib/usage";

const comparison = getComparison("scope-vs-bettercampus");
const path = comparePath(comparison);

/*
 * BetterCampus facts were read on September 1, 2026 from:
 *   - its Chrome Web Store listing ("BetterCampus (prev. BetterCanvas)"):
 *     2,000,000 users, 4.7 stars from 4.3K ratings, version 9.8.6, updated
 *     August 27, 2026, "offers in-app purchases", developer site
 *     bettercampus.com, privacy section declares user-activity collection;
 *   - its help center (help.bettercampus.com): Free plan; Pro $19/month or
 *     $119/year with a 7-day trial; the Free-vs-Pro split; "BetterCampus on
 *     Brightspace / Blackboard / Moodle / Google Classroom" pages; themes and
 *     the basic to-do list work with no account; "Our story": started 2020 as
 *     a dark mode for Canvas, "called Better Canvas for its first four years";
 *   - its Firefox listing: version 5.12.0, last updated October 21, 2024.
 * bettercampus.com itself returned 403 to our fetches, and the rename has no
 * published date we could find. better-lms.com is a separate directory site
 * ("© 2026 Better LMS"), not the product's home. Scope's own listing the same
 * day: 94 users, 5.0 stars from 6 ratings, version 11.0.5, updated August 30,
 * 2026. Re-check all of these when the date in the copy moves.
 */
const BETTERCAMPUS_URL = "https://bettercampus.com";

export const metadata = publicPageMetadata({
  title: comparison.title,
  absoluteTitle: comparison.absoluteTitle,
  description: comparison.description,
  path,
  type: "article",
  keywords: comparison.keywords,
  publishedTime: comparison.datePublished,
  modifiedTime: comparison.dateModified,
});

type Faq = { question: string; answer: string };

const faqs: Faq[] = [
  {
    question: "Is BetterCampus the same as Better Canvas?",
    answer:
      "Yes. It is the same extension under a new name, and its Chrome Web Store listing is still titled “BetterCampus (prev. BetterCanvas)” as of September 1, 2026. Its own story page says it started in 2020 as one student’s dark mode for Canvas, carried the Better Canvas name for its first four years, and was renamed once it also worked with Google Classroom, Brightspace, Blackboard, and Moodle. We could not find a published date for the rename.",
  },
  {
    question: "Is BetterCampus free?",
    answer:
      "There is a free plan and a Pro plan. As of September 1, 2026, its help center lists Pro at $19 a month or $119 a year with a 7-day trial. Dark mode, community themes, the to-do list, the Planner, and basic grade tracking are free; calendar sync, time-slot planning, per-assignment what-if grades, unlimited theme creation, and unlimited file chats are Pro. Scope for Canvas is free with no paid tier and no account.",
  },
  {
    question: "Can I use Scope and BetterCampus at the same time?",
    answer:
      "They do different jobs, and we know of no conflict between them: BetterCampus restyles Canvas pages and adds its own panels to the dashboard, while Scope opens from a keyboard shortcut into its own panel and does not change how Canvas looks. We have not tested every BetterCampus theme and every Canvas layout with both installed, so if you see the two overlap, tell us and we will look into it.",
  },
  {
    question: "What is a good Better Canvas alternative?",
    answer:
      "It depends on what you were using it for. For restyling Canvas — dark mode, themes, custom course cards — we do not know of a better-known option, and its free plan covers all of that. If what you actually want is to find things across your courses and ask questions with the source linked, that is a different job, and it is the one Scope for Canvas does. Many students will end up with both.",
  },
  {
    question: "Does Scope take quizzes or do assignments?",
    answer:
      "No. Scope answers questions from the materials your instructors posted and links every answer to its source. It does not take quizzes, write submissions, or interact with Canvas quiz logs.",
  },
];

export default function ScopeVsBetterCampusPage() {
  return (
    <PublicPageFrame active="compare" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            { name: comparison.title, path },
          ]),
          comparisonArticleSchema(
            comparison.title,
            path,
            comparison.description,
            comparison.datePublished,
            comparison.dateModified,
            productEntityId[comparison.product],
          ),
          competitorAppNode("BetterCampus", BETTERCAMPUS_URL),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Compare · Checked September 1, 2026</p>
          <h1>Scope for Canvas vs BetterCampus (formerly Better Canvas)</h1>
          <p className="centered-hero-lede">
            These two do different jobs and, as far as we know, do not
            conflict: BetterCampus changes how Canvas looks and adds a to-do
            list and GPA tools; Scope for Canvas indexes every course on your
            device so you can search it and ask cited questions. If you want
            one, pick by the job; most students can run both.
            {/* verify: running both together — no conflict found in our own use, but not tested across BetterCampus themes and every Canvas layout */}
          </p>
          <p className="hero-note">
            {SCOPE_DEFINITION} BetterCampus is a customization and planning
            extension for Canvas and other school platforms: dark mode, themes,
            a to-do list, a planner, and grade tools, with a free plan and a
            Pro plan.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="table">
        <div data-reveal>
          <ComparisonTable
            caption="Feature comparison of Scope for Canvas and BetterCampus, checked September 1, 2026"
            columns={["Scope for Canvas", "BetterCampus"]}
            rows={[
              {
                label: "What it is",
                cells: [
                  "Search across every course, cited answers from your own materials, a planner, and a grade calculator — opened with a keyboard shortcut from any Canvas or Brightspace page. It does not change how Canvas looks.",
                  "A restyling and planning layer for Canvas: dark mode, a library of community themes, custom course cards, a to-do panel on the dashboard, a Planner, grade tools, and study tools, with a study pet on the side.",
                ],
              },
              {
                label: "Price",
                cells: [
                  "Free. No account required, no paid tier.",
                  "Free plan, plus Pro at $19 a month or $119 a year with a 7-day trial, per its help center on September 1, 2026. Themes, dark mode, the to-do list, the Planner, and basic grade tracking are free; calendar sync, time-slot planning, per-assignment what-if grades, unlimited theme creation, and unlimited file chats are Pro.",
                ],
              },
              {
                label: "Users and rating",
                cells: [
                  <>
                    About {LIVE_USERS} people, counted by hand on August 27,
                    2026 (
                    <Link href="/newsroom/how-we-count-people-using-scope">
                      how we count
                    </Link>
                    ). The Chrome Web Store shows 94 users and 5.0 stars from
                    6 ratings as of September 1, 2026.
                  </>,
                  "2,000,000 users and 4.7 stars from about 4,300 ratings on the Chrome Web Store, as of September 1, 2026.",
                ],
              },
              {
                label: "Canvas customization",
                cells: [
                  "None. No dark mode, no themes, no dashboard changes.",
                  "Yes — the core feature. Dark mode, a library of community-made themes, a theme creator, custom fonts and cursors, stickers, and course-card customization on the dashboard.",
                ],
              },
              {
                label: "Cross-course search",
                cells: [
                  "Yes — files, pages, assignments, announcements, and media across every course, from one search box.",
                  <>
                    No. It gathers assignments and grades from every class,
                    but it does not search course content.
                    {/* verify: no course-content search feature on the BetterCampus listing or help center as of 2026-09-01 */}
                  </>,
                ],
              },
              {
                label: "PDF and scanned-PDF search",
                cells: [
                  "Yes. Scope reads PDF text and searches scanned pages, so a phrase inside a reading is findable.",
                  "No course-file search. It can read a transcript PDF you upload to work out cumulative GPA, and answer questions about a file you open in its study tools.",
                ],
              },
              {
                label: "To-do / planner",
                cells: [
                  "To-dos live in Scope's own panel and come from the planner, which reads deadlines across courses, drafts study blocks, and can add approved blocks to Google Calendar.",
                  "Yes. A to-do panel on the Canvas dashboard that works without an account, plus a Planner with every assignment from every class, drag-and-drop scheduling, and day, week, and month views. Time-slot planning and calendar sync are Pro.",
                ],
              },
              {
                label: "Grade calculator",
                cells: [
                  "A what-if calculator: where you stand and what the final needs to be, computed on your device.",
                  "The deeper toolkit: grade trends, grade goals, a GPA calculator, cumulative GPA from past terms, and what-if grades. Per-class goals and per-assignment what-if are Pro.",
                ],
              },
              {
                label: "AI answers with citations",
                cells: [
                  "Yes. Answers come from what your instructors posted, with the source linked. AI answers try Chrome's on-device model first; when it is unavailable, an optional, clearly marked cloud fallback is used.",
                  <>
                    Its study tools answer questions about a note or file you
                    have open, turn lectures into notes, and make flashcards,
                    quizzes, and games; 10 file chats a month are free. We
                    found no mention of source citations on its help pages.
                    {/* verify: BetterCampus "chat with your notes" — citation behaviour not documented as of 2026-09-01 */}
                  </>,
                ],
              },
              {
                label: "Brightspace support",
                cells: [
                  "Yes. Canvas and Brightspace.",
                  <>
                    Yes, per its help center on September 1, 2026, along with
                    Google Classroom, Blackboard, and Moodle. Its Chrome Web
                    Store listing still describes it as an extension for
                    Canvas.
                    {/* verify: BetterCampus on Brightspace — help-center claim, not hands-on tested */}
                  </>,
                ],
              },
              {
                label: "Where your data goes",
                cells: [
                  "Search and indexing run entirely on your device. AI answers try Chrome's on-device model first; when it is unavailable, an optional, clearly marked cloud fallback is used.",
                  "It reads your classes, assignments, and grades from your school platform. Themes and the basic to-do list work with no account; the Planner, grade tracking, study tools, and calendar sync need a free BetterCampus account, where your notes and study sets are stored. Its Chrome Web Store listing declares that it collects user-activity data.",
                ],
              },
              {
                label: "Send to iPad",
                cells: [
                  "Yes. Send a PDF from Canvas to your iPad in one tap with the Scope extension; finished files can come back into supported upload flows.",
                  <>
                    No. Nothing like it is listed.
                    {/* verify: no iPad or tablet handoff on the BetterCampus listing or help center as of 2026-09-01 */}
                  </>,
                ],
              },
              {
                label: "Last updated",
                cells: [
                  <>
                    Version {SCOPE_EXTENSION_VERSION}, updated August 30,
                    2026, per its Chrome Web Store listing on September 1,
                    2026.
                  </>,
                  "Version 9.8.6, updated August 27, 2026, per its Chrome Web Store listing on September 1, 2026. Started in 2020 as Better Canvas.",
                ],
              },
            ]}
          />
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="verdict">
        <div className="split-section" data-reveal>
          <div>
            <p className="kicker kicker-muted">Where BetterCampus wins</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
              <li>
                Customization. Dark mode, community themes, custom course
                cards, fonts, cursors, and stickers. Scope changes nothing
                about how Canvas looks.
              </li>
              <li>
                Maturity. Six years of releases since 2020, on Chrome with an
                older Firefox build, across five school platforms.
                Scope reached the Chrome Web Store in 2026.
              </li>
              <li>
                Install base and review depth. Two million users and a
                4.7-star rating from about 4,300 ratings, as of September 1,
                2026. Scope has about a hundred users and six ratings.
              </li>
              <li>
                Breadth. Google Classroom, Blackboard, and Moodle on top of
                Canvas and Brightspace; lecture recording that turns into
                notes; flashcards, quizzes, and games; a cumulative GPA
                calculator. Scope does none of these.
              </li>
            </ul>
          </div>
          <div>
            <p className="kicker kicker-muted">Where Scope wins</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
              <li>
                Search across every course — files, pages, assignments,
                announcements, media — and inside PDFs, including scanned
                ones. BetterCampus does not search course content.
              </li>
              <li>
                Answers to &ldquo;when is the midterm&rdquo; or &ldquo;what is
                the late policy&rdquo; from your own course materials, with the
                source linked.
              </li>
              <li>
                Everything is free, with no account, no Pro tier, and an index
                that is built and searched on your device.
              </li>
              <li>
                A one-tap send of any course PDF to your iPad in{" "}
                <Link href="/products/lectra">Lectra Notes</Link>, and the
                finished file back into supported upload flows.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="which">
        <div className="section-heading" data-reveal>
          <p className="kicker">The short version</p>
          <h2>Which one should you install?</h2>
        </div>
        <div data-reveal>
          <p className="section-copy">
            If Canvas looks wrong to you — too bright, too cluttered, cards in
            the wrong order — install BetterCampus. That is its job, and
            nothing on this page competes with it.
          </p>
          <p className="section-copy">
            If your problem is finding things — a slide you half remember, the
            late policy buried in a syllabus, a phrase inside a scanned reading
            — install Scope. That is the job it was built for, and BetterCampus
            does not do it.
          </p>
          <p className="section-copy">
            If both sound familiar, run both. Neither one needs the other to be
            gone.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="methodology">
        <div data-reveal>
          <MethodologyNote
            product="scope"
            dateChecked="September 1, 2026"
            extraConcessions={[
              "Platforms: BetterCampus lists Google Classroom, Blackboard, and Moodle as well as Canvas and Brightspace; Scope works with Canvas and Brightspace only.",
              "Grades: BetterCampus tracks trends, goals, and cumulative GPA across terms; Scope's calculator only projects the current course.",
              "Study tools: BetterCampus records lectures into notes and makes flashcards, quizzes, and games; Scope generates practice tests from course material and does not record audio.",
            ]}
          />
        </div>
      </section>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>Scope vs BetterCampus, answered.</h2>
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

      <RelatedLinks
        title="More on Canvas extensions."
        links={[
          {
            href: "/compare/best-canvas-chrome-extensions",
            label: "Best Canvas Chrome extensions for students",
            copy: "BetterCampus, Tasks for Canvas, the Canvas downloaders, and Scope, sorted by the job you need done.",
          },
          {
            href: "/compare/scope-vs-tasks-for-canvas",
            label: "Scope vs Tasks for Canvas",
            copy: "The to-do list most students install first, against a full course index. Which to install, or whether to run both.",
          },
          {
            href: "/guides/how-to-search-canvas",
            label: "How to search Canvas",
            copy: "What Canvas's own search covers, what it misses, and how to find anything in a course.",
          },
          {
            href: "/products/extension",
            label: "Scope for Canvas",
            copy: "Search, cited answers, practice exams, a planner, and a grade calculator, all free.",
          },
        ]}
      />

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>Keep your dark mode. Add search.</h2>
          <p>
            <StoreLink store="chrome-web-store" href={CHROME_WEB_STORE_URL}>
              Add Scope to Chrome — free
            </StoreLink>{" "}
            — and if you want Canvas to look different, install{" "}
            <a href={BETTERCAMPUS_URL} target="_blank" rel="noreferrer">
              BetterCampus
            </a>{" "}
            alongside it.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
