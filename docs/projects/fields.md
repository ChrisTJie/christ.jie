# ProjectItem 欄位參考

型別定義：`lib/types.ts` → `ProjectItem`

## 欄位總表

| 欄位 | 型別 | 必填 | 列表頁 | 詳情頁 | 說明 |
|------|------|------|--------|--------|------|
| `slug` | `string` | ✅ | 路由 | 路由 | URL 識別，須與 `public/projects/{slug}/` 目錄一致 |
| `title` | `string` | ✅ | 卡片標題 | H1 | 專案名稱 |
| `subtitle` | `string` | ✅ | — | 副標 | 詳情頁 H1 下方 |
| `description` | `string` | ✅ | 卡片摘要 | SEO | `generateMetadata` 的 description |
| `category` | `string` | ✅ | 分類標籤、篩選 | Hero 區標籤 | 須為合法分類值（見 [categories.md](./categories.md)） |
| `tags` | `string[]` | ✅ | wide 卡標籤 | STACK_DEPLOYED | 技術棧標籤 |
| `deployed` | `string` | ✅ | DEPL 日期 | DEPL 日期 | 建議格式 `YYYY.MM`，用於時間排序 |
| `thumbnail` | `string` | ✅ | 卡片預覽 | 回退圖 | 無 Hero 時的預設媒體 |
| `summary` | `string[]` | ✅ | — | EXECUTIVE_SUMMARY | 每項為一個 Markdown 區塊（GFM）；見 [markdown.md](../markdown.md) |
| `gallery` | `ProjectGalleryItem[]` | ✅ | — | VISUAL_ARCHIVE | 至少一項；可為圖或影片 |
| `featured` | `boolean` | — | FEATURED 角標 | — | 列表卡片右上角 |
| `wide` | `boolean` | — | 雙欄寬卡、標籤列 | — | `lg:col-span-2` 格線 |
| `role` | `string` | — | — | TIMELINE & ROLE | 有值才顯示該區塊 |
| `timeline` | `string` | — | — | TIMELINE & ROLE | 有值才顯示該區塊 |
| `hero` | `ProjectHeroConfig` | — | 卡片 hover 預覽 | Hero 輪播 | 見 [hero-media.md](./hero-media.md) |
| `awards` | `ProjectAwardItem[]` | — | — | AWARDS | 有值且非空才顯示；每項可含標題、Markdown 文字、圖片 |
| `links` | `{ label, href, external? }[]` | — | — | EXTERNAL_LINKS | 有值且非空才顯示 |
| `heroVideo` | `ProjectHeroVideo` | — | — | — | **已棄用**，請用 `hero.slides` |

## UI 區塊對照

### 列表頁（`components/projects/ProjectGrid.tsx`）

```
┌─────────────────────────────────────┐
│  [category]  [FEATURED?]          │  ← category, featured
│         預覽媒體                     │  ← thumbnail + hero（resolvePreviewSlide）
├─────────────────────────────────────┤
│  title                              │
│  description                        │
│  [tag] [tag] ...     （僅 wide）     │  ← tags（wide 卡）
│  DEPL: deployed          →          │
└─────────────────────────────────────┘
```

**卡片預覽邏輯**（`ProjectCardPreview`）：

1. 取 `resolvePreviewSlide(project)` — 優先第一個 `type: "video"` 的 slide，否則第一張。
2. 若有影片且使用者未啟用「減少動態」，hover 時靜音循環播放；否則顯示 poster 或 `thumbnail`。

### 詳情頁（`app/projects/[slug]/page.tsx`）

主內容區為兩欄格線：左欄 `EXECUTIVE_SUMMARY`，右欄為側欄資訊卡。

| 區塊標題 | 資料來源 | 元件 |
|----------|----------|------|
| Hero 輪播 | `resolveHeroConfig(project)` | `ProjectHeroCarousel` |
| 標題 / 副標 | `title`, `subtitle` | — |
| EXECUTIVE_SUMMARY | `summary[]`（Markdown） | `MarkdownBlocks` |
| TIMELINE & ROLE | `role?`, `timeline?` | — |
| AWARDS | `awards?` | `ProjectAwardsPanel` |
| STACK_DEPLOYED | `tags[]`, `deployed` | `Chip` |
| EXTERNAL_LINKS | `links?` | — |
| VISUAL_ARCHIVE | `gallery[]` | `ProjectGalleryTile` |

### 畫廊格線（`gallery`）

| `layout` | 說明 | 比例 | 格線 |
|----------|------|------|------|
| `portrait`（直，預設圖片） | 直式 | `aspect-[3/4]` | 1 欄 |
| `landscape`（橫） | 橫式 | `aspect-video` | 1 欄 |
| `square`（方） | 方圖 | `aspect-square` | 1 欄 |
| `wide`（寬） | 跨欄寬圖 | `aspect-video` | `md:col-span-2 lg:col-span-2` |
| 影片（預設） | 同 `landscape` | `aspect-video` | 1 欄 |
| 影片 + `layout: "wide"` | 全寬影片 | `aspect-video` | `md:col-span-2 lg:col-span-3` |

`wide: true` 仍相容，等同 `layout: "wide"`。

## ProjectAwardItem

由 `components/projects/ProjectAwardsPanel.tsx` 渲染。每項至少提供 `title`、`text`、`image` 其中一項；可組合使用。多項獎項以分隔線區隔。

```ts
{
  title?: string;   // 獎項標題
  text?: string;    // 說明；支援 GFM Markdown
  image?: {
    src: string;    // projectAsset(slug, "award-01.png") 或外部 URL
    alt: string;
  };
}
```

## ProjectGalleryItem

圖片（`type` 省略或 `"image"`）：

```ts
{
  src: string;      // projectAsset(slug, "gallery-01.jpg")
  alt: string;      // 無障礙替代文字
  label: string;    // 畫廊左下角標籤，亦作 React key
  layout?: "portrait" | "landscape" | "square" | "wide";  // 直 / 橫 / 方 / 寬
  wide?: boolean;   // @deprecated 請改用 layout: "wide"
}
```

影片：

```ts
{
  type: "video";
  src: string;
  poster?: string;
  alt: string;
  label: string;
  layout?: "portrait" | "landscape" | "square" | "wide";
  wide?: boolean;   // @deprecated 請改用 layout: "wide"
}
```

## ProjectHeroConfig

```ts
{
  slides: ProjectHeroSlide[];  // 至少一張建議明確提供
  autoplay?: boolean;          // 預設 false
  intervalMs?: number;         // 預設 6000
  loop?: boolean;              // 預設 true
  showIndicators?: boolean;    // 預設：slides.length > 1
}
```

`ProjectHeroSlide` 與媒體項目相同，可額外含 `label?`、`id?`。

解析邏輯見 `lib/hero.ts` → `resolveHeroConfig()` 與 [hero-media.md](./hero-media.md)。

## 複製用範本

專案範本：`docs/examples/full-project.ts`（使用說明見 [`docs/examples/README.md`](../examples/README.md)）。

## 現有專案範例對照

| slug | 特色欄位 |
|------|----------|
| `project-onyx` | 多圖 Hero、`awards`、`links`、`role`/`timeline` |
| `nexus-global-mapping` | `featured` + `wide`、多圖 Hero |
| `glitch-code-reel` | 影片 Hero、畫廊影片、`featured`、Markdown summary |
| `void-renderer` | 僅 thumbnail（Hero 回退） |
| `term-env-v4` | 無 `role`/`timeline`/`hero` |
| `synapse-ui-kit` | `featured`、畫廊僅 2 項 |

## 常見錯誤

| 問題 | 解法 |
|------|------|
| 詳情頁 404 | 確認 `slug` 已加入 `content/projects/index.ts` 的 `projects` |
| 圖片破圖 | 確認檔案在 `public/projects/{slug}/`，路徑用 `projectAsset()` |
| 分類篩選不到 | `category` 值須與篩選對應表一致（見 [categories.md](./categories.md)） |
| 排序異常 | `deployed` 建議用 `YYYY.MM` 字串以利 `localeCompare` |
| 畫廊 key 衝突 | `label` 在同一專案內須唯一 |
| AWARDS 不顯示 | 確認 `awards` 陣列非空，且每項至少含 `title`、`text`、`image` 之一 |
