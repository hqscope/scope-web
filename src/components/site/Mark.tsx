/**
 * The Scope mark: a red bar over two ink bars. Colours come from
 * --mark-accent and --mark-ink, which the desk and the paper each set, so
 * the mark reads correctly on either.
 *
 * Geometry is unchanged from the store icons. Standalone files live in
 * /public/brand for anywhere that needs a real asset URL.
 */
export default function Mark({
  className,
  size = 28,
  title,
}: {
  className?: string;
  size?: number;
  title?: string;
}) {
  return (
    <svg
      viewBox="22 21 58 58"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <rect x="22" y="22" width="32" height="14" rx="7" fill="var(--mark-accent, #c42b26)" />
      <rect x="22" y="43" width="46" height="14" rx="7" fill="var(--mark-ink, #241e18)" />
      <rect x="22" y="64" width="58" height="14" rx="7" fill="var(--mark-ink, #241e18)" />
    </svg>
  );
}
