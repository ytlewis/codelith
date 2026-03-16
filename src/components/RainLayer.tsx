interface RainLayerProps {
  scrollProgress: number;
}

export default function RainLayer({ scrollProgress }: RainLayerProps) {
  // Rain between 35-85%
  const opacity = scrollProgress < 0.3
    ? 0
    : scrollProgress > 0.85
      ? Math.max(0, 1 - (scrollProgress - 0.85) / 0.15)
      : Math.min(0.4, (scrollProgress - 0.3) / 0.2);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" style={{ opacity }}>
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            width: '1px',
            height: `${15 + Math.random() * 25}px`,
            background: `linear-gradient(to bottom, transparent, hsl(var(--cloud-light) / 0.3))`,
            animation: `rain-fall ${1 + Math.random() * 1.5}s linear infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}
