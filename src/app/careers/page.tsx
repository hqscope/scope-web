import type { Metadata } from "next";

import { buttonClasses } from "@/components/buttons";
import { ArrowUpRightIcon } from "@/components/site/Icons";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import { publicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Careers",
  description:
    "Open internships at Scope in software engineering, AI/ML engineering, and growth and marketing. Flexible hours, reviewed on a rolling basis.",
  path: "/careers",
});

// /apply redirects to the application form (next.config.ts). Every role uses
// the same form, which asks the applicant to pick a role. Keep these in step
// with the roles that form lists. Links to it are plain <a>, not next/link, so
// the router never prefetches a redirect to another site.
const APPLY_PATH = "/apply";

const roles = [
  {
    title: "Software Engineering Intern",
    body: "Help build Scope's web apps, Chrome extension, and iPad app.",
  },
  {
    title: "AI/ML Engineering Intern",
    body: "Work on AI agents, tutoring systems, and AI-powered study workflows.",
  },
  {
    title: "Growth & Marketing Intern",
    body: "Grow Scope through campus partnerships, campaigns, and outreach to students.",
  },
];

const asks = [
  "Your name, email, school, major, and expected graduation.",
  "A link to your resume, plus a LinkedIn, GitHub, or portfolio link if you have one.",
  "Which roles you're applying for and how many hours a week you can give.",
  "Why you want to work on Scope, and what you'd want to work on.",
  "Something you've built, made, or led. It doesn't have to be technical.",
];

export default function CareersPage() {
  return (
    <PageShell>
      <PageHead
        title="Careers"
        lede={
          <p>
            Scope is building the place where students do their coursework: reading, writing,
            coding, and studying, all inside the course itself. We&apos;re a small, early-stage
            team, and interns work on real parts of the product from day one.
          </p>
        }
      />

      <section aria-labelledby="roles" className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8 sm:pb-24">
        <h2 id="roles" className="text-[15px] font-medium text-stone">
          Open roles
        </h2>
        <ul className="mt-5 max-w-[880px] divide-y divide-line border-y border-line">
          {roles.map((role) => (
            <li key={role.title}>
              <a
                href={APPLY_PATH}
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-8 py-7"
              >
                <span className="min-w-0">
                  <span className="block text-[clamp(1.4rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-ink group-hover:text-red">
                    {role.title}
                  </span>
                  <span className="mt-2 block max-w-[60ch] text-[16px] leading-[1.55] text-stone">
                    {role.body}
                  </span>
                </span>
                <ArrowUpRightIcon
                  size={26}
                  className="mt-1.5 text-stone transition-colors group-hover:text-red"
                />
                <span className="sr-only">Apply</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="application" className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <h2
              id="application"
              className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]"
            >
              What the application asks for
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.6] text-stone">
              One application covers every role. It takes about 10 minutes.
            </p>
          </div>
          <div className="max-w-[62ch]">
            <ul className="space-y-3 text-[17px] leading-[1.6] text-ink-soft">
              {asks.map((ask) => (
                <li key={ask} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-stone" />
                  <span>{ask}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[17px] leading-[1.6] text-ink-soft">
              These internships are unpaid, with flexible hours. We review applications on a
              rolling basis, and students of every background and experience level are welcome to
              apply.
            </p>
            <div className="mt-8">
              <a href={APPLY_PATH} className={buttonClasses("primary", "lg")}>
                Apply
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
