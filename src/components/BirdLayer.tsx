interface BirdProps {
  scrollProgress: number;
}

function Bird({ x, y, scale, delay }: { x: string; y: string; scale: number; delay: number }) {
  return (
    <svg
      viewBox="0 0 40 20"
      fill="none"
      className="absolute"
      style={{
        left: x,
        top: y,
        width: `${30 * scale}px`,
        animation: `fly-bird ${12 + delay * 2}s linear infinite`,
        animationDelay: `${-delay * 3}s`,
        opacity: 0.5,
      }}
    >
      <path
        d="M0 10 Q10 0 20 10 Q30 0 40 10"
        stroke="hsl(var(--cloud-light))"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export default function BirdLayer({ scrollProgress }: BirdProps) {
  // Birds visible between 50-90%
  const opacity = scrollProgress < 0.4
    ? 0
    : scrollProgress > 0.9
      ? Math.max(0, 1 - (scrollProgress - 0.9) / 0.1)
      : Math.min(1, (scrollProgress - 0.4) / 0.1);

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden" style={{ opacity }}>
      <Bird x="10%" y="20%" scale={1} delay={0} />
      <Bird x="30%" y="35%" scale={0.7} delay={1} />
      <Bird x="60%" y="15%" scale={0.9} delay={2} />
      <Bird x="75%" y="40%" scale={0.6} delay={3} />
      <Bird x="45%" y="25%" scale={0.8} delay={4} />
    </div>
  );
}
