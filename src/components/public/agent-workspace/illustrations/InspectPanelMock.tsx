/**
 * Deep-dive illustration (b): the inspect panel that opens beside the office
 * when you click a desk. Presentational only.
 */
const AGENT_REPLY_ONE =
  "On the auth middleware refactor — six files in, tests running now.";
const YOUR_REPLY = "skip the legacy adapter, it's getting deleted";
const AGENT_REPLY_TWO = "on it — I'll fold that into the current pass.";
const FIELD_PLACEHOLDER = "message claude…";

export default function InspectPanelMock() {
  return (
    <>
      <div className="aw-ip" aria-hidden="true">
        <div className="aw-ip-head">
          <div className="aw-ip-avatar" />
          <div className="aw-ip-id">
            <div className="aw-ip-name">Claude · Opus</div>
            <div className="aw-ip-status">● working · 14m 22s</div>
          </div>
          <div className="aw-ip-desk">desk 01</div>
        </div>

        <div className="aw-ip-tiles">
          <div className="aw-ip-tile">
            <div className="aw-ip-tile-num">84K</div>
            <div className="aw-ip-tile-cap">tokens</div>
          </div>
          <div className="aw-ip-tile">
            <div className="aw-ip-tile-num">$2.10</div>
            <div className="aw-ip-tile-cap">cost</div>
          </div>
          <div className="aw-ip-tile">
            <div className="aw-ip-tile-num">62%</div>
            <div className="aw-ip-tile-cap">task</div>
          </div>
        </div>

        <div className="aw-ip-tabs">
          <div className="aw-ip-tab is-active">Chat</div>
          <div className="aw-ip-tab">Terminal</div>
          <div className="aw-ip-tab">Activity</div>
        </div>

        <div className="aw-ip-thread">
          <div className="aw-ip-msg aw-ip-msg--agent">{AGENT_REPLY_ONE}</div>
          <div className="aw-ip-msg aw-ip-msg--you">{YOUR_REPLY}</div>
          <div className="aw-ip-msg aw-ip-msg--agent">{AGENT_REPLY_TWO}</div>
        </div>

        <div className="aw-ip-input">
          <div className="aw-ip-field">
            {FIELD_PLACEHOLDER}
            <span className="aw-ip-caret">▍</span>
          </div>
          <div className="aw-ip-send">Send</div>
        </div>
      </div>
      <p className="sr-only">
        An inspect panel for the Claude Opus session at desk 01: working for 14
        minutes, 84 thousand tokens, $2.10 spent and the task 62 percent done,
        above a chat thread with the agent and a message box.
      </p>
    </>
  );
}
