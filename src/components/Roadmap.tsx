"use client";

import { motion } from "framer-motion";
import { Check, Loader2, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { RELEASE_VERSION } from "@/lib/siteRelease";

interface Phase {
    phase: string;
    title: string;
    status: "done" | "in-progress" | "upcoming";
    items: string[];
    icon: ReactNode;
}

const phases: Phase[] = [
    {
        phase: "Phase 1",
        title: "Search Quality Foundation",
        status: "done",
        items: [
            "Fuzzy local indexing and fast retrieval core",
            "Course/content filters and search history",
            "Baseline ranking quality improvements",
            "Canvas-first deployment and UX hardening",
        ],
        icon: <Check size={18} />,
    },
    {
        phase: "Phase 2",
        title: "Advanced Ranking + UX",
        status: "done",
        items: [
            "RRF-style hybrid retrieval (Fuse + lexical)",
            "Temporal ordering that prioritizes upcoming due dates over overdue items",
            "General-query recency boosts that preserve exact/prefix hits",
            "Course-scoped prefix/suffix query detection",
            "Planner workflows, due chips, and keyboard overlay",
        ],
        icon: <Check size={18} />,
    },
    {
        phase: "Phase 2.5",
        title: "Lectra Bridge",
        status: "done",
        items: [
            "Send to Lectra PDF flow with user confirmation",
            "PDF signature checks and 25 MB max guardrail",
            "Canvas PDF route detection hardening across file/preview/folder edge cases",
            "Smarter PDF title resolution from URL, page context, and response headers",
            "lectra_documents storage + synced_items pdf_document contract",
            "Cross-product account bridge for same-user delivery",
        ],
        icon: <Check size={18} />,
    },
    {
        phase: "Phase 3",
        title: "Deep Content Extraction",
        status: "in-progress",
        items: [
            "PDF text extraction and indexing",
            "Slide/deck and transcript extraction",
            "Richer metadata in ranking and previews (size, modified date, points)",
            "Course Brain mission normalization and graph quality refinements in Lectra",
        ],
        icon: <Loader2 size={18} className="animate-spin" />,
    },
    {
        phase: "Phase 4",
        title: "Intelligent Retrieval",
        status: "upcoming",
        items: [
            "Semantic + lexical hybrid ranking",
            "Query suggestions and related-item discovery",
            "Optional intelligence features with strict privacy controls",
        ],
        icon: <ArrowRight size={18} />,
    },
];

const statusConfig = {
    done: {
        dotColor: "bg-success",
        lineColor: "bg-success/40",
        badgeClass: "bg-success/15 text-success",
        label: "Completed",
    },
    "in-progress": {
        dotColor: "bg-brand-primary",
        lineColor: "bg-brand-primary/40",
        badgeClass: "bg-brand-muted text-brand-primary-light",
        label: "In Progress",
    },
    upcoming: {
        dotColor: "bg-text-muted",
        lineColor: "bg-text-muted/20",
        badgeClass: "bg-glass-bg text-text-muted",
        label: "Up Next",
    },
};

export default function Roadmap() {
    return (
        <section id="roadmap" className="relative py-20">
            <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-xs text-brand-primary font-semibold tracking-widest uppercase mb-4">
                        Roadmap
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                        <span className="text-text-primary">Where we&apos;re</span>{" "}
                        <span className="text-gradient">headed.</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        The roadmap now reflects {RELEASE_VERSION} state across extension,
                        docs, and Lectra integration work.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-glass-border" />

                    <div className="space-y-12">
                        {phases.map((phase, i) => {
                            const config = statusConfig[phase.status];
                            const isRight = i % 2 === 1;

                            return (
                                <motion.div
                                    key={phase.phase}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.5, delay: i * 0.15 }}
                                    className={`relative flex flex-col md:flex-row items-center justify-between w-full ${isRight ? "md:flex-row-reverse" : ""
                                        } mb-12`}
                                >
                                    {/* Dot on timeline (absolute center on desktop) */}
                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-dark-bg z-10">
                                        <div
                                            className={`w-full h-full rounded-full ${config.dotColor} ${phase.status === "in-progress"
                                                ? "animate-pulse"
                                                : ""
                                                }`}
                                        />
                                    </div>

                                    {/* Content Card - forced to 45% width on desktop */}
                                    <div className="w-full md:w-[45%] pl-16 md:pl-0">
                                        <div
                                            className={`rounded-2xl p-6 glass glass-hover transition-all duration-300 ${phase.status === "in-progress"
                                                ? "border-brand-primary/20"
                                                : ""
                                                }`}
                                        >
                                            {/* Phase Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${phase.status === "done"
                                                            ? "bg-success/15 text-success"
                                                            : phase.status === "in-progress"
                                                                ? "bg-brand-muted text-brand-primary-light"
                                                                : "bg-glass-bg text-text-muted"
                                                            }`}
                                                    >
                                                        {phase.icon}
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] text-text-muted uppercase tracking-wider font-medium">
                                                            {phase.phase}
                                                        </div>
                                                        <div className="text-base font-semibold text-text-primary">
                                                            {phase.title}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${config.badgeClass}`}
                                                >
                                                    {config.label}
                                                </span>
                                            </div>

                                            {/* Items */}
                                            <ul className="space-y-2">
                                                {phase.items.map((item, j) => (
                                                    <li key={j} className="flex items-center gap-2.5">
                                                        <div
                                                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${phase.status === "done"
                                                                ? "bg-success"
                                                                : phase.status === "in-progress"
                                                                    ? "bg-brand-primary"
                                                                    : "bg-text-muted/50"
                                                                }`}
                                                        />
                                                        <span
                                                            className={`text-sm ${phase.status === "done"
                                                                ? "text-text-secondary line-through decoration-success/30"
                                                                : phase.status === "in-progress"
                                                                    ? "text-text-secondary"
                                                                    : "text-text-muted"
                                                                }`}
                                                        >
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Empty spacer for alternating balance */}
                                    <div className="hidden md:block w-[45%]" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
