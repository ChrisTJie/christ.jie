import { withBasePath } from "@/lib/base-path";

/** Repo-local project asset under `public/projects/{slug}/`. */
export function projectAsset(slug: string, filename: string): string {
  return `/projects/${slug}/${filename}`;
}

/** Repo-local profile asset under `public/profile/`. */
export function profileAsset(filename: string): string {
  return `/profile/${filename}`;
}

/** Prefix repo-local asset paths with deployment basePath. */
export function resolveAssetSrc(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return withBasePath(src);
}
