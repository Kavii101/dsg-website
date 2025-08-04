import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { HeroSlide as HeroSlideType } from '@/types';

interface HeroSlideProps {
  slide: HeroSlideType;
  isActive: boolean;
}

export function HeroSlide({ slide, isActive }: HeroSlideProps) {
  // Determine color variant based on slide content or alternate pattern
  const pillarColorVariant = slide.id === 2 ? 'secondary' : 'default';

  return (
    <div
      className={cn(
        'absolute inset-0 transition-opacity duration-500',
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      )}
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${slide.id} of 5: ${(slide as any).headline}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={`https://picsum.photos/1200/800?random=${100 + slide.id}`}
          alt={(slide as any).title || 'Hero slide image'}
          fill
          className={cn(
            'object-cover transition-transform duration-700',
            isActive ? 'scale-100' : 'scale-105'
          )}
          priority={slide.id === 1}
          quality={90}
        />
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70" />
        
        {/* Dynamic Color Overlay based on slide */}
        <div className={cn(
          'absolute inset-0 opacity-20',
          slide.id === 2 ? 'bg-gradient-to-br from-dsg-pink-500/40 to-transparent' :
          slide.id === 3 ? 'bg-gradient-to-br from-dsg-blue-500/40 to-transparent' :
          slide.id === 4 ? 'bg-gradient-to-br from-dsg-pink-600/40 to-transparent' :
          slide.id === 5 ? 'bg-gradient-to-br from-dsg-blue-600/40 to-transparent' :
          'bg-gradient-to-br from-dsg-blue-500/40 to-transparent'
        )} />
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-gradient-to-br from-transparent via-black/10 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Badge */}
            {(slide as any).badge && (
              <div className={cn(
                'inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm transition-all duration-500',
                isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                pillarColorVariant === 'secondary' 
                  ? 'bg-dsg-pink-500/20 text-dsg-pink-100 border border-dsg-pink-400/30' 
                  : 'bg-dsg-blue-500/20 text-dsg-blue-100 border border-dsg-blue-400/30'
              )}>
                ✨ {(slide as any).badge}
              </div>
            )}

            {/* Headline */}
            <h1 className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight transition-all duration-700 delay-100',
              isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}>
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                {(slide as any).headline}
              </span>
            </h1>

            {/* Subtext */}
            <p className={cn(
              'text-lg md:text-xl lg:text-2xl text-gray-100 mb-10 leading-relaxed max-w-3xl transition-all duration-700 delay-200',
              isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}>
              {(slide as any).subtext}
            </p>

            {/* Micro Story */}
            {(slide as any).story && (
              <div className={cn(
                'relative mb-10 transition-all duration-700 delay-300',
                isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              )}>
                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-dsg-pink-500 to-dsg-blue-500 rounded-full" />
                <blockquote className="italic text-gray-200 pl-6 pr-4 py-4 bg-black/20 backdrop-blur-sm rounded-r-lg border-l-4 border-transparent">
                  <span className="text-2xl text-dsg-pink-400 opacity-60">&ldquo;</span>
                  {(slide as any).story}
                  <span className="text-2xl text-dsg-pink-400 opacity-60">&rdquo;</span>
                </blockquote>
              </div>
            )}

            {/* CTA Button */}
            <div className={cn(
              'transition-all duration-700 delay-400',
              isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}>
              <Button
                href={(slide as any).button_link}
                size="lg"
                variant={pillarColorVariant === 'secondary' ? 'secondary' : 'primary'}
                className={cn(
                  'px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl',
                  pillarColorVariant === 'secondary'
                    ? 'bg-gradient-to-r from-dsg-pink-500 to-dsg-pink-600 hover:from-dsg-pink-600 hover:to-dsg-pink-700'
                    : 'bg-gradient-to-r from-dsg-blue-500 to-dsg-blue-600 hover:from-dsg-blue-600 hover:to-dsg-blue-700'
                )}
              >
                {(slide as any).button_text}
                <span className="ml-2">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}