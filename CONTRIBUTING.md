# Contributing to OutboundOS

Thanks for helping make outbound workflows more useful and trustworthy. This project is publicly visible and welcomes well-scoped issues and pull requests.

## Start here

1. Read [README.md](README.md) and [docs/COMPANY_OS_BOUNDARY.md](docs/COMPANY_OS_BOUNDARY.md).
2. Confirm the issue with an exact route, browser/version, expected result, actual result and minimal reproduction.
3. Prefer a small PR that addresses one user-visible problem and includes a regression test.
4. Run \`bun test\`, \`bun run check\`, and \`bun run test:browser\` with an isolated test PostgreSQL database.
5. Record screenshots from **test fixtures only**; never attach personal contact data, customer emails, API keys or sessions.

## High-value contributions

- Faster path from the public outreach kit to an actually persisted, reviewable multi-touch campaign.
- Contact onboarding and ICP qualification with transparent source/evidence.
- Accessibility, mobile UX, RTL language improvements, keyboard support.
- Better provider configuration and verified send/reply reliability.
- Independent, scoped conversion verification and truthful reporting.
- Clearer privacy boundaries and regression coverage.

## Rules for data and claims

No fake production leads, testimonials, orders, meetings, sent emails, revenues or conversion percentages. Test fixtures must be explicitly marked as fixtures. Do not promote a simulated integration into a live capability claim. New provider actions need explicit provenance and authorization.

Use only fictional test people and reserved example domains such as example.org in tests. Respect workspace isolation. Do not introduce duplicate schedulers, agent registries or authorization planes when integrations already exist.

## Maintainer workflow

We review reproducible issues and PRs, not claim-based feature announcements. Large feature proposals should include user scenario, input/output examples, API impact and measurable acceptance criteria.

### License status

The repository currently has no explicit open-source license file. **Public GitHub visibility is not an open-source license.** Do not assume permission to redistribute, sell, or incorporate code into another product. The rights holder may select and publish a license separately. Contributions must be your own or appropriately authorized.
