import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  FileText,
  Search,
  Sparkles,
  TerminalSquare,
} from "lucide-react";

const commandItems = [
  {
    title: "MCB 102 midterm review",
    detail: "Lecture slides, problem set PDF, and section notes",
    meta: "Course match",
  },
  {
    title: "Photosynthesis reading quiz",
    detail: "Due tomorrow, linked to Canvas assignment",
    meta: "Deadline",
  },
  {
    title: "Send annotated worksheet to Lectra",
    detail: "PDF handoff with delivery receipt",
    meta: "Action",
  },
];

const productTabs = [
  {
    label: "Scope",
    title: "Search the mess before it becomes a missed deadline.",
    copy:
      "Course pages, PDFs, deadlines, notes, and active LMS context move into one fast command surface.",
    href: "/product/scope",
  },
  {
    label: "Lectra",
    title: "Turn course PDFs into an Apple Pencil workspace.",
    copy:
      "Read, annotate, summarize, and return finished PDFs through the connected Scope flow.",
    href: "/product/lectra",
  },
  {
    label: "Research",
    title: "Study tools backed by careful research systems.",
    copy:
      "Scope Research explores cortical mapping and validation without overstating clinical claims.",
    href: "/research",
  },
];

export function CommandPaletteShowcase() {
  return (
    <div className="showcase command-showcase" aria-label="Scope command palette preview">
      <div className="showcase-toolbar">
        <span>Scope search</span>
        <kbd>⌘K</kbd>
      </div>
      <div className="command-input">
        <Search className="h-4 w-4" aria-hidden="true" />
        <span>Find readings, deadlines, or actions</span>
      </div>
      <div className="command-filter-row">
        <span>course: active</span>
        <span>type: PDF</span>
        <span>due: this week</span>
      </div>
      <div className="command-results">
        {commandItems.map((item) => (
          <article key={item.title} className="command-result-row">
            <div>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </div>
            <span>{item.meta}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

export function CitedChatShowcase() {
  return (
    <div className="showcase chat-showcase" aria-label="Scope AI citation preview">
      <div className="showcase-toolbar">
        <span>Ask Scope</span>
        <span>3 sources</span>
      </div>
      <div className="chat-message user-message">
        What should I study first for tomorrow?
      </div>
      <div className="chat-message assistant-message">
        Start with the enzyme kinetics worksheet, then review the lecture PDF
        section on Michaelis-Menten assumptions.
      </div>
      <div className="citation-row">
        <span>[1] Worksheet PDF</span>
        <span>[2] Lecture 14</span>
        <span>[3] Due date</span>
      </div>
      <div className="chat-composer-preview">
        <span>Ask about this course...</span>
        <Sparkles className="h-4 w-4" aria-hidden="true" />
      </div>
    </div>
  );
}

export function ProductSwitcher() {
  return (
    <section className="site-section">
      <div className="site-shell product-switcher">
        <div className="section-intro">
          <h2>One ecosystem, three jobs.</h2>
          <p>
            Scope handles browser course work, Lectra handles focused
            reading, and Research keeps the longer horizon honest.
          </p>
        </div>
        <div className="product-tabs" role="list">
          {productTabs.map((tab) => (
            <Link key={tab.label} href={tab.href} className="product-tab-card" role="listitem">
              <span>{tab.label}</span>
              <h3>{tab.title}</h3>
              <p>{tab.copy}</p>
              <strong>
                Open
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LectraWorkspaceShowcase() {
  return (
    <div className="showcase lectra-workspace" aria-label="Lectra workspace preview">
      <div className="workspace-sidebar">
        <span>Library</span>
        <strong>Biology reading.pdf</strong>
        <strong>Problem set.ipynb</strong>
        <strong>Study notes.md</strong>
      </div>
      <div className="workspace-main">
        <div className="pdf-sheet">
          <Image
            src="/brand/lectra-canvascope-lockup.png"
            alt="Lectra and Scope product lockup"
            width={720}
            height={420}
          />
        </div>
        <div className="workspace-console">
          <TerminalSquare className="h-4 w-4" aria-hidden="true" />
          <span>git status</span>
          <span>python analysis.py</span>
        </div>
      </div>
    </div>
  );
}

export function MediaCard({
  title,
  copy,
  children,
}: {
  title: string;
  copy: string;
  children: ReactNode;
}) {
  return (
    <article className="media-card">
      <div>
        <FileText className="h-5 w-5" aria-hidden="true" />
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
      {children}
    </article>
  );
}
