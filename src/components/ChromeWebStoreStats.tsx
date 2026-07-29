"use client";

import { motion } from "framer-motion";
import { Chrome, Star, Users, Tag, ExternalLink } from "lucide-react";

const chromeWebStoreUrl =
  "https://chromewebstore.google.com/detail/canvascope/bamoelobnoepklagbcokjnlipfhcfdbb";

const stats = [
  {
    icon: <Star className="w-4 h-4" />,
    label: "Rating",
    value: "5.0",
    detail: "6 ratings",
  },
  {
    icon: <Users className="w-4 h-4" />,
    label: "Users",
    value: "11",
    detail: "active listing count",
  },
  {
    icon: <Tag className="w-4 h-4" />,
    label: "Category",
    value: "Education",
    detail: "Chrome Web Store",
  },
  {
    icon: <Chrome className="w-4 h-4" />,
    label: "Type",
    value: "Extension",
    detail: "canvascope.org",
  },
];

export default function ChromeWebStoreStats() {
  return (
    <section id="store" className="relative py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-widest uppercase mb-4">
            Store Snapshot
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-text-primary">Chrome Web Store</span>{" "}
            <span className="text-gradient">stats.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Current listing snapshot for Canvascope on the Chrome Web Store.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-glass-border-light glass overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`p-6 lg:p-7 ${
                  index % 2 === 1 ? "bg-[rgba(255,255,255,0.02)]" : ""
                } xl:border-r xl:border-glass-border last:border-r-0`}
              >
                <div className="inline-flex items-center gap-2 text-text-muted text-xs uppercase tracking-wider font-semibold mb-3">
                  {stat.icon}
                  {stat.label}
                </div>
                <div className="text-3xl font-bold text-text-primary leading-none">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary mt-2">{stat.detail}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-5"
        >
          <a
            href={chromeWebStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            View listing on Chrome Web Store
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
