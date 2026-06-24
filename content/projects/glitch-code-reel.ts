import type { ProjectItem } from "@/lib/types";
import { projectAsset } from "@/lib/assets";

const slug = "glitch-code-reel";

export const glitchCodeReel: ProjectItem = {
  slug,
  title: "Glitch_Code_Reel",
  subtitle: "Glitch 程式碼視覺素材",
  description:
    "免費授權的 glitch、程式碼與終端機風格動態素材，適用於 cyber-industrial 介面背景與片頭。",
  category: "CLI_TOOLS",
  tags: ["GLITCH", "CODE", "STOCK_FOOTAGE"],
  deployed: "2026.06",
  featured: true,
  thumbnail: projectAsset(slug, "poster.jpg"),
  hero: {
    slides: [
      {
        type: "video",
        src: projectAsset(slug, "demo.mp4"),
        poster: projectAsset(slug, "poster.jpg"),
        alt: "Glitch 程式碼 stock footage 完整片段",
        label: "01 // GLITCH_REEL",
      },
      {
        type: "image",
        src: projectAsset(slug, "poster.jpg"),
        alt: "Glitch 程式碼素材靜態海報",
        label: "02 // POSTER_STILL",
      },
    ],
  },
  summary: [
    "一段約 10 秒的 glitch 程式碼 stock footage，以數位雜訊、終端機文字與干擾效果呈現 programming 視覺語彙。",
    "作為 christ.jie 的影音展示範例，支援專案卡片 hover 預覽、詳情頁 Hero 自動播放與畫廊手動播放。",
  ],
  gallery: [
    {
      type: "video",
      src: projectAsset(slug, "demo.mp4"),
      poster: projectAsset(slug, "poster.jpg"),
      alt: "Glitch 程式碼 stock footage 完整片段",
      label: "01 // GLITCH_REEL",
      wide: true,
    },
  ],
};
