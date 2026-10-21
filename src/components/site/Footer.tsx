import Link from "next/link";
import { Logo } from "@/components/logo";
import { TRADEMARK_DISCLAIMER } from "@/lib/site";
import { footerColumns } from "./nav";
import PreferredSource from "./PreferredSource";

const linkClass = "text-[14.5px] text-stone hover:text-ink";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-[14.5px] leading-relaxed text-stone">
            Free study apps that work with the course you already have.
          </p>
          <div className="mt-5">
            <PreferredSource />
          </div>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h2 className="text-[13.5px] font-semibold text-ink">{column.title}</h2>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-col gap-2 border-t border-line py-6 text-[13px] text-stone md:flex-row md:justify-between md:gap-8">
          <p className="shrink-0">© 2026 Scope. Formerly Canvascope.</p>
          <p className="md:text-right">{TRADEMARK_DISCLAIMER}</p>
        </div>
      </div>
    </footer>
  );
}
