import type { ReactNode } from "react";

import { PenCircle, PenNote } from "./pen";

export type TerminalLine = {
  /** A command the person typed, shown after the prompt. */
  cmd?: string;
  /** What the shell printed back. */
  out?: string;
  /** Circle this output line in pen. */
  circled?: boolean;
};

const panel =
  "overflow-hidden rounded-[22px] bg-paper shadow-[0_24px_60px_-24px_rgba(36,30,24,0.35)] ring-1 ring-line";

function Prompt() {
  return (
    <span aria-hidden="true" className="mr-2 font-semibold text-pen">
      $
    </span>
  );
}

/**
 * A Lectra Notes terminal pane: commands, what came back, and the line worth
 * looking at circled in pen.
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
    <figure aria-label={label} className="m-0">
      <div className={panel}>
        <div className="flex items-center justify-between gap-3 border-b border-line bg-wash px-5 py-3 sm:px-6">
          <span className="text-[13px] font-semibold text-ink">{title}</span>
          <span className="min-w-0 truncate font-mono text-[12.5px] text-stone">{where}</span>
        </div>
        <ol className="px-5 pb-1 pt-5 font-mono text-[12.5px] leading-[1.6] sm:px-6 sm:text-[13.5px]">
          {lines.map((line, index) =>
            line.cmd !== undefined ? (
              <li
                key={index}
                className="mt-3 whitespace-pre-wrap text-ink [overflow-wrap:anywhere] first:mt-0"
              >
                <Prompt />
                {line.cmd}
              </li>
            ) : (
              <li
                key={index}
                className={`whitespace-pre-wrap [overflow-wrap:anywhere] ${
                  line.circled ? "my-2.5 text-ink" : "text-stone"
                }`}
              >
                {line.circled ? (
                  <span className="relative inline-block">
                    {line.out}
                    <PenCircle />
                  </span>
                ) : (
                  line.out
                )}
              </li>
            ),
          )}
          <li className="mt-3">
            <Prompt />
            <span
              aria-hidden="true"
              className="inline-block h-[1.05em] w-[0.6em] animate-caret bg-ink/75 align-[-0.18em]"
            />
          </li>
        </ol>
        {note ? <PenNote>{note}</PenNote> : <div className="h-5" />}
      </div>
    </figure>
  );
}
