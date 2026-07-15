import SplitText from './SplitText';

export default function InnovationSection() {
  return (
    <section className="section-full relative z-10 py-20">
      <div className="px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <SplitText
              as="h2"
              className="text-3xl md:text-5xl font-heading font-bold text-foreground text-left"
            >
              Technical Innovation Excellence
            </SplitText>
            <div className="space-y-6 text-base leading-relaxed text-white/90 dark:text-white/90">
              <p>
                At Codelith, we don't just build software — we craft innovative solutions that solve real market and business gaps in the Kenyan environment.
              </p>
              <p>
                Our brilliance and research-driven approach ensures we stay ahead of trends, leveraging AI and cutting-edge technologies to create impactful, scalable products.
              </p>
              <p>
                We are fully tax compliant, operate with integrity, and prioritize listening to our clients to understand their unique needs and deliver tailored, results-driven solutions.
              </p>
              <div className="flex gap-4 flex-wrap">
                <div className="bg-primary/10 px-4 py-2 rounded-full text-primary font-medium">
                  AI-Powered Solutions
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-full text-primary font-medium">
                  Market-Focused Research
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-full text-primary font-medium">
                  Client-Centric Approach
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-full text-primary font-medium">
                  Tax Compliant Operations
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <img
                src="/images/home/innovation.jpeg"
                alt="Innovation in Kenya"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card/80 backdrop-blur-md border border-border/50 p-6 rounded-xl shadow-lg">
              <p className="text-3xl font-heading font-bold text-primary">100%</p>
              <p className="text-muted-foreground text-sm">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
