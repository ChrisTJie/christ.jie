# 專案媒體資產

## 目錄結構

```
public/
  profile/
    avatar.jpg
  projects/
    {slug}/
      thumbnail.jpg    ← 必填（列表卡、Hero 回退）
      hero-01.jpg      ← 選填
      hero-02.jpg
      gallery-01.jpg   ← 選填
      demo.mp4         ← 影片專案
      poster.jpg       ← 影片 poster
```

`slug` 必須與 `ProjectItem.slug` 及 `content/projects/{slug}.ts` 檔名一致。

## 路徑輔助函式

定義於 `lib/assets.ts`：

```ts
import { projectAsset } from "@/lib/assets";

// → "/projects/my-project/thumbnail.jpg"
projectAsset("my-project", "thumbnail.jpg");

import { profileAsset } from "@/lib/assets";

// → "/profile/avatar.jpg"
profileAsset("avatar.jpg");
```

在 TS 內容檔中 **應使用** `projectAsset()` / `profileAsset()`，不要手寫完整路徑，以利重構與搜尋。

## 部署與 basePath

`resolveAssetSrc()` 會為以 `/` 開頭的本地路徑加上 `basePath`（例如 GitHub Pages 的 `/christ.jie`）。`http://` 與 `https://` 開頭的外部 URL 保持不變。

元件層（`ProjectMedia.tsx`、`ProjectHeroCarousel` 等）已呼叫 `resolveAssetSrc()`，內容檔只需提供 repo 相對路徑。

## 建議檔名慣例

| 用途 | 建議檔名 | 說明 |
|------|----------|------|
| 列表縮圖 | `thumbnail.jpg` | 所有專案必備 |
| Hero 輪播 | `hero-01.jpg`, `hero-02.jpg`, … | 兩位數序號 |
| 畫廊 | `gallery-01.jpg`, `gallery-02.jpg`, … | 與 Hero 分開編號 |
| 影片示範 | `demo.mp4` | glitch-code-reel 範例 |
| 影片海報 | `poster.jpg` | 用於 poster 與靜態回退 |

檔名本身不影響行為，但統一命名有助維護。

## 媒體格式

| 類型 | 建議格式 | 備註 |
|------|----------|------|
| 縮圖 / 畫廊 | JPEG、WebP | Next.js `Image` 自動優化 |
| Hero / 畫廊影片 | MP4（H.264） | 需 `playsInline`；提供 `poster` 改善載入體驗 |
| 外部連結 | URL 字串 | 放在 `links[].href`，非 `public/` |

## 新增專案 Checklist

- [ ] 建立 `public/projects/{slug}/`
- [ ] 放入 `thumbnail.jpg`
- [ ] 若有 Hero，放入 `hero-*.jpg` 或 `demo.mp4` + `poster.jpg`
- [ ] 若有畫廊，放入 `gallery-*.jpg` 或影片
- [ ] 在內容檔中以 `projectAsset(slug, "檔名")` 引用
- [ ] 確認 `npm run dev` 下圖片/影片可載入

## 現有資產一覽

截至文件建立時，`public/projects/` 下已有完整媒體的專案：

- `project-onyx` — thumbnail、hero×3、gallery×3
- `nexus-global-mapping` — thumbnail、hero×3、gallery×3
- `void-renderer` — thumbnail、gallery×3
- `quantum-logic` — thumbnail、gallery×3
- `term-env-v4` — thumbnail、gallery×3
- `synapse-ui-kit` — thumbnail、gallery×2
- `glitch-code-reel` — poster、demo.mp4

`quantum-logic` 等部分專案無獨立 Hero 圖，詳情頁會回退至 `thumbnail`（見 [hero-media.md](./hero-media.md)）。
