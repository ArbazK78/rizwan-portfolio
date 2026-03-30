import { useState } from 'react';

const C = { border: 'rgba(255,255,255,0.07)', sub: '#94a3b8', text: '#f1f5f9' };

interface Props {
  label: string;
  onHover: (v: boolean) => void;
}

export default function GlassDemoBtn({ label, onHover }: Props) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => { setHov(true); onHover(true); }}
      onMouseLeave={() => { setHov(false); onHover(false); }}
      style={{
        padding: '10px 22px', borderRadius: 8,
        background: hov ? 'rgba(255,255,255,0.05)' : 'transparent',
        border: hov ? '1px solid rgba(124,58,237,0.65)' : `1px solid ${C.border}`,
        backdropFilter: hov ? 'blur(12px)' : 'none',
        color: hov ? C.text : C.sub, fontSize: 12, fontWeight: 500, cursor: 'none',
        boxShadow: hov ? '0 0 22px rgba(124,58,237,0.2),inset 0 0 18px rgba(124,58,237,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      ▶ {label}
    </button>
  );
}