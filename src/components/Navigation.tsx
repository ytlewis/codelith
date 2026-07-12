import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface NavItem {
  to?: string;
  label: string;
  type: 'link' | 'dropdown';
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { to: '/', label: 'Home', type: 'link' },
  {
    type: 'dropdown',
    label: 'About',
    children: [
      { to: '/about', label: 'Our Story', type: 'link' },
      { to: '/about#team', label: 'The Team', type: 'link' },
      { to: '/about#careers', label: 'Careers', type: 'link' },
    ]
  },
  {
    type: 'dropdown',
    label: 'Services',
    children: [
      { to: '/services#web', label: 'Web Development', type: 'link' },
      { to: '/services#mobile', label: 'Mobile Apps', type: 'link' },
      { to: '/services#design', label: 'UI/UX Design', type: 'link' },
      { to: '/services#ai', label: 'AI/ML Integration', type: 'link' },
    ]
  },
  {
    type: 'dropdown',
    label: 'Projects',
    children: [
      { to: '/projects', label: 'All Projects', type: 'link' },
      { to: '/projects#featured', label: 'Featured Work', type: 'link' },
      { to: '/projects#case-studies', label: 'Case Studies', type: 'link' },
    ]
  },
  { to: '/contact', label: 'Contact', type: 'link' },
];

export default function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setModalOpen(document.body.hasAttribute('data-modal-open'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-modal-open'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = hovered ?? location.pathname;
    const el = linkRefs.current[target];
    const nav = navRef.current;
    if (!el || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicatorStyle({ left: elRect.left - navRect.left, width: elRect.width });
  }, [hovered, location.pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5
        pointer-events-none transition-opacity duration-200
        ${modalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

        {/* Logo */}
        <Link to="/"
          className="pointer-events-auto font-heading text-lg sm:text-xl font-bold text-foreground tracking-tight
                     px-3 sm:px-4 py-2 rounded-full backdrop-blur-md
                     bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10
                     shadow-sm hover:bg-white/20 transition-all duration-300 z-50">
          Codelith
        </Link>

        {/* Desktop pill nav — hidden on mobile */}
        <div
          ref={navRef}
          onMouseLeave={() => setHovered(null)}
          className={`
            pointer-events-auto hidden md:flex items-center gap-1 px-2 py-2 rounded-full
            backdrop-blur-xl border transition-all duration-500 absolute left-1/2 -translate-x-1/2
            ${isScrolled
              ? 'bg-background/70 border-border/60 shadow-lg shadow-black/10'
              : 'bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 shadow-md'}
          `}
        >
          <span
            className="absolute top-2 bottom-2 rounded-full bg-foreground/10 dark:bg-white/10 transition-all duration-300 ease-out pointer-events-none"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
          {navItems.map((item) => {
            if (item.type === 'link') {
              const isActive = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to!}
                  ref={(el) => { if (item.to) linkRefs.current[item.to] = el; }}
                  onMouseEnter={() => setHovered(item.to)}
                  className={`relative z-10 px-5 py-1.5 rounded-full text-sm font-medium
                    transition-colors duration-200 whitespace-nowrap
                    ${isActive ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-white/50 hover:text-foreground dark:hover:text-white'}`}>
                  {item.label}
                  {isActive && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />}
                </Link>
              );
            } else {
              return (
                <DropdownMenu.Root key={item.label}>
                  <DropdownMenu.Trigger asChild>
                    <button className="relative z-10 px-5 py-1.5 rounded-full text-sm font-medium
                      transition-colors duration-200 whitespace-nowrap
                      text-foreground/60 dark:text-white/50 hover:text-foreground dark:hover:text-white
                      flex items-center gap-1">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="mt-2 bg-background/95 backdrop-blur-xl border border-border/60 rounded-xl p-2 shadow-lg shadow-black/10 z-50"
                      sideOffset={5}
                    >
                      {item.children?.map((child) => (
                        <DropdownMenu.Item key={child.to} asChild>
                          <Link
                            to={child.to!}
                            className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors duration-200"
                          >
                            {child.label}
                          </Link>
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              );
            }
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="pointer-events-auto md:hidden p-2 rounded-full backdrop-blur-md
                     bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10
                     text-foreground hover:bg-white/20 transition-all duration-200 z-50"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-30 md:hidden transition-all duration-300
        ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        {/* Panel */}
        <div className={`absolute top-0 right-0 h-full w-64 bg-background/95 backdrop-blur-xl
          border-l border-border shadow-2xl flex flex-col pt-20 pb-8 px-6 gap-2
          transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {navItems.map((item) => {
            if (item.type === 'link') {
              const isActive = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to!}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200
                    ${isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/70 hover:text-foreground hover:bg-secondary'}`}>
                  {item.label}
                </Link>
              );
            } else {
              return (
                <div key={item.label} className="space-y-1">
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </div>
                  {item.children?.map((child) => {
                    const isActive = location.pathname === child.to;
                    return (
                      <Link key={child.to} to={child.to!}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                          ${isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground/70 hover:text-foreground hover:bg-secondary'}`}>
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
