import SplitText from './SplitText';

export default function HeroSection() {
  return (
    <section className="section-full relative z-10">
      <div className="text-center px-6 max-w-5xl mx-auto">
        <SplitText
          as="h1"
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-hero glow-primary tracking-tight leading-[1.1]"
          triggerOnScroll={false}
        >
          CODELITH
        </SplitText>

        <SplitText
          as="p"
          className="text-lg md:text-xl text-subtle font-body mt-6 tracking-widest uppercase"
          triggerOnScroll={false}
          delay={0.8}
        >
          CRAFTING DIGITAL EXCELLENCE
        </SplitText>

        <div className="mt-16 scroll-indicator">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs tracking-[0.3em] uppercase font-body">Descend into the atmosphere</span>
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="mt-2">
              <path d="M10 0 L10 24 M4 18 L10 24 L16 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
