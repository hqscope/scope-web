import Mark from "@/components/site/Mark";

/* The Mac menu bar with Agent Workspace open: a count of live agents and
   one row per project floor. A still picture, so it is hidden from
   assistive tech and described by the page copy around it. */
const floors = [
  { name: "payments-api", state: "4 sessions, 1 waiting for you", waiting: true },
  { name: "web-client", state: "2 sessions working" },
  { name: "infra", state: "Asleep, nothing running" },
];

export default function MenuBarSlip() {
  return (
    <div className="aw-menubar" aria-hidden="true">
      <div className="aw-menubar-strip">
        <span className="aw-menubar-item">
          <Mark size={16} />
          <span className="aw-menubar-count">6</span>
        </span>
        <span className="aw-menubar-clock">Tue 14:29</span>
      </div>
      <div className="aw-menubar-drop paper">
        <p className="aw-menubar-title">6 agents live on 2 floors</p>
        <ul>
          {floors.map((floor) => (
            <li key={floor.name} data-waiting={floor.waiting || undefined}>
              <strong>{floor.name}</strong>
              <span>{floor.state}</span>
            </li>
          ))}
        </ul>
        <p className="aw-menubar-foot">
          <span>Hire an agent</span>
          <kbd>⌘N</kbd>
        </p>
      </div>
    </div>
  );
}
