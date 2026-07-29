/**
 * Deep-dive illustration (c): a blocked worker hopping with a hand up beside
 * its desk, plus the approval toast. Presentational only.
 */
export default function ApprovalsScene() {
  return (
    <>
      <div className="aw-art-frame aw-art-frame--ap" aria-hidden="true">
        <div className="aw-ap">
          <div className="aw-ap-floor" />

          <div className="aw-ap-worker">
            <div className="aw-ap-chair" />
            <div className="aw-ap-body">
              <div className="aw-ap-head" />
              <div className="aw-ap-eye aw-ap-eye--l" />
              <div className="aw-ap-eye aw-ap-eye--r" />
              <div className="aw-ap-torso" />
              <div className="aw-ap-arm aw-ap-arm--rest" />
              <div className="aw-ap-arm aw-ap-arm--wave" />
            </div>
            <div className="aw-ap-desktop" />
            <div className="aw-ap-deskfront">
              <div className="aw-ap-nameplate">GEMINI · 2.5 PRO</div>
            </div>
            <div className="aw-ap-shadow" />
          </div>

          <div className="aw-ap-toast">
            <div className="aw-ap-toast-avatar" />
            <div className="aw-ap-toast-copy">
              <div className="aw-ap-toast-title">Gemini needs input</div>
              <div className="aw-ap-toast-sub">approve schema change?</div>
            </div>
            <div className="aw-ap-toast-actions">
              <div className="aw-ap-approve">Approve</div>
              <div className="aw-ap-deny">Deny</div>
            </div>
          </div>
        </div>
      </div>
      <p className="sr-only">
        A Gemini worker hops beside its desk with one hand held up, while a
        toast above the floor reads: Gemini needs input — approve schema change?
        — with Approve and Deny buttons.
      </p>
    </>
  );
}
