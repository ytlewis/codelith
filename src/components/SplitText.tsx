import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  triggerOnScroll?: boolean;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function SplitText({
  children,
  className = '',
  triggerOnScroll = true,
  delay = 0,
  as: Tag = 'h2',
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated.current) return;

    const words = children.split(' ');
    el.innerHTML = '';

    const wordSpans: HTMLSpanElement[] = [];
    words.forEach((word, i) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      wordSpan.style.verticalAlign = 'top';

      const inner = document.createElement('span');
      inner.textContent = word;
      inner.style.display = 'inline-block';
      inner.style.transform = 'translateY(110%)';
      inner.style.opacity = '0';
      inner.style.willChange = 'transform, opacity';

      wordSpan.appendChild(inner);
      el.appendChild(wordSpan);

      if (i < words.length - 1) {
        const space = document.createTextNode('\u00A0');
        el.appendChild(space);
      }
      wordSpans.push(inner);
    });

    const animate = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      gsap.to(wordSpans, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.06,
        delay,
      });
    };

    if (triggerOnScroll) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: animate,
        once: true,
      });
    } else {
      // Trigger on load after fonts ready
      if (document.fonts) {
        document.fonts.ready.then(() => {
          setTimeout(animate, 100);
        });
      } else {
        setTimeout(animate, 300);
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [children, triggerOnScroll, delay]);

  return (
    <Tag
      ref={containerRef as any}
      className={className}
      style={{ willChange: 'contents' }}
    >
      {children}
    </Tag>
  );
}
