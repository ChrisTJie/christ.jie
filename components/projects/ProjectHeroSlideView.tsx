"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { withBasePath } from "@/lib/base-path";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { isVideoMediaItem, type ProjectHeroSlide } from "@/lib/types";

type ProjectHeroSlideViewProps = {
  slide: ProjectHeroSlide;
  isActive: boolean;
  priority?: boolean;
};

export function ProjectHeroSlideView({
  slide,
  isActive,
  priority = false,
}: ProjectHeroSlideViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const isVideo = isVideoMediaItem(slide);

  const layoutClass = "absolute inset-0 w-full h-full object-cover";

  const imageStateClass = isActive
    ? "z-10 opacity-80 mix-blend-luminosity transition-all duration-700 group-hover:opacity-100 group-hover:mix-blend-normal group-hover:scale-105"
    : "z-0 opacity-0 pointer-events-none";

  const videoStateClass = isActive
    ? "z-10 opacity-80 transition-opacity duration-700 group-hover:opacity-100"
    : "z-0 opacity-0 pointer-events-none";

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideo) return;

    if (!isActive) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    if (!reducedMotion) {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    }
  }, [isActive, isVideo, reducedMotion]);

  if (isVideo) {
    if (reducedMotion) {
      return (
        <video
          ref={videoRef}
          src={withBasePath(slide.src)}
          poster={slide.poster ? withBasePath(slide.poster) : undefined}
          controls={isActive}
          playsInline
          preload={isActive ? "metadata" : "none"}
          aria-hidden={!isActive}
          className={`${layoutClass} transition-opacity duration-500 ${videoStateClass}`}
          aria-label={slide.alt}
        />
      );
    }

    return (
      <video
        ref={videoRef}
        src={withBasePath(slide.src)}
        poster={slide.poster ? withBasePath(slide.poster) : undefined}
        autoPlay={isActive}
        muted
        loop
        playsInline
        preload={isActive ? "auto" : "none"}
        aria-hidden={!isActive}
        className={`${layoutClass} ${videoStateClass}`}
        aria-label={slide.alt}
      />
    );
  }

  return (
    <Image
      src={slide.src}
      alt={slide.alt}
      width={1400}
      height={600}
      priority={priority && isActive}
      aria-hidden={!isActive}
      className={`${layoutClass} ${imageStateClass}`}
    />
  );
}
