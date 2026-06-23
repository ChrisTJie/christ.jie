"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HeroIndicators } from "@/components/projects/HeroIndicators";
import { HeroNavButtons } from "@/components/projects/HeroNavButtons";
import { ProjectHeroSlideView } from "@/components/projects/ProjectHeroSlideView";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { ResolvedHeroConfig } from "@/lib/types";

type ProjectHeroCarouselProps = {
  title: string;
  config: ResolvedHeroConfig;
  category: string;
};

export function ProjectHeroCarousel({
  title,
  config,
  category,
}: ProjectHeroCarouselProps) {
  const { slides, autoplay, intervalMs, loop, showIndicators } = config;
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (slides.length === 0) return;
      if (loop) {
        const wrapped =
          ((index % slides.length) + slides.length) % slides.length;
        setActiveIndex(wrapped);
        return;
      }
      setActiveIndex(Math.max(0, Math.min(index, slides.length - 1)));
    },
    [loop, slides.length],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (!autoplay || reducedMotion || slides.length <= 1) return;

    const timer = window.setInterval(goNext, intervalMs);
    return () => window.clearInterval(timer);
  }, [autoplay, goNext, intervalMs, reducedMotion, slides.length]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (slides.length <= 1) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (slides.length <= 1) return;
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (
      slides.length <= 1 ||
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    const deltaY = event.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    if (deltaX < 0) goNext();
    else goPrev();
  };

  return (
    <div
      className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-surface-container-high border border-tertiary/20 overflow-hidden mb-8 group touch-pan-y"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} 封面媒體`}
      tabIndex={slides.length > 1 ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <ProjectHeroSlideView
            key={slide.id ?? slide.src}
            slide={slide}
            isActive={index === activeIndex}
            priority={index === 0}
          />
        ))}
      </div>

      <div className="absolute top-4 left-4 z-20 font-mono text-[12px] font-medium tracking-widest text-tertiary opacity-70 pointer-events-none">
        SYS.OP. [ACTIVE] // {category}
      </div>

      {showIndicators && (
        <>
          <HeroNavButtons
            title={title}
            slideCount={slides.length}
            activeIndex={activeIndex}
            loop={loop}
            onPrev={goPrev}
            onNext={goNext}
          />
          <HeroIndicators
            title={title}
            slides={slides}
            activeIndex={activeIndex}
            onSelect={goTo}
          />
        </>
      )}

      {slides[activeIndex]?.label && (
        <div className="absolute bottom-14 left-3 right-[7.5rem] md:bottom-4 md:left-4 md:right-auto z-20 font-mono text-[10px] md:text-[12px] font-medium tracking-widest text-tertiary pointer-events-none truncate">
          {slides[activeIndex].label}
        </div>
      )}
    </div>
  );
}
