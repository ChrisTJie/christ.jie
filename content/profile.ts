import type { Profile } from "@/lib/types";
import { profileAsset } from "@/lib/assets";

export const profile: Profile = {
  name: "ChrisT.Jie",
  brand: "CHRIST.JIE",
  tagline:
    "全端工程師與 UI/UX 設計師，專注於高效能 Web 應用與沉浸式數位體驗，將複雜邏輯轉化為流暢介面。",
  headline: "建構",
  headlineAccent: "數位現實。",
  bio: [
    "我活躍於**設計與工程的交界**。在超過十年的 Web 技術演進中，我打造的不只是能運作的系統，而是具有**架構美感**的數位環境。",
    `我的方法根植於邏輯、追求效能，並以對美學細節的執著打磨每一個介面。專注領域包括：

- 高效能 \`Web\` 應用與互動體驗
- 設計系統與 **UI/UX** 工程化
- 將複雜邏輯轉化為流暢介面

我不只是寫程式，而是在構築數位空間。歡迎透過 [GitHub](https://github.com/christjie) 或頁尾 **LOGS** 聯絡。`,
  ],
  location: "台北 / Remote",
  status: "接受專案合作",
  avatar: profileAsset("avatar.jpg"),
  stats: [
    { id: "years-active", label: "YEARS_ACTIVE", value: 12 },
    { id: "systems-deployed", label: "SYSTEMS_DEPLOYED", value: 84, suffix: "+" },
  ],
  contactEmail: "hello@christ.jie",
  links: [
    {
      id: "github",
      label: "TERMINAL",
      href: "https://github.com/christjie",
      external: true,
    },
    {
      id: "source",
      label: "SOURCE",
      href: "https://github.com/christjie/christ.jie",
      external: true,
    },
    {
      id: "contact",
      label: "LOGS",
      href: "mailto:hello@christ.jie",
    },
  ],
};
