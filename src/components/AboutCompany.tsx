"use client";

import { motion } from "framer-motion";

export default function AboutCompany() {
    return (
        <section id="about" className="py-24 relative z-10 bg-[rgba(10,10,10,0.5)]">
            <div className="mx-auto max-w-[1600px] px-6 lg:px-12 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold tracking-tighter mb-6"
                >
                    <span className="text-text-primary">Behind the </span>
                    <span className="text-gradient">Company</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-4xl mx-auto mb-16"
                >
                    Scope Inc. was founded with a singular mission: to help students securely and efficiently access academic resources through privacy-first, intelligent productivity tools. Our tools are built by students, for students, with a focus on uncompromising quality.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass p-8 rounded-3xl"
                    >
                        <h4 className="text-xl font-bold text-text-primary mb-3">Our Core Philosophy</h4>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">
                            We believe that educational tools shouldn&apos;t compromise on privacy or user experience. Our products process everything locally where possible, and we never sell user data.
                        </p>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            From blazing-fast search indexing to seamless cross-device handoffs, we focus on removing friction from the academic workflow.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="glass p-8 rounded-3xl"
                    >
                        <h4 className="text-xl font-bold text-text-primary mb-3">The Roadmap Ahead</h4>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">
                            Scope for Canvas is our flagship free product, but it&apos;s just the beginning. The ecosystem is expanding to include exam analytics tools and dedicated learning trackers.
                        </p>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Every new product we build seamlessly integrates with the knowledge graph established by the Extension, creating an unrivaled, holistic platform.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
