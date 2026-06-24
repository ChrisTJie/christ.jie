"use client";

import { CountUp } from "@/components/ui/CountUp";
import { profile } from "@/content/profile";

export function ProfileStatCards() {
  return (
    <div className="md:col-span-4 flex flex-col gap-5">
      {profile.stats.map((stat, index) => (
        <div
          key={stat.id}
          className="bg-surface-container-highest p-6 border border-tertiary/20 flex-grow rounded flex flex-col justify-center items-center text-center transition-all duration-300 motion-safe:hover:-translate-y-1 motion-reduce:hover:translate-y-0 hover:border-primary-container/40 hover:shadow-[0_0_24px_rgba(0,245,255,0.12)] motion-safe:animate-fade-up"
          style={{ animationDelay: `${index * 75}ms` }}
        >
          <CountUp
            value={stat.value}
            suffix={stat.suffix}
            className="text-4xl md:text-5xl font-bold text-primary-container mb-2 tabular-nums"
          />
          <span className="font-mono text-[13px] font-medium tracking-wider text-tertiary">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
