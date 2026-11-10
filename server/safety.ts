
export const eligibleForSend = (p:any) => Boolean(
  p && typeof p.email==="string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)
  && typeof p.consent_basis==="string" && p.consent_basis.trim()
  && (p.status==="qualified"||p.status==="contacted")
);
export const sendableCampaign = (campaign:any) => campaign?.status === "active";
export const dailyCapacity = (used:number,cap:number,requested:number) =>
  Math.max(0,Math.min(Math.max(0,Math.trunc(requested)||0), Math.max(0,Math.min(1000,Math.trunc(cap)||20)-Math.max(0,Math.trunc(used)||0))));
export const cleanConsent = (v:unknown) => typeof v==="string"?v.trim().slice(0,850):"";
export const webhookEventId = (workspace:string,eventId:string) =>
  (workspace+":"+eventId).slice(0,500);
export const isUnknownSend = (createdAt:Date|string,now=Date.now()) =>
  Number.isFinite(new Date(createdAt).getTime()) && now-new Date(createdAt).getTime()>600000;
export const boundedBody = (content:string,max=350000)=>{
  if(content.length>max)throw new Error("Request too large");
  return JSON.parse(content);
};
export const isValidInboundEmail=(v:unknown)=>typeof v==="string"&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
