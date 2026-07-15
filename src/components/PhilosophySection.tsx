import SplitText from './SplitText';

export default function PhilosophySection() {
  return (
    <section className="section-full relative z-10 py-20">
      <div className="px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <SplitText
              as="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground text-left"
            >
              We Build The Infrastructure For Your Digital Presence
            </SplitText>
            <SplitText
              as="p"
              className="text-base md:text-lg mt-8 font-body max-w-xl leading-relaxed text-white/90 dark:text-white/90"
              delay={0.3}
            >
              Two minds, one mission. We craft software that stands the test of time, blending creativity with engineering precision.
            </SplitText>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <img
                src="/images/home/philosophy.jpeg"
                alt="Digital infrastructure"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-card/80 backdrop-blur-md border border-border/50 p-6 rounded-xl shadow-lg">
              <p className="text-3xl font-heading font-bold text-primary">2</p>
              <p className="text-muted-foreground text-sm">Minds, One Mission</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
