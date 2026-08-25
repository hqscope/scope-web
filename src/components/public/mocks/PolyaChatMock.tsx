/**
 * One exchange with Polya. The point of the picture is the pair of source
 * chips at the bottom — a hint with nothing to click back to is exactly
 * what this product refuses to ship.
 */

export default function PolyaChatMock({
  header,
  question,
  answer,
  sources,
  replyHint,
}: {
  header?: string;
  question: string;
  answer: string;
  sources: string[];
  replyHint?: string;
}) {
  return (
    <div className="mock-frame" aria-hidden="true">
      {header ? (
        <div className="mock-head">
          <span className="mock-brand">
            <span className="mock-dot" />
            Polya
          </span>
          <span className="mock-meta">{header}</span>
        </div>
      ) : null}

      <div className="mock-turn">
        <span className="mock-turn-label">You</span>
        <p className="mock-turn-question">{question}</p>
      </div>

      <div className="mock-turn mock-turn--answer">
        <span className="mock-turn-label mock-turn-label--brand">Polya</span>
        <p className="mock-turn-answer">{answer}</p>
        <div className="mock-cites">
          {sources.map((source) => (
            <span key={source} className="cite-chip">
              <span className="mock-dot" />
              {source} ↗
            </span>
          ))}
        </div>
      </div>

      {replyHint ? (
        <div className="mock-reply">
          <span>Reply…</span>
          <span className="mock-caret" />
          <span className="mock-meta">{replyHint}</span>
        </div>
      ) : null}
    </div>
  );
}
