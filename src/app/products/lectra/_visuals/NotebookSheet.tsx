import type { ReactNode } from "react";

import PenMark from "@/components/motion/PenMark";

export type NotebookCell = {
  /** Execution count shown in the margin. */
  n: number;
  code: ReactNode;
  /** What the cell printed or drew. */
  out?: ReactNode;
  /** Circle the output in pen. */
  circled?: boolean;
};

/**
 * A page of notebook paper with code cells on it, the way a Lectra Notes
 * notebook sits beside handwritten work. The red margin rule, the circled
 * output, and the note in the margin are the pen.
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
    <figure className="nb" aria-label={label} style={{ margin: 0 }}>
      <div className="paper nb-paper">
        <div className="nb-bar">
          <span className="nb-file">{file}</span>
          <span className="nb-kernel">{kernel}</span>
        </div>

        {cells.map((cell) => (
          <div key={cell.n}>
            <div className="nb-row">
              <span className="nb-n">[{cell.n}]</span>
              <pre className="nb-code">
                <code>{cell.code}</code>
              </pre>
            </div>
            {cell.out ? (
              <div className="nb-row">
                <span className="nb-n" aria-hidden="true" />
                <div className="nb-out">
                  {cell.out}
                  {cell.circled ? (
                    <PenMark
                      kind="circle"
                      inset="-10px -34px -13px -14px"
                      delay={0.35}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        ))}

        {note ? (
          <p className="nb-note">
            <svg viewBox="0 0 34 30" aria-hidden="true">
              <path d="M31 27C22 26 12 20 7 5" />
              <path d="M2.5 10.5 6.8 4.2l6 3.4" />
            </svg>
            <span>{note}</span>
          </p>
        ) : null}
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
    <div style={{ position: "relative" }}>
      <svg
        className="nb-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
      >
        <line className="axis" x1="24" y1={base} x2={width} y2={base} />
        <line className="axis" x1="24" y1="8" x2="24" y2={base} />
        {bars.map((bar, index) => {
          const h = (bar.value / max) * (base - 18);
          const x = 30 + index * slot + (slot - barWidth) / 2;
          return (
            <g key={bar.name}>
              <rect
                className={index === top ? "bar bar-hi" : "bar"}
                x={x}
                y={base - h}
                width={barWidth}
                height={h}
                rx="2"
              />
              <text x={x + barWidth / 2} y={base + 16} textAnchor="middle">
                {bar.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
