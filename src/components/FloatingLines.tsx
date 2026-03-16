interface FloatingLinesProps {
  scrollProgress: number;
}

export default function FloatingLines({ scrollProgress }: FloatingLinesProps) {
  // Sky color transitions: deep space → blue sky → overcast → ground
  // scrollProgress: 0 = top (space), 1 = bottom (ground)
  
  const skyOpacity = Math.min(1, scrollProgress * 3); // sky blue fades in early
  const overcastOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.3) / 0.3)); // grey overcast mid-scroll
  const groundOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.7) / 0.3)); // earthy ground at bottom

  // Stars fade out as sky brightens
  const starsOpacity = Math.max(0, 1 - scrollProgress * 4);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Layer 1: Deep space / night sky base */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            hsl(220 40% 4%) 0%, 
            hsl(220 35% 8%) 40%, 
            hsl(215 30% 12%) 100%
          )`,
        }}
      />

      {/* Layer 2: Stars */}
      <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: starsOpacity }}>
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              background: 'hsl(210 20% 92%)',
              opacity: 0.3 + Math.random() * 0.7,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '8%',
          right: '12%',
          opacity: Math.max(0, 1 - scrollProgress * 3),
          transition: 'opacity 0.5s',
        }}
      >
        {/* Outer atmospheric halo */}
        <div style={{
          position: 'absolute', inset: '-40px',
          background: 'radial-gradient(circle, rgba(200,220,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }}/>
        {/* Soft glow */}
        <div style={{
          position: 'absolute', inset: '-16px',
          background: 'radial-gradient(circle, rgba(180,210,255,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }}/>
        {/* Moon disc */}
        <div style={{
          width: 72, height: 72,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 38% 35%, #f0f4ff, #c8d8f0 55%, #a0b8d8)',
          boxShadow: '0 0 32px 8px rgba(180,210,255,0.18), inset -8px -4px 16px rgba(80,100,140,0.25)',
          position: 'relative',
        }}>
          {/* Craters */}
          <div style={{ position:'absolute', top:'22%', left:'28%', width:10, height:10, borderRadius:'50%', background:'rgba(100,120,160,0.18)', boxShadow:'inset 1px 1px 3px rgba(60,80,120,0.3)' }}/>
          <div style={{ position:'absolute', top:'52%', left:'55%', width:7, height:7, borderRadius:'50%', background:'rgba(100,120,160,0.15)', boxShadow:'inset 1px 1px 2px rgba(60,80,120,0.25)' }}/>
          <div style={{ position:'absolute', top:'35%', left:'62%', width:5, height:5, borderRadius:'50%', background:'rgba(100,120,160,0.12)', boxShadow:'inset 1px 1px 2px rgba(60,80,120,0.2)' }}/>
          {/* Shadow crescent to give 3D feel */}
          <div style={{
            position:'absolute', inset:0, borderRadius:'50%',
            background: 'radial-gradient(circle at 68% 60%, rgba(40,55,90,0.35) 0%, transparent 65%)',
          }}/>
        </div>
      </div>

      {/* Layer 3: Blue sky gradient (fades in as you scroll) */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: skyOpacity,
          background: `linear-gradient(180deg, 
            hsl(210 60% 55% / ${0.3 + scrollProgress * 0.5}) 0%, 
            hsl(200 50% 65% / ${0.2 + scrollProgress * 0.6}) 30%, 
            hsl(195 40% 75% / ${0.1 + scrollProgress * 0.4}) 60%,
            transparent 100%
          )`,
        }}
      />

      {/* Layer 4: Overcast / storm clouds tint */}
      <div
        className="absolute inset-0"
        style={{
          opacity: overcastOpacity * 0.6,
          background: `linear-gradient(180deg, 
            hsl(215 20% 50% / 0.4) 0%, 
            hsl(210 15% 55% / 0.5) 40%, 
            hsl(200 10% 60% / 0.3) 70%,
            transparent 100%
          )`,
        }}
      />

      {/* Layer 5: Ground / earth gradient (fades in at bottom of scroll) */}
      <div
        className="absolute inset-0"
        style={{
          opacity: groundOpacity,
          background: `linear-gradient(180deg, 
            transparent 0%, 
            transparent 20%,
            hsl(140 25% 22% / 0.3) 50%, 
            hsl(120 20% 18% / 0.6) 70%, 
            hsl(100 25% 14% / 0.85) 85%, 
            hsl(80 30% 10% / 1) 100%
          )`,
        }}
      />

      {/* Subtle horizon glow during mid-scroll */}
      <div
        className="absolute inset-0"
        style={{
          opacity: Math.max(0, Math.sin(scrollProgress * Math.PI)) * 0.4,
          background: `radial-gradient(ellipse 120% 40% at 50% 70%, 
            hsl(30 50% 70% / 0.3) 0%, 
            transparent 70%
          )`,
        }}
      />

      {/* Layer 6: Ground terrain with vegetation silhouettes */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          opacity: groundOpacity,
          height: '35vh',
        }}
      >
        {/* Rolling hills background */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: '100%' }}
        >
          {/* Far hills */}
          <path
            d="M0,220 C200,160 400,200 600,170 C800,140 1000,190 1200,160 C1300,150 1400,180 1440,170 L1440,320 L0,320 Z"
            fill="hsl(140 20% 16%)"
            opacity="0.7"
          />
          {/* Mid hills */}
          <path
            d="M0,250 C150,210 350,240 500,220 C700,195 850,235 1050,210 C1200,195 1350,225 1440,215 L1440,320 L0,320 Z"
            fill="hsl(130 22% 13%)"
            opacity="0.85"
          />
          {/* Near ground */}
          <path
            d="M0,275 C100,260 250,270 400,255 C550,245 700,265 900,250 C1050,240 1200,260 1440,248 L1440,320 L0,320 Z"
            fill="hsl(120 25% 10%)"
          />
        </svg>

        {/* Tree/vegetation silhouettes */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          style={{ height: '60%' }}
        >
          {/* Trees scattered along the ground line */}
          {[80, 200, 350, 520, 680, 850, 1020, 1150, 1300].map((x, i) => {
            const h = 40 + (i % 3) * 25;
            const w = 15 + (i % 2) * 8;
            return (
              <g key={i} opacity={0.8 + (i % 3) * 0.07}>
                {/* Trunk */}
                <rect
                  x={x + w / 2 - 2}
                  y={200 - h * 0.3}
                  width="4"
                  height={h * 0.3}
                  fill="hsl(30 30% 12%)"
                />
                {/* Canopy - triangular pine shape */}
                <path
                  d={`M${x},${200 - h * 0.3} L${x + w / 2},${200 - h} L${x + w},${200 - h * 0.3} Z`}
                  fill={`hsl(${130 + (i % 3) * 10} ${20 + (i % 2) * 8}% ${8 + (i % 3) * 3}%)`}
                />
                {/* Second canopy layer */}
                <path
                  d={`M${x + 2},${200 - h * 0.55} L${x + w / 2},${200 - h * 0.95} L${x + w - 2},${200 - h * 0.55} Z`}
                  fill={`hsl(${135 + (i % 3) * 8} ${22 + (i % 2) * 6}% ${10 + (i % 3) * 2}%)`}
                />
              </g>
            );
          })}

          {/* Bush clusters */}
          {[140, 430, 600, 780, 960, 1100, 1380].map((x, i) => (
            <ellipse
              key={`bush-${i}`}
              cx={x}
              cy={195}
              rx={12 + (i % 3) * 6}
              ry={8 + (i % 2) * 4}
              fill={`hsl(${125 + (i % 4) * 8} ${18 + (i % 3) * 5}% ${9 + (i % 3) * 2}%)`}
              opacity={0.85}
            />
          ))}

          {/* Grass tufts at bottom */}
          {[...Array(20)].map((_, i) => {
            const gx = i * 75 + Math.random() * 30;
            return (
              <g key={`grass-${i}`} opacity={0.6}>
                <line x1={gx} y1={200} x2={gx - 3} y2={190} stroke="hsl(120 20% 15%)" strokeWidth="1.5" />
                <line x1={gx} y1={200} x2={gx + 2} y2={188} stroke="hsl(130 22% 13%)" strokeWidth="1.5" />
                <line x1={gx} y1={200} x2={gx + 5} y2={191} stroke="hsl(125 18% 14%)" strokeWidth="1.5" />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
