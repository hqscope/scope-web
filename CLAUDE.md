
## Autofix agent (scope-ops)

Bugs and tasks filed from Slack (or handed off from Claude) become GitHub issues here. Labeling an issue `claude:fix` starts
`.github/workflows/claude-fix.yml`, which runs Claude with `.github/claude/fix-prompt.md`.

- **Tests:** `npm ci && npm run typecheck`. Run only the tests that cover the change.
- **Output:** a draft PR from `fix/<name>-<issue>` (bugs) or `feature/<name>-<issue>` (tasks) with Summary, Root cause, Changes,
  **Verified**, **Not verified**, and `Fixes #<issue>`. Noel merges. The agent never pushes to
  `main`, merges, or force-pushes.
- **Out of bounds** (comment `NEEDS-NOEL: <why>` and stop): migrations or `supabase/`, edge-function
  deploys, billing, auth flows, secrets, anything needing a dashboard or a device, workflow files,
  and user-facing copy that makes product claims.
- **Honesty:** list only checks that actually ran under Verified. Everything else goes under Not
  verified.
- **Copy:** UI strings describe the experience, not the mechanics. Product name is Scope;
  "Canvascope" only where it is already the legacy name.
- **Context:** `scope-docs/AGENT_BRIEFING.md` in hqscope/scope-docs.
