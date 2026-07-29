"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock3, PenTool, Upload } from "lucide-react";
import type { ReactNode } from "react";

const implementedNow = [
  "Document vault with PDF thumbnails, folders, and local file import",
  "Apple Pencil editor with pen, highlighter, eraser, and lasso tools",
  "Vector ink persistence + flattened annotated PDF export",
  "Scope handoff via DropBridge v3 delivery tracking and receipts",
  "iOS Share Extension flow: \"Send to Scope\" from other apps",
  "Gradescope manager pipeline for auth, course/assignment fetch, and submission preflight",
  "Startup splash coordinator that waits for minimum display + data readiness before handoff",
  "Course Brain tab integrated into the main library navigation",
  "pdf_document records in synced_items mapped to lectra_documents paths",
];

const inProgressImportExport = [
  "Receiver heartbeat and realtime availability surfacing",
  "Queued/downloaded/canceled state handling across reconnects",
  "Same-account zero-pairing reliability improvements",
  "Bulk document selection flows for move/delete management in library",
  "Background sync and backup reliability tuning",
];

const inProgressEditing = [
  "Course Brain mission normalizer for stable resource IDs and snapshot fingerprints",
  "Module/resource join + dedupe logic for cleaner mission generation",
  "Course Brain pane and orbit visualization refinements",
  "Text boxes with typography controls",
  "Image insertion and object transforms",
  "Page operations: add, duplicate, delete, reorder",
  "Selective page export and batch export workflows",
];

export default function LectraStatus() {
  return (
    <section id="lectra" className="relative py-24 md:py-32">
      <div className="orb orb-3" />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-widest uppercase mb-4">
            Lectra Status
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-text-primary">Lectra development is focused on</span>{" "}
            <span className="text-gradient">core workflow quality.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Current status reflects the iPad app plus the v10 DropBridge receive
            path used for desktop delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          <StatusCard
            icon={<CheckCircle2 className="w-5 h-5 text-success" />}
            title="Implemented Now"
            items={implementedNow}
            tone="success"
          />
          <StatusCard
            icon={<Upload className="w-5 h-5 text-accent-light" />}
            title="Import / Export Expansion"
            items={inProgressImportExport}
            tone="accent"
          />
          <StatusCard
            icon={<PenTool className="w-5 h-5 text-accent-light" />}
            title="PDF Editing Expansion"
            items={inProgressEditing}
            tone="accent"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs text-text-muted mt-6 text-center"
        >
          Status aligns with the active Lectra build scope and integration docs.
        </motion.p>
      </div>
    </section>
  );
}

function StatusCard({
  icon,
  title,
  items,
  tone,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
  tone: "success" | "accent";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className={`rounded-2xl p-6 glass glass-hover transition-all duration-300 ${
        tone === "success" ? "border-success/25" : "border-accent/20"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            tone === "success"
              ? "bg-success/15 border border-success/25"
              : "bg-accent-muted border border-accent/25"
          }`}
        >
          {icon}
        </div>
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Clock3 className="w-4 h-4 text-text-muted mt-0.5 flex-shrink-0" />
            <span className="text-sm text-text-secondary leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
