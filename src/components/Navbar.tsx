"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const chromeWebStoreUrl =
    "https://chromewebstore.google.com/detail/canvascope/bamoelobnoepklagbcokjnlipfhcfdbb";

const navLinks = [
    { label: "Ecosystem", href: "#ecosystem" },
    { label: "Extension", href: "#extension" },
    { label: "Lectra", href: "#lectra" },
    { label: "About", href: "#about" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Hiring", href: "#hiring" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-[rgba(3,7,18,0.7)] backdrop-blur-xl border-b border-glass-border"
                    : "bg-transparent"
                    }`}
            >
                <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-3 group">
                            <div className="relative w-8 h-8">
                                <svg viewBox="0 0 128 128" className="w-full h-full">
                                    <path
                                        d="M20 16h76v96H20z"
                                        fill="none"
                                        stroke="currentColor"
                                        className="text-brand-primary"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M20 88h76"
                                        fill="none"
                                        stroke="currentColor"
                                        className="text-brand-primary"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <circle
                                        cx="60"
                                        cy="52"
                                        r="22"
                                        fill="none"
                                        stroke="currentColor"
                                        className="text-brand-primary"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <line
                                        x1="76"
                                        y1="68"
                                        x2="104"
                                        y2="96"
                                        stroke="currentColor"
                                        className="text-brand-primary"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-semibold text-text-primary tracking-tight transition-colors">
                                Scope
                            </span>
                        </a>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8 bg-glass-bg border border-glass-border px-6 py-2 rounded-full">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="hidden md:block flex-shrink-0">
                            <a
                                href={chromeWebStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-text-primary hover:bg-white text-dark-bg text-sm font-semibold rounded-full transition-all duration-200"
                            >
                                Add to Chrome
                            </a>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-dark-bg/95 backdrop-blur-xl pt-20 px-6"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-xl text-text-secondary hover:text-text-primary transition-colors py-2 border-b border-glass-border"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href={chromeWebStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileOpen(false)}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-text-primary text-dark-bg font-semibold rounded-full mt-4"
                            >
                                Add to Chrome
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
