import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function useSwing(svgOriginX: number, svgOriginY: number) {
  const ref = useRef<SVGGElement>(null);
  const anim = useRef<gsap.core.Tween | null>(null);

  const onEnter = () => {
    if (!ref.current) return;
    anim.current?.kill();
    // svgOrigin pins the rotation point in SVG coordinate space
    gsap.set(ref.current, { svgOrigin: `${svgOriginX} ${svgOriginY}` });
    anim.current = gsap.to(ref.current, {
      rotation: 5,
      duration: 0.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    anim.current?.kill();
    anim.current = null;
    gsap.to(ref.current, {
      rotation: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  return { ref, onEnter, onLeave };
}

export default function GroundLayer() {
  const svgRef = useRef<SVGSVGElement>(null);

  const leftTree  = useSwing(155, 155);
  const rightTree = useSwing(1285, 155);
  const centPine  = useSwing(720, 155);
  const midLeft   = useSwing(380, 155);
  const midRight  = useSwing(1060, 155);

  return (
    <svg ref={svgRef} className="w-full block" viewBox="0 0 1440 180"
      preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg"
      style={{ marginBottom: -2, maxHeight: 180 }}>
      <defs>
        <linearGradient id="gl-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d5a1b"/>
          <stop offset="60%" stopColor="#1e3d0f"/>
          <stop offset="100%" stopColor="#3b2008"/>
        </linearGradient>
        <linearGradient id="gl-trunk1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3d2008"/>
          <stop offset="40%" stopColor="#6b3a1a"/>
          <stop offset="100%" stopColor="#2a1505"/>
        </linearGradient>
        <linearGradient id="gl-trunk2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2e1a08"/>
          <stop offset="50%" stopColor="#5a3015"/>
          <stop offset="100%" stopColor="#1e1004"/>
        </linearGradient>
        <radialGradient id="gl-canopy1" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#4a8c2a"/>
          <stop offset="60%" stopColor="#2d6b12"/>
          <stop offset="100%" stopColor="#1a4a08"/>
        </radialGradient>
        <radialGradient id="gl-canopy2" cx="45%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#3a7a20"/>
          <stop offset="60%" stopColor="#245c0e"/>
          <stop offset="100%" stopColor="#143d06"/>
        </radialGradient>
        <radialGradient id="gl-pine" cx="50%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#2e6b18"/>
          <stop offset="100%" stopColor="#0f3008"/>
        </radialGradient>
        <radialGradient id="gl-bush1" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#3d8c22"/>
          <stop offset="100%" stopColor="#1a4a08"/>
        </radialGradient>
        <radialGradient id="gl-bush2" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#4a9c2a"/>
          <stop offset="100%" stopColor="#205510"/>
        </radialGradient>
        <radialGradient id="gl-mush" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#e05c2a"/>
          <stop offset="100%" stopColor="#8b2500"/>
        </radialGradient>
      </defs>

      {/* Ground */}
      <rect x="0" y="120" width="1440" height="60" fill="url(#gl-ground)"/>
      <path d="M0 122 Q120 112 240 122 Q360 132 480 118 Q600 106 720 122 Q840 136 960 118 Q1080 102 1200 118 Q1320 132 1440 120 L1440 180 L0 180 Z" fill="#2d5a1b"/>
      <path d="M0 138 Q180 126 360 138 Q540 150 720 134 Q900 118 1080 136 Q1260 152 1440 138 L1440 180 L0 180 Z" fill="#245010" opacity="0.5"/>

      {/* LEFT TREE */}
      <g ref={leftTree.ref} onMouseEnter={leftTree.onEnter} onMouseLeave={leftTree.onLeave} style={{ cursor: 'pointer' }}>
        <path d="M155 155 C152 130 154 100 158 50" fill="none" stroke="url(#gl-trunk1)" strokeWidth="10" strokeLinecap="round"/>
        <path d="M158 85 C144 76 124 70 100 68" fill="none" stroke="#4a2a10" strokeWidth="5" strokeLinecap="round"/>
        <path d="M160 75 C176 66 198 62 220 63" fill="none" stroke="#4a2a10" strokeWidth="5" strokeLinecap="round"/>
        <ellipse cx="158" cy="44" rx="48" ry="34" fill="url(#gl-canopy2)"/>
        <ellipse cx="100" cy="62" rx="36" ry="26" fill="url(#gl-canopy2)"/>
        <ellipse cx="218" cy="58" rx="32" ry="24" fill="url(#gl-canopy2)"/>
        <ellipse cx="152" cy="32" rx="40" ry="28" fill="url(#gl-canopy1)"/>
        <ellipse cx="108" cy="52" rx="28" ry="20" fill="url(#gl-canopy1)"/>
        <ellipse cx="210" cy="48" rx="26" ry="19" fill="url(#gl-canopy1)"/>
      </g>

      {/* RIGHT TREE */}
      <g ref={rightTree.ref} onMouseEnter={rightTree.onEnter} onMouseLeave={rightTree.onLeave} style={{ cursor: 'pointer' }}>
        <path d="M1285 155 C1282 130 1284 100 1288 50" fill="none" stroke="url(#gl-trunk2)" strokeWidth="10" strokeLinecap="round"/>
        <path d="M1288 85 C1274 76 1254 70 1230 68" fill="none" stroke="#4a2a10" strokeWidth="5" strokeLinecap="round"/>
        <path d="M1290 75 C1306 66 1328 62 1350 63" fill="none" stroke="#4a2a10" strokeWidth="5" strokeLinecap="round"/>
        <ellipse cx="1288" cy="44" rx="48" ry="34" fill="url(#gl-canopy2)"/>
        <ellipse cx="1230" cy="62" rx="36" ry="26" fill="url(#gl-canopy2)"/>
        <ellipse cx="1348" cy="58" rx="32" ry="24" fill="url(#gl-canopy2)"/>
        <ellipse cx="1282" cy="32" rx="40" ry="28" fill="url(#gl-canopy1)"/>
        <ellipse cx="1238" cy="52" rx="28" ry="20" fill="url(#gl-canopy1)"/>
        <ellipse cx="1340" cy="48" rx="26" ry="19" fill="url(#gl-canopy1)"/>
      </g>

      {/* CENTRE PINE */}
      <g ref={centPine.ref} onMouseEnter={centPine.onEnter} onMouseLeave={centPine.onLeave} style={{ cursor: 'pointer' }}>
        <rect x="717" y="110" width="6" height="45" rx="2" fill="url(#gl-trunk1)"/>
        <polygon points="720,112 700,138 740,138" fill="url(#gl-pine)"/>
        <polygon points="720,94 702,120 738,120" fill="url(#gl-pine)"/>
        <polygon points="720,78 704,104 736,104" fill="url(#gl-pine)"/>
        <polygon points="720,64 706,88 734,88" fill="url(#gl-pine)"/>
        <polygon points="720,52 708,74 732,74" fill="url(#gl-pine)"/>
        <polygon points="720,42 710,62 730,62" fill="url(#gl-pine)"/>
      </g>

      {/* MID LEFT TREE */}
      <g ref={midLeft.ref} onMouseEnter={midLeft.onEnter} onMouseLeave={midLeft.onLeave} style={{ cursor: 'pointer' }}>
        <path d="M380 155 C382 130 384 100 388 68" fill="none" stroke="url(#gl-trunk1)" strokeWidth="7" strokeLinecap="round"/>
        <ellipse cx="388" cy="60" rx="30" ry="22" fill="url(#gl-canopy2)"/>
        <ellipse cx="374" cy="52" rx="24" ry="18" fill="url(#gl-canopy1)"/>
        <ellipse cx="402" cy="54" rx="22" ry="17" fill="url(#gl-canopy1)"/>
      </g>

      {/* MID RIGHT TREE */}
      <g ref={midRight.ref} onMouseEnter={midRight.onEnter} onMouseLeave={midRight.onLeave} style={{ cursor: 'pointer' }}>
        <path d="M1060 155 C1062 130 1064 100 1068 68" fill="none" stroke="url(#gl-trunk2)" strokeWidth="7" strokeLinecap="round"/>
        <ellipse cx="1068" cy="60" rx="30" ry="22" fill="url(#gl-canopy2)"/>
        <ellipse cx="1054" cy="52" rx="24" ry="18" fill="url(#gl-canopy1)"/>
        <ellipse cx="1082" cy="54" rx="22" ry="17" fill="url(#gl-canopy1)"/>
      </g>

      {/* BUSHES */}
      <ellipse cx="290" cy="138" rx="30" ry="18" fill="url(#gl-bush1)"/>
      <ellipse cx="265" cy="143" rx="22" ry="14" fill="url(#gl-bush2)"/>
      <ellipse cx="316" cy="141" rx="20" ry="13" fill="url(#gl-bush2)"/>
      <ellipse cx="540" cy="138" rx="28" ry="17" fill="url(#gl-bush1)"/>
      <ellipse cx="516" cy="143" rx="20" ry="13" fill="url(#gl-bush2)"/>
      <ellipse cx="564" cy="141" rx="18" ry="12" fill="url(#gl-bush2)"/>
      <ellipse cx="900" cy="138" rx="28" ry="17" fill="url(#gl-bush1)"/>
      <ellipse cx="876" cy="143" rx="20" ry="13" fill="url(#gl-bush2)"/>
      <ellipse cx="924" cy="141" rx="18" ry="12" fill="url(#gl-bush2)"/>
      <ellipse cx="1150" cy="138" rx="30" ry="18" fill="url(#gl-bush1)"/>
      <ellipse cx="1125" cy="143" rx="22" ry="14" fill="url(#gl-bush2)"/>
      <ellipse cx="1175" cy="141" rx="20" ry="13" fill="url(#gl-bush2)"/>

      {/* TALL GRASS */}
      {[60,74,88,102,450,463,476,640,653,666,780,793,806,960,973,986,1240,1253,1266,1360,1373,1386].map((x, i) => {
        const h = 10 + (i % 4) * 3;
        return (
          <g key={`g${i}`}>
            <path d={`M${x} 148 C${x-2} ${148-h*0.5} ${x+1} ${148-h*0.8} ${x} ${148-h}`}
              fill="none" stroke="#3a7a20" strokeWidth="1.5" strokeLinecap="round"/>
            <ellipse cx={x} cy={148-h} rx="2" ry="3.5" fill="#8bc34a" opacity="0.8"/>
          </g>
        );
      })}

      {/* MUSHROOMS */}
      {[[430,148],[850,146],[1200,148]].map(([x,y],i) => (
        <g key={`m${i}`}>
          <rect x={x-3} y={y-8} width="6" height="8" rx="2" fill="#e8d5b0"/>
          <ellipse cx={x} cy={y-8} rx="8" ry="5" fill="url(#gl-mush)"/>
          <circle cx={x-3} cy={y-9} r="1.2" fill="white" opacity="0.7"/>
          <circle cx={x+2} cy={y-10} r="1" fill="white" opacity="0.7"/>
        </g>
      ))}

      {/* FOREGROUND GRASS */}
      {Array.from({length:55},(_,i) => {
        const x = (i/54)*1440;
        const h = 8+(i%5)*3;
        const lean = (i%3-1)*3;
        return (
          <path key={`fg${i}`}
            d={`M${x} 155 C${x+lean} ${155-h*0.5} ${x+lean*1.5} ${155-h*0.8} ${x+lean*2} ${155-h}`}
            fill="none" stroke={i%2===0?'#4a9c2a':'#3a7a20'} strokeWidth="1.2" strokeLinecap="round"/>
        );
      })}
    </svg>
  );
}
