import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Loader2, AlertCircle, ChevronDown } from 'lucide-react';

const EJS_SERVICE_ID  = import.meta.env.VITE_EJS_SERVICE_ID;
const EJS_TEMPLATE_ID = import.meta.env.VITE_EJS_TEMPLATE_ID;
const EJS_PUBLIC_KEY  = import.meta.env.VITE_EJS_PUBLIC_KEY;

const C = {
  card: '#13131f', surface: '#0e0e1a', border: 'rgba(255,255,255,0.07)',
  p1: '#7c3aed', p2: '#06b6d4', p3: '#a855f7',
  text: '#f1f5f9', muted: '#64748b', sub: '#94a3b8',
};

type Status = 'idle' | 'sending' | 'success' | 'error' | 'error_validation' | 'error_email';

interface Props { onHover: (v: boolean) => void; }

const PROJECT_TYPES = [
  'Full Stack Development',
  'Backend / API Development',
  'AI / ML Integration',
  'Performance Optimisation',
];

/* ── Custom dropdown option ── */
function DropOption({ label, selected, isLast, onClick, onHover }: {
  label: string; selected: boolean; isLast: boolean;
  onClick: () => void; onHover: (v: boolean) => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => { setHov(true); onHover(true); }}
      onMouseLeave={() => { setHov(false); onHover(false); }}
      style={{
        padding: '11px 16px', fontSize: 14, cursor: 'none',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)',
        background: selected ? 'rgba(124,58,237,0.15)' : hov ? 'rgba(124,58,237,0.08)' : 'transparent',
        color: selected ? '#a855f7' : hov ? C.text : C.sub,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background 0.15s, color 0.15s',
      }}
    >
      {label}
      {selected && <span style={{ fontSize: 12, color: '#a855f7' }}>✓</span>}
    </div>
  );
}

/* ── Contact Form ── */
export default function ContactForm({ onHover }: Props) {
  const [form, setForm] = useState({ first: '', last: '', email: '', type: '', msg: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [countdown, setCountdown] = useState(5);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const inp: React.CSSProperties = {
    background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10,
    padding: '12px 16px', color: C.text, fontFamily: 'Inter, sans-serif',
    fontSize: 14, outline: 'none', width: '100%',
  };

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* auto-revert countdown after success */
  useEffect(() => {
    if (status !== 'success') return;
    const interval = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSend = async () => {
    if (!form.first || !form.email || !form.msg) { setStatus('error_validation'); return; }
    if (!isValidEmail(form.email)) { setStatus('error_email'); return; }
    setStatus('sending');
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  EJS_SERVICE_ID,
          template_id: EJS_TEMPLATE_ID,
          user_id:     EJS_PUBLIC_KEY,
          template_params: {
            from_name:    `${form.first} ${form.last}`.trim(),
            from_email:   form.email,
            project_type: form.type || 'Not specified',
            message:      form.msg,
          },
        }),
      });
      if (res.ok) {
        setCountdown(5);
        setStatus('success');
        setForm({ first: '', last: '', email: '', type: '', msg: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden' }}>
      {/* Animated glass border */}
      <div style={{ position: 'absolute', inset: -1, borderRadius: 21, background: 'linear-gradient(135deg,rgba(124,58,237,0.45),transparent 40%,rgba(6,182,212,0.35))', WebkitMask: 'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: 1, pointerEvents: 'none' }}/>

      {/* ── Success state ── */}
      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
            <CheckCircle2 size={56} color="#4ade80" strokeWidth={1.5}/>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Message Sent!</div>
          <div style={{ fontSize: 14, color: C.muted, marginBottom: 20 }}>
            Thanks for reaching out. Rizwan will get back to you shortly.
          </div>
          {/* Disabled countdown button */}
          <button disabled style={{ width: '100%', padding: 14, borderRadius: 10, background: 'rgba(124,58,237,0.25)', color: C.sub, fontWeight: 700, fontSize: 14, border: `1px solid rgba(124,58,237,0.2)`, cursor: 'not-allowed', letterSpacing: '0.03em' }}>
            Send Again in {countdown}s
          </button>
        </div>

      ) : (
        <>
          {/* ── Error banners ── */}
          {(status === 'error' || status === 'error_validation' || status === 'error_email') && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', marginBottom: 16 }}>
              <AlertCircle size={16} color="#f87171"/>
              <span style={{ fontSize: 13, color: '#f87171' }}>
                {status === 'error_validation' && 'Please fill in your name, email and message.'}
                {status === 'error_email'      && 'Please enter a valid email address.'}
                {status === 'error'            && 'Something went wrong. Please try again or email directly at arbazgad@gmail.com'}
              </span>
            </div>
          )}

          {/* ── Name row ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            {([['first', 'First Name', 'John'], ['last', 'Last Name', 'Doe']] as const).map(([k, l, ph]) => (
              <div key={k}>
                <label style={{ fontSize: 11, fontWeight: 600, color: C.sub, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>{l}</label>
                <input style={inp} placeholder={ph} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}/>
              </div>
            ))}
          </div>

          {/* ── Email ── */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: C.sub, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>Email</label>
            <input type="email" style={inp} placeholder="john@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}/>
          </div>

          {/* ── Custom dropdown ── */}
          <div style={{ marginBottom: 14 }} ref={dropRef}>
            <label style={{ fontSize: 11, fontWeight: 600, color: C.sub, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>Project Type</label>
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setDropOpen(o => !o)}
                onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}
                style={{ ...inp, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'none', border: `1px solid ${dropOpen ? 'rgba(124,58,237,0.5)' : C.border}`, boxShadow: dropOpen ? '0 0 0 3px rgba(124,58,237,0.1)' : 'none', transition: 'border-color 0.2s, box-shadow 0.2s', userSelect: 'none' }}>
                <span style={{ color: form.type ? C.text : '#475569', fontSize: 14 }}>{form.type || 'Select project type...'}</span>
                <ChevronDown size={16} color={C.sub} style={{ transform: dropOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', flexShrink: 0 }}/>
              </div>
              {dropOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: '#0e0e1a', border: '1px solid rgba(124,58,237,0.35)', borderRadius: 10, overflow: 'hidden', zIndex: 50, boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
                  {PROJECT_TYPES.map((opt, i) => (
                    <DropOption key={opt} label={opt} selected={form.type === opt}
                      isLast={i === PROJECT_TYPES.length - 1}
                      onClick={() => { setForm({ ...form, type: opt }); setDropOpen(false); }}
                      onHover={onHover}/>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Message ── */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: C.sub, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>Message</label>
            <textarea style={{ ...inp, height: 110, resize: 'none' }} placeholder="Tell me about your project, goals, and timeline..." value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}/>
          </div>

          {/* ── Submit ── */}
          <button
            onClick={handleSend} disabled={status === 'sending'}
            onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}
            style={{ width: '100%', padding: 14, borderRadius: 10, background: status === 'sending' ? 'rgba(124,58,237,0.5)' : `linear-gradient(135deg,${C.p1},${C.p3})`, color: '#fff', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'none', boxShadow: '0 8px 24px rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, transition: 'background 0.2s' }}>
            {status === 'sending'
              ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }}/> Sending...</>
              : 'Send Message →'}
          </button>
        </>
      )}
    </div>
  );
}