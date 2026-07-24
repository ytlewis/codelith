import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';
import PageBackground from '@/components/PageBackground';
import FeatureCarousel from '@/components/ui/feature-carousel';
import { IconCloud } from '@/components/ui/interactive-icon-cloud';

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
]

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

          {/* Tech Stack Section */}
          <div className="mt-24">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">/ our tech stack</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground lowercase mb-8">
              tools we love
            </h2>
            <div className="relative flex size-full max-w-lg mx-auto items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8">
              <IconCloud iconSlugs={slugs} />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
