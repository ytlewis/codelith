import SplitText from './SplitText';
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from './AnimatedSlideshow';

const SLIDES = [
  { id: "slide-1", title: "Frontend Dev",     imageUrl: "/images/services/frontend.jpeg" },
  { id: "slide-2", title: "Backend Dev",      imageUrl: "/images/services/backend.jpeg" },
  { id: "slide-3", title: "UI / UX Design",   imageUrl: "/images/services/uiux.jpeg" },
  { id: "slide-4", title: "Video Editing",    imageUrl: "/images/services/video.jpeg" },
  { id: "slide-5", title: "SEO Optimization", imageUrl: "/images/services/seo.jpeg" },
];

export default function ServicesSection() {
  return (
    <section className="section-full relative z-10">
      <HoverSlider className="min-h-svh place-content-center p-6 md:px-12 bg-background text-foreground">
        <SplitText
          as="h2"
          className="text-3xl md:text-5xl font-heading font-bold text-left mb-6 lowercase text-foreground"
        >
          what we build
        </SplitText>

        <h3 className="mb-6 text-xs font-medium capitalize tracking-wide text-primary">
          / our services
        </h3>

        <div className="flex flex-wrap items-center justify-evenly gap-6 md:gap-12">
          <div className="flex flex-col space-y-2 md:space-y-4">
            {SLIDES.map((slide, index) => (
              <TextStaggerHover
                key={slide.title}
                index={index}
                className="cursor-pointer text-4xl font-bold uppercase tracking-tighter"
                text={slide.title}
              />
            ))}
          </div>

          <HoverSliderImageWrap>
            {SLIDES.map((slide, index) => (
              <div key={slide.id}>
                <HoverSliderImage
                  index={index}
                  imageUrl={slide.imageUrl}
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="size-full max-h-96 object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </HoverSliderImageWrap>
        </div>
      </HoverSlider>
    </section>
  );
}
