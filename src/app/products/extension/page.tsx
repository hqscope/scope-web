import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import PageShell from "@/components/site/PageShell";
import { ButtonLink, ChromeStoreButton } from "@/components/buttons";
import { CommandPaletteDemo } from "@/components/command-palette-demo";
import { AgendaMock } from "@/components/mocks/agenda-mock";
import {
  ClosingCta,
  FeatureGrid,
  PageHero,
  Questions,
  Requirements,
  SectionHeading,
  SplitSection,
} from "@/components/page-parts";
import { publicPageMetadata } from "@/lib/seo";
import { TRADEMARK_DISCLAIMER, site } from "@/lib/site";
import {
  breadcrumbSchema,
  canvascopeSoftwareSchema,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";

export const metadata: Metadata = publicPageMetadata({
  title: "Scope for Canvas: Chrome Extension That Searches Every Course",
  absoluteTitle: true,
  description:
    "Scope for Canvas is a free Chrome extension that searches every file, page, and assignment across your Canvas and Brightspace courses. It is indexed on your device, and answers are cited to the source.",
  path: "/products/extension",
  keywords: [
    "Scope extension",
    "Scope for Canvas",
    // Retained so people still searching the former name find us.
    "Canvascope",
    "Canvascope extension",
    "Canvas LMS search",
    "Brightspace search",
    "Attach from Lectra",
    "student productivity extension",
    "LMS search extension",
    "Canvas Chrome extension",
    "search Canvas",
    "best Canvas extension",
    "Canvas search extension",
  ],
});

const features = [
  {
    title: "Search every course",
    body: "Open your school's site once and Scope finds your courses. It searches files, pages, assignments, modules, and videos across all of them, and the search runs on your computer.",
  },
  {
    title: "Ask Scope",
    body: "Ask quick questions about a course, like when the midterm is or what the late policy says. Answers link to the course material they came from.",
  },
  {
    title: "Make a study plan",
    body: "Plan the next two weeks, schedule study blocks around your deadlines, and get a morning briefing.",
  },
  {
    title: "Practice for quizzes and exams",
    body: "Practice with questions drawn from the materials your instructors posted.",
  },
  {
    title: "Send PDFs to your iPad",
    body: "Send a course PDF to Lectra Notes in one step. Then attach your marked-up work on a Canvas or Gradescope upload page with Select from Lectra.",
  },
  {
    title: "Grades, notes, and focus",
    body: "A GPA calculator, a grades summary, a focus timer, and quick notes, all in the same place.",
  },
];

const support = [
  { feature: "Search, the agenda, and pins", canvas: "Yes", brightspace: "Yes" },
  { feature: "Ask Scope and the study commands", canvas: "Yes", brightspace: "Yes, with fewer details" },
  { feature: "Canvas appearance, grade pills, and the grades summary", canvas: "Yes", brightspace: "No" },
  { feature: "Send to Lectra on course PDFs and Select from Lectra", canvas: "Yes", brightspace: "No" },
  { feature: "Study in Polya", canvas: "Yes", brightspace: "No" },
];

const faqs: FaqEntry[] = [
    {
      question: "Does my instructor need to set anything up?",
      answer:
        "No. Scope works with the course you already have. Open your school's Canvas or Brightspace site once, and Scope finds your courses.",
    },
    {
      question: "Do I need an account?",
      answer:
        "No. You can search your courses and see what's due without signing in. Signing in with Google adds Ask Scope, your calendar, and sending PDFs to your iPad.",
    },
    {
      question: "Will Scope do my assignments?",
      answer:
        "No. Scope finds materials, tracks deadlines, and attaches files you choose. It isn't set up to do graded work for you, and it never submits anything. Your instructor's rules and your school's academic-integrity policy apply to how you use any study tool.",
    },
    {
      question: "Is Scope part of Canvas?",
      answer: `No. Scope is an independent extension. ${TRADEMARK_DISCLAIMER}`,
    },
    {
      question: "Is this the same extension as Canvascope?",
      answer: "Yes. Canvascope is Scope's former name. On the Chrome Web Store, it's listed as Scope.",
    },
];

export default function ExtensionPage() {
  return (
    <PageShell active="extension">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Extension", path: "/products/extension" },
          ]),
          canvascopeSoftwareSchema(),
          faqSchema(faqs),
        ]}
      />
      <PageHero
        kicker="Scope for Canvas, a free Chrome extension"
        title="Every course, one search away."
        lede="Press ⌘K on any Canvas or Brightspace page and find the file, page, assignment, or video you need, whichever course it's in. Scope also gathers every due date into one agenda and answers questions from what your instructors posted."
        actions={
          <>
            <ChromeStoreButton />
            <ButtonLink href={`${site.docsUrl}/chrome/overview`} variant="secondary" size="lg">
              Read the guide
            </ButtonLink>
          </>
        }
      />

      <div className="mx-auto -mt-4 max-w-[1200px] px-5 sm:px-8">
        <CommandPaletteDemo />
      </div>

      <FeatureGrid
        id="features"
        title="Less clicking through modules."
        intro="Scope adds one search bar to the course site your school already uses. You don't need an account to search or to see what's due."
        features={features}
      />

      <SplitSection
        id="agenda"
        title="Every deadline, from every course, in one list."
        body={
          <>
            <p>
              Scope shows what&apos;s overdue, what&apos;s due today, and what&apos;s due this week
              across all your courses, with reminders before each one.
            </p>
            <p>
              When a syllabus lists dates that never made it into Canvas, copy them into your agenda
              and your Google Calendar.
            </p>
          </>
        }
        visual={<AgendaMock />}
      />

      <section aria-labelledby="where" className="mx-auto max-w-[1200px] px-5 pt-20 sm:px-8 sm:pt-24">
        <SectionHeading
          id="where"
          title="Works with Canvas and Brightspace."
          intro="Scope recognizes most Canvas and Brightspace addresses, and you can add your school's own. Send to Lectra also works on PDFs on any website and on Google Docs, Slides, and Sheets."
        />
        <div className="mt-10 overflow-x-auto rounded-[18px] ring-1 ring-line">
          <table className="w-full min-w-[560px] text-left text-[15px]">
            <thead className="bg-wash text-[13.5px] text-stone">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Feature</th>
                <th scope="col" className="px-5 py-3 font-semibold">Canvas</th>
                <th scope="col" className="px-5 py-3 font-semibold">Brightspace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {support.map((row) => (
                <tr key={row.feature}>
                  <th scope="row" className="px-5 py-3.5 font-medium text-ink">{row.feature}</th>
                  <td className="px-5 py-3.5 text-stone">{row.canvas}</td>
                  <td className="px-5 py-3.5 text-stone">{row.brightspace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Requirements
        items={[
          { label: "Browser", value: "Google Chrome 116 or later on a computer." },
          { label: "Courses", value: "Canvas or Brightspace at your school." },
          {
            label: "Account",
            value: "Not needed to search. Sign in with Google to use Ask Scope, your calendar, and Send to Lectra.",
          },
          { label: "Languages", value: "English and Spanish." },
          { label: "Price", value: "Free, with no ads." },
        ]}
      />

      <Questions items={faqs} />

      <ClosingCta
        title="Add Scope to Chrome."
        body="Install it, open your course site once, and press ⌘K."
        actions={<ChromeStoreButton variant="inverted" />}
      />
    </PageShell>
  );
}
