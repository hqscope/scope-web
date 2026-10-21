import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/buttons";
import PageShell from "@/components/site/PageShell";
import { LogoMark } from "@/components/logo";
import { publicPageMetadata } from "@/lib/seo";
import { products, site } from "@/lib/site";

export const metadata: Metadata = publicPageMetadata({
  title: "About Scope",
  description:
    "Scope builds free study apps that make students more capable and independent. Automate everything around learning; don't automate learning itself.",
  path: "/about",
});

const today = [
  {
    name: products.extension.name,
    href: products.extension.href,
    body: "Search, deadlines, and quick answers across every Canvas and Brightspace course.",
  },
  {
    name: products.lectra.name,
    href: products.lectra.href,
    body: "Reading, handwriting, lecture recording, and Python on the iPad.",
  },
  {
    name: products.polya.name,
    href: products.polya.href,
    body: "A tutor that teaches from your own course materials and cites every answer.",
  },
];

export default function AboutPage() {
  return (
    <PageShell active="about">
      <section className="mx-auto max-w-[1200px] px-5 pb-20 pt-12 sm:px-8 sm:pt-20">
        <p className="text-[15px] font-medium text-stone">About Scope</p>
        <h1 className="mt-5 max-w-[17ch] text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[0.97] tracking-[-0.046em]">
          Tools that make students more capable, not less.
        </h1>
      </section>

      <section aria-labelledby="why" className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h2 id="why" className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
            Why we started
          </h2>
          <div className="max-w-[62ch] space-y-5 text-[18px] leading-[1.65] text-ink-soft">
            <p>
              A course site is a filing cabinet. Instructors post files, assignments, and grades
              there. Students leave it to read, annotate, write, code, and ask for help, then come
              back to upload a result.
            </p>
            <p>
              That gap adds up: finding the right file, moving it to the device you
              write on, keeping notes in order, and getting it back in on time. It also pushes
              students toward tools that will happily do the work for them.
            </p>
            <p>
              Scope closes the gap from the student&apos;s side first. It works with the Canvas or
              Brightspace course a school already runs, and nobody has to set anything up.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="principle" className="bg-ink text-white">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <LogoMark className="h-7 w-auto text-white" inverted />
            <h2 id="principle" className="mt-6 text-[15px] font-medium text-white/60">
              What we build by
            </h2>
          </div>
          <div>
            <p className="max-w-[20ch] text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.03] tracking-[-0.04em]">
              Automate everything around learning. Don&apos;t automate learning itself.
            </p>
            <p className="mt-6 max-w-[56ch] text-[17px] leading-[1.6] text-white/65">
              Finding the reading, filing the notes, and tracking deadlines are chores, so Scope
              takes them on. Understanding the material is the point of the course, so Scope leaves
              that to you. That&apos;s why Polya starts with a hint, why you choose how much help you
              get, and why Scope never submits work for you.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="today" className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <h2 id="today" className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
              What you can use today
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.6] text-stone">
              Where Scope is headed is on the{" "}
              <Link href="/direction" className="link">
                direction page
              </Link>
              .
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {today.map((app) => (
              <li key={app.name}>
                <Link href={app.href} className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="w-44 shrink-0 text-[17px] font-semibold tracking-[-0.015em] group-hover:text-red">
                    {app.name}
                  </span>
                  <span className="text-[16px] leading-[1.55] text-stone">{app.body}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="team" className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h2 id="team" className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
            Who builds it
          </h2>
          <div className="max-w-[62ch]">
            <p className="text-[18px] leading-[1.65] text-ink-soft">
              Scope started at UC Berkeley and is built by Noel Sason. It was called Canvascope until
              2026. If something in Scope gets in your way, or you want it to do something it
              doesn&apos;t, email the team.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`mailto:${site.supportEmail}`} size="lg">
                Email the Scope team
              </ButtonLink>
              {site.linkedinUrl && (
                <ButtonLink href={site.linkedinUrl} variant="secondary" size="lg">
                  Follow on LinkedIn
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
