"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";

const hiringFormUrl = "https://forms.gle/k2xTHrxvTX3si8NB7";

export default function HiringInterestSection() {
  return (
    <section id="hiring" className="relative py-20">
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="scroll-mt-40 rounded-3xl p-8 md:p-12 glass border-glass-border-light text-center"
        >
          <div className="w-12 h-12 rounded-xl bg-brand-muted border border-brand-primary/30 text-brand-primary-light flex items-center justify-center mx-auto mb-5">
            <Users className="w-6 h-6" />
          </div>

          <span className="inline-block text-xs text-brand-primary font-semibold tracking-widest uppercase mb-4">
            Build / Test
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
            Interested in building or testing Canvascope?
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
            Submit the interest form if you want to help build Canvascope or test
            new releases early.
          </p>

          <a
            href={hiringFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-primary hover:bg-brand-primary-light text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(129,140,248,0.4)]"
          >
            Open Build/Test Interest Form
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
