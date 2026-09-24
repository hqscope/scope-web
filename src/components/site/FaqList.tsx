import type { ReactNode } from "react";

export type FaqItem = {
  question: string;
  /** Plain text feeds FAQ schema; `body` can carry links for the page. */
  answer: string;
  body?: ReactNode;
};

/**
 * Question-shaped headings in native <details>. It works without JS, and on
 * browsers with interpolate-size the answer eases open instead of jumping.
 */
export default function FaqList({
  items,
  headingLevel = 3,
}: {
  items: FaqItem[];
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.question} className="faq-item">
          <summary>
            <Heading style={{ font: "inherit", letterSpacing: "inherit" }}>
              {item.question}
            </Heading>
          </summary>
          <div className="faq-answer">{item.body ?? <p>{item.answer}</p>}</div>
        </details>
      ))}
    </div>
  );
}
