"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type CountUpProps = {
  value: number | string;
  suffix?: string;
  duration?: number;
  className?: string;
};

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3;
}

export function CountUp({
  value,
  suffix = "",
  duration = 1200,
  className = "",
}: CountUpProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [animatedValue, setAnimatedValue] = useState<number | null>(null);
  const isNumeric = typeof value === "number";

  useEffect(() => {
    if (!isNumeric || reducedMotion) return;

    const element = ref.current;
    if (!element) return;

    let raf = 0;

    const run = () => {
      const target = value;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setAnimatedValue(Math.round(target * easeOutCubic(progress)));

        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        }
      };

      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [duration, isNumeric, reducedMotion, value]);

  const display = !isNumeric
    ? value
    : reducedMotion
      ? value
      : (animatedValue ?? 0);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
