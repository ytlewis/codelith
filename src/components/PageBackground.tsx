import { useState, useEffect } from 'react';
import FloatingLines from './FloatingLines';
import CloudLayer from './CloudLayer';
import RainLayer from './RainLayer';
import BirdLayer from './BirdLayer';
import PaperPlane from './PaperPlane';
import SunLayer from './SunLayer';

interface PageBackgroundProps {
  scrollProgress?: number;
}

export default function PageBackground({ scrollProgress = 0 }: PageBackgroundProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Full-page fixed background */}
      <div className="fixed inset-0 z-0 bg-space" />

      {isDark ? (
        <>
          <FloatingLines scrollProgress={scrollProgress} />
          <CloudLayer scrollProgress={scrollProgress} />
          <RainLayer scrollProgress={scrollProgress} />
          <BirdLayer scrollProgress={scrollProgress} />
          <PaperPlane scrollProgress={scrollProgress} />
        </>
      ) : (
        <>
          <SunLayer scrollProgress={scrollProgress} />
          <BirdLayer scrollProgress={scrollProgress} />
        </>
      )}

      {/* Depth gradient overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none transition-all duration-1000"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at center, transparent 30%, hsl(var(--space-dark) / ${0.6 - scrollProgress * 0.4}) 100%)`
            : `radial-gradient(ellipse at top right, rgba(250, 204, 21, 0.08) 0%, transparent 50%)`,
        }}
      />
    </>
  );
}
