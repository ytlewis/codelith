import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Watch for modal open state via body attribute
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setModalOpen(document.body.hasAttribute('data-modal-open'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-modal-open'] });
    return () => observer.disconnect();
  }, []);

  // Move the sliding indicator to the active (or hovered) link
  useEffect(() => {
    const target = hovered ?? location.pathname;
    const el = linkRefs.current[target];
    const nav = navRef.current;
    if (!el || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicatorStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
    });
  }, [hovered, location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 flex items-start justify-between px-6 pt-5 pointer-events-none transition-opacity duration-200 ${modalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

      {/* Logo */}
      <Link
        to="/"
        className="pointer-events-auto font-heading text-xl font-bold text-foreground tracking-tight
                   px-4 py-2 rounded-full backdrop-blur-md
                   bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10
                   shadow-sm hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
      >
        Codelith
      </Link>

      {/* Centered pill nav */}
      <div
        className={`
          pointer-events-auto absolute left-1/2 -translate-x-1/2
          flex items-center gap-1 px-2 py-2 rounded-full
          backdrop-blur-xl border transition-all duration-500
          ${isScrolled
            ? 'bg-background/70 border-border/60 shadow-lg shadow-black/10'
            : 'bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 shadow-md'}
        `}
        ref={navRef}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Sliding background indicator */}
        <span
          className="absolute top-2 bottom-2 rounded-full bg-foreground/10 dark:bg-white/10 transition-all duration-300 ease-out pointer-events-none"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />

        {links.map(({ to, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              ref={(el) => { linkRefs.current[to] = el; }}
              onMouseEnter={() => setHovered(to)}
              className={`
                relative z-10 px-5 py-1.5 rounded-full text-sm font-medium
                transition-colors duration-200 whitespace-nowrap
                ${isActive
                  ? 'text-foreground dark:text-white'
                  : 'text-foreground/60 dark:text-white/50 hover:text-foreground dark:hover:text-white'}
              `}
            >
              {label}
              {/* Active dot */}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
