/**
 * 完整 Profile 範本 — 涵蓋 Profile 所有欄位
 *
 * 使用方式：複製欄位至 content/profile.ts，並替換文案與媒體。
 * 頭像置於 public/profile/avatar.jpg（或自訂檔名）。
 *
 * 此檔僅供參考，不會被應用程式直接匯入。
 */
import type { Profile } from "@/lib/types";
import { profileAsset } from "@/lib/assets";

export const profileTemplate: Profile = {
  name: "Your Name",
  brand: "YOUR.BRAND",
  tagline:
    "一句話定位：職稱、專長領域，以及你為使用者或客戶創造的價值。",

  headline: "主標題前半",
  headlineAccent: "主標題強調段。",

  bio: [
    "第一段自介：經歷年資、**設計×工程**的交界、你擅長打造的系統類型。",
    `第二段可含條列與連結：

- 工作方法或美學原則
- 希望合作方如何認識你
- [GitHub](https://github.com/your-handle) 或 [Email](mailto:hello@example.com)`,
  ],

  location: "城市 / Remote",
  status: "接受專案合作",
  avatar: profileAsset("avatar.jpg"),

  stats: [
    { id: "years-active", label: "YEARS_ACTIVE", value: 10 },
    {
      id: "systems-deployed",
      label: "SYSTEMS_DEPLOYED",
      value: 42,
      suffix: "+",
    },
    {
      id: "custom-metric",
      label: "CUSTOM_METRIC",
      value: "24/7",
    },
  ],

  contactEmail: "hello@example.com",

  links: [
    {
      id: "github",
      label: "TERMINAL",
      href: "https://github.com/your-handle",
      external: true,
    },
    {
      id: "source",
      label: "SOURCE",
      href: "https://github.com/your-handle/your-site",
      external: true,
    },
    {
      id: "contact",
      label: "LOGS",
      href: "mailto:hello@example.com",
    },
  ],
};
