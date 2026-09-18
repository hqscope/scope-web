import Link from "next/link";

export type RelatedLink = {
  href: string;
  label: string;
  copy: string;
};

/**
 * The pages that continue the reader's question, as an index list. Plain
 * links, so every compare and guide page is reachable from the pages people
 * actually land on.
 */
export default function RelatedLinks({
  title,
  links,
  id = "related",
}: {
  title: string;
  links: RelatedLink[];
  id?: string;
}) {
  if (links.length === 0) return null;

  return (
    <section className="shell section-tight" id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="t-head" data-focus style={{ marginBottom: 28 }}>
        {title}
      </h2>
      <ul className="index-list">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <span className="index-title">
                <span>{link.label}</span>
              </span>
              <span className="index-copy">{link.copy}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
