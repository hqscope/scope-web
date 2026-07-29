# Lectra + Canvascope Integration

This document defines the website-owned cross-subsidiary auth, reminder, and
account-protection contract. The active extension receive path is DropBridge v3:
realtime wake, explicit claim/download, receipt logging, and polling fallback.

## Goal
- Users sign in with **Canvascope (Google OAuth)**.
- Lectra links to that Canvascope identity.
- Lectra can push reminder intents so they show in Canvascope reminders.
- Canvascope can expose a verified-domain RISC receiver proxy for Google
  Cross-Account Protection events.

## Required Environment Variables
Set these in the Canvascope web deployment (or local `.env.local`):

- `CANVASCOPE_AUTH_BASE_URL` (example: `http://localhost:3000`)
- `CANVASCOPE_SESSION_SECRET` (long random secret)
- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- RISC receiver deployment config for `/api/risc-receiver` when Google
  Cross-Account Protection is enabled.

## Endpoints

### 1) Start Google OAuth
`GET /api/auth/google/start`

Optional query:
- `return_to`: relative path to redirect to after successful callback.

### 2) Google OAuth Callback
`GET /api/auth/google/callback`

- Exchanges Google code with PKCE verifier.
- Sets signed `canvascope_session` cookie.
- Redirects to `return_to` or `/account`.

### 3) Lectra Link Bootstrap (iOS entry)
`GET /api/integrations/lectra/bootstrap`

Flow:
- If not logged in: redirects to Google OAuth start with `return_to` back to bootstrap.
- If logged in: creates short-lived link token and redirects to:
  - `lectra://auth/canvascope?linkToken=...`

Use this URL in `ASWebAuthenticationSession` from Lectra iOS.

### 4) Exchange Link Token for API Access Token
`POST /api/integrations/lectra/exchange`

Request body:
```json
{
  "linkToken": "<token from deep link>",
  "deviceId": "iphone-15-pro"
}
```

Response body:
```json
{
  "accessToken": "...",
  "tokenType": "Bearer",
  "expiresAt": "2026-03-21T00:00:00.000Z",
  "scopes": ["reminders:write", "reminders:read"]
}
```

### 5) Push Reminder from Lectra
`POST /api/integrations/lectra/reminders`

Headers:
- `Authorization: Bearer <accessToken>`

Request body:
```json
{
  "rawText": "remind me tomorrow at 9am to review chem notes",
  "sourceApp": "lectra-ios"
}
```

Optional overrides:
```json
{
  "rawText": "call advisor",
  "sourceApp": "lectra-ios",
  "reminder": {
    "title": "Call premed advisor",
    "dueAtIso": "2026-02-21T17:00:00.000Z",
    "repeatDaily": false
  }
}
```

Response:
- Returns created reminder object.

### 6) Read Canvascope Reminders (session-based)
`GET /api/reminders`

- Requires signed `canvascope_session` cookie.
- Returns reminders for logged-in user.

### 7) RISC Receiver Proxy
`POST /api/risc-receiver`

- Receives Google Cross-Account Protection security event tokens on the verified
  Canvascope domain.
- Forwards the body to the Supabase `risc-receiver` function.
- Returns the upstream status unchanged.
- The Supabase receiver validates the event, dedupes it, revokes affected
  sessions, and can enforce sign-in blocking for disabled accounts.

## DropBridge v3 Context

Canvascope -> Lectra still writes document metadata through the shared
`lectra_documents` / `synced_items` contract.

Lectra -> Canvascope now uses the DropBridge receive path maintained in the
extension runtime:

- realtime receiver wake from an offscreen document
- immediate upload claim by upload id
- browser download handoff
- receipt logging for delivery status
- alarm polling fallback when realtime is unavailable

## Local Testing Quickstart
1. Start web app:
```bash
npm run dev
```

2. Open:
- `http://localhost:3000/account`

3. Sign in and link:
- Use `Sign in with Google`.
- Or trigger Lectra flow via `/api/integrations/lectra/bootstrap`.

4. Exchange token and post reminder:
- Use `linkToken` from deep link.
- Call `/api/integrations/lectra/exchange`.
- Then call `/api/integrations/lectra/reminders` with Bearer token.
