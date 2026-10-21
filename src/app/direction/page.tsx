import Link from "next/link";

import { buttonClasses } from "@/components/buttons";
import { ChromeIcon } from "@/components/icons";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import Mark from "@/components/site/Mark";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import { publicPageMetadata } from "@/lib/seo";
import { CHROME_WEB_STORE_URL } from "@/lib/site";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";

import DirectionRoadmap, { RAIL_INK, RAIL_PENCIL, type DirectionStage } from "./DirectionRoadmap";

export const metadata = publicPageMetadata({
  title: "Direction",
  description:
    "Learning management systems became systems of record: files in, grades out. The actual work of learning happens somewhere else. We think the course itself should be the workspace, and we're building toward that in the open.",
  path: "/direction",
  keywords: [
    "Scope direction",
    "Scope mission",
    "next LMS",
    "course-grounded AI",
    "local-first student software",
    "LMS replacement",
  ],
});

const stages: DirectionStage[] = [
  {
    id: "today",
    when: "Today",
    status: "Shipping and free",
    lead: "The student layer.",
    copy: "Scope for Canvas, the extension, puts search, cited answers, practice exams, and a planner inside the LMS. Lectra Notes is the workspace for ink, notebooks, and an offline library. Polya tutors from the course itself, and DropBridge carries files between all of it.",
    shipping: true,
  },
  {
    id: "next",
    when: "Next",
    status: "In design",
    lead: "The instructor side.",
    copy: "Publishing, assignments, feedback, and grading run in Scope while the institutional LMS stays the system of record underneath. A course can live in Scope before a university ever signs anything.",
    shipping: false,
  },
  {
    id: "eventually",
    when: "Eventually",
    status: "The goal",
    lead: "The course doesn't need the old system underneath.",
    copy: "Enrollment, content, work, and record all live in one place, an LMS where the learning and the management are the same surface. Replacing the old system becomes a migration you can plan.",
    shipping: false,
  },
];

const principles = [
  {
    title: "Students first, free",
    copy: "The student layer is free. We charge institutions and never the people doing the homework.",
  },
  {
    title: "Local-first by default",
    copy: "Course data is indexed and searched on your device. Cloud features are explicit, optional, and labeled.",
  },
  {
    title: "AI that cites or stays quiet",
    copy: "Every generated answer points to the course material it came from. If there is no source, there is no claim.",
  },
  {
    title: "Leave the door open",
    copy: "We use open formats like .lectra and standard exports, so nothing locks you in. If we're wrong, leaving should be easy.",
  },
];

const container = "mx-auto max-w-[1200px] px-5 sm:px-8";
const sectionTitle =
  "text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-balance";
const onInkSecondary =
  "inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-5 text-[15.5px] font-semibold tracking-[-0.01em] text-white ring-1 ring-inset ring-white/30 transition-colors hover:bg-white/10";

export default function DirectionPage() {
  return (
    <PageShell active="direction">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Direction", path: "/direction" },
          ]),
          itemListSchema("What Scope is building", "/direction", [
            { name: "Today: the student layer", path: "/direction#today" },
            { name: "Next: the instructor side", path: "/direction#next" },
            { name: "Eventually: the course itself", path: "/direction#eventually" },
          ]),
        ]}
      />

      <PageHead
        context="Where Scope is going. Only the first stage ships today."
        wide
        title={
          <>
            The next LMS should not be a better{" "}
            <span className="line-through decoration-red decoration-[0.07em]">filing cabinet.</span>
          </>
        }
        lede={
          <p>
            Learning management systems became systems of record: files in, grades out. The
            actual work of learning happens somewhere else. We think the course itself should be
            the workspace, and we&apos;re building toward that in the open.
          </p>
        }
      />

      <section aria-labelledby="wedge-title" className={`${container} pb-20 sm:pb-28`}>
        <div className="grid grid-cols-1 gap-12 border-t border-line pt-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="wedge-title" className={sectionTitle}>
              You don&rsquo;t replace an LMS by asking a university to switch.
            </h2>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.65] text-ink-soft">
              Procurement cycles run for years, and students are enrolled now. So Scope enters
              from the side with Scope for Canvas, a free extension on top of Canvas and
              Brightspace that students install themselves in a minute. It works with the
              systems your school already runs.
            </p>
          </div>
          <div>
            <h2 className={sectionTitle}>
              If students do their work in Scope, the record follows the work.
            </h2>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.65] text-ink-soft">
              When reading, notes, code, questions, and submissions all pass through one place,
              that place becomes the real system of record. The old LMS underneath turns into an
              export target, and replacing it becomes a migration.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="path-title" className="bg-wash">
        <div className={`${container} py-20 sm:py-28`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <h2
              id="path-title"
              className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
            >
              The path, plainly labeled.
            </h2>
            <p className="max-w-[40ch] text-[15.5px] leading-[1.6] text-stone">
              What ships today is written in ink. Plans are in pencil, because plans change.
            </p>
          </div>
          <p
            aria-hidden="true"
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-medium text-stone"
          >
            <span className="inline-flex items-center gap-2">
              <i className={`inline-block w-6 border-t-2 ${RAIL_INK}`} /> Shipping
            </span>
            <span className="inline-flex items-center gap-2">
              <i className={`inline-block w-6 border-t-2 ${RAIL_PENCIL}`} /> Planned
            </span>
          </p>
          <DirectionRoadmap stages={stages} />
        </div>
      </section>

      <section aria-labelledby="rules-title" className={`${container} py-20 sm:py-28`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          <div>
            <h2 id="rules-title" className={sectionTitle}>
              Rules we&rsquo;re holding ourselves to.
            </h2>
            <p className="mt-4 max-w-[36ch] text-[17px] leading-[1.6] text-stone">
              These hold at every stage of the path, including the ones still in pencil.
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {principles.map((principle) => (
              <li
                key={principle.title}
                className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6"
              >
                <strong className="text-[16.5px] font-semibold tracking-[-0.01em] text-ink">
                  {principle.title}
                </strong>
                <span className="text-[15.5px] leading-[1.6] text-stone">{principle.copy}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="closing-title" className="bg-ink text-white">
        <div
          className={`${container} flex flex-col gap-8 py-20 sm:py-24 md:flex-row md:items-end md:justify-between`}
        >
          <div>
            <Mark size={48} className="[--mark-ink:#ffffff]" />
            <h2
              id="closing-title"
              className="mt-6 max-w-[18ch] text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
            >
              The first piece is free. Try it today.
            </h2>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <StoreLink
              store="chrome-web-store"
              href={CHROME_WEB_STORE_URL}
              className={buttonClasses("inverted", "lg")}
            >
              <ChromeIcon className="size-[18px]" />
              Add Scope to Chrome for free
            </StoreLink>
            <Link href="/newsroom" className={onInkSecondary}>
              Follow along in the Newsroom
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
