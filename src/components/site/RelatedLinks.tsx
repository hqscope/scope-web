import Link from "next/link";

export type RelatedLink = {
  href: string;
  label: string;
  copy: string;
};

/** The pages that continue the reader's question, as an index list. */
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
    <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20" id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
        {title}
      </h2>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="group grid gap-1 py-5 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-8">
              <span className="text-[17px] font-semibold tracking-[-0.015em] text-ink group-hover:text-red">
                {link.label}
              </span>
              <span className="text-[15.5px] leading-[1.55] text-stone">{link.copy}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
