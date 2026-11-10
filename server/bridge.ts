/**
 * OutboundOS → Company OS / Motor / Runway / CRM event bridge.
 * Never treats an unverified integration endpoint as connected.
 * No raw customer records are exported. WorkPacket authority remains external.
 */
const targets = {
  company_os: "COMPANY_OS_EVENT_URL",
  motor: "MOTOR_EVENT_URL",
  runway: "RUNWAY_EVENT_URL",
  crm: "CRM_EVENT_URL",
};
const secretName = "INTEGRATION_SIGNING_SECRET";
const configured = () => Object.entries(targets)
  .map(([name,env])=>({name,url:Bun.env[env]||""}))
  .filter(({url})=>url.startsWith("https://")||/^http:\/\/[a-z0-9-]+\.railway\.internal(?::\d+)?(\/|$)/.test(url));
export async function initBridge(db) {
  await db.unsafe("CREATE TABLE IF NOT EXISTS os_bridge_events (id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL, target TEXT NOT NULL, kind TEXT NOT NULL, payload JSONB NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, delivered_at TIMESTAMPTZ, error TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now())");
  await db.unsafe("CREATE INDEX IF NOT EXISTS os_bridge_events_pending ON os_bridge_events(target,created_at) WHERE delivered_at IS NULL");
}
export async function enqueueBridge(db,workspace,kind){
  if(!Bun.env[secretName])return;
  const selected=configured();
  if(!selected.length)return;
  const eventId=crypto.randomUUID();
  const packet={
    schema:"OutboundSalesEvent.v1",
    event_id:eventId,
    workspace_id:workspace,
    kind,
    source:"OutboundOS",
    occurred_at:new Date().toISOString()
  };
  for(const target of selected) {
    await db.unsafe("INSERT INTO os_bridge_events(id,workspace_id,target,kind,payload) VALUES($1,$2,$3,$4,$5::jsonb)",[
      crypto.randomUUID(),workspace,target.name,kind,JSON.stringify(packet)
    ]);
  }
}
async function signature(body){
  const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(Bun.env[secretName]),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
  return Buffer.from(await crypto.subtle.sign("HMAC",key,new TextEncoder().encode(body))).toString("hex");
}
export async function flushBridge(db){
  if(!Bun.env[secretName])return {attempted:0,delivered:0,failed:0,reason:"SIGNING_SECRET_UNCONFIGURED"};
  const byName=Object.fromEntries(configured().map(x=>[x.name,x.url]));
  const rows=await db.unsafe("SELECT * FROM os_bridge_events WHERE delivered_at IS NULL AND attempts<5 AND (created_at + attempts * interval '15 minutes')<=now() ORDER BY created_at LIMIT 20");
  let delivered=0,failed=0;
  for(const row of rows){
    const target=byName[row.target];if(!target)continue;
    const body=JSON.stringify(row.payload);
    try{
      const response=await fetch(target,{method:"POST",redirect:"error",signal:AbortSignal.timeout(8000),headers:{
        "content-type":"application/json",
        "x-outboundos-event-id":row.id,
        "x-outboundos-signature":await signature(body)
      },body});
      if(!response.ok)throw Error("HTTP "+response.status);
      delivered++;
      await db.unsafe("UPDATE os_bridge_events SET delivered_at=now(),attempts=attempts+1,error=NULL WHERE id=$1",[row.id]);
    }catch(err){
      failed++;
      await db.unsafe("UPDATE os_bridge_events SET attempts=attempts+1,error=$2 WHERE id=$1",[row.id,String(err).slice(0,200)]);
    }
  }
  return {attempted:rows.length,delivered,failed};
}
export async function bridgeStatus(db,workspace){
 const records=await db.unsafe("SELECT target,count(*)::int AS events,count(*) FILTER(WHERE delivered_at IS NOT NULL)::int AS delivered,count(*) FILTER(WHERE delivered_at IS NULL AND attempts>=5)::int AS errors FROM os_bridge_events WHERE workspace_id=$1 GROUP BY target",[workspace]);
 return {contract:"OutboundSalesEvent.v1",signing_ready:!!Bun.env[secretName],
   targets:Object.entries(targets).map(([name,env])=>({
      name, configured:configured().some(x=>x.name===name),
      events:records.find(x=>x.target===name)?.events||0,
      delivered:records.find(x=>x.target===name)?.delivered||0,
      errors:records.find(x=>x.target===name)?.errors||0
   }))};
}
