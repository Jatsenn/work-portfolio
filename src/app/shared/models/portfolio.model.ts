export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  location: string;
}

export interface HeroContent {
  badge: string;
  titleLead: string;
  titleAccent: string;
  summary: string;
  ctaLabel: string;
  ctaLink: string;
}

export interface AboutContent {
  heading: string;
  description: string;
  highlights: string[];
  stats: Array<{ label: string; value: string }>;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  details: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ProjectItem {
  name: string;
  category: string;
  stack: string;
  summary: string;
  liveUrl?: string;
  previewImage?: string;
}

export interface PortfolioContent {
  fullName: string;
  role: string;
  contact: ContactInfo;
  hero: HeroContent;
  about: AboutContent;
  services: ServiceItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
}
