import type { ReactNode } from "react";

export type ComparisonRow = {
  label: string;
  cells: ReactNode[];
};

/**
 * Accessible comparison table for /compare pages. Scrolls horizontally inside
 * its own container on narrow screens; the page never scrolls sideways.
 */
export default function ComparisonTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: ComparisonRow[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)]">
      <table className="w-full min-w-[640px] border-collapse text-left text-[0.92rem]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-[var(--color-line)]">
            <th scope="col" className="px-4 py-3.5 font-semibold text-[var(--color-ink-faint)]">
              &nbsp;
            </th>
            {columns.map((column) => (
              <th
                scope="col"
                key={column}
                className="px-4 py-3.5 font-semibold text-[var(--color-ink)]"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-[var(--color-line-soft)] align-top last:border-b-0"
            >
              <th
                scope="row"
                className="px-4 py-3.5 font-medium text-[var(--color-ink-soft)]"
              >
                {row.label}
              </th>
              {row.cells.map((cell, index) => (
                <td
                  key={`${row.label}-${columns[index] ?? index}`}
                  className="px-4 py-3.5 leading-relaxed text-[var(--color-ink-soft)]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
