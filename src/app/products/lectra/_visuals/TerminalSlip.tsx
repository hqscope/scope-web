import type { ReactNode } from "react";

import PenMark from "@/components/motion/PenMark";

export type TerminalLine = {
  /** A command the person typed, shown after the prompt. */
  cmd?: string;
  /** What the shell printed back. */
  out?: string;
  /** Circle this output line in pen. */
  circled?: boolean;
};

/**
 * A slip of paper with shell history on it: commands, what came back, and
 * the line worth looking at circled in pen.
 */
export default function TerminalSlip({
  title,
  where,
  lines,
  note,
  label,
}: {
  title: string;
  where: string;
  lines: TerminalLine[];
  note?: ReactNode;
  label: string;
}) {
  return (
    <figure className="term" aria-label={label} style={{ margin: 0 }}>
      <div className="paper term-paper">
        <div className="term-bar">
          <span>{title}</span>
          <span>{where}</span>
        </div>
        <ol className="term-lines">
          {lines.map((line, index) =>
            line.cmd !== undefined ? (
              <li key={index} data-cmd="">
                {line.cmd}
              </li>
            ) : (
              <li key={index}>
                {line.circled ? (
                  <span className="term-hit">
                    {line.out}
                    <PenMark
                      kind="circle"
                      inset="-10px -34px -13px -14px"
                      delay={0.35}
                    />
                  </span>
                ) : (
                  line.out
                )}
              </li>
            ),
          )}
          <li data-cmd="">
            <span className="term-cursor" aria-hidden="true" />
          </li>
        </ol>
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
