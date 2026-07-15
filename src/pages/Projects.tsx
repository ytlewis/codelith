import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';
import PageBackground from '@/components/PageBackground';
import FeatureCarousel from '@/components/ui/feature-carousel';

export default function Projects() {
  return (
    <div className="relative min-h-screen">
      <PageBackground />
      <Navigation />
      <ThemeToggle />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="mb-16">
            <h1
              className="text-5xl md:text-6xl font-bold text-foreground mb-4 lowercase"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
            >
              our projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              a selection of what we've built — hover to explore each one.
            </p>
          </div>

          <FeatureCarousel />

        </div>
      </main>

      <Footer />
    </div>
  );
}
