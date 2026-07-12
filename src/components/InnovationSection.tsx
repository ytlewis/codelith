import SplitText from './SplitText';

export default function InnovationSection() {
  return (
    <section className="section-full relative z-10 py-20">
      <div className="px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <SplitText
              as="h2"
              className="text-3xl md:text-5xl font-heading font-bold text-foreground text-left lowercase"
            >
              technical innovation excellence
            </SplitText>
            <div className="space-y-6 text-muted-foreground text-base leading-relaxed">
              <p className="lowercase">
                at codelith, we don't just build software—we craft innovative solutions that solve real market and business gaps in the kenyan environment.
              </p>
              <p className="lowercase">
                our brilliance and research-driven approach ensures we stay ahead of trends, leveraging ai and cutting-edge technologies to create impactful, scalable products.
              </p>
              <p className="lowercase">
                we are fully tax compliant, operate with integrity, and prioritize listening to our clients to understand their unique needs and deliver tailored, results-driven solutions.
              </p>
              <div className="flex gap-4 flex-wrap">
                <div className="bg-primary/10 px-4 py-2 rounded-full text-primary font-medium lowercase">
                  ai-powered solutions
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-full text-primary font-medium lowercase">
                  market-focused research
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-full text-primary font-medium lowercase">
                  client-centric approach
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-full text-primary font-medium lowercase">
                  tax compliant operations
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <img
                src="/placeholder.svg"
                alt="Innovation in Kenya"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card/80 backdrop-blur-md border border-border/50 p-6 rounded-xl shadow-lg">
              <p className="text-3xl font-heading font-bold text-primary">100%</p>
              <p className="text-muted-foreground text-sm lowercase">client satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
