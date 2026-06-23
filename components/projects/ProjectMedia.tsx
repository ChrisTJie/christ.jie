"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  getSlidePosterSrc,
  resolvePreviewSlide,
  type HeroResolvableProject,
} from "@/lib/hero";
import { withBasePath } from "@/lib/base-path";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import {
  isVideoGalleryItem,
  isVideoMediaItem,
  type ProjectGalleryItem,
} from "@/lib/types";

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
  project: HeroResolvableProject;
  hovered: boolean;
};

export function ProjectCardPreview({
  project,
  hovered,
}: ProjectCardPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const previewSlide = resolvePreviewSlide(project);
  const isVideo = isVideoMediaItem(previewSlide);
  const canPreview = isVideo && !reducedMotion;
  const posterSrc = getSlidePosterSrc(previewSlide, project.thumbnail);

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
        src={posterSrc}
        alt={project.title}
        width={800}
        height={600}
        className={`w-full h-full object-cover transition-opacity duration-500 ${canPreview && hovered ? "opacity-0" : "opacity-80 group-hover:opacity-100"
          }`}
      />
      {canPreview && (
        <video
          ref={videoRef}
          src={withBasePath(previewSlide.src)}
          poster={withBasePath(posterSrc)}
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
