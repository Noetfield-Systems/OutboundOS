# Security policy

## Reporting a vulnerability

Do **not** open a public issue for exploit details, private keys, credentials, customer data, session cookies or a live affected tenant. Contact the repository maintainers privately through GitHub's private vulnerability reporting or another private channel provided by the owner.

Please include a minimal reproduction using a test workspace, expected versus actual result, affected endpoint/version, impact and any safe mitigation.

## Application boundaries

- Each workspace is tenant-scoped in PostgreSQL; regression tests must check isolation.
- Guests can start a private workspace; a passkey is required for durable recovery across devices.
- Provider and worker credentials are server-side. Never place credentials or actual customer data in client code, screenshots or logs.
- The free outreach kit is client-side and **does not send emails or scrape prospects**.
- The Save-to-workspace action creates a draft campaign, not an outbound send.
- Self-reported actions and independently verified outcomes must not be conflated.
- Unsubscribe, provider verification, origin checks and sending limits must be respected.

## Deployment

Use production secrets from the hosting provider, use HTTPS for WebAuthn, configure a real email provider before enabling sends and verify actual events before claiming production end-to-end delivery. Keep test and production PostgreSQL databases separate.
