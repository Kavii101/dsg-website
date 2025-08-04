'use client';

import React, { useState, useEffect } from 'react';
import { HeroSlide } from './HeroSlide';
import { CarouselControls } from './CarouselControls';
import { CarouselIndicators } from './CarouselIndicators';
import { useCarousel } from '@/hooks/useCarousel';
import { HERO_SLIDES as ORIGINAL_SLIDES } from '@/lib/constants';
import { getHeroSlides } from '@/lib/content';

// Use high-quality placeholder images with relevant themes
const PLACEHOLDER_IMAGES = {
  'hero-climate': 'https://picsum.photos/1200/800?random=101', // Nature/Environment
  'hero-women': 'https://picsum.photos/1200/800?random=102',   // Community/People
  'hero-youth': 'https://picsum.photos/1200/800?random=103',   // Energy/Action
  'hero-migrant': 'https://picsum.photos/1200/800?random=104', // Urban/Movement
  'hero-decolonial': 'https://picsum.photos/1200/800?random=105', // Learning/Books
};

// Load slides from content management system
function getCarouselSlides() {
  const contentSlides = getHeroSlides();
  const slides = contentSlides.length > 0 ? contentSlides : ORIGINAL_SLIDES;
  
  // Update to use working placeholder images
  return slides.map(slide => ({
    ...slide,
    image: PLACEHOLDER_IMAGES[slide.image.split('/').pop()?.replace('.jpg', '') as keyof typeof PLACEHOLDER_IMAGES] || slide.image
  }));
}
import { cn } from '@/lib/utils';

interface HeroCarouselProps {
  className?: string;
}

export function HeroCarousel({ className }: HeroCarouselProps) {
  const [isMounted, setIsMounted] = useState(false);
  const HERO_SLIDES = getCarouselSlides();
  
  const {
    currentSlide,
    goToNext,
    goToPrevious,
    goToSlide,
    pause,
    resume,
  } = useCarousel({
    totalSlides: HERO_SLIDES.length,
    autoPlay: true,
    interval: 7000,
    pauseOnHover: true,
  });

  // Prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={cn('relative h-[600px] lg:h-[700px] bg-gradient-to-br from-dsg-blue-500 to-dsg-pink-500', className)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <div className="text-white font-medium">Loading DSG Experience...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="hero-carousel"
      className={cn('relative h-[600px] lg:h-[750px] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800', className)}
      aria-label="Key focus areas"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      {/* Skip Carousel Link */}
      <a href="#main-content" className="skip-to-content">
        Skip Carousel
      </a>

      {/* Slides */}
      <div className="relative h-full">
        {HERO_SLIDES.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            isActive={currentSlide === index}
          />
        ))}
      </div>

      {/* Controls Container */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Indicators */}
            <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <CarouselIndicators
                total={HERO_SLIDES.length}
                current={currentSlide}
                onSelect={goToSlide}
              />
            </div>

            {/* Navigation Controls */}
            <div className="bg-black/20 backdrop-blur-sm rounded-full p-2">
              <CarouselControls
                onPrevious={goToPrevious}
                onNext={goToNext}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Region for Screen Readers */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {`Slide ${currentSlide + 1} of ${HERO_SLIDES.length}: ${HERO_SLIDES[currentSlide].headline}`}
      </div>
    </section>
  );
}