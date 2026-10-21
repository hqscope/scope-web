import type { ReactNode } from "react";

export type FaqItem = {
  question: string;
  /** Plain text feeds FAQ schema; `body` can carry links for the page. */
  answer: string;
  body?: ReactNode;
};

/** Question-shaped headings in native <details>, so it works without JS. */
export default function FaqList({
  items,
  headingLevel = 3,
}: {
  items: FaqItem[];
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="faq-item group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 [&::-webkit-details-marker]:hidden">
            <Heading className="m-0 text-[16.5px] font-semibold tracking-[-0.01em] text-ink">{item.question}</Heading>
            <span aria-hidden="true" className="relative size-4 shrink-0">
              <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-stone" />
              <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-stone transition-transform group-open:scale-y-0" />
            </span>
          </summary>
          <div className="prose-scope max-w-[64ch] pb-5">{item.body ?? <p>{item.answer}</p>}</div>
        </details>
      ))}
    </div>
  );
}
