"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { withBasePath } from "@/lib/base-path";
import { isVideoGalleryItem, type ProjectGalleryItem, type ProjectHeroVideo } from "@/lib/types";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

type ProjectHeroMediaProps = {
  title: string;
  thumbnail: string;
  heroVideo?: ProjectHeroVideo;
};

export function ProjectHeroMedia({
  title,
  thumbnail,
  heroVideo,
}: ProjectHeroMediaProps) {
  const reducedMotion = useReducedMotion();

  if (heroVideo && !reducedMotion) {
    return (
      <video
        src={withBasePath(heroVideo.src)}
        poster={heroVideo.poster ? withBasePath(heroVideo.poster) : withBasePath(thumbnail)}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
        aria-label={`${title} demo reel`}
      />
    );
  }

  if (heroVideo && reducedMotion) {
    return (
      <video
        src={withBasePath(heroVideo.src)}
        poster={heroVideo.poster ? withBasePath(heroVideo.poster) : withBasePath(thumbnail)}
        controls
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        aria-label={`${title} demo reel`}
      />
    );
  }

  return (
    <Image
      src={thumbnail}
      alt={title}
      width={1400}
      height={600}
      className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105"
      priority
    />
  );
}

type ProjectGalleryTileProps = {
  item: ProjectGalleryItem;
};

export function ProjectGalleryTile({ item }: ProjectGalleryTileProps) {
  const reducedMotion = useReducedMotion();

  if (isVideoGalleryItem(item)) {
    return (
      <video
        src={withBasePath(item.src)}
        poster={item.poster ? withBasePath(item.poster) : undefined}
        controls
        playsInline
        preload="metadata"
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
        aria-label={item.alt}
      />
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      width={600}
      height={600}
      className={`w-full h-full object-cover transition-all duration-700 ${reducedMotion
        ? "opacity-90"
        : "opacity-70 group-hover:opacity-100 group-hover:scale-110"
        }`}
    />
  );
}

type ProjectCardPreviewProps = {
  title: string;
  thumbnail: string;
  heroVideo?: ProjectHeroVideo;
  hovered: boolean;
};

export function ProjectCardPreview({
  title,
  thumbnail,
  heroVideo,
  hovered,
}: ProjectCardPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const canPreview = Boolean(heroVideo) && !reducedMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canPreview) return;

    if (hovered) {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [hovered, canPreview]);

  return (
    <div className="absolute inset-0">
      <Image
        src={thumbnail}
        alt={title}
        width={800}
        height={600}
        className={`w-full h-full object-cover transition-opacity duration-500 ${canPreview && hovered ? "opacity-0" : "opacity-80 group-hover:opacity-100"
          }`}
      />
      {canPreview && heroVideo && (
        <video
          ref={videoRef}
          src={withBasePath(heroVideo.src)}
          poster={
            heroVideo.poster
              ? withBasePath(heroVideo.poster)
              : withBasePath(thumbnail)
          }
          muted
          loop
          playsInline
          preload="none"
          aria-hidden={!hovered}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"
            }`}
        />
      )}
    </div>
  );
}
