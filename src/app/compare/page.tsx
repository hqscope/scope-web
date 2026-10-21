import Link from "next/link";

import { ButtonLink } from "@/components/buttons";
import Mark from "@/components/site/Mark";
import PageShell from "@/components/site/PageShell";
import JsonLd from "@/components/seo/JsonLd";
import { comparePath, comparisons, comparisonsFor, type Comparison } from "@/lib/compare";
import { publicPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";

const description =
  "Honest comparisons of Scope for Canvas with BetterCampus and Tasks for Canvas, and of Lectra Notes with Goodnotes, Notability, and the iPad Python notebook apps, including where each competitor is stronger.";

export const metadata = publicPageMetadata({
  title: "Compare Scope and Lectra Notes",
  description,
  path: "/compare",
  keywords: [
    "Scope vs Better Canvas",
    "Scope vs Tasks for Canvas",
    "best Canvas Chrome extensions",
    "Lectra Notes vs Goodnotes",
    "Lectra Notes vs Notability",
    "free Goodnotes alternatives",
    "iPad Python notebook apps",
  ],
});

/* Where the other apps win, each one taken from its comparison page. */
const theirWins = [
  { app: "BetterCampus", win: "Dark mode, themes, and custom course cards" },
  { app: "Tasks for Canvas", win: "A to-do list on the Canvas dashboard" },
  { app: "Goodnotes", win: "Handwriting-to-text conversion", marked: true },
  { app: "Notability", win: "Years of polish on lecture audio" },
  { app: "Juno and Carnets", win: "SciPy and scikit-learn built in" },
];

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function CompareIndex({ items }: { items: Comparison[] }) {
  return (
    <ul className="mt-10 divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item.slug}>
          <Link
            href={comparePath(item)}
            className="group grid gap-1 py-5 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-8"
          >
            <span className="text-[17px] font-semibold leading-[1.35] tracking-[-0.015em] text-ink group-hover:text-red">
              {item.title}
            </span>
            <span className="flex flex-col gap-1.5">
              <span className="text-[15.5px] leading-[1.55] text-stone">{item.copy}</span>
              <span className="text-[13.5px] text-stone">Updated {formatDate(item.dateModified)}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ComparePage() {
  const scopeComparisons = comparisonsFor("scope");
  const lectraComparisons = comparisonsFor("lectra");

  return (
    <PageShell active="compare">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
          ]),
          itemListSchema(
            "Scope and Lectra Notes comparisons",
            "/compare",
            comparisons.map((item) => ({
              name: item.title,
              path: comparePath(item),
            })),
          ),
        ]}
      />

      <section
        aria-labelledby="compare-title"
        className="mx-auto max-w-[1200px] px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-20"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-16">
          <div>
            <p className="text-[15px] font-medium text-stone">
              Comparisons for Scope for Canvas and Lectra Notes
            </p>
            <h1
              id="compare-title"
              className="mt-5 max-w-[16ch] text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[0.97] tracking-[-0.046em] text-balance"
            >
              Pick the right app, even if it isn&apos;t ours.
            </h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.6] text-ink-soft">
              Every comparison here names what the other app does better. Each one
              is dated, sourced, and corrected when we&apos;re wrong. If Scope for
              Canvas or Lectra Notes wins, we want it to win on the merits.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[15.5px]">
              <a href="#scope" className="link">
                Canvas extensions
              </a>
              <a href="#lectra" className="link">
                iPad note-taking apps
              </a>
            </div>
          </div>

          <figure className="rounded-[22px] bg-wash p-7 sm:p-9">
            <p className="text-[19px] font-semibold tracking-[-0.02em] text-ink">Where they win</p>
            <ul className="mt-4 divide-y divide-line border-t border-line">
              {theirWins.map((item) => (
                <li
                  key={item.app}
                  className="grid gap-0.5 py-3.5 text-[15.5px] leading-[1.5] min-[480px]:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] min-[480px]:items-baseline min-[480px]:gap-5"
                >
                  <span className="font-semibold text-ink">{item.app}</span>
                  <span className="text-ink-soft">
                    {item.marked ? (
                      <span className="underline decoration-red decoration-2 underline-offset-[5px]">
                        {item.win}
                      </span>
                    ) : (
                      item.win
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <figcaption className="mt-4 text-[14px] text-stone">
              Each page says where the other app is the better pick.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="scope" aria-labelledby="scope-title" className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="border-t border-line py-20 sm:py-24">
          <p className="flex items-center gap-2 text-[15px] font-medium text-stone">
            <Mark size={18} /> Scope for Canvas
          </p>
          <h2
            id="scope-title"
            className="mt-4 max-w-[20ch] text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
          >
            Canvas Chrome extensions, compared.
          </h2>
          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-stone">
            BetterCampus, Tasks for Canvas, the downloaders, and Scope. Most
            students can run more than one, so each page says which job each
            extension does best.
          </p>
          <CompareIndex items={scopeComparisons} />
        </div>
      </section>

      <section id="lectra" aria-labelledby="lectra-title" className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="border-t border-line py-20 sm:py-24">
          <p className="text-[15px] font-medium text-stone">Lectra Notes</p>
          <h2
            id="lectra-title"
            className="mt-4 max-w-[20ch] text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
          >
            iPad note-taking apps, compared.
          </h2>
          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-stone">
            Goodnotes, Notability, OneNote, and the iPad Python apps, set against
            Lectra Notes on price, handwriting, audio, and code.
          </p>
          <CompareIndex items={lectraComparisons} />
        </div>
      </section>

      <section aria-labelledby="guides-title" className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="grid gap-8 rounded-[22px] bg-wash p-8 sm:p-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
          <div>
            <h2
              id="guides-title"
              className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
            >
              Looking for a how-to instead?
            </h2>
            <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.55] text-stone">
              The guides cover the manual way first, like searching Canvas, checking an
              extension before you install it, and getting lecture slides onto an
              iPad, and only then mention ours.
            </p>
          </div>
          <div className="md:justify-self-end">
            <ButtonLink href="/guides" size="lg">
              Read the guides
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
