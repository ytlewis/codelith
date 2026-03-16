import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const btnRef = useRef<HTMLButtonElement>(null);
  const sunRef = useRef<SVGSVGElement>(null);
  const moonRef = useRef<SVGSVGElement>(null);
  const raysRef = useRef<SVGGElement>(null);
  const starsRef = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  useEffect(() => {
    if (!btnRef.current) return;
    gsap.fromTo(btnRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: 'back.out(2)', delay: 0.3 }
    );
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const btn = btnRef.current;
    if (!btn) return;

    gsap.timeline()
      .to(btn, { scale: 0.8, duration: 0.1, ease: 'power2.in' })
      .to(btn, { scale: 1.15, duration: 0.15, ease: 'back.out(3)' })
      .to(btn, { scale: 1, duration: 0.2, ease: 'elastic.out(1, 0.5)' });

    if (newTheme === 'dark') {
      // switching TO dark → show sun (so user knows clicking goes to light)
      gsap.to(moonRef.current, { rotation: 90, scale: 0, opacity: 0, duration: 0.35, ease: 'back.in(2)', transformOrigin: 'center' });
      gsap.to(starsRef.current, { scale: 0, opacity: 0, duration: 0.2, stagger: 0.04 });
      gsap.fromTo(sunRef.current,
        { rotation: -90, scale: 0, opacity: 0, transformOrigin: 'center' },
        { rotation: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)', delay: 0.2 }
      );
      gsap.fromTo(raysRef.current,
        { opacity: 0, scale: 0.5, transformOrigin: 'center' },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)', delay: 0.3 }
      );
      gsap.to(btn, { backgroundColor: 'rgba(15,23,42,0.9)', borderColor: 'rgba(99,102,241,0.5)', duration: 0.4 });
    } else {
      // switching TO light → show moon (so user knows clicking goes to dark)
      gsap.to(sunRef.current, { rotation: 90, scale: 0, opacity: 0, duration: 0.35, ease: 'back.in(2)', transformOrigin: 'center' });
      gsap.to(raysRef.current, { opacity: 0, scale: 0.5, duration: 0.25, transformOrigin: 'center' });
      gsap.fromTo(moonRef.current,
        { rotation: -90, scale: 0, opacity: 0, transformOrigin: 'center' },
        { rotation: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)', delay: 0.2 }
      );
      gsap.fromTo(starsRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, stagger: 0.06, ease: 'back.out(3)', delay: 0.3 }
      );
      gsap.to(btn, { backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(251,191,36,0.5)', duration: 0.4 });
    }

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const isDark = theme === 'dark';

  // In light mode → show moon (target = dark). In dark mode → show sun (target = light).
  const showSun = isDark;
  const showMoon = !isDark;

  return (
    <button
      ref={btnRef}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="fixed top-4 right-16 sm:top-6 sm:right-6 z-50 w-11 h-11 rounded-full
                 border flex items-center justify-center overflow-hidden
                 transition-shadow duration-300 hover:shadow-lg"
      style={{
        backgroundColor: isDark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.15)',
        borderColor: isDark ? 'rgba(99,102,241,0.5)' : 'rgba(251,191,36,0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <svg viewBox="0 0 32 32" width="22" height="22" xmlns="http://www.w3.org/2000/svg">

        {/* Sun rays — visible in dark mode (target = light) */}
        <g ref={raysRef} style={{ opacity: showSun ? 1 : 0 }}>
          {[0,45,90,135,180,225,270,315].map((angle) => (
            <line
              key={angle}
              x1={16 + Math.cos((angle * Math.PI) / 180) * 9}
              y1={16 + Math.sin((angle * Math.PI) / 180) * 9}
              x2={16 + Math.cos((angle * Math.PI) / 180) * 12}
              y2={16 + Math.sin((angle * Math.PI) / 180) * 12}
              stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round"
            />
          ))}
        </g>

        {/* Sun disc — visible in dark mode */}
        <svg ref={sunRef} style={{ overflow: 'visible', opacity: showSun ? 1 : 0 }}>
          <circle cx="16" cy="16" r="5.5" fill="#fde047" />
          <circle cx="16" cy="16" r="4" fill="#fbbf24" />
        </svg>

        {/* Moon — visible in light mode (target = dark) */}
        <svg ref={moonRef} style={{ overflow: 'visible', opacity: showMoon ? 1 : 0 }}>
          <path d="M18 10 A8 8 0 1 0 18 22 A5.5 5.5 0 1 1 18 10 Z" fill="#e0e7ff" />
          <circle cx="14" cy="18" r="1" fill="rgba(148,163,184,0.4)" />
          <circle cx="17" cy="14.5" r="0.7" fill="rgba(148,163,184,0.35)" />
        </svg>

        {/* Stars — visible in light mode alongside moon */}
        {[[25,8],[27,14],[23,5],[28,20]].map(([cx, cy], i) => (
          <circle
            key={i}
            ref={el => { starsRef.current[i] = el; }}
            cx={cx} cy={cy} r={i % 2 === 0 ? 0.9 : 1.2}
            fill="#e0e7ff"
            style={{ opacity: showMoon ? 1 : 0 }}
          />
        ))}
      </svg>
    </button>
  );
}
