# 專案分類與排序

## 分類常數

定義於 `content/projects/index.ts`：

```ts
export const projectCategories = [
  "ALL_SYSTEMS",
  "CLI_TOOLS",
  "DATA_VIZ",
  "GAME_DEV",
  "NEURAL_NETS",
  "SEC_OPS",
  "SYS_ARCH",
  "UI_ENGINEERING",
  "WEBGL",
] as const;
```

`ALL_SYSTEMS` 為篩選 UI 的「全部」選項，**不是** `ProjectItem.category` 的合法值。

## 篩選對照

`components/projects/ProjectGrid.tsx` 中的 `categoryMap`：

| 篩選按鈕 | 匹配的 `project.category` |
|----------|---------------------------|
| `ALL_SYSTEMS` | （不篩選，顯示全部） |
| `CLI_TOOLS` | `CLI_TOOLS` |
| `DATA_VIZ` | `DATA_VIZ` |
| `GAME_DEV` | `GAME_DEV` |
| `NEURAL_NETS` | `NEURAL_NETS` |
| `SEC_OPS` | `SEC_OPS` |
| `SYS_ARCH` | `SYS_ARCH` |
| `UI_ENGINEERING` | `UI_ENGINEERING` |
| `WEBGL` | `WEBGL` |

新增分類時需同步修改：

1. `projectCategories` 陣列（UI 按鈕）
2. `categoryMap`（篩選邏輯）
3. 至少一個專案的 `category` 欄位

## 現有專案分類分佈

| slug | category |
|------|----------|
| `project-onyx` | `SEC_OPS` |
| `void-renderer` | `WEBGL` |
| `quantum-logic` | `SYS_ARCH` |
| `nexus-global-mapping` | `DATA_VIZ` |
| `term-env-v4` | `CLI_TOOLS` |
| `glitch-code-reel` | `CLI_TOOLS` |
| `synapse-ui-kit` | `UI_ENGINEERING` |

目前 **無專案** 使用 `NEURAL_NETS` 分類。

## 排序模式

| 模式 | 常數 | 行為 |
|------|------|------|
| 精選順序 | `CURATED` | 依 `projects` 陣列在 `index.ts` 中的順序 |
| 時間正序 | `CHRONOLOGICAL` | `deployed` 字串升序 |
| 時間倒序 | `CHRONOLOGICAL_DESC` | `deployed` 字串降序 |

預設為 `CURATED`。`content/projects/index.ts` 中 `projects` 陣列首位目前為 `project-onyx`；調整作品集呈現優先順序時，直接重排該陣列即可。

### deployed 格式建議

使用 `YYYY.MM`（例如 `2024.02`），以確保 `localeCompare` 排序符合預期。避免混用 `2024.2` 與 `2024.10` 等不同寬度格式。

## 列表版面

| 欄位 | 效果 |
|------|------|
| `wide: true` | 卡片在 `lg` 斷點佔 2 欄（`lg:col-span-2`） |
| `featured: true` | 卡片右上角顯示 `FEATURED` 角標 |

兩者獨立，可任意組合。參考 `nexus-global-mapping`（兩者皆有）與 `glitch-code-reel`（僅 featured）。
