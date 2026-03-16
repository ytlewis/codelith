import { useState } from 'react';
import SplitText from './SplitText';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleMouseEnter = () => {
    setHovered(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setProgress(0);
  };

  return (
    <div
      className="card-service group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-heading text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>

      {/* Progress bar */}
      <div className="relative h-1 rounded-full bg-secondary overflow-hidden">
        <div
          className="progress-fill h-full rounded-full transition-all duration-100"
          style={{ width: `${hovered ? progress : 0}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2 font-heading">
        {hovered ? `Building... ${progress}%` : 'Hover to build'}
      </p>
    </div>
  );
}
