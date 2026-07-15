import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageBackground from '@/components/PageBackground';
import { ZoomParallax } from '@/components/ZoomParallax';
import PhilosophySection from '@/components/PhilosophySection';
import { LandingAccordionItem } from '@/components/ui/interactive-image-accordion';
import ServicesSection from '@/components/ServicesSection';
import InnovationSection from '@/components/InnovationSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollY / docHeight : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <PageBackground scrollProgress={scrollProgress} />
      <Navigation />
      <ThemeToggle />

      <main className="relative z-10">
        <ZoomParallax images={[
          { src: '/images/home/hero-1.jpeg', alt: 'Project 1' },
          { src: '/images/home/hero-2.jpeg', alt: 'Project 2' },
          { src: '/images/home/hero-3.jpeg', alt: 'Project 3' },
          { src: '/images/home/hero-4.jpeg', alt: 'Project 4' },
          { src: '/images/home/hero-5.jpeg', alt: 'Project 5' },
          { src: '/images/home/hero-6.jpeg', alt: 'Project 6' },
          { src: '/images/home/hero-7.jpeg', alt: 'Project 7' },
        ]} />
        <PhilosophySection />
        <LandingAccordionItem />
        <ServicesSection />
        <InnovationSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
