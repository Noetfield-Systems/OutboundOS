/**
 * OutboundOS Persian outreach operations.
 * Reuses canonical os_prospects, os_campaigns, os_messages, os_meetings and
 * workspace sessions. No independent scheduler, registry, memory or governance.
 * A manual report is never presented as provider/independently verified.
 */
type DB = any;
const id = () => crypto.randomUUID();
const clean = (v:any,n=500) => String(v??"").trim().slice(0,n);
const iso = (v:any) => {
  if (!v) return null;
  const d=new Date(v);
  return Number.isFinite(d.getTime()) ? d.toISOString() : null;
};
const reply = (payload:any,status=200) => new Response(JSON.stringify(payload),{
  status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"}
});
const error = (message:string,status=422) => reply({error:message},status);
const allowedStages = ["new","research","qualified","contacted","replied","meeting","won","lost","unsubscribed","needs_review"];
const outcomeTypes = ["qualified","booked","converted","lost","not_fit","pending"];
const allowedChannels = ["email","linkedin","phone","whatsapp","telegram","instagram","website","in_person","other"];
const allowedHandoffs = ["none","human","agent"];
const bodySafe = (input:string, max:number) => clean(input,max);
function validChannel(c:string){return allowedChannels.includes(c)?c:"other";}
function validUrl(v:any){
  const x=clean(v,900);
  if(!x)return "";
  try { const u=new URL(x); return u.protocol==="https:"||u.protocol==="http:"?x:""; }
  catch {return ""; }
}
async function audit(db:DB,w:string,kind:string,description:string){
  await db.unsafe("INSERT INTO os_events(id,workspace_id,kind,content) VALUES($1,$2,$3,$4)",[id(),w,kind,clean(description,700)]);
}
async function evidence(db:DB,w:string,p:string,c:string,m:string,kind:string,summary:string,source:string,reference:string,verification="self_reported"){
  await db.unsafe("INSERT INTO os_field_evidence(id,workspace_id,prospect_id,campaign_id,message_id,kind,summary,source,reference,verification) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [id(),w,p||"",c||"",m||"",kind,clean(summary,2000),clean(source,90),clean(reference,900),verification]);
}
export async function initFieldOps(db:DB){
  const changes=[
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS owner TEXT NOT NULL DEFAULT 'Founder'",
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS next_action TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS next_action_at TIMESTAMPTZ",
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS match_quality INTEGER",
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS qualification TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS outcome TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS outcome_reported_at TIMESTAMPTZ",
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS evidence_url TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS channel TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS campaign_id TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS handoff_to TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS handoff_type TEXT NOT NULL DEFAULT 'none'",
    "ALTER TABLE os_prospects ADD COLUMN IF NOT EXISTS response_summary TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_campaigns ADD COLUMN IF NOT EXISTS target_audience TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_campaigns ADD COLUMN IF NOT EXISTS channel TEXT NOT NULL DEFAULT 'email'",
    "ALTER TABLE os_campaigns ADD COLUMN IF NOT EXISTS owner TEXT NOT NULL DEFAULT 'Founder'",
    "ALTER TABLE os_campaigns ADD COLUMN IF NOT EXISTS goal TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_campaigns ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_messages ADD COLUMN IF NOT EXISTS channel TEXT NOT NULL DEFAULT 'email'",
    "ALTER TABLE os_messages ADD COLUMN IF NOT EXISTS proposed_subject TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_messages ADD COLUMN IF NOT EXISTS proposed_body TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_messages ADD COLUMN IF NOT EXISTS actual_subject TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_messages ADD COLUMN IF NOT EXISTS actual_body TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_messages ADD COLUMN IF NOT EXISTS evidence_url TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_messages ADD COLUMN IF NOT EXISTS external_message_id TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE os_messages ADD COLUMN IF NOT EXISTS provenance TEXT NOT NULL DEFAULT 'system'",
    "ALTER TABLE os_messages ADD COLUMN IF NOT EXISTS occurred_at TIMESTAMPTZ"
  ];
  for(const query of changes)await db.unsafe(query);
  await db.unsafe("CREATE TABLE IF NOT EXISTS os_field_evidence (id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL, prospect_id TEXT NOT NULL DEFAULT '', campaign_id TEXT NOT NULL DEFAULT '', message_id TEXT NOT NULL DEFAULT '', kind TEXT NOT NULL, summary TEXT NOT NULL, source TEXT NOT NULL DEFAULT '', reference TEXT NOT NULL DEFAULT '', verification TEXT NOT NULL DEFAULT 'self_reported', created_at TIMESTAMPTZ NOT NULL DEFAULT now())");
  await db.unsafe("CREATE INDEX IF NOT EXISTS os_field_evidence_workspace ON os_field_evidence(workspace_id,created_at DESC)");
  await db.unsafe("CREATE INDEX IF NOT EXISTS os_field_action_queue ON os_prospects(workspace_id,next_action_at) WHERE next_action_at IS NOT NULL");
}
function personalize(template:string,p:any,w:any) {
  const values:any = {
    first_name: clean((p.name||"").split(" ")[0],90) || "دوست عزیز",
    name:clean(p.name,180),company:clean(p.company,180),title:clean(p.title,160),
    offer:clean(w.offer,1200),booking_link:clean(w.calendly,500),
    signal:clean(p.signal,500)
  };
  return template.replace(/\{(first_name|name|company|title|offer|booking_link|signal)\}/g,(_m,key)=>values[key]||"");
}
export async function handleFieldOps(req:Request,db:DB,w:string,api:string,parse:(r:Request)=>Promise<any>):Promise<Response>{
  const method=req.method;
  const parts=api.slice(3).split("/");
  const [resource,resourceId,action]=parts;
  if(resource==="state"&&method==="GET"){
    const [contacts,campaigns,messages,proof,meetings,workspace]=await Promise.all([
      db.unsafe("SELECT * FROM os_prospects WHERE workspace_id=$1 ORDER BY created_at DESC LIMIT 1000",[w]),
      db.unsafe("SELECT * FROM os_campaigns WHERE workspace_id=$1 ORDER BY created_at DESC LIMIT 100",[w]),
      db.unsafe("SELECT * FROM os_messages WHERE workspace_id=$1 ORDER BY created_at DESC LIMIT 1500",[w]),
      db.unsafe("SELECT * FROM os_field_evidence WHERE workspace_id=$1 ORDER BY created_at DESC LIMIT 1500",[w]),
      db.unsafe("SELECT * FROM os_meetings WHERE workspace_id=$1 ORDER BY when_at DESC LIMIT 250",[w]),
      db.unsafe("SELECT id,name,offer,icp,calendly,saved FROM os_workspaces WHERE id=$1",[w])
    ]);
    const touched=new Set(messages.filter((m:any)=>m.direction==="outbound"&&["manually_sent","sent","delivered","unknown"].includes(m.status)).map((m:any)=>m.prospect_id));
    const responded=new Set(messages.filter((m:any)=>m.direction==="inbound"&&["received","reported_received"].includes(m.status)).map((m:any)=>m.prospect_id));
    const providerReplies=new Set(messages.filter((m:any)=>m.direction==="inbound"&&m.status==="received").map((m:any)=>m.prospect_id));
    const booked=new Set(meetings.map((m:any)=>m.prospect_id));
    contacts.forEach((c:any)=>{if(c.outcome==="booked"||c.status==="meeting")booked.add(c.id)});
    const qualified=contacts.filter((c:any)=>["qualified","meeting","won"].includes(c.status)||c.outcome==="qualified");
    const outcomeReported=contacts.filter((c:any)=>c.outcome==="converted"||c.status==="won").length;
    const independentlyVerified=new Set(proof.filter((p:any)=>p.kind==="conversion"&&p.verification==="independent_verified").map((p:any)=>p.prospect_id));
    return reply({
      workspace:workspace[0],contacts,campaigns,messages,evidence:proof,meetings,
      metrics:{goal:10,contacts:contacts.length,contacted:touched.size,replied:responded.size,
        provider_replies:providerReplies.size,reply_rate:touched.size?Math.round(100*responded.size/touched.size):0,
        booked:booked.size,qualified:qualified.length,converted_reported:outcomeReported,
        converted_verified:independentlyVerified.size,
        overdue:contacts.filter((c:any)=>c.next_action_at&&new Date(c.next_action_at)<new Date()&&!["won","lost","unsubscribed"].includes(c.status)).length}
    });
  }
  if(resource==="campaigns"&&method==="POST"&&!resourceId){
    const b=await parse(req),name=clean(b.name,200),subject=clean(b.subject,270),body=clean(b.body,5500);
    if(!name||!subject||!body)return error("نام کمپین، عنوان و متن پیام ضروری است.");
    const count=(await db.unsafe("SELECT count(*)::int n FROM os_campaigns WHERE workspace_id=$1",[w]))[0]?.n||0;
    if(count>=60)return error("سقف ۶۰ کمپین در هر فضای کاری.");
    const cid=id();
    await db.unsafe("INSERT INTO os_campaigns(id,workspace_id,name,subject,body,target_audience,channel,owner,goal,source,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'draft')",
      [cid,w,name,subject,body,clean(b.target_audience,900),validChannel(clean(b.channel,35)),clean(b.owner,120)||"Founder",clean(b.goal,500),clean(b.source,200)]);
    await audit(db,w,"fa_campaign","کمپین ساخته شد: "+name);
    return reply({ok:true,id:cid},201);
  }
  if(resource==="campaigns"&&resourceId&&method==="PATCH"){
    const b=await parse(req),rows=await db.unsafe("SELECT id FROM os_campaigns WHERE workspace_id=$1 AND id=$2",[w,resourceId]);
    if(!rows.length)return error("کمپین پیدا نشد.",404);
    const keys=["name","subject","body","target_audience","channel","owner","goal","source"];
    const sizes:any={name:200,subject:270,body:5500,target_audience:900,channel:35,owner:120,goal:500,source:200};
    const fields:string[]=[],vals:any[]=[w,resourceId];
    for(const k of keys)if(Object.prototype.hasOwnProperty.call(b,k)){
      const v=k==="channel"?validChannel(clean(b[k],35)):clean(b[k],sizes[k]);
      vals.push(v);fields.push(k+"=$"+vals.length);
    }
    if(!fields.length)return error("هیچ فیلدی ارسال نشده.");
    await db.unsafe("UPDATE os_campaigns SET "+fields.join(",")+" WHERE workspace_id=$1 AND id=$2",vals);
    await audit(db,w,"fa_campaign","کمپین ویرایش شد: "+resourceId);
    return reply({ok:true});
  }
  if(resource==="contacts"&&method==="POST"&&!resourceId){
    const b=await parse(req),company=clean(b.company,200),name=clean(b.name,150),email=clean(b.email,250).toLowerCase();
    if(!company&&!name)return error("نام شخص یا شرکت ضروری است.");
    if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return error("ایمیل معتبر نیست.");
    const count=(await db.unsafe("SELECT count(*)::int n FROM os_prospects WHERE workspace_id=$1",[w]))[0]?.n||0;
    if(count>=1000)return error("سقف ۱۰۰۰ مخاطب.");
    const pid=id(),campaign=clean(b.campaign_id,80);
    if(campaign&&!(await db.unsafe("SELECT 1 FROM os_campaigns WHERE workspace_id=$1 AND id=$2",[w,campaign])).length)return error("کمپین معتبر نیست.");
    const nextAt=iso(b.next_action_at);
    if(b.next_action_at&&!nextAt)return error("زمان اقدام بعدی معتبر نیست.");
    const match=b.match_quality===""||b.match_quality==null?null:Number(b.match_quality);
    if(match!==null&&(!Number.isInteger(match)||match<0||match>100))return error("کیفیت تطابق باید بین ۰ تا ۱۰۰ باشد.");
    try{
      await db.unsafe("INSERT INTO os_prospects(id,workspace_id,company,name,email,title,region,source,source_url,signal,consent_basis,status,score,unsub_token,owner,next_action,next_action_at,match_quality,qualification,channel,campaign_id,evidence_url) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'new',50,$12,$13,$14,$15,$16,$17,$18,$19,$20)",
        [pid,w,company||name,name,email||null,clean(b.title,150),clean(b.region,200),clean(b.source,80)||"manual",validUrl(b.source_url),clean(b.signal,600),clean(b.consent_basis,850),id(),clean(b.owner,120)||"Founder",clean(b.next_action,400),nextAt,match,clean(b.qualification,900),validChannel(clean(b.channel,35)),campaign,validUrl(b.evidence_url)]);
    }catch(e:any){
      if(String(e?.code)==="23505")return error("این مخاطب یا منبع در همین فضای کاری ثبت شده است.",409);
      throw e;
    }
    await audit(db,w,"fa_contact","مخاطب واقعی به‌صورت دستی ثبت شد: "+(name||company));
    return reply({ok:true,id:pid},201);
  }
  if(resource==="contacts"&&resourceId&&method==="PATCH"){
    const b=await parse(req),found=await db.unsafe("SELECT id,status FROM os_prospects WHERE workspace_id=$1 AND id=$2",[w,resourceId]);
    if(!found.length)return error("مخاطب پیدا نشد.",404);
    const keys=["company","name","email","title","region","source","source_url","signal","consent_basis","owner","status","next_action","next_action_at","match_quality","qualification","outcome","evidence_url","channel","campaign_id","handoff_to","handoff_type","response_summary"];
    const sizes:any={company:200,name:150,email:250,title:150,region:200,source:80,source_url:900,signal:600,consent_basis:850,owner:120,status:50,next_action:400,qualification:900,outcome:70,evidence_url:900,channel:35,campaign_id:80,handoff_to:120,handoff_type:30,response_summary:1500};
    const fields:string[]=[],vals:any[]=[w,resourceId];
    for(const k of keys)if(Object.prototype.hasOwnProperty.call(b,k)){
      let v:any= b[k];
      if(k==="next_action_at") {v=iso(v);if(b[k]&&!v)return error("زمان اقدام بعدی معتبر نیست.");}
      else if(k==="match_quality"){
        v=v===""||v==null?null:Number(v);
        if(v!==null&&(!Number.isInteger(v)||v<0||v>100))return error("کیفیت تطابق نامعتبر است.");
      }else {
        v=clean(v,sizes[k]);
        if(k==="status"&&!allowedStages.includes(v))return error("مرحله نامعتبر است.");
        if(k==="outcome"&&v&&!outcomeTypes.includes(v))return error("نتیجه نامعتبر است.");
        if(k==="handoff_type"&&!allowedHandoffs.includes(v))return error("نوع ارجاع نامعتبر است.");
        if(k==="channel")v=validChannel(v);
        if(k==="source_url"||k==="evidence_url")v=validUrl(v);
        if(k==="email"&&v&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))return error("ایمیل نامعتبر است.");
      }
      if(k==="campaign_id"&&v&&!(await db.unsafe("SELECT 1 FROM os_campaigns WHERE workspace_id=$1 AND id=$2",[w,v])).length)return error("کمپین معتبر نیست.");
      vals.push(v);fields.push(k+"=$"+vals.length);
    }
    if(!fields.length)return error("تغییری ثبت نشده.");
    if(b.status==="unsubscribed"){fields.push("consent_basis=''");}
    await db.unsafe("UPDATE os_prospects SET "+fields.join(",")+" WHERE workspace_id=$1 AND id=$2",vals);
    await audit(db,w,"fa_contact","اطلاعات یا اقدام بعدی مخاطب ویرایش شد: "+resourceId);
    return reply({ok:true});
  }
  if(resource==="drafts"&&method==="POST"){
    const b=await parse(req),pid=clean(b.prospect_id,80),cid=clean(b.campaign_id,80);
    const p=(await db.unsafe("SELECT * FROM os_prospects WHERE workspace_id=$1 AND id=$2",[w,pid]))[0];
    const c=(await db.unsafe("SELECT * FROM os_campaigns WHERE workspace_id=$1 AND id=$2",[w,cid]))[0];
    if(!p||!c)return error("مخاطب و کمپین معتبر لازم است.");
    if(p.status==="unsubscribed")return error("این مخاطب لغو ارتباط کرده است.");
    const ws=(await db.unsafe("SELECT offer,calendly FROM os_workspaces WHERE id=$1",[w]))[0];
    const proposalSubject=personalize(clean(b.subject,270)||c.subject,p,ws);
    const proposalBody=personalize(clean(b.body,5500)||c.body,p,ws);
    if(!proposalSubject||!proposalBody)return error("پیام پیشنهادی خالی است.");
    const mid=id(),channel=validChannel(clean(b.channel,35)||c.channel);
    await db.unsafe("INSERT INTO os_messages(id,workspace_id,prospect_id,campaign_id,subject,body,proposed_subject,proposed_body,channel,direction,kind,status,provenance) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,'outbound','manual','draft','template')",
      [mid,w,pid,cid,proposalSubject,proposalBody,proposalSubject,proposalBody,channel]);
    await db.unsafe("UPDATE os_prospects SET campaign_id=$3,channel=$4 WHERE workspace_id=$1 AND id=$2",[w,pid,cid,channel]);
    await audit(db,w,"fa_draft","پیشنویس برای "+(p.name||p.company)+" ثبت شد؛ ارسال نشده.");
    return reply({ok:true,id:mid,proposed_subject:proposalSubject,proposed_body:proposalBody},201);
  }
  if(resource==="messages"&&resourceId&&action==="confirm"&&method==="POST"){
    const b=await parse(req),m=(await db.unsafe("SELECT * FROM os_messages WHERE workspace_id=$1 AND id=$2",[w,resourceId]))[0];
    if(!m||m.status!=="draft"||m.kind!=="manual")return error("فقط پیش‌نویس ارسال‌نشده قابل ثبت است.");
    const p=(await db.unsafe("SELECT status FROM os_prospects WHERE workspace_id=$1 AND id=$2",[w,m.prospect_id]))[0];
    if(!p||p.status==="unsubscribed")return error("ارسال برای این مخاطب قابل ثبت نیست.");
    const actual=clean(b.actual_body,5500),subject=clean(b.actual_subject,270)||m.proposed_subject,
      channel=validChannel(clean(b.channel,35)||m.channel),date=iso(b.occurred_at)||new Date().toISOString(),
      proof=validUrl(b.evidence_url),externalId=clean(b.external_message_id,220);
    if(!actual)return error("متن واقعاً ارسال‌شده را وارد کنید.");
    const changed=await db.unsafe("UPDATE os_messages SET actual_subject=$3,actual_body=$4,channel=$5,status='manually_sent',provenance='self_reported',occurred_at=$6,evidence_url=$7,external_message_id=$8 WHERE workspace_id=$1 AND id=$2 AND status='draft' RETURNING id",
      [w,resourceId,subject,actual,channel,date,proof,externalId]);
    if(!changed.length)return error("این پیام قبلاً ثبت شده است.",409);
    await db.unsafe("UPDATE os_prospects SET status=CASE WHEN status IN ('new','research','qualified','sending') THEN 'contacted' ELSE status END, sent_at=coalesce(sent_at,$3),next_action=CASE WHEN next_action='' THEN 'پیگیری پاسخ' ELSE next_action END,channel=$4 WHERE workspace_id=$1 AND id=$2",
      [w,m.prospect_id,date,channel]);
    await evidence(db,w,m.prospect_id,m.campaign_id,m.id,"manual_send","اپراتور گزارش داد که پیام واقعاً ارسال شده است.","operator_report",proof||externalId,"self_reported");
    await audit(db,w,"fa_manual_send","ارسال دستی گزارش شد (غیرتأییدشده از سمت provider).");
    return reply({ok:true,verification:"self_reported"});
  }
  if(resource==="replies"&&method==="POST"){
    const b=await parse(req),pid=clean(b.prospect_id,80);
    const p=(await db.unsafe("SELECT * FROM os_prospects WHERE workspace_id=$1 AND id=$2",[w,pid]))[0];
    if(!p)return error("مخاطب پیدا نشد.",404);
    const body=clean(b.body,7000),subject=clean(b.subject,270),date=iso(b.occurred_at)||new Date().toISOString(),
      proof=validUrl(b.evidence_url),channel=validChannel(clean(b.channel,35)||p.channel);
    if(!body)return error("متن پاسخ واقعی ضروری است.");
    const mid=id();
    await db.unsafe("INSERT INTO os_messages(id,workspace_id,prospect_id,campaign_id,subject,body,actual_subject,actual_body,direction,kind,status,channel,provenance,occurred_at,evidence_url) VALUES($1,$2,$3,$4,$5,$6,$5,$6,'inbound','reply','reported_received',$7,'self_reported',$8,$9)",
      [mid,w,pid,p.campaign_id,subject,body,channel,date,proof]);
    await db.unsafe("UPDATE os_prospects SET status=CASE WHEN status IN ('won','lost','unsubscribed') THEN status ELSE 'replied' END,response_summary=$3,channel=$4 WHERE workspace_id=$1 AND id=$2",[w,pid,clean(b.summary,1500)||body.slice(0,350),channel]);
    await evidence(db,w,pid,p.campaign_id,mid,"manual_reply","پاسخ دریافت‌شده توسط اپراتور ثبت شد.","operator_report",proof,"self_reported");
    await audit(db,w,"fa_reply","پاسخ دستی ثبت شد.");
    return reply({ok:true,id:mid,verification:"self_reported"},201);
  }
  if(resource==="outcomes"&&method==="POST"){
    const b=await parse(req),pid=clean(b.prospect_id,80),outcome=clean(b.outcome,70);
    const p=(await db.unsafe("SELECT * FROM os_prospects WHERE workspace_id=$1 AND id=$2",[w,pid]))[0];
    if(!p)return error("مخاطب پیدا نشد.",404);
    if(!outcomeTypes.includes(outcome))return error("نتیجه نامعتبر است.");
    const summary=clean(b.summary,2000),ref=validUrl(b.evidence_url),when=iso(b.when_at);
    if(!summary)return error("شرح نتیجه و مبنای ثبت ضروری است.");
    if(b.when_at&&!when)return error("زمان جلسه نامعتبر است.");
    const status=outcome==="qualified"?"qualified":outcome==="booked"?"meeting":outcome==="converted"?"won":
      outcome==="lost"||outcome==="not_fit"?"lost":p.status;
    await db.unsafe("UPDATE os_prospects SET outcome=$3,status=$4,outcome_reported_at=now(),evidence_url=$5,qualification=CASE WHEN $3='qualified' THEN $6 ELSE qualification END WHERE workspace_id=$1 AND id=$2",
      [w,pid,outcome,status,ref,summary]);
    if(outcome==="booked"&&when){
      await db.unsafe("INSERT INTO os_meetings(id,workspace_id,prospect_id,when_at,url,notes) VALUES($1,$2,$3,$4,$5,$6)",[id(),w,pid,when,validUrl(b.meeting_url),summary]);
    }
    await evidence(db,w,pid,p.campaign_id,"",outcome==="converted"?"conversion":"outcome",summary,"operator_report",ref,"self_reported");
    await audit(db,w,"fa_outcome","نتیجه گزارش‌شده ثبت شد: "+outcome);
    return reply({ok:true,outcome,verification:"self_reported"});
  }
  if(resource==="evidence"&&method==="POST"){
    const b=await parse(req),pid=clean(b.prospect_id,80);
    const p=(await db.unsafe("SELECT id,campaign_id FROM os_prospects WHERE workspace_id=$1 AND id=$2",[w,pid]))[0];
    if(!p)return error("مخاطب پیدا نشد.",404);
    const summary=clean(b.summary,2000),ref=validUrl(b.reference),source=clean(b.source,90)||"operator_report";
    if(!summary)return error("شرح سند ضروری است.");
    await evidence(db,w,pid,p.campaign_id,"",clean(b.kind,60)||"note",summary,source,ref,"unverified");
    await audit(db,w,"fa_evidence","سند برای مخاطب افزوده شد.");
    return reply({ok:true,verification:"unverified"},201);
  }
  if(resource==="handoff"&&method==="POST"){
    const b=await parse(req),pid=clean(b.prospect_id,80),kind=clean(b.handoff_type,30),
      target=clean(b.handoff_to,120),next=clean(b.next_action,400),date=iso(b.next_action_at);
    if(!allowedHandoffs.includes(kind)||kind==="none"||!target||!next)return error("نوع ارجاع، مسئول و اقدام بعدی ضروری است.");
    if(b.next_action_at&&!date)return error("زمان اقدام نامعتبر است.");
    const p=(await db.unsafe("UPDATE os_prospects SET handoff_type=$3,handoff_to=$4,next_action=$5,next_action_at=$6,owner=$4 WHERE workspace_id=$1 AND id=$2 RETURNING id,campaign_id",[w,pid,kind,target,next,date]))[0];
    if(!p)return error("مخاطب پیدا نشد.",404);
    await evidence(db,w,pid,p.campaign_id,"","handoff","ارجاع پیشنهادی "+kind+" به "+target+"؛ اقدام: "+next,"local_task","","self_reported");
    await audit(db,w,"fa_handoff","ارجاع در صف داخلی ثبت شد؛ اجرای Agent ادعا نشده.");
    return reply({ok:true,dispatch:"not_dispatched",handoff_type:kind});
  }
  return error("مسیر عملیاتی وجود ندارد.",404);
}
