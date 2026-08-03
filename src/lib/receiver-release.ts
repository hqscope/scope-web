// Lectra Receiver — macOS release pointer.
//
// Receiver ships as a notarized Developer ID .dmg (~50 MB) built in the
// lectra-ios repo under LectraReceiver/. The binaries are NOT in this repo:
// they live in Cloudflare R2 under versioned, immutable names
// (LectraReceiver-1.0.0.dmg). This module works out which of those is current.
//
// Three URLs are a fixed contract with the shipped macOS and iOS apps. They
// can never be renamed:
//
//   /receiver                     landing page (src/app/receiver/page.tsx)
//   /downloads/LectraReceiver.dmg 307 -> the newest versioned DMG
//   /updates/appcast.xml          Sparkle feed (public/updates/appcast.xml)
//
// The redirects and cache headers that implement the last two are in
// next.config.ts, which calls into this module at build time.
//
// There is deliberately no hardcoded version constant here. The appcast is the
// only place a version is recorded, and the redirect is derived from it, so
// /downloads/LectraReceiver.dmg cannot point at a build the update feed does
// not describe. That failure mode is silent — Sparkle would simply never offer
// the update — so it is designed out rather than documented around.
//
// Release: run scripts/publish-receiver-release.sh.

// Public base URL of the R2 bucket holding every versioned DMG.
//
// This is the bucket's r2.dev development URL rather than a custom domain: R2
// custom domains require the zone to live in the same Cloudflare account, and
// canvascope.org is on Google Cloud DNS with www pointing at Vercel. r2.dev is
// rate limited and Cloudflare calls it non-production, which is tolerable here
// because nobody links to it — users only ever hit canvascope.org/downloads/…
// and this is just the redirect target. If download volume ever trips the
// limits, move DNS to Cloudflare and change this one line.
export const RECEIVER_DOWNLOADS_ORIGIN =
  "https://pub-ade919295bdc4b3aa26587e9926be160.r2.dev";

// Enclosure URLs in the appcast must sit under this prefix. Pointing them
// straight at R2 would nail the storage host into feeds already installed on
// users' machines; going through canvascope.org keeps it swappable.
export const RECEIVER_ENCLOSURE_PREFIX =
  "https://www.canvascope.org/downloads/";

// Versioned DMG names. Also matched by the wildcard redirect in next.config.ts,
// which is deliberately narrow so /downloads/<anything> does not become an
// open door onto the bucket.
export const RECEIVER_DMG_PATTERN = /^LectraReceiver-\d+\.\d+\.\d+\.dmg$/;

export type PublishedReceiverRelease = {
  /** e.g. "LectraReceiver-1.0.0.dmg" — the R2 object name. */
  dmgFilename: string;
  /** Sparkle's monotonic build number, used to pick the newest item. */
  buildVersion: number;
  /** e.g. "1.0.0", when the feed records one. */
  shortVersion: string | null;
  /** Size of the signed DMG in bytes, so a publish can verify it has the right file. */
  byteLength: number | null;
};

function readAttribute(tag: string, name: string): string | null {
  const match = tag.match(
    new RegExp(`(?:^|\\s)${name.replace(":", "\\:")}="([^"]*)"`),
  );

  return match ? match[1] : null;
}

function readChildText(item: string, name: string): string | null {
  const match = item.match(
    new RegExp(`<${name.replace(":", "\\:")}>([^<]*)</${name.replace(":", "\\:")}>`),
  );

  return match ? match[1].trim() : null;
}

/**
 * Find the newest release described by a Sparkle appcast.
 *
 * Returns null when the feed has no entries at all, which is the state before
 * the first release ships. Anything else malformed throws: a build that fails
 * loudly is much better than one that quietly stops offering updates.
 */
export function publishedReleaseFromAppcast(
  xml: string,
): PublishedReceiverRelease | null {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/g) ?? [];

  if (items.length === 0) {
    return null;
  }

  const releases = items.map((item): PublishedReceiverRelease => {
    const enclosure = item.match(/<enclosure\b[^>]*>/)?.[0];

    if (!enclosure) {
      throw new Error("appcast <item> has no <enclosure>");
    }

    const url = readAttribute(enclosure, "url");

    if (!url) {
      throw new Error("appcast <enclosure> has no url attribute");
    }

    if (!url.startsWith(RECEIVER_ENCLOSURE_PREFIX)) {
      throw new Error(
        `appcast enclosure url ${url} does not start with ${RECEIVER_ENCLOSURE_PREFIX} — ` +
          "regenerate it with the right --download-url-prefix",
      );
    }

    const dmgFilename = decodeURIComponent(url.slice(RECEIVER_ENCLOSURE_PREFIX.length));

    if (!RECEIVER_DMG_PATTERN.test(dmgFilename)) {
      throw new Error(
        `appcast points at "${dmgFilename}", which is not a versioned ` +
          "LectraReceiver-X.Y.Z.dmg — published DMGs must be immutable",
      );
    }

    const rawBuild =
      readAttribute(enclosure, "sparkle:version") ??
      readChildText(item, "sparkle:version");
    const buildVersion = Number(rawBuild);

    if (!rawBuild || !Number.isFinite(buildVersion)) {
      throw new Error(
        `appcast entry for ${dmgFilename} has no numeric sparkle:version`,
      );
    }

    const rawLength = readAttribute(enclosure, "length");

    return {
      dmgFilename,
      buildVersion,
      shortVersion:
        readAttribute(enclosure, "sparkle:shortVersionString") ??
        readChildText(item, "sparkle:shortVersionString"),
      byteLength:
        rawLength && Number.isFinite(Number(rawLength)) ? Number(rawLength) : null,
    };
  });

  // Sparkle offers the highest build number, so the redirect must agree.
  return releases.reduce((newest, release) =>
    release.buildVersion > newest.buildVersion ? release : newest,
  );
}
