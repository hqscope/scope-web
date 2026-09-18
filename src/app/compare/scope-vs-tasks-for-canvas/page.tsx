import Link from "next/link";

import ComparisonTable from "@/components/site/ComparisonTable";
import FaqList, { type FaqItem } from "@/components/site/FaqList";
import MethodologyNote from "@/components/site/MethodologyNote";
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

import CompareArticle, { Pen, WinsGrid } from "../CompareArticle";

const comparison = getComparison("scope-vs-tasks-for-canvas");
const path = comparePath(comparison);

/*
 * Tasks for Canvas facts were read off its Chrome Web Store listing on
 * September 1, 2026: 1,000,000 users, 4.6 stars from about 700 ratings, version
 * 1.6.3, updated August 17, 2026, offered by BetterCampus, supporting Canvas,
 * Blackboard, and D2L Brightspace. tasksforcanvas.info redirects to
 * bettercampus.com. Scope's own listing the same day: 94 users, 5.0 stars from
 * 6 ratings, version 11.0.5, updated August 30, 2026. Re-check all of these
 * when the date in the copy moves.
 */
const TASKS_FOR_CANVAS_URL =
  "https://chromewebstore.google.com/detail/tasks-for-canvas-%E2%80%93-now-su/kabafodfnabokkkddjbnkgbcbmipdlmb";

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

const faqs: FaqItem[] = [
  {
    question: "Is there a Tasks for Canvas alternative?",
    answer:
      "For a to-do list on the Canvas dashboard, Tasks for Canvas is the best-known option, with a million users on the Chrome Web Store as of September 1, 2026. Scope for Canvas is not a replacement for it. Scope covers a different job: searching every course, including inside PDFs, answering questions with citations to your course materials, and drafting a study plan from your deadlines. If a checklist is what you want, install Tasks for Canvas.",
  },
  {
    question: "Does Scope have a to-do list?",
    answer:
      "Scope keeps to-dos and drafts a plan around them. The planner reads your upcoming deadlines, proposes study blocks, and turns the blocks you approve into saved to-dos, reminders, or calendar events. It does not add a checklist to every Canvas page, and it does not draw progress rings on the dashboard. That is what Tasks for Canvas does, and it does it well.",
  },
  {
    question: "Can I run Scope and Tasks for Canvas at the same time?",
    answer:
      "They do different jobs, and we know of no conflict between them. Tasks for Canvas adds a sidebar to the Canvas dashboard, while Scope opens from a keyboard shortcut into its own panel. We have not tested every Canvas layout with both installed, so if you see the two overlap, tell us and we will look into it.",
  },
  {
    question: "Does Scope take quizzes or do assignments?",
    answer:
      "No. Scope answers questions from the materials your instructors posted and links every answer to its source. It does not take quizzes, write submissions, or interact with Canvas quiz logs.",
  },
];

export default function ScopeVsTasksForCanvasPage() {
  return (
    <>
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
          competitorAppNode("Tasks for Canvas", TASKS_FOR_CANVAS_URL),
        ]}
      />

      <CompareArticle
        context="Checked September 1, 2026. Scope for Canvas is ours."
        title="Scope for Canvas vs Tasks for Canvas"
        lede={
          <>
            Tasks for Canvas is <Pen>the better to-do list</Pen>, and nothing here
            changes that. Scope for Canvas is for finding things and asking
            questions across every course, with a planner that drafts study blocks
            from your deadlines. The two work fine side by side.
          </>
        }
        definition={
          <>
            {SCOPE_DEFINITION} Tasks for Canvas is a to-do list sidebar for the
            Canvas, Blackboard, and Brightspace dashboards from BetterCampus.
          </>
        }
        actions={
          <>
            <StoreLink
              store="chrome-web-store"
              href={CHROME_WEB_STORE_URL}
              className="btn btn-primary"
            >
              Add Scope to Chrome for free
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
                caption="Feature comparison of Scope for Canvas and Tasks for Canvas, checked September 1, 2026"
                columns={["Scope for Canvas", "Tasks for Canvas"]}
                ours={0}
                rows={[
                  {
                    label: "What it is",
                    cells: [
                      "Search across every course, cited answers from your own materials, and a planner, opened with a keyboard shortcut from any Canvas or Brightspace page.",
                      "A to-do list sidebar on the Canvas dashboard with this week's assignments, progress rings per course, announcements, custom and recurring tasks, and streaks.",
                    ],
                  },
                  {
                    label: "Price",
                    cells: [
                      "Free. No account required.",
                      <>
                        Free. Its Chrome Web Store listing shows no paid tier as of
                        September 1, 2026.
                        {/* verify: no paid tier inside the Tasks for Canvas extension itself; BetterCampus, the same developer, sells a Pro plan for its other extension */}
                      </>,
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
                        ). The Chrome Web Store shows 94 users and 5.0 stars from 6
                        ratings as of September 1, 2026.
                      </>,
                      "1,000,000 users and 4.6 stars from about 700 ratings on the Chrome Web Store, as of September 1, 2026.",
                    ],
                  },
                  {
                    label: "Checklist or to-do across courses",
                    cells: [
                      "To-dos live in Scope's own panel and come from the planner. There is no checklist added to Canvas pages.",
                      "Yes, and it is the core feature. Every active assignment across your dashboard courses, with due date, points, and a link, marked complete by hand or on submission.",
                    ],
                  },
                  {
                    label: "Planner and study blocks",
                    cells: [
                      "Reads upcoming deadlines across courses, drafts study blocks, and turns approved blocks into to-dos, reminders, or calendar events.",
                      "Week, three-day, rolling, and semester views of what is due. It does not draft study time.",
                    ],
                  },
                  {
                    label: "Daily briefing",
                    cells: [
                      "A short morning briefing of what is coming up, when you want one.",
                      <>
                        Not listed.
                        {/* verify: no briefing or digest feature on the Tasks for Canvas listing as of 2026-09-01 */}
                      </>,
                    ],
                  },
                  {
                    label: "Google Calendar",
                    cells: [
                      "Optional. Approved study blocks and deadlines can be added to Google Calendar.",
                      <>
                        Not mentioned on its listing as of September 1, 2026.
                        {/* verify: Tasks for Canvas Google Calendar export — absent from the listing description */}
                      </>,
                    ],
                  },
                  {
                    label: "Cross-course search",
                    cells: [
                      "Yes. Files, pages, assignments, announcements, and media across every course, from one search box.",
                      "No. It lists assignments and does not search course content.",
                    ],
                  },
                  {
                    label: "PDF and scanned-PDF search",
                    cells: [
                      "Yes. Scope reads PDF text and searches scanned pages, so a phrase inside a reading is findable.",
                      "No.",
                    ],
                  },
                  {
                    label: "Cited answers from course materials",
                    cells: [
                      "Yes. Answers come from what your instructors posted, with the source linked. AI answers try Chrome's on-device model first, and when it is unavailable an optional, clearly marked cloud fallback is used.",
                      "No.",
                    ],
                  },
                  {
                    label: "LMS support",
                    cells: [
                      "Canvas and Brightspace.",
                      "Canvas, Blackboard, and D2L Brightspace, per its listing. It can also pull Gradescope assignments into the list.",
                    ],
                  },
                  {
                    label: "Grade what-if calculator",
                    cells: [
                      "Yes. See where you stand and what the final needs to be, computed locally.",
                      <>
                        Shows grades on completed tasks. No what-if calculator is
                        listed.
                        {/* verify: Tasks for Canvas has no grade projection feature per its listing as of 2026-09-01 */}
                      </>,
                    ],
                  },
                  {
                    label: "Where your data goes",
                    cells: [
                      "Search and indexing run entirely on your device. AI answers try Chrome's on-device model first, and when it is unavailable an optional, clearly marked cloud fallback is used.",
                      "Its listing says it stores your preferences in the browser, does not collect or share user data, and talks only to your school's Canvas. Completed tasks sync across your signed-in browsers.",
                    ],
                  },
                  {
                    label: "Last updated",
                    cells: [
                      <>
                        Version {SCOPE_EXTENSION_VERSION}, updated August 30, 2026,
                        per its Chrome Web Store listing on September 1, 2026.
                      </>,
                      "Version 1.6.3, updated August 17, 2026, per its Chrome Web Store listing on September 1, 2026.",
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
                    title: "Where Tasks for Canvas wins",
                    items: [
                      "The to-do list is on the Canvas dashboard itself, on every visit, with nothing to open and a progress ring per course.",
                      "A million users and a 4.6-star rating from about 700 ratings, as of September 1, 2026. Scope has about a hundred.",
                      "Years of releases, with week, three-day, and semester views, custom and recurring tasks, streaks, and announcements in the same list.",
                      "Blackboard support, and Gradescope assignments pulled into the same list. Scope does neither.",
                    ],
                  },
                  {
                    title: "Where Scope wins",
                    items: [
                      "Search across every course (files, pages, assignments, and announcements) and inside PDFs, including scanned ones.",
                      <>
                        Answers to &ldquo;when is the midterm&rdquo; or &ldquo;what
                        is the late policy&rdquo; from your own course materials,
                        with the source linked.
                      </>,
                      "A planner that drafts study blocks from your deadlines, a morning briefing, and optional Google Calendar sync.",
                      <>
                        A grade what-if calculator, computed locally, and a one-tap
                        send of any course PDF to your iPad in{" "}
                        <Link href="/products/lectra">Lectra Notes</Link>.
                      </>,
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
                product="scope"
                dateChecked="September 1, 2026"
                extraConcessions={[
                  "To-do list: Scope's to-dos live in its own panel. Tasks for Canvas puts a checklist and progress rings on the Canvas dashboard, where you see them on every visit.",
                  "Blackboard: Tasks for Canvas supports it. Scope works with Canvas and Brightspace only.",
                  "Gradescope: Tasks for Canvas pulls Gradescope assignments into its list, and Scope does not.",
                ]}
              />
            ),
          },
          {
            id: "faq",
            title: "Scope vs Tasks for Canvas, answered.",
            outline: "Questions",
            content: <FaqList items={faqs} />,
          },
        ]}
        related={{
          title: "More on Canvas extensions.",
          links: [
            {
              href: "/compare/best-canvas-chrome-extensions",
              label: "Best Canvas Chrome extensions for students",
              copy: "BetterCampus, Tasks for Canvas, the Canvas downloaders, and Scope, sorted by the job you need done.",
            },
            {
              href: "/compare/scope-vs-bettercampus",
              label: "Scope vs BetterCampus",
              copy: "BetterCampus restyles Canvas. Scope searches it. Why most students can run both.",
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
          ],
        }}
        closing={{
          title: "Keep your to-do list. Add search.",
          body: (
            <p>
              Add Scope to Chrome for free, and if you want a checklist on the
              dashboard, install{" "}
              <a
                className="link"
                href={TASKS_FOR_CANVAS_URL}
                target="_blank"
                rel="noreferrer"
              >
                Tasks for Canvas
              </a>{" "}
              alongside it.
            </p>
          ),
          actions: (
            <StoreLink
              store="chrome-web-store"
              href={CHROME_WEB_STORE_URL}
              className="btn btn-primary"
            >
              Add Scope to Chrome for free
            </StoreLink>
          ),
        }}
      />
    </>
  );
}
