import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Github } from 'lucide-react';
import { useState } from 'react';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';
import PageBackground from '@/components/PageBackground';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const founders = [
  {
    name: 'Lewis Mwangi',
    designation: 'Co-Founder & Full Stack Engineer',
    quote:
      'I build software that scales — from pixel-perfect UIs to cloud infrastructure. If it can be coded, we will make it exceptional.',
    bio: 'Lewis is a full-stack engineer with a passion for building scalable, user-centric applications. He specializes in React, Node.js, and cloud infrastructure, with a keen eye for design and attention to detail. When not coding, he enjoys exploring new technologies and contributing to open-source projects.',
    images: ['/images/about/founder-lewis.jpeg'],
    linkedin: 'https://www.linkedin.com/in/lewis-mwangi-50486929a',
    github: 'https://github.com/',
    email: 'gathaiyalewis1122@gmail.com',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Next.js', 'Tailwind CSS'],
  },
  {
    name: 'Lawrence Andwala',
    designation: 'Co-Founder & Full Stack Engineer',
    quote:
      'Robust systems don\'t happen by accident — they are architected. I obsess over backend design, databases, and making sure nothing breaks at 2am.',
    bio: 'Lawrence is a backend engineer and architect with deep expertise in system design, databases, and cloud technologies. He loves solving complex problems and building reliable systems that scale. His interests include distributed systems, DevOps, and machine learning.',
    images: ['/images/about/founder-lawrence.jpeg'],
    linkedin: '#',
    github: 'https://github.com/',
    email: 'lawrence.andwala@example.com',
    skills: ['Vue.js', 'Python', 'Docker', 'PostgreSQL', 'FastAPI', 'MongoDB'],
  },
];

const stats = [
  { value: '3+', label: 'years building' },
  { value: '20+', label: 'projects shipped' },
  { value: '2', label: 'founders, zero BS' },
  { value: '∞', label: 'lines of care' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const [selectedFounder, setSelectedFounder] = useState<typeof founders[0] | null>(null);

  return (
    <div className="relative min-h-screen">
      <PageBackground />
      <Navigation />
      <ThemeToggle />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* ── Hero ── */}
          <div className="mb-24">
            <motion.p
              custom={0} variants={fadeUp} initial="hidden" animate="show"
              className="text-xs uppercase tracking-[0.25em] text-primary mb-4"
            >
              / about codelith
            </motion.p>
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="show"
              className="font-heading text-5xl md:text-7xl font-bold text-foreground leading-[1.05] lowercase mb-8"
            >
              we turn<br />
              <span className="text-primary">wild ideas</span><br />
              into real software
            </motion.h1>
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="show"
              className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Codelith is a two-person studio that punches way above its weight.
              We design, engineer, and ship — from the first wireframe to production.
              No fluff. No committees. Just clean code and things that work.
            </motion.p>
          </div>

          {/* ── Stats ── */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30 rounded-2xl overflow-hidden mb-24 border border-border/30"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-card/80 backdrop-blur-md px-8 py-10">
                <p className="font-heading text-4xl font-bold text-primary mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground lowercase">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* ── Manifesto strip ── */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="show"
            className="relative rounded-3xl overflow-hidden mb-24 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20 p-12 md:p-16"
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <p className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-snug max-w-3xl">
              "Quality isn't a checkbox — it's the standard.
              Every commit, every pixel, every API route gets the same obsessive attention."
            </p>
            <p className="mt-6 text-muted-foreground text-sm uppercase tracking-widest">— the codelith way</p>
          </motion.div>

          {/* ── Founders ── */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show" className="mb-24">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">/ the founders</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground lowercase mb-2">
              meet the team
            </h2>
            <p className="text-muted-foreground mb-2">two builders. one mission.</p>

            <AnimatedTestimonials testimonials={founders} autoplay />

            {/* Skills + links under carousel */}
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {founders.map((f) => (
                <div key={f.name} className="rounded-2xl border border-border/40 bg-card/70 backdrop-blur-md p-6">
                  <button
                    onClick={() => setSelectedFounder(f)}
                    className="font-heading font-bold text-foreground mb-1 hover:text-primary transition-colors text-left"
                  >
                    {f.name}
                  </button>
                  <p className="text-xs text-primary uppercase tracking-wide mb-4">{f.designation}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {f.skills.map((s) => (
                      <span key={s} className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full border border-border/50">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={f.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a href={f.github} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a href={`mailto:${f.email}`}
                      className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all">
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            custom={6} variants={fadeUp} initial="hidden" animate="show"
            className="text-center"
          >
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6 lowercase">
              let's build something
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Got an idea, a problem, or just want to chat about tech? We're always down.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold rounded-full bg-primary hover:opacity-90 transition-opacity text-primary-foreground"
            >
              get in touch →
            </Link>
          </motion.div>

        </div>
      </main>

      {/* Founder Modal */}
      <Dialog open={!!selectedFounder} onOpenChange={(open) => !open && setSelectedFounder(null)}>
        <DialogContent className="max-w-5xl p-6">
          {selectedFounder && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <Carousel className="w-full">
                  <CarouselContent>
                    {selectedFounder.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <img
                            src={image}
                            alt={`${selectedFounder.name} - ${index + 1}`}
                            className="w-full h-96 object-contain rounded-lg bg-secondary/20"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-12" />
                  <CarouselNext className="-right-12" />
                </Carousel>
              </div>
              <div className="flex flex-col gap-6">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold">{selectedFounder.name}</DialogTitle>
                  <p className="text-primary text-sm uppercase tracking-wide">{selectedFounder.designation}</p>
                </DialogHeader>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedFounder.bio}
                </p>
                <div>
                  <h3 className="font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFounder.skills.map((s) => (
                      <span key={s} className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full border border-border/50">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <a
                    href={selectedFounder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={selectedFounder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${selectedFounder.email}`}
                    className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
