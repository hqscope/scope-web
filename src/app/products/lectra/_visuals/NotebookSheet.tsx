import type { ReactNode } from "react";

import { PenCircle, PenNote } from "./pen";

export type NotebookCell = {
  /** Execution count shown in the margin. */
  n: number;
  code: ReactNode;
  /** What the cell printed or drew. */
  out?: ReactNode;
  /** Circle the output in pen. */
  circled?: boolean;
};

const panel =
  "overflow-hidden rounded-[22px] bg-paper shadow-[0_24px_60px_-24px_rgba(36,30,24,0.35)] ring-1 ring-line";

/** A keyword inside a notebook code cell. */
export function Kw({ children }: { children: ReactNode }) {
  return <span className="text-pen">{children}</span>;
}

/** A string literal inside a notebook code cell. */
export function Str({ children }: { children: ReactNode }) {
  return <span className="text-red-deep">{children}</span>;
}

/**
 * A Lectra Notes notebook with a couple of code cells and what they drew,
 * marked up in pen the way it sits beside handwritten work.
 */
export default function NotebookSheet({
  file,
  kernel,
  cells,
  note,
  label,
}: {
  file: string;
  kernel: string;
  cells: NotebookCell[];
  note?: ReactNode;
  label: string;
}) {
  return (
    <figure aria-label={label} className="m-0">
      <div className={panel}>
        <div className="flex items-center justify-between gap-3 border-b border-line bg-wash px-5 py-3 sm:px-6">
          <span className="min-w-0 truncate text-[13px] font-semibold text-ink">{file}</span>
          <span className="shrink-0 text-[12.5px] text-stone">{kernel}</span>
        </div>

        <div className="space-y-4 px-4 pb-1 pt-5 sm:px-5">
          {cells.map((cell) => (
            <div key={cell.n} className="space-y-3">
              <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2">
                <span className="pt-2.5 font-mono text-[12px] text-stone">[{cell.n}]</span>
                <pre className="min-w-0 whitespace-pre-wrap rounded-[10px] bg-wash px-3.5 py-2.5 font-mono text-[12.5px] leading-[1.6] text-ink [overflow-wrap:anywhere] sm:text-[13px]">
                  <code>{cell.code}</code>
                </pre>
              </div>
              {cell.out ? (
                <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2">
                  <span aria-hidden="true" />
                  <div className="relative min-w-0">
                    {cell.out}
                    {cell.circled ? <PenCircle /> : null}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {note ? <PenNote>{note}</PenNote> : <div className="h-5" />}
      </div>
    </figure>
  );
}

/** A small inline bar chart, the kind a notebook cell draws. */
export function NotebookBars({
  bars,
  label,
}: {
  bars: { name: string; value: number }[];
  label: string;
}) {
  const max = Math.max(...bars.map((bar) => bar.value));
  const top = bars.findIndex((bar) => bar.value === max);
  const width = 300;
  const height = 150;
  const base = 124;
  const slot = (width - 30) / bars.length;
  const barWidth = slot * 0.52;

  return (
    <div className="rounded-[10px] px-1 py-2 ring-1 ring-inset ring-line">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
        className="mx-auto block h-auto w-full max-w-[340px]"
      >
        <line x1="24" y1={base} x2={width} y2={base} className="stroke-line" strokeWidth="1.5" />
        <line x1="24" y1="8" x2="24" y2={base} className="stroke-line" strokeWidth="1.5" />
        {bars.map((bar, index) => {
          const h = (bar.value / max) * (base - 18);
          const x = 30 + index * slot + (slot - barWidth) / 2;
          return (
            <g key={bar.name}>
              <rect
                x={x}
                y={base - h}
                width={barWidth}
                height={h}
                rx="2"
                className={index === top ? "fill-ink" : "fill-[#ddd6cc]"}
              />
              <text
                x={x + barWidth / 2}
                y={base + 17}
                textAnchor="middle"
                className="fill-stone font-sans text-[11px]"
              >
                {bar.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
