export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  period: string;
  description?: string;
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

export type ProjectGalleryImageItem = {
  type?: "image";
  src: string;
  alt: string;
  label: string;
  /** 畫廊格線跨欄（資料驅動，不依賴陣列索引） */
  wide?: boolean;
};

export type ProjectGalleryVideoItem = {
  type: "video";
  src: string;
  poster?: string;
  alt: string;
  label: string;
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

export type ProjectHeroVideo = {
  src: string;
  poster?: string;
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
  summary: string[];
  gallery: ProjectGalleryItem[];
  thumbnail: string;
  heroVideo?: ProjectHeroVideo;
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
  bio: string[];
  location: string;
  status: string;
  avatar: string;
  stats: ProfileStat[];
  links: ProfileLink[];
  contactEmail: string;
};
