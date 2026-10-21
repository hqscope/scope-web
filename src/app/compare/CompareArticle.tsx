import type { ReactNode } from "react";

import ArticleShell from "@/components/site/ArticleShell";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import RelatedLinks, { type RelatedLink } from "@/components/site/RelatedLinks";
import type { HeaderCta } from "@/components/site/nav";
import { comparePath, comparisonsFor } from "@/lib/compare";
import { getGuide, guidePath } from "@/lib/guides";
import { LECTRA_APP_STORE_CAMPAIGN_URL } from "@/lib/site";

export type ArticleSection = {
  id: string;
  /** The visible H2. Leave it out when the content brings its own heading. */
  title?: string;
  /** The outline label. Defaults to the title. */
  outline?: string;
  content: ReactNode;
};

/** Header call to action for the Lectra Notes comparisons. */
export const lectraCta: HeaderCta = {
  label: "Get Lectra Notes",
  href: LECTRA_APP_STORE_CAMPAIGN_URL,
  store: "app-store",
};

/** The other Lectra Notes comparisons, plus the iPad annotation guide. */
export function lectraRelatedLinks(slug: string): RelatedLink[] {
  const annotateGuide = getGuide("annotate-lecture-slides-on-ipad");

  return [
    ...comparisonsFor("lectra")
      .filter((item) => item.slug !== slug)
      .map((item) => ({
        href: comparePath(item),
        label: item.title,
        copy: item.copy,
      })),
    {
      href: guidePath(annotateGuide),
      label: annotateGuide.title,
      copy: annotateGuide.copy,
    },
  ];
}

/*
 * ArticleShell styles every h2/h3/p/ul inside the reading column. The FAQ
 * questions and the methodology note carry their own headings, so these
 * reset the reading-column margins on them, and keep the first section's
 * heading flush with the top of the column.
 */
const readingFixes = [
  "[&>section:first-child>h2]:mt-0",
  "[&_summary_h3]:m-0",
  "[&_details_.prose-scope>:last-child]:mb-0",
  "[&_aside_h2]:mt-0",
  "[&_aside>:last-child]:mb-0",
].join(" ");

/**
 * The shared layout of every comparison: the head, the reading column with
 * its outline, the related links, then a closing call to action.
 */
export default function CompareArticle({
  context,
  title,
  lede,
  definition,
  actions,
  sections,
  related,
  closing,
  cta,
}: {
  context: ReactNode;
  title: ReactNode;
  lede: ReactNode;
  /** The product definitions, set quieter under the lede. */
  definition?: ReactNode;
  actions?: ReactNode;
  sections: ArticleSection[];
  related: { title: string; links: RelatedLink[] };
  closing: { title: string; body: ReactNode; actions: ReactNode };
  cta?: HeaderCta;
}) {
  const outline = sections.map((section) => ({
    id: section.id,
    label: section.outline ?? section.title ?? section.id,
  }));

  return (
    <PageShell active="compare" cta={cta}>
      <article>
        <PageHead
          wide
          crumbs={[
            { href: "/", label: "Home" },
            { href: "/compare", label: "Compare" },
          ]}
          context={context}
          title={title}
          lede={
            <>
              <p>{lede}</p>
              {definition ? (
                <p className="text-[15.5px] leading-[1.6] text-stone">{definition}</p>
              ) : null}
            </>
          }
        >
          {actions}
        </PageHead>

        <ArticleShell outline={outline}>
          <div className={readingFixes}>
            {sections.map((section) =>
              section.title ? (
                <section key={section.id} aria-labelledby={section.id}>
                  <h2 id={section.id}>{section.title}</h2>
                  {section.content}
                </section>
              ) : (
                <div key={section.id} id={section.id}>
                  {section.content}
                </div>
              ),
            )}
          </div>
        </ArticleShell>

        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="border-t border-line" />
        </div>
        <RelatedLinks title={related.title} links={related.links} />
      </article>

      <section aria-labelledby="closing-title" className="border-t border-line bg-wash">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-20 sm:px-8 sm:py-24 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <h2
              id="closing-title"
              className="max-w-[18ch] text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-balance"
            >
              {closing.title}
            </h2>
            <div className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-ink-soft">{closing.body}</div>
          </div>
          {/* Long store labels may wrap on a phone, so the button grows instead of overflowing. */}
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row [&>a]:h-auto [&>a]:min-h-12 [&>a]:py-3 [&>a]:text-center">
            {closing.actions}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/** Where each side wins, in two columns. `ours` is the index of our column. */
export function WinsGrid({
  columns,
  ours,
}: {
  columns: { title: string; items: ReactNode[] }[];
  ours: number;
}) {
  return (
    <div className="my-8 grid gap-x-12 gap-y-10 md:grid-cols-2">
      {columns.map((column, index) => (
        <div
          key={column.title}
          className={index === ours ? "border-t-2 border-red pt-5" : "border-t border-line pt-5"}
        >
          <h3 className="mt-0 text-[19px]">{column.title}</h3>
          <ul className="mb-0 text-[16px] leading-[1.6]">
            {column.items.map((item, itemIndex) => (
              <li key={itemIndex} className="my-2.5">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Parallel verdicts in two columns. */
export function VerdictGrid({ children }: { children: ReactNode }) {
  return <div className="my-8 grid gap-x-12 gap-y-9 md:grid-cols-2">{children}</div>;
}

/** One verdict in a VerdictGrid. `ours` marks our own product. */
export function Verdict({
  title,
  ours = false,
  children,
}: {
  title: string;
  ours?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={ours ? "border-t-2 border-red pt-5" : "border-t border-line pt-5"}>
      <h3 className="mb-2 mt-0 text-[19px]">{title}</h3>
      <p className="mb-0 text-[16px] leading-[1.6]">{children}</p>
    </div>
  );
}

/** A phrase the lede underlines for emphasis. */
export function Pen({ children }: { children: ReactNode }) {
  return (
    <span className="text-ink underline decoration-red decoration-2 underline-offset-[6px]">{children}</span>
  );
}

/** A quieter note under a table or list, such as when the facts were checked. */
export function Aside({ children }: { children: ReactNode }) {
  return <p className="text-[14.5px] leading-[1.6] text-stone">{children}</p>;
}

/** A table with five or six products: wider, so each column gets room before it scrolls. */
export function WideTable({ children }: { children: ReactNode }) {
  return (
    <div className="[&_table]:min-w-[860px] [&_table]:text-[14px] [&_td]:px-3 [&_th]:px-3 [&_thead_th:first-child]:w-[14%]">
      {children}
    </div>
  );
}

export type Fact = { label: string; value: ReactNode };

/** Labelled facts about one product, as a short definition list. */
export function FactList({ facts }: { facts: Fact[] }) {
  return (
    <dl className="mb-0 mt-5 grid gap-x-7 text-[16px] leading-[1.6] sm:grid-cols-[10rem_minmax(0,1fr)]">
      {facts.map((fact) => (
        <div key={fact.label} className="contents">
          <dt className="font-semibold text-ink">{fact.label}</dt>
          <dd className="mb-4 sm:mb-3">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export type Pick = {
  id?: string;
  name: string;
  /** A short line under the name. */
  role?: ReactNode;
  copy?: ReactNode;
  facts: Fact[];
};

/** The entries of a round-up: the name, what it is, and its facts. */
export function PickList({ picks }: { picks: Pick[] }) {
  return (
    <div className="my-8 space-y-12">
      {picks.map((pick) => (
        <article key={pick.name} id={pick.id} className="border-t border-line pt-7">
          <h3 className="mb-0 mt-0 text-[clamp(1.35rem,2.4vw,1.6rem)] leading-[1.15] tracking-[-0.025em]">
            {pick.name}
          </h3>
          {pick.role ? <p className="mb-0 mt-1.5 text-[16px] font-medium text-stone">{pick.role}</p> : null}
          {pick.copy ? <p className="mb-0 mt-4">{pick.copy}</p> : null}
          <FactList facts={pick.facts} />
        </article>
      ))}
    </div>
  );
}
