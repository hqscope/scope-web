import Image from "next/image";

import { ButtonLink, buttonClasses } from "@/components/buttons";
import { ClosingCta } from "@/components/page-parts";
import JsonLd from "@/components/seo/JsonLd";
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

// A plain <a>, not next/link: the URL is a redirect to the current .dmg.
function DownloadButton({ onDark = false }: { onDark?: boolean }) {
  return (
    <a
      href={LECTRA_MAC_DOWNLOAD_URL}
      download
      className={buttonClasses(onDark ? "inverted" : "primary", "lg")}
    >
      <DownloadIcon size={18} />
      Download for Mac
    </a>
  );
}

const sectionTitle =
  "text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]";

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
      <section
        aria-labelledby="mac-title"
        className="mx-auto max-w-[1200px] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20"
      >
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <header className="min-w-0">
            <Image
              src="/brand/lectra-mark.png"
              alt="Lectra logo"
              width={56}
              height={56}
              className="size-14 rounded-[13px]"
              priority
            />
            <p className="mt-6 text-[15px] font-medium text-stone">Lectra for Mac, free</p>
            <h1
              id="mac-title"
              className="mt-4 max-w-[14ch] text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[0.97] tracking-[-0.046em]"
            >
              Lectra, on your Mac.
            </h1>
            <p className="mt-6 max-w-[48ch] text-[18px] leading-[1.55] text-ink-soft">
              The whole app runs here now, with readings and markup, notebooks, Python,
              and a terminal. When you want it, your iPad can open this Mac and work on
              it from anywhere.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <DownloadButton />
              <ButtonLink href="/products/lectra" variant="secondary" size="lg">
                Lectra for iPad
              </ButtonLink>
            </div>
            <p className="mt-4 text-[14px] text-stone">
              Free, signed and notarized by Apple, and nothing to buy, ever.
            </p>
            <MacPlatformNotice />
          </header>
          <div className="min-w-0">
            <MirrorScene caption="Your Mac on your iPad, with the keyboard, trackpad, and Pencil across every display connected to it." />
          </div>
        </div>
      </section>

      {/* For people who came here looking for Receiver. */}
      <section id="receiver" aria-labelledby="receiver-title" className="bg-wash">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-[15px] font-medium text-stone">If you came here for Receiver</p>
            <h2 id="receiver-title" className={`mt-4 max-w-[18ch] ${sectionTitle}`}>
              Receiver is now part of Lectra for Mac.
            </h2>
            <p className="mt-5 max-w-[50ch] text-[17px] leading-[1.65] text-stone">
              There is no separate app to install anymore. Everything Receiver did is
              built into Lectra for Mac, from letting your iPad see and control this
              Mac to catching documents you send over and sharing a clipboard between
              them, and the rest of Lectra comes with it.
            </p>
          </div>
          <div className="rounded-[22px] bg-paper p-7 ring-1 ring-line sm:p-8 lg:mt-10">
            <h3 className="text-[20px] font-semibold tracking-[-0.02em]">One app instead of two</h3>
            <p className="mt-2 text-[16px] leading-[1.6] text-stone">
              Download Lectra for Mac and you can put the old app away. Setup is the
              same short run it always was: open it, sign in, allow access.
            </p>
          </div>
        </div>
      </section>

      {/* What it does. */}
      <section
        id="capabilities"
        aria-labelledby="capabilities-title"
        className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <h2 id="capabilities-title" className={`max-w-[16ch] ${sectionTitle}`}>
            A workspace and a way back to your desk.
          </h2>
          <dl className="divide-y divide-line border-y border-line">
            {capabilities.map((item) => (
              <div key={item.title} className="grid gap-1.5 py-5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-8">
                <dt className="text-[16.5px] font-semibold tracking-[-0.015em]">{item.title}</dt>
                <dd className="text-[15.5px] leading-[1.6] text-stone">{item.copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Setup. */}
      <section id="setup" aria-labelledby="setup-title" className="bg-wash">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="setup-title" className={`max-w-[18ch] ${sectionTitle}`}>
              A couple of minutes, and you&apos;re connected.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.65] text-stone">
              Install it on the Mac you want to reach. It waits quietly for your iPad,
              and the rest of Lectra is there the moment you open it.
            </p>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 py-6">
                <span aria-hidden="true" className="text-[26px] font-semibold leading-none tracking-[-0.04em] tabular-nums text-ink">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{step.title}</h3>
                  <p className="mt-1.5 text-[15.5px] leading-[1.6] text-stone">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Questions. */}
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <h2
            id="faq-title"
            className="max-w-[16ch] text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]"
          >
            What people ask about Lectra for Mac.
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>

      {/* Close. */}
      <div id="download">
        <ClosingCta
          title="Put your Mac in reach."
          body="One download: the full Lectra app on macOS, with everything the Receiver used to do built in."
          actions={<DownloadButton onDark />}
        />
      </div>
    </PageShell>
  );
}
