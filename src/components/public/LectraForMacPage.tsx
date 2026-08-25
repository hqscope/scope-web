import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Download,
  FolderOpen,
  Inbox,
  KeyRound,
  MonitorSmartphone,
  PenLine,
  Power,
  ShieldCheck,
  Terminal,
} from "lucide-react";

import JsonLd from "@/components/seo/JsonLd";
import MacPlatformNotice from "@/components/public/MacPlatformNotice";
import PublicPageFrame from "@/components/public/PublicPageFrame";
import {
  breadcrumbSchema,
  faqSchema,
  lectraMacSoftwareSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { LECTRA_MAC_DOWNLOAD_URL } from "@/lib/site";

const capabilities = [
  {
    icon: PenLine,
    title: "Read and mark up",
    copy:
      "Open a reading and write straight on it — handwritten markup with your mouse or trackpad, typed text boxes, and images placed where you want them.",
  },
  {
    icon: FolderOpen,
    title: "Your library, in one place",
    copy:
      "Folders, favorites, and search across everything you have imported. Notebooks sit next to readings instead of somewhere else.",
  },
  {
    icon: Terminal,
    title: "A real computing environment",
    copy:
      "Python, a shell, Git, a code editor, and notebooks you can actually run — all on this Mac, all offline.",
  },
  {
    icon: MonitorSmartphone,
    title: "Your Mac, on your iPad",
    copy:
      "Pick up your iPad and this Mac's screen is right there — keyboard, trackpad, and Pencil, across every display you have connected, over an encrypted connection.",
  },
  {
    icon: Inbox,
    title: "Documents from your iPad",
    copy:
      "Send a document from Lectra on your iPad and it lands here. You choose what comes over — nothing moves on its own.",
  },
  {
    icon: ClipboardCheck,
    title: "One clipboard",
    copy:
      "Copy on your iPad during a session and paste on the Mac. It works the other way too.",
  },
  {
    icon: Power,
    title: "Wake it from across the room",
    copy:
      "Left this Mac asleep? Your iPad can wake it and start the session anyway.",
  },
];

const steps = [
  {
    icon: Download,
    title: "Install and open",
    copy:
      "Drag Lectra into your Applications folder and open it. It is signed and notarized by Apple, so it installs cleanly and opens without a security scare.",
  },
  {
    icon: KeyRound,
    title: "Sign in",
    copy:
      "Use the same Lectra account you use on your iPad. That is how your iPad knows which Mac is yours.",
  },
  {
    icon: ShieldCheck,
    title: "Allow access, once",
    copy:
      "The first time you open this Mac from your iPad, macOS asks whether Lectra may show and control the screen. Say yes once and it is ready whenever you are.",
  },
];

const faqs: FaqEntry[] = [
  {
    question: "What happened to Lectra Receiver?",
    answer:
      "It is part of Lectra for Mac now. Opening this Mac from your iPad, catching documents your iPad sends, and the shared clipboard all moved into the full Lectra app, so there is one thing to download instead of two.",
  },
  {
    question: "Do I still need the old Receiver app?",
    answer:
      "No. Lectra for Mac does everything it did, and more. Download Lectra for Mac and you can put the old app away.",
  },
  {
    question: "How do I open this Mac from my iPad?",
    answer:
      "Open Lectra on your iPad, go to Remote Desktop, and choose this Mac. You get the screen, the keyboard, the trackpad, and Pencil input, across every display connected to it.",
  },
  {
    question: "Why does it ask for screen recording and accessibility?",
    answer:
      "macOS will not let any app show or control your screen without your say-so. Lectra asks the first time you open this Mac from your iPad, and only for that — reading, markup, and notebooks work without it.",
  },
  {
    question: "Do my documents sync between my iPad and my Mac?",
    answer:
      "No. Lectra does not keep the two libraries in step. Sending a document from your iPad to this Mac is something you do deliberately, when you want it here.",
  },
  {
    question: "Do I need an iPad to use Lectra for Mac?",
    answer:
      "No. It is the full Lectra app on its own — readings, markup, notebooks, Python, and the terminal. The iPad features are there when you want them.",
  },
  {
    question: "Is Lectra for Mac free?",
    answer:
      "Yes. Lectra is free on every device. There are no tiers, no subscription, and nothing to buy anywhere in the app.",
  },
  {
    question: "Where does it come from?",
    answer:
      "This page. It is a direct download, signed and notarized by Apple, rather than a Mac App Store listing.",
  },
];

/**
 * Shared body of the Lectra for Mac page.
 *
 * Rendered at /mac (canonical) and at /receiver, which shipped Receiver builds
 * and the iPad app link to and therefore has to keep returning a page.
 */
export default function LectraForMacPage() {
  return (
    <PublicPageFrame>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lectra", path: "/products/lectra" },
            { name: "Lectra for Mac", path: "/mac" },
          ]),
          lectraMacSoftwareSchema(),
          faqSchema(faqs),
        ]}
      />
      <section className="product-hero companion-hero" id="hero">
        <div className="page-wrap product-hero-grid">
          <div className="product-hero-copy" data-reveal>
            <Image
              src="/brand/lectra-mark.png"
              alt="Lectra"
              width={56}
              height={56}
              className="rounded-[14px]"
              priority
            />
            <p className="kicker">Lectra for Mac · Free</p>
            <h1>Lectra, on your Mac.</h1>
            <p>
              The whole app runs here now — readings and markup, notebooks,
              Python, and a terminal. And when you want it, your iPad can open
              this Mac and work on it from anywhere.
            </p>

            <div className="public-hero-actions">
              <a
                href={LECTRA_MAC_DOWNLOAD_URL}
                download
                className="button-primary"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download for Mac
              </a>
              <Link href="/products/lectra" className="button-secondary">
                Lectra for iPad
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <p className="text-sm text-[var(--color-ink-faint)]">
              Free · Signed and notarized by Apple · Nothing to buy, ever
            </p>

            <MacPlatformNotice />
          </div>
        </div>
      </section>

      <section className="section-band" id="receiver">
        <div className="page-wrap split-section">
          <div data-reveal>
            <p className="kicker kicker-muted">If you came here for Receiver</p>
            <h2>Receiver is now part of Lectra for Mac.</h2>
            <p className="section-copy">
              There is no separate app to install anymore. Everything Receiver
              did — letting your iPad see and control this Mac, catching
              documents you send over, sharing a clipboard between them — is
              built into Lectra for Mac, and the rest of Lectra comes with it.
            </p>
          </div>
          <div className="media-note" data-reveal>
            <p>One app instead of two</p>
            <p>
              Download Lectra for Mac and you can put the old app away. Setup is
              the same short run it always was: open it, sign in, allow access.
            </p>
          </div>
        </div>
      </section>

      <section className="page-wrap section-pad" id="capabilities">
        <div className="section-heading" data-reveal>
          <p className="kicker">What it does</p>
          <h2 className="text-4xl sm:text-5xl">
            A workspace and a way back to your desk.
          </h2>
        </div>
        <div className="plain-grid" data-reveal>
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title}>
                <Icon
                  className="h-5 w-5 text-[var(--color-brand)]"
                  aria-hidden="true"
                />
                <h3 className="mt-3">{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-band" id="setup">
        <div className="page-wrap workflow-grid">
          <div>
            <p className="kicker">Set up in three steps</p>
            <h2 className="text-4xl sm:text-5xl">
              A couple of minutes, and you&apos;re connected.
            </h2>
            <p className="section-copy mt-4">
              Install it on the Mac you want to reach. It waits quietly for your
              iPad, and the rest of Lectra is there the moment you open it.
            </p>
          </div>
          <div className="workflow-steps">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article key={step.title}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>What people ask about Lectra for Mac.</h2>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="page-wrap final-cta" id="download">
        <div>
          <p className="kicker">Ready when you are</p>
          <h2>
            Put your Mac <em>in reach.</em>
          </h2>
          <p>
            One download: the full Lectra app on macOS, and everything the
            Receiver used to do, built in.
          </p>
        </div>
        <a href={LECTRA_MAC_DOWNLOAD_URL} download className="button-primary">
          <Download className="h-4 w-4" aria-hidden="true" />
          Download for Mac
        </a>
      </section>
    </PublicPageFrame>
  );
}
