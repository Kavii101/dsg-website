import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCarouselProps {
  totalSlides: number;
  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
}

export function useCarousel({
  totalSlides,
  autoPlay = true,
  interval = 7000,
  pauseOnHover = true,
}: UseCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Go to next slide
  const goToNext = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [totalSlides, isTransitioning]);

  // Go to previous slide
  const goToPrevious = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [totalSlides, isTransitioning]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [totalSlides, isTransitioning]);

  // Pause carousel
  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Resume carousel
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Set up auto-play
  useEffect(() => {
    if (autoPlay && !isPaused) {
      intervalRef.current = setInterval(goToNext, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isPaused, interval, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  return {
    currentSlide,
    goToNext,
    goToPrevious,
    goToSlide,
    pause,
    resume,
    isPaused,
    isTransitioning,
  };
}