export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  location: string;
}

export interface AvailabilityInfo {
  status: string;
  workTypes: string[];
  workMode: string;
  responseTime: string;
  freelanceNote: string;
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
  type: string;
  period: string;
  bullets: string[];
  tags: string[];
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

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  stack: string;
  summary: string;
  liveUrl?: string;
  githubUrl?: string;
  previewImage?: string;
  tags?: string[];
  date?: string;
  // detail page fields
  role?: string;
  timeline?: { started: string; shipped: string };
  sections?: ProjectSection[];
  images?: string[];
  mockupType?: 'browser-mobile';
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
}

export interface BlogPostSection {
  heading?: string;
  body: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  tags?: string[];
  coverImage?: string;
  sections: BlogPostSection[];
}

export interface PortfolioContent {
  fullName: string;
  role: string;
  contact: ContactInfo;
  availability: AvailabilityInfo;
  hero: HeroContent;
  about: AboutContent;
  services: ServiceItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  certifications: Certification[];
  blogPosts: BlogPost[];
}
