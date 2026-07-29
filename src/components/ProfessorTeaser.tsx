"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp, Clock } from "lucide-react";

export default function ProfessorTeaser() {
    return (
        <section id="coming-soon" className="relative py-20">
            <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="flex-1"
                    >
                        {/* Coming Soon Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
                            <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                            <span className="text-xs text-warning font-medium">
                                Coming Soon
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                            <span className="text-text-primary">Smarter Course</span>
                            <br />
                            <span className="text-gradient">Enrollment.</span>
                        </h2>

                        <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-lg">
                            View professor ratings directly on your official course enrollment
                            pages. Make better decisions without opening new tabs or switching
                            between sites.
                        </p>

                        <div className="flex flex-col gap-4">
                            {[
                                {
                                    icon: <Star size={18} />,
                                    text: "See ratings on enrollment pages",
                                },
                                {
                                    icon: <TrendingUp size={18} />,
                                    text: "Compare difficulty and quality scores",
                                },
                                {
                                    icon: <Clock size={18} />,
                                    text: "Save hours of research per semester",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-brand-muted flex items-center justify-center text-brand-primary-light flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <span className="text-sm text-text-secondary">
                                        {item.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Mock UI + Grade Distribution */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-[1.4] w-full"
                    >
                        <div className="relative">
                            {/* Glow */}
                            <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-2xl" />

                            <div className="relative flex flex-col lg:flex-row gap-4">
                                {/* Mock Enrollment Page */}
                                <div className="flex-1 min-w-0 rounded-2xl border border-glass-border-light bg-glass-bg overflow-hidden">
                                    {/* Header */}
                                    <div className="px-5 py-3 border-b border-glass-border bg-[rgba(255,255,255,0.03)]">
                                        <span className="text-xs text-text-muted font-medium">
                                            Spring 2026 - Course Enrollment
                                        </span>
                                    </div>

                                    {/* Course Rows */}
                                    <div className="p-4 space-y-3">
                                        {[
                                            {
                                                course: "CS 61B",
                                                professor: "Prof. Hilfinger",
                                                rating: 4.8,
                                                difficulty: "Medium",
                                                highlighted: true,
                                            },
                                            {
                                                course: "EECS 16A",
                                                professor: "Prof. Sahai",
                                                rating: 4.2,
                                                difficulty: "Hard",
                                                highlighted: false,
                                            },
                                            {
                                                course: "DATA 100",
                                                professor: "Prof. Gonzalez",
                                                rating: 4.6,
                                                difficulty: "Medium",
                                                highlighted: false,
                                            },
                                        ].map((row) => (
                                            <div
                                                key={row.course}
                                                className={`rounded-xl p-4 border transition-all duration-300 ${row.highlighted
                                                    ? "border-brand-primary/30 bg-brand-primary/5"
                                                    : "border-glass-border bg-[rgba(255,255,255,0.02)]"
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <div className="text-sm font-semibold text-text-primary">
                                                            {row.course}
                                                        </div>
                                                        <div className="text-xs text-text-muted mt-0.5">
                                                            {row.professor}
                                                        </div>
                                                    </div>

                                                    {/* Rating Badge */}
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        whileInView={{ scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 400,
                                                            damping: 15,
                                                            delay: row.highlighted ? 0.5 : 0.7,
                                                        }}
                                                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${row.rating >= 4.5
                                                            ? "bg-success/15 text-success"
                                                            : "bg-warning/15 text-warning"
                                                            }`}
                                                    >
                                                        <Star size={12} fill="currentColor" />
                                                        {row.rating}/5
                                                    </motion.div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${row.difficulty === "Hard"
                                                            ? "bg-brand-muted text-brand-primary-light"
                                                            : "bg-blue-500/15 text-blue-400"
                                                            }`}
                                                    >
                                                        {row.difficulty}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Canvascope Attribution */}
                                    <div className="px-5 py-2 border-t border-glass-border flex items-center justify-center gap-1.5">
                                        <svg viewBox="0 0 128 128" className="w-3.5 h-3.5">
                                            <path
                                                d="M20 16h76v96H20z"
                                                fill="none"
                                                stroke="#ef4444"
                                                strokeWidth="12"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <circle
                                                cx="60"
                                                cy="52"
                                                r="18"
                                                fill="none"
                                                stroke="#ef4444"
                                                strokeWidth="12"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span className="text-[10px] text-text-muted">
                                            Powered by Canvascope
                                        </span>
                                    </div>
                                </div>

                                {/* Grade Distribution Chart */}
                                <div className="flex-1 min-w-0 rounded-2xl border border-glass-border-light bg-glass-bg overflow-hidden">
                                    {/* Header */}
                                    <div className="px-5 py-3 border-b border-glass-border bg-[rgba(255,255,255,0.03)] flex items-center justify-between">
                                        <span className="text-xs text-text-muted font-medium">
                                            Grade Distribution
                                        </span>
                                        <span className="text-[10px] text-brand-primary-light font-semibold px-2 py-0.5 rounded bg-brand-muted">
                                            CS 61B
                                        </span>
                                    </div>

                                    {/* Bar Chart */}
                                    <div className="p-5">
                                        <div className="flex items-end gap-[6px]" style={{ height: 176 }}>
                                            {[
                                                { grade: "A+", pct: 28 },
                                                { grade: "A", pct: 82 },
                                                { grade: "A-", pct: 48 },
                                                { grade: "B+", pct: 38 },
                                                { grade: "B", pct: 25 },
                                                { grade: "B-", pct: 18 },
                                                { grade: "C+", pct: 12 },
                                                { grade: "C", pct: 8 },
                                                { grade: "C-", pct: 5 },
                                                { grade: "D", pct: 3 },
                                                { grade: "F", pct: 2 },
                                            ].map((bar, i) => {
                                                const barHeight = Math.max(3, Math.round((bar.pct / 100) * 160));
                                                return (
                                                    <div key={bar.grade} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full">
                                                        <motion.div
                                                            initial={{ scaleY: 0 }}
                                                            animate={{ scaleY: 1 }}
                                                            transition={{ duration: 0.8, delay: 0.6 + i * 0.06, ease: "easeOut" }}
                                                            className={`w-full rounded-t-sm origin-bottom ${bar.pct > 40
                                                                ? "bg-success"
                                                                : bar.pct > 20
                                                                    ? "bg-blue-400"
                                                                    : bar.pct > 10
                                                                        ? "bg-warning"
                                                                        : "bg-brand-primary"
                                                                }`}
                                                            style={{ height: barHeight }}
                                                        />
                                                        <span className="text-[8px] text-text-muted leading-none">{bar.grade}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Summary Stats */}
                                        <div className="mt-5 grid grid-cols-3 gap-3">
                                            {[
                                                { label: "Average", value: "B+", color: "text-success" },
                                                { label: "Median", value: "A-", color: "text-blue-400" },
                                                { label: "% A's", value: "42%", color: "text-brand-primary" },
                                            ].map((stat) => (
                                                <div key={stat.label} className="text-center p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-glass-border">
                                                    <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
                                                    <div className="text-[9px] text-text-muted mt-0.5">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
