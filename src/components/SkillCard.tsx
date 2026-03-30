import { useState } from 'react';
import type { Skill } from '../../types';

interface Props {
  sk: Skill;
  visible: boolean;
  delay: number;
  onHover: (v: boolean) => void;
}

const C = { card: '#13131f', border: 'rgba(255,255,255,0.07)', p1: '#7c3aed', p2: '#06b6d4', muted: '#64748b', text: '#f1f5f9' };

export default function SkillCard({ sk, visible, delay, onHover }: Props) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => { setHov(true); onHover(true); }}
      onMouseLeave={() => { setHov(false); onHover(false); }}
      style={{
        background: hov ? '#181828' : C.card,
        border: `1px solid ${hov ? 'rgba(124,58,237,0.45)' : C.border}`,
        borderRadius: 14, padding: '20px 16px', textAlign: 'center',
        transform: hov ? 'translateY(-7px)' : 'translateY(0)',
        boxShadow: hov ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
        transition: 'all 0.3s ease', cursor: 'none',
      }}
    >
      <div style={{
        width: 44, height: 44, margin: '0 auto 12px', display: 'flex',
        alignItems: 'center', justifyContent: 'center', borderRadius: 10,
        background: `${sk.fcolor}18`, border: `1px solid ${sk.fcolor}35`,
        boxShadow: hov ? `0 0 14px ${sk.fcolor}30` : 'none', transition: 'box-shadow 0.3s',
      }}>
        <span style={{
          fontSize: sk.symbol.length > 2 ? 10 : sk.symbol.length === 2 ? 14 : 22,
          fontWeight: 900, color: sk.fcolor, fontFamily: "'Inter',monospace",
          letterSpacing: '-0.03em', lineHeight: 1,
        }}>{sk.symbol}</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3, color: C.text }}>{sk.name}</div>
      <div style={{ fontSize: 10, color: C.muted, marginBottom: 12 }}>{sk.level}</div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 2,
          background: `linear-gradient(90deg,${C.p1},${C.p2})`,
          width: visible ? `${sk.pct}%` : '0%',
          transition: `width 1.2s ease ${delay}ms`,
        }}/>
      </div>
    </div>
  );
}