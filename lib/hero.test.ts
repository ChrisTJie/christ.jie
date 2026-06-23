import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import {
  dedupeSlidesBySrc,
  resolveHeroConfig,
  resolvePreviewSlide,
} from "@/lib/hero";
import type { ProjectItem } from "@/lib/types";

const baseProject: Pick<
  ProjectItem,
  "title" | "thumbnail" | "hero" | "heroVideo"
> = {
  title: "Test_Project",
  thumbnail: "/thumb.jpg",
};

describe("dedupeSlidesBySrc", () => {
  it("removes duplicate src entries", () => {
    const slides = dedupeSlidesBySrc([
      { type: "video", src: "/a.mp4", alt: "A" },
      { type: "video", src: "/a.mp4", alt: "A duplicate" },
      { type: "image", src: "/b.jpg", alt: "B" },
    ]);

    expect(slides).toHaveLength(2);
    expect(slides[0]?.alt).toBe("A");
  });
});

describe("resolveHeroConfig", () => {
  it("returns a single image slide without indicators for thumbnail-only projects", () => {
    const config = resolveHeroConfig(baseProject);

    expect(config.slides).toHaveLength(1);
    expect(config.slides[0]).toMatchObject({
      type: "image",
      src: "/thumb.jpg",
      alt: "Test_Project",
    });
    expect(config.showIndicators).toBe(false);
    expect(config.autoplay).toBe(false);
  });

  it("maps legacy heroVideo to a single video slide", () => {
    const config = resolveHeroConfig({
      ...baseProject,
      heroVideo: {
        src: "/demo.mp4",
        poster: "/poster.jpg",
      },
    });

    expect(config.slides).toHaveLength(1);
    expect(config.slides[0]).toMatchObject({
      type: "video",
      src: "/demo.mp4",
      poster: "/poster.jpg",
    });
    expect(config.showIndicators).toBe(false);
  });

  it("prefers explicit hero slides over legacy fields", () => {
    const config = resolveHeroConfig({
      ...baseProject,
      heroVideo: { src: "/legacy.mp4" },
      hero: {
        slides: [
          { type: "image", src: "/one.jpg", alt: "One" },
          { type: "image", src: "/two.jpg", alt: "Two" },
          { type: "video", src: "/three.mp4", alt: "Three" },
        ],
      },
    });

    expect(config.slides).toHaveLength(3);
    expect(config.showIndicators).toBe(true);
  });

  it("dedupes explicit hero slides by src", () => {
    const config = resolveHeroConfig({
      ...baseProject,
      hero: {
        slides: [
          { type: "video", src: "/demo.mp4", alt: "A" },
          { type: "video", src: "/demo.mp4", alt: "B" },
        ],
      },
    });

    expect(config.slides).toHaveLength(1);
    expect(config.showIndicators).toBe(false);
  });

  it("honors showIndicators override", () => {
    const config = resolveHeroConfig({
      ...baseProject,
      hero: {
        slides: [
          { type: "image", src: "/one.jpg", alt: "One" },
          { type: "image", src: "/two.jpg", alt: "Two" },
        ],
        showIndicators: false,
      },
    });

    expect(config.slides).toHaveLength(2);
    expect(config.showIndicators).toBe(false);
  });

  it("falls back to thumbnail when hero.slides is empty", () => {
    const config = resolveHeroConfig({
      ...baseProject,
      hero: { slides: [] },
    });

    expect(config.slides).toHaveLength(1);
    expect(config.slides[0]?.src).toBe("/thumb.jpg");
  });
});

describe("resolvePreviewSlide", () => {
  it("returns the first video slide when available", () => {
    const slide = resolvePreviewSlide({
      ...baseProject,
      hero: {
        slides: [
          { type: "image", src: "/one.jpg", alt: "One" },
          { type: "video", src: "/demo.mp4", alt: "Demo" },
        ],
      },
    });

    expect(slide.type).toBe("video");
    expect(slide.src).toBe("/demo.mp4");
  });

  it("returns the first slide when no video exists", () => {
    const slide = resolvePreviewSlide(baseProject);

    expect(slide.type).toBe("image");
    expect(slide.src).toBe("/thumb.jpg");
  });
});

describe("project content integration", () => {
  it("enables indicators for multi-slide hero examples", () => {
    const multiSlideSlugs = [
      "project-onyx",
      "nexus-global-mapping",
      "glitch-code-reel",
    ] as const;

    for (const slug of multiSlideSlugs) {
      const project = projects.find((entry) => entry.slug === slug);
      expect(project, `missing project: ${slug}`).toBeDefined();

      const config = resolveHeroConfig(project!);
      expect(config.slides.length).toBeGreaterThan(1);
      expect(config.showIndicators).toBe(true);
    }
  });

  it("keeps single-slide heroes without indicators", () => {
    const singleSlideSlugs = projects
      .filter((project) => !project.hero?.slides || project.hero.slides.length <= 1)
      .map((project) => project.slug)
      .filter((slug) => !["glitch-code-reel"].includes(slug));

    for (const slug of singleSlideSlugs) {
      const project = projects.find((entry) => entry.slug === slug);
      expect(project).toBeDefined();

      const config = resolveHeroConfig(project!);
      expect(config.showIndicators).toBe(false);
    }
  });
});
