import { test, expect } from "bun:test";
import { eligibleForSend,sendableCampaign,dailyCapacity,webhookEventId,boundedBody,isUnknownSend,isValidInboundEmail } from "../server/safety.ts";
import { validateSalesMission } from "../server/contract.ts";
const makeLead=(overrides={})=>({name:"Test Buyer",email:"buyer@example.com",consent_basis:"Valid documented consent",status:"qualified",...overrides});
test("Persona 01 — first-time guest cannot accidentally send",()=>{
  expect(eligibleForSend(makeLead({status:"new"}))).toBe(false);
  expect(sendableCampaign({status:"draft"})).toBe(false);
});
test("Persona 02 — sales operator must explicitly activate campaign",()=>{
  expect(sendableCampaign({status:"draft"})).toBe(false);
  expect(sendableCampaign({status:"paused"})).toBe(false);
  expect(sendableCampaign({status:"active"})).toBe(true);
});
test("Persona 03 — compliance owner can suppress messages",()=>{
  for(const status of ["unsubscribed","needs_review","lost","sending","replied"])
    expect(eligibleForSend(makeLead({status}))).toBe(false);
  expect(eligibleForSend(makeLead({consent_basis:""}))).toBe(false);
});
test("Persona 04 — sending cap cannot be exceeded even when requested batch is big",()=>{
  expect(dailyCapacity(19,20,10)).toBe(1);
  expect(dailyCapacity(20,20,10)).toBe(0);
  expect(dailyCapacity(0,20,100)).toBe(20);
  expect(dailyCapacity(8,10,5)).toBe(2);
});
test("Persona 05 — provider admin cannot set invalid cap",()=>{
  expect(dailyCapacity(5000,1000,500)).toBe(0);
  expect(dailyCapacity(0,5000,5000)).toBe(1000);
});
test("Persona 06 — unknown provider state remains review-required",()=>{
  expect(isUnknownSend(new Date(Date.now()-660000))).toBe(true);
  expect(isUnknownSend(new Date(Date.now()-60000))).toBe(false);
  expect(eligibleForSend(makeLead({status:"needs_review"}))).toBe(false);
});
test("Persona 07 — multiple tenants do not share webhook dedupe keys",()=>{
  const first=webhookEventId("tenant-1","provider-event");
  const second=webhookEventId("tenant-2","provider-event");
  expect(first).not.toBe(second);
});
test("Persona 08 — bad emails and oversized JSON rejected",()=>{
  for(const email of ["no-at","",null,"hello @mail.com"]) expect(isValidInboundEmail(email)).toBe(false);
  expect(isValidInboundEmail("support@example.com")).toBe(true);
  expect(()=>boundedBody("x".repeat(350001))).toThrow();
  expect(()=>boundedBody("not-json")).toThrow();
});
test("Persona 09 — Company OS tenant/permit cannot be faked",()=>{
  const permit={schema:"SalesMissionPacket.v1",workspace_id:"w1",tenant_id:"t1",
   decision_record:{id:"d1",tenant_id:"t1",status:"approved",authority:"A2",expires_at:new Date(Date.now()+50000).toISOString()},
   work_packet:{id:"p1",tenant_id:"t1",idempotency_key:"unique",decision_id:"d1",kind:"sales.campaign.draft",input:{name:"A",subject:"B",body:"C"}}};
  expect(validateSalesMission(permit).ok).toBe(true);
  const wrong=structuredClone(permit);wrong.work_packet.tenant_id="t2";
  expect(validateSalesMission(wrong).ok).toBe(false);
});
test("Persona 10 — follow-up email remains opt-in and valid",()=>{
  expect(eligibleForSend(makeLead({status:"contacted"}))).toBe(true);
  expect(eligibleForSend(makeLead({status:"contacted",consent_basis:"  "}))).toBe(false);
});
