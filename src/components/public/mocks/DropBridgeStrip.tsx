import { Fragment } from "react";

/**
 * A file's round trip: out of the browser, through the iPad, back into the
 * upload it came from. The dashed border marks it as a trace of something
 * that happened, not a control panel.
 */

const stages = [
  { where: "Chrome", what: "pset4.pdf sent", at: "09:41", done: false },
  { where: "iPad", what: "annotated in Lectra", at: "09:45", done: false },
  { where: "Chrome", what: "delivered to the upload", at: "09:47", done: true },
];

export default function DropBridgeStrip() {
  return (
    <div className="flow-strip" aria-hidden="true">
      {stages.map((stage, index) => (
        <Fragment key={stage.at}>
          {index > 0 ? <span className="flow-arrow">→</span> : null}
          <div className="flow-card">
            <span>{stage.where}</span>
            <strong>
              {stage.done ? (
                <span className="mock-dot" data-tone="done" />
              ) : null}
              {stage.what}
            </strong>
            <small data-tone={stage.done ? "done" : undefined}>{stage.at}</small>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
