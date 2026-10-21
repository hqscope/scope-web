type LogoMarkProps = {
  className?: string;
  /** Draws the two lower bars in the current text color instead of ink. */
  inverted?: boolean;
};

/** The three stacked bars from the Scope brand mark. */
export function LogoMark({ className, inverted = false }: LogoMarkProps) {
  const lower = inverted ? "currentColor" : "#241E18";
  return (
    <svg
      viewBox="0 0 58 56"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="32" height="14" rx="7" fill="#C42B26" />
      <rect x="0" y="21" width="46" height="14" rx="7" fill={lower} />
      <rect x="0" y="42" width="58" height="14" rx="7" fill={lower} />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className="h-[18px] w-auto" inverted={inverted} />
      <span className="text-[19px] font-bold tracking-[-0.03em]">Scope</span>
    </span>
  );
}
