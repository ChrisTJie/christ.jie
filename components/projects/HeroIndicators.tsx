"use client";

import type { ProjectHeroSlide } from "@/lib/types";

type HeroIndicatorsProps = {
  title: string;
  slides: ProjectHeroSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function HeroIndicators({
  title,
  slides,
  activeIndex,
  onSelect,
}: HeroIndicatorsProps) {
  if (slides.length <= 1) return null;

  return (
    <div
      role="tablist"
      aria-label={`${title} 媒體切換`}
      className="absolute bottom-2 right-2 z-20 flex gap-0.5"
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={slide.id ?? slide.src}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={
              slide.label ?? `Slide ${index + 1} of ${slides.length}`
            }
            onClick={() => onSelect(index)}
            className="flex min-w-11 min-h-11 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
          >
            <span
              aria-hidden="true"
              className={`block h-3 w-3 transition-colors duration-300 ${isActive
                ? "bg-primary-container animate-pulse"
                : "bg-on-surface-variant hover:bg-primary-container/50"
                }`}
            />
          </button>
        );
      })}
    </div>
  );
}
