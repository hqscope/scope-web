"use client";

import { type CSSProperties, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  Check,
  Command,
  FileText,
  Layers3,
  Search,
  Send,
} from "lucide-react";

type DemoItemType = "assignment" | "course" | "discussion" | "file" | "pdf" | "quiz" | "syllabus";

type DemoItem = {
  id: string;
  title: string;
  course: string;
  type: DemoItemType;
  due?: string;
  source: string;
  summary: string;
  accent: string;
  lectraReady?: boolean;
};

const demoItems: DemoItem[] = [
  {
    id: "lecture-participation",
    title: "Lecture Participation - Lect 34 04...",
    course: "2026 Spring Biology 1A",
    type: "assignment",
    due: "Tonight, 11:59 PM",
    source: "Assignments / Week 12",
    summary: "Participation item with a same-day deadline and lecture context attached.",
    accent: "#45c18d",
  },
  {
    id: "syllabus",
    title: "Syllabus (Chem 3B - Fall 2025).pdf",
    course: "Chem 3B (Fall 2025)",
    type: "pdf",
    source: "Files / Course policies",
    summary: "PDF indexed from the course file library. Ready for Lectra if annotation matters.",
    accent: "#f3b35a",
    lectraReady: true,
  },
  {
    id: "epoxides",
    title: "W. Epoxides as electrophiles",
    course: "Chem 3A (Spring 2025)",
    type: "pdf",
    source: "Modules / Organic mechanisms",
    summary: "Lecture PDF with course, module, and file metadata preserved in the index.",
    accent: "#d53228",
    lectraReady: true,
  },
  {
    id: "syn-additions",
    title: "V. Syn additions to alkenes",
    course: "Chem 3A (Spring 2025)",
    type: "pdf",
    source: "Modules / Alkene reactions",
    summary: "High-value reading packet surfaced from Canvas files and module links.",
    accent: "#d53228",
    lectraReady: true,
  },
  {
    id: "physics",
    title: "PHYS 8A-002: Introductory Physics",
    course: "PHYS 8A-002: Introductory Physics",
    type: "syllabus",
    source: "Course home",
    summary: "Course shell, syllabus, and recent pages grouped under one searchable result.",
    accent: "#2d6cdf",
  },
  {
    id: "systems-quiz",
    title: "Midterm review quiz",
    course: "Systems Design",
    type: "quiz",
    due: "Tomorrow, 9:00 AM",
    source: "Quizzes / Review",
    summary: "Planner-aware result shown ahead of older readings because it has a due date.",
    accent: "#8b5cf6",
  },
  {
    id: "neuro-course",
    title: "Neuroscience 132 course home",
    course: "Neuroscience 132",
    type: "course",
    source: "Courses",
    summary: "Jump target for the indexed course, including files, pages, assignments, and modules.",
    accent: "#10a37f",
  },
];

const courseRail = [
  { label: "Biology 1A", detail: "684 indexed items", accent: "#45c18d" },
  { label: "Chem 3A", detail: "242 files and pages", accent: "#d53228" },
  { label: "Neuroscience 132", detail: "course map ready", accent: "#10a37f" },
  { label: "Physics 8A", detail: "syllabus and modules", accent: "#2d6cdf" },
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function labelFor(type: DemoItemType): string {
  if (type === "pdf") {
    return "PDF";
  }

  return type.toUpperCase();
}

function getResults(query: string): DemoItem[] {
  const normalized = normalize(query);

  if (!normalized) {
    return demoItems.slice(0, 5);
  }

  if (normalized.startsWith("/due")) {
    return demoItems.filter((item) => Boolean(item.due));
  }

  if (normalized.startsWith("/course")) {
    const term = normalized.replace("/course", "").trim();

    return demoItems.filter((item) => {
      const courseMatch = item.course.toLowerCase().includes(term);
      const titleMatch = item.title.toLowerCase().includes(term);

      return item.type === "course" || !term || courseMatch || titleMatch;
    });
  }

  if (normalized.startsWith("/lectra")) {
    return demoItems.filter((item) => item.lectraReady);
  }

  return demoItems.filter((item) =>
    [item.title, item.course, item.type, item.source].join(" ").toLowerCase().includes(normalized),
  );
}

export default function CanvascopeSearchDemo() {
  const [query, setQuery] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(demoItems[0].id);
  const [sentItemId, setSentItemId] = useState<string | null>(null);

  const results = useMemo(() => getResults(query), [query]);
  const selectedItem = useMemo(
    () => results.find((item) => item.id === selectedItemId) ?? results[0] ?? demoItems[0],
    [results, selectedItemId],
  );
  const sentToLectra = selectedItem.lectraReady && sentItemId === selectedItem.id;

  function applyCommand(command: string): void {
    setQuery(command);
    const commandResults = getResults(command);

    if (commandResults[0]) {
      setSelectedItemId(commandResults[0].id);
    }
  }

  function sendToLectra(item: DemoItem): void {
    setSelectedItemId(item.id);
    setSentItemId(item.id);
  }

  return (
    <section className="search-demo-shell" aria-label="Interactive Scope search mock">
      <div className="canvascope-overlay-stage">
        <aside className="overlay-course-rail" aria-label="Indexed courses">
          <div className="overlay-rail-header">
            <Layers3 className="h-4 w-4" aria-hidden="true" />
            <span>Local index</span>
          </div>
          {courseRail.map((course) => {
            const active = selectedItem.course.includes(course.label);

            return (
              <button
                key={course.label}
                type="button"
                className="overlay-course-card"
                data-active={active}
                onClick={() => applyCommand(`/course ${course.label.toLowerCase().split(" ")[0]}`)}
                style={{ "--course-accent": course.accent } as CSSProperties}
              >
                <strong>{course.label}</strong>
                <span>{course.detail}</span>
              </button>
            );
          })}
          <div className="overlay-index-meter">
            <span>Indexed now</span>
            <strong>1,149</strong>
            <small>items across Canvas and Brightspace</small>
          </div>
        </aside>

        <div className="canvascope-palette">
          <div className="palette-input-row">
            <div className="palette-command-icon" aria-hidden="true">
              <Command className="h-5 w-5" />
            </div>
            <input
              aria-label="Try the Scope search demo"
              autoComplete="off"
              className="palette-input"
              placeholder="Search coursework or type /due"
              spellCheck={false}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <kbd>⌘K</kbd>
          </div>

          <div className="palette-hints" aria-label="Command examples">
            <button type="button" onClick={() => applyCommand("/due")}>
              /due
            </button>
            <button type="button" onClick={() => applyCommand("/course neuro")}>
              /course neuro
            </button>
            <button type="button" onClick={() => applyCommand("/lectra pdf")}>
              /lectra pdf
            </button>
          </div>

          <p className="palette-section-label">
            {query ? "Matching Scope results" : "Recently opened"}
          </p>

          <div className="palette-results" role="listbox" aria-label="Mock search results">
            {results.length > 0 ? (
              results.map((item) => {
                const isSelected = selectedItem.id === item.id;
                const isSent = sentItemId === item.id;

                return (
                  <article
                    key={item.id}
                    className="palette-result"
                    data-active={isSelected}
                    role="option"
                    aria-selected={isSelected}
                    style={{ "--course-accent": item.accent } as CSSProperties}
                  >
                    <button
                      type="button"
                      className="palette-result-main-button"
                      onClick={() => setSelectedItemId(item.id)}
                    >
                      <span className="palette-result-icon" aria-hidden="true">
                        {item.type === "course" ? (
                          <BookOpen className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </span>
                      <span className="palette-result-main">
                        <strong>{item.title}</strong>
                        <span>{item.course}</span>
                        {item.due ? (
                          <small>
                            <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                            Due {item.due}
                          </small>
                        ) : null}
                      </span>
                    </button>
                    <div className="palette-result-actions">
                      {item.lectraReady ? (
                        <button type="button" onClick={() => sendToLectra(item)}>
                          {isSent ? (
                            <>
                              <Check className="h-3.5 w-3.5" aria-hidden="true" />
                              Sent
                            </>
                          ) : (
                            <>
                              <Send className="h-3.5 w-3.5" aria-hidden="true" />
                              Lectra
                            </>
                          )}
                        </button>
                      ) : null}
                      <span>{labelFor(item.type)}</span>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="palette-empty" role="status">
                <p>No mock results matched that query.</p>
                <button type="button" onClick={() => setQuery("")}>
                  Reset
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          <div className="palette-footer">
            <span>Scope</span>
            <span>
              <kbd>↑↓</kbd> navigate <kbd>↵</kbd> select <kbd>esc</kbd> close
            </span>
          </div>
        </div>

        <aside className="overlay-detail-panel" aria-label="Selected Scope result">
          <div className="overlay-detail-header">
            <Search className="h-4 w-4" aria-hidden="true" />
            <span>Selected result</span>
          </div>
          <div className="overlay-detail-body" style={{ "--course-accent": selectedItem.accent } as CSSProperties}>
            <p>{labelFor(selectedItem.type)}</p>
            <h3>{selectedItem.title}</h3>
            <span>{selectedItem.course}</span>
            <div className="overlay-detail-source">{selectedItem.source}</div>
            <p>{selectedItem.summary}</p>
          </div>
          <div className="overlay-detail-actions">
            <button type="button">
              Open result
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            {selectedItem.lectraReady ? (
              <button type="button" onClick={() => sendToLectra(selectedItem)} data-state={sentToLectra ? "sent" : "ready"}>
                {sentToLectra ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    Queued for Lectra
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    Send to Lectra
                  </>
                )}
              </button>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  );
}
