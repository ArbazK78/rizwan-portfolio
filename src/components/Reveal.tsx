import useReveal from '../hooks/useReveal';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface Props {
  children: React.ReactNode;
  direction?: Direction;   // slide direction
  delay?: number;          // ms delay
  duration?: number;       // ms transition duration
  distance?: number;       // px travel distance
  threshold?: number;      // intersection threshold
  style?: React.CSSProperties;
  className?: string;
}

const getTranslate = (dir: Direction, dist: number): string => {
  switch (dir) {
    case 'up':    return `translateY(${dist}px)`;
    case 'down':  return `translateY(-${dist}px)`;
    case 'left':  return `translateX(${dist}px)`;
    case 'right': return `translateX(-${dist}px)`;
    default:      return 'none';
  }
};

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  distance = 28,
  threshold = 0.1,
  style,
  className,
}: Props) {
  const { ref, visible } = useReveal({ threshold, delay });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : getTranslate(direction, distance),
        // cubic-bezier gives a snappier, more premium feel than plain ease
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1), transform ${duration}ms cubic-bezier(0.22,1,0.36,1)`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}