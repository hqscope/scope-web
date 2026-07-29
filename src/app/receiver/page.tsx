import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, KeyRound, ShieldCheck } from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import ReceiverPlatformNotice from "@/components/public/ReceiverPlatformNotice";
import { LECTRA_APP_STORE_URL, LECTRA_RECEIVER_DOWNLOAD_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lectra Receiver for Mac",
  description:
    "Lectra Receiver is the free macOS companion app for Lectra. Install it on your Mac, sign in with your Lectra account, and control that Mac from Lectra Pro on your iPad — screen, keyboard, files, and wake, from anywhere.",
  alternates: {
    canonical: "/receiver",
  },
  keywords: [
    "Lectra Receiver",
    "Lectra Receiver Mac",
    "Lectra remote desktop",
    "control Mac from iPad",
    "Lectra companion app",
    "macOS remote access",
    "iPad remote desktop",
  ],
  openGraph: {
    title: "Lectra Receiver for Mac",
    description:
      "Your Mac, on your iPad. Lectra Receiver lets Lectra Pro on your iPad see and control this Mac — screen, keyboard, files, and wake — from anywhere.",
    type: "website",
    url: "/receiver",
    images: [
      {
        url: "/brand/lectra-canvascope-lockup.png",
        width: 1200,
        height: 630,
        alt: "Lectra Receiver for Mac",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lectra Receiver for Mac",
    description:
      "Your Mac, on your iPad. Control your Mac from Lectra Pro on your iPad — screen, keyboard, files, and wake, from anywhere.",
    images: ["/brand/lectra-canvascope-lockup.png"],
  },
};

const steps = [
  {
    icon: Download,
    title: "Install & open",
    copy:
      "Open the downloaded app. It lives in your menu bar — no Dock icon, nothing in the way.",
  },
  {
    icon: KeyRound,
    title: "Sign in with Google",
    copy:
      "Use the same Lectra account you use on your iPad. It opens in your default browser.",
  },
  {
    icon: ShieldCheck,
    title: "Grant access & connect",
    copy:
      "Allow Screen Recording and Accessibility, then open the Remote Desktop tab in Lectra on your iPad. Your Mac appears, ready to open.",
  },
];

export default function ReceiverPage() {
  return (
    <PublicPageFrame>
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
            <p className="kicker">Free Mac companion app</p>
            <h1>Your Mac, on your iPad.</h1>
            <p>
              Lectra Receiver lets Lectra Pro on your iPad see and control this
              Mac — the full screen, keyboard, files, and wake — from anywhere.
            </p>

            <div className="public-hero-actions">
              <a
                href={LECTRA_RECEIVER_DOWNLOAD_URL}
                download
                className="button-primary"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download for Mac
              </a>
              <Link href="/product/lectra" className="button-secondary">
                About Lectra
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <p className="text-sm text-[var(--color-ink-faint)]">
              macOS 13 or later · Apple silicon &amp; Intel · Free companion app
            </p>

            <ReceiverPlatformNotice />
          </div>
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
              Lectra Receiver stays quietly in your menu bar and waits for your
              iPad. Install it once and your Mac is ready whenever you are.
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

      <section className="page-wrap final-cta" id="download">
        <div>
          <p className="kicker">Ready when you are</p>
          <h2>
            Put your Mac <em>in reach.</em>
          </h2>
          <p>
            Download Lectra Receiver, sign in with your Lectra account, and open
            the Remote Desktop tab in Lectra Pro on your iPad. It installs
            cleanly and opens without a security scare.
          </p>
        </div>
        <a
          href={LECTRA_RECEIVER_DOWNLOAD_URL}
          download
          className="button-primary"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download for Mac
        </a>
      </section>
    </PublicPageFrame>
  );
}
