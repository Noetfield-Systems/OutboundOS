# OutboundOS

**Find your first ten real customer conversations.**

A lightweight, self-hostable outbound sales workspace with a free interactive outreach kit, real contact records, campaign drafts, follow-ups, reply handling and an audit trail that separates **plans**, **reported work**, **provider events** and **verified outcomes**.

[**Live product and free kit**](https://outboundos-github-production.up.railway.app/) · [**Open the working sales desk**](https://outboundos-github-production.up.railway.app/fa) · [**Try the full workspace**](https://outboundos-github-production.up.railway.app/app)

> Status: public early product, deployable application. No claim that integrations are configured for every workspace or that real customers, revenue, successful sends or meetings have been collected. No invented social proof.

## What can I actually do?

| Workflow | Delivered behavior |
| --- | --- |
| **Try before signing up** | Enter your real offer, buyer and buyer problem. Generate a practical 7-day outreach plan and three editable messages in-browser. No generated leads or external AI API claims. |
| **Take your work with you** | Download your plan as Markdown, copy messages or export a blank contact CSV template. |
| **Save a real campaign** | One click creates a real *draft* campaign in a guest workspace backed by PostgreSQL; nothing is sent by that action. |
| **Find the next action** | Work an action queue for due, overdue, upcoming and unscheduled contacts; complete work and retain the immutable action history. |
| **Operate contacts** | Record real prospects from documented sources, import CSV, use Kanban/table views, save filters, assign owners, qualify, hand off and track next actions. |
| **Stay honest about outcomes** | Keep proposed content apart from reported sends and provider-confirmed events. Reported conversions do not satisfy the independently verified first-10 goal. |
| **Use supported providers** | Existing support for Apollo, OpenAI and Resend requires user-supplied, correctly configured credentials, subject to each provider’s availability and rules. |
| **Save your workspace** | Guest first, optional WebAuthn passkey for persistence/recovery. |

### How the first-ten loop works

1. Describe **what you sell**, **to whom**, and **which real problem** it solves.
2. Review and edit the generated *draft*. Use verified claims only.
3. Save your outreach kit as a workspace campaign draft.
4. Add **ten real, relevant prospects** using sources you are allowed to contact.
5. Send through your actual channel, record accurate send/reply evidence, and stop when requested.
6. Work the next action, record results and learn from conversions backed by evidence.

**The actual workflow is the product.** No synthetic prospect names are inserted into live pipelines and the public hero is an interactive tool, not a screenshot of fake analytics.

## Tech stack

- **Bun / TypeScript:** HTTP runtime, server-rendered pages, application endpoints.
- **PostgreSQL:** isolated workspaces, campaigns, prospects, messages, tasks and evidence.
- **WebAuthn / passkeys:** optional account persistence and recovery.
- **Playwright + bun:test:** browser and application regression tests.
- **Railway:** current reference deployment; existing scheduled worker (not a duplicate scheduler).
- **Apollo / Resend / OpenAI:** integrations where the workspace has valid provider keys and permitted configurations.

No external font/CDN or paid service is required for the public free kit.

## Quick start

Requires **Bun** and a PostgreSQL database.

```bash
git clone https://github.com/Noetfield-Systems/OutboundOS.git
cd OutboundOS
bun install
export DATABASE_URL='postgresql://USER:PASSWORD@HOST:5432/OUTBOUNDOS'
bun run start
```

Open [http://localhost:8080](http://localhost:8080). The free kit runs locally in the browser. The sales desk is at \`/fa\`, and the main workspace is at \`/app\`.

For optional integrations, see [\`.env.example\`](.env.example). Do not commit provider keys.

```bash
bun test
bun run check
bun run test:browser
```

Browser regression requires a running test database and environment variables as configured in [the browser workflow](.github/workflows/browser.yml).

## Product routes

| Route | Use |
| --- | --- |
| \`/\` or \`/playbook\` | Public landing page with live first-ten kit and consent-based early access |
| \`/fa\` | Persian-language operational sales desk (RTL) |
| \`/app\` | English workspace, provider setup, passkey and advanced flows |
| \`/privacy\`, \`/terms\` | Public legal information |
| \`/health/ready\` | Backend readiness check |

## Architecture and integrity boundaries

```text
Public kit (browser-only user input)
    ├─ Copy / Markdown / empty CSV template
    ├─ POST /api/fa/campaigns (draft, never a send)
    │     └─ guest session / PostgreSQL workspace
    └─ POST /api/public/interest (explicit opt-in waitlist)
                    │
          Sales desk + workspace
            ├─ contacts / campaigns / messages
            ├─ next actions / completed actions / saved views
            ├─ replies / outcomes / evidence
            └─ optional provider-backed sends, events and agent runtime
```

OutboundOS is **independent**. Integrations with Sina Founder OS, Company OS or other products should use explicit, authenticated contracts and must not silently create execution authority. See [Company OS boundary](docs/COMPANY_OS_BOUNDARY.md).

There are deliberate constraints:

- Drafts, self-reported sends, provider acceptance and independent verification are different events. A reported conversion is not treated as verified.
- Automated sending requires provider configuration, sender authorization and applicable permission. The public kit does **not** send messages.
- Generated text is an editable template, not a representation of research into a real prospect.
- Workspace sessions are private; use passkeys to recover across devices.
- Growth is an opt-in early-access request. **No paid subscription or checkout is sold from this public page today.**
- The repository is publicly visible. Review the repository's licensing status before redistributing or incorporating code into another project.

## Contribute

Useful issues and pull requests include accessibility fixes, UX improvements, realistic provider-adapter tests, multi-step follow-up persistence, independent verification, reliable onboarding and better conversion analytics.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md). Please use test accounts and synthetic *test fixtures* only — never upload actual customer or prospect data to issues or screenshots.

## Roadmap

- [x] Live public first-ten outreach kit (no account, editable output, exports)
- [x] Persistence into the existing real campaign workspace
- [x] Public consent-based Growth interest capture
- [x] Daily contact/action workbench and stored views
- [x] Explicit self-report vs verified outcome boundaries
- [ ] Full persisted multi-touch campaign handoff from the kit
- [ ] Production-confirmed provider end-to-end send/reply in a real pilot
- [ ] Independently verified conversion receipts
- [ ] Real-user usability study and commercial conversion reporting

**The project does not purchase GitHub stars, fabricate users, or display unverified reviews.**
