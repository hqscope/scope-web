"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ProductFeatureProps {
    id: string;
    badge: string;
    title: string;
    description: string;
    features: string[];
    ctaText: string;
    ctaHref: string;
    brandColor: "indigo" | "rose";
    reversed?: boolean;
    mockupIcon: React.ReactNode;
}

export default function ProductFeature({
    id,
    badge,
    title,
    description,
    features,
    ctaText,
    ctaHref,
    brandColor,
    reversed = false,
    mockupIcon
}: ProductFeatureProps) {
    const isIndigo = brandColor === "indigo";
    const badgeColor = isIndigo ? "bg-brand-primary text-dark-bg" : "bg-lectra-primary text-white";
    const glowClass = isIndigo ? "from-brand-primary/20" : "from-lectra-primary/20";
    const titleGradient = isIndigo ? "text-gradient" : "text-gradient-lectra";

    return (
        <section id={id} className="py-20 relative z-10 overflow-hidden">
            <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
                <div className={`flex flex-col lg:flex-row items-center gap-16 ${reversed ? "lg:flex-row-reverse" : ""}`}>
                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-6 ${badgeColor} shadow-lg shadow-${brandColor}-500/20`}>
                                {badge}
                            </span>
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-bold tracking-tighter mb-4"
                            >
                                <span className={titleGradient}>{title}</span>
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-text-secondary leading-relaxed max-w-xl"
                            >
                                {description}
                            </motion.p>
                        </div>

                        <motion.ul
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4 max-w-xl"
                        >
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 size={24} className={`flex-shrink-0 mt-0.5 ${isIndigo ? "text-brand-primary" : "text-lectra-primary"}`} />
                                    <span className="text-text-primary leading-relaxed">{feature}</span>
                                </li>
                            ))}
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <a
                                href={ctaHref}
                                target={ctaHref.startsWith("http") ? "_blank" : undefined}
                                rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                                className={`inline-flex items-center gap-2 font-bold group transition-all duration-200 ${isIndigo ? "text-brand-primary-light hover:text-brand-primary" : "text-lectra-primary-light hover:text-lectra-primary"}`}
                            >
                                {ctaText}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Mockup / Abstract Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 w-full max-w-xl relative"
                    >
                        <div className={`absolute -inset-4 bg-gradient-to-tr ${glowClass} to-transparent rounded-3xl blur-2xl opacity-50`} />
                        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl border border-glass-border bg-glass-bg backdrop-blur-sm flex items-center justify-center overflow-hidden">
                            {/* Abstract inner representation */}
                            <div className={`absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${glowClass} via-transparent to-transparent`} />

                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className={`w-32 h-32 rounded-2xl flex items-center justify-center shadow-2xl ${isIndigo ? "bg-brand-primary text-white" : "bg-lectra-primary text-white"}`}
                            >
                                {mockupIcon}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
