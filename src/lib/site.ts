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
// LECTRA_MAC_DOWNLOAD_URL) and the page/header CTAs switch to a
// download button automatically.
export const AGENT_WORKSPACE_DOWNLOAD_URL: string | null = null;

export const AGENT_WORKSPACE_WAITLIST_SOURCE = "agent-workspace";

export const SUPPORT_EMAIL = "canvascopeextension@gmail.com";

export function sanitizeNextPath(raw: string | null): string {
  // The student workspace this used to default into no longer exists, so an
  // absent or hostile `next` lands on the marketing home instead.
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) {
    return "/";
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

/**
 * Google's Preferred Sources deeplink. A reader who follows it lands in
 * Google's source picker with Scope already queried, and marking us keeps our
 * pages higher in their Search, News, and Discover results.
 * https://developers.google.com/search/docs/appearance/preferred-sources
 *
 * `q` takes the registrable domain rather than a full URL — the picker matches
 * the site, and `canvascope.org` covers the `www.` host this site is served
 * from. See the naming note in README.md for why the domain is still that one.
 *
 * Google also documents a scripted button that adds the source in place. This
 * is the plain deeplink instead: it works with JavaScript off, it is the same
 * link in a footer, an email, or a post, and it keeps a third-party script off
 * every page on the site — which the privacy copy two clicks away would have
 * to start qualifying.
 */
export const GOOGLE_PREFERRED_SOURCE_URL =
  "https://www.google.com/preferences/source?q=canvascope.org";
