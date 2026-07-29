"use client";

import { formatClock } from "./sim/engine";
import type { OfficeMeta } from "./sim/store";

export interface SidebarProps {
  meta: OfficeMeta;
  /** Dimmed and pushed aside while the inspect panel is open. */
  tucked: boolean;
}

/** The building list and the running log, exactly where the mockup puts them. */
export default function Sidebar({ meta, tucked }: SidebarProps) {
  return (
    <aside className="aw-demo-sidebar" data-tucked={tucked ? "true" : "false"}>
      <h3 className="aw-demo-sidehead">THE BUILDING</h3>
      <ul className="aw-demo-floors">
        {meta.floors.map((floor) => (
          <li
            key={floor.id}
            className="aw-demo-floor"
            data-current={floor.current ? "true" : "false"}
          >
            <span className="aw-demo-floor-name">{floor.label}</span>
            <span className="aw-demo-floor-counts">
              {floor.quiet ? (
                <span className="aw-demo-floor-quiet">{floor.quiet}</span>
              ) : (
                <>
                  <span className="aw-demo-floor-active">
                    <span aria-hidden="true">●</span>
                    {floor.active}
                  </span>
                  {floor.waiting > 0 ? (
                    <span className="aw-demo-floor-waiting">
                      <span aria-hidden="true">⚠</span>
                      {floor.waiting}
                    </span>
                  ) : null}
                </>
              )}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="aw-demo-sidehead">EVENTS</h3>
      <ol className="aw-demo-events">
        {meta.events.map((event) => (
          <li key={event.id} className="aw-demo-event">
            <span className="aw-demo-event-time">{formatClock(event.atSec)}</span>{" "}
            {event.glyph ? (
              <span className="aw-demo-event-glyph" data-tone={event.tone} aria-hidden="true">
                {event.glyph}{" "}
              </span>
            ) : null}
            {event.text}
          </li>
        ))}
      </ol>

      <p className="aw-demo-hire" aria-hidden="true">
        + hire agent ⌘N
      </p>
    </aside>
  );
}
