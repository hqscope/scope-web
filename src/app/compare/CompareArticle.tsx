import type { ReactNode } from "react";

import PenMark from "@/components/motion/PenMark";
import Sheet from "@/components/motion/Sheet";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import RelatedLinks, { type RelatedLink } from "@/components/site/RelatedLinks";
import type { HeaderCta } from "@/components/site/nav";
import { comparePath, comparisonsFor } from "@/lib/compare";
import { getGuide, guidePath } from "@/lib/guides";
import { LECTRA_APP_STORE_CAMPAIGN_URL } from "@/lib/site";

import "./compare.css";
import OutlineNav from "./OutlineNav";

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

/**
 * The shared layout of every comparison: one tall sheet holding the head,
 * the reading column with its outline, and the related links, then a
 * closing call to action on the desk.
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
      <Sheet as="article" className="compare-article">
        <PageHead
          crumbs={[
            { href: "/", label: "Home" },
            { href: "/compare", label: "Compare" },
          ]}
          context={context}
          title={title}
          lede={
            <div className="compare-lede">
              <p>{lede}</p>
              {definition ? <p className="compare-def">{definition}</p> : null}
            </div>
          }
        >
          {actions}
        </PageHead>

        <div className="shell reading compare-reading">
          <div className="compare-body">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={section.title ? `${section.id}-title` : undefined}
              >
                {section.title ? (
                  <h2 id={`${section.id}-title`} className="t-head" data-focus>
                    {section.title}
                  </h2>
                ) : null}
                {section.content}
              </section>
            ))}
          </div>
          <OutlineNav items={outline} />
        </div>

        <div className="compare-related">
          <RelatedLinks title={related.title} links={related.links} />
        </div>
      </Sheet>

      <section className="on-desk shell section compare-closing" aria-labelledby="closing-title">
        <h2 id="closing-title" className="t-title" data-focus>
          {closing.title}
        </h2>
        <div className="lede">{closing.body}</div>
        <div className="actions">{closing.actions}</div>
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
    <div className="compare-wins">
      {columns.map((column, index) => (
        <div key={column.title} data-ours={index === ours || undefined}>
          <h3>{column.title}</h3>
          <ul>
            {column.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** A phrase the red pen underlines once, when it scrolls into view. */
export function Pen({ children }: { children: ReactNode }) {
  return (
    <span className="compare-pen">
      {children}
      <PenMark kind="underline" inset="auto -4px -7px -4px" delay={0.3} />
    </span>
  );
}

export type Pick = {
  id?: string;
  name: string;
  /** A short line under the name, in pen. */
  role?: ReactNode;
  copy?: ReactNode;
  facts: { label: string; value: ReactNode }[];
};

/** The entries of a round-up: the name, what it is, and its facts. */
export function PickList({ picks }: { picks: Pick[] }) {
  return (
    <div>
      {picks.map((pick) => (
        <article key={pick.name} id={pick.id} className="compare-pick">
          <h3>{pick.name}</h3>
          {pick.role ? <p className="compare-pick-role">{pick.role}</p> : null}
          {pick.copy ? <p>{pick.copy}</p> : null}
          <dl className="compare-facts">
            {pick.facts.map((fact) => (
              <div key={fact.label} style={{ display: "contents" }}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}
