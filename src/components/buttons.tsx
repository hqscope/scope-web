import Link from "next/link";
import type { ReactNode } from "react";
import { AppleIcon, ChromeIcon } from "@/components/icons";
import StoreLink from "@/components/seo/StoreLink";
import { products } from "@/lib/site";

export function buttonClasses(
  variant: keyof typeof variants = "primary",
  size: keyof typeof sizes = "md",
) {
  return `inline-flex items-center justify-center rounded-full font-semibold tracking-[-0.01em] transition-colors ${variants[variant]} ${sizes[size]}`;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverted";
  size?: "md" | "lg";
  className?: string;
};

const variants = {
  primary: "bg-red text-white hover:bg-red-deep",
  secondary:
    "bg-paper text-ink ring-1 ring-inset ring-line hover:bg-wash hover:ring-[#d6d0c7]",
  inverted: "bg-paper text-ink hover:bg-wash",
} as const;

const sizes = {
  md: "h-10 px-4 text-[14.5px] gap-2",
  lg: "h-12 px-5 text-[15.5px] gap-2.5",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonLinkProps) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("/downloads/");
  const classes = `${buttonClasses(variant, size)} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

type StoreButtonProps = {
  variant?: ButtonLinkProps["variant"];
  size?: ButtonLinkProps["size"];
};

export function ChromeStoreButton({ variant = "primary", size = "lg" }: StoreButtonProps) {
  return (
    <StoreLink
      store="chrome-web-store"
      href={products.extension.storeUrl}
      className={buttonClasses(variant, size)}
    >
      <ChromeIcon className="size-[18px]" />
      Add to Chrome, it&apos;s free
    </StoreLink>
  );
}

export function AppStoreButton({ variant = "secondary", size = "lg" }: StoreButtonProps) {
  return (
    <StoreLink
      store="app-store"
      href={products.lectra.storeUrl}
      className={buttonClasses(variant, size)}
    >
      <AppleIcon className="size-[18px] -translate-y-px" />
      Get Lectra Notes for iPad
    </StoreLink>
  );
}

export function PolyaButton({ variant = "secondary", size = "lg" }: StoreButtonProps) {
  return (
    <ButtonLink href={products.polya.appUrl} variant={variant} size={size}>
      Open Polya
    </ButtonLink>
  );
}
