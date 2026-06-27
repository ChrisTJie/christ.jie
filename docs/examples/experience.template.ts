/**
 * 完整 Experience 範本 — 涵蓋經歷、學歷、證照、技能所有欄位
 *
 * 使用方式：複製至 content/experience.ts，替換為真實資料。
 * MaterialIcon 名稱見 https://fonts.google.com/icons
 *
 * 此檔僅供參考，不會被應用程式直接匯入。
 */
import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  SkillItem,
} from "@/lib/types";

/** 建議依時間倒序排列；樣式旗標可並存於不同項目 */
export const experiencesTemplate: ExperienceItem[] = [
  {
    id: "current-role",
    title: "資深工程師",
    company: "Company Name",
    period: "2022 - 至今",
    active: true,
    description:
      "現職概述：負責的系統範圍、團隊規模或技術方向。可使用 **粗體** 與 `行內 code`。",
    highlights: [
      "可量化的成果或里程碑（延遲、吞吐、成本等），例如延遲降至 **40ms**。",
      "第二項重點成就，可含 [外部連結](https://example.com)。",
    ],
    tags: ["REACT", "TYPESCRIPT", "AWS"],
  },
  {
    id: "past-role-emphasis",
    title: "全端工程師",
    company: "Previous Corp.",
    period: "2019 - 2022",
    emphasis: true,
    highlights: [
      "此筆使用 emphasis 時間軸節點強調，無 description 亦可。",
    ],
    tags: ["NODE.JS", "POSTGRESQL"],
  },
  {
    id: "early-role-muted",
    title: "初級開發工程師",
    company: "First Company",
    period: "2016 - 2019",
    muted: true,
    description: "早期職涯簡述；muted 會淡化卡片視覺。",
    tags: ["PYTHON", "VUE.JS"],
  },
];

export const educationTemplate: EducationItem[] = [
  {
    id: "graduate-degree",
    degree: "碩士學位名稱",
    school: "學校名稱 • 系所或研究方向",
    detail: "研究或課程重點一句話",
    graduated: "20XX 畢業",
  },
  {
    id: "undergraduate-degree",
    degree: "學士學位名稱",
    school: "學校名稱 • 系所",
    detail: "畢業專題或主修領域",
    graduated: "20XX 畢業",
  },
];

export const certificationsTemplate: CertificationItem[] = [
  {
    id: "cert-primary",
    name: "Certification Name",
    detail: "有效至 20XX 或取得年份",
    icon: "cloud",
  },
  {
    id: "cert-secondary",
    name: "Another Certification",
    detail: "20XX 取得",
    icon: "security",
  },
];

/** level 為 0–100，對應技能進度條 */
export const skillsTemplate: SkillItem[] = [
  { id: "skill-a", name: "SKILL_A", level: 95, highlight: true },
  { id: "skill-b", name: "SKILL_B", level: 88 },
  { id: "skill-c", name: "SKILL_C", level: 92, highlight: true },
  { id: "skill-d", name: "SKILL_D", level: 80 },
];
