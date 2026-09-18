import type { ReactNode } from "react";

import Sheet from "@/components/motion/Sheet";
import PageHead from "@/components/site/PageHead";

import GuideOutline, { type OutlineItem } from "./GuideOutline";
import "./guides.css";

/**
 * One guide as one tall sheet of paper: the head, the text with its outline
 * beside it on wide screens, then whatever closes the document (the
 * methodology note, related links).
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
    <Sheet as="article" className="guide" labelledBy="guide-title">
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
      <div className="shell">
        <div className="reading guide-reading">
          <div className="guide-body">{children}</div>
          <GuideOutline items={outline} />
        </div>
      </div>
      {end ? <div className="guide-end">{end}</div> : null}
    </Sheet>
  );
}

/** A top-level part of a guide: an H2 the outline can point at, and its content. */
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
    <section id={id} className="guide-section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} data-focus>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** The closing call to action, sitting on the desk under the guide. */
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
    <section className="on-desk shell section guide-closing" aria-labelledby="guide-closing-title">
      <h2 id="guide-closing-title" className="t-title" data-focus>
        {title}
      </h2>
      <div className="lede">{children}</div>
      <div className="actions">{actions}</div>
    </section>
  );
}
