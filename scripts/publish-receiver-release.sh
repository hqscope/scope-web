#!/usr/bin/env bash
#
# Publish a Lectra Receiver release.
#
#   ./scripts/publish-receiver-release.sh \
#       ~/Library/Developer/LectraReceiver-release/appcast/appcast.xml
#
# The appcast is the input, and everything else is derived from it: which DMG to
# upload, what version it is, and how big it should be. Nothing here takes a
# version argument and nothing stores one, so the download redirect cannot end
# up pointing at a build the update feed does not describe.
#
# Does three things, in this order:
#   1. Uploads the DMG to Cloudflare R2 under its versioned name, cached forever
#      (the versioned name makes that safe), and verifies it is live.
#   2. Copies the appcast into public/updates/ verbatim, REPLACING the old one.
#   3. Leaves the diff for you to review, commit and deploy.
#
# It never commits, never overwrites an already-published version, and never
# edits the appcast — those entries are EdDSA-signed by generate_appcast in the
# lectra-ios repo and must reach this repo byte-for-byte.
#
# Requires: npx wrangler (authenticated — `npx wrangler login`, or set
# CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID).

set -euo pipefail

R2_BUCKET="${R2_BUCKET:-lectra-receiver-download}"

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
release_ts="$repo_root/src/lib/receiver-release.ts"
appcast_dest="$repo_root/public/updates/appcast.xml"

die() { printf '\nerror: %s\n' "$*" >&2; exit 1; }
step() { printf '\n==> %s\n' "$*"; }

# First quoted string at or after `export const <name> =`, so the value can sit
# on the same line or the next one.
read_const() {
  awk -v name="$1" '
    $0 ~ ("^export const " name " =") { found = 1 }
    found && match($0, /"[^"]*"/) { print substr($0, RSTART + 1, RLENGTH - 2); exit }
  ' "$release_ts"
}

# --- 1. Read the appcast -----------------------------------------------------

[ $# -ge 1 ] && [ $# -le 2 ] \
  || die "usage: $(basename "$0") <path/to/appcast.xml> [path/to/dmg]"

appcast_src="$1"
[ -f "$appcast_src" ] || die "no appcast at $appcast_src"

grep -q 'sparkle:edSignature' "$appcast_src" \
  || die "$appcast_src has no EdDSA signatures — it was not produced by generate_appcast"

origin="$(read_const RECEIVER_DOWNLOADS_ORIGIN)"
[ -n "$origin" ] || die "could not read RECEIVER_DOWNLOADS_ORIGIN from $release_ts"

# Parsed by the same module next.config.ts uses to build the redirect, so the
# file this uploads and the file the website points at can never be chosen by
# two different sets of rules. It also enforces that enclosures are versioned
# and sit under the canvascope.org prefix, and reports why if not.
parsed="$(node --no-warnings --experimental-strip-types \
  "$repo_root/scripts/read-appcast.mts" "$appcast_src")" \
  || die "could not read $appcast_src (see above)"

key="$(printf '%s' "$parsed" | cut -f1)"
build_version="$(printf '%s' "$parsed" | cut -f2)"
version="$(printf '%s' "$parsed" | cut -f3)"
enclosure_length="$(printf '%s' "$parsed" | cut -f4)"

[ -n "$key" ] || die "appcast parse returned no DMG filename"

# shortVersionString is optional in a feed; the filename always carries it.
if [ -z "$version" ]; then
  version="${key#LectraReceiver-}"
  version="${version%.dmg}"
fi

public_url="${origin}/${key}"

# --- 2. Locate and check the DMG --------------------------------------------

if [ $# -eq 2 ]; then
  dmg_src="$2"
else
  # generate_appcast runs on a directory containing the DMG it describes.
  appcast_dir="$(cd "$(dirname "$appcast_src")" && pwd)"
  for candidate in "$appcast_dir/$key" "$appcast_dir/../$key"; do
    [ -f "$candidate" ] && dmg_src="$candidate" && break
  done
fi
[ -n "${dmg_src:-}" ] && [ -f "$dmg_src" ] \
  || die "could not find $key next to the appcast — pass its path as the second argument"

# Ties the bytes about to be uploaded to the signed entry that describes them.
if [ -n "$enclosure_length" ]; then
  actual_length="$(wc -c < "$dmg_src" | tr -d ' ')"
  [ "$actual_length" = "$enclosure_length" ] \
    || die "$dmg_src is $actual_length bytes but the appcast says $enclosure_length — mismatched build"
fi

if [ -f "${dmg_src}.sha256" ]; then
  expected="$(awk '{print $1}' "${dmg_src}.sha256")"
  actual="$(shasum -a 256 "$dmg_src" | awk '{print $1}')"
  [ "$expected" = "$actual" ] || die "DMG does not match ${dmg_src}.sha256"
fi

printf '\nPublishing Lectra Receiver %s (build %s)\n' "$version" "$build_version"
printf '  DMG      %s (%s)\n' "$dmg_src" "$(du -h "$dmg_src" | awk '{print $1}')"
printf '  appcast  %s\n' "$appcast_src"
printf '  bucket   r2://%s/%s\n' "$R2_BUCKET" "$key"
printf '  public   %s\n' "$public_url"
printf '\nContinue? [y/N] '
read -r reply
[ "$reply" = "y" ] || [ "$reply" = "Y" ] || die "aborted"

# --- 3. Upload to R2 ---------------------------------------------------------

# Published versions are immutable: an installed app may already be downloading
# this exact URL, and its EdDSA signature covers these bytes. The one exception
# is re-running after a half-finished publish, where the bytes already up there
# are byte-identical to the ones we were about to send.
step "Checking $key is not already published"
# `|| true` because a 404 here is the expected case and -f makes curl exit
# non-zero for it, which set -e would otherwise treat as fatal.
published_length="$(
  { curl -fsI --max-time 20 "$public_url" 2>/dev/null \
    | sed -n 's/^[Cc]ontent-[Ll]ength:[[:space:]]*\([0-9]*\).*/\1/p' | tr -d '\r'; } || true
)"

if [ -n "$published_length" ]; then
  [ "$published_length" = "$(wc -c < "$dmg_src" | tr -d ' ')" ] \
    || die "$public_url already exists with different contents — bump ./VERSION and rebuild"
  step "Identical $key is already in R2 — skipping upload (resuming a previous run)"
else
  step "Uploading to r2://$R2_BUCKET/$key"
  # --remote is required: without it wrangler writes to a local simulated bucket.
  npx wrangler r2 object put "${R2_BUCKET}/${key}" \
    --file "$dmg_src" \
    --remote \
    --content-type "application/x-apple-diskimage" \
    --cache-control "public, max-age=31536000, immutable"
fi

if [ -f "${dmg_src}.sha256" ]; then
  step "Uploading checksum to r2://$R2_BUCKET/${key}.sha256"
  npx wrangler r2 object put "${R2_BUCKET}/${key}.sha256" \
    --file "${dmg_src}.sha256" \
    --remote \
    --content-type "text/plain; charset=utf-8" \
    --cache-control "public, max-age=31536000, immutable"
fi

# wrangler already confirmed the object is in the bucket. This checks the
# separate question of whether it is reachable over the public origin, which on
# a freshly enabled r2.dev URL can lag by minutes.
step "Verifying $public_url is live"
live=""
for attempt in 1 2 3 4 5 6; do
  if curl -fsI --max-time 30 "$public_url" >/dev/null 2>&1; then
    live="yes"
    break
  fi
  printf '    not reachable yet (attempt %s/6), waiting 20s...\n' "$attempt"
  sleep 20
done

if [ -z "$live" ]; then
  cat >&2 <<EOF

warning: $key is in the bucket, but $public_url is still not reachable.

On a first release this usually means the bucket's r2.dev public URL has not
finished activating. Check that public access is enabled for $R2_BUCKET.

The DMG itself uploaded fine, so it is safe to continue and let the origin catch
up — but /downloads/LectraReceiver.dmg will 404 until it does.
EOF
  printf '\nCopy the appcast in anyway? [y/N] '
  read -r reply
  [ "$reply" = "y" ] || [ "$reply" = "Y" ] || die "stopped — re-run once $public_url resolves"
fi

# --- 4. Update this repo -----------------------------------------------------
# Only after the DMG is confirmed live, so the redirect never points at nothing.

step "Replacing public/updates/appcast.xml (verbatim, not appended)"
cp "$appcast_src" "$appcast_dest"

cat <<EOF

Done. ${key} is live and this repo now points at it.

The redirect is derived from the appcast at build time, so there is nothing else
to bump. Review, then commit and deploy:

  git diff -- public/updates/appcast.xml

After deploying, confirm the contract:

  curl -sI https://www.canvascope.org/downloads/LectraReceiver.dmg   # 307 -> ${key}
  curl -sI https://www.canvascope.org/updates/appcast.xml            # application/xml, max-age=300
EOF
