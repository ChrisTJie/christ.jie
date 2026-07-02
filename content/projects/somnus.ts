import type { ProjectItem } from "@/lib/types";
import { projectAsset } from "@/lib/assets";

const slug = "somnus";

export const somnus: ProjectItem = {
  slug,
  title: "SOMNUS",
  subtitle: "《SOMNUS》是一款以「完美迴避」為核心機制的第一人稱射擊遊戲。",
  description:
    "《SOMNUS》是一款以「完美迴避」為核心機制的第一人稱射擊遊戲。",

  category: "GAME_DEV",
  tags: ["UNITY 6", "C#", "WINDOWS"],
  deployed: "2019.08",

  featured: true,
  wide: true,

  role: "Lead Engineer",
  timeline: "Q3 2019 - Present",

  thumbnail: projectAsset(slug, "poster.png"),

  hero: {
    slides: [
      {
        type: "video",
        src: projectAsset(slug, "reel.mp4"),
        poster: projectAsset(slug, "poster.png"),
        alt: "REEL",
        label: "01 // REEL",
      },
      {
        type: "image",
        src: projectAsset(slug, "a5c9158a-44f7-4b0a-9a5a-94efe0b110ec.png"),
        alt: "COMMAND_VIEW",
        label: "02 // COMMAND_VIEW",
      },
      {
        type: "image",
        src: projectAsset(slug, "684d8d57-23de-453b-8f0b-36dd2ca1940e.png"),
        alt: "COMMAND_VIEW",
        label: "03 // COMMAND_VIEW",
      },
      {
        type: "image",
        src: projectAsset(slug, "f84dc67e-6727-4f52-97d3-466d80d01136.png"),
        alt: "COMMAND_VIEW",
        label: "04 // COMMAND_VIEW",
      },
      {
        type: "image",
        src: projectAsset(slug, "ea55509c-66ac-43c6-ba5a-b2e257477694.png"),
        alt: "COMMAND_VIEW",
        label: "05 // COMMAND_VIEW",
      },
      {
        type: "image",
        src: projectAsset(slug, "80f9b5fb-9fd0-4f19-b9c6-884591ae9f9f.png"),
        alt: "COMMAND_VIEW",
        label: "06 // COMMAND_VIEW",
      },
      {
        type: "image",
        src: projectAsset(slug, "5c731e23-440f-4323-9aa0-0621a384832d.png"),
        alt: "COMMAND_VIEW",
        label: "07 // COMMAND_VIEW",
      },
      {
        type: "image",
        src: projectAsset(slug, "451bcfb6-d67b-4273-838e-6226386d650e.png"),
        alt: "COMMAND_VIEW",
        label: "08 // COMMAND_VIEW",
      },
      {
        type: "image",
        src: projectAsset(slug, "b47f7f6f-c2b6-4fc4-b506-4df1733276c5.png"),
        alt: "COMMAND_VIEW",
        label: "09 // COMMAND_VIEW",
      },
      {
        type: "image",
        src: projectAsset(slug, "8a9c56de-99fb-42a2-a192-d4b141f3b636.png"),
        alt: "COMMAND_VIEW",
        label: "10 // COMMAND_VIEW",
      },
    ],
    autoplay: false,
    intervalMs: 8000,
    loop: true,
    showIndicators: true,
  },

  summary: [
    `
---

## 介紹

- 玩家將扮演潛入夢境的密醫 \`榮格\`，使用禁忌技術 \`DIVE\` 進入患者的潛意識，透過調查與戰鬥逐步揭開夢境背後的真相。

- 在調查階段，玩家需觀察環境、閱讀文件並拼湊碎片化的線索；

- 在戰鬥階段，玩家必須於精準時機使用 \`完美迴避\` 來啟動子彈時間並回復 \`噩夢燃料\`，

- 以此在有限空間中擊敗象徵心理創傷的頭目，深入探索潛意識的黑暗世界。

---

## 遊戲特色

* **完美迴避系統** 精準迴避攻擊，觸發子彈時間並創造反擊機會。

* **獨特彈藥系統** 結合資源管理，依照戰況調整彈藥配置。

* **快節奏戰鬥** 流暢結合移動、閃避、射擊與技能。

* **多樣化武器** 提供不同攻擊方式與操作手感。

* **扎實射擊回饋** 透過動畫、音效與特效強化命中感。

* **多元技能選擇** 自由搭配技能，建立不同戰鬥策略。

* **高難度頭目戰** 挑戰玩家的反應、判斷與操作能力。

* **劇情解謎要素** 探索場景、蒐集線索，揭開夢境背後的真相。

---

## 學生製作團隊

| 成員 | 負責項目 |
| --- | --- |
| **王淯傑** | 主程式、3D 動作輔助、場景打光 |
| **林易辰** | 主企劃、3D 動作 |
| **林煒翔** | 3D 主美術、編劇 |
| **林正耘** | 2D 主美術、音效 |
| **郭秉澄** | 2D 副美術、介面設計 |
| **徐昊** | 特效 |
    `
  ],

  gallery: [
    {
      type: "video",
      src: projectAsset(slug, "trailer.mp4"),
      poster: projectAsset(slug, "trailer.png"),
      alt: "TRAILER",
      label: "01 // TRAILER",
      layout: "wide",
    },
    {
      src: projectAsset(slug, "ed92ffa1-9f54-4b4c-b38a-4d11ad26fa6a.png"),
      alt: "POSTER",
      label: "02 // POSTER",
      layout: "portrait",
    },
  ],

  awards: [
    {
      title: "Merit Award",
      text: "**Vision Get Wild** · PC · 2020",
      image: {
        src: projectAsset(slug, "vision-get-wild.png"),
        alt: "Merit Award",
      },
    },
    {
      title: "Merit Award",
      text: "**Youth Innovative Design Festival** | **Tech and Game Design** · PC · 2020",
      image: {
        src: projectAsset(slug, "youth-innovative-design-festival.png"),
        alt: "Merit Award",
      },
    },
  ],

  links: [
    {
      label: "STEAM_STORE_PAGE",
      href: "https://store.steampowered.com/app/2841500/SOMNUS/",
      external: true,
    },
  ],
};
