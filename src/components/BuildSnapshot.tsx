"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Rocket, Wrench } from "lucide-react";
import { RELEASE_PRODUCT_HEADING } from "@/lib/siteRelease";

const currentState = [
  "Canvascope v10 Chrome MV3 runtime with organized src/ layout",
  "Fuse.js + lexical hybrid retrieval with abbreviation and course-aware ranking",
  "Unified AI side panel with active-page + whole-corpus RAG and clickable citations",
  "Shared AI router: Chrome on-device model first, authenticated cloud fallback when needed",
  "Course Brain practice quizzes, Student Profile personalization, and Smart Planner study blocks",
  "Offline PDF text extraction and image OCR search",
  "Command+K overlay and slash commands on supported LMS pages",
  "Due-date planner, custom todos, reminders, and schedule-aware retrieval",
  "Syllabus Autopilot with optional Google Calendar event sync",
  "Send to Lectra PDF handoff with signature checks and 25 MB cap",
  "DropBridge v3 realtime receive path with receipts and alarm fallback",
  "Google Cross-Account Protection receiver and sign-in block enforcement",
];

const upNext = [
  "Lecture slide and transcript extraction",
  "Result metadata upgrades (size, modified date, points)",
  "More Course Brain graph quality and mission normalization work",
  "Multi-device calendar/planner synchronization",
  "Receiver health and transfer telemetry polish across more client states",
];

export default function BuildSnapshot() {
  return (
    <section id="snapshot" className="relative py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-widest uppercase mb-4">
            Build Snapshot
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-text-primary">What ships in</span>{" "}
            <span className="text-gradient">{RELEASE_PRODUCT_HEADING}</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Current release status is mirrored from extension-core plus the active
            Lectra handoff protocol work, so this page tracks the live stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl p-6 lg:p-8 glass glass-hover"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-success/15 border border-success/30 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">
                  Live Now
                </p>
                <h3 className="text-lg font-semibold text-text-primary">
                  Search + AI + Bridge Stack
                </h3>
              </div>
            </div>
            <ul className="space-y-2.5">
              {currentState.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Rocket className="w-4 h-4 mt-0.5 text-accent-light flex-shrink-0" />
                  <span className="text-sm text-text-secondary leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-2xl p-6 lg:p-8 glass glass-hover border-accent/20"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent-muted border border-accent/30 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-accent-light" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">
                  Next Phase
                </p>
                <h3 className="text-lg font-semibold text-text-primary">
                  Content Extraction
                </h3>
              </div>
            </div>
            <ul className="space-y-2.5">
              {upNext.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-sm text-text-secondary leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-text-muted mt-5">
              Phase 3 priority: extract more context from files and lectures while
              keeping local-first privacy guarantees.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
