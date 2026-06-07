import { useState, useEffect, useRef } from "react";

const TEMPLATES = {
  gmail: {
    name:"Gmail", category:"Email", icon:"✉",
    brandColor:"#EA4335", brandBg:"#fff", brandText:"#202124",
    logoRender:()=>(
      <span style={{fontFamily:"sans-serif",fontSize:"1.8rem",fontWeight:700,letterSpacing:"-1px"}}>
        <span style={{color:"#4285F4"}}>G</span><span style={{color:"#EA4335"}}>m</span>
        <span style={{color:"#FBBC05"}}>a</span><span style={{color:"#4285F4"}}>i</span>
        <span style={{color:"#34A853"}}>l</span>
      </span>
    ),
    tagline:"A Google Product", heading:"Sign in", subheading:"to continue to Gmail",
    userLabel:"Email or phone", userPlaceholder:"Email or phone",
    passLabel:"Enter your password", btnText:"Next",
    footerLinks:["Help","Privacy","Terms"],
    suspiciousDomain:"accounts.gmai1-login.verify.tk",
    redFlag:"gmai1 — digit 1 not letter L + .tk TLD",
  },
  youtube: {
    name:"YouTube", category:"Social", icon:"▶",
    brandColor:"#FF0000", brandBg:"#0f0f0f", brandText:"#fff",
    logoRender:()=>(
      <span style={{display:"flex",alignItems:"center",gap:"6px"}}>
        <span style={{background:"#FF0000",borderRadius:"6px",padding:"3px 8px",color:"#fff",fontWeight:900,fontSize:"1rem"}}>▶</span>
        <span style={{fontFamily:"sans-serif",fontWeight:700,fontSize:"1.4rem",color:"#111"}}>YouTube</span>
      </span>
    ),
    tagline:"", heading:"Sign in", subheading:"with your Google Account",
    userLabel:"Email or phone", userPlaceholder:"Email or phone",
    passLabel:"Your password", btnText:"Next",
    footerLinks:["Help","Privacy","Terms"],
    suspiciousDomain:"y0utube-login.stream-access.xyz",
    redFlag:"y0utube — zero instead of 'o' + .xyz TLD",
  },
  facebook: {
    name:"Facebook", category:"Social", icon:"f",
    brandColor:"#1877F2", brandBg:"#f0f2f5", brandText:"#1c1e21",
    logoRender:()=>(
      <span style={{fontFamily:"sans-serif",fontSize:"2rem",fontWeight:900,color:"#1877F2",letterSpacing:"-1px"}}>facebook</span>
    ),
    tagline:"Connect with friends and the world around you.", heading:"Log in to Facebook", subheading:"",
    userLabel:"Email address or phone number", userPlaceholder:"Email or phone",
    passLabel:"Password", btnText:"Log in",
    footerLinks:["About","Privacy","Terms","Help","Cookies"],
    suspiciousDomain:"faceb00k-login.secure-account.men",
    redFlag:"faceb00k — two zeros + .men TLD",
  },
  instagram: {
    name:"Instagram", category:"Social", icon:"📷",
    brandColor:"#C13584", brandBg:"#fafafa", brandText:"#262626",
    logoRender:()=>(
      <span style={{
        fontFamily:"cursive,sans-serif",fontSize:"2rem",fontWeight:400,
        background:"linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
      }}>Instagram</span>
    ),
    tagline:"Sign in to see photos and videos from your friends.", heading:"", subheading:"",
    userLabel:"Phone number, username or email", userPlaceholder:"Phone number, username or email",
    passLabel:"Password", btnText:"Log in",
    footerLinks:["About","Help","Press","Privacy","Terms"],
    suspiciousDomain:"instagram-login.account-verify.pw",
    redFlag:"account-verify subdomain + .pw TLD",
  },
  paypal: {
    name:"PayPal", category:"Finance", icon:"💳",
    brandColor:"#003087", brandBg:"#fff", brandText:"#2C2E2F",
    logoRender:()=>(
      <span style={{display:"flex",alignItems:"center"}}>
        <span style={{color:"#003087",fontFamily:"sans-serif",fontWeight:900,fontSize:"1.6rem",fontStyle:"italic"}}>Pay</span>
        <span style={{color:"#009cde",fontFamily:"sans-serif",fontWeight:900,fontSize:"1.6rem",fontStyle:"italic"}}>Pal</span>
      </span>
    ),
    tagline:"The safer, easier way to pay", heading:"Log in to your account", subheading:"",
    userLabel:"Email address", userPlaceholder:"Email address",
    passLabel:"Password", btnText:"Log In",
    footerLinks:["Privacy","Legal","Contact","Worldwide"],
    suspiciousDomain:"paypa1-secure.account-verify.xyz",
    redFlag:"paypa1 — digit 1 not letter L + .xyz TLD",
  },
  google_account: {
    name:"Google Account", category:"Google", icon:"🔐",
    brandColor:"#4285F4", brandBg:"#fff", brandText:"#202124",
    logoRender:()=>(
      <span style={{fontFamily:"sans-serif",fontSize:"1.8rem",fontWeight:700,letterSpacing:"-1px"}}>
        <span style={{color:"#4285F4"}}>G</span><span style={{color:"#EA4335"}}>o</span>
        <span style={{color:"#FBBC05"}}>o</span><span style={{color:"#4285F4"}}>g</span>
        <span style={{color:"#34A853"}}>l</span><span style={{color:"#EA4335"}}>e</span>
      </span>
    ),
    tagline:"One account. All of Google.", heading:"Sign in", subheading:"Use your Google Account",
    userLabel:"Email or phone", userPlaceholder:"Email or phone",
    passLabel:"Enter your password", btnText:"Next",
    footerLinks:["Help","Privacy","Terms"],
    suspiciousDomain:"accounts.go0gle-verify.login.cc",
    redFlag:"go0gle — zero not 'o' + .cc TLD",
  },
  google_drive: {
    name:"Google Drive", category:"Google", icon:"📁",
    brandColor:"#4285F4", brandBg:"#fff", brandText:"#202124",
    logoRender:()=>(
      <span style={{display:"flex",alignItems:"center",gap:"8px"}}>
        <span style={{color:"#4285F4",fontSize:"1.5rem",fontWeight:900}}>▲</span>
        <span style={{fontFamily:"sans-serif",fontWeight:400,fontSize:"1.3rem",color:"#5f6368"}}>Drive</span>
      </span>
    ),
    tagline:"Easy and secure access to your content", heading:"Sign in to Google Drive", subheading:"Use your Google Account",
    userLabel:"Email or phone", userPlaceholder:"Email or phone",
    passLabel:"Enter your password", btnText:"Next",
    footerLinks:["Help","Privacy","Terms"],
    suspiciousDomain:"drive.google-docs-shared.view.top",
    redFlag:"google in subdomain not root domain + .top TLD",
  },
  google_pay: {
    name:"Google Pay", category:"Google", icon:"💰",
    brandColor:"#4285F4", brandBg:"#fff", brandText:"#202124",
    logoRender:()=>(
      <span style={{fontFamily:"sans-serif",fontSize:"1.5rem",fontWeight:700}}>
        <span style={{color:"#4285F4"}}>G</span><span style={{color:"#EA4335"}}>o</span>
        <span style={{color:"#FBBC05"}}>o</span><span style={{color:"#4285F4"}}>g</span>
        <span style={{color:"#34A853"}}>l</span><span style={{color:"#EA4335"}}>e</span>
        <span style={{color:"#5f6368"}}> Pay</span>
      </span>
    ),
    tagline:"Pay with your Google Account", heading:"Sign in", subheading:"to continue to Google Pay",
    userLabel:"Email or phone", userPlaceholder:"Email or phone",
    passLabel:"Enter your password", btnText:"Next",
    footerLinks:["Help","Privacy","Terms"],
    suspiciousDomain:"pay.go0gle-payment.confirm-account.pw",
    redFlag:"go0gle + payment-confirm chain + .pw TLD",
  },
  google_photos: {
    name:"Google Photos", category:"Google", icon:"🌸",
    brandColor:"#4285F4", brandBg:"#fff", brandText:"#202124",
    logoRender:()=>(
      <span style={{display:"flex",alignItems:"center",gap:"8px"}}>
        <span style={{fontSize:"1.4rem"}}>🌸</span>
        <span style={{fontFamily:"sans-serif",fontWeight:400,fontSize:"1.3rem",color:"#5f6368"}}>Photos</span>
      </span>
    ),
    tagline:"Your photos, organized and easy to find", heading:"Sign in to Google Photos", subheading:"Use your Google Account",
    userLabel:"Email or phone", userPlaceholder:"Email or phone",
    passLabel:"Enter your password", btnText:"Next",
    footerLinks:["Help","Privacy","Terms"],
    suspiciousDomain:"photos.google-shared-album.view.xyz",
    redFlag:"google in subdomain only + .xyz + 'shared' keyword",
  },
  commercial: {
    name:"Commercial Bank", category:"LK Bank", icon:"🏦",
    brandColor:"#c8102e", brandBg:"#fff", brandText:"#1a1a1a",
    logoRender:()=>(
      <span style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
        <span style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:"1.05rem",color:"#c8102e",letterSpacing:"0.04em"}}>COMMERCIAL BANK</span>
        <span style={{fontFamily:"Georgia,serif",fontWeight:400,fontSize:"0.6rem",color:"#666",letterSpacing:"0.18em"}}>OF CEYLON PLC</span>
      </span>
    ),
    tagline:"The Bank That Listens", heading:"ComBank Online Banking", subheading:"Secure Internet Banking Login",
    userLabel:"Username / NIC / Account No.", userPlaceholder:"Enter username",
    passLabel:"Password", btnText:"Login",
    footerLinks:["Privacy Policy","Security Tips","Contact Us"],
    suspiciousDomain:"combank-lk.secure-verify.account-login.pw",
    redFlag:"Not real domain + .pw + hyphenated subdomain chain",
  },
  sampath: {
    name:"Sampath Bank", category:"LK Bank", icon:"🏦",
    brandColor:"#e30613", brandBg:"#fff", brandText:"#1a1a1a",
    logoRender:()=>(
      <span style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
        <span style={{fontFamily:"'Arial Black',sans-serif",fontWeight:900,fontSize:"1.2rem",color:"#e30613"}}>SAMPATH</span>
        <span style={{fontFamily:"Arial,sans-serif",fontWeight:400,fontSize:"0.6rem",color:"#888",letterSpacing:"0.2em"}}>BANK PLC</span>
      </span>
    ),
    tagline:"With You Every Step of the Way", heading:"Sampath Vishwa", subheading:"Internet Banking Login",
    userLabel:"User ID", userPlaceholder:"Enter User ID",
    passLabel:"Password", btnText:"Login",
    footerLinks:["Security","Privacy","Help","Sitemap"],
    suspiciousDomain:"sampath-bank-lk.vishwa-login.verify.top",
    redFlag:"Not real sampathbank.lk + .top TLD + verify keyword",
  },
  hnb: {
    name:"HNB", category:"LK Bank", icon:"🏦",
    brandColor:"#003478", brandBg:"#fff", brandText:"#1a1a1a",
    logoRender:()=>(
      <span style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
        <span style={{fontFamily:"'Arial Black',sans-serif",fontWeight:900,fontSize:"1.5rem",color:"#003478",letterSpacing:"2px"}}>HNB</span>
        <span style={{fontFamily:"Arial,sans-serif",fontWeight:400,fontSize:"0.52rem",color:"#888",letterSpacing:"0.12em"}}>HATTON NATIONAL BANK</span>
      </span>
    ),
    tagline:"Growing With You", heading:"HNB Connect", subheading:"Personal Internet Banking",
    userLabel:"User Name", userPlaceholder:"Enter your username",
    passLabel:"Password", btnText:"Sign In",
    footerLinks:["Privacy","Terms","Security","Contact"],
    suspiciousDomain:"hnb-connect.account-verify.login.xyz",
    redFlag:"Not real domain + account-verify keyword + .xyz TLD",
  },
  boc: {
    name:"Bank of Ceylon", category:"LK Bank", icon:"🏦",
    brandColor:"#00538b", brandBg:"#fff", brandText:"#1a1a1a",
    logoRender:()=>(
      <span style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
        <span style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:"1rem",color:"#00538b",letterSpacing:"0.05em"}}>BANK OF CEYLON</span>
        <span style={{fontFamily:"Georgia,serif",fontWeight:400,fontSize:"0.6rem",color:"#c8a84b",letterSpacing:"0.3em"}}>EST. 1939</span>
      </span>
    ),
    tagline:"Bank of the Nation", heading:"BOC eBanking", subheading:"Secure Online Banking Portal",
    userLabel:"User ID / Account Number", userPlaceholder:"Enter User ID",
    passLabel:"Password", btnText:"Login",
    footerLinks:["Privacy","Security","Contact","Accessibility"],
    suspiciousDomain:"boc-ebanking-lk.secure-portal.men",
    redFlag:"Not real boc.lk + .men TLD + secure-portal keyword",
  },
  peoples: {
    name:"People's Bank", category:"LK Bank", icon:"🏦",
    brandColor:"#8B0000", brandBg:"#fff", brandText:"#1a1a1a",
    logoRender:()=>(
      <span style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
        <span style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:"1rem",color:"#8B0000",letterSpacing:"0.05em"}}>PEOPLE'S BANK</span>
        <span style={{fontFamily:"Georgia,serif",fontWeight:400,fontSize:"0.6rem",color:"#888",letterSpacing:"0.15em"}}>SRI LANKA</span>
      </span>
    ),
    tagline:"The People's Choice Since 1961", heading:"People's Wave", subheading:"Internet Banking Login",
    userLabel:"User Name", userPlaceholder:"Enter username",
    passLabel:"Password", btnText:"Login",
    footerLinks:["Privacy Policy","Security Tips","Contact Us"],
    suspiciousDomain:"peoplesbank-lk.wave-portal.verify.cc",
    redFlag:"Not real domain + wave-portal + .cc TLD",
  },
  ntb: {
    name:"Nations Trust Bank", category:"LK Bank", icon:"🏦",
    brandColor:"#e4002b", brandBg:"#fff", brandText:"#1a1a1a",
    logoRender:()=>(
      <span style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
        <span style={{fontFamily:"'Arial Black',sans-serif",fontWeight:900,fontSize:"0.9rem",color:"#e4002b",letterSpacing:"0.04em"}}>NATIONS TRUST BANK</span>
        <span style={{fontFamily:"Arial,sans-serif",fontWeight:400,fontSize:"0.55rem",color:"#888",letterSpacing:"0.2em"}}>FIT FOR LIFE</span>
      </span>
    ),
    tagline:"Fit for Life", heading:"NTB Online Banking", subheading:"Secure Internet Banking",
    userLabel:"Username", userPlaceholder:"Enter your username",
    passLabel:"Password / PIN", btnText:"Login",
    footerLinks:["Privacy","Security","Help","Contact"],
    suspiciousDomain:"ntb-online-lk.secure-login.account.pw",
    redFlag:"Not real domain + account keyword + .pw TLD",
  },
};

const CATEGORIES = ["All","Email","Social","Finance","Google","LK Bank"];

const RED_FLAGS = [
  {id:"domain",   label:"Suspicious Domain",          detail:(t)=>`"${t.suspiciousDomain}" is NOT the real site. ${t.redFlag}.`},
  {id:"urgency",  label:"Urgency / Fear Tactics",      detail:()=>"Phrases like 'Your account will be suspended' pressure victims into acting fast without thinking."},
  {id:"form",     label:"Credential Harvesting Form",  detail:()=>"The form sends credentials to an attacker-controlled server. The page looks identical to the real one."},
  {id:"https",    label:"HTTPS Does Not Mean Safe",    detail:()=>"Phishing sites use HTTPS too. The padlock only means encrypted transit — not that the site is legitimate."},
  {id:"brand",    label:"Brand Spoofing",              detail:(t)=>`Clones ${t.name}'s brand colors and logo to build false trust. Always verify the URL bar first.`},
  {id:"redirect", label:"Post-Submit Redirect",        detail:()=>"After capturing credentials, attackers redirect victims to the real site so nothing seems wrong."},
];

const FAKE_VICTIMS = [
  {user:"john.doe@gmail.com",    pass:"sunshine99"},
  {user:"sarah_k@outlook.com",   pass:"Football2024"},
  {user:"mike.t@yahoo.com",      pass:"qwerty123"},
  {user:"dilshan.f@gmail.com",   pass:"Dilshan#99"},
  {user:"nirosha.w@hotmail.com", pass:"Niro2024!"},
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Space+Mono:wght@400;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#ffffff;--bg2:#f5f5f0;--bg3:#eeede8;
    --outline:#111111;--outline2:#333333;
    --red:#e8002d;--red-fill:#fff0f2;
    --cyan:#007aff;--cyan-fill:#e8f2ff;
    --green:#00a832;--green-fill:#e8fff0;
    --amber:#e68000;--amber-fill:#fff8e0;
    --text:#111111;--muted:#555555;--muted2:#888888;
    --shadow:4px 4px 0px #111111;--shadow-sm:2px 2px 0px #111111;
    --mono:'Space Mono',monospace;--display:'Bangers',cursive;
    --border-w:2.5px;
  }
  body{background:var(--bg);color:var(--text);font-family:var(--mono);min-height:100vh;
    background-image:radial-gradient(circle,#ddd 1px,transparent 1px);background-size:22px 22px}
  .scanline{display:none}
  .app{max-width:1100px;margin:0 auto;padding:2rem 1.5rem}

  /* HEADER */
  .header{display:flex;align-items:center;gap:1rem;margin-bottom:2rem;
    border:var(--border-w) solid var(--outline);border-radius:12px;padding:1.2rem 1.5rem;
    background:#fff;box-shadow:var(--shadow);position:relative}
  .header-icon{font-size:2.2rem;filter:drop-shadow(2px 2px 0 #111)}
  .header-title{font-family:var(--display);font-size:2.4rem;letter-spacing:0.04em;line-height:1;color:var(--text);text-shadow:2px 2px 0 #ddd}
  .header-title span{color:var(--red)}
  .header-sub{font-size:10px;color:var(--muted);letter-spacing:0.08em;text-transform:uppercase;margin-top:4px;font-family:var(--mono)}
  .badge{margin-left:auto;background:var(--amber-fill);color:var(--amber);
    border:var(--border-w) solid var(--amber);border-radius:6px;padding:5px 12px;
    font-size:10px;letter-spacing:0.1em;font-weight:700;box-shadow:var(--shadow-sm)}

  /* STATS */
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:1.5rem}
  .stat{background:#fff;border:var(--border-w) solid var(--outline);border-radius:10px;
    padding:12px 14px;box-shadow:var(--shadow-sm);position:relative;overflow:hidden}
  .stat::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--outline)}
  .stat-val{font-size:1.6rem;font-weight:700;color:var(--cyan);font-family:var(--display);line-height:1;letter-spacing:0.03em}
  .stat-label{font-size:9px;color:var(--muted);margin-top:4px;letter-spacing:0.1em;text-transform:uppercase}

  /* CATEGORY */
  .cat-row{display:flex;gap:7px;margin-bottom:12px;flex-wrap:wrap}
  .cat-btn{background:#fff;border:var(--border-w) solid var(--outline2);border-radius:6px;
    padding:5px 14px;font-family:var(--mono);font-size:10px;color:var(--muted);
    cursor:pointer;letter-spacing:0.08em;text-transform:uppercase;
    transition:all 0.12s;box-shadow:var(--shadow-sm)}
  .cat-btn:hover{color:var(--text);border-color:var(--outline);transform:translate(-1px,-1px);box-shadow:3px 3px 0 #111}
  .cat-btn:active{transform:translate(2px,2px);box-shadow:none}
  .cat-btn.active{background:var(--cyan);color:#fff;border-color:var(--outline);box-shadow:var(--shadow-sm)}

  /* TEMPLATE GRID */
  .template-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(125px,1fr));gap:9px;margin-bottom:1.5rem}
  .tpl-btn{background:#fff;border:var(--border-w) solid var(--outline2);border-radius:8px;
    padding:10px 8px;text-align:center;cursor:pointer;
    transition:all 0.12s;font-family:var(--mono);box-shadow:var(--shadow-sm)}
  .tpl-btn:hover{border-color:var(--outline);transform:translate(-1px,-1px);box-shadow:3px 3px 0 #111}
  .tpl-btn:active{transform:translate(2px,2px);box-shadow:none}
  .tpl-btn.active{border-color:var(--red);background:var(--red-fill);box-shadow:3px 3px 0 var(--red)}
  .tpl-name{font-weight:700;font-size:10px;margin-top:4px;color:var(--text)}
  .tpl-cat{font-size:9px;color:var(--muted2);letter-spacing:0.07em;text-transform:uppercase;margin-top:2px}

  /* SIM GRID */
  .sim-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;margin-bottom:1.2rem}
  .ptitle{font-size:10px;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:10px;font-weight:700;
    display:flex;align-items:center;gap:6px;font-family:var(--mono)}
  .ptitle::before{content:'';width:8px;height:8px;border-radius:50%;border:2px solid currentColor;display:inline-block}
  .rt{color:var(--red)}
  .at{color:var(--amber)}

  /* FAKE BROWSER */
  .phish-frame-wrap{background:#fff;border:var(--border-w) solid var(--outline);border-radius:10px;overflow:hidden;position:relative;box-shadow:var(--shadow)}
  .bc{background:var(--bg3);padding:8px 12px;display:flex;align-items:center;gap:8px;border-bottom:var(--border-w) solid var(--outline)}
  .bd{display:flex;gap:5px}
  .bd span{width:11px;height:11px;border-radius:50%;border:2px solid var(--outline)}
  .bd span:nth-child(1){background:#ff5f57}
  .bd span:nth-child(2){background:#febc2e}
  .bd span:nth-child(3){background:#28c840}
  .bbar{flex:1;background:#fff;border:var(--border-w) solid var(--red);border-radius:5px;padding:4px 10px;font-size:10px;display:flex;align-items:center;gap:6px}
  .block{color:var(--red)}
  .burl{color:var(--red);font-size:10px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-decoration:underline wavy var(--red)}
  .pp{padding:1.5rem 1.25rem;min-height:270px;display:flex;flex-direction:column;align-items:center;justify-content:center}
  .ptag{font-size:10px;margin-bottom:1rem;text-align:center;color:var(--muted)}
  .ph{font-size:1rem;font-weight:700;margin-bottom:.15rem;text-align:center}
  .psh{font-size:11px;margin-bottom:1rem;text-align:center;color:var(--muted)}
  .pform{width:100%;max-width:260px}
  .pf{margin-bottom:10px}
  .pf label{font-size:10px;display:block;margin-bottom:3px;color:var(--muted)}
  .pf input{width:100%;padding:8px 10px;border-radius:5px;font-family:var(--mono);font-size:12px;outline:none;
    border:var(--border-w) solid var(--outline2);background:#fff;color:var(--text)}
  .pf input:focus{border-color:var(--cyan);box-shadow:0 0 0 2px rgba(0,122,255,0.15)}
  .pbtn{width:100%;padding:10px;border-radius:6px;border:var(--border-w) solid var(--outline);
    font-family:var(--display);font-weight:400;font-size:15px;letter-spacing:0.05em;
    cursor:pointer;margin-top:4px;transition:all 0.12s;color:#fff;box-shadow:var(--shadow-sm)}
  .pbtn:hover{transform:translate(-1px,-1px);box-shadow:3px 3px 0 #111}
  .pbtn:active{transform:translate(2px,2px);box-shadow:none}
  .pflinks{display:flex;gap:12px;margin-top:1.2rem;flex-wrap:wrap;justify-content:center}
  .pflinks span{font-size:9px;cursor:pointer;color:var(--muted)}
  .cover{position:absolute;inset:0;background:rgba(255,255,255,0.95);display:flex;flex-direction:column;
    align-items:center;justify-content:center;gap:12px;z-index:10;animation:fi 0.2s ease;
    border:var(--border-w) solid var(--outline)}
  @keyframes fi{from{opacity:0}to{opacity:1}}
  .ctit{font-family:var(--display);font-size:1.5rem;letter-spacing:0.04em;color:var(--green)}
  .ccred{font-size:12px;color:var(--text);text-align:center;line-height:1.9;
    background:var(--green-fill);border:var(--border-w) solid var(--green);border-radius:8px;padding:10px 16px}
  .ccred span{color:var(--green);font-weight:700}

  /* RED FLAGS */
  .flags-list{display:flex;flex-direction:column;gap:8px}
  .fi2{background:#fff;border:var(--border-w) solid var(--outline2);border-radius:8px;
    padding:10px 13px;display:flex;align-items:flex-start;gap:10px;
    transition:all 0.25s;box-shadow:var(--shadow-sm)}
  .fi2.af{border-color:var(--red);background:var(--red-fill);box-shadow:3px 3px 0 var(--red)}
  .fnum{min-width:24px;height:24px;border-radius:5px;background:var(--bg2);border:var(--border-w) solid var(--outline2);
    font-size:10px;font-weight:700;color:var(--muted);display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .fi2.af .fnum{background:var(--red);border-color:var(--outline);color:#fff}
  .flabel{font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted)}
  .fi2.af .flabel{color:var(--red)}
  .ftext{font-size:10.5px;color:var(--muted);line-height:1.6;margin-top:2px}
  .fi2.af .ftext{color:var(--text)}

  /* LOG */
  .log-wrap{background:#fff;border:var(--border-w) solid var(--outline);border-radius:10px;
    overflow:hidden;margin-bottom:1.2rem;box-shadow:var(--shadow)}
  .lh{padding:10px 1.25rem;border-bottom:var(--border-w) solid var(--outline);
    font-size:10px;color:var(--red);letter-spacing:0.15em;text-transform:uppercase;font-weight:700;
    display:flex;align-items:center;gap:8px;background:var(--red-fill)}
  .lh::before{content:'';width:8px;height:8px;background:var(--red);border-radius:50%;border:2px solid var(--outline)}
  .lcount{margin-left:auto;background:#fff;color:var(--red);border:var(--border-w) solid var(--red);
    border-radius:4px;padding:1px 8px;font-size:10px}
  .lb{max-height:180px;overflow-y:auto}
  .lb::-webkit-scrollbar{width:5px}
  .lb::-webkit-scrollbar-thumb{background:var(--outline2);border-radius:3px}
  .lr{display:grid;grid-template-columns:28px 1fr 1fr 110px 80px;gap:0;
    border-bottom:var(--border-w) solid var(--bg3);font-size:11px}
  .lrh{background:var(--bg2);font-size:9px;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;
    border-bottom:var(--border-w) solid var(--outline2)!important}
  .lc{padding:6px 12px;border-right:1px solid var(--bg3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .lc:last-child{border-right:none}
  @keyframes si{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
  .nr{animation:si 0.25s ease;background:var(--cyan-fill)}

  /* BUTTONS */
  .btn-row{display:flex;gap:9px;margin-top:10px;flex-wrap:wrap}
  .btn{padding:8px 16px;border-radius:6px;font-family:var(--mono);font-size:12px;font-weight:700;
    letter-spacing:0.04em;cursor:pointer;border:var(--border-w) solid var(--outline);
    transition:all 0.12s;box-shadow:var(--shadow-sm)}
  .btn:hover:not(:disabled){transform:translate(-1px,-1px);box-shadow:3px 3px 0 #111}
  .btn:active:not(:disabled){transform:translate(2px,2px);box-shadow:none}
  .bp{background:var(--cyan);color:#fff}
  .bp:disabled{background:var(--bg3);color:var(--muted2);cursor:not-allowed;box-shadow:none;transform:none;border-color:var(--outline2)}
  .bdn{background:#fff;color:var(--red);border-color:var(--red);box-shadow:2px 2px 0 var(--red)}
  .bdn:hover:not(:disabled){box-shadow:3px 3px 0 var(--red)!important}
  .bdn:disabled{opacity:0.3;cursor:not-allowed;box-shadow:none;transform:none}
  .bcl{background:var(--bg2);color:var(--muted)}
  .bcl:hover{background:var(--bg3);color:var(--text)}

  /* DISCLAIMER */
  .disclaimer{font-size:10px;color:var(--muted);
    border:var(--border-w) solid var(--outline2);border-radius:8px;
    padding:1rem;margin-top:.5rem;line-height:1.7;text-align:center;background:var(--amber-fill)}
  .disclaimer strong{color:var(--amber)}

  @media(max-width:720px){
    .sim-grid{grid-template-columns:1fr}
    .stats{grid-template-columns:repeat(2,1fr)}
    .lr{grid-template-columns:28px 1fr 1fr}
    .lc:nth-child(4),.lc:nth-child(5){display:none}
  }
`;

let victimIdx = 0;

export default function PhishingSimulator() {
  const [template,     setTemplate]     = useState("gmail");
  const [category,     setCategory]     = useState("All");
  const [email,        setEmail]        = useState("");
  const [pass,         setPass]         = useState("");
  const [captured,     setCaptured]     = useState(false);
  const [capturedCred, setCapturedCred] = useState(null);
  const [log,          setLog]          = useState([]);
  const [autoRunning,  setAutoRunning]  = useState(false);
  const [activeFlag,   setActiveFlag]   = useState(null);
  const autoRef    = useRef(false);
  const timerRef   = useRef(null);
  const logBodyRef = useRef(null);

  const t = TEMPLATES[template];

  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = css;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  useEffect(() => {
    setEmail(""); setPass(""); setCaptured(false); setCapturedCred(null);
  }, [template]);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => { setActiveFlag(RED_FLAGS[i % RED_FLAGS.length].id); i++; }, 2600);
    return () => clearInterval(iv);
  }, []);

  const filteredKeys = Object.keys(TEMPLATES).filter(k =>
    category === "All" || TEMPLATES[k].category === category
  );

  function capture(u, p) {
    const entry = { id: log.length + 1, email:u, pass:p, site:t.name, time:new Date().toLocaleTimeString() };
    setCapturedCred(entry);
    setCaptured(true);
    setLog(prev => [entry, ...prev]);
    setTimeout(() => { setCaptured(false); setEmail(""); setPass(""); }, 2200);
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();
    if (email && pass) capture(email, pass);
  }

  function startAuto() {
    if (autoRunning) return;
    autoRef.current = true;
    setAutoRunning(true);
    function next() {
      if (!autoRef.current) return;
      const v = FAKE_VICTIMS[victimIdx % FAKE_VICTIMS.length]; victimIdx++;
      setEmail(v.user);
      setTimeout(() => {
        if (!autoRef.current) return;
        setPass(v.pass);
        setTimeout(() => {
          if (!autoRef.current) return;
          capture(v.user, v.pass);
          timerRef.current = setTimeout(next, 3200);
        }, 700);
      }, 600);
    }
    next();
  }

  function stopAuto() {
    autoRef.current = false;
    clearTimeout(timerRef.current);
    setAutoRunning(false);
    setEmail(""); setPass(""); setCaptured(false);
  }

  function clearAll() {
    stopAuto(); setLog([]);
    setEmail(""); setPass(""); setCaptured(false); setCapturedCred(null);
  }

  const pageBg  = "#fff";
  const pgTxt   = t.brandText || "#111";
  const fBg     = "#fff";
  const fTxt    = "#111";
  const fBorder = "#bbb";
  const sub     = "#888";

  return (
    <>
      <div className="scanline" />
      <div className="app">

        <div className="header">
          <div className="header-icon">🎣</div>
          <div>
            <div className="header-title">Phishing <span>Simulator</span></div>
            <div className="header-sub">Local Only · Educational Demo · Credential Harvesting Simulation</div>
          </div>
          <div className="badge">⚠ LOCAL ONLY</div>
        </div>

        <div className="stats">
          <div className="stat"><div className="stat-val" style={{color:"var(--red)"}}>{log.length}</div><div className="stat-label">CREDENTIALS CAPTURED</div></div>
          <div className="stat"><div className="stat-val">{Object.keys(TEMPLATES).length}</div><div className="stat-label">TEMPLATES</div></div>
          <div className="stat"><div className="stat-val" style={{color:autoRunning?"var(--green)":"var(--muted)"}}>{autoRunning?"LIVE":"IDLE"}</div><div className="stat-label">AUTO DEMO</div></div>
          <div className="stat"><div className="stat-val" style={{color:"var(--amber)"}}>{RED_FLAGS.length}</div><div className="stat-label">RED FLAGS</div></div>
        </div>

        <div className="cat-row">
          {CATEGORIES.map(c => (
            <button key={c} className={"cat-btn"+(category===c?" active":"")} onClick={()=>setCategory(c)}>{c}</button>
          ))}
        </div>

        <div className="template-grid">
          {filteredKeys.map(key => {
            const tpl = TEMPLATES[key];
            return (
              <button key={key} className={"tpl-btn"+(template===key?" active":"")} onClick={()=>setTemplate(key)}>
                <div style={{fontSize:"1.2rem",marginBottom:"4px"}}>{tpl.icon}</div>
                <div className="tpl-name" style={{color:template===key?"var(--red)":"var(--text)"}}>{tpl.name}</div>
                <div className="tpl-cat">{tpl.category}</div>
              </button>
            );
          })}
        </div>

        <div className="sim-grid">
          <div>
            <div className="ptitle rt">Fake Login Page — Victim View</div>
            <div className="phish-frame-wrap">
              <div className="bc">
                <div className="bd"><span/><span/><span/></div>
                <div className="bbar">
                  <span className="block">🔓</span>
                  <span className="burl">{t.suspiciousDomain}</span>
                </div>
              </div>

              <div className="pp" style={{background:pageBg,color:pgTxt}}>
                {t.logoRender()}
                {t.tagline && <div className="ptag" style={{color:sub}}>{t.tagline}</div>}
                {t.heading && <div className="ph" style={{color:pgTxt}}>{t.heading}</div>}
                {t.subheading && <div className="psh" style={{color:sub}}>{t.subheading}</div>}
                <div className="pform">
                  <div className="pf">
                    <label style={{color:sub}}>{t.userLabel}</label>
                    <input type="text" value={email} onChange={e=>setEmail(e.target.value)}
                      placeholder={t.userPlaceholder} style={{background:fBg,color:fTxt,borderColor:fBorder}}/>
                  </div>
                  <div className="pf">
                    <label style={{color:sub}}>{t.passLabel}</label>
                    <input type="password" value={pass} onChange={e=>setPass(e.target.value)}
                      placeholder="Enter your password" style={{background:fBg,color:fTxt,borderColor:fBorder}}/>
                  </div>
                  <button className="pbtn" style={{background:t.brandColor}} onClick={handleSubmit}>{t.btnText}</button>
                </div>
                <div className="pflinks">
                  {t.footerLinks.map(l=><span key={l} style={{color:sub}}>{l}</span>)}
                </div>
              </div>

              {captured && capturedCred && (
                <div className="cover">
                  <div style={{fontSize:"2rem"}}>🔑</div>
                  <div className="ctit">Credentials Captured!</div>
                  <div className="ccred">
                    User: <span>{capturedCred.email}</span><br/>
                    Pass: <span>{capturedCred.pass}</span><br/>
                    <span style={{color:"var(--muted)",fontSize:"10px"}}>Redirecting to real {t.name}...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="btn-row">
              <button className="btn bp" onClick={startAuto} disabled={autoRunning}>▶ Auto Demo</button>
              <button className="btn bdn" onClick={stopAuto} disabled={!autoRunning}>■ Stop</button>
              <button className="btn bcl" onClick={clearAll}>✕ Clear</button>
            </div>
          </div>

          <div>
            <div className="ptitle at">Red Flags — What to Look For</div>
            <div className="flags-list">
              {RED_FLAGS.map((f,i) => (
                <div key={f.id} className={"fi2"+(activeFlag===f.id?" af":"")}>
                  <div className="fnum">{String(i+1).padStart(2,"0")}</div>
                  <div>
                    <div className="flabel">{f.label}</div>
                    <div className="ftext">{f.detail(t)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="log-wrap">
          <div className="lh">Captured Credentials Log<span className="lcount">{log.length} captured</span></div>
          {log.length === 0 ? (
            <div style={{padding:"1.5rem",textAlign:"center",color:"var(--muted)",fontSize:"12px"}}>
              No credentials captured yet — try Auto Demo or fill the fake form above.
            </div>
          ) : (
            <div className="lb" ref={logBodyRef}>
              <div className="lr lrh">
                <div className="lc">#</div><div className="lc">Email / Username</div>
                <div className="lc">Password</div><div className="lc">Site</div><div className="lc">Time</div>
              </div>
              {log.map((e2,i) => (
                <div className={"lr"+(i===0?" nr":"")} key={e2.id}>
                  <div className="lc" style={{color:"var(--muted2)"}}>{e2.id}</div>
                  <div className="lc" style={{color:"var(--cyan)"}}>{e2.email}</div>
                  <div className="lc" style={{color:"var(--amber)"}}>{e2.pass}</div>
                  <div className="lc" style={{color:"var(--muted)"}}>{e2.site}</div>
                  <div className="lc" style={{color:"var(--muted2)"}}>{e2.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="disclaimer">
          <strong>⚠ EDUCATIONAL USE ONLY.</strong> This simulator runs entirely in the browser —
          no credentials are transmitted or stored anywhere outside this page.
          Built to demonstrate phishing mechanics and social engineering awareness for cybersecurity education.
        </div>
      </div>
    </>
  );
}
