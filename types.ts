export interface Skill {
  symbol: string | React.ReactNode;
  fcolor: string;
  name: string;
  level: string;
  pct: number;
}

export interface ProjectStat {
  num: string;
  label: string;
}

export interface Project {
  featured: boolean;
  type: string;
  title: string;
  desc: string;
  stack: string[];
  github: string;
  icon?: string;
  subtitle?: string;
  stats?: ProjectStat[];
  badge?: { label: string };
}

export interface ContactItem {
  icon: React.ReactNode;
  label: string;
  val: string;
  href: string | null;
}