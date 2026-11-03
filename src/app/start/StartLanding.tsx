import Link from "next/link";
import type { ReactNode } from "react";

import { buttonClasses, ButtonLink, ChromeStoreButton } from "@/components/buttons";
import { AppleIcon, CheckIcon } from "@/components/icons";
import { FindScene } from "@/components/mocks/flow-mocks";
import { LectraMock } from "@/components/mocks/lectra-mock";
import { PolyaMock } from "@/components/mocks/polya-mock";
import StoreLink from "@/components/seo/StoreLink";
import { ChevronIcon } from "@/components/site/Icons";
import PageShell from "@/components/site/PageShell";
import { products, site, SITE_URL } from "@/lib/site";

import SendToLaptop from "./SendToLaptop";

type App = {
  id: string;
  /** The half of the headline this app answers. */
  verb: string;
  name: string;
  /** The app's own product page. */
  href: string;
  where: string;
  summary: string;
  features: string[];
  actions: ReactNode;
  note?: ReactNode;
  scene: ReactNode;
};

/**
 * The page a campus QR code lands on: the three apps, each with the one
 * button that gets a student started. Most visitors arrive on a phone, so
 * the layout is built for 390px first and opens up into two columns on a
 * laptop.
 */
export default function StartLanding({
  campusName = null,
  path,
}: {
  campusName?: string | null;
  /** This page's own path, so "send to my laptop" brings the student back here. */
  path: string;
}) {
  const apps: App[] = [
    {
      id: "scope",
      verb: "Find it",
      name: products.extension.name,
      href: products.extension.href,
      where: "Chrome extension for your laptop",
      summary: "Search every Canvas and Brightspace course from one search bar.",
      features: [
        "Find any reading, slide, or assignment in a few keystrokes",
        "Every due date in one agenda",
        "Ask about dates, policies, and files",
      ],
      actions: (
        <>
          {/* A phone can't add a Chrome extension, so small screens get the
              link to take to a laptop first and the store second. */}
          <SendToLaptop url={`${SITE_URL}${path}#scope`} className="lg:hidden" />
          <span className="hidden lg:contents">
            <ChromeStoreButton />
          </span>
          <span className="contents lg:hidden">
            <ChromeStoreButton variant="secondary" />
          </span>
        </>
      ),
      note: (
        <p className="mt-4 text-[14px] leading-[1.5] text-stone lg:hidden">
          On your phone? Send yourself the link and add Scope from Chrome on your laptop.
        </p>
      ),
      scene: <FindScene />,
    },
    {
      id: "lectra",
      verb: "Mark it up",
      name: products.lectra.name,
      href: products.lectra.href,
      where: "iPad and iPhone app",
      summary: "Read, mark up, and work on course documents with Apple Pencil.",
      features: [
        "Handwriting on PDFs and notebooks",
        "Lecture recording tied to your notes",
        "Works without an account",
      ],
      actions: (
        <StoreLink
          store="app-store"
          href={products.lectra.storeUrl}
          className={buttonClasses("secondary", "lg")}
        >
          <AppleIcon className="size-[18px] -translate-y-px" />
          Get Lectra Notes
        </StoreLink>
      ),
      scene: <LectraMock />,
    },
    {
      id: "polya",
      verb: "Get unstuck",
      name: products.polya.name,
      href: products.polya.href,
      where: "On the web, including your phone",
      summary: "A tutor that teaches from your own course materials.",
      features: [
        "Guided mode starts with a hint, not the answer",
        "Answers that open the page they came from",
        "Exam practice from your materials",
      ],
      actions: (
        <ButtonLink href={products.polya.appUrl} variant="secondary" size="lg">
          Open Polya
        </ButtonLink>
      ),
      scene: <PolyaMock showModes={false} />,
    },
  ];

  return (
    <PageShell>
      <section className="mx-auto max-w-[1200px] px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16">
        <p className="text-[15px] font-medium text-stone">
          {campusName ? `For students at ${campusName}` : "Free for every student"}
        </p>
        <h1 className="mt-4 max-w-[13ch] text-[clamp(2.6rem,8vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.048em] text-ink">
          Find it. Mark it up. Get unstuck.
        </h1>
        <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.55] text-ink-soft sm:text-[18px]">
          Three free apps for your Canvas and Brightspace courses. Start with the one you need. Each
          works on its own, and one Google account signs you in to all three.
        </p>

        <nav
          aria-label="The three apps"
          className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-[22px] bg-line ring-1 ring-line sm:grid-cols-3"
        >
          {apps.map((app) => (
            <a
              key={app.id}
              href={`#${app.id}`}
              className="group flex items-center justify-between gap-4 bg-paper px-5 py-4 transition-colors hover:bg-wash sm:px-6 sm:py-5"
            >
              <span className="min-w-0">
                <span className="block text-[13.5px] font-medium text-stone">{app.verb}</span>
                <span className="block truncate text-[18px] font-semibold tracking-[-0.02em] text-ink">
                  {app.name}
                </span>
              </span>
              <ChevronIcon className="shrink-0 text-stone transition-transform group-hover:translate-y-0.5" />
            </a>
          ))}
        </nav>
      </section>

      {apps.map((app, index) => (
        <section
          key={app.id}
          id={app.id}
          aria-labelledby={`${app.id}-heading`}
          className={index % 2 === 0 ? "border-t border-line bg-wash" : "border-t border-line"}
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
            <div>
              <p className="text-[13.5px] font-medium text-stone">{app.where}</p>
              <h2
                id={`${app.id}-heading`}
                className="mt-1 text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
              >
                {app.name}
              </h2>
              <p className="mt-4 max-w-[40ch] text-[17px] leading-[1.55] text-ink-soft">
                {app.summary}
              </p>
              <ul className="mt-6 space-y-2.5">
                {app.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-[15.5px] leading-snug text-ink-soft">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-red" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{app.actions}</div>
              {app.note}
              <Link
                href={app.href}
                className="mt-6 inline-flex text-[15px] font-semibold text-ink underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-red"
              >
                More about {app.name}
              </Link>
            </div>
            <div className="min-w-0">{app.scene}</div>
          </div>
        </section>
      ))}

      <section className="border-t border-line bg-ink text-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
          <div>
            <h2 className="max-w-[18ch] text-[clamp(1.9rem,4.4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Free, with no ads.
            </h2>
            <p className="mt-4 max-w-[48ch] text-[16.5px] leading-[1.6] text-white/65">
              We don&apos;t sell your data, and your notes, documents, and course materials
              aren&apos;t used to train AI models.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-self-end">
            <ButtonLink href="/privacy" variant="inverted" size="lg">
              Privacy at a glance
            </ButtonLink>
            <ButtonLink
              href={`mailto:${site.supportEmail}?subject=Question%20about%20Scope`}
              variant="inverted"
              size="lg"
            >
              Email the Scope team
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
