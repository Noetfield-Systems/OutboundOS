/**
 * Typed Company OS ingress boundary.
 * DecisionRecord and WorkPacket authority is validated; no agent self-issues a permit.
 */
const text=(v,n=500)=>typeof v==="string"?v.trim().slice(0,n):"";
const object=v=>v!==null&&typeof v==="object"&&!Array.isArray(v);
export function validateSalesMission(input,now=Date.now()){
  if(!object(input)||input.schema!=="SalesMissionPacket.v1")return {ok:false,error:"SCHEMA_INVALID"};
  const d=input.decision_record,p=input.work_packet;
  if(!object(d)||!object(p))return {ok:false,error:"AUTHORITY_MISSING"};
  const workspace=text(input.workspace_id,80),tenant=text(input.tenant_id,80);
  if(!workspace||!tenant||tenant!==text(d.tenant_id,80)||tenant!==text(p.tenant_id,80))return {ok:false,error:"TENANT_MISMATCH"};
  if(!text(d.id,128)||!text(p.id,128)||!text(p.idempotency_key,128))return {ok:false,error:"IDENTITY_MISSING"};
  if(d.status!=="approved"&&d.status!=="APPROVED")return {ok:false,error:"DECISION_NOT_APPROVED"};
  if(!["A0","A1","A2","A3"].includes(d.authority))return {ok:false,error:"AUTHORITY_EXCEEDED"};
  if(!Number.isFinite(Date.parse(d.expires_at))||Date.parse(d.expires_at)<=now)return {ok:false,error:"PERMIT_EXPIRED"};
  if(p.kind!=="sales.campaign.draft")return {ok:false,error:"ACTION_NOT_PERMITTED"};
  if(p.decision_id!==d.id)return {ok:false,error:"DECISION_NOT_BOUND"};
  if(!object(p.input)||!text(p.input.name,200)||!text(p.input.subject,280)||!text(p.input.body,6000))return {ok:false,error:"WORK_PACKET_INVALID"};
  if(text(p.input.body,6000).length>5500)return {ok:false,error:"WORK_PACKET_TOO_LARGE"};
  return {ok:true,workspace_id:workspace,tenant_id:tenant,mission_id:text(p.id,128),
    idempotency_key:text(p.idempotency_key,128),
    campaign:{name:text(p.input.name,200),subject:text(p.input.subject,280),body:text(p.input.body,5500)}};
}
