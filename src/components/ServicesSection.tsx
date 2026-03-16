import SplitText from './SplitText';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: '📱',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile experiences that feel intuitive and perform flawlessly.',
  },
  {
    icon: '🌐',
    title: 'Web Applications',
    description: 'Scalable, modern web platforms built with cutting-edge frameworks and cloud infrastructure.',
  },
  {
    icon: '⚡',
    title: 'Custom Software',
    description: 'Bespoke solutions tailored to your unique business logic and operational needs.',
  },
];

export default function ServicesSection() {
  return (
    <section className="section-full relative z-10 py-20">
      <div className="px-6 max-w-6xl mx-auto w-full">
        <SplitText
          as="h2"
          className="text-3xl md:text-5xl font-heading font-bold text-foreground text-center mb-16"
        >
          WHAT WE BUILD
        </SplitText>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
