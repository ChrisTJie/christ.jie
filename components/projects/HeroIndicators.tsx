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
      className="absolute bottom-4 right-4 z-20 flex gap-2"
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
            className={`w-2 h-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container ${isActive
              ? "bg-primary-container animate-pulse"
              : "bg-on-surface-variant hover:bg-primary-container/50"
              }`}
          />
        );
      })}
    </div>
  );
}
