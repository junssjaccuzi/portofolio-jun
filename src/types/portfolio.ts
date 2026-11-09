export interface Project {
  id: string;
  title: string;
  category: 'AI & ML' | 'Full-Stack' | 'Cloud & Systems';
  description: string;
  highlights: string[];
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  badge?: string;
}

export interface Education {
  institution: string;
  level: string;
  period: string;
  description: string;
  location: string;
  badge?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  description: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface NPC {
  id: string;
  name: string;
  title: string;
  positionX: number; // in world pixels (0 - 10800)
  topPercent?: string;
  avatarEmoji: string;
  sheetUrl: string;
  sheetWidth: number;
  sheetHeight: number;
  animationType: 'idle-4frame' | 'seated-blink';
  animationDuration: string;
  animationDelay: string;
  roleDescription: string;
  dialogue: string[];
  specialFact?: string;
}

export interface Station {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  icon: string;
  positionX: number;
  topPercent?: string;
  color: string;
}

export interface PortfolioData {
  name: string;
  nickname: string;
  roles: string[];
  primaryRole: string;
  location: string;
  tagline: string;
  bio: string[];
  philosophy: string;
  stats: { label: string; value: string }[];
  skillCategories: SkillCategory[];
  projects: Project[];
  education: Education[];
  experiences: Experience[];
  awards?: { title: string; issuer: string; year: string; note: string }[];
  contact: {
    email: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
    whatsapp?: string;
    locationText: string;
  };
}
