import { useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;  // 0–1, how much of the element must be visible
  once?: boolean;      // if true, stays visible once triggered (default: true)
  delay?: number;      // extra ms delay before animating
}

export default function useReveal<T extends HTMLElement = HTMLDivElement>(opts: Options = {}) {
  const { threshold = 0.15, once = true, delay = 0 } = opts;
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once, delay]);

  return { ref, visible };
}