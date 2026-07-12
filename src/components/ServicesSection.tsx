import SplitText from './SplitText';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: '📱',
    title: 'mobile apps',
    description: 'native and cross-platform mobile experiences that feel intuitive and perform flawlessly.',
  },
  {
    icon: '🌐',
    title: 'web applications',
    description: 'scalable, modern web platforms built with cutting-edge frameworks and cloud infrastructure.',
  },
  {
    icon: '⚡',
    title: 'custom software',
    description: 'bespoke solutions tailored to your unique business logic and operational needs.',
  },
  {
    icon: '🎨',
    title: 'ui/ux design',
    description: 'beautiful, user-centric interfaces that balance aesthetics with exceptional usability.',
  },
  {
    icon: '☁️',
    title: 'cloud infrastructure',
    description: 'robust, scalable cloud setups designed for performance, security, and reliability.',
  },
  {
    icon: '🤖',
    title: 'ai/ml integration',
    description: 'smart, data-driven features powered by cutting-edge artificial intelligence.',
  },
];

export default function ServicesSection() {
  return (
    <section className="section-full relative z-10 py-20">
      <div className="px-6 max-w-7xl mx-auto w-full">
        <SplitText
          as="h2"
          className="text-3xl md:text-5xl font-heading font-bold text-foreground text-left mb-16 lowercase"
        >
          what we build
        </SplitText>
        
        <div className="relative">
          {services.map((s, index) => (
            <div
              key={s.title}
              className="mb-6"
              style={{
                marginLeft: `${index % 2 === 0 ? '0' : '20%'}`,
                maxWidth: index % 2 === 0 ? '70%' : '60%',
              }}
            >
              <ServiceCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
