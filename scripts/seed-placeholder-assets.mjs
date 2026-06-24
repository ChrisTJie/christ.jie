/**
 * One-time helper: copies legacy `public/media/` hashes into
 * `public/projects/{slug}/` and `public/profile/` using semantic filenames.
 * Safe to re-run; skips existing destinations.
 */
import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mediaDir = path.join(root, "public", "media");
const publicDir = path.join(root, "public");

const copies = [
  ["0215d0313ced.jpg", "profile/avatar.jpg"],
  ["0e102e714ff6.jpg", "projects/project-onyx/thumbnail.jpg"],
  ["becdd95a91c0.jpg", "projects/project-onyx/hero-01.jpg"],
  ["c5ffdc5c7e84.jpg", "projects/project-onyx/hero-02.jpg"],
  ["3fc44e517197.jpg", "projects/project-onyx/hero-03.jpg"],
  ["4b758698c9fe.jpg", "projects/project-onyx/gallery-01.jpg"],
  ["452e034142ec.jpg", "projects/project-onyx/gallery-02.jpg"],
  ["4f1f1acb7035.jpg", "projects/project-onyx/gallery-03.jpg"],
  ["65ca8471b93c.jpg", "projects/void-renderer/thumbnail.jpg"],
  ["0ff0e1a48993.jpg", "projects/void-renderer/gallery-01.jpg"],
  ["5895e80981bb.jpg", "projects/void-renderer/gallery-02.jpg"],
  ["2dfeed2564ed.jpg", "projects/void-renderer/gallery-03.jpg"],
  ["93add4f8ba2d.jpg", "projects/quantum-logic/thumbnail.jpg"],
  ["38293950d119.jpg", "projects/quantum-logic/gallery-01.jpg"],
  ["5895e80981bb.jpg", "projects/quantum-logic/gallery-02.jpg"],
  ["91f63acf58a3.jpg", "projects/quantum-logic/gallery-03.jpg"],
  ["e223b449477a.jpg", "projects/nexus-global-mapping/thumbnail.jpg"],
  ["3fc44e517197.jpg", "projects/nexus-global-mapping/hero-01.jpg"],
  ["c5ffdc5c7e84.jpg", "projects/nexus-global-mapping/hero-02.jpg"],
  ["2d9cf95915c1.jpg", "projects/nexus-global-mapping/hero-03.jpg"],
  ["4b758698c9fe.jpg", "projects/nexus-global-mapping/gallery-01.jpg"],
  ["452e034142ec.jpg", "projects/nexus-global-mapping/gallery-02.jpg"],
  ["4f1f1acb7035.jpg", "projects/nexus-global-mapping/gallery-03.jpg"],
  ["df959510b605.jpg", "projects/term-env-v4/thumbnail.jpg"],
  ["2dd1354fd56d.jpg", "projects/term-env-v4/gallery-01.jpg"],
  ["2c3af39ac3c1.jpg", "projects/term-env-v4/gallery-02.jpg"],
  ["2dfeed2564ed.jpg", "projects/term-env-v4/gallery-03.jpg"],
  ["eb5e6e8041b5.jpg", "projects/synapse-ui-kit/thumbnail.jpg"],
  ["5895e80981bb.jpg", "projects/synapse-ui-kit/gallery-01.jpg"],
  ["2c3af39ac3c1.jpg", "projects/synapse-ui-kit/gallery-02.jpg"],
];

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  for (const [sourceName, destRelative] of copies) {
    const source = path.join(mediaDir, sourceName);
    const dest = path.join(publicDir, destRelative);

    if (!(await exists(source))) {
      console.warn(`skip missing source: ${sourceName}`);
      continue;
    }

    await mkdir(path.dirname(dest), { recursive: true });

    if (await exists(dest)) {
      console.log(`exists ${destRelative}`);
      continue;
    }

    await copyFile(source, dest);
    console.log(`copied -> ${destRelative}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
