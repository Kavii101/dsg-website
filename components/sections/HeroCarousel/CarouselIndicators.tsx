import React from 'react';
import { cn } from '@/lib/utils';

interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
  className?: string;
}

export function CarouselIndicators({ 
  total, 
  current, 
  onSelect, 
  className 
}: CarouselIndicatorsProps) {
  return (
    <div 
      className={cn('flex items-center gap-2', className)}
      role="tablist"
      aria-label="Carousel navigation"
    >
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={cn(
            'w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent',
            current === index
              ? 'w-8 bg-white'
              : 'bg-white/50 hover:bg-white/70'
          )}
          role="tab"
          aria-selected={current === index}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}