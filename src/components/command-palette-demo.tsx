"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { CheckIcon, KindBadge, SearchIcon, type FileKind } from "@/components/icons";

type Item = {
  id: string;
  title: string;
  course: string;
  kind: FileKind;
  meta: string;
};

// A sample of what a student's index looks like. Nothing here is real data.
const ITEMS: Item[] = [
  { id: "a", title: "Midterm 1 review slides", course: "STAT 134", kind: "pdf", meta: "Lecture 14" },
  { id: "b", title: "Midterm 1 study guide", course: "CHEM 3A", kind: "pdf", meta: "Week 7 module" },
  { id: "c", title: "Midterm logistics and formula sheet rules", course: "STAT 134", kind: "announcement", meta: "Announcement" },
  { id: "d", title: "Homework 6: Joint distributions", course: "STAT 134", kind: "assignment", meta: "Due Friday" },
  { id: "e", title: "Lab 5: Grouping and pivot tables", course: "DATA C100", kind: "assignment", meta: "Due Thursday" },
  { id: "f", title: "Lecture 12: Conditional expectation", course: "STAT 134", kind: "video", meta: "48 min" },
  { id: "g", title: "Reaction mechanisms practice set", course: "CHEM 3A", kind: "pdf", meta: "Discussion 6" },
  { id: "h", title: "Syllabus", course: "CHEM 3A", kind: "page", meta: "Course page" },
  { id: "i", title: "Project 1: Housing prices", course: "DATA C100", kind: "page", meta: "Project spec" },
  { id: "j", title: "Reading: Reconstruction and its limits", course: "HIST 7B", kind: "pdf", meta: "Week 8 reading" },
  { id: "k", title: "Quiz 4: Stereochemistry", course: "CHEM 3A", kind: "quiz", meta: "Opens Monday" },
  { id: "l", title: "Office hours schedule", course: "DATA C100", kind: "page", meta: "Course page" },
  { id: "m", title: "Essay 2 prompt", course: "HIST 7B", kind: "assignment", meta: "Due Oct 31" },
  { id: "n", title: "Bayes' rule worked examples", course: "STAT 134", kind: "pdf", meta: "Section 9" },
];

const RECENT = ["d", "a", "e", "j"];
const noopSubscribe = () => () => {};
const AUTOPLAY_QUERY = "midterm";
const ASK_ID = "ask";

type Answer = { text: string; sources: string[] };

const ANSWERS: { match: RegExp; answer: Answer }[] = [
  {
    match: /midterm|exam/i,
    answer: {
      text: "STAT 134 Midterm 1 is Thursday, during lecture. You can bring one double-sided handwritten formula sheet.",
      sources: ["Midterm logistics and formula sheet rules", "Syllabus, page 3"],
    },
  },
  {
    match: /office hours|oh\b/i,
    answer: {
      text: "DATA C100 office hours run Monday through Thursday. The full schedule and locations are on the course page.",
      sources: ["Office hours schedule"],
    },
  },
  {
    match: /due|homework|hw|lab/i,
    answer: {
      text: "Lab 5 is due Thursday and Homework 6 is due Friday. Nothing else is due this week.",
      sources: ["Lab 5: Grouping and pivot tables", "Homework 6: Joint distributions"],
    },
  },
];

// Question words are dropped so "when are office hours" still finds the page.
const STOPWORDS = new Set(["a", "an", "the", "is", "are", "when", "what", "where", "how", "do", "does", "my", "i", "for", "to", "of", "in", "on", "and"]);

function search(query: string): Item[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const tokens = words.filter((word) => !STOPWORDS.has(word));
  if (words.length > 0 && tokens.length === 0) return [];
  if (tokens.length === 0) return RECENT.map((id) => ITEMS.find((item) => item.id === id)!);
  return ITEMS.map((item) => {
    const title = item.title.toLowerCase();
    const haystack = `${title} ${item.course.toLowerCase()} ${item.meta.toLowerCase()}`;
    if (!tokens.every((token) => haystack.includes(token))) return null;
    const score = tokens.reduce((sum, token) => sum + (title.includes(token) ? 2 : 1), 0);
    return { item, score };
  })
    .filter((hit): hit is { item: Item; score: number } => hit !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((hit) => hit.item);
}

function highlight(text: string, query: string): ReactNode {
  const tokens = query.trim().split(/\s+/).filter(Boolean).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (tokens.length === 0) return text;
  const parts = text.split(new RegExp(`(${tokens.join("|")})`, "gi"));
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-transparent font-semibold text-ink">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

type Status =
  | { type: "idle" }
  | { type: "sent"; title: string }
  | { type: "opened"; title: string }
  | { type: "answer"; question: string; answer: Answer | null };

export function CommandPaletteDemo() {
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [autoplay, setAutoplay] = useState(true);
  const isMac = useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.userAgent),
    () => true,
  );
  const modKey = isMac ? "⌘" : "Ctrl ";

  const results = useMemo(() => search(query), [query]);
  const rows = query.trim() ? [...results.map((r) => r.id), ASK_ID] : results.map((r) => r.id);
  const activeIndex = Math.min(active, rows.length - 1);
  const activeId = rows[activeIndex];

  const stopAutoplay = useCallback(() => setAutoplay(false), []);

  // Type a sample query once so the demo explains itself, unless the visitor
  // has already started typing or prefers reduced motion.
  useEffect(() => {
    if (!autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => {
        setQuery(AUTOPLAY_QUERY);
        setAutoplay(false);
      }, 0);
      return () => window.clearTimeout(id);
    }
    const timers: number[] = [];
    [...AUTOPLAY_QUERY].forEach((_, i) => {
      timers.push(
        window.setTimeout(() => setQuery(AUTOPLAY_QUERY.slice(0, i + 1)), 1100 + i * 95),
      );
    });
    timers.push(window.setTimeout(() => setAutoplay(false), 1100 + AUTOPLAY_QUERY.length * 95));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [autoplay]);

  // ⌘K / Ctrl+K anywhere on the page jumps into the demo, like it does on Canvas.
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setAutoplay(false);
        frameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const choose = (id: string, send = false) => {
    if (id === ASK_ID) {
      const found = ANSWERS.find((a) => a.match.test(query));
      setStatus({ type: "answer", question: query.trim(), answer: found?.answer ?? null });
      return;
    }
    const item = ITEMS.find((i) => i.id === id);
    if (!item) return;
    setStatus({ type: send ? "sent" : "opened", title: item.title });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    stopAutoplay();
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((activeIndex + 1) % rows.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((activeIndex - 1 + rows.length) % rows.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeId) choose(activeId);
    } else if (event.key === "Escape") {
      setQuery("");
      setStatus({ type: "idle" });
    }
  };

  return (
    <div
      ref={frameRef}
      className="relative overflow-hidden rounded-[22px] bg-wash ring-1 ring-line"
    >
      {/* The course page the palette opens over. */}
      <div aria-hidden="true" className="pointer-events-none select-none">
        <div className="flex h-10 items-center gap-2 border-b border-line bg-paper px-4">
          <span className="size-2.5 rounded-full bg-[#e4dfd8]" />
          <span className="size-2.5 rounded-full bg-[#e4dfd8]" />
          <span className="size-2.5 rounded-full bg-[#e4dfd8]" />
          <span className="ml-3 hidden h-6 w-72 items-center rounded-md bg-wash px-3 text-[11.5px] text-stone sm:flex">
            your-school.instructure.com/courses/stat-134
          </span>
        </div>
        <div className="flex h-[440px] sm:h-[480px]">
          <div className="hidden w-16 shrink-0 flex-col items-center gap-5 bg-ink-soft pt-6 sm:flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="size-6 rounded-md bg-white/15" />
            ))}
          </div>
          <div className="flex-1 px-8 pt-8">
            <div className="h-3 w-40 rounded bg-[#e4dfd8]" />
            <div className="mt-4 h-6 w-72 max-w-full rounded bg-[#dcd6ce]" />
            <div className="mt-8 space-y-3">
              {[92, 76, 84, 64, 88, 70, 80].map((w, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-paper/70 px-4 py-3">
                  <span className="size-4 rounded bg-[#e4dfd8]" />
                  <span className="h-2.5 rounded bg-[#e4dfd8]" style={{ width: `${w * 0.5}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The palette. */}
      <div className="absolute inset-0 top-10 flex items-start justify-center bg-ink/[0.18] px-3 pt-6 sm:px-6 sm:pt-12">
        <div
          className="w-full max-w-[640px] overflow-hidden rounded-2xl bg-paper shadow-[0_24px_60px_-12px_rgba(36,30,24,0.35),0_0_0_1px_rgba(36,30,24,0.08)]"
          onPointerDown={stopAutoplay}
        >
          <div className="flex items-center gap-3 border-b border-line px-4 sm:px-5">
            <SearchIcon className="size-5 shrink-0 text-stone" />
            <label htmlFor={`${listboxId}-input`} className="sr-only">
              Search the sample courses
            </label>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                id={`${listboxId}-input`}
                role="combobox"
                aria-expanded="true"
                aria-controls={listboxId}
                aria-activedescendant={activeId ? `${listboxId}-${activeId}` : undefined}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                value={query}
                placeholder="Search all your courses"
                onFocus={stopAutoplay}
                onKeyDown={onKeyDown}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                  setStatus({ type: "idle" });
                }}
                className="h-14 w-full bg-transparent text-[16px] text-ink outline-none placeholder:text-stone/70 focus-visible:outline-none sm:text-[17px]"
              />
              {autoplay && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center text-[16px] sm:text-[17px]"
                >
                  <span className="invisible whitespace-pre">{query}</span>
                  <span className="ml-px h-5 w-[2px] animate-caret bg-red" />
                </span>
              )}
            </div>
            <kbd className="hidden rounded-md bg-wash px-2 py-1 text-[11.5px] font-medium text-stone sm:block">
              Esc
            </kbd>
          </div>

          <ul id={listboxId} role="listbox" aria-label="Results" className="max-h-[320px] overflow-y-auto p-2">
            {!query.trim() && (
              <li role="presentation" className="px-3 pb-1 pt-2 text-[12px] font-medium text-stone">
                Recent
              </li>
            )}
            {results.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <li
                  key={item.id}
                  id={`${listboxId}-${item.id}`}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(item.id)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${
                    selected ? "bg-wash" : ""
                  }`}
                >
                  <KindBadge kind={item.kind} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14.5px] text-ink-soft">
                      {highlight(item.title, query)}
                    </span>
                    <span className="block truncate text-[12.5px] text-stone">
                      {item.course}, {item.meta}
                    </span>
                  </span>
                  {selected && item.kind === "pdf" && (
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={(event) => {
                        event.stopPropagation();
                        choose(item.id, true);
                      }}
                      className="hidden shrink-0 rounded-full bg-ink px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-ink-soft sm:block"
                    >
                      Send to iPad
                    </button>
                  )}
                </li>
              );
            })}
            {query.trim() && results.length === 0 && (
              <li role="presentation" className="px-3 py-3 text-[14px] text-stone">
                Nothing in these sample courses matches. Try &ldquo;midterm&rdquo; or &ldquo;lab&rdquo;.
              </li>
            )}
            {query.trim() && (
              <li
                id={`${listboxId}-${ASK_ID}`}
                role="option"
                aria-selected={activeId === ASK_ID}
                onMouseEnter={() => setActive(rows.length - 1)}
                onClick={() => choose(ASK_ID)}
                className={`mt-1 flex cursor-pointer items-center gap-3 rounded-xl border-t border-line px-3 py-3 ${
                  activeId === ASK_ID ? "bg-wash" : ""
                }`}
              >
                <span className="inline-flex h-7 w-11 shrink-0 items-center justify-center rounded-md bg-ink text-[10.5px] font-semibold text-white">
                  Ask
                </span>
                <span className="truncate text-[14.5px] text-ink-soft">
                  Ask Scope: <span className="font-semibold text-ink">{query.trim()}</span>
                </span>
              </li>
            )}
          </ul>

          <div aria-live="polite">
            {status.type === "answer" && (
              <div key={status.question} className="animate-rise border-t border-line bg-wash/60 px-5 py-4">
                {status.answer ? (
                  <>
                    <p className="text-[14.5px] leading-relaxed text-ink">{status.answer.text}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {status.answer.sources.map((source, i) => (
                        <li key={source} className="rounded-full bg-paper px-2.5 py-1 text-[12px] text-stone ring-1 ring-line">
                          <span className="font-semibold text-red">{i + 1}</span> {source}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-[14.5px] leading-relaxed text-ink">
                    Ask Scope answers questions like this from your own course materials, with a link to
                    where the answer came from. Add Scope to Chrome to ask about your courses.
                  </p>
                )}
              </div>
            )}
            {(status.type === "sent" || status.type === "opened") && (
              <div key={status.type + status.title} className="flex animate-rise items-center gap-2.5 border-t border-line bg-wash/60 px-5 py-3.5 text-[14px] text-ink">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-ink text-white">
                  <CheckIcon className="size-3" />
                </span>
                {status.type === "sent" ? (
                  <span>
                    Sent to Lectra Notes. <span className="text-stone">It&apos;s waiting in your iPad&apos;s Scope Inbox.</span>
                  </span>
                ) : (
                  <span>
                    Opening <span className="font-semibold">{status.title}</span> <span className="text-stone">in its course.</span>
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-line px-5 py-2.5 text-[12px] text-stone">
            <span>Searching 4 courses</span>
            <span className="hidden gap-4 sm:flex">
              <span><kbd className="font-semibold text-ink-soft">↑↓</kbd> move</span>
              <span><kbd className="font-semibold text-ink-soft">↵</kbd> open</span>
              <span><kbd className="font-semibold text-ink-soft">{modKey}K</kbd> search</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
