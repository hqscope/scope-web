import Link from "next/link";

import PenMark from "@/components/motion/PenMark";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import ComparisonTable from "@/components/site/ComparisonTable";
import FaqList from "@/components/site/FaqList";
import MethodologyNote from "@/components/site/MethodologyNote";
import PageShell from "@/components/site/PageShell";
import RelatedLinks from "@/components/site/RelatedLinks";
import { getGuide, guidePath } from "@/lib/guides";
import { publicPageMetadata } from "@/lib/seo";
import {
  CHROME_WEB_STORE_URL,
  SCOPE_DEFINITION,
  SCOPE_PRODUCT_NAME,
} from "@/lib/site";
import { LIVE_USERS, VERIFIED_ON } from "@/lib/usage";
import { breadcrumbSchema, guideArticleSchema } from "@/lib/structured-data";

import GuideArticle, { GuideClosing, GuideSection } from "../_guide/GuideArticle";

const guide = getGuide("how-to-search-canvas");
const path = guidePath(guide);

/**
 * Every Canvas and Brightspace fact on this page was read on September 1,
 * 2026 from these sources:
 *
 *   - community.instructure.com/en/kb/articles/662774-what-is-igniteai-search-for-courses
 *     (updated 2026-07-29): opt-in feature option, course-navigation link,
 *     and the four content types Smart Search covers.
 *   - canvas.instructure.com/doc/api/smart_search.html and
 *     developerdocs.instructure.com/services/canvas/resources/smart_search:
 *     GET /api/v1/courses/:course_id/smartsearch, single-course scope, no
 *     account-wide endpoint, BETA with "limited availability at present".
 *   - community.instructure.com/en/kb/articles/662809-how-do-i-view-all-my-canvas-courses
 *     (updated 2026-06-01): the All Courses groupings and the read-only
 *     archive wording for past enrollments.
 *   - community.instructure.com/en/kb/articles/662840-how-do-i-use-files
 *     (updated 2026-06-09): Files is searchable by file name.
 *   - community.instructure.com/en/kb/articles/662841-how-do-i-view-course-files
 *     (updated 2026-07-21): the Files link and the All My Files button.
 *   - Chrome Web Store listing for Canvas Files Downloader.
 *   - community.d2l.com/brightspace/discussion/3483: D2L's answer that
 *     Brightspace has no global content search.
 *
 * Anything that could not be read that day is hedged in the copy and marked
 * with a `verify:` comment beside it.
 */
const CHECKED_ON = "September 1, 2026";

/** VERIFIED_ON ("2026-08-27") in the long form this site writes dates in. */
const LIVE_USERS_CHECKED_ON = new Date(`${VERIFIED_ON}T00:00:00Z`).toLocaleDateString(
  "en-US",
  { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
);

export const metadata = publicPageMetadata({
  title: guide.title,
  absoluteTitle: guide.absoluteTitle,
  description: guide.description,
  path,
  type: "article",
  keywords: guide.keywords,
  publishedTime: guide.datePublished,
  modifiedTime: guide.dateModified,
});

const faqs = [
  {
    question: "Can you search all Canvas courses at once?",
    answer:
      "Not with Canvas on its own. Smart Search, which Instructure now lists under the name IgniteAI Search for Courses, appears as a link inside one course and searches that course. Instructure's developer documentation describes a single course-scoped search endpoint and no account-wide equivalent. To cover several courses you either repeat the search in each one, or run a browser extension that indexes them together.",
  },
  {
    question: "How do I find an old assignment in Canvas?",
    answer:
      "Open Courses, then All Courses, and look under the Past Enrollments heading. Instructure describes a concluded course there as a read-only archive, where you can still view course material and grades but can no longer participate. Open the course and check its Assignments or Grades page. Some institutions restrict access to concluded courses, so a course may not appear in that list at all.",
  },
  {
    question: "Does Canvas search inside PDFs?",
    answer:
      "No. Canvas documents Files as searchable by file name, and Smart Search covers assignments, announcements, discussions, and pages. Files are not among the content types Instructure lists. So if the definition you want is on slide 34 of a lecture deck, nothing built into Canvas will find it. The way around it is to download the files and search them on your own computer, or to use a tool that reads them for you.",
  },
  {
    question: "Why don't I see Smart Search?",
    answer:
      "Your institution has not turned it on. Instructure's own guide says the feature applies to institutions that have opted in to the Search for Courses feature option, and that if your interface looks different, it has not been enabled at your institution. Admins switch it on for an account or a sub-account, and where it is left unlocked, teachers can control it course by course. There is no switch on the student side, so asking your Canvas admin is the route that works.",
  },
];

const outline = [
  { id: "methods", label: "Five ways, side by side" },
  { id: "what-canvas-can-search", label: "What Canvas can search" },
  { id: "manual", label: "The manual way" },
  { id: "old-work", label: "Old assignments and grades" },
  { id: "downloaders", label: "Bulk-download extensions" },
  { id: "scope", label: "A cross-course search extension" },
  { id: "brightspace", label: "On Brightspace" },
  { id: "faq", label: "Questions" },
  { id: "last-verified", label: "Last checked" },
];

export default function HowToSearchCanvasGuidePage() {
  return (
    <PageShell active="guides">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "How to search Canvas across all your courses", path },
          ]),
          guideArticleSchema(
            guide.title,
            path,
            guide.description,
            guide.datePublished,
            guide.dateModified,
            "#canvascope-extension",
          ),
        ]}
      />

      <GuideArticle
        context={`A guide for Canvas and Brightspace, last checked ${CHECKED_ON}`}
        title="How to search Canvas across all your courses"
        lede={
          <p>
            Canvas has no built-in search across courses. Canvas Smart Search, where
            your school has turned it on, searches{" "}
            <span className="pen-phrase">
              one course at a time
              <PenMark kind="underline" inset="auto -4px -12px -4px" delay={0.6} className="pen-line" />
            </span>
            . This guide covers what Canvas can find today, the manual routine that
            works without installing anything, how to dig an old assignment or grade
            out of a finished course, and the two kinds of extension people reach for
            once the manual routine gets too slow.
          </p>
        }
        outline={outline}
        end={
          <RelatedLinks
            title="Next steps"
            links={[
              {
                href: "/guides/canvas-extension-safety",
                label: "Are Canvas extensions safe?",
                copy: "What a browser extension can see in your Canvas account, and the checklist to run before installing any of them.",
              },
              {
                href: "/compare/best-canvas-chrome-extensions",
                label: "Best Canvas Chrome extensions",
                copy: "The extensions students actually install, sorted by the job each one does, and where each one is the better pick.",
              },
              {
                href: "/compare/scope-vs-tasks-for-canvas",
                label: "Scope vs Tasks for Canvas",
                copy: "Tasks for Canvas is the better to-do list. Scope is search plus a planner. Here is which one you need, or whether to run both.",
              },
              {
                href: "/products/extension",
                label: SCOPE_PRODUCT_NAME,
                copy: "The extension behind the last method, with cross-course search, cited answers, and a planner drafted from your deadlines.",
              },
            ]}
          />
        }
      >
        <GuideSection id="methods" title="Five ways to find something, side by side">
          <ComparisonTable
            caption={`Ways to search Canvas course content, compared on cross-course reach, PDF contents, institutional setup, and cost, checked ${CHECKED_ON}`}
            columns={[
              "Searches across courses?",
              "Searches inside PDFs?",
              "Needs your school to enable it?",
              "Cost",
            ]}
            rows={[
              {
                label: "Canvas Smart Search",
                cells: [
                  "No. It lives in one course's navigation and searches that course.",
                  "No. It covers assignments, announcements, discussions, and pages, and files are not on Instructure's list.",
                  "Yes. An admin has to opt the account or sub-account in.",
                  // verify: whether IgniteAI carries an add-on cost for the
                  // institution is discussed but not settled in Instructure's
                  // community; nothing indicates a student-side charge.
                  "Nothing for you. Whether the institution pays for it is between the institution and Instructure.",
                ],
              },
              {
                label: "All Courses and Find on page",
                cells: [
                  "Only the list of course names, not what is inside them.",
                  "No. Find on page reads what is drawn on screen and nothing more.",
                  "No.",
                  "Free.",
                ],
              },
              {
                label: "Per-course Files search",
                cells: [
                  "No, though the All My Files view widens it to file names across your courses.",
                  "No, it searches file names only.",
                  "No.",
                  "Free.",
                ],
              },
              {
                label: "Bulk-download extension",
                cells: [
                  "It downloads course by course, and the searching happens on your computer afterwards.",
                  "Whatever your computer's own file search can read once the files are local.",
                  "No, but check your institution's policy on bulk downloading.",
                  "Free listings exist.",
                ],
              },
              {
                label: SCOPE_PRODUCT_NAME,
                cells: [
                  "Yes, across the courses you have indexed.",
                  "Yes, including scanned pages.",
                  "No.",
                  "Free.",
                ],
              },
            ]}
          />
        </GuideSection>

        <GuideSection id="what-canvas-can-search" title="What Canvas can search today">
          <div className="prose">
            <p>
              Canvas ships with two search boxes, and neither one crosses a course
              boundary.
            </p>
            <p>
              Smart Search, which Instructure now lists as IgniteAI Search for Courses,
              appears as a link in a course&apos;s navigation menu. Type a phrase and it
              returns assignments, announcements, discussions, and pages from that
              course, ranked by meaning so the exact wording does not have to match,
              with a filter for narrowing to one content type. Two things limit it.
              The first is that it is opt-in. Instructure&apos;s guide states that it
              applies to institutions that have opted in to the Search for Courses
              feature option, and that if your interface looks different, the feature
              has not been enabled at your school. The second is that it covers one
              course. Instructure&apos;s developer documentation describes a single
              course-scoped search endpoint with no account-wide equivalent, and it
              still marks the feature as beta with limited availability.
            </p>
            <p>
              The Files page in each course has its own search box, which you reach
              from the Files link in course navigation. Canvas documents Files as
              searchable by file name, so it will find &ldquo;lecture12.pdf&rdquo; and
              it will not find the word &ldquo;chemiosmosis&rdquo; printed on page four
              of it. The All My Files button widens that view to the file names across
              every course you are enrolled in, plus your own uploads. That is the
              closest thing Canvas has to a cross-course search, and it is still names
              only.
            </p>
            <p>
              Neither one reaches the text inside a PDF, a slide deck, or a scanned
              handout, which is where most of the answers you are looking for
              actually live.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="manual" title="The manual way: All Courses, then Find on page">
          <div className="prose">
            <p>
              This needs no installs and no permissions, and it works on every Canvas
              instance. It is also slow, and it helps to know why before you start.
            </p>
            <ol>
              <li>
                Click <strong>Courses</strong> in the global navigation menu on the
                left, then <strong>All Courses</strong>.
              </li>
              <li>
                Read past the current term. Canvas groups this page into All Courses,{" "}
                <strong>Past Enrollments</strong>, Future Enrollments, and Groups, so
                last spring&apos;s course is under Past Enrollments and not at the top.
              </li>
              <li>
                Open the course you think holds the file. A past-enrollment course
                opens as a read-only archive, which means you can read it but you
                cannot post in it.
              </li>
              <li>
                Go to <strong>Files</strong> or <strong>Modules</strong>, whichever
                your instructor actually used. Many instructors post everything in
                Modules and never touch Files.
              </li>
              <li>
                Expand every collapsed module, then press <strong>Ctrl+F</strong> (
                <strong>Cmd+F</strong> on a Mac) and search the page.
              </li>
              <li>Repeat for the next course.</li>
            </ol>
            <p>
              The friction is real. Find on page only matches text the browser has
              already drawn, so a collapsed module, a folder you have not opened, and
              the contents of every attachment are all invisible to it. In practice
              you are searching a table of contents, and the material itself stays
              out of reach. For one half-remembered assignment title this is fine.
              For &ldquo;which week did she define the effective population
              size&rdquo; it takes hours.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="old-work" title="Finding an old assignment or grade">
          <div className="prose">
            <p>
              A finished course does not disappear. It moves to Past Enrollments on
              the All Courses page, where Instructure describes a concluded course as a
              read-only archive. You can still view course material and grades there,
              but you can no longer participate. Open the course and two pages are
              useful.
            </p>
            <ul>
              <li>
                <strong>Grades</strong>, from the course navigation menu, shows what a
                submission scored and any comments left on it.
              </li>
              <li>
                <strong>Assignments</strong> lists every assignment the course expected
                of you and the points each was worth. It is the fastest way to recover
                a title you half-remember, and from there you can follow it through to
                the submission.
              </li>
            </ul>
            <p>
              One caveat before you panic: Instructure notes that institutions may
              restrict access to concluded courses after the course has ended. If a
              course is missing from Past Enrollments entirely, that is usually a
              school setting and not something you did, so your registrar or help desk
              is the place to ask. Anything you want to keep permanently is worth
              downloading while the course is still open to you.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="downloaders" title="Bulk-download extensions as a workaround">
          <div className="prose">
            <p>
              A whole category of browser extension exists to walk through a
              course&apos;s modules, pages, and assignments and pull every attachment
              down in one pass, keeping the folder structure. The searching then
              happens on your own computer, where Spotlight or File Explorer can read
              inside the documents, which is the one thing Canvas cannot do.
            </p>
            <p>
              To give a sense of the category, and not as a recommendation: the Chrome
              Web Store listing for Canvas Files Downloader, read on {CHECKED_ON},
              showed 3,000 users and a 3.4 rating from 23 ratings, version 1.3.0, last
              updated September 27, 2025. We have not tested it. Several similar
              extensions exist with smaller listings, and we are naming the one whose
              listing we actually read.
            </p>
            <p>Here are the trade-offs.</p>
            <ul>
              <li>It is still course by course, so six courses means six passes.</li>
              <li>
                A download is a snapshot. The moment an instructor posts a revised
                problem set, your local copy is out of date and nothing tells you.
              </li>
              <li>
                You get a folder instead of an index. Finding the file becomes your
                operating system&apos;s job, and scanned handouts with no text layer
                stay unsearchable.
              </li>
              <li>
                An extension that downloads your course files can read your Canvas
                session. That is a real permission to hand over, so read{" "}
                <Link href="/guides/canvas-extension-safety">
                  what a Canvas extension can see
                </Link>{" "}
                before you install any of them, ours included.
              </li>
              <li>
                Check your institution&apos;s policy. Some schools have rules about
                bulk-downloading course materials, particularly licensed readings.
              </li>
            </ul>
          </div>
        </GuideSection>

        <GuideSection id="scope" title="A cross-course search extension">
          <div className="prose">
            <p>{SCOPE_DEFINITION}</p>
            <p>
              What sets it apart from everything above is that it holds more than one
              course at a time and reads what is inside the documents, including
              scanned pages, so a phrase from a lecture slide is findable alongside
              the assignment that referenced it. Ask a question and it answers from
              the materials your instructors posted, with a link back to the page or
              file each part of the answer came from.
            </p>
            <p>It also falls short in ways that matter.</p>
            <ul>
              <li>
                It has to index a course before it can search it. A course you have
                never opened with Scope running is not in the index, and the first
                pass through a term of material takes a few minutes.
              </li>
              <li>
                It can only reach courses you can already open yourself. If your
                school has closed a concluded course, Scope sees exactly what you see,
                which is nothing.
              </li>
              <li>
                No app syncs with Canvas automatically. Scope indexes what you visit,
                and it does not mirror your account in the background.
              </li>
              <li>
                Scope answers questions from the materials your instructors posted and
                links every answer to its source. It does not take quizzes, write
                submissions, or interact with Canvas quiz logs.
              </li>
              <li>
                It is small. {LIVE_USERS} people were using Scope and Lectra Notes
                combined when we last counted by hand, on {LIVE_USERS_CHECKED_ON}, and
                we{" "}
                <Link href="/newsroom/how-we-count-people-using-scope">
                  show our working
                </Link>
                . The bulk downloaders above have more users than we do.
              </li>
            </ul>
            <p>
              On privacy, here are the two honest sentences. Search and indexing run
              entirely on your device. AI answers try Chrome&apos;s on-device model
              first, and when it is unavailable, an optional, clearly marked cloud
              fallback is used.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="brightspace" title="On Brightspace">
          <div className="prose">
            <p>
              Brightspace has the same problem. Asked whether an instructor could
              search every course at once, D2L answered in its own community that
              there is no global content search in Brightspace. You can search topic
              names within a course, and for anything beyond that the suggested
              workaround was the browser&apos;s own find, which only matches text
              already rendered on the page.{" "}
              {/* verify: a later community reply says the search topics box
                  reached the New Content Experience in a December release, but
                  does not give the year, so the sentence above stays at the
                  course level rather than naming an experience. */}
              So the routine is the one above: open the course, open the module list
              or the content tree, expand everything, and use Ctrl+F. Scope indexes
              Brightspace courses the same way it indexes Canvas ones.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="faq" title="Searching Canvas, answered">
          <FaqList items={faqs} />
        </GuideSection>

        <GuideSection id="last-verified" title="When this was last checked">
          <div className="prose">
            <p>
              Checked on {CHECKED_ON}. Every Canvas step and limit on this page was
              read that day from Instructure&apos;s own guides and developer
              documentation, the Brightspace paragraph from D2L&apos;s community, and
              the downloader figures from that extension&apos;s Chrome Web Store
              listing. One thing has changed since this guide was first written:
              Instructure now lists Smart Search under the name IgniteAI Search for
              Courses, and its guide was last updated in July 2026. The feature is
              still opt-in per institution and still scoped to one course. Canvas
              guides move, and features arrive at different schools at different
              times, so if a step here no longer matches what you see, tell us and we
              will correct it.
            </p>
          </div>
          <MethodologyNote
            product="scope"
            dateChecked={CHECKED_ON}
            extraConcessions={[
              "Indexing: Scope cannot search a course until it has indexed it, and it only reaches courses you can already open yourself.",
              "Downloading: Scope does not bulk-download a course to your disk. If you want offline copies of everything, a downloader still does that job better.",
            ]}
          />
        </GuideSection>
      </GuideArticle>

      <GuideClosing
        title="Stop opening courses one at a time."
        actions={
          <StoreLink
            store="chrome-web-store"
            href={CHROME_WEB_STORE_URL}
            className="btn btn-primary"
          >
            Add Scope to Chrome for free
          </StoreLink>
        }
      >
        <p>
          It searches the courses you open, PDFs included. If all you need is one old
          assignment title, the All Courses page above does the job without installing
          anything, and we would rather you knew that.
        </p>
      </GuideClosing>
    </PageShell>
  );
}
