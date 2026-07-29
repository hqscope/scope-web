"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-16"
        >
            {/* Ambient Orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                    <span className="text-xs text-text-secondary font-medium tracking-wide uppercase">
                        The Canvascope Ecosystem
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.95] mb-8"
                >
                    <span className="text-text-primary block">Your Academic</span>
                    <span className="text-gradient block mt-2">Operating System.</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Canvascope Inc. builds premium, privacy-first productivity tools meant to seamlessly connect your student experience across platforms.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#ecosystem"
                        className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary hover:bg-brand-primary-light text-dark-bg font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(129,140,248,0.4)] hover:-translate-y-1 w-full sm:w-auto"
                    >
                        Explore Products
                        <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </a>
                    <a
                        href="#about"
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-glass-bg border border-glass-border hover:bg-glass-bg-hover text-text-primary font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                    >
                        Our Mission
                    </a>
                </motion.div>

                {/* Stats / Trust */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-16 pt-10 border-t border-glass-border/40 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                >
                    <div>
                        <div className="text-4xl md:text-5xl font-black text-text-primary">0</div>
                        <div className="text-[10px] text-text-muted mt-2 uppercase tracking-[0.2em] font-bold">Data Sold</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-black text-text-primary">100%</div>
                        <div className="text-[10px] text-text-muted mt-2 uppercase tracking-[0.2em] font-bold">Local Priority</div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <div className="text-4xl md:text-5xl font-black text-text-primary">100K+</div>
                        <div className="text-[10px] text-text-muted mt-2 uppercase tracking-[0.2em] font-bold">Files Indexed So Far</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
