import SplitText from './SplitText';

export default function PhilosophySection() {
  return (
    <section className="section-full relative z-10">
      <div className="text-center px-6 max-w-4xl mx-auto">
        <SplitText
          as="h2"
          className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight"
        >
          WE BUILD THE INFRASTRUCTURE FOR YOUR DIGITAL PRESENCE
        </SplitText>
        <SplitText
          as="p"
          className="text-muted-foreground text-base md:text-lg mt-8 font-body max-w-2xl mx-auto leading-relaxed"
          delay={0.3}
        >
          Two minds, one mission. We craft software that stands the test of time, blending creativity with engineering precision.
        </SplitText>
      </div>
    </section>
  );
}
