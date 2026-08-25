/** The planner's morning briefing, as it looks in the side panel. */

export type BriefingItem = {
  label: string;
  course: string;
  /** The first item is the one that is actually urgent. */
  urgent?: boolean;
};

export default function BriefingMock({
  date,
  items,
}: {
  date: string;
  items: BriefingItem[];
}) {
  return (
    <div className="mock-frame" aria-hidden="true">
      <div className="mock-head">
        <span className="mock-brand">Morning briefing</span>
        <span className="mock-meta">{date}</span>
      </div>
      {items.map((item) => (
        <div key={item.label} className="mock-row">
          <span className="mock-dot" data-tone={item.urgent ? undefined : "muted"} />
          <span className="mock-row-body">
            <strong>{item.label}</strong>
          </span>
          <span className="mock-meta">{item.course}</span>
        </div>
      ))}
    </div>
  );
}
