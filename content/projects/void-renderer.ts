import type { ProjectItem } from "@/lib/types";
import { projectAsset } from "@/lib/assets";

const slug = "void-renderer";

export const voidRenderer: ProjectItem = {
  slug,
  title: "Void_Renderer",
  subtitle: "高效能 WebGL 渲染引擎",
  description:
    "專為瀏覽器環境打造的高效能抽象資料視覺化自訂 WebGL 渲染引擎。",
  category: "WEBGL",
  tags: ["WEBGL", "TYPESCRIPT", "GLSL"],
  deployed: "2024.02",
  thumbnail: projectAsset(slug, "thumbnail.jpg"),
  role: "Rendering Engineer",
  timeline: "Q1 2024 - Q2 2024",
  summary: [
    "Void Renderer 是一套輕量級 WebGL 抽象層，專注於百萬級節點的即時渲染。",
    "透過自訂著色器管線與 WASM 加速，在一般筆電上維持 60fps 以上的流暢體驗。",
  ],
  gallery: [
    {
      src: projectAsset(slug, "gallery-01.jpg"),
      alt: "3D 幾何渲染",
      label: "01 // WIREFRAME",
    },
    {
      src: projectAsset(slug, "gallery-02.jpg"),
      alt: "效能儀表板",
      label: "02 // PERF_METRICS",
    },
    {
      src: projectAsset(slug, "gallery-03.jpg"),
      alt: "程式碼編輯器",
      label: "03 // SHADER_DEV",
      wide: true,
    },
  ],
};
