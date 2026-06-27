# Hero 與畫廊媒體規則

## 資料流

```
content/projects/{slug}.ts
        │
        ▼
  resolveHeroConfig()     ← lib/hero.ts
        │
        ├──► ProjectHeroCarousel（詳情頁）
        │
        └──► resolvePreviewSlide() → ProjectCardPreview（列表 hover）
```

## Hero 解析優先順序

`resolveHeroConfig(project)` 行為（詳見 `lib/hero.ts`）：

1. **有 `hero.slides` 且非空** → 使用該陣列（依 `src` 去重）
2. **否則有 `heroVideo`（已棄用）** → 轉為單一影片 slide
3. **否則** → 使用 `thumbnail` 作為單一圖片 slide
4. **以上皆無** → 仍回退 `thumbnail`（安全網）

### 預設值（ResolvedHeroConfig）

| 選項 | 預設 |
|------|------|
| `autoplay` | `false` |
| `intervalMs` | `6000` |
| `loop` | `true` |
| `showIndicators` | `slides.length > 1`（可被 `hero.showIndicators` 覆寫） |

多張 slide 時預設顯示指示器；僅一張時隱藏。測試覆蓋的專案：

- 多 slide + indicators：`project-onyx`、`nexus-global-mapping`、`glitch-code-reel`
- 單 slide、無 indicators：其餘未自訂 Hero 的專案

## Slide 型別

```ts
// 圖片
{ type?: "image"; src: string; alt: string; label?: string; id?: string }

// 影片
{ type: "video"; src: string; alt: string; poster?: string; label?: string; id?: string }
```

`type` 省略時視為圖片。

## 列表卡預覽（hover）

`resolvePreviewSlide(project)`：

1. 在解析後的 slides 中找 **第一個** `type === "video"`
2. 若無影片，取 **第一張** slide

`getSlidePosterSrc(slide, thumbnail)`：

- 影片且有 `poster` → 使用 poster
- 否則 → 使用 `thumbnail`

### 減少動態（Reduced Motion）

使用者啟用 `prefers-reduced-motion` 時，列表卡 **不會** 播放 hover 影片，僅顯示靜態 poster / thumbnail。

## 畫廊（VISUAL_ARCHIVE）

與 Hero 獨立，資料來自 `gallery[]`。

| 類型 | 元件行為 |
|------|----------|
| 圖片 | Next.js `Image`，hover 縮放（非 reduced motion） |
| 影片 | `<video controls playsInline preload="metadata">` |

畫廊影片由使用者手動播放；Hero / 列表預覽則為自動或 hover 觸發。

## 建議組合

### 僅縮圖（最簡）

```ts
thumbnail: projectAsset(slug, "thumbnail.jpg"),
// 不設定 hero
```

詳情頁 Hero 顯示單張縮圖，無指示器。

### 多圖輪播

```ts
hero: {
  slides: [
    { type: "image", src: projectAsset(slug, "hero-01.jpg"), alt: "...", label: "01 // VIEW" },
    { type: "image", src: projectAsset(slug, "hero-02.jpg"), alt: "...", label: "02 // VIEW" },
  ],
},
```

### 影片為主

```ts
hero: {
  slides: [
    {
      type: "video",
      src: projectAsset(slug, "demo.mp4"),
      poster: projectAsset(slug, "poster.jpg"),
      alt: "示範影片",
      label: "01 // DEMO",
    },
    {
      type: "image",
      src: projectAsset(slug, "poster.jpg"),
      alt: "靜態海報",
      label: "02 // STILL",
    },
  ],
},
thumbnail: projectAsset(slug, "poster.jpg"),
```

參考實作：`content/projects/glitch-code-reel.ts`

列表 hover 會播放第一段影片；詳情 Hero 可手動切換至靜態圖。

### 進階選項（選填）

```ts
hero: {
  slides: [/* ... */],
  autoplay: true,
  intervalMs: 8000,
  loop: true,
  showIndicators: true,
},
```

目前內容庫中 **尚無專案** 設定 `autoplay` / `intervalMs`；預設為手動切換、6 秒間隔（若日後啟用 autoplay）。

## 已棄用：heroVideo

```ts
// ❌ 勿用
heroVideo: { src: "...", poster: "..." }

// ✅ 改用
hero: {
  slides: [{ type: "video", src: "...", poster: "...", alt: "..." }],
}
```

## 去重規則

`dedupeSlidesBySrc()` 依 `src` 去除重複 slide，保留第一筆。避免在同一 `hero.slides` 中重複相同 `src`。
