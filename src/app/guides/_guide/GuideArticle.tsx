import type { ReactNode } from "react";

import ArticleShell, { type OutlineItem } from "@/components/site/ArticleShell";
import PageHead from "@/components/site/PageHead";

/**
 * One guide: the head, the text with its "On this page" outline beside it on
 * wide screens, then whatever closes the document (related links).
 *
 * The body renders inside ArticleShell's `.prose-scope`. A few shared blocks
 * that carry their own headings (FaqList's question headings, the
 * MethodologyNote panel) would otherwise pick up the long-form heading
 * margins, so the wrapper below zeroes those.
 */
export default function GuideArticle({
  context,
  title,
  lede,
  outline,
  children,
  end,
}: {
  context: ReactNode;
  title: ReactNode;
  lede: ReactNode;
  outline: OutlineItem[];
  children: ReactNode;
  end?: ReactNode;
}) {
  return (
    <article aria-labelledby="guide-title">
      <PageHead
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
        ]}
        context={context}
        title={<span id="guide-title">{title}</span>}
        lede={lede}
        wide
      />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="border-t border-line" />
      </div>
      <div className="pt-10 sm:pt-14">
        <ArticleShell outline={outline}>
          <div className="[&_aside>h2]:my-0 [&_aside_p]:mb-0 [&_aside_ul]:mb-0 [&_summary_h3]:m-0">
            {children}
          </div>
        </ArticleShell>
      </div>
      {end ? (
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="border-t border-line" />
        </div>
      ) : null}
      {end}
    </article>
  );
}

/**
 * A top-level part of a guide: an H2 the outline points at, and its content.
 * The heading carries the outline id, so `#id` links land on it.
 */
export function GuideSection({
  id,
  title,
  children,
}: {
  id: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mt-16 first:mt-0 sm:mt-20">
      <h2 id={id} className="mt-0">
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * Lets a comparison table use the whole article column on wide screens
 * instead of the reading measure, so four text columns are not squeezed.
 * The column is the 1200px container (less 32px padding each side) minus
 * the 14rem outline and 4rem gap: 848px at full width, 100vw - 352px below
 * that. 368px leaves room for a classic scrollbar inside 100vw.
 */
export function GuideWide({ children }: { children: ReactNode }) {
  return <div className="lg:w-[min(calc(100vw-368px),848px)]">{children}</div>;
}

export type GuideListItem = { title: ReactNode; copy: ReactNode };

/**
 * A list of short titles with a sentence or two each: checklists, tips, and
 * what-you-get lists. `terms` sets the title beside its copy on wider
 * screens, for lists whose titles are one or two words.
 */
export function GuideList({
  items,
  terms = false,
}: {
  items: GuideListItem[];
  terms?: boolean;
}) {
  return (
    <ul className="my-8 list-none divide-y divide-line border-y border-line pl-0">
      {items.map((item, index) => (
        <li
          key={index}
          className={`m-0 grid gap-1.5 px-0 py-5 ${
            terms ? "sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6" : ""
          }`}
        >
          <strong className="text-[16.5px] font-semibold leading-[1.4] tracking-[-0.01em] text-ink">
            {item.title}
          </strong>
          <span className="text-[16px] leading-[1.65] text-ink-soft">{item.copy}</span>
        </li>
      ))}
    </ul>
  );
}

/** The closing call to action under the guide. */
export function GuideClosing({
  title,
  children,
  actions,
}: {
  title: string;
  children: ReactNode;
  actions: ReactNode;
}) {
  return (
    <section
      aria-labelledby="guide-closing-title"
      className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-8 sm:pb-32"
    >
      <div className="grid gap-8 rounded-[22px] bg-wash p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
        <div>
          <h2
            id="guide-closing-title"
            className="max-w-[18ch] text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
          >
            {title}
          </h2>
          <div className="mt-4 max-w-[56ch] space-y-4 text-[17px] leading-[1.6] text-stone">
            {children}
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">{actions}</div>
      </div>
    </section>
  );
}
