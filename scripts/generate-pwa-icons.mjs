import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, "..", "public", "icons");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#051424"/>
  <rect x="24" y="24" width="464" height="464" fill="none" stroke="#00f5ff" stroke-width="20"/>
  <text x="256" y="300" text-anchor="middle" fill="#00f5ff" font-family="monospace" font-size="180" font-weight="700">CJ</text>
</svg>
`;

async function main() {
  await mkdir(iconsDir, { recursive: true });
  await writeFile(path.join(iconsDir, "icon.svg"), svg.trim(), "utf8");

  for (const size of [192, 512]) {
    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(path.join(iconsDir, `icon-${size}.png`));
    console.log(`generated icon-${size}.png`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
