export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  period: string;
  /** 職涯概述；支援 GFM Markdown */
  description?: string;
  /** 時間軸重點條列；每項支援行內 Markdown（粗體、連結、code 等） */
  highlights?: string[];
  tags?: string[];
  active?: boolean;
  /** 時間軸節點強調樣式（資料驅動，不依賴陣列索引） */
  emphasis?: boolean;
  /** 時間軸卡片淡化樣式 */
  muted?: boolean;
};

export type EducationItem = {
  id: string;
  degree: string;
  school: string;
  detail: string;
  graduated: string;
};

export type CertificationItem = {
  id: string;
  name: string;
  detail: string;
  icon: string;
};

export type SkillItem = {
  id: string;
  name: string;
  level: number;
  highlight?: boolean;
};

export type ProjectGalleryLayout = "portrait" | "landscape" | "square" | "wide";

export type ProjectGalleryImageItem = {
  type?: "image";
  src: string;
  alt: string;
  label: string;
  /** 畫廊版型：直（3:4）、橫（16:9）、方（1:1）、寬（跨兩欄 + 16:9） */
  layout?: ProjectGalleryLayout;
  /** @deprecated 請改用 `layout: "wide"` */
  wide?: boolean;
};

export type ProjectGalleryVideoItem = {
  type: "video";
  src: string;
  poster?: string;
  alt: string;
  label: string;
  layout?: ProjectGalleryLayout;
  /** @deprecated 請改用 `layout: "wide"` */
  wide?: boolean;
};

export type ProjectGalleryItem =
  | ProjectGalleryImageItem
  | ProjectGalleryVideoItem;

export function isVideoGalleryItem(
  item: ProjectGalleryItem,
): item is ProjectGalleryVideoItem {
  return item.type === "video";
}

export type ProjectMediaImage = {
  type?: "image";
  src: string;
  alt: string;
};

export type ProjectMediaVideo = {
  type: "video";
  src: string;
  alt: string;
  poster?: string;
};

export type ProjectMediaItem = ProjectMediaImage | ProjectMediaVideo;

export function isVideoMediaItem(
  item: ProjectMediaItem,
): item is ProjectMediaVideo {
  return item.type === "video";
}

export type ProjectHeroSlide = ProjectMediaItem & {
  label?: string;
  id?: string;
};

export type ProjectHeroConfig = {
  slides: ProjectHeroSlide[];
  autoplay?: boolean;
  intervalMs?: number;
  loop?: boolean;
  showIndicators?: boolean;
};

export type ResolvedHeroConfig = {
  slides: ProjectHeroSlide[];
  autoplay: boolean;
  intervalMs: number;
  loop: boolean;
  showIndicators: boolean;
};

/** @deprecated 請改用 `hero.slides` */
export type ProjectHeroVideo = {
  src: string;
  poster?: string;
};

export type ProjectAwardItem = {
  /** 獎項標題 */
  title?: string;
  /** 說明文字；支援 GFM Markdown */
  text?: string;
  /** 獎項圖片（徽章、獎狀等） */
  image?: {
    src: string;
    alt: string;
  };
};

export type ProjectItem = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  deployed: string;
  featured?: boolean;
  wide?: boolean;
  role?: string;
  timeline?: string;
  /** 詳情頁 EXECUTIVE_SUMMARY；每項為一個 Markdown 區塊（支援 GFM） */
  summary: string[];
  gallery: ProjectGalleryItem[];
  thumbnail: string;
  hero?: ProjectHeroConfig;
  /** @deprecated 請改用 `hero.slides` */
  heroVideo?: ProjectHeroVideo;
  /** 詳情頁 AWARDS；有值且非空才顯示 */
  awards?: ProjectAwardItem[];
  links?: { label: string; href: string; external?: boolean }[];
};

export type ProfileStat = {
  id: string;
  label: string;
  value: number | string;
  suffix?: string;
};

export type ProfileLink = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

export type Profile = {
  name: string;
  brand: string;
  tagline: string;
  headline: string;
  headlineAccent: string;
  /** 首頁 IDENTITY_DATA；每項為一個 Markdown 區塊（GFM） */
  bio: string[];
  location: string;
  status: string;
  avatar: string;
  stats: ProfileStat[];
  links: ProfileLink[];
  contactEmail: string;
};
