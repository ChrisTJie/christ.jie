import type { ProjectItem } from "@/lib/types";
import { projectAsset } from "@/lib/assets";

const slug = "synapse-ui-kit";

export const synapseUiKit: ProjectItem = {
  slug,
  title: "Synapse_UI_Kit",
  subtitle: "設計系統與元件庫",
  description:
    "可擴展的 React 設計系統，涵蓋無障礙元件、主題令牌與文件站點。",
  category: "UI_ENGINEERING",
  tags: ["REACT", "STORYBOOK", "A11Y"],
  deployed: "2024.05",
  featured: true,
  thumbnail: projectAsset(slug, "thumbnail.jpg"),
  role: "Design Systems Lead",
  timeline: "Q2 2024 - 進行中",
  summary: [
    `**Synapse UI Kit** 為內部產品線提供統一的視覺語言與互動模式，是可擴展的 \`React\` 設計系統與元件庫。`,
    `元件庫以無障礙與主題化為核心，涵蓋：

- 深色主題與設計令牌（design tokens）
- 完整鍵盤導覽與焦點管理
- **WCAG 2.1 AA** 對比標準與 \`Storybook\` 文件站點`,
  ],
  gallery: [
    {
      src: projectAsset(slug, "gallery-01.jpg"),
      alt: "元件預覽",
      label: "01 // COMPONENTS",
    },
    {
      src: projectAsset(slug, "gallery-02.jpg"),
      alt: "文件站點",
      label: "02 // DOCS",
    },
  ],
};
