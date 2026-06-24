# 內容模型總覽

本站內容以 **TypeScript 靜態資料** 驅動，型別定義於 `lib/types.ts`，實際文案與媒體路徑放在 `content/` 與 `public/`。

## 架構

```
lib/types.ts          ← 型別契約（單一真相來源）
content/
  profile.ts          ← 首頁個人檔
  experience.ts       ← 經歷、學歷、證照、技能
  projects/
    index.ts          ← 專案清單與分類常數
    {slug}.ts         ← 單一專案資料
public/
  profile/            ← 個人頭像等
  projects/{slug}/    ← 專案縮圖、Hero、畫廊媒體
```

頁面元件 **不硬編碼文案**，只消費上述資料。新增或修改內容時，通常只需改 `content/` 與對應的 `public/` 資產，不必動 UI 元件。

## 內容模組

| 模組 | 型別 | 資料檔 | 主要頁面 |
|------|------|--------|----------|
| 個人檔 | `Profile` | `content/profile.ts` | 首頁、`app/layout.tsx`（SEO） |
| 經歷 | `ExperienceItem[]` | `content/experience.ts` | `/experience/` |
| 學歷 | `EducationItem[]` | `content/experience.ts` | `/experience/` |
| 證照 | `CertificationItem[]` | `content/experience.ts` | `/experience/` |
| 技能 | `SkillItem[]` | `content/experience.ts` | `/experience/` |
| 作品集 | `ProjectItem[]` | `content/projects/*.ts` | `/projects/`、`/projects/[slug]/` |

## 快速開始：新增專案

1. 在 `public/projects/{slug}/` 放置媒體（至少 `thumbnail.jpg`）。
2. 新增 `content/projects/{slug}.ts`，匯出符合 `ProjectItem` 的物件。
3. 在 `content/projects/index.ts` 的 `projects` 陣列中匯入並加入（順序即 **CURATED** 排序）。
4. 執行 `npm run dev`，確認列表頁與詳情頁渲染正常。

範本見 [`examples/`](./examples/README.md)：

- **專案** — [`full-project.ts`](./examples/full-project.ts)（全部欄位；依需求刪減選填區塊）
- **Profile / Experience** — [`profile.template.ts`](./examples/profile.template.ts)、[`experience.template.ts`](./examples/experience.template.ts)

## 子文件

| 文件 | 說明 |
|------|------|
| [projects/fields.md](./projects/fields.md) | `ProjectItem` 欄位與 UI 對照 |
| [projects/categories.md](./projects/categories.md) | 分類篩選與排序 |
| [projects/assets.md](./projects/assets.md) | 媒體路徑與命名慣例 |
| [projects/hero-media.md](./projects/hero-media.md) | Hero 輪播、畫廊、影片規則 |

## Profile 欄位摘要

| 欄位 | 必填 | 說明 |
|------|------|------|
| `name` | ✅ | 顯示名稱 |
| `brand` | ✅ | 站點品牌（用於 `<title>` 等） |
| `tagline` | ✅ | 一句話簡介（meta description） |
| `headline` / `headlineAccent` | ✅ | Hero 主標題兩段 |
| `bio` | ✅ | 關於我段落陣列 |
| `location` / `status` | ✅ | 首頁 ABOUT_ME 區塊 |
| `avatar` | ✅ | 頭像路徑（`profileAsset()`） |
| `stats` | ✅ | 統計卡片（`id`, `label`, `value`, `suffix?`） |
| `links` | ✅ | 導覽連結（`external?` 控制新分頁） |
| `contactEmail` | ✅ | 聯絡信箱 |

## Experience 欄位摘要

### ExperienceItem

| 欄位 | 必填 | 說明 |
|------|------|------|
| `id` | ✅ | 唯一識別 |
| `title` / `company` / `period` | ✅ | 職稱、公司、期間 |
| `description` | — | 段落說明 |
| `highlights` | — | 條列重點 |
| `tags` | — | 技術標籤（Chip） |
| `active` | — | 現職樣式（發光節點、glass 卡片） |
| `emphasis` | — | 時間軸節點強調 |
| `muted` | — | 卡片淡化 |

### EducationItem / CertificationItem / SkillItem

詳見 `lib/types.ts`。`SkillItem.level` 為 0–100 進度條數值；`highlight` 為強調樣式。

## 注意事項

- **`category` 目前為 `string`**，合法值應與 `projectCategories` 一致（見 [categories.md](./projects/categories.md)）。
- **`heroVideo` 已棄用**，請改用 `hero.slides`。
- 部署至 GitHub Pages 等子路徑時，本地資產會經 `resolveAssetSrc()` 加上 `basePath`；外部 URL 不受影響。
- 現有 `content/` 文案多為展示用模擬資料，對外發布前請替換為真實資訊。

## 相關測試

| 測試檔 | 驗證內容 |
|--------|----------|
| `lib/hero.test.ts` | Hero 解析、去重、indicator 規則 |
| `lib/assets.test.ts` | 資產路徑與 basePath |

修改 Hero 行為或新增專案範例時，建議一併更新測試。
