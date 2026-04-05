export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  thumbnail: string;       // path relative to /static/images/
  liveUrl?: string;        // optional
  repoUrl?: string;        // optional
  primary: boolean;        // true for the 4 featured projects
}

export interface Publication {
  title: string;
  authors: string;         // full author list, portfolio owner's name wrapped in <strong> tags
  journal: string;
  year: number;
  url: string;             // DOI or direct link
}

export interface SkillCategory {
  name: string;            // e.g. "Languages", "Bioinformatics"
  color: string;           // viridis hex for this category
  skills: string[];
}

export interface TimelineEntry {
  id: string;
  title: string;
  institution: string;
  type: 'education' | 'research' | 'work';
  startDate: string;       // ISO date string
  endDate: string;         // ISO date string
  description: string;
}
