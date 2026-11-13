/** Image-first cinematic Persian OutboundOS landing, inspired by the approved visual concept. */
function decodeUnicodeText(html:string){return html.replace(/\\u([0-9a-fA-F]{4})/g,(_m,h)=>String.fromCharCode(Number.parseInt(h,16)));}
export const PUBLIC_NEXT=decodeUnicodeText(String.raw`<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0d0b22">
<meta name="robots" content="index,follow">
<meta name="description" content="OutboundOS، پلتفرم هوشمند و کاربردی جذب مشتری: کمپین بسازید، مخاطب واقعی وارد کنید، پیام آماده کنید، پاسخ و پیگیری را مدیریت کنید و نتیجه را بسنجید. ابزار رایگان بدون ثبت‌نام.">
<meta property="og:title" content="OutboundOS | از اولین پیام تا اولین مشتری واقعی">
<meta property="og:description" content="کمپین جذب ۱۰ مشتری اول را رایگان بسازید؛ از پیام اولیه تا پیگیری و ثبت نتیجه واقعی.">
<meta property="og:type" content="website">
<link rel="canonical" href="https://outboundos-github-production.up.railway.app/">
<title>OutboundOS | از اولین پیام تا اولین مشتری واقعی</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&display=swap');
:root{color-scheme:dark;--bg:#0e0d25;--surface:#181633;--stroke:#494479;--muted:#c5c2df;--text:#fff;--accent:#8157ff;--bright:#ba80ff;--pink:#dd65f5;--green:#35dca3;--radius:19px}
*{box-sizing:border-box}html{scroll-behavior:smooth;overflow-x:clip;max-width:100%}body{margin:0;width:100%;max-width:100%;overflow-x:clip;background:var(--bg);color:var(--text);font-family:"Vazirmatn",Tahoma,Arial,sans-serif;font-size:14px;line-height:1.9;overflow-x:hidden;-webkit-font-smoothing:antialiased}
button,input,select,textarea{font:inherit}button{cursor:pointer}button:disabled{opacity:.55;cursor:not-allowed}
a{color:inherit;text-decoration:none}button:focus-visible,input:focus-visible,select:focus-visible,a:focus-visible{outline:3px solid #d8b7ff;outline-offset:3px}h1,h2,h3,p{margin:0}
.wrapper{width:min(1368px,calc(100% - 88px));margin-inline:auto}
.topnav{position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:28px;min-height:84px}
.logo{display:inline-flex;align-items:center;gap:11px;direction:ltr;font-family:system-ui,sans-serif;font-size:24px;font-weight:800;letter-spacing:-1.2px}
.logo-orb{width:43px;height:35px;border-radius:50%;position:relative;display:inline-block;background:radial-gradient(circle at 26% 25%,#ee84fb,#9256f9 55%,#4933ba);transform:rotate(-25deg);box-shadow:0 0 20px #9c59ff42}
.logo-orb:after{content:'';position:absolute;inset:0 43% 0 -4%;border-radius:50%;background:#b45af0}
.navlinks{display:flex;align-items:center;gap:27px}
.navlinks a{font-weight:600;font-size:12px;color:#e6e1fa;transition:color .2s}.navlinks a:hover{color:#d38dff}
.navlinks a.arrow:after{content:'⌄';padding-right:7px;font-size:15px;color:#b9aedf}
.nav-actions{display:flex;align-items:center;gap:10px}
.btn{min-height:45px;display:inline-flex;align-items:center;justify-content:center;gap:10px;border:1px solid #8572cb;border-radius:12px;padding:10px 20px;font-size:12px;font-weight:800;white-space:nowrap;background:#191530;color:#fff;box-shadow:inset 0 1px 0 #ffffff20;transition:transform .16s,background .16s,box-shadow .16s}
.btn:hover{transform:translateY(-2px);border-color:#b69cff;background:#242046}
.btn.primary{border-color:#b583ff;background:linear-gradient(145deg,#aa6fff,#6e47f1 76%);box-shadow:0 6px 30px #9a4aff30,inset 0 1px 0 #ffffff4b;color:white}
.btn.primary:hover{background:linear-gradient(145deg,#c08aff,#8564ff);box-shadow:0 10px 34px #9451ff4a}
.btn.tiny{padding:7px 13px;min-height:33px;font-size:11px}
.menu-toggle{display:none;width:43px;height:43px;padding:0;font-size:24px;border-radius:12px;background:#25214d;color:#fff;border:1px solid #6657a4}
.mobilemenu{display:none}
.hero{min-height:389px;position:relative;padding:17px 0 0;overflow:clip;text-align:center;isolation:isolate}
.hero:before{content:'';position:absolute;inset:-105px -10vw -120px;z-index:-3;pointer-events:none;background:radial-gradient(ellipse 45% 34% at 50% 57%,#5531918c 0,transparent 78%),radial-gradient(ellipse 31% 28% at 4% 47%,#a044ae50 0,transparent 86%),radial-gradient(ellipse 30% 35% at 95% 53%,#773de486 0,transparent 85%),radial-gradient(ellipse 70% 50% at 50% 0,#161530,transparent)}
.hero:after{content:'';position:absolute;z-index:-2;pointer-events:none;inset:110px -20vw -30px;border-radius:50%;border:3px solid transparent;border-top-color:#9f5aff8b;box-shadow:0 -45px 65px -70px #dc7bff;transform:rotate(-4deg)}
.hero-eyebrow{display:inline-flex;align-items:center;gap:14px;margin:auto;max-width:100%;padding:7px 19px;border:1px solid #7c60ba;border-radius:13px;background:linear-gradient(95deg,#36205f,#1d1b40);font-size:12px;color:#eee8ff;box-shadow:0 4px 25px #5c36cc2a}
.hero-eyebrow b{font-size:19px;color:#d279fa;line-height:1}.hero-eyebrow small{font-family:system-ui,Arial,sans-serif;font-size:11px;color:#d4c9fa}
.hero h1{font-size:clamp(44px,4.75vw,70px);line-height:1.42;letter-spacing:-3.2px;font-weight:900;margin:14px auto 4px;max-width:1260px;text-shadow:0 4px 20px #03011455}
.hero h1 .gradient{background:linear-gradient(110deg,#e875f3 7%,#b577ff 51%,#d6baff);background-clip:text;-webkit-background-clip:text;color:transparent;position:relative;white-space:nowrap}
.hero h1 .gradient:after{content:'';position:absolute;bottom:0;left:0;right:4%;height:9px;border-radius:100%;border-top:5px solid #ae5fff;transform:rotate(-3deg);filter:drop-shadow(0 3px 5px #ab60ff)}
.hero-sub{color:#eee6fd;font-size:clamp(13px,1.4vw,17px);line-height:1.85;max-width:800px;margin:5px auto 15px}
.hero-buttons{display:flex;align-items:center;justify-content:center;gap:17px;flex-wrap:wrap}
.hero-buttons .btn{min-width:235px;min-height:52px;font-size:13px}
.hero-checks{display:flex;align-items:center;justify-content:center;gap:30px;flex-wrap:wrap;margin:20px auto 10px;color:#e5dff9;font-size:11px}
.hero-checks span{display:flex;align-items:center;gap:9px}.hero-checks span:before{content:'✓';display:grid;place-items:center;background:#514381;color:#fff;width:22px;height:22px;border-radius:50%;font-family:Arial,sans-serif}
.float-card{position:absolute;z-index:-1;border:1px solid #ac89ff9e;border-radius:19px;background:linear-gradient(145deg,#303265db,#292150da 55%,#1e193fdd);box-shadow:0 16px 38px #06051a70,inset 0 1px 0 #ffffff26;backdrop-filter:blur(16px);text-align:right}
.float-card.plan{top:54px;right:0;width:246px;transform:rotate(5deg);padding:17px 18px;box-shadow:0 20px 50px #a33aff34}
.float-card.plan strong{font-size:13px;display:block;margin-bottom:11px}
.float-card.plan div{display:flex;align-items:center;justify-content:space-between;gap:8px;border:1px solid #554885;background:#221e4d;border-radius:10px;padding:8px 10px;margin-top:6px;font-size:10px}
.float-card.plan i{color:#c9a0ff;font-style:normal}.float-card.plan i:after{content:'✓';font-family:Arial;background:#9464ee;color:#fff;border-radius:5px;padding:2px 4px}
.float-card.plan .pending i:after{content:'';display:inline-block;width:12px;height:12px;background:none;border:1px solid #9577d6}
.float-card.prompt{top:90px;left:0;width:210px;transform:rotate(-7deg);padding:16px 18px}
.float-card.prompt strong{display:block;color:#e6d5ff;font-size:13px}.float-card.prompt span{color:#b5a9dd;font-size:10px}.float-card.prompt .n{font:800 31px/1.4 system-ui,Arial;color:#fff;display:block}
.float-card.proof{top:248px;left:0;width:211px;transform:rotate(-6deg);padding:17px 18px}
.float-card.proof b{display:block;font-size:13px}.float-card.proof p{font-size:11px;color:#c9b8ec;line-height:1.8;margin-top:4px}
.art-scene{position:relative;margin-top:5px;padding-top:12px;isolation:isolate;overflow:clip}
.art-scene:before{content:'';position:absolute;z-index:-2;top:4%;left:-20vw;right:-20vw;height:66%;background:radial-gradient(ellipse 60% 60% at 50% 50%,#6938d65e,transparent),linear-gradient(153deg,transparent 10%,#7439ff29 40%,transparent 65%);pointer-events:none}
.art-scene:after{content:'';position:absolute;z-index:-1;left:-11%;right:-11%;top:8%;height:80%;border:2px solid #9555ff94;border-radius:43%;transform:rotate(-10deg);filter:drop-shadow(0 0 13px #ae64ff)}
.integrations{position:absolute;left:-16px;top:83px;z-index:2;display:flex;flex-direction:column;gap:13px}
.integrations .ico{border:1px solid #7063b9;width:50px;height:50px;border-radius:13px;background:linear-gradient(145deg,#36346e,#171539);display:grid;place-items:center;font:800 23px system-ui;color:#caaaff;box-shadow:0 8px 22px #06051b77}
.integrations .ico span{font-size:10px;font-weight:800}
.product-stage{position:relative;z-index:1;display:grid;grid-template-columns:230px minmax(0,1fr);border-radius:33px;padding:15px;border:2px solid #946bf8;box-shadow:0 25px 95px #050418cc,0 0 34px #9b6cff4d,inset 0 0 0 5px #3b2b7e;background:linear-gradient(125deg,#644db0,#26234f);max-width:1270px;margin:auto;min-height:433px;text-align:right}
.stage-sidebar{border-radius:0 22px 22px 0;background:#131229;padding:20px 17px;border-left:1px solid #464071;display:flex;flex-direction:column;gap:5px}
.stage-sidebar .sbrand{direction:ltr;display:flex;gap:9px;align-items:center;justify-content:center;font:800 15px system-ui;margin-bottom:13px}
.stage-sidebar .mini-orb{width:25px;height:22px;background:linear-gradient(130deg,#bf75f9,#6950f1);border-radius:50%;display:inline-block;transform:rotate(-25deg)}
.stage-sidebar a{display:flex;align-items:center;gap:13px;padding:10px 12px;color:#e6dffa;font-size:11px;border-radius:10px;line-height:1.3;min-height:37px;transition:background .15s}
.stage-sidebar a.active{background:linear-gradient(110deg,#5a47cf,#4132a0);color:#fff}
.stage-sidebar a:hover{background:#30295a}.stage-sidebar .sico{width:21px;text-align:center;color:#b59bff;font-size:16px}
.stage-main{border-radius:22px 0 0 22px;padding:16px 21px;background:linear-gradient(150deg,#13152c,#0d1228 75%);overflow:hidden}
.stage-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}
.stage-top h3{font-size:17px;font-weight:800}.stage-top p{color:#aea9d4;font-size:10px}.stage-tools{display:flex;align-items:center;gap:9px}
.mini-avatar{background:linear-gradient(135deg,#ab5dff,#5237c2);border-radius:50%;width:29px;height:29px;display:grid;place-items:center;font:800 12px system-ui}
.fake-search{background:#211f3e;border:1px solid #3c3666;border-radius:23px;color:#a8a5cc;padding:6px 14px;font-size:10px;min-width:145px}
.preview-notice{border:1px solid #473f75;background:#201d41;padding:7px 11px;color:#cbbdf9;font-size:10px;border-radius:9px;margin-bottom:13px;display:flex;align-items:center;gap:7px}
.preview-notice i{font-style:normal;color:#ce91ff}
.mini-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px}
.mini-metric{border:1px solid #494574;border-radius:12px;background:linear-gradient(150deg,#293267,#182143);padding:10px 11px;min-height:73px}
.mini-metric:nth-child(2){background:linear-gradient(150deg,#29275c,#1b1a3f)}.mini-metric:nth-child(3){background:linear-gradient(150deg,#2c215a,#1b173f)}
.mini-metric:nth-child(4){background:linear-gradient(150deg,#1e4d48,#193138)}
.mini-metric span{color:#d3c8ef;font-size:10px;display:block}.mini-metric strong{display:block;font:800 23px system-ui;margin-top:1px;color:white}.mini-metric small{color:#8ce0be;font-size:9px}
.stage-boardhead{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 0 10px}
.stage-boardhead b{font-size:13px}.stage-boardhead a{font-size:10px;padding:6px 11px;border-radius:8px;color:#eadbff;background:#5b3dcc}
.board{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:9px}
.lane{background:linear-gradient(155deg,#21376b,#192147);border-radius:12px;border:1px solid #45457b;padding:10px 9px;min-height:145px}
.lane:nth-child(2){background:linear-gradient(155deg,#29346a,#191d42)}.lane:nth-child(3){background:linear-gradient(155deg,#1f5145,#1a353c)}.lane:nth-child(4){background:linear-gradient(155deg,#4b3b56,#2b253b)}.lane:nth-child(5){background:linear-gradient(155deg,#19493e,#172f36)}
.lane h4{font-size:10px;margin:0 0 10px;display:flex;align-items:center;justify-content:space-between;gap:4px;color:#e9e5ff;font-weight:650}
.lane .count{background:#a5a9fd22;border:1px solid #ffffff29;border-radius:50%;width:21px;height:21px;display:grid;place-items:center;font-size:10px}
.lane-content{border:1px solid #65638a80;border-radius:9px;background:#ffffff0d;padding:12px 8px;min-height:75px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;text-align:center}
.lane-content b{font-size:10px;font-weight:700}.lane-content small{font-size:9px;color:#bdbae4;line-height:1.6}
.stage-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px;font-size:10px;color:#b5afd7}
.value-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px;margin:20px auto 90px}
.value-strip article{border:1px solid #514a85;border-radius:16px;background:linear-gradient(145deg,#292553c9,#161533);padding:18px 17px;min-height:96px;display:flex;align-items:center;gap:12px}
.value-strip .vico{font-size:24px;color:#c67fff;flex:none}.value-strip strong{font-size:12px;display:block}.value-strip p{font-size:10px;color:#c9bfeb;margin-top:3px}
.section{padding:80px 0}.section.alt{background:#11112d}.section-head{text-align:center;max-width:880px;margin:0 auto 28px}.kicker{text-transform:uppercase;letter-spacing:2.2px;color:#bf8dff;font:800 10px system-ui}.section-head h2{font-size:clamp(31px,3.6vw,51px);line-height:1.5;font-weight:900;margin:10px 0}.section-head p{font-size:13px;color:#c6c0e6}
.tool-shell{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start;max-width:1110px;margin:40px auto 0}
.tool-panel{border:1px solid #6659a9;border-radius:20px;background:linear-gradient(160deg,#211b49,#15152f);padding:26px;box-shadow:0 15px 45px #0506173b}
.tool-panel h3{font-size:20px;margin:0 0 7px}.tool-panel>p{font-size:12px;color:#c9c3e7;margin-bottom:18px}
.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px}.field-grid .wide{grid-column:1/-1}
label{font-size:11px;color:#e4dcff;font-weight:700;display:flex;flex-direction:column;gap:5px}
input,select,textarea{min-height:43px;width:100%;background:#100f29;border:1px solid #555080;border-radius:10px;color:#f7f5ff;padding:10px 11px;font-size:12px;outline:0}
input::placeholder{color:#9990bb}input:focus,select:focus{border-color:#ad80ff}
.tool-panel .btn{width:100%;margin-top:17px}.kit-hint{text-align:center;color:#a9a0ce;font-size:10px;margin-top:12px}
.tool-intro{border-radius:20px;padding:28px;background:radial-gradient(circle at 80% 15%,#7735d44f,transparent 55%),linear-gradient(150deg,#24214d,#13132f);border:1px solid #5c4e99;min-height:100%}
.tool-intro>span{font:800 11px system-ui;letter-spacing:2px;color:#bb87fc}
.tool-intro h3{font-size:27px;line-height:1.7;margin:14px 0}.tool-intro>p{color:#c9c2e5;font-size:13px}
.intro-step{border-top:1px solid #4c437b;margin-top:17px;padding-top:12px;display:flex;align-items:center;gap:11px;font-size:12px}
.intro-step b{border-radius:10px;background:#6547d4;width:29px;height:29px;display:grid;place-items:center;font-family:Arial}
.kit-result{display:none;border-top:1px solid #665ba2;margin-top:20px;padding-top:20px}.kit-result.visible{display:block}
.resulthead,.draft-head{display:flex;align-items:center;justify-content:space-between;gap:8px}.resulthead h3{font-size:16px}
.tag{display:inline-block;border-radius:999px;border:1px solid #8662d1;background:#35235d;color:#ead8ff;padding:4px 10px;font-size:10px;font-weight:750}
.result-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}
.result-item,.draft-box{border-radius:12px;padding:12px;border:1px solid #51457e;background:#141331}.result-item strong{color:#bd9fff;font-size:11px}.result-item p{color:#ece9f8;line-height:1.9;font-size:11px;overflow-wrap:anywhere}.result-section-title{font-size:15px;margin-top:20px}
.draft-box{margin-top:10px}.draft-box .draft-head strong{font-size:12px}.draft-box .subline{color:#d2a0ff;font-size:11px}.draft-box p{white-space:pre-wrap;color:#e7e1f6;font-size:11px;line-height:2;overflow-wrap:anywhere}
.result-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:15px}.result-actions .btn{flex:1}
.kit-message{font-size:11px;color:#d7a6ff;margin-top:12px;min-height:18px}
.process{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin:27px auto 0}
.process article{background:linear-gradient(145deg,#252050,#17152f);padding:25px;border:1px solid #594d89;border-radius:16px}
.process article b{display:block;color:#c38dff;font:800 12px system-ui;margin-bottom:22px}
.process article h3{font-size:17px;margin-bottom:9px}.process article p{font-size:12px;color:#cac1e6;line-height:2}
.price-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px;margin:33px auto}
.price{background:#1c1940;border:1px solid #63539a;border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:13px}
.price.featured{background:radial-gradient(circle at 90% 12%,#9255e650,transparent 66%),#25204f;border-color:#a66fff}
.price>strong{font-size:22px}.price .money{font-size:29px;font-weight:900;color:#e6ccff}.price p{font-size:12px;color:#c4b9e2;min-height:55px}
.price ul{list-style:none;padding:0;margin:0 0 14px}.price li{font-size:12px;padding:6px 21px 6px 0;color:#efeafb;position:relative}.price li:before{content:'✓';position:absolute;right:0;color:#ac86ff}
.price .btn{margin-top:auto}
.github-panel{background:linear-gradient(120deg,#30255b,#171730);border:1px solid #8065bc;border-radius:21px;padding:34px;display:flex;justify-content:space-between;gap:24px;align-items:center}
.github-panel h2{font-size:27px}.github-panel p{font-size:12px;max-width:710px;margin-top:9px;color:#d2caee}
.faq{max-width:870px;margin:25px auto}.faq details{border-bottom:1px solid #4e447b;padding:16px 0}.faq summary{cursor:pointer;list-style:none;font-size:13px;font-weight:700;color:#eee8ff}.faq summary:before{content:'+';float:left;color:#ca99ff;font-size:21px;font-family:Arial}.faq details[open] summary:before{content:'−'}.faq details p{color:#c9bfeb;padding-top:7px;font-size:12px;line-height:2}
.footer{padding:35px 0;border-top:1px solid #4c3f81}.footerrow{display:flex;justify-content:space-between;gap:18px;align-items:center}.footer p{font-size:11px;color:#b8afd4}.footlinks{display:flex;gap:18px;flex-wrap:wrap;font-size:11px;color:#d0c8ec}
.modalbackdrop{display:none;position:fixed;inset:0;z-index:60;background:#08051fdf;backdrop-filter:blur(11px);align-items:center;justify-content:center;padding:20px}.modalbackdrop.show{display:flex}
.dialog{width:min(470px,100%);padding:26px;background:#201b41;border-radius:20px;border:1px solid #8768cc;box-shadow:0 20px 80px #0009}.dialogtop{display:flex;justify-content:space-between;align-items:center;gap:13px}.dialogtop h3{font-size:21px}.close{width:38px;height:38px;border-radius:10px;border:1px solid #7461a9;background:#35285b;color:#fff}.dialog>p{font-size:12px;color:#d0c7e7;margin:8px 0 17px}
.dialog label{margin-top:10px}.consent{display:flex;flex-direction:row;align-items:flex-start;gap:8px}.consent input{flex:0 0 17px;width:17px;height:17px;min-height:17px;margin-top:5px}.formnotice{min-height:19px;color:#ffc1ab;font-size:11px}
.dialog .btn{width:100%;margin-top:14px}.legalsmall{font-size:10px;color:#b0a8cf;margin-top:8px}
.skiplink{position:absolute;top:-80px;right:10px;padding:10px;background:#ddd1ff;color:#1f1647;z-index:100}.skiplink:focus{top:7px}
@media(max-width:1180px){.float-card{display:none}.navlinks{gap:16px}.product-stage{grid-template-columns:190px minmax(0,1fr)}.stage-sidebar{padding:17px 9px}.wrapper{width:min(1100px,calc(100% - 46px))}.hero{min-height:420px}.hero h1{font-size:62px}}
@media(max-width:900px){.navlinks{display:none}.menu-toggle{display:block}.mobilemenu.open{display:flex;flex-direction:column;align-items:stretch;gap:8px;padding:12px 28px 23px;border-top:1px solid #3f336a;background:#15142f}.mobilemenu a{padding:6px 0;font-size:13px;color:#e3d9fc}.hero{padding-top:40px;min-height:auto}.hero h1{font-size:clamp(40px,7vw,62px)}.product-stage{grid-template-columns:155px minmax(0,1fr)}.board{grid-template-columns:repeat(3,1fr)}.lane:nth-child(n+4){display:none}.value-strip{grid-template-columns:repeat(2,1fr)}.tool-shell{grid-template-columns:1fr}.tool-intro{display:none}}
@media(max-width:620px){.wrapper{width:calc(100% - 30px)}.topnav{min-height:66px}.logo{font-size:19px}.logo-orb{width:34px;height:28px}.nav-actions .btn{display:none}.hero{padding-top:24px}.hero-eyebrow{font-size:9px;gap:7px;padding:6px 10px}.hero-eyebrow small{font-size:8px}.hero h1{font-size:clamp(37px,10vw,52px);letter-spacing:-1.9px;line-height:1.5;margin:15px 0 7px}.hero h1 .gradient{white-space:normal}.hero-sub{font-size:12px;line-height:2}.hero-buttons .btn{width:100%;min-height:48px}.hero-buttons{gap:9px}.hero-checks{gap:9px 17px;margin-top:18px}.hero-checks span{font-size:9px}.art-scene{margin-top:18px}.product-stage{grid-template-columns:1fr;padding:7px;border-radius:20px;min-height:0}.stage-sidebar{display:none}.stage-main{border-radius:14px;padding:13px}.stage-top h3{font-size:14px}.stage-top p{font-size:9px}.fake-search{display:none}.preview-notice{font-size:9px}.mini-metrics{grid-template-columns:repeat(2,1fr);gap:7px}.mini-metric{min-height:65px}.board{grid-template-columns:repeat(2,1fr);gap:6px}.lane:nth-child(n+3){display:none}.stage-boardhead{padding-top:12px}.integrations{display:none}.stage-footer{flex-wrap:wrap}.value-strip{grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:40px}.value-strip article{padding:12px;align-items:flex-start;min-height:106px}.value-strip .vico{font-size:18px}.value-strip strong{font-size:11px}.value-strip p{font-size:9px}.section{padding:52px 0}.section-head h2{font-size:29px}.section-head p{font-size:12px}.tool-panel{padding:18px}.field-grid,.result-grid{grid-template-columns:1fr}.field-grid .wide{grid-column:1}.process,.price-grid{grid-template-columns:1fr}.github-panel{flex-direction:column;align-items:flex-start;padding:22px}.footerrow{align-items:flex-start;flex-direction:column}.result-actions{flex-direction:column}.result-actions .btn{width:100%}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition:none!important}}
</style>
</head>
<body>
<a class="skiplink" href="#main">رفتن به محتوا</a>
<header class="wrapper topnav">
<a href="/" class="logo" aria-label="OutboundOS"><span class="logo-orb"></span><span>OutboundOS</span></a>
<nav class="navlinks" aria-label="منوی اصلی"><a href="#product">محصول</a><a class="arrow" href="#kit">راهکارها</a><a href="#pricing">قیمت‌گذاری</a><a href="#how">مستندات</a><a class="arrow" href="#opensource">منابع</a><a href="https://github.com/Noetfield-Systems/OutboundOS" target="_blank" rel="noopener noreferrer">GitHub ◉</a></nav>
<div class="nav-actions"><a href="/app" class="btn">ورود</a><a href="#kit" class="btn primary">شروع رایگان ←</a><button type="button" id="menuToggle" class="menu-toggle" aria-label="نمایش منو" aria-expanded="false">☰</button></div>
</header>
<nav class="mobilemenu" id="mobileMenu" aria-label="منوی موبایل"><a href="#kit">شروع رایگان</a><a href="#product">محصول</a><a href="#pricing">قیمت‌گذاری</a><a href="#how">مستندات</a><a href="#opensource">GitHub</a><a href="/fa">میز عملیات فارسی</a><a href="/app">فضای کاری</a></nav>
<main id="main">
<section class="hero wrapper" aria-labelledby="heroTitle">
<div class="float-card plan" aria-label="مراحل جذب اولین مشتری"><strong>کمپین جذب اولین ۱۰ کاربر ◎</strong><div>تعریف مخاطبان هدف <i></i></div><div>آماده‌سازی پیام‌ها <i></i></div><div>ارسال و پیگیری <i></i></div><div class="pending">تبدیل به کاربر <i></i></div></div>
<div class="float-card prompt" aria-hidden="true"><strong>۳ پیام شخصی‌سازی‌پذیر</strong><span>با اطلاعات واقعی خودتان</span><strong class="n">03</strong></div>
<div class="float-card proof" aria-hidden="true"><b>از پیام تا پیگیری</b><p>ثبت اقدام، پاسخ و نتیجه در یک جریان کاری.</p></div>
<div class="hero-eyebrow"><b>ϟ</b> سیستم عملیاتی جذب و تبدیل کاربر <small>Customer Acquisition OS</small></div>
<h1 id="heroTitle">از اولین پیام تا اولین <span class="gradient">مشتری واقعی</span></h1>
<p class="hero-sub">یک سیستم عملیاتی کامل برای پیدا کردن، ارتباط، پیگیری و تبدیل مخاطبان هدف<br> به کاربر یا مشتری — با جریان کاری واقعی، داده قابل اعتماد و خروجی قابل اندازه‌گیری.</p>
<div class="hero-buttons"><a class="btn primary" href="#kit">شروع رایگان (بدون کارت اعتباری) ←</a><a href="https://github.com/Noetfield-Systems/OutboundOS" target="_blank" rel="noopener noreferrer" class="btn">◉ مشاهده در GitHub</a></div>
<div class="hero-checks"><span>استقرار سریع (Railway / Docker)</span><span>قابل توسعه و مشارکت‌پذیر</span><span>آماده برای تیم‌های کوچک و بزرگ</span></div>
</section>
<div class="art-scene wrapper" id="product">
<div class="integrations" aria-hidden="true"><div class="ico" title="ارتباطات">✉</div><div class="ico" title="ثبت اقدام">✓</div><div class="ico" title="گزارش">▥</div><div class="ico"><span>API</span></div></div>
<div class="product-stage" aria-label="پیش‌نمایش رابط عملیاتی OutboundOS؛ داده واقعی کاربر نمایش داده نشده">
<aside class="stage-sidebar">
<div class="sbrand"><span>OutboundOS</span><span class="mini-orb"></span></div>
<a href="/fa" class="active"><span class="sico">⌂</span>میز عملیات</a>
<a href="/fa"><span class="sico">◎</span>کمپین‌ها</a>
<a href="/fa"><span class="sico">♧</span>مخاطبان</a>
<a href="/fa"><span class="sico">⬡</span>فرصت‌ها</a>
<a href="/fa"><span class="sico">✉</span>پیام‌ها</a>
<a href="/fa"><span class="sico">☑</span>اقدامات و پیگیری</a>
<a href="/fa"><span class="sico">▥</span>تحلیل و گزارش</a>
<a href="/app"><span class="sico">⚙</span>تنظیمات</a>
</aside>
<div class="stage-main">
<div class="stage-top"><div><h3>به میز عملیات خوش آمدید <span aria-hidden="true">✦</span></h3><p>از همین‌جا اولین کمپین جذب مشتری‌تان را شروع کنید.</p></div><div class="stage-tools"><span class="fake-search">⌕ جست‌وجو در فضای کاری</span><span class="mini-avatar">OS</span></div></div>
<div class="preview-notice"><i>◇</i> پیش‌نمایش طراحی محصول — این صفحه آمار، مخاطب یا فروش ساختگی نشان نمی‌دهد.</div>
<div class="mini-metrics">
<div class="mini-metric"><span>هدف کمپین اول</span><strong>۱۰</strong><small>مخاطب واقعیِ هدف</small></div>
<div class="mini-metric"><span>مسیر عملیاتی</span><strong>۴</strong><small>قدم از پیام تا نتیجه</small></div>
<div class="mini-metric"><span>پیام‌های قابل ویرایش</span><strong>۳</strong><small>خروجی ابزار رایگان</small></div>
<div class="mini-metric"><span>پیش از ارسال</span><strong>✓</strong><small>تأیید با خود شما</small></div>
</div>
<div class="stage-boardhead"><b>قیف فرصت‌ها</b><a href="/fa">+ ورود به فضای کاری</a></div>
<div class="board">
<div class="lane"><h4>مخاطب جدید <span class="count">۰</span></h4><div class="lane-content"><b>شناخت مخاطب هدف</b><small>افراد واقعی را ثبت کنید</small></div></div>
<div class="lane"><h4>در ارتباط <span class="count">۰</span></h4><div class="lane-content"><b>پیام قابل بررسی</b><small>ثبت ارسال واقعی</small></div></div>
<div class="lane"><h4>پاسخ دریافت‌شده <span class="count">۰</span></h4><div class="lane-content"><b>مدیریت پاسخ</b><small>پیگیری و اقدام بعدی</small></div></div>
<div class="lane"><h4>فرصت واجد شرایط <span class="count">۰</span></h4><div class="lane-content"><b>گفت‌وگوی واقعی</b><small>نیاز، تصمیم و جلسه</small></div></div>
<div class="lane"><h4>تبدیل‌شده <span class="count">۰</span></h4><div class="lane-content"><b>نتیجه قابل اثبات</b><small>ثبت سند تبدیل مشتری</small></div></div>
</div>
<div class="stage-footer"><span>نمای طراحی محصول — اعداد صفر، آمار واقعی سرویس نیستند.</span><a href="/fa" style="color:#c7a7ff">بازکردن برنامه واقعی ←</a></div>
</div></div>
</div>
<div class="wrapper value-strip">
<article><span class="vico">⬡</span><div><strong>یک سیستم، نه چند ابزار</strong><p>جذب، ارتباط و پیگیری در یک جا</p></div></article>
<article><span class="vico">◎</span><div><strong>کمپین‌های هدفمند</strong><p>مخاطب مناسب و پیام شخصی</p></div></article>
<article><span class="vico">ϟ</span><div><strong>جریان کاری عملیاتی</strong><p>اقدام، مالک، موعد و پیگیری</p></div></article>
<article><span class="vico">▥</span><div><strong>اندازه‌گیری تبدیل واقعی</strong><p>جداکردن گزارش از مدرک مستقل</p></div></article>
</div>
<section id="kit" class="section alt">
<div class="wrapper">
<div class="section-head"><span class="kicker">START WITH SOMETHING REAL</span><h2>همین حالا کمپین جذب ۱۰ مشتری اول را بسازید</h2><p>قبل از ثبت‌نام ارزش محصول را تجربه کنید. پیام و برنامه براساس اطلاعات خود شما ساخته می‌شود؛ هیچ مخاطب یا نتیجه جعلی وجود ندارد.</p></div>
<div class="tool-shell">
<div class="tool-panel">
<h3>سازنده رایگان کمپین</h3><p>سه ورودی اصلی؛ برنامه هفت‌روزه و سه پیام قابل ویرایش.</p>
<form id="kitForm">
<div class="field-grid">
<label class="wide">چه محصول یا خدمتی می‌فروشید؟<input id="offerInput" name="offer" required maxlength="180" placeholder="مثلاً به پیمانکاران کمک می‌کنیم سفارش تغییرات را سریع‌تر ثبت کنند"></label>
<label>مشتری هدف شما کیست؟<input id="buyerInput" name="buyer" required maxlength="120" placeholder="مثلاً مدیران عملیات شرکت‌های ساختمانی"></label>
<label>مشکل مهم آنها چیست؟<input id="painInput" name="pain" required maxlength="180" placeholder="مثلاً کارهای اضافی قبل از صورت‌حساب گم می‌شوند"></label>
<label class="wide">مدرک یا توضیح قابل اثبات (اختیاری)<input id="proofInput" name="proof" maxlength="190" placeholder="فقط واقعیتی که می‌توانید ثابت کنید"></label>
<label>کانال ارتباط<select id="channelInput" name="channel"><option value="email">ایمیل</option><option value="linkedin">لینکدین</option></select></label>
<label>هدف کمپین<select id="goalInput" name="goal"><option value="conversation">شروع گفت‌وگو</option><option value="demo">رزرو دمو</option><option value="pilot">یافتن مشتری آزمایشی</option></select></label>
</div>
<button type="submit" class="btn primary">ساخت کمپین و پیام‌های من ←</button>
<p class="kit-hint">بدون ثبت‌نام یا پرداخت. پیام‌ها در مرورگر ساخته می‌شوند و ارسال خودکار انجام نمی‌شود.</p>
</form>
<div id="kitOutput" class="kit-result" aria-live="polite"></div>
<div class="kit-message" id="kitMessage" role="status" aria-live="polite"></div>
</div>
<div class="tool-intro">
<span>FROM IDEA TO FIRST CUSTOMER</span><h3>کمتر حرف بزنید. اولین کمپین را واقعاً اجرا کنید.</h3>
<p>این یک تصویر نمایشی یا فرم بی‌سرانجام نیست: برنامه را بسازید، دانلود کنید، سپس به‌عنوان کمپین پیش‌نویس در دیتابیس واقعی ذخیره کنید.</p>
<div class="intro-step"><b>۱</b>مخاطب و مسئله واقعی را تعریف کنید.</div>
<div class="intro-step"><b>۲</b>پیام‌های قابل ویرایش و برنامه پیگیری بگیرید.</div>
<div class="intro-step"><b>۳</b>پیش‌نویس را در فضای کاری ذخیره کنید.</div>
<div class="intro-step"><b>۴</b>مخاطبان واقعی را وارد و نتیجه را ثبت کنید.</div>
<a href="/fa" class="btn" style="margin-top:24px">مشاهده میز عملیات ←</a>
</div>
</div></div></section>
<section id="how" class="section">
<div class="wrapper"><div class="section-head"><span class="kicker">REAL WORKFLOWS</span><h2>از اولین گفت‌وگو تا نتیجه قابل اثبات</h2><p>برای فروش واقعی طراحی شده است؛ نه برای پر کردن داشبورد با اعداد مصنوعی.</p></div>
<div class="process"><article><b>01 / DISCOVER</b><h3>اول مخاطب درست</h3><p>منبع واقعی، نیاز و تناسب هر مخاطب را ثبت و به کمپین مناسب متصل کنید.</p></article><article><b>02 / EXECUTE</b><h3>بعد اقدام درست</h3><p>پیام قابل بازبینی، مرحله، مسئول، موعد پیگیری و سابقه کارها را یکجا داشته باشید.</p></article><article><b>03 / MEASURE</b><h3>در نهایت نتیجه واقعی</h3><p>تفاوت پیش‌نویس، ارسال گزارش‌شده، پاسخ واقعی و تبدیل تأییدشده روشن می‌ماند.</p></article></div>
</div></section>
<section id="pricing" class="section alt"><div class="wrapper"><div class="section-head"><span class="kicker">GET STARTED</span><h2>رایگان شروع کنید؛ برای رشد بیشتر درخواست دسترسی بدهید</h2><p>قیمت ساختگی، تخفیف نمایشی و پرداخت صوری وجود ندارد.</p></div>
<div class="price-grid"><article class="price"><strong>Free Workspace</strong><span class="money">رایگان</span><p>ابزار رایگان، کمپین پیش‌نویس، مخاطب و مدیریت پیگیری.</p><ul><li>ساخت برنامه و سه پیام</li><li>ذخیره کمپین واقعی</li><li>CRM و صف اقدامات</li><li>گزارش پاسخ و نتیجه</li></ul><a class="btn" href="/fa">شروع با فضای کاری ←</a></article>
<article class="price featured"><strong>Growth / Early Access</strong><span class="money">لیست انتظار</span><p>برای اتصال سرویس‌ها، اجرای گسترده‌تر و رشد تیمی؛ هنوز خریدی انجام نمی‌شود.</p><ul><li>ثبت درخواست دسترسی</li><li>اعلان قابلیت‌های تازه</li><li>بررسی نیاز تیم‌های فروش</li><li>بدون خرید یا شارژ خودکار</li></ul><button class="btn primary" type="button" data-interest="Growth early access">پیوستن به لیست انتظار ←</button></article></div>
</div></section>
<section id="opensource" class="section"><div class="wrapper"><div class="github-panel"><div><span class="kicker">BUILD IN THE OPEN</span><h2>کد را ببینید، اجرا کنید، بهترش کنید.</h2><p>مخزن عمومی GitHub، راهنمای اجرا، تست‌های مرورگر و مسیر مشارکت دارد. امتیاز و ستاره ساختگی نشان نمی‌دهیم؛ اگر پروژه واقعاً به کارتان آمد، آن را دنبال کنید.</p></div><a class="btn primary" href="https://github.com/Noetfield-Systems/OutboundOS" target="_blank" rel="noopener noreferrer">مشاهده مخزن GitHub ↗</a></div></div></section>
<section id="faq" class="section alt"><div class="wrapper"><div class="section-head"><span class="kicker">FAQ</span><h2>سؤال‌های مهم، پاسخ‌های روشن</h2></div>
<div class="faq">
<details><summary>آیا ابزار رایگان برایم مخاطب واقعی پیدا می‌کند؟</summary><p>خیر. برنامه و پیام‌ها فقط از اطلاعات خودتان ساخته می‌شوند. مخاطبان واقعی را با منبع معتبر وارد کنید؛ کشف مخاطب از طریق سرویس‌های متصل جداگانه انجام می‌شود.</p></details>
<details><summary>آیا ساخت کمپین، پیام‌ها را به‌صورت خودکار ارسال می‌کند؟</summary><p>خیر. ابتدا پیش‌نویس ذخیره می‌شود؛ ارسال نیازمند اقدام واقعی و کانال مجاز است.</p></details>
<details><summary>آیا نیاز به ساخت حساب و کارت بانکی دارم؟</summary><p>خیر. ابزار رایگان بدون ورود است و فضای کاری مهمان بلافاصله ایجاد می‌شود. برای بازیابی حساب می‌توانید Passkey تنظیم کنید.</p></details>
<details><summary>آیا OutboundOS فقط برای ایمیل است؟</summary><p>خیر. مدیریت مخاطب، پیگیری و ثبت نتایج مستقل از کانال است؛ متن لینکدین و ایمیل هم قابل ساخت است.</p></details>
<details><summary>آیا آمار تبدیل در این صفحه واقعی است؟</summary><p>پیش‌نمایش عمومی داده کاربران را نمایش نمی‌دهد و صفرهای آن آمار واقعی نیستند. داده‌های واقعی فقط در فضای کاری همان کاربر ثبت می‌شوند.</p></details>
<details><summary>آیا Growth همین حالا قابل خرید است؟</summary><p>فعلاً لیست انتظار با ثبت رضایت است. پرداخت یا اشتراک پولی از صفحه عمومی فعال نشده است.</p></details>
</div></div></section>
</main>
<footer class="footer"><div class="wrapper footerrow"><div><a href="/" class="logo"><span class="logo-orb"></span><span>OutboundOS</span></a><p>محصول مستقل برای اجرای جذب مشتری و پیگیری واقعی.</p></div><div class="footlinks"><a href="/fa">میز عملیات</a><a href="/app">فضای کاری</a><a href="/privacy">حریم خصوصی</a><a href="/terms">شرایط استفاده</a><a href="https://github.com/Noetfield-Systems/OutboundOS" target="_blank" rel="noopener noreferrer">GitHub</a></div></div></footer>
<div class="modalbackdrop" id="interestOverlay" role="presentation"><div class="dialog" role="dialog" aria-modal="true" aria-labelledby="interestTitle">
<div class="dialogtop"><h3 id="interestTitle">دسترسی زودهنگام Growth</h3><button type="button" id="closeInterest" class="close" aria-label="بستن">×</button></div>
<p>برای درخواست دسترسی ایمیل خود را وارد کنید. پرداخت و عضویت پولی انجام نمی‌شود.</p>
<form id="interestForm"><label>ایمیل کاری<input required type="email" name="email" maxlength="254" placeholder="you@company.com" autocomplete="email" dir="ltr"></label>
<label>وب‌سایت شرکت (اختیاری)<input name="website" maxlength="300" placeholder="yourcompany.com" dir="ltr"></label>
<label class="consent"><input required type="checkbox" name="consent"><span>موافقم درباره دسترسی زودهنگام OutboundOS ایمیل دریافت کنم و هر زمان بتوانم لغو کنم.</span></label>
<input aria-hidden="true" tabindex="-1" autocomplete="off" type="text" name="fax_number" style="display:none">
<div id="interestNotice" class="formnotice" role="status" aria-live="polite"></div>
<button class="btn primary" id="interestSubmit" type="submit">ثبت درخواست دسترسی ←</button></form>
<div class="legalsmall">درخواست تنها پس از رضایت شما ذخیره می‌شود.</div></div></div>
<script>
(function(){
'use strict';
const $=id=>document.getElementById(id);
const safe=s=>String(s==null?'':s).trim().replace(/\s+/g,' ');
const report=(event,source)=>fetch('/api/public/track',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({event,source:source||'website'}),keepalive:true}).catch(()=>{});
report('landing_view',new URLSearchParams(location.search).get('utm_source')||'organic');
document.querySelectorAll('a[href="/app"],a[href="/fa"]').forEach(a=>a.addEventListener('click',()=>report('workspace_click','public-cta')));
const pricing=$('pricing');
if(pricing&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries[0]&&entries[0].isIntersecting){report('pricing_view','public-pricing');observer.disconnect()}},{threshold:.25});observer.observe(pricing)}
document.querySelectorAll('#faq details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)report('faq_open','public-faq')}));
const menu=$('menuToggle'),mobile=$('mobileMenu');
menu.addEventListener('click',()=>{const opened=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.textContent=opened?'×':'☰'});
mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));
const overlay=$('interestOverlay'),notice=$('interestNotice'),interestForm=$('interestForm');
function closeInterest(){overlay.classList.remove('show');document.body.style.overflow='';}
function openInterest(){report('growth_open','pricing');overlay.classList.add('show');document.body.style.overflow='hidden';setTimeout(()=>interestForm.elements.email.focus(),25)}
document.querySelectorAll('[data-interest]').forEach(b=>b.addEventListener('click',openInterest));
$('closeInterest').addEventListener('click',closeInterest);
overlay.addEventListener('click',e=>{if(e.target===overlay)closeInterest()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeInterest()});
interestForm.addEventListener('submit',async e=>{
e.preventDefault();notice.textContent='';const btn=$('interestSubmit');btn.disabled=true;btn.textContent='Saving request…';
try{const payload={email:interestForm.elements.email.value,website:interestForm.elements.website.value,consent:interestForm.elements.consent.checked,honeypot:interestForm.elements.fax_number.value,source:'growth-early-access'};
const response=await fetch('/api/public/interest',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});const json=await response.json().catch(()=>({}));
if(!response.ok)throw Error(json.error||'The request could not be saved.');
interestForm.replaceWith(Object.assign(document.createElement('div'),{innerHTML:'<div class="tag">درخواست ثبت شد</div><p style="margin:16px 0">Your early-access interest has been recorded. No charge was made.</p><a class="button" href="/fa">شروع رایگان ↗</a>'}));
report('workspace_click','interest-confirmation');
}catch(err){notice.textContent=err.message||'Please retry.';btn.disabled=false;btn.textContent='Request access ↗';}
});
const kit=$('kitForm'),output=$('kitOutput'),msg=$('kitMessage');
let current=null;
const channelName=()=> $('channelInput').value==='linkedin'?'linkedin':'email';
function text(tag,value,className){const el=document.createElement(tag);if(className)el.className=className;el.textContent=value;return el}
function insert(parent,element){parent.appendChild(element);return element}
function card(title,body){const n=text('div','','result-item');insert(n,text('strong',title));insert(n,text('p',body));return n}
function sentence(v){return v.replace(/[.!?]+$/,'')}
function makePlan(d){
const goal=d.goal==='demo'?'a short walkthrough':d.goal==='pilot'?'a small pilot':'a brief conversation';
const proof=d.proof?' '+sentence(d.proof)+'.':'';
const body1='Hi [First name],\n\nI work with '+d.buyer+' who face this issue: '+sentence(d.pain)+'.\n\n'+sentence(d.offer)+'.'+proof+'\n\nWould '+goal+' be worth exploring for your team?\n\n[Your name]';
const body2='Hi [First name],\n\nFollowing up on my note about '+sentence(d.pain)+'.\n\nIf this is a priority, I can share how '+sentence(d.offer).toLowerCase()+' could fit your workflow. Would a short exchange be useful?\n\n[Your name]';
const body3='Hi [First name],\n\nLast note from me on '+sentence(d.pain)+'. If you are not the right person for this, no reply needed. If it is relevant later, I am happy to send a concise outline.\n\n[Your name]';
return {offer:d.offer,buyer:d.buyer,pain:d.pain,proof:d.proof,channel:d.channel,goal:d.goal,ask:goal,
 messages:[{day:1,title:'پیام اول',subject:'A quick question about '+sentence(d.pain).slice(0,69),body:body1},{day:4,title:'پیگیری مؤثر',subject:'Re: '+sentence(d.pain).slice(0,69),body:body2},{day:7,title:'آخرین پیگیری محترمانه',subject:'Should I close the loop?',body:body3}],
 schedule:[{day:1,action:'Find and qualify 10 real contacts. Record source, role and fit.'},{day:2,action:'Personalize the first message for each relevant contact; send only through your approved channel.'},{day:4,action:'Review genuine replies, stop contact where requested, and follow up where appropriate.'},{day:7,action:'Close the loop with eligible non-responders; note meetings, responses and next actions.'}]};
}
function formatMarkdown(p){
const lines=['# OutboundOS — first-10 outreach kit','','Built from user-provided inputs. No lead discovery, verification or sending performed.','',
'## Your offer',p.offer,'','## Ideal buyer',p.buyer,'','## مسئله اصلی',p.pain,'','## Credible evidence',p.proof||'Not provided — add verified evidence before sending.','','## Channel',p.channel,'','## Goal',p.ask,'','## Practical week'];
p.schedule.forEach(s=>lines.push('روز '+s.day+': '+s.action));
p.messages.forEach(m=>lines.push('','## روز '+m.day+' · '+m.title,'','موضوع: '+m.subject,'',m.body));
lines.push('','## Track real outcomes','Contact | Company | Source | پیام sent | Reply | Next action | Due date | Outcome','--- | --- | --- | --- | --- | --- | --- | ---','(Add actual contacts only)','',
'## Before using','Verify recipient fit, permission and factual claims. A generated draft is not evidence of contact or conversion.');
return lines.join('\n');
}
function render(p){
output.replaceChildren();const head=text('div','','resulthead');insert(head,text('h3','کمپین شما برای ۱۰ مشتری اول'));insert(head,text('span','قابل ویرایش · ارسال نشده','tag'));insert(output,head);
const grid=text('div','','result-grid');grid.appendChild(card('مخاطب هدف',p.buyer));grid.appendChild(card('مسئله اصلی',p.pain));insert(output,grid);
insert(output,text('h3','برنامه اجرایی هفت‌روزه','result-section-title'));
const schedule=text('div','','result-grid');
p.schedule.forEach(s=>insert(schedule,card('روز '+s.day,s.action)));insert(output,schedule);
p.messages.forEach((m,i)=>{const b=text('div','','draft-box'),h=text('div','','draft-head');insert(h,text('strong','پیام '+(i+1)+' / '+m.title));const copy=text('button','کپی','button tiny ghost');copy.type='button';copy.addEventListener('click',()=>copyText(m.subject+'\n\n'+m.body));insert(h,copy);insert(b,h);insert(b,text('div','موضوع: '+m.subject,'subline'));insert(b,text('p',m.body));insert(output,b)});
const actions=text('div','','result-actions');
const save=text('button','ذخیره کمپین در فضای کاری ↗','button');save.type='button';save.id='saveKit';save.addEventListener('click',savePlan);
const download=text('button','دریافت فایل برنامه','button ghost');download.type='button';download.id='downloadKit';download.addEventListener('click',downloadPlan);
const csv=text('button','فایل CSV مخاطبان','button ghost');csv.type='button';csv.id='exportTemplate';csv.addEventListener('click',exportTemplate);
actions.append(save,download,csv);insert(output,actions);
insert(output,text('p','تنها بر اساس اطلاعات شما ساخته شده؛ پیام‌ها را قبل از استفاده بررسی و شخصی‌سازی کنید. هیچ مخاطب، ارسال یا نتیجه تأییدشده‌ای تولید نشده است.','kit-hint'));
output.classList.add('visible');msg.textContent='برنامه آماده است؛ می‌توانید پیام‌ها را کپی، فایل را دانلود یا پیش‌نویس را در فضای کاری ذخیره کنید.';
}
kit.addEventListener('submit',e=>{
e.preventDefault();msg.textContent='';
const d={offer:safe($('offerInput').value),buyer:safe($('buyerInput').value),pain:safe($('painInput').value),proof:safe($('proofInput').value),channel:channelName(),goal:$('goalInput').value};
if(d.offer.length<9||d.buyer.length<6||d.pain.length<8){msg.textContent='Add a more specific offer, buyer and problem so the kit can be useful.';return;}
current=makePlan(d);render(current);report('kit_generated',d.channel);output.scrollIntoView({block:'nearest',behavior:'smooth'});
});
async function copyText(value){try{await navigator.clipboard.writeText(value);msg.textContent='پیام کپی شد.';report('kit_copy','campaign');}catch(err){msg.textContent='Clipboard unavailable. Select the message text manually.';}}
function fileDownload(name,content,type){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
function downloadPlan(){if(!current)return;fileDownload('outboundos-first-10-kit.md',formatMarkdown(current),'text/markdown;charset=utf-8');msg.textContent='فایل برنامه آماده دانلود است.';report('kit_download','markdown');}
function exportTemplate(){if(!current)return;const head='name,company,email,title,source,owner,channel,next_action,next_action_at,match_quality';fileDownload('outboundos-real-contacts-template.csv',String.fromCharCode(65279)+head+'\r\n','text/csv;charset=utf-8');msg.textContent='Blank CSV template ready. Add only genuine contacts; no synthetic leads were exported.';report('kit_download','csv');}
async function savePlan(){
if(!current)return;const btn=$('saveKit');btn.disabled=true;msg.textContent='در حال ذخیره کمپین پیش‌نویس در فضای کاری…';
try{const state=await fetch('/api/state',{credentials:'same-origin'});if(!state.ok)throw Error('Could not create your workspace. Please retry.');
const p=current,m=p.messages[0],res=await fetch('/api/fa/campaigns',{method:'POST',credentials:'same-origin',headers:{'content-type':'application/json'},body:JSON.stringify({name:'First 10 · '+p.buyer.slice(0,70),subject:m.subject,body:m.body,target_audience:p.buyer,channel:p.channel,owner:'Founder',goal:p.ask,source:'OutboundOS free outreach kit'})});
const data=await res.json().catch(()=>({}));if(!res.ok||!data.id)throw Error(data.error||'The campaign could not be saved.');
report('kit_saved','guest-workspace');msg.textContent='کمپین در پایگاه داده ذخیره شد؛ در حال بازکردن فضای کاری…';location.assign('/fa');
}catch(err){msg.textContent=err.message||'Please retry.';btn.disabled=false;}
}
})();
</script>
</body></html>`);
