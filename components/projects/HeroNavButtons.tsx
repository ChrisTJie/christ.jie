"use client";

import { MaterialIcon } from "@/components/ui/MaterialIcon";

type HeroNavButtonsProps = {
  title: string;
  slideCount: number;
  activeIndex: number;
  loop: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function HeroNavButtons({
  title,
  slideCount,
  activeIndex,
  loop,
  onPrev,
  onNext,
}: HeroNavButtonsProps) {
  if (slideCount <= 1) return null;

  const atStart = activeIndex === 0;
  const atEnd = activeIndex === slideCount - 1;
  const prevDisabled = !loop && atStart;
  const nextDisabled = !loop && atEnd;

  const positionClass =
    "absolute top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto focus-visible:opacity-100 focus-visible:pointer-events-auto";

  const buttonClass = (disabled: boolean) =>
    `flex items-center justify-center w-11 h-11 md:w-14 md:h-14 border rounded-sm backdrop-blur-md transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container ${disabled
      ? "border-tertiary/10 bg-surface/40 text-on-surface-variant/40 cursor-not-allowed"
      : "border-tertiary/30 bg-surface/80 text-tertiary hover:border-primary-container hover:text-primary-container hover:bg-surface/90 hover:shadow-[0_0_15px_rgba(0,245,255,0.2)]"
    }`;

  return (
    <>
      <button
        type="button"
        aria-label={`${title} 上一張媒體`}
        aria-disabled={prevDisabled}
        disabled={prevDisabled}
        onClick={onPrev}
        className={`left-3 md:left-5 ${positionClass} ${buttonClass(prevDisabled)}`}
      >
        <MaterialIcon name="chevron_left" className="text-[28px] md:text-[32px]" />
      </button>
      <button
        type="button"
        aria-label={`${title} 下一張媒體`}
        aria-disabled={nextDisabled}
        disabled={nextDisabled}
        onClick={onNext}
        className={`right-3 md:right-5 ${positionClass} ${buttonClass(nextDisabled)}`}
      >
        <MaterialIcon name="chevron_right" className="text-[28px] md:text-[32px]" />
      </button>
    </>
  );
}
