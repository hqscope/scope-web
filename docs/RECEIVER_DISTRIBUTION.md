# Hosting Lectra Receiver

This repo hosts distribution for **Lectra Receiver**, the notarized Developer ID
macOS app. The app itself is built in `lectra-ios` under `LectraReceiver/` — no
app or Swift code belongs here.

## The contract

Three URLs are hardcoded in shipped software and can never be renamed:

| URL | What it is | Implemented by |
| --- | --- | --- |
| `/receiver` | Landing page. The iOS app hardcodes `https://www.canvascope.org/receiver`. | `src/app/receiver/page.tsx` |
| `/downloads/LectraReceiver.dmg` | Always the newest build. Linked from the landing page. | 307 redirect in `next.config.ts` |
| `/updates/appcast.xml` | Sparkle feed installed copies poll for updates. Matches the app's compiled-in `SUFeedURL`. | `public/updates/appcast.xml` |

## How it works

**DMGs are never committed.** At ~50 MB per release they would permanently bloat
git history. They live in Cloudflare R2 under immutable versioned names
(`LectraReceiver-1.2.0.dmg`), uploaded with `Cache-Control: public, max-age=31536000,
immutable` — safe precisely because the filename encodes the version.

**`/downloads/LectraReceiver.dmg` is a 307, not a 308 and not a rewrite.**

- Temporary, because a permanent redirect gets cached by browsers indefinitely
  and this URL has to be repointable at every release.
- A redirect rather than a rewrite, because a rewrite proxies the whole file
  through Vercel — billed bandwidth per download, and Vercel's 120s proxied
  request timeout is well within reach of a 50 MB download on a slow connection.

A second rule sends versioned filenames — `LectraReceiver-X.Y.Z.dmg` and its
`.sha256`, and nothing else — to the same R2 origin, so every release also has a
canvascope.org URL. Appcast enclosures use those rather than R2 URLs directly,
which keeps the storage host swappable without invalidating feeds already
shipped to users. The pattern is deliberately narrow so `/downloads/<anything>`
does not become an open door onto the bucket.

**There is no version constant.** The redirect target is derived at build time
from the appcast's newest enclosure. The version otherwise lives in two repos
with nothing comparing them, and if they disagreed the failure would be silent:
`/downloads/LectraReceiver.dmg` would serve a build the feed never mentions and
the update would simply never appear. Deriving it means they cannot disagree.

The R2 origin is the bucket's **r2.dev** URL, not a custom domain — attaching
`downloads.canvascope.org` would require moving the whole zone from Google Cloud
DNS to Cloudflare. r2.dev is rate limited and labelled non-production, which is
fine here because nobody links to it: users only ever hit canvascope.org and it
is just the 307 target. If volume ever trips the limits, move DNS to Cloudflare
and change the one constant.

**The appcast is hosted, never authored, here.** Its `<item>` entries are
produced by Sparkle's `generate_appcast` in `lectra-ios` and each carries an
EdDSA signature over the DMG it points at. It reaches this repo byte-for-byte.
Writing, editing, reordering, or re-signing an entry here breaks the signature
check and updates stop working silently. It is served as `application/xml` with
`max-age=300` so releases are picked up promptly.

Redirects and headers both live in `next.config.ts` alongside the site's
existing redirects, rather than in a `vercel.json`. Next's `permanent: false`
emits exactly the 307 required, and unlike `vercel.json` these also work under
`next dev` and `next start`, so a release can be verified before it ships.

## Cutting a release

Bump `VERSION` in `lectra-ios/LectraReceiver`, then build. The build signs,
notarizes, staples, and generates the signed appcast in one pass; output lands
in `~/Library/Developer/LectraReceiver-release/` rather than inside the repo,
because iCloud sync stamps `com.apple.FinderInfo` on the exported bundle and
codesign rejects it.

```
TEAM_ID=YOURTEAMID ./scripts/build-dmg.sh
```

Then, in this repo, hand the publish script the appcast — it works out the rest:

```
./scripts/publish-receiver-release.sh \
    ~/Library/Developer/LectraReceiver-release/appcast/appcast.xml
```

It reads the newest enclosure to learn the version, filename and expected byte
count; finds that DMG next to the appcast; checks its size against the signed
entry and its `.sha256` if present; uploads it to R2 immutably; waits for the
public origin to serve it; then replaces `public/updates/appcast.xml` verbatim.

It refuses to overwrite a version already published with different bytes, but
re-running after a half-finished publish is safe — an identical object already
in the bucket is recognised and the upload skipped. It does not commit: review
the diff and deploy yourself.

After deploying:

```
curl -sI https://www.canvascope.org/downloads/LectraReceiver.dmg   # 307 -> LectraReceiver-1.2.0.dmg
curl -sI https://www.canvascope.org/updates/appcast.xml            # application/xml, max-age=300
```

## Before the first release

Deploy this repo first. Until it ships, `/updates/appcast.xml` 404s, and an
early adopter's copy of Receiver gets a feed error rather than "you're up to
date". The feed is committed empty on purpose so it can go live ahead of any
build.
