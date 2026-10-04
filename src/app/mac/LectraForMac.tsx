import Image from "next/image";
import Link from "next/link";

import JsonLd from "@/components/seo/JsonLd";
import Sheet from "@/components/motion/Sheet";
import FaqList from "@/components/site/FaqList";
import { DownloadIcon } from "@/components/site/Icons";
import PageShell from "@/components/site/PageShell";
import {
  breadcrumbSchema,
  faqSchema,
  lectraMacSoftwareSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { LECTRA_MAC_DOWNLOAD_URL } from "@/lib/site";

import "./mac.css";
import MacPlatformNotice from "./MacPlatformNotice";
import MirrorScene from "./MirrorScene";

const capabilities = [
  {
    title: "Read and mark up",
    copy:
      "Open a reading and write straight on it with handwritten markup from your mouse or trackpad, typed text boxes, and images placed where you want them.",
  },
  {
    title: "Your library, in one place",
    copy:
      "Folders, favorites, and search across everything you have imported. Notebooks sit right next to your readings.",
  },
  {
    title: "A real computing environment",
    copy:
      "Python, a shell, Git, a code editor, and notebooks you can actually run, all on this Mac and all offline.",
  },
  {
    title: "Your Mac, on your iPad",
    copy:
      "Pick up your iPad and this Mac's screen is right there, with keyboard, trackpad, and Pencil, across every display you have connected, over an encrypted connection.",
  },
  {
    title: "Documents from your iPad",
    copy:
      "Send a document from Lectra on your iPad and it lands here. You choose what comes over, and nothing moves on its own.",
  },
  {
    title: "One clipboard",
    copy:
      "Copy on your iPad during a session and paste on the Mac. It works the other way too.",
  },
  {
    title: "Wake it from across the room",
    copy:
      "Left this Mac asleep? Your iPad can wake it and start the session anyway.",
  },
];

const steps = [
  {
    title: "Install and open",
    copy:
      "Drag Lectra into your Applications folder and open it. It is signed and notarized by Apple, so it installs cleanly and opens without a security scare.",
  },
  {
    title: "Sign in",
    copy:
      "Use the same Lectra account you use on your iPad. That is how your iPad knows which Mac is yours.",
  },
  {
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
      "macOS will not let any app show or control your screen without your say-so. Lectra asks the first time you open this Mac from your iPad, and only for that. Reading, markup, and notebooks work without it.",
  },
  {
    question: "Do my documents sync between my iPad and my Mac?",
    answer:
      "No. Lectra does not keep the two libraries in step. Sending a document from your iPad to this Mac is something you do deliberately, when you want it here.",
  },
  {
    question: "Do I need an iPad to use Lectra for Mac?",
    answer:
      "No. It is the full Lectra app on its own, with readings, markup, notebooks, Python, and the terminal. The iPad features are there when you want them.",
  },
  {
    question: "Is Lectra for Mac free?",
    answer:
      "Yes. Lectra is free on every device. There are no tiers, no subscription, and nothing to buy anywhere in the app.",
  },
  {
    question: "Where does it come from?",
    answer:
      "This page. It is a direct download, signed and notarized by Apple, and it is not listed on the Mac App Store.",
  },
];

function DownloadButton() {
  return (
    <a href={LECTRA_MAC_DOWNLOAD_URL} download className="btn btn-primary">
      <DownloadIcon size={18} />
      Download for Mac
    </a>
  );
}

/**
 * The Lectra for Mac page body.
 *
 * Rendered at /mac (canonical) and at /receiver, which shipped Receiver builds
 * and the iPad app link to and therefore has to keep returning a page.
 */
export default function LectraForMac() {
  return (
    <PageShell
      active="mac"
      cta={{ label: "Download for Mac", href: LECTRA_MAC_DOWNLOAD_URL }}
    >
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

      {/* Hero, with the Mac and iPad scene beside it. */}
      <Sheet className="mac-hero" labelledBy="mac-title">
        <div className="shell mac-hero-grid">
          <header className="mac-hero-copy">
            <Image
              src="/brand/lectra-mark.png"
              alt="Lectra logo"
              width={56}
              height={56}
              className="mac-mark"
              priority
            />
            <p className="context-line">Lectra for Mac, free</p>
            <h1 id="mac-title" className="t-title" data-focus>
              Lectra, on your Mac.
            </h1>
            <p className="lede">
              The whole app runs here now, with readings and markup, notebooks, Python,
              and a terminal. When you want it, your iPad can open this Mac and work on
              it from anywhere.
            </p>
            <div className="actions">
              <DownloadButton />
              <Link href="/products/lectra" className="btn btn-line">
                Lectra for iPad
              </Link>
            </div>
            <p className="btn-note">
              Free, signed and notarized by Apple, and nothing to buy, ever.
            </p>
            <MacPlatformNotice />
          </header>
          <MirrorScene caption="Your Mac on your iPad, with the keyboard, trackpad, and Pencil across every display connected to it." />
        </div>
      </Sheet>

      {/* For people who came here looking for Receiver. */}
      <Sheet className="section" id="receiver" labelledBy="receiver-title">
        <div className="shell split split--top">
          <div>
            <p className="context-line">If you came here for Receiver</p>
            <h2 id="receiver-title" className="t-head" data-focus style={{ marginTop: 14 }}>
              Receiver is now part of Lectra for Mac.
            </h2>
            <p className="copy" style={{ marginTop: 22 }}>
              There is no separate app to install anymore. Everything Receiver did is
              built into Lectra for Mac, from letting your iPad see and control this
              Mac to catching documents you send over and sharing a clipboard between
              them, and the rest of Lectra comes with it.
            </p>
          </div>
          <div className="note note-hi mac-one-app">
            <h3>One app instead of two</h3>
            <p style={{ marginTop: 8 }}>
              Download Lectra for Mac and you can put the old app away. Setup is the
              same short run it always was: open it, sign in, allow access.
            </p>
          </div>
        </div>
      </Sheet>

      {/* What it does. */}
      <Sheet className="section" id="capabilities" labelledBy="capabilities-title">
        <div className="shell split split--top">
          <h2 id="capabilities-title" className="t-head" data-focus>
            A workspace and a way back to your desk.
          </h2>
          <ul className="feature-list feature-list--wide" style={{ marginTop: 0 }}>
            {capabilities.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </li>
            ))}
          </ul>
        </div>
      </Sheet>

      {/* Setup, then questions. */}
      <Sheet className="section" id="setup" labelledBy="setup-title">
        <div className="shell">
          <div className="split split--top">
            <div>
              <h2 id="setup-title" className="t-head" data-focus>
                A couple of minutes, and you&apos;re connected.
              </h2>
              <p className="copy" style={{ marginTop: 22 }}>
                Install it on the Mac you want to reach. It waits quietly for your iPad,
                and the rest of Lectra is there the moment you open it.
              </p>
            </div>
            <ol className="mac-steps">
              {steps.map((step) => (
                <li key={step.title}>
                  <h3 className="t-item">{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>

          <div id="faq" className="mac-faq">
            <h2 className="t-head" data-focus style={{ marginBottom: 28 }}>
              What people ask about Lectra for Mac.
            </h2>
            <FaqList items={faqs} />
          </div>
        </div>
      </Sheet>

      {/* Close, on the desk. */}
      <section
        className="on-desk shell section mac-closing"
        id="download"
        aria-labelledby="download-title"
      >
        <h2 id="download-title" className="t-title" data-focus>
          Put your Mac in reach.
        </h2>
        <p className="lede">
          One download: the full Lectra app on macOS, with everything the Receiver used
          to do built in.
        </p>
        <div className="actions">
          <DownloadButton />
        </div>
      </section>
    </PageShell>
  );
}
