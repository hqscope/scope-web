import {
  createStudentTaskAction,
  deleteStudentTaskAction,
  updateStudentTaskAction,
} from "@/app/app/actions";
import { StudentTask } from "@/lib/data/models";
import { formatDateTimeLabel } from "@/lib/ui/format";

export default function StudentTaskPanel({
  tasks,
  redirectTo = "/app",
}: {
  tasks: StudentTask[];
  redirectTo?: string;
}) {
  return (
    <section className="app-card rounded-[1.75rem] p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="app-label">My tasks</p>
          <h2 className="mt-2 text-2xl">Keep your own checklist separate from synced assignments</h2>
          <p className="mt-3 max-w-2xl app-copy">
            Add personal reminders, study tasks, or follow-up notes without mixing them into the Canvas assignment feed.
          </p>
        </div>
        <span className="status-chip" data-tone="muted">
          {tasks.filter((task) => task.status === "open").length} open
        </span>
      </div>

      <form action={createStudentTaskAction} className="mt-6 grid gap-3 lg:grid-cols-[1.3fr_0.9fr_auto]">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <input
          type="text"
          name="title"
          required
          maxLength={120}
          placeholder="Add a study task or reminder"
          className="h-12 rounded-[1rem] border border-white/10 bg-[rgba(8,10,14,0.48)] px-4 text-sm text-white outline-none placeholder:text-[var(--color-shell-copy-muted)]"
        />
        <input
          type="datetime-local"
          name="dueAt"
          className="h-12 rounded-[1rem] border border-white/10 bg-[rgba(8,10,14,0.48)] px-4 text-sm text-white outline-none"
        />
        <button type="submit" className="button-primary whitespace-nowrap">
          Add task
        </button>
      </form>

      {tasks.length === 0 ? (
        <div className="empty-panel mt-6">
          <p className="text-lg font-semibold">No personal tasks yet</p>
          <p className="mt-2 app-copy">
            Add the small things you do not want to lose between Canvas, Lectra, and the rest of your week.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {tasks.map((task) => (
            <article
              key={task.id}
              className={`app-card-soft rounded-[1.25rem] p-4 ${
                task.status === "done" ? "opacity-75" : ""
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-white">{task.title}</p>
                    {task.sourceApp !== "canvascope-web" ? (
                      <span className="status-chip" data-tone="muted">
                        {task.sourceApp}
                      </span>
                    ) : null}
                  </div>
                  {task.dueAt ? (
                    <p className="mt-2 text-sm text-[var(--color-shell-copy-muted)]">
                      Due {formatDateTimeLabel(task.dueAt)}
                    </p>
                  ) : null}
                  {task.notes ? (
                    <p className="mt-3 text-sm text-[var(--color-shell-copy)]">{task.notes}</p>
                  ) : null}
                </div>
                <span className="status-chip" data-tone={task.status === "done" ? "good" : "warn"}>
                  {task.status === "done" ? "done" : "open"}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <form action={updateStudentTaskAction}>
                  <input type="hidden" name="taskId" value={task.id} />
                  <input type="hidden" name="redirectTo" value={redirectTo} />
                  <input type="hidden" name="status" value={task.status === "done" ? "open" : "done"} />
                  <button type="submit" className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white">
                    {task.status === "done" ? "Reopen" : "Mark done"}
                  </button>
                </form>
                <form action={deleteStudentTaskAction}>
                  <input type="hidden" name="taskId" value={task.id} />
                  <input type="hidden" name="redirectTo" value={redirectTo} />
                  <button type="submit" className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white">
                    Delete
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
