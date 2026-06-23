import type {
  ProjectHeroSlide,
  ProjectItem,
  ResolvedHeroConfig,
} from "@/lib/types";

export type HeroResolvableProject = Pick<
  ProjectItem,
  "title" | "thumbnail" | "hero" | "heroVideo"
>;

export function dedupeSlidesBySrc(slides: ProjectHeroSlide[]): ProjectHeroSlide[] {
  const seen = new Set<string>();
  return slides.filter((slide) => {
    if (seen.has(slide.src)) return false;
    seen.add(slide.src);
    return true;
  });
}

function buildLegacySlides(project: HeroResolvableProject): ProjectHeroSlide[] {
  if (project.heroVideo) {
    return [
      {
        type: "video",
        src: project.heroVideo.src,
        poster: project.heroVideo.poster,
        alt: project.title,
      },
    ];
  }

  return [
    {
      type: "image",
      src: project.thumbnail,
      alt: project.title,
    },
  ];
}

export function resolveHeroConfig(
  project: HeroResolvableProject,
): ResolvedHeroConfig {
  const explicitSlides = project.hero?.slides ?? [];
  const slides =
    explicitSlides.length > 0
      ? dedupeSlidesBySrc(explicitSlides)
      : dedupeSlidesBySrc(buildLegacySlides(project));

  const safeSlides =
    slides.length > 0
      ? slides
      : [
        {
          type: "image" as const,
          src: project.thumbnail,
          alt: project.title,
        },
      ];

  return {
    slides: safeSlides,
    autoplay: project.hero?.autoplay ?? false,
    intervalMs: project.hero?.intervalMs ?? 6000,
    loop: project.hero?.loop ?? true,
    showIndicators:
      project.hero?.showIndicators ?? safeSlides.length > 1,
  };
}

export function resolvePreviewSlide(
  project: HeroResolvableProject,
): ProjectHeroSlide {
  const { slides } = resolveHeroConfig(project);
  return slides.find((slide) => slide.type === "video") ?? slides[0];
}

export function getSlidePosterSrc(
  slide: ProjectHeroSlide,
  fallbackThumbnail: string,
): string {
  if (slide.type === "video" && slide.poster) return slide.poster;
  return fallbackThumbnail;
}
