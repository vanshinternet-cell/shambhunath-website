import React, { useState, useEffect, useRef, useCallback } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const INSIGHTS = [
  { id:1, num:"01", title:"The GTM Playbook Nobody Talks About", tag:"GTM Strategy", readTime:"7 min", date:"May 2026", featured:true, excerpt:"Most go-to-market strategies fail in execution, not ideation. Here is the framework that separates the 10% that win from the rest." },
  { id:2, num:"02", title:"AI as a Competitive Intelligence Layer", tag:"AI & Automation", readTime:"9 min", date:"Apr 2026", featured:true, excerpt:"How leading enterprises are deploying AI not just for efficiency, but as a structural sensing mechanism that redefines competitive advantage." },
  { id:3, num:"03", title:"Why Market Research is Broken", tag:"Market Research", readTime:"6 min", date:"Apr 2026", featured:false, excerpt:"The fundamental assumptions of market research were built for a slower world. After 14 years doing this, here is my post-mortem." },
  { id:4, num:"04", title:"Storyboarding for Board-Level Decisions", tag:"Strategic Thinking", readTime:"5 min", date:"Mar 2026", featured:false, excerpt:"The most powerful board deck is a story, not a report. A framework for executive narrative that gets decisions made faster." },
  { id:5, num:"05", title:"n8n + GenAI: The Research Stack That Changed Everything", tag:"AI & Automation", readTime:"8 min", date:"Mar 2026", featured:false, excerpt:"How I embedded agentic automation into research workflows and cut turnaround time by 30 to 40 percent without losing depth." },
  { id:6, num:"06", title:"The Future of Market Intelligence: 2025 to 2030", tag:"Market Research", readTime:"11 min", date:"Feb 2026", featured:false, excerpt:"A forward-looking analysis of the macro forces reshaping how organisations gather, interpret, and act on market signals." },
];

const VIDEOS = [
  { id:1, title:"How I Build GTM Strategies From Scratch", duration:"18:24", category:"GTM", youtubeId:"dQw4w9WgXcQ", desc:"A walkthrough of my end-to-end GTM framework from market sizing to channel selection to launch sequencing." },
  { id:2, title:"AI-Powered Market Research: My Actual Workflow", duration:"22:11", category:"AI", youtubeId:"dQw4w9WgXcQ", desc:"Live demo: how I use n8n and GenAI to run competitive intelligence workflows that used to take weeks." },
  { id:3, title:"The Competitive Intelligence Masterclass", duration:"34:05", category:"CI", youtubeId:"dQw4w9WgXcQ", desc:"Everything I know about building a systematic CI capability inside an organisation, in one session." },
  { id:4, title:"Storyboarding for Strategy: The Visual Thinking Method", duration:"15:47", category:"Strategy", youtubeId:"dQw4w9WgXcQ", desc:"Why the best strategies are told, not reported, and how to build the narrative structure that moves executives." },
];

const INFOGRAPHICS = [
  { id:1, title:"The GTM Strategy Canvas", category:"GTM", desc:"A one-page visual framework for mapping go-to-market decisions across four axes: market, product, channel, and narrative.", accent:"#8B6420" },
  { id:2, title:"AI Adoption Maturity Model", category:"AI", desc:"Five stages of enterprise AI adoption, from isolated pilots to fully autonomous decision intelligence.", accent:"#2A5F8F" },
  { id:3, title:"Competitive Intelligence Architecture", category:"CI", desc:"The structural blueprint for a CI function: signal sources, processing layers, synthesis methods, and activation paths.", accent:"#3A7A4A" },
  { id:4, title:"Market Sizing: The Layered Funnel", category:"Research", desc:"TAM to SAM to SOM, done right. A visual guide to defensible market sizing that holds up in a boardroom.", accent:"#8F2A5F" },
  { id:5, title:"The Strategy Storyboard Framework", category:"Strategy", desc:"Nine panels. One narrative arc. How to compress months of strategic thinking into a single visual story.", accent:"#8F5A2A" },
  { id:6, title:"GenAI Research Workflow", category:"AI", desc:"The exact n8n and LLM pipeline I use to run research synthesis, QC, and knowledge capture at scale.", accent:"#2A7A7A" },
];

const CASE_STUDIES = [
  { id:1, num:"01", sector:"Consumer Health", title:"GTM Relaunch for a D2C Health Brand", impact:"3.2x Revenue Growth", phases:["Market Audit","Positioning Redesign","Channel Strategy","Launch Execution"], body:"The brand had the product right but the narrative wrong. We rearchitected the entire go-to-market around a single customer truth and built the channel mix to match. Within 18 months, revenue tripled." },
  { id:2, num:"02", sector:"Enterprise Technology", title:"AI Adoption Roadmap for a Mid-Market Firm", impact:"40% Ops Cost Reduction", phases:["AI Readiness Assessment","Use-Case Prioritisation","Pilot Design","Scale Framework"], body:"Most AI transformations fail because they start with technology rather than pain. We reversed the process: mapped critical workflows first, identified the 20% with 80% of the value, then built a sequenced adoption roadmap." },
  { id:3, num:"03", sector:"FMCG", title:"Competitive Intelligence System for a Category Leader", impact:"18-Month Strategic Edge", phases:["CI Architecture","Signal Library","Analyst Training","Executive Dashboard"], body:"The client was reacting to competitor moves rather than anticipating them. We built a systematic CI function from scratch: signal sources, synthesis cadence, and a live dashboard that feeds strategy review cycles." },
];

const MARQUEE_ITEMS = ["Business Strategy","Market Research","Competitive Intelligence","GTM Advisory","AI & GenAI","Agentic Automation","Storyboarding","Demand Forecasting","Strategic Planning","Operating Model Design","Growth Strategy","Market Entry"];

const PHILOSOPHY = [
  { num:".01", title:"Signal over noise", body:"In a world drowning in data, the job is not to gather more. It is to know what to ignore. Every framework I build starts with ruthless signal selection." },
  { num:".02", title:"Every insight is a decision seed", body:"Intelligence without a decision is just information. I design every research output backwards from the executive action it needs to enable." },
  { num:".03", title:"The clearest story wins", body:"Complexity is easy. Clarity is the craft. The organisations that move fastest compress a month of strategic thinking into one coherent narrative." },
];

const BELIEFS = [
  { num:".01", title:"Markets are conversations", body:"Every market signal is someone trying to tell you something. The strategist's job is to listen better than the competition, and to hear what is not being said yet." },
  { num:".02", title:"AI amplifies, not replaces", body:"The best use of AI in strategy is not automation — it is augmentation. AI expands what a sharp mind can see. The judgment about what matters still belongs to the human." },
  { num:".03", title:"Ideas need architecture", body:"A brilliant insight trapped in a bad narrative never moves anyone. I believe the structure of how you tell a story is as important as the story itself." },
  { num:".04", title:"Depth is a competitive advantage", body:"In an age of surface-level takes and speed-optimised content, the willingness to go deep — to actually understand a market, a problem, a system — is increasingly rare and increasingly valuable." },
];

const STATS = [
  { value:14, suffix:"+", label:"Years of deep practice" },
  { value:200, suffix:"+", label:"Strategic engagements" },
  { value:12, suffix:"+", label:"Industries explored" },
  { value:40, suffix:"%", label:"Faster insight via AI" },
];

// ── HOOKS ─────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCounter(target, duration, start) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, start]);
  return count;
}

// ── ATOMS ─────────────────────────────────────────────────────────────────────

function EL({ children }) {
  return (
    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--ink-muted)", marginBottom:18 }}>
      {children}
    </div>
  );
}

function BH({ children, style }) {
  return (
    <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4.5vw,56px)", fontWeight:700, color:"var(--ink)", lineHeight:1.05, letterSpacing:"-0.03em", ...style }}>
      {children}
    </h2>
  );
}

function HR() {
  return <div style={{ width:"100%", height:1, background:"var(--border)" }} />;
}

// ── MARQUEE ───────────────────────────────────────────────────────────────────

function Marquee({ dir = 1, speed = 28 }) {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{ overflow:"hidden", whiteSpace:"nowrap", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"13px 0", background:"var(--cream-dark)" }}>
      <div style={{ display:"inline-block", animation:`${dir > 0 ? "mqL" : "mqR"} ${speed}s linear infinite` }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ display:"inline-block", marginRight:52, fontSize:12, fontFamily:"'DM Mono',monospace", letterSpacing:"0.09em", textTransform:"uppercase", color:"var(--ink-muted)" }}>
            <span style={{ color:"var(--gold)", marginRight:14 }}>◆</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label:"Home",          page:"Home" },
  { label:"The Mind Behind", page:"About" },
  { label:"Key Takeaways",   page:"Insights" },
  { label:"Thought in Action", page:"Videos" },
  { label:"Abstracts",       page:"Infographics" },
  { label:"Case Studies",    page:"Case Studies" },
  { label:"Contact",         page:"Contact" },
];

function Nav({ active, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <div style={{ background:"var(--ink)", color:"var(--cream)", textAlign:"center", padding:"9px 20px", fontSize:11, fontFamily:"'DM Mono',monospace", letterSpacing:"0.08em", position:"fixed", top:0, left:0, right:0, zIndex:1001 }}>
        Open to strategic conversations —{" "}
        <span style={{ color:"var(--gold)", cursor:"pointer", textDecoration:"underline", textUnderlineOffset:2 }} onClick={() => setPage("Contact")}>
          Let's connect →
        </span>
      </div>
      <nav style={{ position:"fixed", top:34, left:0, right:0, zIndex:1000, padding:scrolled ? "10px 60px" : "15px 60px", background:scrolled ? "var(--cream-glass)" : "transparent", backdropFilter:scrolled ? "blur(20px)" : "none", borderBottom:scrolled ? "1px solid var(--border)" : "none", transition:"all 0.4s ease", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={() => setPage("Home")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:"var(--ink)", letterSpacing:"-0.02em" }}>
          Shambhunath Jhaa<span style={{ color:"var(--gold)" }}>.</span>
        </button>
        <div className="dnav">
          {NAV_LINKS.map(l => (
            <button key={l.page} onClick={() => setPage(l.page)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:11, fontFamily:"'DM Mono',monospace", letterSpacing:"0.06em", textTransform:"uppercase", color:active === l.page ? "var(--ink)" : "var(--ink-muted)", borderBottom:active === l.page ? "1px solid var(--ink)" : "1px solid transparent", paddingBottom:2, transition:"color 0.2s", marginLeft:24 }}>
              {l.label}
            </button>
          ))}
        </div>
        <button className="mbtn" onClick={() => setOpen(!open)} style={{ background:"none", border:"1px solid var(--border)", cursor:"pointer", color:"var(--ink)", padding:"6px 12px", fontSize:15, borderRadius:2 }}>
          {open ? "✕" : "☰"}
        </button>
      </nav>
      {open && (
        <div style={{ position:"fixed", inset:0, zIndex:999, background:"var(--cream)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28 }}>
          <button onClick={() => setOpen(false)} style={{ position:"absolute", top:60, right:28, background:"none", border:"none", cursor:"pointer", fontSize:24, color:"var(--ink)" }}>✕</button>
          {NAV_LINKS.map(l => (
            <button key={l.page} onClick={() => { setPage(l.page); setOpen(false); }} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:active === l.page ? "var(--gold)" : "var(--ink)" }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────

function Hero({ setPage }) {
  const words = ["Market Intelligence.","GTM Architecture.","AI Transformation.","Strategic Clarity.","Competitive Edge."];
  const [idx, setIdx] = useState(0);
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setVis(false);
      setTimeout(() => { setIdx(p => (p + 1) % words.length); setVis(true); }, 350);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"160px 80px 80px", position:"relative", overflow:"hidden", background:"var(--cream)" }}>
      <div style={{ position:"absolute", top:"8%", right:"-3%", fontFamily:"'Playfair Display',serif", fontSize:"clamp(180px,26vw,420px)", fontWeight:700, color:"var(--cream-dark)", lineHeight:1, userSelect:"none", pointerEvents:"none", letterSpacing:"-0.06em" }}>14</div>
      <div style={{ marginBottom:32 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:10, fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--ink-muted)", marginBottom:16 }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#4A8B5C", display:"inline-block", animation:"blink 2s infinite" }} />
          Pune, India · Strategy · AI · Market Intelligence
        </div>
        <div style={{ width:52, height:2, background:"var(--gold)" }} />
      </div>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(52px,8.5vw,118px)", fontWeight:700, lineHeight:0.93, letterSpacing:"-0.04em", color:"var(--ink)", marginBottom:36, maxWidth:900 }}>
        Shambhu<span style={{ color:"var(--gold)", fontStyle:"italic" }}>nath</span><br />Jhaa
      </h1>
      <div style={{ height:46, overflow:"hidden", marginBottom:48 }}>
        <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"clamp(16px,2.2vw,26px)", color:"var(--ink-muted)", opacity:vis ? 1 : 0, transform:vis ? "translateY(0)" : "translateY(10px)", transition:"opacity 0.35s, transform 0.35s" }}>
          14 years of thinking about{" "}
          <span style={{ color:"var(--ink)", fontStyle:"normal", fontWeight:700 }}>{words[idx]}</span>
        </p>
      </div>
      <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
        <button onClick={() => setPage("Insights")} className="btn-dark">Key Takeaways</button>
        <button onClick={() => setPage("About")} className="btn-light">The Mind Behind →</button>
      </div>
      <div style={{ position:"absolute", bottom:44, right:80, display:"flex", flexDirection:"column", alignItems:"center", gap:8, opacity:0.35 }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--ink-muted)", writingMode:"vertical-rl" }}>Scroll</span>
        <div style={{ width:1, height:56, background:"var(--ink)", animation:"spulse 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

// ── STAT ITEM ─────────────────────────────────────────────────────────────────

function StatItem({ value, suffix, label, start, last }) {
  const n = useCounter(value, 1800, start);
  return (
    <div style={{ padding:"20px 40px", borderRight:last ? "none" : "1px solid rgba(255,255,255,0.1)", textAlign:"center" }}>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(40px,5vw,68px)", fontWeight:700, color:"var(--gold)", lineHeight:1, marginBottom:10 }}>{n}{suffix}</div>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)" }}>{label}</div>
    </div>
  );
}

function HomeStats() {
  const [ref, inView] = useInView(0.2);
  return (
    <section style={{ padding:"80px 80px", background:"var(--ink)" }}>
      <div ref={ref} style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)" }} className="gstats">
        {STATS.map((s, i) => <StatItem key={s.label} {...s} start={inView} last={i === STATS.length - 1} />)}
      </div>
    </section>
  );
}

// ── HOME SECTIONS ─────────────────────────────────────────────────────────────

function HomeIntro({ setPage }) {
  const [ref, inView] = useInView();
  return (
    <section style={{ padding:"100px 80px", background:"var(--cream)" }}>
      <div style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:100, alignItems:"center" }} className="g-intro">
        <div ref={ref} style={{ opacity:inView ? 1 : 0, transform:inView ? "translateX(0)" : "translateX(-20px)", transition:"all 0.8s ease" }}>
          <EL>The mind behind</EL>
          <BH>I am<br />Shambhunath Jhaa</BH>
          <div style={{ width:48, height:2, background:"var(--gold)", margin:"24px 0" }} />
          <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:17, color:"var(--ink-muted)", lineHeight:1.65 }}>
            A strategic thinker at the intersection of market intelligence, business growth, and AI-augmented decision-making.
          </p>
        </div>
        <div style={{ opacity:inView ? 1 : 0, transform:inView ? "translateX(0)" : "translateX(20px)", transition:"all 0.8s ease 0.15s" }}>
          <p style={{ fontFamily:"'Georgia',serif", fontSize:16, lineHeight:1.95, color:"var(--ink)", marginBottom:22 }}>
            I have spent 14 years inside the hardest questions businesses face: where to grow, how to compete, what the market is actually saying, and how to turn that into a decision that sticks. <strong>My conviction is simple: the best strategy is always the clearest story.</strong>
          </p>
          <p style={{ fontFamily:"'Georgia',serif", fontSize:16, lineHeight:1.95, color:"var(--ink-muted)", marginBottom:32 }}>
            This space is where I share what I have learned — frameworks built from real problems, perspectives shaped by years of market immersion, and an ongoing exploration of how AI is rewriting the rules of strategic thinking.
          </p>
          <button onClick={() => setPage("About")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.08em", color:"var(--ink)", textDecoration:"underline", textUnderlineOffset:4, padding:0 }}>
            Read the full story →
          </button>
        </div>
      </div>
    </section>
  );
}

function HomePhilosophy() {
  const [ref, inView] = useInView();
  return (
    <section style={{ padding:"100px 80px", background:"var(--cream-dark)" }}>
      <div style={{ maxWidth:1160, margin:"0 auto" }}>
        <div style={{ marginBottom:60 }}><EL>How I think</EL><BH>The principles I work by</BH></div>
        <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderLeft:"1px solid var(--border)" }} className="g3">
          {PHILOSOPHY.map((p, i) => (
            <div key={p.num} style={{ padding:"44px", borderRight:"1px solid var(--border)", opacity:inView ? 1 : 0, transform:inView ? "translateY(0)" : "translateY(24px)", transition:`all 0.6s ease ${i * 0.12}s` }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:13, color:"var(--gold)", marginBottom:24 }}>{p.num}</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:21, fontWeight:700, color:"var(--ink)", marginBottom:14, lineHeight:1.2 }}>{p.title}</h3>
              <p style={{ fontFamily:"'Georgia',serif", fontSize:14, lineHeight:1.85, color:"var(--ink-muted)" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeFeaturedInsights({ setPage }) {
  const [ref, inView] = useInView();
  const featured = INSIGHTS.filter(i => i.featured);
  return (
    <section style={{ padding:"100px 80px", background:"var(--cream)" }}>
      <div style={{ maxWidth:1160, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:60, flexWrap:"wrap", gap:20 }}>
          <div ref={ref} style={{ opacity:inView ? 1 : 0, transition:"opacity 0.6s" }}>
            <EL>Key takeaways</EL>
            <BH>Featured thinking</BH>
          </div>
          <button onClick={() => setPage("Insights")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.08em", color:"var(--ink-muted)", textDecoration:"underline", textUnderlineOffset:3 }}>
            All takeaways →
          </button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", border:"1px solid var(--border)" }} className="g2">
          {featured.map((ins, i) => (
            <div key={ins.id} onClick={() => setPage("Insights")} className="hbg" style={{ padding:"52px 44px", borderRight:i === 0 ? "1px solid var(--border)" : "none", cursor:"pointer", transition:"background 0.2s" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22 }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.08em", color:"var(--gold)" }}>{ins.num}</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"var(--ink-muted)" }}>{ins.readTime} read · {ins.date}</span>
              </div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:"var(--ink)", lineHeight:1.2, marginBottom:14, letterSpacing:"-0.02em" }}>{ins.title}</h3>
              <p style={{ fontFamily:"'Georgia',serif", fontSize:14, lineHeight:1.8, color:"var(--ink-muted)", marginBottom:24 }}>{ins.excerpt}</p>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.06em", color:"var(--ink)", textDecoration:"underline", textUnderlineOffset:3 }}>Read →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeHub({ setPage }) {
  const [ref, inView] = useInView();
  const items = [
    { label:"Thought in Action", num:"04", desc:"Ideas spoken out loud. Frameworks demonstrated. Long-form thinking in video form.", page:"Videos", tag:"Watch & listen" },
    { label:"Abstracts", num:"06", desc:"Strategic models and mental frameworks distilled into one image.", page:"Infographics", tag:"Visual thinking" },
    { label:"Case Studies", num:"03", desc:"Real problems. Real thinking. The outcomes that followed.", page:"Case Studies", tag:"Work & outcomes" },
  ];
  return (
    <section style={{ padding:"100px 80px", background:"var(--cream-dark)" }}>
      <div style={{ maxWidth:1160, margin:"0 auto" }}>
        <div style={{ marginBottom:60 }}><EL>Explore</EL><BH>More ways to engage</BH></div>
        <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }} className="g3">
          {items.map((item, i) => (
            <div key={item.label} onClick={() => setPage(item.page)} className="clift" style={{ background:"var(--cream)", border:"1px solid var(--border)", padding:"40px 32px", cursor:"pointer", transition:"all 0.3s ease", opacity:inView ? 1 : 0, transform:inView ? "translateY(0)" : "translateY(24px)", transitionDelay:`${i * 0.1}s` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28 }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.09em", textTransform:"uppercase", color:"var(--gold)", background:"rgba(139,100,32,0.1)", padding:"4px 10px" }}>{item.tag}</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:22, color:"var(--border)", fontWeight:700 }}>{item.num}</span>
              </div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:"var(--ink)", marginBottom:10, lineHeight:1.1 }}>{item.label}</h3>
              <p style={{ fontFamily:"'Georgia',serif", fontSize:13, lineHeight:1.8, color:"var(--ink-muted)", marginBottom:24 }}>{item.desc}</p>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.06em", color:"var(--ink)", textDecoration:"underline", textUnderlineOffset:2 }}>Explore →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section style={{ padding:"120px 80px", background:"var(--cream)", borderTop:"1px solid var(--border)" }}>
      <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center" }}>
        <EL>Stay in the loop</EL>
        <BH style={{ marginBottom:18 }}>Join the thinking</BH>
        <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:18, color:"var(--ink-muted)", lineHeight:1.7, marginBottom:44 }}>
          Strategic perspectives, frameworks, and market intelligence — at a pace that lets you actually think.
        </p>
        {done ? (
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:13, color:"var(--gold)", letterSpacing:"0.05em" }}>You are in. Expect thoughtful, infrequent mail.</p>
        ) : (
          <div style={{ display:"flex", maxWidth:420, margin:"0 auto", border:"1px solid var(--border)" }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ flex:1, padding:"13px 18px", border:"none", background:"transparent", fontFamily:"'Georgia',serif", fontSize:14, color:"var(--ink)", outline:"none" }} />
            <button onClick={() => { if (email) setDone(true); }} style={{ background:"var(--ink)", color:"var(--cream)", border:"none", padding:"13px 22px", fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.08em", cursor:"pointer" }}>Subscribe →</button>
          </div>
        )}
      </div>
    </section>
  );
}

function HomePage({ setPage }) {
  return (
    <div>
      <Hero setPage={setPage} />
      <Marquee />
      <HomeIntro setPage={setPage} />
      <HomePhilosophy />
      <Marquee dir={-1} speed={34} />
      <HomeFeaturedInsights setPage={setPage} />
      <HomeStats />
      <HomeHub setPage={setPage} />
      <HomeNewsletter />
    </div>
  );
}

// ── THE MIND BEHIND ───────────────────────────────────────────────────────────

function AboutPage() {
  const [ref, inView] = useInView(0.1);
  return (
    <div style={{ paddingTop:68, background:"var(--cream)" }}>

      {/* Opening statement — thought leader framing */}
      <section style={{ padding:"100px 80px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <EL>The mind behind</EL>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(40px,7vw,100px)", fontWeight:700, lineHeight:0.93, letterSpacing:"-0.04em", color:"var(--ink)", marginBottom:52 }}>
            I think, therefore<br /><em style={{ color:"var(--gold)" }}>I strategise.</em>
          </h1>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72 }} className="g2">
            <p style={{ fontFamily:"'Georgia',serif", fontSize:17, lineHeight:1.95, color:"var(--ink)" }}>
              I am Shambhunath Jhaa — a strategist, researcher, and thinker who has spent 14 years at the intersection of market intelligence, business growth, and AI-augmented decision-making. I do not have a simple job title. I have a point of view.
            </p>
            <p style={{ fontFamily:"'Georgia',serif", fontSize:17, lineHeight:1.95, color:"var(--ink-muted)" }}>
              My work has always been about one thing: helping organisations see more clearly and decide more decisively. Whether that means sizing a market, mapping competitive dynamics, designing a go-to-market architecture, or building the AI systems that make all of the above faster and sharper.
            </p>
          </div>
        </div>
      </section>

      {/* Long-form narrative — ideas, not biography */}
      <section style={{ padding:"80px 80px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <EL>My story</EL>
          <div style={{ display:"flex", flexDirection:"column", gap:24, fontFamily:"'Georgia',serif", fontSize:17, lineHeight:1.95, color:"var(--ink)" }}>
            <p>
              I started my career as someone who loved asking questions that others found inconvenient. What does this market actually want? Why is this strategy failing despite the data? What is the competitor doing that nobody is talking about? Those questions led me deep into the craft of research — not data collection, but the kind of structured inquiry that produces genuine insight.
            </p>
            <p style={{ color:"var(--ink-muted)" }}>
              Over the years, I developed a particular obsession: the gap between what organisations know and what they decide. Most firms are not suffering from a lack of information. They are suffering from a lack of clarity. Too many signals. Too few frameworks. Too much noise dressed up as analysis.
            </p>
            <p>
              That obsession became my practice. I build frameworks that cut through. I design research systems that generate signal instead of volume. I write and speak about the structural forces reshaping markets — not to predict the future, but to make the present more navigable.
            </p>
            <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:20, color:"var(--gold)", borderLeft:"3px solid var(--gold)", paddingLeft:24, marginTop:8 }}>
              "The strategist's most important skill is not analysis. It is knowing which question to ask before the analysis begins."
            </p>
            <p style={{ color:"var(--ink-muted)" }}>
              More recently, AI has become central to how I think and work. Not as a shortcut, but as a genuine force multiplier for strategic thinking. I have spent years building agentic research workflows, exploring how large language models can augment competitive intelligence, and thinking hard about where human judgment remains irreplaceable. That exploration is ongoing — and I share it openly here.
            </p>
          </div>
        </div>
      </section>

      {/* What I believe */}
      <section style={{ padding:"80px 80px", background:"var(--cream-dark)", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <EL>What I believe</EL>
          <BH style={{ marginBottom:56 }}>The ideas that shape my thinking</BH>
          <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:0, border:"1px solid var(--border)" }} className="g2">
            {BELIEFS.map((b, i) => (
              <div key={b.num} style={{ padding:"44px", borderRight:i % 2 === 0 ? "1px solid var(--border)" : "none", borderBottom:i < 2 ? "1px solid var(--border)" : "none", opacity:inView ? 1 : 0, transform:inView ? "translateY(0)" : "translateY(20px)", transition:`all 0.6s ease ${i * 0.1}s` }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"var(--gold)", marginBottom:20 }}>{b.num}</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"var(--ink)", marginBottom:12, lineHeight:1.2 }}>{b.title}</h3>
                <p style={{ fontFamily:"'Georgia',serif", fontSize:14, lineHeight:1.85, color:"var(--ink-muted)" }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains — not a skills bar, but an intellectual map */}
      <section style={{ padding:"80px 80px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <EL>Domains of thought</EL>
          <BH style={{ marginBottom:52 }}>Where my thinking lives</BH>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }} className="g3">
            {[
              { area:"Market Intelligence", desc:"Understanding markets as living systems — not static snapshots. Signal identification, demand forecasting, and structural analysis." },
              { area:"GTM Architecture", desc:"The discipline of designing how ideas reach markets. Channel thinking, positioning strategy, and launch sequencing." },
              { area:"Competitive Intelligence", desc:"Systematic frameworks for understanding competitive dynamics — who is moving, why, and what it means for your next decision." },
              { area:"AI & Automation", desc:"How large language models and agentic workflows are reshaping the research and strategy function. Practical integration, not hype." },
              { area:"Strategic Storyboarding", desc:"The craft of narrative in strategy. How the structure of a story determines whether a decision gets made." },
              { area:"Decision Intelligence", desc:"Bridging the gap between analysis and action. Designing the conditions under which insight becomes commitment." },
            ].map((d, i) => (
              <div key={d.area} style={{ padding:"32px 28px", border:"1px solid var(--border)", background:"var(--cream-dark)" }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold)", marginBottom:14 }}>0{i+1}</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, color:"var(--ink)", marginBottom:10, lineHeight:1.2 }}>{d.area}</h3>
                <p style={{ fontFamily:"'Georgia',serif", fontSize:13, lineHeight:1.75, color:"var(--ink-muted)" }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications — brief, not prominent */}
      <section style={{ padding:"48px 80px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <EL>Formal credentials</EL>
          <div style={{ display:"flex", flexWrap:"wrap", gap:0 }}>
            {[
              "McKinsey Forward Program",
              "Google Cloud – Generative AI Fundamentals",
              "B.Sc. Bioinformatics · PGDHRD (MBA Equivalent), SP University",
              "LinkedIn Learning: Strategy, Competitive Intelligence, Management Consulting",
            ].map((c, i, arr) => (
              <div key={c} style={{ flex:"1 1 240px", padding:"16px 32px", borderRight:i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                <p style={{ fontFamily:"'Georgia',serif", fontSize:13, color:"var(--ink-muted)", lineHeight:1.5 }}>{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── KEY TAKEAWAYS (Insights) ───────────────────────────────────────────────────

function InsightsPage() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);
  const filtered = INSIGHTS.filter(i =>
    q === "" || i.title.toLowerCase().includes(q.toLowerCase()) || i.excerpt.toLowerCase().includes(q.toLowerCase())
  );

  if (sel) return (
    <div style={{ paddingTop:104, minHeight:"100vh", background:"var(--cream)" }}>
      <div style={{ maxWidth:700, margin:"0 auto", padding:"56px 40px" }}>
        <button onClick={() => setSel(null)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.08em", color:"var(--ink-muted)", marginBottom:44, textDecoration:"underline", textUnderlineOffset:3 }}>← Back to Key Takeaways</button>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--gold)", marginBottom:14 }}>{sel.tag}</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(26px,4vw,46px)", fontWeight:700, color:"var(--ink)", lineHeight:1.12, letterSpacing:"-0.025em", marginBottom:18 }}>{sel.title}</h1>
        <div style={{ display:"flex", gap:14, marginBottom:48, fontFamily:"'DM Mono',monospace", fontSize:10, color:"var(--ink-muted)" }}>
          <span>{sel.date}</span><span>·</span><span>{sel.readTime} read</span>
        </div>
        <div style={{ fontFamily:"'Georgia',serif", fontSize:16, lineHeight:1.95, color:"var(--ink)", display:"flex", flexDirection:"column", gap:20 }}>
          <p style={{ fontSize:18, fontStyle:"italic", borderLeft:"3px solid var(--gold)", paddingLeft:22 }}>{sel.excerpt}</p>
          <p>Strategic thinking, at its core, is the discipline of reducing ambiguity in the face of incomplete information. The frameworks that survive contact with reality are not the most elaborate — they are the most legible. The clearest map wins.</p>
          <p>In practice, this means building intelligence systems that generate usable signal, not just capture data. The gap between information and intelligence is the analyst's judgment: knowing what matters, why it matters now, and what action it demands at the decision level.</p>
          <p>Organisations that consistently outperform their peers are not necessarily better resourced. They are more informed, they act on that information faster, and they have built the internal architecture to keep doing it — systematically, not accidentally.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop:104, background:"var(--cream)" }}>
      <section style={{ padding:"56px 80px 44px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <EL>Key takeaways</EL>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:20, marginBottom:48 }}>
            <BH>Ideas, analysis &<br /><em style={{ color:"var(--gold)" }}>strategic perspectives</em></BH>
            <div style={{ position:"relative" }}>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search ideas..." style={{ padding:"10px 16px 10px 36px", border:"1px solid var(--border)", background:"transparent", fontFamily:"'Georgia',serif", fontSize:13, color:"var(--ink)", outline:"none", width:240 }} />
              <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--ink-muted)", fontSize:14 }}>⌕</span>
            </div>
          </div>
        </div>
      </section>
      <HR />
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 80px 100px" }}>
        {filtered.map(ins => (
          <div key={ins.id} onClick={() => setSel(ins)} className="hbg" style={{ display:"grid", gridTemplateColumns:"56px 1fr 200px 110px", gap:0, alignItems:"center", padding:"36px 0", borderBottom:"1px solid var(--border)", cursor:"pointer", transition:"background 0.2s" }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, color:"var(--gold)" }}>{ins.num}</span>
            <div style={{ paddingRight:36 }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--ink-muted)", marginBottom:8 }}>{ins.tag}</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"var(--ink)", lineHeight:1.2, letterSpacing:"-0.015em" }}>{ins.title}</h3>
            </div>
            <p style={{ fontFamily:"'Georgia',serif", fontSize:12, lineHeight:1.7, color:"var(--ink-muted)", paddingRight:16 }}>{ins.excerpt.slice(0, 88)}…</p>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--ink-muted)", marginBottom:3 }}>{ins.date}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--ink-muted)" }}>{ins.readTime}</div>
              <div style={{ marginTop:8, fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--ink)", textDecoration:"underline", textUnderlineOffset:2 }}>Read →</div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ padding:"80px 0", textAlign:"center", fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:18, color:"var(--ink-muted)" }}>Nothing found.</div>}
      </div>
    </div>
  );
}

// ── THOUGHT IN ACTION (Videos) ────────────────────────────────────────────────

function VideosPage() {
  const [playing, setPlaying] = useState(null);
  const [ref, inView] = useInView();
  return (
    <div style={{ paddingTop:104, background:"var(--cream)" }}>
      <section style={{ padding:"56px 80px 44px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <EL>Thought in action</EL>
          <BH>Ideas spoken<br /><em style={{ color:"var(--gold)" }}>out loud</em></BH>
          <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:17, color:"var(--ink-muted)", lineHeight:1.7, marginTop:18, maxWidth:520 }}>
            Long-form thinking, live demonstrations, and strategic frameworks explored in conversation and video.
          </p>
        </div>
      </section>
      <HR />
      <section style={{ padding:"48px 80px 100px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:1, background:"var(--border)" }} className="g2">
            {VIDEOS.map((vi, i) => (
              <div key={vi.id} onClick={() => setPlaying(vi)} className="clift" style={{ background:"var(--cream)", cursor:"pointer", opacity:inView ? 1 : 0, transform:inView ? "translateY(0)" : "translateY(20px)", transition:`all 0.6s ease ${i * 0.1}s` }}>
                <div style={{ aspectRatio:"16/9", background:"var(--ink)", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                  <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 22px,rgba(255,255,255,0.015) 22px,rgba(255,255,255,0.015) 23px)" }} />
                  <div style={{ position:"absolute", fontFamily:"'Playfair Display',serif", fontSize:160, fontWeight:700, color:"rgba(255,255,255,0.025)", lineHeight:1, userSelect:"none" }}>0{i + 1}</div>
                  <div style={{ position:"relative", width:56, height:56, borderRadius:"50%", border:"1.5px solid rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <div style={{ width:0, height:0, borderTop:"10px solid transparent", borderBottom:"10px solid transparent", borderLeft:"16px solid rgba(255,255,255,0.6)", marginLeft:4 }} />
                  </div>
                  <div style={{ position:"absolute", top:14, left:18 }}>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold)" }}>{vi.category}</span>
                  </div>
                  <div style={{ position:"absolute", bottom:14, right:18 }}>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.35)" }}>{vi.duration}</span>
                  </div>
                </div>
                <div style={{ padding:"24px 28px" }}>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, color:"var(--ink)", lineHeight:1.25, marginBottom:8 }}>{vi.title}</h3>
                  <p style={{ fontFamily:"'Georgia',serif", fontSize:13, lineHeight:1.75, color:"var(--ink-muted)" }}>{vi.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"var(--cream-dark)", border:"1px solid var(--border)", borderTop:"none", padding:"28px 36px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14 }}>
            <div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold)", marginBottom:5 }}>Always growing</div>
              <p style={{ fontFamily:"'Georgia',serif", fontSize:13, color:"var(--ink-muted)" }}>New thinking added regularly. Subscribe to be notified.</p>
            </div>
            <button style={{ background:"none", border:"1px solid var(--border)", padding:"9px 20px", fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.07em", color:"var(--ink)", cursor:"pointer" }}>Subscribe →</button>
          </div>
        </div>
      </section>
      {playing && (
        <div style={{ position:"fixed", inset:0, zIndex:2000, background:"rgba(10,8,5,0.93)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }} onClick={() => setPlaying(null)}>
          <div style={{ width:"100%", maxWidth:900, background:"var(--ink)" }} onClick={e => e.stopPropagation()}>
            <div style={{ aspectRatio:"16/9", background:"#000", position:"relative" }}>
              <iframe src={`https://www.youtube.com/embed/${playing.youtubeId}?autoplay=1`} style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }} allow="autoplay" allowFullScreen />
            </div>
            <div style={{ padding:"18px 26px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:"var(--cream)" }}>{playing.title}</h3>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--gold)" }}>{playing.duration} · {playing.category}</span>
              </div>
              <button onClick={() => setPlaying(null)} style={{ background:"none", border:"1px solid rgba(255,255,255,0.15)", padding:"7px 14px", fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.45)", cursor:"pointer" }}>Close ✕</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ABSTRACTS (Infographics) ───────────────────────────────────────────────────

function FwVisual({ accent, idx }) {
  const a = accent;
  const visuals = [
    <svg key="0" viewBox="0 0 180 140" style={{ width:"100%", height:"100%" }}><circle cx="90" cy="70" r="62" fill="none" stroke={a} strokeOpacity="0.14" strokeWidth="1"/><circle cx="90" cy="70" r="44" fill="none" stroke={a} strokeOpacity="0.24" strokeWidth="1"/><circle cx="90" cy="70" r="26" fill="none" stroke={a} strokeOpacity="0.4" strokeWidth="1.5"/><circle cx="90" cy="70" r="7" fill={a} fillOpacity="0.5"/><line x1="28" y1="70" x2="152" y2="70" stroke={a} strokeOpacity="0.08" strokeWidth="1"/><line x1="90" y1="8" x2="90" y2="132" stroke={a} strokeOpacity="0.08" strokeWidth="1"/></svg>,
    <svg key="1" viewBox="0 0 180 140" style={{ width:"100%", height:"100%" }}>{[0,1,2,3,4].map(i=><rect key={i} x={16+i*31} y={50-i*9} width="20" height={54+i*9} fill={a} fillOpacity={0.1+i*0.06} rx="1"/>)}<line x1="8" y1="114" x2="172" y2="114" stroke={a} strokeOpacity="0.25" strokeWidth="1"/></svg>,
    <svg key="2" viewBox="0 0 180 140" style={{ width:"100%", height:"100%" }}>{[[90,70],[34,36],[146,36],[34,104],[146,104],[90,16]].map(([cx,cy],i)=><g key={i}><circle cx={cx} cy={cy} r="8" fill={a} fillOpacity={0.18+i*0.05}/>{i>0&&<line x1="90" y1="70" x2={cx} y2={cy} stroke={a} strokeOpacity="0.12" strokeWidth="1"/>}</g>)}</svg>,
    <svg key="3" viewBox="0 0 180 140" style={{ width:"100%", height:"100%" }}>{[[0,140,16],[26,120,36],[52,100,56],[78,80,76]].map(([y,w,x],i)=><rect key={i} x={x} y={y-20} width={w} height="20" fill={a} fillOpacity={0.12+i*0.07} rx="2"/>)}</svg>,
    <svg key="4" viewBox="0 0 180 140" style={{ width:"100%", height:"100%" }}>{[0,1,2].map(r=>[0,1,2].map(c=><rect key={`${r}${c}`} x={18+c*50} y={12+r*44} width="38" height="32" fill="none" stroke={a} strokeOpacity={0.13+r*0.07+c*0.04} strokeWidth="1" rx="2"/>))}<rect x={68} y={56} width="38" height="32" fill={a} fillOpacity="0.14" rx="2"/></svg>,
    <svg key="5" viewBox="0 0 180 140" style={{ width:"100%", height:"100%" }}>{[14,60,106].map((x,i)=><rect key={i} x={x} y={50} width="38" height="38" rx="4" fill={a} fillOpacity={0.1+i*0.07}/>)}<line x1="52" y1="69" x2="60" y2="69" stroke={a} strokeOpacity="0.45" strokeWidth="2"/><line x1="98" y1="69" x2="106" y2="69" stroke={a} strokeOpacity="0.45" strokeWidth="2"/><rect x="152" y="50" width="10" height="38" rx="3" fill={a} fillOpacity="0.4"/></svg>,
  ];
  return visuals[idx % visuals.length];
}

function InfographicsPage() {
  const [sel, setSel] = useState(null);
  const [ref, inView] = useInView();
  return (
    <div style={{ paddingTop:104, background:"var(--cream)" }}>
      <section style={{ padding:"56px 80px 44px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <EL>Abstracts</EL>
          <BH>Frameworks distilled<br /><em style={{ color:"var(--gold)" }}>into one image</em></BH>
          <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:17, color:"var(--ink-muted)", lineHeight:1.7, marginTop:18, maxWidth:520 }}>
            Strategic models, mental frameworks, and research architectures — each one a compressed idea. Click any to expand.
          </p>
        </div>
      </section>
      <HR />
      <section style={{ padding:"48px 80px 100px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div ref={ref} style={{ columns:"320px 3", gap:20 }}>
            {INFOGRAPHICS.map((inf, i) => (
              <div key={inf.id} onClick={() => setSel({ ...inf, idx:i })} className="clift" style={{ breakInside:"avoid", marginBottom:20, background:"var(--cream-dark)", border:"1px solid var(--border)", cursor:"pointer", transition:"all 0.3s ease", opacity:inView ? 1 : 0, animation:inView ? `fupp 0.6s ease ${i * 0.07}s forwards` : "none" }}>
                <div style={{ aspectRatio:i % 3 === 1 ? "1/1" : "4/3", background:`linear-gradient(135deg,${inf.accent}12,${inf.accent}05)`, display:"flex", alignItems:"center", justifyContent:"center", padding:28, borderBottom:"1px solid var(--border)", position:"relative" }}>
                  <FwVisual accent={inf.accent} idx={i} />
                  <div style={{ position:"absolute", top:14, right:14, fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:inf.accent, background:`${inf.accent}18`, padding:"3px 8px" }}>{inf.category}</div>
                </div>
                <div style={{ padding:"22px 24px" }}>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:"var(--ink)", marginBottom:8, lineHeight:1.2 }}>{inf.title}</h3>
                  <p style={{ fontFamily:"'Georgia',serif", fontSize:12, lineHeight:1.75, color:"var(--ink-muted)", marginBottom:12 }}>{inf.desc}</p>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.07em", color:"var(--ink)", textDecoration:"underline", textUnderlineOffset:2 }}>View full →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {sel && (
        <div style={{ position:"fixed", inset:0, zIndex:2000, background:"rgba(10,8,5,0.9)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }} onClick={() => setSel(null)}>
          <div style={{ width:"100%", maxWidth:720, background:"var(--cream)", border:"1px solid var(--border)" }} onClick={e => e.stopPropagation()}>
            <div style={{ aspectRatio:"4/3", background:`linear-gradient(135deg,${sel.accent}18,${sel.accent}06)`, display:"flex", alignItems:"center", justifyContent:"center", padding:56, borderBottom:"1px solid var(--border)", position:"relative" }}>
              <div style={{ width:"100%", maxWidth:380 }}><FwVisual accent={sel.accent} idx={sel.idx} /></div>
              <div style={{ position:"absolute", bottom:18, left:26, fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:sel.accent }}>{sel.title}</div>
            </div>
            <div style={{ padding:"22px 28px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16 }}>
              <p style={{ fontFamily:"'Georgia',serif", fontSize:14, lineHeight:1.75, color:"var(--ink-muted)", flex:1 }}>{sel.desc}</p>
              <button onClick={() => setSel(null)} style={{ background:"none", border:"1px solid var(--border)", padding:"7px 14px", fontFamily:"'DM Mono',monospace", fontSize:10, color:"var(--ink-muted)", cursor:"pointer", whiteSpace:"nowrap" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── CASE STUDIES ──────────────────────────────────────────────────────────────

function CaseStudiesPage() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ paddingTop:104, background:"var(--cream)" }}>
      <section style={{ padding:"56px 80px 44px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <EL>Work & outcomes</EL>
          <BH>The thinking behind<br /><em style={{ color:"var(--gold)" }}>the results</em></BH>
        </div>
      </section>
      <HR />
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 80px 100px" }}>
        {CASE_STUDIES.map((cs, i) => (
          <div key={cs.id}>
            <div onClick={() => setOpen(open === i ? null : i)} className="hbg" style={{ display:"grid", gridTemplateColumns:"56px 1fr auto", gap:0, alignItems:"start", padding:"44px 0", cursor:"pointer", transition:"background 0.2s" }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, color:"var(--gold)", paddingTop:4 }}>{cs.num}</span>
              <div style={{ paddingRight:36 }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--ink-muted)", marginBottom:10 }}>{cs.sector}</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"var(--ink)", lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:open === i ? 20 : 0 }}>{cs.title}</h3>
                {open === i && (
                  <div>
                    <div style={{ display:"flex", gap:0, marginBottom:22, flexWrap:"wrap" }}>
                      {cs.phases.map((p, pi) => (
                        <div key={p} style={{ display:"flex", alignItems:"center" }}>
                          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.07em", textTransform:"uppercase", color:"var(--ink)", border:"1px solid var(--border)", padding:"4px 11px", background:"var(--cream-dark)" }}>{p}</span>
                          {pi < cs.phases.length - 1 && <span style={{ color:"var(--ink-muted)", fontSize:11, padding:"0 4px" }}>→</span>}
                        </div>
                      ))}
                    </div>
                    <p style={{ fontFamily:"'Georgia',serif", fontSize:15, lineHeight:1.85, color:"var(--ink-muted)", maxWidth:580 }}>{cs.body}</p>
                  </div>
                )}
              </div>
              <div style={{ textAlign:"right", paddingTop:4 }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, color:"var(--gold)", marginBottom:8 }}>{cs.impact}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--ink-muted)", textDecoration:"underline", textUnderlineOffset:2 }}>{open === i ? "Collapse ↑" : "Details →"}</div>
              </div>
            </div>
            <HR />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", context:"", message:"" });
  const [sent, setSent] = useState(false);
  const ctxs = ["Strategic conversation","Collaboration or co-creation","Speaking or keynote","Research or advisory","General enquiry"];
  const handle = (k) => (e) => setForm(p => ({ ...p, [k]:e.target.value }));
  const iStyle = { width:"100%", padding:"11px 0", border:"none", borderBottom:"1px solid var(--border)", background:"transparent", fontFamily:"'Georgia',serif", fontSize:14, color:"var(--ink)", outline:"none", boxSizing:"border-box" };

  return (
    <div style={{ paddingTop:104, background:"var(--cream)" }}>
      <section style={{ padding:"56px 80px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:100, alignItems:"start" }} className="g2">
          <div>
            <EL>Start a conversation</EL>
            <BH>Have a complex<br /><em style={{ color:"var(--gold)" }}>problem? Good.</em></BH>
            <div style={{ width:48, height:2, background:"var(--gold)", margin:"24px 0" }} />
            <p style={{ fontFamily:"'Georgia',serif", fontSize:15, lineHeight:1.9, color:"var(--ink-muted)", marginBottom:36 }}>
              I am most energised by hard problems — markets that are unclear, strategies that are stuck, ideas that have not found their narrative yet. If that sounds like your situation, let us talk.
            </p>
            {[
              { label:"Email", value:"jhaa.shambhunath@gmail.com", href:"mailto:jhaa.shambhunath@gmail.com" },
              { label:"Phone", value:"+91 801 0885 817", href:"tel:+918010885817" },
              { label:"LinkedIn", value:"linkedin.com/in/essienjaevicepresident", href:"https://www.linkedin.com/in/essienjaevicepresident" },
              { label:"Location", value:"Pune, Maharashtra, India", href:null },
            ].map(c => (
              <div key={c.label} style={{ display:"flex", gap:24, borderBottom:"1px solid var(--border)", paddingBottom:14, marginBottom:14 }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--ink-muted)", minWidth:60, paddingTop:2 }}>{c.label}</span>
                {c.href
                  ? <a href={c.href} target="_blank" rel="noreferrer" style={{ fontFamily:"'Georgia',serif", fontSize:14, color:"var(--ink)", textDecoration:"underline", textUnderlineOffset:3 }}>{c.value}</a>
                  : <span style={{ fontFamily:"'Georgia',serif", fontSize:14, color:"var(--ink)" }}>{c.value}</span>
                }
              </div>
            ))}
          </div>
          {sent ? (
            <div style={{ padding:"56px 40px", border:"1px solid var(--border)", textAlign:"center" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--gold)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:18 }}>Message received</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:"var(--ink)", marginBottom:14 }}>Thank you.</h3>
              <p style={{ fontFamily:"'Georgia',serif", fontSize:14, lineHeight:1.8, color:"var(--ink-muted)" }}>I will respond within 48 hours to explore how we might work together.</p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
              <div><label style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--ink-muted)", marginBottom:8, display:"block" }}>Full name</label><input type="text" value={form.name} onChange={handle("name")} placeholder="Your name" style={iStyle} /></div>
              <div><label style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--ink-muted)", marginBottom:8, display:"block" }}>Email address</label><input type="email" value={form.email} onChange={handle("email")} placeholder="your@email.com" style={iStyle} /></div>
              <div>
                <label style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--ink-muted)", marginBottom:8, display:"block" }}>What brings you here</label>
                <select value={form.context} onChange={handle("context")} style={{ ...iStyle, cursor:"pointer", appearance:"none", color:form.context ? "var(--ink)" : "var(--ink-muted)" }}>
                  <option value="">Select a context</option>
                  {ctxs.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--ink-muted)", marginBottom:8, display:"block" }}>Your message</label><textarea value={form.message} onChange={handle("message")} placeholder="Describe the problem, the context, or the idea. The more specific, the better." rows={5} style={{ ...iStyle, resize:"none" }} /></div>
              <button onClick={() => { if (form.name && form.email && form.message) setSent(true); }} className="btn-dark" style={{ width:"100%", marginTop:8 }}>Send →</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────

function Footer({ setPage }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer style={{ background:"var(--ink)", color:"var(--cream)" }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"72px 80px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.8fr 1fr 1fr 1.4fr", gap:52, paddingBottom:52, borderBottom:"1px solid rgba(255,255,255,0.08)" }} className="gfoot">
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"var(--cream)", marginBottom:10 }}>Shambhunath Jhaa<span style={{ color:"var(--gold)" }}>.</span></div>
            <p style={{ fontFamily:"'Georgia',serif", fontSize:13, lineHeight:1.85, color:"rgba(255,255,255,0.38)", maxWidth:260 }}>Strategist. Researcher. Thinker. Sharing perspectives on market intelligence, AI, and the future of strategic decision-making.</p>
          </div>
          {[
            { label:"Explore", links:[
              { label:"Key Takeaways", page:"Insights" },
              { label:"Thought in Action", page:"Videos" },
              { label:"Abstracts", page:"Infographics" },
              { label:"Case Studies", page:"Case Studies" },
            ]},
            { label:"Connect", links:[
              { label:"The Mind Behind", page:"About" },
              { label:"Contact", page:"Contact" },
            ]},
          ].map(g => (
            <div key={g.label}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:18 }}>{g.label}</div>
              {g.links.map(l => (
                <button key={l.page} onClick={() => setPage(l.page)} className="flink" style={{ display:"block", background:"none", border:"none", cursor:"pointer", fontFamily:"'Georgia',serif", fontSize:13, color:"rgba(255,255,255,0.45)", marginBottom:10, padding:0, textAlign:"left" }}>{l.label}</button>
              ))}
            </div>
          ))}
          <div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:18 }}>Newsletter</div>
            {done ? (
              <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"var(--gold)" }}>You are in. Expect thoughtful mail.</p>
            ) : (
              <div style={{ border:"1px solid rgba(255,255,255,0.14)", display:"flex" }}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ flex:1, padding:"9px 12px", background:"transparent", border:"none", fontFamily:"'Georgia',serif", fontSize:12, color:"var(--cream)", outline:"none" }} />
                <button onClick={() => { if (email) setDone(true); }} style={{ background:"var(--gold)", color:"var(--ink)", border:"none", padding:"9px 12px", fontFamily:"'DM Mono',monospace", fontSize:10, cursor:"pointer" }}>→</button>
              </div>
            )}
            <div style={{ marginTop:22, display:"flex", gap:14 }}>
              <a href="https://www.linkedin.com/in/essienjaevicepresident" target="_blank" rel="noreferrer" style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.35)", textDecoration:"none" }}>LinkedIn ↗</a>
              <a href="mailto:jhaa.shambhunath@gmail.com" style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.35)", textDecoration:"none" }}>Email ↗</a>
            </div>
          </div>
        </div>
        <div style={{ padding:"20px 0", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.25)" }}>© 2026 Shambhunath Jhaa. All rights reserved.</span>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.25)" }}>Pune, India · jhaa.shambhunath@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("Home");
  const go = useCallback(p => { window.scrollTo({ top:0, behavior:"smooth" }); setPage(p); }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&family=DM+Mono:wght@300;400;500&display=swap');
    :root {
      --cream: #F5F1E8;
      --cream-dark: #EDE8DC;
      --cream-glass: rgba(245,241,232,0.93);
      --ink: #1A1712;
      --ink-muted: #6B6456;
      --gold: #8B6420;
      --border: rgba(26,23,18,0.11);
    }
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    html { scroll-behavior:smooth; }
    body { background:var(--cream); color:var(--ink); font-family:'Georgia',serif; overflow-x:hidden; }
    ::selection { background:var(--gold); color:var(--cream); }
    ::-webkit-scrollbar { width:2px; }
    ::-webkit-scrollbar-track { background:var(--cream); }
    ::-webkit-scrollbar-thumb { background:var(--gold); }
    input, textarea, select { color-scheme:light; }
    input::placeholder, textarea::placeholder { color:var(--ink-muted); }
    .btn-dark { background:var(--ink); color:var(--cream); border:none; padding:13px 30px; font-family:'DM Mono',monospace; font-size:11px; letter-spacing:0.07em; cursor:pointer; border-radius:2px; transition:background 0.2s; display:inline-block; }
    .btn-dark:hover { background:#3a3020; }
    .btn-light { background:none; color:var(--ink); border:1px solid var(--border); padding:13px 30px; font-family:'DM Mono',monospace; font-size:11px; letter-spacing:0.07em; cursor:pointer; border-radius:2px; transition:all 0.2s; display:inline-block; }
    .btn-light:hover { background:var(--cream-dark); }
    .hbg:hover { background:var(--cream-dark) !important; }
    .clift:hover { transform:translateY(-4px); box-shadow:0 16px 36px rgba(26,23,18,0.1); }
    .flink:hover { color:rgba(255,255,255,0.88) !important; }
    .dnav { display:flex !important; }
    .mbtn { display:none !important; }
    @media (max-width: 960px) {
      .dnav { display:none !important; }
      .mbtn { display:block !important; }
      .g-intro, .g2, .g3, .gfoot { grid-template-columns:1fr !important; gap:40px !important; }
      .gstats { grid-template-columns:repeat(2,1fr) !important; }
      .trow { grid-template-columns:56px 1fr !important; }
    }
    @media (max-width: 600px) {
      section { padding-left:24px !important; padding-right:24px !important; }
      .gstats { grid-template-columns:1fr 1fr !important; }
      .gfoot { grid-template-columns:1fr !important; }
    }
    @keyframes mqL { from { transform:translateX(0) } to { transform:translateX(-50%) } }
    @keyframes mqR { from { transform:translateX(-50%) } to { transform:translateX(0) } }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }
    @keyframes spulse { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
    @keyframes fupp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  `;

  const pages = {
    "Home":         <HomePage setPage={go} />,
    "About":        <AboutPage />,
    "Insights":     <InsightsPage />,
    "Videos":       <VideosPage />,
    "Infographics": <InfographicsPage />,
    "Case Studies": <CaseStudiesPage />,
    "Contact":      <ContactPage />,
  };

  return (
    <>
      <style>{css}</style>
      <Nav active={page} setPage={go} />
      <main>{pages[page]}</main>
      <Footer setPage={go} />
    </>
  );
}
