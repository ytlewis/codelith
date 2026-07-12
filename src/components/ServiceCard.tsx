import { useState } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-card/70 backdrop-blur-md border border-border/50 rounded-2xl p-8 transition-all duration-500 group-hover:border-primary/50 group-hover:bg-card/90 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6 transition-all duration-500 ${hovered ? 'bg-gradient-to-br from-primary to-accent text-white scale-110 rotate-3' : 'bg-secondary text-muted-foreground'}`}>
          {icon}
        </div>

        <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 lowercase">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed transition-colors duration-300 group-hover:text-foreground/80 lowercase">
          {description}
        </p>

        <div className="mt-8 flex items-center gap-2 text-xs text-primary/80 font-heading uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          explore →
        </div>
      </div>
    </div>
  );
}
