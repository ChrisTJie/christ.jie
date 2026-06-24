import type { ProjectItem } from "@/lib/types";
import { projectAsset } from "@/lib/assets";

const slug = "project-onyx";

export const projectOnyx: ProjectItem = {
  slug,
  title: "Project_Onyx",
  subtitle: "次世代威脅偵測介面",
  description:
    "運用預測性神經網路，即時視覺化網路異常的下一代威脅偵測介面。",
  category: "SEC_OPS",
  tags: ["REACT", "D3.JS", "PYTHON"],
  deployed: "2023.11",
  thumbnail: projectAsset(slug, "thumbnail.jpg"),
  hero: {
    slides: [
      {
        type: "image",
        src: projectAsset(slug, "hero-01.jpg"),
        alt: "威脅偵測介面總覽",
        label: "01 // COMMAND_VIEW",
      },
      {
        type: "image",
        src: projectAsset(slug, "hero-02.jpg"),
        alt: "終端機介面",
        label: "02 // TERMINAL_VIEW",
      },
      {
        type: "image",
        src: projectAsset(slug, "hero-03.jpg"),
        alt: "全球節點地圖",
        label: "03 // GEO_NODES",
      },
    ],
  },
  role: "Lead UI/UX Engineer",
  timeline: "Q3 2023 - Q1 2024",
  summary: [
    "Project Onyx 旨在填補抽象機器學習演算法與即時視覺分析之間的鴻溝，為高效能資安營運中心打造。",
    "平台可攝取大量網路日誌，並轉譯為流暢的 3D 節點環境，讓分析師在數秒內定位異常。",
  ],
  gallery: [
    {
      src: projectAsset(slug, "gallery-01.jpg"),
      alt: "終端機介面",
      label: "01 // TERMINAL_VIEW",
    },
    {
      src: projectAsset(slug, "gallery-02.jpg"),
      alt: "全球節點地圖",
      label: "02 // GEO_NODES",
    },
    {
      src: projectAsset(slug, "gallery-03.jpg"),
      alt: "伺服器機房",
      label: "03 // HARDWARE_SYNC",
      wide: true,
    },
  ],
  links: [
    { label: "LIVE_DEMO", href: "https://example.com/onyx", external: true },
    { label: "REPO", href: "https://github.com/christjie", external: true },
  ],
};
