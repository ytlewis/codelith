import { useState } from 'react';
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
        <div className="text-center px-6 max-w-4xl mx-auto">
          <SplitText
            as="h2"
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-foreground leading-tight"
          >
            READY TO BUILD SOMETHING AMAZING?
          </SplitText>
          <div className="mt-12">
            <button onClick={openModal} className="btn-cta">
              Start Your Project
            </button>
          </div>
        </div>
      </section>

      <ProjectModal open={open} onClose={closeModal} />
    </>
  );
}
