"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative py-20 bg-dark-bg border-t border-glass-border/30 overflow-hidden">
            {/* Subtle Gradient background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />

            <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-brand-primary rounded-lg shadow-lg shadow-brand-primary/20">
                                <svg viewBox="0 0 128 128" className="w-5 h-5 text-dark-bg" fill="none" stroke="currentColor" strokeWidth="12">
                                    <circle cx="64" cy="64" r="50" />
                                    <path d="M40 64h48M64 40v48" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-text-primary tracking-tight">
                                Canvascope <span className="text-brand-primary-light">Inc.</span>
                            </span>
                        </div>
                        <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
                            Building the bridges between your academic search, study, and organization workflows. Privacy-first, student-built tools for the modern university experience.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-6">Products</h4>
                        <ul className="space-y-4">
                            <li><a href="#extension" className="text-sm text-text-secondary hover:text-brand-primary transition-colors">Extension</a></li>
                            <li><a href="#lectra" className="text-sm text-text-secondary hover:text-lectra-primary transition-colors">Lectra App</a></li>
                            <li><a href="#" className="text-sm text-text-muted cursor-not-allowed">MedTrack (Soon)</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><a href="#about" className="text-sm text-text-secondary hover:text-text-primary transition-colors">About Us</a></li>
                            <li><a href="#roadmap" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Roadmap</a></li>
                            <li><a href="mailto:noel_sason@berkeley.edu" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-glass-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-text-muted">
                        © {new Date().getFullYear()} Canvascope Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="https://github.com/NoelSason" target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-text-primary transition-colors">GitHub</Link>
                        <Link href="/privacy" className="text-xs text-text-muted hover:text-text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-xs text-text-muted hover:text-text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
