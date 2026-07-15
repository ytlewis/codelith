import { useState } from 'react';
import { Link } from 'react-router-dom';
import SplitText from './SplitText';
import ProjectModal from './ProjectModal';

export default function CTASection() {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
    document.body.setAttribute('data-modal-open', 'true');
  };

  const closeModal = () => {
    setOpen(false);
    document.body.removeAttribute('data-modal-open');
  };

  return (
    <>
      <section className="relative z-10 py-32">
        <div className="text-left px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <SplitText
                as="h2"
                className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-foreground leading-tight"
              >
                Empowering Entrepreneurship Through Technology
              </SplitText>
              <div className="text-base md:text-lg leading-relaxed space-y-4 text-white/90 dark:text-white/90">
                <p>
                  We support SMEs, sole proprietors, schools, restaurants, and businesses of all sizes with tailored tech solutions.
                </p>
                <p>
                  From custom apps to websites, we build tools that help you grow, streamline operations, and connect with your customers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-all duration-300 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-xl hover:-translate-y-1"
                >
                  Make An Enquiry
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-all duration-300 border border-white/30 text-white hover:bg-white/10"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                <img
                  src="/images/home/cta.jpeg"
                  alt="Empowering businesses"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card/80 backdrop-blur-md border border-border/50 p-6 rounded-xl shadow-lg">
                <p className="text-3xl font-heading font-bold text-primary">50+</p>
                <p className="text-muted-foreground text-sm">Businesses Supported</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectModal open={open} onClose={closeModal} />
    </>
  );
}
