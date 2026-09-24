"use client";

import {
  AnimatePresence,
  m,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { Fragment as ReactFragment, useEffect, useState } from "react";

import PenMark from "@/components/motion/PenMark";
import { useOnScreen } from "@/components/motion/useInView";
import { SearchIcon } from "@/components/site/Icons";

import {
  demoQueries,
  fragments,
  kindLabel,
  searchFragments,
  type Fragment,
  type StackPage,
} from "./fragments";

const fragmentById = new Map(fragments.map((fragment) => [fragment.id, fragment]));
const EASE = [0.2, 0.7, 0.1, 1] as const;

function Highlighted({ text, query }: { text: string; query: string }) {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 1);

  if (words.length === 0) return <>{text}</>;

  const pattern = new RegExp(
    `(${words.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );

  return (
    <>
      {text.split(pattern).map((part, index) =>
        index % 2 === 1 ? (
          <mark key={index}>{part}</mark>
        ) : (
          <ReactFragment key={index}>{part}</ReactFragment>
        ),
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* The fanned stack of course pages behind the palette                 */
/* ------------------------------------------------------------------ */

const stackPages: { id: StackPage; className: string }[] = [
  { id: "slide", className: "stack-page stack-page--slide" },
  { id: "pset", className: "stack-page stack-page--pset" },
  { id: "exam", className: "stack-page stack-page--exam" },
];

function PageFace({ id }: { id: StackPage }) {
  if (id === "slide") {
    return (
      <>
        <b>Lecture 14</b>
        <span>u-substitution</span>
        <i className="stack-eq">u = cos θ, du = −sin θ dθ</i>
      </>
    );
  }

  return (
    <>
      <b>{id === "exam" ? "Practice Midterm 2" : "Problem Set 4"}</b>
      <span>Math 53, Fall</span>
      <span className="stack-lines" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* The search                                                          */
/* ------------------------------------------------------------------ */

type Mode = "auto" | "visitor";

const TYPE_MS = 72;
const ERASE_MS = 26;
const HOLD_MS = 3200;
const GAP_MS = 480;

export default function PenSearch() {
  const reduceMotion = useReducedMotion();
  const [rootRef, onScreen] = useOnScreen<HTMLDivElement>("60px");
  const [mode, setMode] = useState<Mode>("auto");
  const [query, setQuery] = useState("");
  const [resultIds, setResultIds] = useState<string[]>([]);
  const [lifted, setLifted] = useState<StackPage | null>(null);
  const [circled, setCircled] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [loopIndex, setLoopIndex] = useState(0);

  // The stack leans a few degrees toward a mouse pointer.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const tiltX = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]), { stiffness: 80, damping: 18 });
  const tiltY = useSpring(useTransform(rawX, [-0.5, 0.5], [-7, 7]), { stiffness: 80, damping: 18 });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      rawX.set(event.clientX / window.innerWidth - 0.5);
      rawY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY, reduceMotion]);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  // Reduced motion: the first query and its results are simply there.
  useEffect(() => {
    if (reduceMotion && mode === "auto") {
      setQuery(demoQueries[0].text);
      setResultIds(demoQueries[0].ids);
      setLifted(demoQueries[0].page);
      setCircled(true);
    }
  }, [reduceMotion, mode]);

  // Autoplay: type, land the results, circle the best one, lift its page,
  // hold, then clear and move on. Stops for good when a visitor types, and
  // pauses whenever nobody can see it.
  const running = mode === "auto" && !reduceMotion && onScreen && pageVisible;

  useEffect(() => {
    if (!running) return;

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    const play = async () => {
      let index = loopIndex;
      setResultIds([]);
      setCircled(false);
      setLifted(null);
      setQuery("");
      await wait(600);

      while (!cancelled) {
        const current = demoQueries[index];

        for (let length = 1; length <= current.text.length; length++) {
          await wait(TYPE_MS + (length % 3 === 0 ? 40 : 0));
          if (cancelled) return;
          setQuery(current.text.slice(0, length));
        }

        await wait(160);
        if (cancelled) return;
        setResultIds(current.ids);
        setLifted(current.page);

        await wait(650);
        if (cancelled) return;
        setCircled(true);

        await wait(HOLD_MS);
        if (cancelled) return;
        setCircled(false);
        setResultIds([]);
        setLifted(null);

        for (let length = current.text.length - 1; length >= 0; length--) {
          await wait(ERASE_MS);
          if (cancelled) return;
          setQuery(current.text.slice(0, length));
        }

        await wait(GAP_MS);
        index = (index + 1) % demoQueries.length;
        setLoopIndex(index);
      }
    };

    void play();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
    // loopIndex is read once to resume; the loop owns it after that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const results = resultIds
    .map((id) => fragmentById.get(id))
    .filter((fragment): fragment is Fragment => Boolean(fragment));

  const takeOver = () => {
    if (mode !== "visitor") {
      setMode("visitor");
      setCircled(false);
    }
  };

  const onInput = (value: string) => {
    takeOver();
    setQuery(value);
    const found = searchFragments(value);
    setResultIds(found.map((fragment) => fragment.id));
    setLifted(null);
  };

  return (
    <div className="pen-search" ref={rootRef}>
      <m.div
        className="stack"
        aria-hidden="true"
        style={reduceMotion ? undefined : { rotateX: tiltX, rotateY: tiltY }}
      >
        {stackPages.map((page, index) => (
          <m.div
            key={page.id}
            className={`${page.className} paper`}
            initial={reduceMotion ? false : { opacity: 0, y: 40, rotate: 0 }}
            animate={{
              opacity: 1,
              y: lifted === page.id ? -34 : 0,
              rotate: lifted === page.id ? 0 : undefined,
              transition: {
                opacity: { duration: 0.6, delay: 0.2 + index * 0.12 },
                y: { type: "spring", stiffness: 160, damping: 20 },
              },
            }}
          >
            <PageFace id={page.id} />
          </m.div>
        ))}
      </m.div>

      <m.div
        className="palette paper"
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
      >
        <label className="palette-input">
          <SearchIcon size={22} />
          <span className="sr-only">Try searching the demo course</span>
          <input
            type="search"
            value={query}
            placeholder="Search every course"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="search"
            onFocus={takeOver}
            onPointerDown={takeOver}
            onChange={(event) => onInput(event.target.value)}
          />
          <kbd className="palette-key">⌘K</kbd>
        </label>

        <ul
          className="palette-results"
          aria-label="Results"
          aria-live={mode === "visitor" ? "polite" : "off"}
        >
          <AnimatePresence initial={false}>
            {results.map((fragment, index) => (
              <m.li
                key={fragment.id}
                className="palette-row"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.06, ease: EASE } }}
                exit={{ opacity: 0, transition: { duration: 0.18 } }}
              >
                <span className={`palette-kind palette-kind--${fragment.kind}`}>
                  {kindLabel[fragment.kind]}
                </span>
                <span className="palette-text">
                  <span className="palette-title">
                    <Highlighted text={fragment.title} query={query} />
                  </span>
                  <span className="palette-meta">{fragment.meta}</span>
                </span>
                {index === 0 && mode === "auto" ? (
                  <PenMark kind="circle" play={circled} inset="-6px -10px -8px -8px" />
                ) : null}
              </m.li>
            ))}
          </AnimatePresence>

          {mode === "visitor" && results.length === 0 ? (
            <li className="palette-empty">
              {query.trim().length === 0
                ? "Type a course word, like midterm, lab, or slides."
                : "Nothing in this demo course matches. Try midterm, lab, or substitution."}
            </li>
          ) : null}
        </ul>

        <p className="palette-foot">
          Indexed on this device. Press ⌘L to send a file to Lectra Notes.
        </p>
      </m.div>
    </div>
  );
}
