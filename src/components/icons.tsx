type IconProps = { className?: string };

export function ChromeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 0C8.21 0 4.83 1.76 2.63 4.5l3.95 6.85A5.45 5.45 0 0 1 12 6.55h10.69A12 12 0 0 0 12 0ZM1.93 5.47A11.94 11.94 0 0 0 0 12c0 6.01 4.42 10.99 10.19 11.86l3.95-6.84a5.45 5.45 0 0 1-6.86-2.29L1.93 5.47Zm13.34 2.17a5.45 5.45 0 0 1 1.45 7.09l-5.34 9.26c.2.01.41.01.62.01 6.63 0 12-5.37 12-12 0-1.54-.29-3.01-.82-4.36h-7.91ZM12 16.36a4.36 4.36 0 1 1 0-8.72 4.36 4.36 0 0 1 0 8.72Z" />
    </svg>
  );
}

export function AppleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.15 6.9c-.95 0-2.42-1.08-3.96-1.04-2.04.03-3.91 1.18-4.96 3.01-2.12 3.68-.55 9.1 1.52 12.09 1.01 1.45 2.2 3.09 3.79 3.04 1.52-.07 2.09-.99 3.94-.99 1.83 0 2.35.99 3.96.95 1.64-.03 2.68-1.48 3.68-2.95 1.16-1.69 1.64-3.33 1.66-3.42-.04-.01-3.18-1.22-3.22-4.86-.03-3.04 2.48-4.49 2.6-4.56-1.43-2.09-3.62-2.32-4.39-2.38-2-.16-3.68 1.09-4.62 1.09Zm3.38-3.07c.84-1.01 1.4-2.43 1.25-3.83-1.21.05-2.66.81-3.53 1.82-.78.9-1.45 2.34-1.27 3.71 1.34.1 2.71-.69 3.55-1.7Z" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="8.5" cy="8.5" r="5.75" />
      <path d="m13 13 4.25 4.25" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

const fileKinds = {
  pdf: "PDF",
  page: "Page",
  assignment: "Due",
  video: "Video",
  announcement: "News",
  quiz: "Quiz",
} as const;

export type FileKind = keyof typeof fileKinds;

/** Small typed tile used in search results and file lists. */
export function KindBadge({ kind }: { kind: FileKind }) {
  const tone =
    kind === "pdf"
      ? "bg-red-tint text-red"
      : kind === "assignment" || kind === "quiz"
        ? "bg-[#eef1fb] text-pen"
        : "bg-wash text-stone";
  return (
    <span
      className={`inline-flex h-7 w-11 shrink-0 items-center justify-center rounded-md text-[10.5px] font-semibold ${tone}`}
    >
      {fileKinds[kind]}
    </span>
  );
}
