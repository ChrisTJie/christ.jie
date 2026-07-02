import type { ProjectItem } from "@/lib/types";
import { projectAsset } from "@/lib/assets";

const slug = "nexus-global-mapping";

export const nexusGlobalMapping: ProjectItem = {
  slug,
  title: "Nexus_Global_Mapping",
  subtitle: "全球資料流互動地圖",
  description:
    "運用自訂 WebGL 管線，可同時渲染數百萬節點的即時互動全球資料流地圖系統。",
  category: "DATA_VIZ",
  tags: ["REACT", "THREE.JS", "GLSL"],
  deployed: "2023.05",
  featured: true,
  wide: true,
  thumbnail: projectAsset(slug, "thumbnail.jpg"),
  hero: {
    slides: [
      {
        type: "image",
        src: projectAsset(slug, "hero-01.jpg"),
        alt: "全球資料流地圖總覽",
        label: "01 // GLOBAL_MESH",
      },
      {
        type: "image",
        src: projectAsset(slug, "hero-02.jpg"),
        alt: "終端機視圖",
        label: "02 // TERMINAL_VIEW",
      },
      {
        type: "image",
        src: projectAsset(slug, "hero-03.jpg"),
        alt: "硬體同步節點",
        label: "03 // HARDWARE_SYNC",
      },
    ],
  },
  role: "Lead Architect UI/UX",
  timeline: "Q1 2023 - Q3 2023",
  summary: [
    `**Nexus Global Mapping** 是為高效能資安營運中心設計的即時全球資料流視覺化平台，可同時渲染數百萬節點而不犧牲互動性。`,
    `透過 \`WebGL\` 著色器與 **Rust** 資料處理管線，在重負載下仍維持 **120fps** 渲染。介面以 cyber-industrial 美學呈現，讓異常節點與資料流斷點一目了然。`,
  ],
  gallery: [
    {
      src: projectAsset(slug, "gallery-01.jpg"),
      alt: "終端機視圖",
      label: "01 // TERMINAL_VIEW",
      layout: "portrait",
    },
    {
      src: projectAsset(slug, "gallery-02.jpg"),
      alt: "地理節點",
      label: "02 // GEO_NODES",
      layout: "square",
    },
    {
      src: projectAsset(slug, "gallery-03.jpg"),
      alt: "硬體同步",
      label: "03 // HARDWARE_SYNC",
      layout: "landscape",
    },
    {
      src: projectAsset(slug, "hero-01.jpg"),
      alt: "全球資料流地圖",
      label: "04 // GLOBAL_MESH",
      layout: "wide",
    },
  ],
};
