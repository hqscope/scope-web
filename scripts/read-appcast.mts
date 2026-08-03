// Print the newest release described by a Sparkle appcast, as tab-separated
// fields: dmgFilename, buildVersion, shortVersion, byteLength.
//
// This exists so publish-receiver-release.sh and next.config.ts read an appcast
// through the exact same code. They used to have separate parsers, and they
// disagreed: the shell one only understood sparkle:version as an enclosure
// attribute, while generate_appcast actually emits it as a child element.
//
// Exits 1 with the reason on stderr if the feed is unusable or empty.

import { readFileSync } from "node:fs";

import { publishedReleaseFromAppcast } from "../src/lib/receiver-release.ts";

const path = process.argv[2];

if (!path) {
  console.error("usage: read-appcast.mts <path/to/appcast.xml>");
  process.exit(1);
}

try {
  const release = publishedReleaseFromAppcast(readFileSync(path, "utf8"));

  if (!release) {
    console.error(`${path} describes no releases`);
    process.exit(1);
  }

  process.stdout.write(
    [
      release.dmgFilename,
      release.buildVersion,
      release.shortVersion ?? "",
      release.byteLength ?? "",
    ].join("\t") + "\n",
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
