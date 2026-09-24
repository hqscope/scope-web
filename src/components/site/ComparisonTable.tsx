import type { ReactNode } from "react";

export type ComparisonRow = {
  label: string;
  cells: ReactNode[];
};

/**
 * Comparison table for /compare and /guides pages. It scrolls sideways inside
 * its own plane on narrow screens, so the page never does. `ours` is the index
 * of our own product's column, which gets a faint highlighter wash.
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
    <div>
      <div className="table-wrap" tabIndex={0} role="region" aria-label={caption}>
        <table>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Feature</span>
              </th>
              {columns.map((column, index) => (
                <th scope="col" key={column} data-ours={index === ours || undefined}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.cells.map((cell, index) => (
                  <td
                    key={`${row.label}-${columns[index] ?? index}`}
                    data-ours={index === ours || undefined}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="table-hint">Swipe the table sideways to see every column.</p>
    </div>
  );
}
