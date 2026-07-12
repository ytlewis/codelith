import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SplitText from './SplitText';

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  initial: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'working with codelith was an absolute pleasure. they transformed our vision into a stunning, high-performance product that exceeded all expectations.',
    name: 'sarah chen',
    designation: 'ceo, techventure',
    initial: 'sc'
  },
  {
    quote: 'the team\'s attention to detail and technical expertise made our project seamless. we couldn\'t have asked for better partners.',
    name: 'marcus johnson',
    designation: 'founder, startuphub',
    initial: 'mj'
  },
  {
    quote: 'incredible design and development work. codelith delivered exactly what we needed, on time and within budget.',
    name: 'emily rodriguez',
    designation: 'product lead, innovatelabs',
    initial: 'er'
  },
  {
    quote: 'professional, responsive, and incredibly talented. our app has never looked or performed better.',
    name: 'david kim',
    designation: 'cto, digitalflow',
    initial: 'dk'
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = testimonials.length;
  const activeTestimonial = testimonials[activeIndex];

  function calculateGap(width: number) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
      return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
  }

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    }, 5000);
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [testimonialsLength]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  };
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  };

  function getCircleStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: 'auto',
        transform: 'translateX(0px) translateY(0px) scale(1)',
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)'
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)'
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)'
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)'
    };
  }

  return (
    <section className="section-full relative z-10 py-20">
      <div className="px-6 max-w-7xl mx-auto w-full">
        <SplitText
          as="h2"
          className="text-3xl md:text-5xl font-heading font-bold text-foreground text-left mb-16 lowercase"
        >
          what our clients say
        </SplitText>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className="relative w-full h-80 flex items-center justify-center"
            ref={imageContainerRef}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="absolute w-48 h-48 rounded-full flex items-center justify-center text-4xl font-heading font-bold shadow-2xl cursor-pointer"
                style={{
                  ...getCircleStyle(index),
                  background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))`,
                  color: 'white'
                }}
                onClick={() => setActiveIndex(index)}
              >
                {testimonial.initial}
              </div>
            ))}
          </div>

          <div className="bg-card/70 backdrop-blur-md border border-border/50 rounded-2xl p-8">
            <div className="transition-opacity duration-500" key={activeIndex}>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2 text-right lowercase">
                {activeTestimonial.name}
              </h3>
              <p className="text-primary font-medium mb-6 text-right lowercase">
                {activeTestimonial.designation}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-right lowercase">
                "{activeTestimonial.quote}"
              </p>

              <div className="flex items-center gap-4 mb-8 justify-end">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label="previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label="next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex gap-2 justify-end">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                    }`}
                    aria-label={`go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
