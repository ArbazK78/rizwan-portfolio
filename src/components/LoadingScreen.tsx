import { useState, useEffect, useRef } from 'react';

const C = { p1: '#7c3aed', p2: '#06b6d4', muted: '#64748b' };

interface Props { onDone: () => void; }

export default function LoadingScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    const duration = 2400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const pct = Math.min(((now - start) / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setFading(true);
          setTimeout(() => onDoneRef.current(), 600);
        }, 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []); // ← empty deps: runs once only, ref keeps onDone current

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#07070f', zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: fading ? 0 : 1, transition: 'opacity 0.6s ease',
      pointerEvents: fading ? 'none' : 'all',
    }}>
      <style>{`
        @keyframes loadPulse {
          0%,100% { box-shadow: 0 0 40px rgba(124,58,237,0.5); }
          50%      { box-shadow: 0 0 70px rgba(124,58,237,0.8), 0 0 120px rgba(6,182,212,0.3); }
        }
      `}</style>

      {/* Background glow orbs */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(124,58,237,0.12)', filter: 'blur(80px)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(6,182,212,0.08)', filter: 'blur(60px)', top: '40%', left: '55%', pointerEvents: 'none' }}/>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: `linear-gradient(135deg,${C.p1},${C.p2})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
          animation: 'loadPulse 2s ease-in-out infinite',
        }}>
          <span style={{ fontSize: 28, fontWeight: 900, color: '#fff', fontFamily: 'Inter, sans-serif' }}>RG</span>
        </div>

        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 6, color: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
          Rizwan Gad
        </div>
        <div style={{ fontSize: 12, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 48, fontFamily: 'Inter, sans-serif' }}>
          Full Stack Engineer
        </div>

        {/* Progress bar */}
        <div style={{ width: 220, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: `linear-gradient(90deg,${C.p1},${C.p2})`,
            width: `${progress}%`,
            transition: 'width 0.05s linear',
            boxShadow: '0 0 10px rgba(124,58,237,0.6)',
          }}/>
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 12, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}