import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, HardHat } from 'lucide-react';
import HeroCanvas from './components/HeroCanvas';
import SkillCard from './components/SkillCard';
import GlassDemoBtn from './components/GlassDemoBtn';
import ContactForm from './components/ContactForm';
import Reveal from './components/Reveal';
import type { Skill, Project, ContactItem } from '../types';

const Github = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const Linkedin = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ── THEME ── */
const C = {
  bg: '#07070f', surface: '#0e0e1a', card: '#13131f',
  p1: '#7c3aed', p2: '#06b6d4', p3: '#a855f7',
  text: '#f1f5f9', muted: '#64748b', sub: '#94a3b8',
  border: 'rgba(255,255,255,0.07)',
};

/* ── DATA ── */
const SKILLS: Skill[] = [
  { symbol: '☕',  fcolor: '#f89820', name: 'Java',          level: 'Expert',     pct: 95 },
  { symbol: '🌿',  fcolor: '#6db33f', name: 'Spring Boot',   level: 'Expert',     pct: 92 },
  { symbol: '🐍',  fcolor: '#3776ab', name: 'Python',        level: 'Advanced',   pct: 85 },
  { symbol: '⚛',   fcolor: '#61dafb', name: 'React',         level: 'Advanced',   pct: 83 },
  { symbol: 'TS',  fcolor: '#3178c6', name: 'TypeScript',    level: 'Advanced',   pct: 80 },
  { symbol: 'TF',  fcolor: '#ff6f00', name: 'TensorFlow/AI', level: 'Advanced',   pct: 78 },
  { symbol: '🐳',  fcolor: '#2496ed', name: 'Docker',        level: 'Proficient', pct: 75 },
  { symbol: 'AWS', fcolor: '#ff9900', name: 'AWS',           level: 'Proficient', pct: 72 },
  { symbol: '🐘',  fcolor: '#4169e1', name: 'PostgreSQL',    level: 'Advanced',   pct: 88 },
  { symbol: 'API', fcolor: '#ff6c37', name: 'REST / APIs',   level: 'Expert',     pct: 95 },
];

const PROJECTS: Project[] = [
  {
    featured: true, type: 'Featured · Enterprise · Full Stack',
    title: 'Scheduling Planner',
    desc: 'Enterprise-grade construction project scheduler — imports MPP (Microsoft Project) and XER Primavera files, handling 70–80K tasks with 20–40s response for 50K-task plans. Outperforms MSP by 50% and competes head-to-head with Oracle Primavera P6.',
    stack: ['Java', 'Spring Boot', 'Streams API', 'Topological Sort', 'DFS', 'MPP/XER Parser'],
    stats: [
      { num: '80K', label: 'Max Tasks' },
      { num: '50%', label: 'Faster than MSP' },
      { num: '40s', label: 'Response Time' },
      { num: 'P6',  label: 'Competitor Level' },
    ],
    github: 'https://github.com/ArbazK78',
  },
  {
    featured: false, icon: '🏥', type: 'Healthcare · Full Stack',
    title: 'WellCare', subtitle: 'Real Human Medical Assistance',
    desc: 'Helps people navigate hospital visits, emergencies, and clinical needs when no human support is around — providing real human guidance with convenient waiting-time features.',
    stack: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/ArbazK78',
  },
  {
    featured: false, icon: '🧠', type: 'AI · Machine Learning',
    title: 'AI Demographic Predictor', subtitle: 'Region, Age & Ethnicity Detection',
    desc: 'Detects demographic region, ethnicity, age and gender with 91% accuracy. Trained on large datasets with full preprocessing. Used to detect criminals and identity-based fraud.',
    stack: ['Python', 'TensorFlow', 'OpenCV', 'DeepFace', 'Flask'],
    badge: { label: '91% Accuracy' },
    github: 'https://github.com/ArbazK78',
  },
];

const HERO_STATS = [
  { num: '1+', label: 'Year Exp.' },
  { num: '3',  label: 'Projects Built' },
  { num: '10+',label: 'Technologies' },
  { num: 'AI', label: 'Specialisation' },
];

/* ── RESPONSIVE HOOK ── */
function useBreakpoint() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return { isMobile: w < 640, isTablet: w < 1024 };
}

/* ── APP ── */
export default function App() {
  const { isMobile, isTablet } = useBreakpoint();
  const [activeSection, setActiveSection] = useState('hero');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const curRef  = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const rafRef  = useRef<number>(0);
  const skillsRef = useRef<HTMLElement>(null);
  const [skillsVisible, setSkillsVisible] = useState(false);

  const px = isMobile ? '20px' : isTablet ? '36px' : '60px';
  const sectionPad = `${isMobile ? 70 : 120}px ${px}`;

  /* cursor */
  useEffect(() => {
    const onMM = (e: MouseEvent) => {
      curRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMM);
    const anim = () => {
      ringRef.current.x += (curRef.current.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (curRef.current.y - ringRef.current.y) * 0.12;
      setRingPos({ ...ringRef.current });
      rafRef.current = requestAnimationFrame(anim);
    };
    rafRef.current = requestAnimationFrame(anim);
    return () => {
      window.removeEventListener('mousemove', onMM);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* scroll spy */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    ['hero', 'skills', 'projects', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* skills bar trigger */
  useEffect(() => {
    if (!skillsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSkillsVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLink = (id: string): React.CSSProperties => ({
    color: activeSection === id ? C.text : C.sub,
    fontSize: 14, fontWeight: 500, cursor: 'none',
    padding: '6px 0', userSelect: 'none',
    borderBottom: activeSection === id ? `1.5px solid ${C.p2}` : '1.5px solid transparent',
    transition: 'color 0.2s',
  });

  const CONTACT_ITEMS: ContactItem[] = [
    { icon: <Mail size={18} color={C.p2}/>,        label: 'Email',        val: 'arbazgad@gmail.com',         href: 'mailto:arbazgad@gmail.com' },
    { icon: <Linkedin size={18} color="#0a66c2"/>,  label: 'LinkedIn',     val: 'in/rizwan-gad',              href: 'https://in.linkedin.com/in/rizwan-gad' },
    { icon: <Github size={18} color={C.sub}/>,      label: 'GitHub',       val: 'github.com/ArbazK78',        href: 'https://github.com/ArbazK78' },
    { icon: <MapPin size={18} color="#ef4444"/>,    label: 'Availability', val: 'Open to Remote Worldwide',   href: null },
  ];

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'Inter,sans-serif', overflowX: 'hidden', cursor: 'none', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes float      { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-14px) rotate(.5deg)} 75%{transform:translateY(-7px) rotate(-.5deg)} }
        @keyframes pulse      { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.75)} }
        @keyframes scrollline { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 100%{transform:scaleY(0);transform-origin:bottom} }
        @keyframes spin       { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideDown  { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar       { width:3px }
        ::-webkit-scrollbar-track { background:#07070f }
        ::-webkit-scrollbar-thumb { background:#7c3aed; border-radius:2px }
      `}</style>

      {/* ── CURSOR ── */}
      {!isMobile && <>
        <div style={{ position:'fixed', width:10, height:10, background:'#fff', borderRadius:'50%', pointerEvents:'none', zIndex:9999, left:cursorPos.x, top:cursorPos.y, transform:'translate(-50%,-50%)', mixBlendMode:'difference' }}/>
        <div style={{ position:'fixed', width:hovering?52:36, height:hovering?52:36, border:`1.5px solid ${hovering ? C.p2 : 'rgba(124,58,237,0.7)'}`, borderRadius:'50%', pointerEvents:'none', zIndex:9998, left:ringPos.x, top:ringPos.y, transform:'translate(-50%,-50%)', transition:'width 0.2s,height 0.2s,border-color 0.2s' }}/>
      </>}

      {/* ── NAV ── */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, padding:`16px ${px}`, display:'flex', alignItems:'center', justifyContent:'space-between', backdropFilter:'blur(20px)', background:'rgba(7,7,15,0.9)', borderBottom:`1px solid ${C.border}` }}>
        <div style={{ fontSize:20, fontWeight:900, background:`linear-gradient(135deg,${C.p1},${C.p2})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>RG.</div>

        {!isTablet && (
          <div style={{ display:'flex', gap:36 }}>
            {['hero','skills','projects','contact'].map(id => (
              <span key={id} style={navLink(id)} onClick={() => scrollTo(id)} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </span>
            ))}
          </div>
        )}

        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          {!isTablet && (
            <button onClick={() => scrollTo('contact')} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
              style={{ padding:'9px 22px', borderRadius:8, background:`linear-gradient(135deg,${C.p1},${C.p3})`, color:'#fff', fontSize:13, fontWeight:600, border:'none', cursor:'none' }}>
              Hire Me
            </button>
          )}
          {isTablet && (
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ background:'transparent', border:`1px solid ${C.border}`, borderRadius:8, padding:8, cursor:'none', display:'flex', alignItems:'center', color:C.text }}>
              {menuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {isTablet && menuOpen && (
        <div style={{ position:'fixed', top:65, left:0, right:0, zIndex:199, background:'rgba(13,13,26,0.98)', backdropFilter:'blur(20px)', borderBottom:`1px solid ${C.border}`, padding:`16px ${px} 24px`, animation:'slideDown 0.2s ease' }}>
          {['hero','skills','projects','contact'].map(id => (
            <div key={id} onClick={() => scrollTo(id)}
              style={{ padding:'14px 0', borderBottom:`1px solid ${C.border}`, color:activeSection===id?C.text:C.sub, fontSize:15, fontWeight:500, cursor:'none' }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </div>
          ))}
          <button onClick={() => scrollTo('contact')}
            style={{ marginTop:16, width:'100%', padding:12, borderRadius:8, background:`linear-gradient(135deg,${C.p1},${C.p3})`, color:'#fff', fontSize:14, fontWeight:600, border:'none', cursor:'none' }}>
            Hire Me
          </button>
        </div>
      )}

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section id="hero" style={{ minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center' }}>
        <HeroCanvas/>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:`130px ${px} 80px`, display:'grid', gridTemplateColumns:isTablet?'1fr':'1fr 1fr', gap:isTablet?40:80, alignItems:'center', position:'relative', zIndex:1, width:'100%' }}>

          {/* Left */}
          <Reveal direction="up" delay={100}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 14px', borderRadius:100, background:'rgba(124,58,237,0.12)', border:'1px solid rgba(124,58,237,0.3)', fontSize:12, fontWeight:500, color:C.p3, marginBottom:24 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:C.p2, display:'inline-block', animation:'pulse 2s infinite' }}/>
                Available for Freelance
              </div>
              <h1 style={{ fontSize:isMobile?'38px':isTablet?'52px':'clamp(42px,5vw,72px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:16 }}>
                <span style={{ background:`linear-gradient(135deg,#fff 0%,${C.p3} 55%,${C.p2} 100%)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Rizwan Gad</span>
              </h1>
              <p style={{ fontSize:isMobile?15:18, color:C.sub, marginBottom:18, lineHeight:1.6 }}>
                Full Stack Engineer · <span style={{ color:C.p2, fontWeight:600 }}>Scalable Systems & AI</span>
              </p>
              <p style={{ fontSize:14, color:C.muted, lineHeight:1.85, maxWidth:460, marginBottom:36 }}>
                Specialising in high-performance, scalable architectures with expertise in Java, Spring Boot, Python and AI. Building robust backends that handle high-load data with precision.
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:24 }}>
                <button onClick={() => scrollTo('projects')} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                  style={{ padding:'12px 26px', borderRadius:10, background:`linear-gradient(135deg,${C.p1},${C.p3})`, color:'#fff', fontWeight:600, fontSize:14, border:'none', cursor:'none', boxShadow:'0 0 30px rgba(124,58,237,0.3)' }}>
                  View Projects
                </button>
                <button onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                  style={{ padding:'11px 22px', borderRadius:10, background:'transparent', border:`1px solid ${C.border}`, color:C.sub, fontSize:14, fontWeight:500, cursor:'none' }}>
                  Download CV
                </button>
              </div>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                {[
                  { label:'GitHub',   url:'https://github.com/ArbazK78',            icon:<Github size={14}/> },
                  { label:'LinkedIn', url:'https://in.linkedin.com/in/rizwan-gad',  icon:<Linkedin size={14}/> },
                ].map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noreferrer" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                    style={{ padding:'8px 16px', borderRadius:8, background:C.card, border:`1px solid ${C.border}`, fontSize:12, fontWeight:600, color:C.sub, textDecoration:'none', display:'flex', alignItems:'center', gap:7 }}>
                    {s.icon}{s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — floating card */}
          {!isTablet && (
            <Reveal direction="left" delay={350}>
              <div style={{ display:'flex', justifyContent:'center' }}>
                <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                  style={{ width:300, borderRadius:24, background:`linear-gradient(145deg,${C.card},${C.surface})`, border:`1px solid ${C.border}`, padding:26, position:'relative', boxShadow:'0 30px 80px rgba(0,0,0,0.5)', animation:'float 6s ease-in-out infinite', cursor:'none' }}>
                  <div style={{ position:'absolute', inset:-1, borderRadius:25, background:`linear-gradient(135deg,rgba(124,58,237,0.6),transparent 50%,rgba(6,182,212,0.4))`, WebkitMask:'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', maskComposite:'exclude', padding:1, pointerEvents:'none' }}/>
                  <div style={{ width:64, height:64, borderRadius:'50%', background:`linear-gradient(135deg,${C.p1},${C.p2})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:900, color:'#fff', marginBottom:14, boxShadow:`0 0 24px rgba(124,58,237,0.5)` }}>RG</div>
                  <div style={{ fontSize:17, fontWeight:700, marginBottom:2 }}>Rizwan Gad</div>
                  <div style={{ fontSize:10, color:C.p2, fontWeight:600, letterSpacing:'0.06em', marginBottom:8 }}>FULL STACK ENGINEER</div>
                  <div style={{ fontSize:12, color:C.muted, lineHeight:1.65, marginBottom:18 }}>Scalable systems specialist in Java, Spring Boot & Python — bridging robust backend engineering with AI-driven solutions.</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:18 }}>
                    {HERO_STATS.map(({ num, label }) => (
                      <div key={label} style={{ background:'rgba(255,255,255,0.04)', borderRadius:10, padding:'10px 8px', textAlign:'center', border:`1px solid ${C.border}` }}>
                        <div style={{ fontSize:18, fontWeight:800, background:`linear-gradient(135deg,${C.p1},${C.p2})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{num}</div>
                        <div style={{ fontSize:9, color:C.muted, marginTop:2, letterSpacing:'0.04em' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {([
                      ['Java',       'rgba(234,88,12,.15)',  '#fb923c', 'rgba(234,88,12,.25)'],
                      ['Spring Boot','rgba(34,197,94,.12)',  '#4ade80', 'rgba(34,197,94,.22)'],
                      ['Python',     'rgba(99,102,241,.15)', '#818cf8', 'rgba(99,102,241,.25)'],
                      ['AI / ML',    'rgba(124,58,237,.15)', C.p3,      'rgba(124,58,237,.25)'],
                    ] as const).map(([name, bg, color, bd]) => (
                      <span key={name} style={{ padding:'4px 9px', borderRadius:6, fontSize:10, fontWeight:600, background:bg, color, border:`1px solid ${bd}` }}>{name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:30, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:C.muted }}>Scroll</span>
          <div style={{ width:1, height:36, background:`linear-gradient(to bottom,${C.p1},transparent)`, animation:'scrollline 2s ease-in-out infinite' }}/>
        </div>
      </section>

      <div style={{ height:1, background:`linear-gradient(90deg,transparent,${C.border},transparent)`, margin:`0 ${px}` }}/>

      {/* ══════════════════════════════════
          SKILLS
      ══════════════════════════════════ */}
      <section id="skills" style={{ maxWidth:1200, margin:'0 auto', padding:sectionPad }} ref={skillsRef}>
        <Reveal direction="up">
          <div style={{ marginBottom:48 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:11, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:C.p2, marginBottom:12 }}>
              <span style={{ width:20, height:1.5, background:C.p2, display:'inline-block' }}/>What I Work With
            </div>
            <h2 style={{ fontSize:isMobile?'28px':'clamp(28px,4vw,48px)', fontWeight:800, letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:12 }}>Skills & Expertise</h2>
            <p style={{ fontSize:14, color:C.muted, maxWidth:500, lineHeight:1.8 }}>A curated set of tools and technologies I use to build scalable, production-grade systems.</p>
          </div>
        </Reveal>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'repeat(2,1fr)':isTablet?'repeat(3,1fr)':'repeat(5,1fr)', gap:14 }}>
          {SKILLS.map((sk, i) => (
            <Reveal key={sk.name} direction="up" delay={i * 60} threshold={0.05}>
              <SkillCard sk={sk} visible={skillsVisible} delay={i * 55} onHover={setHovering}/>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{ height:1, background:`linear-gradient(90deg,transparent,${C.border},transparent)`, margin:`0 ${px}` }}/>

      {/* ══════════════════════════════════
          PROJECTS
      ══════════════════════════════════ */}
      <section id="projects" style={{ maxWidth:1200, margin:'0 auto', padding:sectionPad }}>
        <Reveal direction="up">
          <div style={{ marginBottom:48 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:11, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:C.p2, marginBottom:12 }}>
              <span style={{ width:20, height:1.5, background:C.p2, display:'inline-block' }}/>What I've Built
            </div>
            <h2 style={{ fontSize:isMobile?'28px':'clamp(28px,4vw,48px)', fontWeight:800, letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:12 }}>Featured Projects</h2>
            <p style={{ fontSize:14, color:C.muted, maxWidth:500, lineHeight:1.8 }}>Real-world systems engineered for scale, performance, and impact.</p>
          </div>
        </Reveal>

        <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
          {/* Featured card */}
          <Reveal direction="up" delay={100}>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, overflow:'hidden', cursor:'none' }}
              onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
              <div style={{ height:isMobile?180:280, background:'linear-gradient(135deg,#0d0d1e,#181838)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
                <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.18 }} viewBox="0 0 900 280">
                  {[0,1,2,3,4,5,6,7].map(i => (
                    <g key={i}>
                      <rect x={120} y={26+i*32} width={[180,260,140,320,200,150,280,100][i]} height={18} rx={5} fill={i%2===0?'#7c3aed':'#06b6d4'} opacity={0.8-i*0.05}/>
                      <rect x={100} y={33+i*32} width={14} height={4} rx={2} fill="#fff" opacity={0.3}/>
                    </g>
                  ))}
                  {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
                    <line key={i} x1={120+i*66} y1="16" x2={120+i*66} y2="265" stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>
                  ))}
                </svg>
                <div style={{ textAlign:'center', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
                  <HardHat size={isMobile?36:52} color={C.p2} strokeWidth={1.5}/>
                  <div style={{ fontSize:11, color:C.sub, letterSpacing:'0.08em', textTransform:'uppercase' }}>Demo Available on Request</div>
                </div>
                <div style={{ position:'absolute', top:14, left:14, padding:'4px 12px', borderRadius:6, background:'rgba(124,58,237,0.2)', border:'1px solid rgba(124,58,237,0.3)', fontSize:10, fontWeight:700, color:C.p3 }}>FEATURED</div>
              </div>
              <div style={{ height:3, background:`linear-gradient(90deg,${C.p1},${C.p2},${C.p3})` }}/>
              <div style={{ padding:isMobile?18:28 }}>
                <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:C.p2, marginBottom:8 }}>{PROJECTS[0].type}</div>
                <div style={{ fontSize:isMobile?18:23, fontWeight:800, marginBottom:10 }}>{PROJECTS[0].title}</div>
                <p style={{ fontSize:13, color:C.muted, lineHeight:1.75, marginBottom:22 }}>{PROJECTS[0].desc}</p>
                <div style={{ display:'grid', gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`, gap:10, marginBottom:22 }}>
                  {PROJECTS[0].stats!.map(st => (
                    <div key={st.label} style={{ background:'rgba(255,255,255,0.03)', border:`1px solid ${C.border}`, borderRadius:10, padding:'12px 8px', textAlign:'center' }}>
                      <div style={{ fontSize:18, fontWeight:800, background:`linear-gradient(135deg,${C.p1},${C.p2})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{st.num}</div>
                      <div style={{ fontSize:9, color:C.muted, marginTop:3, letterSpacing:'0.04em' }}>{st.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:22 }}>
                  {PROJECTS[0].stack.map(t => <span key={t} style={{ padding:'4px 12px', borderRadius:100, fontSize:11, fontWeight:500, background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.22)', color:C.p3 }}>{t}</span>)}
                </div>
                <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                  <a href={PROJECTS[0].github} target="_blank" rel="noreferrer" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                    style={{ padding:'10px 22px', borderRadius:8, background:`linear-gradient(135deg,${C.p1},${C.p3})`, color:'#fff', fontSize:12, fontWeight:600, textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
                    <Github size={13}/> View GitHub
                  </a>
                  <GlassDemoBtn label="Request Demo" onHover={setHovering}/>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Two smaller cards */}
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:24 }}>
            {PROJECTS.slice(1).map((p, i) => (
              <Reveal key={p.title} direction={i === 0 ? 'left' : 'right'} delay={150}>
                <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, overflow:'hidden', cursor:'none', display:'flex', flexDirection:'column' }}
                  onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                  <div style={{ height:isMobile?150:190, background:'linear-gradient(135deg,#0d0d1e,#181838)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                    <div style={{ textAlign:'center' }}>
                      <div style={{ fontSize:40, marginBottom:8 }}>{p.icon}</div>
                      <div style={{ fontSize:10, color:C.muted, letterSpacing:'0.08em', textTransform:'uppercase' }}>Demo Available</div>
                    </div>
                    {p.badge && (
                      <div style={{ position:'absolute', top:12, left:12, padding:'4px 10px', borderRadius:6, background:'rgba(6,182,212,0.15)', border:'1px solid rgba(6,182,212,0.3)', fontSize:10, fontWeight:700, color:C.p2 }}>{p.badge.label}</div>
                    )}
                  </div>
                  <div style={{ height:3, background:`linear-gradient(90deg,${C.p1},${C.p2},${C.p3})` }}/>
                  <div style={{ padding:isMobile?16:22, flex:1, display:'flex', flexDirection:'column' }}>
                    <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:C.p2, marginBottom:6 }}>{p.type}</div>
                    <div style={{ fontSize:17, fontWeight:700, marginBottom:4 }}>{p.title}</div>
                    {p.subtitle && <div style={{ fontSize:11, color:C.p3, marginBottom:10, fontWeight:500 }}>{p.subtitle}</div>}
                    <p style={{ fontSize:13, color:C.muted, lineHeight:1.75, marginBottom:16, flex:1 }}>{p.desc}</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
                      {p.stack.map(t => <span key={t} style={{ padding:'3px 10px', borderRadius:100, fontSize:11, fontWeight:500, background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.22)', color:C.p3 }}>{t}</span>)}
                    </div>
                    <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
                      <a href={p.github} target="_blank" rel="noreferrer" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                        style={{ padding:'8px 18px', borderRadius:8, background:`linear-gradient(135deg,${C.p1},${C.p3})`, color:'#fff', fontSize:12, fontWeight:600, textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
                        <Github size={12}/> View GitHub
                      </a>
                      <GlassDemoBtn label="Demo" onHover={setHovering}/>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height:1, background:`linear-gradient(90deg,transparent,${C.border},transparent)`, margin:`0 ${px}` }}/>

      {/* ══════════════════════════════════
          CONTACT
      ══════════════════════════════════ */}
      <section id="contact" style={{ maxWidth:1200, margin:'0 auto', padding:sectionPad }}>
        <Reveal direction="up">
          <div style={{ marginBottom:48 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:11, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:C.p2, marginBottom:12 }}>
              <span style={{ width:20, height:1.5, background:C.p2, display:'inline-block' }}/>Let's Work Together
            </div>
            <h2 style={{ fontSize:isMobile?'28px':'clamp(28px,4vw,48px)', fontWeight:800, letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:12 }}>Get In Touch</h2>
            <p style={{ fontSize:14, color:C.muted, maxWidth:500, lineHeight:1.8 }}>Have a project in mind? Let's build something remarkable together.</p>
          </div>
        </Reveal>
        <div style={{ display:'grid', gridTemplateColumns:isTablet?'1fr':'1fr 1.2fr', gap:isTablet?24:52, alignItems:'start' }}>
          <Reveal direction="left" delay={100}>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {CONTACT_ITEMS.map(ci => (
                <a key={ci.label} href={ci.href ?? '#'} target={ci.href && !ci.href.startsWith('mailto') ? '_blank' : '_self'} rel="noreferrer"
                  onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                  style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 18px', background:C.card, border:`1px solid ${C.border}`, borderRadius:12, cursor:'none', textDecoration:'none' }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.1))', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {ci.icon}
                  </div>
                  <div>
                    <div style={{ fontSize:10, color:C.muted, letterSpacing:'0.06em', textTransform:'uppercase' }}>{ci.label}</div>
                    <div style={{ fontSize:13, fontWeight:500, marginTop:2, color:C.text }}>{ci.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal direction="right" delay={200}>
            <ContactForm onHover={setHovering}/>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════
          FOOTER
      ══════════════════════════════════ */}
      <Reveal direction="up" delay={100}>
        <footer style={{ borderTop:`1px solid ${C.border}`, padding:`24px ${px}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <div style={{ fontSize:12, color:C.muted }}>© 2025 Rizwan Gad - I build things for the web.</div>
          <div style={{ display:'flex', gap:10 }}>
            {[
              { icon:<Github size={14}/>,   label:'GitHub',   url:'https://github.com/ArbazK78' },
              { icon:<Linkedin size={14}/>, label:'LinkedIn', url:'https://in.linkedin.com/in/rizwan-gad' },
            ].map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                style={{ padding:'7px 14px', borderRadius:8, background:C.card, border:`1px solid ${C.border}`, fontSize:12, color:C.sub, textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
                {l.icon}{l.label}
              </a>
            ))}
          </div>
        </footer>
      </Reveal>
    </div>
  );
}