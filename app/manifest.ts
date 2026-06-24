import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import {
  PWA_BACKGROUND_COLOR,
  PWA_THEME_COLOR,
} from "@/lib/pwa";

export const dynamic = "force-static";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const prefix = (path: string) => `${basePath}${path}`;

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: prefix("/"),
    name: `${profile.brand} | Portfolio`,
    short_name: profile.brand,
    description: profile.tagline,
    start_url: prefix("/"),
    scope: prefix("/"),
    display: "standalone",
    orientation: "portrait-primary",
    background_color: PWA_BACKGROUND_COLOR,
    theme_color: PWA_THEME_COLOR,
    lang: "zh-Hant",
    icons: [
      {
        src: prefix("/icons/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: prefix("/icons/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
