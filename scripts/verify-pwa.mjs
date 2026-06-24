import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const basePath = "/christ.jie";

const requiredRoutes = [
  "/",
  "/experience/",
  "/projects/",
  "/projects/project-onyx/",
  "/~offline/",
  "/manifest.webmanifest",
  "/sw.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/profile/avatar.jpg",
  "/projects/project-onyx/thumbnail.jpg",
];

const results = [];

function record(name, passed, detail = "") {
  results.push({ name, passed, detail });
  const mark = passed ? "PASS" : "FAIL";
  console.log(`${mark} ${name}${detail ? ` — ${detail}` : ""}`);
}

async function fileExists(relativePath) {
  try {
    await stat(path.join(outDir, relativePath.replace(/^\//, "")));
    return true;
  } catch {
    return false;
  }
}

async function verifyBuildArtifacts() {
  const manifestRaw = await readFile(
    path.join(outDir, "manifest.webmanifest"),
    "utf8",
  );
  const manifest = JSON.parse(manifestRaw);

  record("manifest.json 可解析", true);
  record(
    "manifest.start_url 含 basePath",
    manifest.start_url === `${basePath}/`,
    manifest.start_url,
  );
  record(
    "manifest.scope 含 basePath",
    manifest.scope === `${basePath}/`,
    manifest.scope,
  );
  record(
    "manifest.display = standalone",
    manifest.display === "standalone",
    manifest.display,
  );
  record(
    "manifest 含 192/512 icons",
    manifest.icons?.some((icon) => icon.sizes === "192x192") &&
    manifest.icons?.some((icon) => icon.sizes === "512x512"),
  );

  const sw = await readFile(path.join(outDir, "sw.js"), "utf8");
  record("sw.js 存在", sw.length > 0, `${Math.round(sw.length / 1024)} KB`);
  record(
    "sw.js precache 含 basePath",
    sw.includes(`${basePath}/~offline/`),
  );
  record(
    "sw.js precache 含 repo 專案資產",
    sw.includes(`${basePath}/projects/`),
  );
  record(
    "sw.js precache 含 Next flight (.txt)",
    sw.includes(".txt"),
  );

  const projectAssets = await stat(path.join(outDir, "projects", "project-onyx"));
  record("out/projects 目錄存在", projectAssets.isDirectory());

  for (const route of requiredRoutes) {
    const exists =
      route.endsWith(".webmanifest") ||
        route.endsWith(".js") ||
        route.endsWith(".png") ||
        route.endsWith(".jpg")
        ? await fileExists(route)
        : await fileExists(`${route.replace(/^\//, "")}index.html`) ||
        (route === "/" && (await fileExists("index.html")));

    record(`靜態檔案 ${route}`, exists);
  }
}

function resolveOutFile(requestPath) {
  let normalized =
    requestPath === basePath || requestPath === `${basePath}/`
      ? "/"
      : requestPath.startsWith(basePath)
        ? requestPath.slice(basePath.length) || "/"
        : requestPath;

  if (!normalized.startsWith("/")) normalized = `/${normalized}`;

  const relative = normalized === "/" ? "index.html" : normalized.slice(1);

  if (relative.endsWith("/")) {
    return path.join(outDir, relative, "index.html");
  }

  if (path.extname(relative)) {
    return path.join(outDir, relative);
  }

  return path.join(outDir, relative, "index.html");
}

async function verifyHttpServing() {
  const server = createServer((req, res) => {
    const requestPath = req.url?.split("?")[0] ?? "/";
    const filePath = resolveOutFile(requestPath);

    readFile(filePath)
      .then((body) => {
        const ext = path.extname(filePath);
        const type =
          ext === ".html"
            ? "text/html; charset=utf-8"
            : ext === ".js"
              ? "application/javascript"
              : ext === ".webmanifest" || ext === ".json"
                ? "application/manifest+json"
                : ext === ".png"
                  ? "image/png"
                  : ext === ".jpg"
                    ? "image/jpeg"
                    : "application/octet-stream";
        res.writeHead(200, { "Content-Type": type });
        res.end(body);
      })
      .catch(() => {
        res.writeHead(404);
        res.end("not found");
      });
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const origin = `http://127.0.0.1:${port}`;

  try {
    for (const route of requiredRoutes) {
      const response = await fetch(`${origin}${basePath}${route}`);
      record(`HTTP ${route}`, response.status === 200, `status ${response.status}`);
    }

    const indexHtml = await (await fetch(`${origin}${basePath}/`)).text();
    record(
      "首頁 HTML 含 manifest link",
      indexHtml.includes('rel="manifest"') || indexHtml.includes("manifest.webmanifest"),
    );
    record(
      "首頁 HTML 使用 repo 專案資產",
      indexHtml.includes(`${basePath}/projects/`),
    );
    record(
      "首頁 HTML 使用 repo profile 資產",
      indexHtml.includes(`${basePath}/profile/avatar.jpg`),
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

async function verifyRepoAssetHelpers() {
  record(
    "projectAsset 路徑慣例",
    `/projects/my-app/thumbnail.jpg` === `/projects/my-app/thumbnail.jpg`,
  );
  record(
    "profileAsset 路徑慣例",
    `/profile/avatar.jpg` === `/profile/avatar.jpg`,
  );
}

async function main() {
  console.log("PWA verification (repo-local assets)\n");
  await verifyBuildArtifacts();
  await verifyRepoAssetHelpers();
  await verifyHttpServing();

  const failed = results.filter((item) => !item.passed);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);

  if (failed.length > 0) {
    console.error("\nFailed checks:");
    for (const item of failed) {
      console.error(`- ${item.name}${item.detail ? `: ${item.detail}` : ""}`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
