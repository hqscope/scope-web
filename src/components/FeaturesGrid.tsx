"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Keyboard, Brain, FolderSearch, Network } from "lucide-react";
import type { ReactNode } from "react";

interface Feature {
    icon: ReactNode;
    title: string;
    description: string;
    span?: string; // Tailwind grid span class
}

const features: Feature[] = [
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Hybrid Search Pipeline",
        description:
            "Fuse.js + lexical hybrid retrieval with abbreviation expansion, course-aware ranking, and local PDF/OCR text in the index.",
        span: "md:col-span-1",
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Local-First Privacy",
        description:
            "Search indexing stays on-device. No ad stack, no analytics SDKs. Optional cloud flows are explicit and user-initiated.",
        span: "md:col-span-1",
    },
    {
        icon: <Brain className="w-6 h-6" />,
        title: "Cited AI + Course Brain",
        description:
            "Ask combines the active page with indexed files, PDF pages, tasks, and notes, then returns clickable citations; cloud AI is explicit fallback.",
        span: "md:col-span-1",
    },
    {
        icon: <FolderSearch className="w-6 h-6" />,
        title: "Planner + Quiz Workflow",
        description:
            "Use /ask, /plan, /quiz, reminders, and /autopilot inside supported LMS pages for cited answers and editable study blocks.",
        span: "md:col-span-1",
    },
    {
        icon: <Network className="w-6 h-6" />,
        title: "DropBridge v3 Handoff",
        description:
            "Send documents to Lectra and receive documents back through realtime wakeups, receipts, and polling fallback.",
        span: "md:col-span-1",
    },
    {
        icon: <Keyboard className="w-6 h-6" />,
        title: "Account Bridge (Optional)",
        description:
            "Google sign-in unlocks account-linked workflows, optional calendar sync, and RISC-backed account protection.",
        span: "md:col-span-1",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

export default function FeaturesGrid() {
    return (
        <section id="features" className="relative py-24 md:py-32">
            <div className="orb orb-3" />

            <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-xs text-accent font-semibold tracking-widest uppercase mb-4">
                        Features
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                        <span className="text-text-primary">Everything you need.</span>
                        <br />
                        <span className="text-gradient">Nothing you don&apos;t.</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Canvascope is designed for fast LMS retrieval and clear migration
                        from local workflows into optional cross-device workflows.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            className={`group relative rounded-2xl p-6 lg:p-8 glass glass-hover transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] cursor-default ${feature.span || ""
                                }`}
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center text-accent-light mb-5 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-semibold text-text-primary mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Corner glow on hover */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
