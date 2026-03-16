import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface PaperPlaneProps {
  scrollProgress: number;
}

export default function PaperPlane({ scrollProgress }: PaperPlaneProps) {
  const planeRef = useRef<SVGSVGElement>(null);

  // Active between 30-60% scroll
  const visible = scrollProgress > 0.25 && scrollProgress < 0.65;
  const localProgress = Math.max(0, Math.min(1, (scrollProgress - 0.25) / 0.4));

  const x = localProgress * 110 - 5; // -5% to 105%
  const y = 30 + Math.sin(localProgress * Math.PI * 2) * 15; // gentle curve
  const rotation = Math.cos(localProgress * Math.PI * 2) * 15;

  return (
    <div
      className="fixed inset-0 z-[3] pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}
    >
      <svg
        ref={planeRef}
        viewBox="0 0 60 40"
        fill="none"
        className="absolute"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: '50px',
          transform: `rotate(${rotation}deg)`,
          transition: 'none',
        }}
      >
        <path
          d="M5 20 L25 10 L55 20 L25 15 Z"
          fill="hsl(var(--foreground))"
          opacity="0.6"
        />
        <path
          d="M5 20 L25 30 L55 20 L25 25 Z"
          fill="hsl(var(--foreground))"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
