interface SunLayerProps {
  scrollProgress: number;
}

const CLOUDS = [
  { id: 1, top: '10%', dur: 90,  delay: 0,   scale: 1.3,  opacity: 0.95 },
  { id: 2, top: '24%', dur: 120, delay: -35, scale: 0.8,  opacity: 0.85 },
  { id: 3, top: '6%',  dur: 150, delay: -70, scale: 1.6,  opacity: 0.9  },
  { id: 4, top: '38%', dur: 100, delay: -15, scale: 0.65, opacity: 0.8  },
  { id: 5, top: '16%', dur: 130, delay: -55, scale: 1.1,  opacity: 0.88 },
  { id: 6, top: '30%', dur: 110, delay: -80, scale: 0.9,  opacity: 0.82 },
];

function Cloud({ top, dur, delay, scale, opacity }: {
  top: string; dur: number; delay: number; scale: number; opacity: number;
}) {
  const w = 260 * scale;
  const h = 110 * scale;
  const id = `cloud-grad-${dur}-${delay}`.replace(/[^a-z0-9]/gi, '');

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top,
        left: '-30%',
        width: w,
        height: h,
        opacity,
        animation: `drift-cloud ${dur}s linear infinite`,
        animationDelay: `${delay}s`,
        filter: 'drop-shadow(0 8px 16px rgba(100,140,200,0.18))',
      }}
    >
      <svg
        viewBox="0 0 260 110"
        width={w}
        height={h}
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <defs>
          {/* Main cloud gradient — bright top, slightly blue-grey underside */}
          <radialGradient id={`${id}-top`} cx="50%" cy="30%" r="60%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
            <stop offset="60%"  stopColor="#f0f6ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ddeaf8" stopOpacity="1" />
          </radialGradient>

          {/* Underside shadow gradient */}
          <linearGradient id={`${id}-shadow`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#c8ddf0" stopOpacity="0" />
            <stop offset="100%" stopColor="#a8c4e0" stopOpacity="0.45" />
          </linearGradient>

          {/* Soft blur filter for wispy edges */}
          <filter id={`${id}-blur`} x="-10%" y="-20%" width="120%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Clip to keep base flat */}
          <clipPath id={`${id}-clip`}>
            <rect x="0" y="0" width="260" height="110" />
          </clipPath>
        </defs>

        <g clipPath={`url(#${id}-clip)`}>
          {/* ── Puff layer 1: back/large base puffs (slightly grey) ── */}
          <ellipse cx="130" cy="82" rx="115" ry="30" fill="#ddeaf8" opacity="0.6" />

          {/* ── Puff layer 2: mid puffs ── */}
          <circle cx="55"  cy="72" r="34" fill={`url(#${id}-top)`} />
          <circle cx="100" cy="60" r="42" fill={`url(#${id}-top)`} />
          <circle cx="155" cy="65" r="38" fill={`url(#${id}-top)`} />
          <circle cx="205" cy="74" r="30" fill={`url(#${id}-top)`} />
          <circle cx="28"  cy="80" r="24" fill={`url(#${id}-top)`} />
          <circle cx="235" cy="80" r="22" fill={`url(#${id}-top)`} />

          {/* ── Puff layer 3: top highlight puffs (brightest) ── */}
          <circle cx="85"  cy="48" r="30" fill="white" opacity="0.95" />
          <circle cx="130" cy="38" r="36" fill="white" opacity="0.98" />
          <circle cx="175" cy="50" r="28" fill="white" opacity="0.92" />
          <circle cx="58"  cy="58" r="20" fill="white" opacity="0.88" />
          <circle cx="200" cy="60" r="22" fill="white" opacity="0.85" />

          {/* ── Flat base fill ── */}
          <rect x="10" y="78" width="240" height="32" fill={`url(#${id}-top)`} />

          {/* ── Underside shadow ── */}
          <ellipse cx="130" cy="90" rx="108" ry="14" fill={`url(#${id}-shadow)`} />

          {/* ── Wispy trailing edges ── */}
          <ellipse cx="18"  cy="84" rx="18" ry="9"  fill="#e8f2fc" opacity="0.7" filter={`url(#${id}-blur)`} />
          <ellipse cx="242" cy="86" rx="16" ry="8"  fill="#e8f2fc" opacity="0.65" filter={`url(#${id}-blur)`} />
          <ellipse cx="130" cy="95" rx="90" ry="7"  fill="#ddeaf8" opacity="0.5"  filter={`url(#${id}-blur)`} />

          {/* ── Highlight sheen on top ── */}
          <ellipse cx="118" cy="36" rx="38" ry="12" fill="white" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}

export default function SunLayer({ scrollProgress }: SunLayerProps) {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">

      {/* Clouds */}
      {CLOUDS.map((c) => (
        <Cloud key={c.id} top={c.top} dur={c.dur} delay={c.delay} scale={c.scale} opacity={c.opacity} />
      ))}

      {/* Sun */}
      <div className="absolute top-16 right-16 md:top-24 md:right-32">
        {/* Outer atmospheric halo */}
        <div
          className="absolute w-56 h-56 md:w-64 md:h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,236,100,0.18) 0%, rgba(255,200,50,0.08) 50%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {/* Glow pulse */}
        <div
          className="absolute w-40 h-40 md:w-48 md:h-48 bg-yellow-300 rounded-full blur-3xl opacity-25 animate-pulse"
          style={{ animationDuration: '5s' }}
        />
        {/* Core disc */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 rounded-full"
          style={{
            background: 'radial-gradient(circle at 38% 38%, #fff9c4, #fde047 45%, #facc15 75%, #f59e0b)',
            boxShadow: '0 0 40px 12px rgba(253,224,71,0.35), 0 0 80px 30px rgba(250,204,21,0.15)',
          }}
        />
      </div>

      {/* Light rays */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 right-0 origin-top-right"
          style={{
            width: '1.5px',
            height: `${35 + i * 5}vh`,
            background: 'linear-gradient(180deg, rgba(253,224,71,0.18) 0%, transparent 100%)',
            transform: `rotate(${-40 + i * 12}deg) translateX(${80 + i * 45}px)`,
            opacity: 0.25 + scrollProgress * 0.15,
          }}
        />
      ))}
    </div>
  );
}
