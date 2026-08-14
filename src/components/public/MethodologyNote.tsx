/**
 * The honesty block every /compare page carries: how the facts were compiled,
 * when, and what Lectra Notes does not do. Credibility is the strategy —
 * this note is load-bearing, not boilerplate.
 */
export default function MethodologyNote({
  dateChecked,
  extraConcessions = [],
}: {
  dateChecked: string;
  extraConcessions?: string[];
}) {
  const concessions = [
    "Audio: Lectra Notes does not record lectures or sync audio to notes today.",
    "Cross-device: annotations do not yet sync between devices — documents are backed up, not mirrored.",
    "Maturity: Lectra Notes shipped in 2026; the apps compared here have had years longer to polish.",
    ...extraConcessions,
  ];

  return (
    <aside
      className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper-deep)] p-6"
      aria-label="How this comparison was made"
    >
      <h2 className="text-base font-semibold text-[var(--color-ink)]">
        How this comparison was made
      </h2>
      <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
        Competitor facts were compiled on {dateChecked} from each app&apos;s
        published pricing pages, documentation, and App Store listings — not
        from hands-on testing of every feature. Lectra Notes facts come from
        its own engineering claims ledger, which tracks every public claim
        against the shipping code. If something here is out of date,{" "}
        <a href="mailto:canvascopeextension@gmail.com">tell us</a> and
        we&apos;ll correct it.
      </p>
      <p className="mt-4 text-[0.92rem] font-medium text-[var(--color-ink)]">
        Where Lectra Notes falls short today:
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
        {concessions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
