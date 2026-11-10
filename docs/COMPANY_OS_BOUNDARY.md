# OutboundOS ↔ Sina Founder OS / Company OS / Motor / Runway

The canonical Sina Founder OS integration notes (Noetfield-Systems/sina_founder_os, integrations/noetfeld-os/README.md) say the Founder→Company execution handoff is not commissioned and require a Governor-authorized DecisionRecord + WorkPacket, A3 authority ceiling, tenant binding and independent verification.

**Do not create a parallel OS scheduler, workforce registry, memory system or authority grant.** OutboundOS is a vertical sales runtime and sends only minimal aggregate events to a future authenticated adapter. Default network dispatch: disabled until a real endpoint, contract, tenant, signature and receipt are verified.

Required wire contract when activated:
- Input: `SalesMissionPacket.v1` carrying company, tenant, campaign, budget cap, expiry, idempotency key, DecisionRecord and typed WorkPacket from Company OS.
- Output: `OutboundSalesEvent.v1` with event_id, tenant_id, state, provider receipt, verified evidence and cost.
- No unrestricted customer PII, raw email content, admin keys or private memory in cross-company telemetry.
- No unapproved money movement, nonconsensual messaging or fabricated evidence.

The product remains fully usable independently. Provider APIs and campaign automation are separate from the higher-level Founder OS commissioning state.
