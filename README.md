# OutboundOS — autonomous B2B sales agent

**Standalone premium product** modeled on the functional journey of modern AI sales agents, not a visual-only mockup.

**Website → Business Memory → ICP → real prospects → email enrichment → personalized sequences → inbox → meetings → analytics → Autopilot.**

## Runtime
Bun + PostgreSQL, server-rendered premium responsive UI, WebAuthn passkeys, OpenAI, Apollo, Resend, separate scheduled Railway worker.

## Setup
```sh
bun install
export DATABASE_URL='postgres://...'
bun test
bun run server/index.tsx
```

Launch at `http://localhost:8080` or the Railway domain. No Admin Token or mandatory sign-up: first visit creates an isolated guest workspace. Passkey can persist/recover your account.

## Railway
Dockerfile deployment from this GitHub repository. Required: `DATABASE_URL=${{Postgres.DATABASE_URL}}`. Optional provider variables: `OPENAI_API_KEY`, `APOLLO_API_KEY`, `RESEND_API_KEY`, `MAIL_FROM`, `RESEND_WEBHOOK_SECRET`. Passkey requires a valid HTTPS origin (Railway domain). `MASTER_ENCRYPTION_KEY` is a 32-byte hex key for the optional encrypted credential vault.

## Features
- Live website crawling with redirect disabled, public-host restrictions; AI fact extraction when provider connected.
- Multi-tenant SQL storage, cookie session, passkey registration and login; isolation tested in readiness endpoint.
- Apollo discovery and up to 5 profiles/batch enrichment, manual and CSV import.
- Sequence editor, merge fields, 3-day follow-up, send limit, daily audit trail and verified Resend responses.
- Unsubscribe/suppression via signed provider events; inbox and manual reply, meeting tracking.
- Daily scheduled Autopilot worker via private Railway networking; user-controlled activation.
- Server-side provider keys; no fabricated data or success metrics.

## Company OS integration
**Do not confuse the integration boundary with a verified live Company OS ↔ Runway link.** The Founder OS repository documents that external runtime handoff needs Governor-issued DecisionRecord, bounded WorkPacket and independent receipts. For OutboundOS, add a contract-specific bridge only when real deployed endpoints are known; this code does not invent or silently invoke those endpoints. See [boundary](docs/COMPANY_OS_BOUNDARY.md).

## Operational caveats
Provider credentials and domain verification are necessary to send real email. A green health check is not proof of real campaigns, replies or collected revenue. Keep contact permission documented and follow local email laws.
