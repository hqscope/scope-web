/**
 * Deep-dive illustration (a): the building, drawn as three stacked isometric
 * floor plates. Presentational only — the art is aria-hidden and described by
 * the adjacent sr-only paragraph.
 */
export default function FloorsStack() {
  return (
    <>
      <div className="aw-art-frame aw-art-frame--fs" aria-hidden="true">
        <div className="aw-fs">
          <div className="aw-fs-layer aw-fs-layer--f3">
            <div className="aw-fs-plate aw-fs-plate--f3" />
            <p className="aw-fs-label aw-fs-label--f3">F3 · infra</p>
          </div>

          <div className="aw-fs-layer aw-fs-layer--f2">
            <div className="aw-fs-plate aw-fs-plate--f2">
              <div className="aw-fs-dot aw-fs-dot--f2codex" />
            </div>
            <p className="aw-fs-label aw-fs-label--f2">F2 · web-client</p>
          </div>

          <div className="aw-fs-layer aw-fs-layer--f1">
            <div className="aw-fs-plate aw-fs-plate--f1">
              <div className="aw-fs-dot aw-fs-dot--claude" />
              <div className="aw-fs-dot aw-fs-dot--waiting" />
              <div className="aw-fs-dot aw-fs-dot--codex" />
            </div>
            <p className="aw-fs-label aw-fs-label--f1">
              <span>F1 · payments-api</span>
            </p>
          </div>

          <div className="aw-fs-elevator">
            <span />
            <span />
            <span className="aw-fs-elevator-car" />
            <span />
          </div>
        </div>
      </div>
      <p className="sr-only">
        Three floor plates stacked like an office building: F3 infra and F2
        web-client above, F1 payments-api lit up in front with a crew of three —
        one of them waiting on you — and an elevator marker resting beside them.
      </p>
    </>
  );
}
