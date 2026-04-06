import { Zap, Server, Brain } from 'lucide-react';
import Reveal from './Reveal';

const C = {
  card: '#13131f', p1: '#7c3aed', p2: '#06b6d4', p3: '#a855f7',
  text: '#f1f5f9', muted: '#64748b', sub: '#94a3b8',
  border: 'rgba(255,255,255,0.07)',
};

const TIMELINE = [
  { year: '2021', title: 'Started Computer Science',   color: C.p1, desc: 'Began my journey into software engineering, falling in love with backend systems and algorithms.' },
  { year: '2023', title: 'First AI Project',            color: C.p2, desc: 'Built the AI Demographic Predictor — 91% accuracy on ethnicity, age and gender detection using TensorFlow and OpenCV.' },
  { year: '2024', title: 'Healthcare Impact',           color: C.p3, desc: 'Developed WellCare to solve a real-world problem — helping people navigate medical emergencies without human support nearby.' },
  { year: '2025', title: 'Enterprise Engineering',      color: C.p1, desc: 'Joined professional corporate work — built the Scheduling Planner that outperforms MSP by 50% handling 80K tasks.' },
  { year: 'Now',  title: 'Open for Opportunities',     color: C.p2, desc: 'Actively taking on freelance client projects in full stack, backend architecture, and AI integration.' },
];

const STORY_BLOCKS = [
  {
    label: 'Who I Am',
    text: "I'm Rizwan Gad — a Full Stack Engineer with a passion for building systems that don't just work, but work exceptionally well under pressure. I thrive in the backend, where algorithms meet architecture and performance is everything.",
  },
  {
    label: 'What I Do',
    text: 'I specialise in high-load, scalable systems using Java and Spring Boot on the backend, paired with React and TypeScript on the frontend. I also build and integrate AI pipelines — from ML model training to production deployment.',
  },
  {
    label: 'How I Think',
    text: 'Every line of code I write is driven by a single question: will this hold up at scale? From Topological Sort in enterprise schedulers to TensorFlow models achieving 91% accuracy, I care about engineering that is measurable, maintainable, and fast.',
  },
];

const VALUES = [
  { icon: <Zap size={22} color={C.p2}/>,    title: 'Performance First', color: C.p2, desc: "Every system I build is profiled, optimised, and stress-tested. Response times aren't afterthoughts — they're foundations." },
  { icon: <Server size={22} color={C.p3}/>, title: 'Built to Scale',    color: C.p3, desc: 'From 50K-task planners to ML pipelines, I architect solutions that grow without breaking — event-driven and fault-tolerant.' },
  { icon: <Brain size={22} color={C.p1}/>,  title: 'AI-Augmented',      color: C.p1, desc: 'I bridge backend engineering with AI — integrating ML models, smart pipelines, and intelligent APIs into real products.' },
];

interface Props {
  isMobile: boolean;
  isTablet: boolean;
  onHover: (v: boolean) => void;
}

export default function AboutSection({ isMobile, isTablet, onHover }: Props) {
  return (
    <section id="about" style={{ maxWidth: 1200, margin: '0 auto', padding: `${isMobile ? 70 : 120}px ${isMobile ? '20px' : isTablet ? '36px' : '60px'}` }}>

      {/* Header */}
      <Reveal direction="up">
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.p2, marginBottom: 12 }}>
            <span style={{ width: 20, height: 1.5, background: C.p2, display: 'inline-block' }}/>The Person Behind the Code
          </div>
          <h2 style={{ fontSize: isMobile ? '28px' : 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12, color: C.text }}>About Me</h2>
          <p style={{ fontSize: 14, color: C.muted, maxWidth: 520, lineHeight: 1.8 }}>A quick look at who I am, where I've been, and what drives me to build the way I do.</p>
        </div>
      </Reveal>

      {/* Story + Timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: 60, marginBottom: 60 }}>

        {/* Story blocks */}
        <Reveal direction="left" delay={100}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {STORY_BLOCKS.map(({ label, text }) => (
              <div key={label} style={{ padding: 24, background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom,${C.p1},${C.p2})`, borderRadius: '3px 0 0 3px' }}/>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.p2, marginBottom: 8 }}>{label}</div>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Timeline */}
        <Reveal direction="right" delay={200}>
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div style={{ position: 'absolute', left: 10, top: 8, bottom: 8, width: 1.5, background: `linear-gradient(to bottom,${C.p1},${C.p2},transparent)` }}/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {TIMELINE.map(({ year, title, desc, color }, i) => (
                <Reveal key={year} direction="up" delay={i * 80} threshold={0.05}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: -27, top: 4, width: 12, height: 12, borderRadius: '50%', background: color, boxShadow: `0 0 10px ${color}80`, border: `2px solid #07070f` }}/>
                    <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 100, background: `${color}18`, border: `1px solid ${color}40`, fontSize: 11, fontWeight: 700, color, marginBottom: 6, letterSpacing: '0.04em' }}>{year}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: C.text }}>{title}</div>
                    <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Value cards */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3,1fr)', gap: 16 }}>
        {VALUES.map(({ icon, title, desc, color }, i) => (
          <Reveal key={title} direction="up" delay={i * 80} threshold={0.05}>
            <div onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}
              style={{ padding: 24, background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, cursor: 'none', height: '100%' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                {icon}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: C.text }}>{title}</div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}