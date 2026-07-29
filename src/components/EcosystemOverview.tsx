"use client";

import { motion } from "framer-motion";
import { Search, TabletSmartphone, ServerOff } from "lucide-react";

export default function EcosystemOverview() {
    const pillars = [
        {
            icon: <Search size={28} className="text-brand-primary" />,
            title: "Lightning Search",
            description: "Find your academic files, assignments, and lectures in milliseconds. We index your entire LMS history to provide the fastest academic search humanly possible."
        },
        {
            icon: <TabletSmartphone size={28} className="text-lectra-primary" />,
            title: "Seamless Handoff",
            description: "Capture on your computer, study and annotate on your iPad. Lectra bridges the gap with native Apple Pencil support for a friction-less studying experience."
        },
        {
            icon: <ServerOff size={28} className="text-emerald-400" />,
            title: "Privacy First",
            description: "Our local-first architecture ensures your personal academic data stays on your machine. We don't track your search habits or harvest your class data."
        }
    ];

    return (
        <section id="ecosystem" className="py-20 relative z-10 bg-dark-bg-warm">
            <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
                <div className="mb-16 max-w-3xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold tracking-widest text-text-muted uppercase mb-3"
                    >
                        The Ecosystem
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-text-primary tracking-tighter mb-6"
                    >
                        Tools built to work <span className="text-gradient">together.</span>
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg text-text-secondary leading-relaxed"
                    >
                        Canvascope is more than a single product. It is a unified ecosystem of premium applications designed to optimize how you manage, search, and consume your coursework. From the browser to your tablet, we build the bridges so you can focus on learning.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-8 rounded-3xl hover:bg-glass-bg-hover transition-colors border border-glass-border"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-dark-bg flex items-center justify-center mb-6 shadow-inner border border-glass-border-light">
                                {pillar.icon}
                            </div>
                            <h4 className="text-xl font-bold text-text-primary mb-3">{pillar.title}</h4>
                            <p className="text-text-secondary leading-relaxed text-sm">
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
