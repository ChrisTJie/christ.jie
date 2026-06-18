export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  period: string;
  description?: string;
  highlights?: string[];
  tags?: string[];
  active?: boolean;
};

export type EducationItem = {
  degree: string;
  school: string;
  detail: string;
  graduated: string;
};

export type CertificationItem = {
  name: string;
  detail: string;
  icon: string;
};

export type SkillItem = {
  name: string;
  level: number;
  highlight?: boolean;
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
  gallery: { src: string; alt: string; label: string }[];
  thumbnail: string;
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
  yearsActive: number;
  systemsDeployed: number;
  avatar: string;
};
