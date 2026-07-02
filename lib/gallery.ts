import {
  isVideoGalleryItem,
  type ProjectGalleryItem,
  type ProjectGalleryLayout,
} from "@/lib/types";

export function resolveGalleryLayout(
  item: ProjectGalleryItem,
): ProjectGalleryLayout {
  if (item.layout) return item.layout;
  if (item.wide) return "wide";
  return isVideoGalleryItem(item) ? "landscape" : "portrait";
}

export type GalleryTileClasses = {
  aspect: string;
  col: string;
};

export function getGalleryTileClasses(
  item: ProjectGalleryItem,
): GalleryTileClasses {
  const layout = resolveGalleryLayout(item);

  if (isVideoGalleryItem(item)) {
    return {
      aspect: "aspect-video",
      col: layout === "wide" ? "md:col-span-2 lg:col-span-3" : "",
    };
  }

  switch (layout) {
    case "portrait":
      return { aspect: "aspect-[3/4]", col: "" };
    case "landscape":
      return { aspect: "aspect-video", col: "" };
    case "square":
      return { aspect: "aspect-square", col: "" };
    case "wide":
      return { aspect: "aspect-video", col: "md:col-span-2 lg:col-span-2" };
  }
}
