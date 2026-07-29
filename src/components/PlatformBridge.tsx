"use client";

import { motion } from "framer-motion";
import { Chrome, ShieldCheck, FileUp, PenSquare } from "lucide-react";

const flow = [
  {
    icon: <Chrome className="w-5 h-5" />,
    title: "1) Index Locally in Chrome",
    description:
      "Canvascope indexes LMS metadata in chrome.storage.local with Fuse.js + lexical ranking for fast local-first search.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "2) Optional Account Bridge",
    description:
      "When enabled, Google OAuth and Canvascope web session endpoints provide identity for account-linked cross-product flows.",
  },
  {
    icon: <FileUp className="w-5 h-5" />,
    title: "3) Send to Lectra",
    description:
      "User-initiated PDF handoff validates signature + size (25 MB), uploads to lectra_documents, and writes a pdf_document record in synced_items.",
  },
  {
    icon: <PenSquare className="w-5 h-5" />,
    title: "4) Annotate on iPad",
    description:
      "Lectra fetches pending documents, supports Pencil-first annotation, and syncs annotated output back into the Canvascope workflow.",
  },
];

export default function PlatformBridge() {
  return (
    <section id="bridge" className="relative py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-widest uppercase mb-4">
            System Flow
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-text-primary">How Canvascope connects</span>{" "}
            <span className="text-gradient">extension, web, and Lectra.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            The web app is both the marketing layer and the auth/integration
            backend that coordinates cross-product identity and delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
          {flow.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-2xl p-6 glass glass-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-muted border border-accent/25 flex items-center justify-center text-accent-light mb-4">
                {step.icon}
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
