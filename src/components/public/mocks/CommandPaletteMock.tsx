/**
 * The ⌘K palette, drawn rather than run. Every row is static markup: this
 * is a picture of the extension, not a working copy of it, so it costs
 * nothing on the client and never drifts out of sync with real search.
 */

export type PaletteRow = {
  tag: string;
  /** "due" tints the tag red, for a deadline rather than a file. */
  tone?: "due";
  title: string;
  meta: string;
  /** The row under the cursor. Exactly one per palette. */
  active?: boolean;
};

export default function CommandPaletteMock({
  query,
  scope,
  rows,
  footnote,
  large = false,
}: {
  query: string;
  scope: string;
  rows: PaletteRow[];
  footnote: string;
  large?: boolean;
}) {
  return (
    <div
      className={large ? "palette-mock palette-mock-lg" : "palette-mock"}
      aria-hidden="true"
    >
      <div className="palette-mock-input">
        <span className="palette-mock-label">⌘K</span>
        <span className="palette-mock-query">{query}</span>
        <span className="mock-caret" />
        <span className="mock-meta">{scope}</span>
      </div>

      <div className="palette-mock-rows">
        {rows.map((row) => (
          <div
            key={row.title}
            className="palette-mock-row"
            data-active={row.active ? "true" : undefined}
          >
            <span className="mock-tag" data-tone={row.tone}>
              {row.tag}
            </span>
            <span className="mock-row-body">
              <strong>{row.title}</strong>
              <span>{row.meta}</span>
            </span>
            {row.active ? <span className="mock-enter">↵</span> : null}
          </div>
        ))}
      </div>

      <div className="palette-mock-footer">
        <span className="mock-brand">
          <span className="mock-dot" />
          Scope
        </span>
        <span>{footnote}</span>
      </div>
    </div>
  );
}
