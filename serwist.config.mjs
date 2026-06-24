import { serwist } from "@serwist/next/config";

const revision =
  process.env.SERWIST_REVISION ??
  process.env.GITHUB_SHA?.slice(0, 12) ??
  Date.now().toString();

function createStaticExportTransform(basePath) {
  return async (manifestEntries) => {
    const manifest = manifestEntries.map((entry) => {
      let url = entry.url.replace(/\\/g, "/");

      if (url.endsWith("/index.html")) {
        url = url.slice(0, -"index.html".length);
      } else if (url.endsWith(".html")) {
        url = url.slice(0, -".html".length);
      }

      if (!url.startsWith("/")) {
        url = `/${url}`;
      }

      if (basePath && !url.startsWith(basePath)) {
        url = `${basePath}${url}`;
      }

      return { ...entry, url };
    });

    return { manifest, warnings: [] };
  };
}

export default await serwist.withNextConfig(async (nextConfig) => {
  const basePath = nextConfig.basePath ?? "";

  return {
    swSrc: "app/sw.ts",
    swDest: "out/sw.js",
    globDirectory: "out",
    precachePrerendered: false,
    globPatterns: [
      "**/*.{html,txt,js,css,woff2,png,jpg,jpeg,webmanifest,svg,json,ico}",
    ],
    globIgnores: [
      "**/sw.js",
      "**/sw.js.map",
      "**/*.mp4",
      "**/node_modules/**",
    ],
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    manifestTransforms: [createStaticExportTransform(basePath)],
    additionalPrecacheEntries: [{ url: `${basePath}/~offline/`, revision }],
    esbuildOptions: {
      define: {
        __PWA_BASE_PATH__: JSON.stringify(basePath),
      },
    },
  };
});
