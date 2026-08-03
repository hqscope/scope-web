import { readFileSync } from "node:fs";
import path from "node:path";

import type { NextConfig } from "next";

import {
  RECEIVER_DMG_PATTERN,
  RECEIVER_DOWNLOADS_ORIGIN,
  publishedReleaseFromAppcast,
} from "./src/lib/receiver-release";

// Read at build time. The appcast is the single record of which Lectra Receiver
// build is live, so the /downloads redirect is derived from it rather than from
// a constant that could drift out of sync with the feed.
const publishedReceiver = publishedReleaseFromAppcast(
  readFileSync(path.join(process.cwd(), "public/updates/appcast.xml"), "utf8"),
);

if (!publishedReceiver) {
  console.warn(
    "[receiver] appcast.xml has no entries — /downloads/LectraReceiver.dmg will 404 until the first release",
  );
}

// Matches only versioned DMGs (and their checksums), so /downloads/<anything>
// does not turn into an open door onto the bucket.
const receiverVersionedFile = RECEIVER_DMG_PATTERN.source
  .replace(/^\^/, "")
  .replace(/\$$/, "")
  .concat("(?:\\.sha256)?");

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [
      // The standalone blog (blog.canvascope.org) was merged into the newsroom.
      { source: "/blog", destination: "/newsroom", permanent: true },
      { source: "/blog/:path*", destination: "/newsroom", permanent: true },
      // Canvascope was renamed to Scope. Keep the old extension URL alive —
      // it is linked from the Chrome Web Store listing and older newsroom posts.
      {
        source: "/product/canvascope",
        destination: "/product/scope",
        permanent: true,
      },

      // --- Lectra Receiver downloads (see src/lib/receiver-release.ts) ---
      //
      // These are TEMPORARY (307) on purpose. A permanent redirect is cached by
      // browsers indefinitely, and this URL has to be repointable at every
      // release. They are redirects rather than rewrites on purpose too: a
      // rewrite would stream ~50 MB through Vercel on every download, billed as
      // bandwidth and subject to a 120s proxy timeout the download can exceed.
      //
      // The stable URL the /receiver page and the iOS app depend on. Always the
      // newest build, per the appcast. Must stay ahead of the versioned rule.
      ...(publishedReceiver
        ? [
            {
              source: "/downloads/LectraReceiver.dmg",
              destination: `${RECEIVER_DOWNLOADS_ORIGIN}/${publishedReceiver.dmgFilename}`,
              permanent: false,
            },
          ]
        : []),
      // Every versioned DMG, e.g. /downloads/LectraReceiver-1.0.0.dmg. Sparkle
      // appcast enclosures point here rather than straight at R2, so the storage
      // host stays swappable without invalidating shipped update feeds.
      {
        source: `/downloads/:file(${receiverVersionedFile})`,
        destination: `${RECEIVER_DOWNLOADS_ORIGIN}/:file`,
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        // The Sparkle feed installed copies of Lectra Receiver poll. Short cache
        // so a new release is picked up promptly. Content-Type is pinned because
        // Sparkle feeds are expected to be served as XML.
        source: "/updates/appcast.xml",
        headers: [
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=300" },
        ],
      },
    ];
  },
};

export default nextConfig;
