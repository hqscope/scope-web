export const CHROME_WEB_STORE_URL =
  "https://chromewebstore.google.com/detail/canvascope/bamoelobnoepklagbcokjnlipfhcfdbb";

export const LECTRA_APP_STORE_URL =
  "https://apps.apple.com/us/app/lectra-notes/id6759754531";

// Lectra for Mac, the free Mac app (it absorbed the standalone Lectra
// Receiver). Keep the path stable — it is the download every CTA points at.
//
// The former name, /downloads/LectraReceiver.dmg, is deep-linked from the iPad
// app (LectraLinks.receiverDownload), the Chrome extension, and shipped
// Receiver builds. It still resolves: next.config.ts redirects it here.
export const LECTRA_MAC_DOWNLOAD_URL = "/downloads/Lectra.dmg";

// Agent Workspace, the Mac desktop app (in development). While in waitlist
// mode the download URL is null and every CTA reads "Get early access". At
// launch, point this at the notarized dmg (keep the path stable, mirroring
// LECTRA_RECEIVER_DOWNLOAD_URL) and the page/header CTAs switch to a
// download button automatically.
export const AGENT_WORKSPACE_DOWNLOAD_URL: string | null = null;

export const AGENT_WORKSPACE_WAITLIST_SOURCE = "agent-workspace";

export const SUPPORT_EMAIL = "canvascopeextension@gmail.com";

export function sanitizeNextPath(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) {
    return "/app";
  }

  return raw;
}

export function getConfiguredSiteUrl(): string | null {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim();

  if (!configured) {
    return null;
  }

  return configured.replace(/\/$/, "");
}

export function isLocalhostHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1"
  );
}

export function resolveAuthCallbackBaseUrl(rawOrigin: string): string {
  const requestUrl = new URL(rawOrigin);

  if (isLocalhostHost(requestUrl.hostname)) {
    return requestUrl.origin;
  }

  return getConfiguredSiteUrl() ?? requestUrl.origin;
}
