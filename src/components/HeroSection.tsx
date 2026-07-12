import SplitText from './SplitText';

export default function HeroSection() {
  return (
    <section className="section-full relative z-10">
      <div className="text-left px-6 max-w-5xl mx-auto">
        <SplitText
          as="p"
          className="text-lg md:text-xl text-subtle font-body mt-12 tracking-wide lowercase"
          triggerOnScroll={false}
          delay={0.8}
        >
          crafting digital excellence
        </SplitText>

        <div className="mt-16 scroll-indicator">
          <div className="flex flex-col items-start gap-2 text-muted-foreground">
            <span className="text-xs tracking-[0.3em] lowercase font-body">descend into the atmosphere</span>
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="mt-2">
              <path d="M10 0 L10 24 M4 18 L10 24 L16 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
