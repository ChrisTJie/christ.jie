/**
 * 完整專案範本 — 涵蓋 ProjectItem 所有欄位與常見媒體組合
 *
 * 使用方式：
 * 1. 複製為 content/projects/{slug}.ts，將 slug 與匯出名稱改為實際專案名
 * 2. 依下方「public/ 資產清單」建立媒體檔案
 * 3. 在 content/projects/index.ts 匯入並加入 projects 陣列
 * 4. 刪除或調整不需要的選填欄位（featured、wide、links 等）
 *
 * 此檔僅供參考，不會被應用程式直接匯入。
 *
 * public/ 資產清單（public/projects/{slug}/）：
 *   thumbnail.jpg      — 必填
 *   hero-01.jpg        — Hero 圖片 slide
 *   hero-02.jpg
 *   poster.jpg         — 影片 poster / 靜態 slide
 *   demo.mp4           — Hero 與畫廊影片
 *   gallery-01.jpg     — 畫廊方圖
 *   gallery-02.jpg     — 畫廊 wide 圖
 */
import type { ProjectItem } from "@/lib/types";
import { projectAsset } from "@/lib/assets";

/** 與檔名、public/projects/ 目錄、路由 /projects/{slug}/ 一致 */
const slug = "my-full-project";

export const myFullProject: ProjectItem = {
  // ── 識別與 SEO ─────────────────────────────────────────────
  slug,
  title: "My_Full_Project",
  subtitle: "完整欄位示範專案",
  description:
    "列表卡摘要與詳情頁 meta description。一至兩句話說明專案價值與技術重點。",

  // ── 分類與標籤 ─────────────────────────────────────────────
  // 合法值：WEBGL | SEC_OPS | SYS_ARCH | DATA_VIZ | CLI_TOOLS | NEURAL_NETS | UI_ENGINEERING
  category: "UI_ENGINEERING",
  tags: ["REACT", "TYPESCRIPT", "NEXT.JS"],
  deployed: "2025.06",

  // ── 列表卡版面（選填）──────────────────────────────────────
  featured: true,
  wide: true,

  // ── 詳情頁側欄（選填，有值才顯示 TIMELINE & ROLE 區塊）────
  role: "Lead Engineer",
  timeline: "Q1 2025 - 進行中",

  // ── 縮圖（必填；亦為 Hero / 預覽回退圖）────────────────────
  thumbnail: projectAsset(slug, "thumbnail.jpg"),

  // ── Hero 輪播（選填；省略時詳情頁使用 thumbnail）──────────
  hero: {
    slides: [
      {
        id: "hero-command",
        type: "image",
        src: projectAsset(slug, "hero-01.jpg"),
        alt: "主要介面總覽",
        label: "01 // COMMAND_VIEW",
      },
      {
        id: "hero-terminal",
        type: "image",
        src: projectAsset(slug, "hero-02.jpg"),
        alt: "終端機或次要視圖",
        label: "02 // TERMINAL_VIEW",
      },
      {
        id: "hero-demo",
        type: "video",
        src: projectAsset(slug, "demo.mp4"),
        poster: projectAsset(slug, "poster.jpg"),
        alt: "產品示範影片",
        label: "03 // DEMO_REEL",
      },
      {
        id: "hero-still",
        type: "image",
        src: projectAsset(slug, "poster.jpg"),
        alt: "示範影片靜態海報",
        label: "04 // POSTER_STILL",
      },
    ],
    autoplay: false,
    intervalMs: 8000,
    loop: true,
    showIndicators: true,
  },

  // ── Executive Summary（必填；每項為一個 Markdown 區塊，支援 GFM）──
  summary: [
    "第一段：專案背景、要解決的問題，以及你在其中的角色。可使用 **粗體**、\`行內 code\` 或 [連結](https://example.com)。",
    `第二段：技術架構、關鍵決策或可量化的成果。支援條列：

- 效能或規模指標
- 架構決策與取捨
- 使用者或業務影響`,
    "第三段（選填）：後續演進、維運狀態或學習心得。純文字段落無 Markdown 語法時，顯示與過去相同。",
  ],

  // ── 畫廊 VISUAL_ARCHIVE（必填，label 在同一專案內須唯一）──
  gallery: [
    {
      src: projectAsset(slug, "gallery-01.jpg"),
      alt: "標準方圖畫廊項目",
      label: "01 // MAIN_SCREEN",
    },
    {
      src: projectAsset(slug, "gallery-02.jpg"),
      alt: "跨欄寬圖（md 起佔兩欄）",
      label: "02 // WIDE_LAYOUT",
      wide: true,
    },
    {
      type: "video",
      src: projectAsset(slug, "demo.mp4"),
      poster: projectAsset(slug, "poster.jpg"),
      alt: "畫廊內可手動播放的示範影片",
      label: "03 // DEMO_CLIP",
      wide: true,
    },
  ],

  // ── 外部連結（選填，有值且非空才顯示 EXTERNAL_LINKS）──────
  links: [
    {
      label: "LIVE_DEMO",
      href: "https://example.com/demo",
      external: true,
    },
    {
      label: "REPO",
      href: "https://github.com/your-org/your-repo",
      external: true,
    },
    {
      label: "RELATED_LOG",
      href: "/experience/",
      external: false,
    },
  ],
};
