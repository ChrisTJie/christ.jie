import type { ProjectItem } from "@/lib/types";
import { projectAsset } from "@/lib/assets";

const slug = "quantum-logic";

export const quantumLogic: ProjectItem = {
  slug,
  title: "Quantum_Logic",
  subtitle: "量子狀態監控儀表板",
  description:
    "實驗性硬體介面儀表板，用於監控局部量子態波動與錯誤率。",
  category: "SYS_ARCH",
  tags: ["RUST", "REACT", "MQTT"],
  deployed: "2023.08",
  thumbnail: projectAsset(slug, "thumbnail.jpg"),
  role: "Systems Architect",
  timeline: "Q2 2023 - Q4 2023",
  summary: [
    `**Quantum Logic** 為研究團隊提供即時量子位元狀態監控，整合多種感測器資料流與 \`MQTT\` 事件匯流，用於實驗性硬體介面儀表板。`,
    `介面採用模組化儀表板設計，支援：

- 自訂告警規則與閾值觸發
- 量子態波動與錯誤率的歷史趨勢分析
- \`Rust\` 後端與 \`React\` 前端的即時雙向同步`,
  ],
  gallery: [
    {
      src: projectAsset(slug, "gallery-01.jpg"),
      alt: "電路板特寫",
      label: "01 // CIRCUIT_MAP",
      layout: "portrait",
    },
    {
      src: projectAsset(slug, "gallery-02.jpg"),
      alt: "資料視覺化",
      label: "02 // STATE_VIZ",
      layout: "square",
    },
    {
      src: projectAsset(slug, "gallery-03.jpg"),
      alt: "實驗室環境",
      label: "03 // LAB_ENV",
      layout: "landscape",
    },
    {
      src: projectAsset(slug, "thumbnail.jpg"),
      alt: "量子監控總覽",
      label: "04 // DASHBOARD_VIEW",
      layout: "wide",
    },
  ],
};
