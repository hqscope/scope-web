/**
 * A notebook cell and its output, on the one dark surface the design
 * sanctions. Mono throughout — this is the only place on the site where
 * the page is showing you a machine rather than a document.
 */

export default function NotebookMock({
  filename,
  kernel,
  code,
  output,
}: {
  filename: string;
  kernel: string;
  code: string[];
  output: string;
}) {
  return (
    <div className="notebook-mock" aria-hidden="true">
      <div className="notebook-mock-head">
        <span>{filename}</span>
        <span>{kernel}</span>
      </div>
      <div className="notebook-mock-body">
        <div className="notebook-mock-cell">
          <span className="notebook-mock-gutter">[1]</span>
          <code>
            {code.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </code>
        </div>
        <div className="notebook-mock-cell notebook-mock-cell--out">
          <span className="notebook-mock-gutter notebook-mock-gutter--out">→</span>
          <code>
            <span>{output}</span>
          </code>
        </div>
      </div>
    </div>
  );
}
