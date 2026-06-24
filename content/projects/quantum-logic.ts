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
    "Quantum Logic 為研究團隊提供即時量子位元狀態監控，整合多種感測器資料流。",
    "介面採用模組化儀表板設計，支援自訂告警規則與歷史趨勢分析。",
  ],
  gallery: [
    {
      src: projectAsset(slug, "gallery-01.jpg"),
      alt: "電路板特寫",
      label: "01 // CIRCUIT_MAP",
    },
    {
      src: projectAsset(slug, "gallery-02.jpg"),
      alt: "資料視覺化",
      label: "02 // STATE_VIZ",
    },
    {
      src: projectAsset(slug, "gallery-03.jpg"),
      alt: "實驗室環境",
      label: "03 // LAB_ENV",
      wide: true,
    },
  ],
};
