# OutboundOS product-led launch acceptance

## North star

Earn the first ten **real customer conversations**, not generated leads, automatic message counts or mockups.

## Public visitor journey

- Lands on \`/\` with immediately usable free kit and no account barrier.
- Enters their own offer, buyer, pain point and optional factual proof.
- Gets an editable 7-day outreach plan and 3 concrete drafts in the browser.
- Can copy drafts, export Markdown, or obtain a blank contact CSV template.
- Can save the first draft to their real PostgreSQL guest workspace.
- Can opt in explicitly to the Growth waitlist, stored via the existing endpoint.
- Can read transparent terms, privacy policy and honest product capability details.

## What is NOT represented as done

- The free kit does not discover real buyers or verify emails.
- No fictional contacts, testimonials, reviews, revenue, email acceptance or external verifier receipts.
- Growth waitlist is not a paid checkout.
- A saved draft is not a sent email.
- Full multi-touch campaign persistence is a separate roadmap item.
- External provider readiness varies by workspace and real keys.

## Measured events

The existing \`os_growth_events\` table accepts:
\`landing_view\`, \`pricing_view\`, \`workspace_click\`, \`growth_open\`, \`faq_open\`, \`kit_generated\`, \`kit_copy\`, \`kit_download\`, and \`kit_saved\`.
User consent to early access is stored in \`os_growth_leads\`.
Do not fabricate the counts.

## Commercial test

When real traffic exists, measure generated kits / unique visitors, draft campaigns saved / generated kits, real contacts added / saved campaigns, real replies / actual sent contacts, and independently verified conversions. Source attribution is coarse; do not claim multi-touch attribution from simple event names.

## Release test

\`bun test\` + Playwright Chromium on fresh test Postgres, responsive mobile and desktop, real persist from kit to /fa, consent waitlist, passkey, and no executable user HTML in generated text. No live customer data in CI.
