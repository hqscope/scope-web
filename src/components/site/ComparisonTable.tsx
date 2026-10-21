import type { ReactNode } from "react";

export type ComparisonRow = {
  label: string;
  cells: ReactNode[];
};

/**
 * Comparison table for /compare and /guides pages. It scrolls sideways inside
 * its own frame on narrow screens, so the page never does. `ours` is the index
 * of our own product's column, which gets a faint tint.
 */
export default function ComparisonTable({
  caption,
  columns,
  rows,
  ours,
}: {
  caption: string;
  columns: string[];
  rows: ComparisonRow[];
  ours?: number;
}) {
  return (
    <div className="my-8">
      <div
        className="overflow-x-auto rounded-[18px] bg-paper ring-1 ring-line"
        tabIndex={0}
        role="region"
        aria-label={caption}
      >
        <table className="w-full min-w-[640px] border-collapse text-left text-[14.5px]">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-wash">
              <th scope="col" className="w-[22%] px-4 py-3">
                <span className="sr-only">Feature</span>
              </th>
              {columns.map((column, index) => (
                <th
                  scope="col"
                  key={column}
                  className={`px-4 py-3 text-[13.5px] font-semibold ${index === ours ? "bg-red-tint text-red" : "text-ink"}`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={row.label} className="align-top">
                <th scope="row" className="px-4 py-3.5 text-[14px] font-semibold text-ink">
                  {row.label}
                </th>
                {row.cells.map((cell, index) => (
                  <td
                    key={`${row.label}-${columns[index] ?? index}`}
                    className={`px-4 py-3.5 leading-[1.5] text-ink-soft ${index === ours ? "bg-red-tint/40" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[13px] text-stone sm:hidden">Swipe the table sideways to see every column.</p>
    </div>
  );
}
