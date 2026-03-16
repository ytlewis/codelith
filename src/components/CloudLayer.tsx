import { useEffect, useRef } from 'react';

interface CloudLayerProps {
  scrollProgress: number;
}

export default function CloudLayer({ scrollProgress }: CloudLayerProps) {
  // Show clouds between 20-80% scroll
  const opacity = scrollProgress < 0.15
    ? 0
    : scrollProgress > 0.85
      ? Math.max(0, 1 - (scrollProgress - 0.85) / 0.15)
      : Math.min(1, (scrollProgress - 0.15) / 0.15);

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      {/* Realistic cloud shapes with varied sizes and speeds */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="cloud-shape absolute"
          style={{
            width: `${180 + i * 100}px`,
            height: `${70 + i * 35}px`,
            borderRadius: `${40 + i * 10}% ${60 + i * 5}% ${50 + i * 8}% ${55 + i * 6}% / ${60 + i * 5}% ${50 + i * 7}% ${55 + i * 6}% ${45 + i * 8}%`,
            top: `${10 + (i * 11) % 70}%`,
            left: `${-15 + (i * 13) % 100}%`,
            animation: `float-cloud ${25 + i * 8}s ease-in-out infinite`,
            animationDelay: `${-i * 4}s`,
            opacity: 0.2 + (scrollProgress * 0.3),
            transform: `scale(${0.8 + (i % 3) * 0.2})`,
          }}
        />
      ))}
    </div>
  );
}
