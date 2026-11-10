import { test, expect } from "bun:test";
import { validateSalesMission } from "../server/contract.ts";
const valid=()=>({
  schema:"SalesMissionPacket.v1",workspace_id:"workspace-1",tenant_id:"company-1",
  decision_record:{id:"decision-123",tenant_id:"company-1",status:"approved",authority:"A2",expires_at:new Date(Date.now()+60000).toISOString()},
  work_packet:{id:"wp-123",tenant_id:"company-1",idempotency_key:"request-1",decision_id:"decision-123",kind:"sales.campaign.draft",
    input:{name:"Qualified customers",subject:"B2B outreach",body:"Hello there"}}
});
test("valid Company OS mission creates a bounded draft only",()=>{
  const r=validateSalesMission(valid());
  expect(r.ok).toBe(true);expect(r.campaign.name).toBe("Qualified customers");
});
test("expired or missing DecisionRecord always fails",()=>{
  const a=valid();a.decision_record.expires_at=new Date(Date.now()-30000).toISOString();
  expect(validateSalesMission(a).error).toBe("PERMIT_EXPIRED");
  const b=valid();delete b.decision_record;
  expect(validateSalesMission(b).error).toBe("AUTHORITY_MISSING");
});
test("tenant mismatch and A4 authority are denied",()=>{
  const a=valid();a.work_packet.tenant_id="different";
  expect(validateSalesMission(a).error).toBe("TENANT_MISMATCH");
  const b=valid();b.decision_record.authority="A4";
  expect(validateSalesMission(b).error).toBe("AUTHORITY_EXCEEDED");
});
test("non-sales or direct send action is not permitted",()=>{
  const a=valid();a.work_packet.kind="sales.email.send";
  expect(validateSalesMission(a).error).toBe("ACTION_NOT_PERMITTED");
});
test("decision mismatch fails",()=>{
  const a=valid();a.work_packet.decision_id="other";
  expect(validateSalesMission(a).error).toBe("DECISION_NOT_BOUND");
});
