/**
 * The Scope mark, drawn inline so it stays crisp at any size and picks up the
 * surrounding page tone. Dark product pages (.public-page--dark) override
 * --scope-mark-ink / --scope-mark-accent in agent-workspace.css.
 *
 * Standalone files live at /brand/scope-mark.svg (light) and
 * /brand/scope-mark-dark.svg for anywhere that needs a real asset URL.
 */
export default function ScopeMark({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      /* Cropped to the artwork bounds (the exported square has ~22% padding),
         so the bars optically match the wordmark's cap height. */
      viewBox="22 21 58 58"
      width={size}
      height={size}
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="22"
        y="22"
        width="32"
        height="14"
        rx="7"
        fill="var(--scope-mark-accent, #c42b26)"
      />
      <rect
        x="22"
        y="43"
        width="46"
        height="14"
        rx="7"
        fill="var(--scope-mark-ink, #241e18)"
      />
      <rect
        x="22"
        y="64"
        width="58"
        height="14"
        rx="7"
        fill="var(--scope-mark-ink, #241e18)"
      />
    </svg>
  );
}
