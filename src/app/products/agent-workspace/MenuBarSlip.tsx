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
    <div
      aria-hidden="true"
      className="select-none overflow-hidden rounded-[22px] bg-wash ring-1 ring-line"
    >
      <div className="flex h-9 items-center justify-end gap-4 border-b border-line bg-paper/80 px-4 text-[12.5px] text-ink">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-ink/[0.06] px-2 py-0.5">
          <Mark size={14} />
          <span className="font-semibold tabular-nums">6</span>
        </span>
        <span className="tabular-nums text-ink-soft">Tue 14:29</span>
      </div>

      <div className="flex justify-end px-4 pb-10 pt-3 sm:px-6 sm:pb-14">
        <div className="w-full max-w-[360px] rounded-2xl bg-paper p-2 shadow-[0_24px_60px_-24px_rgba(36,30,24,0.35)] ring-1 ring-line">
          <p className="px-3 pb-2 pt-2.5 text-[13px] font-semibold text-ink">
            6 agents live on 2 floors
          </p>
          <ul className="space-y-0.5">
            {floors.map((floor) => (
              <li
                key={floor.name}
                className={`flex items-start gap-3 rounded-xl px-3 py-2.5 ${
                  floor.waiting ? "bg-wash" : ""
                }`}
              >
                <span
                  className={`mt-[5px] size-2 shrink-0 rounded-full ${
                    floor.waiting
                      ? "bg-red"
                      : floor.state.startsWith("Asleep")
                        ? "bg-line"
                        : "bg-ink"
                  }`}
                />
                <span className="min-w-0">
                  <strong className="block truncate text-[13.5px] font-semibold text-ink">
                    {floor.name}
                  </strong>
                  <span
                    className={`block text-[12px] ${floor.waiting ? "text-red" : "text-stone"}`}
                  >
                    {floor.state}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-1 flex items-center justify-between border-t border-line px-3 pb-1.5 pt-2.5 text-[12.5px] text-ink-soft">
            <span>Hire an agent</span>
            <kbd className="rounded-md bg-wash px-1.5 py-0.5 text-[11.5px] font-semibold text-ink ring-1 ring-line">
              ⌘N
            </kbd>
          </p>
        </div>
      </div>
    </div>
  );
}
