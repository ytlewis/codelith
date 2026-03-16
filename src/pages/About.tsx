import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';
import PageBackground from '@/components/PageBackground';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'Lewis Mwangi',
    role: 'Full Stack Engineer',
    bio: 'Passionate about building scalable web applications and exploring new technologies.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
  },
  {
    name: 'Lawrence Andwala',
    role: 'Full Stack Engineer',
    bio: 'Dedicated to creating elegant solutions and delivering exceptional user experiences.',
    skills: ['Vue.js', 'Python', 'Docker', 'PostgreSQL'],
  },
];

export default function About() {
  useEffect(() => {
    gsap.fromTo(
      '.fade-in',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div className="relative min-h-screen">
      <PageBackground />
      <Navigation />
      <ThemeToggle />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto about-content">

          {/* Hero text */}
          <div className="text-center mb-16 fade-in">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6 drop-shadow-lg">
              About Codelith
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed
                          bg-card/70 backdrop-blur-md rounded-2xl px-8 py-6 border border-border/50 shadow-lg">
              We are a team of passionate developers dedicated to crafting exceptional digital experiences.
              Our mission is to transform ideas into robust, scalable solutions that drive business growth.
            </p>
          </div>

          {/* Vision & Approach */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="fade-in rounded-2xl border border-border/50 bg-card/75 backdrop-blur-md p-8 shadow-lg">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading force in digital innovation, creating software solutions that not only meet
                today's needs but anticipate tomorrow's challenges. We believe in the power of technology to
                transform businesses and improve lives.
              </p>
            </div>
            <div className="fade-in rounded-2xl border border-border/50 bg-card/75 backdrop-blur-md p-8 shadow-lg">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Approach</h2>
              <p className="text-muted-foreground leading-relaxed">
                We combine technical excellence with creative problem-solving. Every project is an opportunity
                to push boundaries, learn new technologies, and deliver solutions that exceed expectations.
                Quality, performance, and user experience are at the heart of everything we build.
              </p>
            </div>
          </div>

          {/* Team */}
          <div className="mb-16 fade-in">
            <h2 className="font-heading text-4xl font-bold text-foreground text-center mb-10 drop-shadow">
              Meet The Team
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md p-8 shadow-lg
                             hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-6 shadow-md" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full border border-border/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center fade-in">
            <div className="inline-block rounded-2xl border border-border/50 bg-card/75 backdrop-blur-md px-12 py-10 shadow-lg">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Ready to work together?
              </h2>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold
                           rounded-lg bg-primary hover:opacity-90 transition-opacity
                           text-foreground dark:text-primary-foreground"
              >
                Get In Touch
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
