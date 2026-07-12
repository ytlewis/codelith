import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail } from 'lucide-react';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';
import PageBackground from '@/components/PageBackground';
import { ImageSwiper } from '@/components/ui/image-swiper';

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    name: 'Lewis Mwangi',
    role: 'Co-Founder & Full Stack Engineer',
    bio: 'A passionate engineer with a knack for building scalable web applications. Lewis brings expertise in modern frontend frameworks and cloud architecture, ensuring every product is performant and maintainable.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Next.js', 'Tailwind CSS'],
    images: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600,https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600,https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600',
    linkedin: 'https://www.linkedin.com/in/lewis-mwangi-50486929a',
    email: 'gathaiyalewis1122@gmail.com',
  },
  {
    name: 'Lawrence Andwala',
    role: 'Co-Founder & Full Stack Engineer',
    skills: ['Vue.js', 'Python', 'Docker', 'PostgreSQL', 'FastAPI', 'MongoDB'],
    bio: 'Lawrence excels in backend development and system design, with a focus on robust, scalable solutions. His expertise in database architecture and DevOps ensures our products are built to last.',
    images: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600,https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=600,https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600',
    linkedin: '#',
    email: 'lawrence.andwala@example.com',
  },
];

const values = [
  {
    title: 'Quality First',
    description: 'We never compromise on code quality. Every line of code goes through rigorous testing and review.',
  },
  {
    title: 'Innovation',
    description: 'We stay ahead of the curve by embracing new technologies and best practices.',
  },
  {
    title: 'Transparency',
    description: 'We believe in open communication with our clients every step of the way.',
  },
  {
    title: 'Client Success',
    description: 'Your success is our success. We go above and beyond to deliver exceptional results.',
  },
];

const journey = [
  {
    year: '2022',
    title: 'The Beginning',
    description: 'Codelith was founded with a vision to transform ideas into exceptional digital products.',
  },
  {
    year: '2023',
    title: 'Growth & Expansion',
    description: 'Completed our first major projects and built lasting client relationships.',
  },
  {
    year: '2024',
    title: 'New Heights',
    description: 'Expanded our service offerings and began working with international clients.',
  },
  {
    year: '2025',
    title: 'Looking Forward',
    description: 'Continuing to innovate and deliver cutting-edge solutions for our clients.',
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

          {/* Our Values */}
          <div className="mb-16 fade-in">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-10 drop-shadow">
              Our Core Values
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md p-6 shadow-lg
                             hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Journey */}
          <div className="mb-16 fade-in">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-10 drop-shadow">
              Our Journey
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-border/50 h-full" />
              <div className="space-y-12">
                {journey.map((item, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-1/2 pr-8">
                      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md p-6 shadow-lg text-right">
                        <span className="text-primary font-bold text-xl">{item.year}</span>
                        <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Founders */}
          <div className="mb-16 fade-in">
            <h2 className="font-heading text-4xl font-bold text-foreground text-center mb-10 drop-shadow">
              Meet The Founders
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {founders.map((founder, index) => (
                <div
                  key={founder.name}
                  className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md p-8 shadow-lg
                             hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col items-center gap-6">
                    <ImageSwiper 
                      images={founder.images} 
                      cardWidth={220} 
                      cardHeight={300} 
                    />
                    <div className="text-center">
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
                        {founder.name}
                      </h3>
                      <p className="text-primary font-semibold text-sm mb-4">{founder.role}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{founder.bio}</p>
                      <div className="flex flex-wrap justify-center gap-2 mb-5">
                        {founder.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full border border-border/50"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 justify-center">
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${founder.name}'s LinkedIn`}
                          className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center
                                     text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-200"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                          href={`mailto:${founder.email}`}
                          aria-label={`Email ${founder.name}`}
                          className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center
                                     text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-200"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
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
