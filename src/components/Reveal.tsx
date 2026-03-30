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
  duration = 600,
  distance = 32,
  threshold = 0.12,
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
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}