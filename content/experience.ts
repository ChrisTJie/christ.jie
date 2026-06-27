import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  SkillItem,
} from "@/lib/types";

export const experiences: ExperienceItem[] = [
  {
    id: "senior-architect",
    title: "資深系統架構師",
    company: "Nexus Dynamics Corp.",
    period: "2021 - 至今",
    active: true,
    description:
      "主導**分散式神經網路**基礎架構設計。協調將舊有單體系統遷移至可擴展的微服務生態，資料吞吐量提升 **400%**。",
    highlights: [
      "設計**跨區域事件驅動架構**，將核心服務延遲降至 **40ms** 以內。",
      "建立內部**平台工程**標準，縮短新服務上線時間 **60%**。",
    ],
    tags: ["KUBERNETES", "GO", "TENSORFLOW"],
  },
  {
    id: "backend-engineer",
    title: "後端工程師",
    company: "Cyberdyne Systems",
    period: "2018 - 2021",
    emphasis: true,
    highlights: [
      "開發核心 **API Gateway**，每日處理超過 **200 萬**次請求。",
      "實作自動化安全協定，威脅向量降低 **60%**。",
    ],
    tags: ["NODE.JS", "POSTGRESQL", "REDIS"],
  },
  {
    id: "junior-developer",
    title: "初級開發工程師",
    company: "Aperture Science",
    period: "2016 - 2018",
    muted: true,
    description:
      "維護舊有資料庫系統，協助開發內部監控儀表板的 **Vue.js** 前端介面。",
    tags: ["PYTHON", "VUE.JS"],
  },
];

export const education: EducationItem[] = [
  {
    id: "ntu-ms",
    degree: "資訊科學碩士",
    school: "國立台灣大學 • 分散式系統",
    detail: "專注於分散式運算與雲端架構",
    graduated: "2016 畢業",
  },
  {
    id: "ntu-bs",
    degree: "資訊工程學士",
    school: "國立台灣大學 • 資訊工程學系",
    detail: "主修軟體工程與人機互動，畢業專題為即時資料視覺化平台",
    graduated: "2014 畢業",
  },
];

export const certifications: CertificationItem[] = [
  {
    id: "aws-saa",
    name: "AWS Solutions Architect",
    detail: "有效至 2026",
    icon: "cloud",
  },
  {
    id: "ceh",
    name: "Certified Ethical Hacker",
    detail: "2019 取得",
    icon: "security",
  },
];

export const skills: SkillItem[] = [
  { id: "system-arch", name: "SYSTEM_ARCH", level: 95, highlight: true },
  { id: "cloud-infra", name: "CLOUD_INFRA", level: 88 },
  { id: "frontend-ux", name: "FRONTEND_UX", level: 92, highlight: true },
  { id: "data-pipeline", name: "DATA_PIPELINE", level: 85 },
];
