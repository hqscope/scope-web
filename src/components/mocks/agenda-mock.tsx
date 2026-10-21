// A drawn version of the extension's agenda across courses. Decorative.

const GROUPS = [
  {
    label: "Overdue",
    tone: "text-red",
    items: [{ title: "Reading response 6", course: "HIST 7B", time: "Yesterday", color: "#7c5cbf" }],
  },
  {
    label: "Today",
    tone: "text-ink",
    items: [
      { title: "Quiz 4: Stereochemistry", course: "CHEM 3A", time: "5:00 PM", color: "#1f8a5b" },
      { title: "Discussion post: Week 8", course: "HIST 7B", time: "11:59 PM", color: "#7c5cbf" },
    ],
  },
  {
    label: "This week",
    tone: "text-ink",
    items: [
      { title: "Lab 5: Grouping and pivot tables", course: "DATA C100", time: "Thu", color: "#d07a12" },
      { title: "Homework 6: Joint distributions", course: "STAT 134", time: "Fri", color: "#2447c9" },
      { title: "Essay 2 draft", course: "HIST 7B", time: "Sun", color: "#7c5cbf" },
    ],
  },
] as const;

export function AgendaMock() {
  return (
    <div aria-hidden="true" className="select-none overflow-hidden rounded-2xl bg-paper shadow-[0_24px_60px_-24px_rgba(36,30,24,0.35)] ring-1 ring-line">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="text-[13px] font-semibold text-ink">What&apos;s due</p>
        <p className="text-[11.5px] text-stone">4 courses</p>
      </div>
      <div className="divide-y divide-line">
        {GROUPS.map((group) => (
          <div key={group.label} className="px-5 py-3">
            <p className={`text-[11.5px] font-semibold ${group.tone}`}>{group.label}</p>
            <ul className="mt-2 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.title} className="flex items-center gap-3">
                  <span className="size-2 shrink-0 rounded-full" style={{ background: item.color }} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] text-ink">{item.title}</span>
                    <span className="block text-[11.5px] text-stone">{item.course}</span>
                  </span>
                  <span className="shrink-0 text-[12px] tabular-nums text-stone">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
