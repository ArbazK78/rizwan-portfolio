import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import type { ToastItem, ToastType } from '../hooks/useToast';

interface ToastProps {
  toasts: ToastItem[];
  onRemove: (id: number) => void;
}

const CONFIG: Record<ToastType, { icon: React.ReactNode; accent: string; bg: string }> = {
  success: {
    icon: <CheckCircle2 size={16} color="#4ade80" strokeWidth={2}/>,
    accent: 'rgba(74,222,128,0.25)',
    bg:     'rgba(74,222,128,0.08)',
  },
  error: {
    icon: <XCircle size={16} color="#f87171" strokeWidth={2}/>,
    accent: 'rgba(248,113,113,0.25)',
    bg:     'rgba(248,113,113,0.08)',
  },
  info: {
    icon: <Info size={16} color="#06b6d4" strokeWidth={2}/>,
    accent: 'rgba(6,182,212,0.25)',
    bg:     'rgba(6,182,212,0.08)',
  },
};

/* ── Single Toast ── */
function ToastCard({ toast, onRemove }: { toast: ToastItem; onRemove: (id: number) => void }) {
  const [visible, setVisible] = useState(false);
  const cfg = CONFIG[toast.type];

  useEffect(() => {
    // mount → animate in
    const inTimer = setTimeout(() => setVisible(true), 10);
    // auto-dismiss after 3.5s
    const outTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 350);
    }, 3500);
    return () => { clearTimeout(inTimer); clearTimeout(outTimer); };
  }, [toast.id, onRemove]);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => onRemove(toast.id), 350);
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 14px',
      background: `#13131f`,
      border: `1px solid ${cfg.accent}`,
      borderLeft: `3px solid ${cfg.accent}`,
      borderRadius: 12,
      boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)`,
      backdropFilter: 'blur(16px)',
      minWidth: 260, maxWidth: 340,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(24px)',
      transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)',
      cursor: 'default',
    }}>
      <div style={{ flexShrink: 0 }}>{cfg.icon}</div>
      <span style={{ fontSize: 13, fontWeight: 500, color: '#f1f5f9', flex: 1, lineHeight: 1.5 }}>
        {toast.message}
      </span>
      <button
        onClick={dismiss}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', color: '#64748b', flexShrink: 0 }}
      >
        <X size={14}/>
      </button>
    </div>
  );
}

/* ── Toast Container ── */
export function ToastContainer({ toasts, onRemove }: ToastProps) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      display: 'flex', flexDirection: 'column', gap: 10,
      pointerEvents: toasts.length ? 'all' : 'none',
    }}>
      {toasts.map(t => (
        <ToastCard key={t.id} toast={t} onRemove={onRemove}/>
      ))}
    </div>
  );
}
