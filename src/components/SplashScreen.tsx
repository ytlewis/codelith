import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const strataRefs = useRef<(SVGRectElement | null)[]>([]);
  const dotRef = useRef<SVGCircleElement>(null);
  const dotCoreRef = useRef<SVGCircleElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();

    // ── 1. Initial state ──
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(iconRef.current, { scale: 0.4, opacity: 0, transformOrigin: 'center center' });
    gsap.set(strataRefs.current, { scaleX: 0, transformOrigin: 'left center', opacity: 0 });
    gsap.set(dotRef.current, { scale: 0, opacity: 0, transformOrigin: 'center center' });
    gsap.set(dotCoreRef.current, { scale: 0, opacity: 0, transformOrigin: 'center center' });
    gsap.set(wordmarkRef.current, { opacity: 0, y: 20 });
    gsap.set(taglineRef.current, { opacity: 0, y: 12 });
    gsap.set(progressRef.current, { opacity: 0 });
    gsap.set(progressFillRef.current, { scaleX: 0, transformOrigin: 'left center' });

    // ── 2. Icon bounces in ──
    tl.to(iconRef.current, {
      scale: 1, opacity: 1, duration: 0.7,
      ease: 'back.out(1.8)',
    })

    // ── 3. Strata bars sweep in left-to-right, staggered ──
    .to(strataRefs.current, {
      scaleX: 1, opacity: 1, duration: 0.5,
      stagger: 0.07, ease: 'power3.out',
    }, '-=0.3')

    // ── 4. Cursor dot pops in with glow pulse ──
    .to([dotRef.current, dotCoreRef.current], {
      scale: 1, opacity: 1, duration: 0.4,
      ease: 'back.out(2.5)',
    }, '-=0.1')
    .to(dotRef.current, {
      scale: 1.35, duration: 0.35, ease: 'power1.inOut', yoyo: true, repeat: 3,
    }, '+=0.05')

    // ── 5. Wordmark fades up ──
    .to(wordmarkRef.current, {
      opacity: 1, y: 0, duration: 0.55, ease: 'power2.out',
    }, '-=0.2')

    // ── 6. Tagline fades up ──
    .to(taglineRef.current, {
      opacity: 1, y: 0, duration: 0.45, ease: 'power2.out',
    }, '-=0.2')

    // ── 7. Progress bar appears and fills ──
    .to(progressRef.current, { opacity: 1, duration: 0.3 }, '+=0.1')
    .to(progressFillRef.current, {
      scaleX: 1, duration: 1.4, ease: 'power1.inOut',
    })

    // ── 8. Everything scales up and fades out ──
    .to(containerRef.current, {
      opacity: 0, scale: 1.04, duration: 0.6, ease: 'power2.in',
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    }, '+=0.15');

    return () => { tl.kill(); };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #0a2540 50%, #0d1b2a 100%)' }}
    >
      {/* Ambient background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #0077ff 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Icon ── */}
      <svg
        ref={iconRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        className="w-28 h-28 mb-8 drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 0 24px rgba(0,212,255,0.35))' }}
      >
        <defs>
          <linearGradient id="sp-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d1b2a"/>
            <stop offset="100%" stopColor="#1a2e44"/>
          </linearGradient>
          <linearGradient id="sp-s1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00d4ff"/>
            <stop offset="100%" stopColor="#0099cc"/>
          </linearGradient>
          <linearGradient id="sp-s2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00b8e6"/>
            <stop offset="100%" stopColor="#0077aa"/>
          </linearGradient>
          <linearGradient id="sp-s3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#009acc"/>
            <stop offset="100%" stopColor="#005588"/>
          </linearGradient>
          <linearGradient id="sp-s4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#007aaa"/>
            <stop offset="100%" stopColor="#003d66"/>
          </linearGradient>
          <linearGradient id="sp-s5" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#005c88"/>
            <stop offset="100%" stopColor="#002244"/>
          </linearGradient>
          <filter id="sp-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <clipPath id="sp-cClip">
            <path d="M32 4 A28 28 0 1 0 32 60 A28 28 0 0 0 32 4 Z M32 14 A18 18 0 1 1 32 50 A18 18 0 0 1 32 14 Z" fillRule="evenodd"/>
          </clipPath>
        </defs>

        <rect width="64" height="64" rx="14" fill="url(#sp-bg)"/>
        <rect width="64" height="64" rx="14" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.08"/>

        <g clipPath="url(#sp-cClip)">
          <rect ref={el => { strataRefs.current[0] = el; }} x="4" y="8"  width="40" height="9"  rx="1" fill="url(#sp-s1)" opacity="0.95"/>
          <rect ref={el => { strataRefs.current[1] = el; }} x="4" y="19" width="40" height="8"  rx="1" fill="url(#sp-s2)" opacity="0.92"/>
          <rect ref={el => { strataRefs.current[2] = el; }} x="4" y="29" width="40" height="8"  rx="1" fill="url(#sp-s3)" opacity="0.90"/>
          <rect ref={el => { strataRefs.current[3] = el; }} x="4" y="39" width="40" height="8"  rx="1" fill="url(#sp-s4)" opacity="0.88"/>
          <rect ref={el => { strataRefs.current[4] = el; }} x="4" y="49" width="40" height="9"  rx="1" fill="url(#sp-s5)" opacity="0.85"/>
          <rect x="4" y="8"  width="40" height="1.5" rx="0.5" fill="#ffffff" opacity="0.18"/>
          <rect x="4" y="19" width="40" height="1.5" rx="0.5" fill="#ffffff" opacity="0.14"/>
          <rect x="4" y="29" width="40" height="1.5" rx="0.5" fill="#ffffff" opacity="0.12"/>
          <rect x="4" y="39" width="40" height="1.5" rx="0.5" fill="#ffffff" opacity="0.10"/>
          <rect x="4" y="49" width="40" height="1.5" rx="0.5" fill="#ffffff" opacity="0.08"/>
        </g>

        <circle ref={dotRef}     cx="50" cy="32" r="4.5" fill="#00d4ff" filter="url(#sp-glow)" opacity="0.95"/>
        <circle ref={dotCoreRef} cx="50" cy="32" r="2"   fill="#ffffff" opacity="0.9"/>
      </svg>

      {/* ── Wordmark ── */}
      <div ref={wordmarkRef} className="flex items-baseline gap-0 mb-2">
        <span
          className="text-5xl font-extrabold tracking-tight"
          style={{
            fontFamily: "'Syne', sans-serif",
            background: 'linear-gradient(90deg, #00d4ff 0%, #ffffff 60%, #7dd3fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Code
        </span>
        <span
          className="text-5xl font-extrabold tracking-tight"
          style={{
            fontFamily: "'Syne', sans-serif",
            background: 'linear-gradient(90deg, #0077aa 0%, #00b8e6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          lith
        </span>
      </div>

      {/* ── Tagline ── */}
      <div
        ref={taglineRef}
        className="text-sm tracking-[0.35em] uppercase mb-10"
        style={{ color: 'rgba(0,212,255,0.6)', fontFamily: "'Inter', sans-serif" }}
      >
        Crafting Digital Excellence
      </div>

      {/* ── Progress bar ── */}
      <div ref={progressRef} className="flex flex-col items-center gap-2">
        <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(0,212,255,0.12)' }}>
          <div
            ref={progressFillRef}
            className="h-full w-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #00d4ff, #0077ff)' }}
          />
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(0,212,255,0.35)' }}>
          Loading
        </span>
      </div>
    </div>
  );
}
