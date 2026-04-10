export interface LexisEntry {
  label: string;
  startDate: string;
  endDate: string;
  startAge: number;
  endAge: number;
  type: 'education' | 'research' | 'work' | 'personal';
}

export interface LexisMarker {
  label: string;
  date: string;
  age: number;
}

export const lexisEntries: LexisEntry[] = [
  { label: 'BS — Biology, IISER', startDate: '2012-08-01', endDate: '2015-05-01', startAge: 18, endAge: 21, type: 'education' },
  { label: 'Disordered Proteins Internship', startDate: '2015-05-01', endDate: '2015-09-01', startAge: 21, endAge: 21.3, type: 'research' },
  { label: 'MS — Biology, IISER', startDate: '2015-08-01', endDate: '2017-05-01', startAge: 21, endAge: 23, type: 'education' },
  { label: 'Thesis I: 3D Genome & Networks', startDate: '2016-05-01', endDate: '2017-05-01', startAge: 22, endAge: 23, type: 'research' },
  { label: 'Thesis II: CNEs & Brain Expression', startDate: '2016-05-01', endDate: '2017-05-01', startAge: 22, endAge: 23, type: 'research' },
  { label: 'Research Associate, IISER', startDate: '2017-05-01', endDate: '2020-08-01', startAge: 23, endAge: 26, type: 'work' },
  { label: 'Independent Research & Upskilling', startDate: '2020-10-01', endDate: '2022-02-01', startAge: 26, endAge: 28, type: 'research' },
  { label: 'Google Data Analytics', startDate: '2022-04-01', endDate: '2023-01-01', startAge: 28, endAge: 29, type: 'education' },
  { label: 'Gene Expression & Open Chromatin', startDate: '2022-04-01', endDate: '2022-09-01', startAge: 28, endAge: 28.4, type: 'research' },
  { label: 'Nextflow Workshop', startDate: '2023-06-01', endDate: '2023-06-15', startAge: 29, endAge: 29, type: 'education' },
  { label: 'Independent Research Projects', startDate: '2024-04-01', endDate: '2025-04-01', startAge: 30, endAge: 31, type: 'research' },
  { label: 'MDS — UBC', startDate: '2025-08-01', endDate: '2026-06-01', startAge: 31, endAge: 31.8, type: 'education' },
  { label: 'Portfolio Projects, UBC', startDate: '2025-08-01', endDate: '2026-06-01', startAge: 31, endAge: 31.8, type: 'research' },
  { label: 'Graduate Teaching Assistant', startDate: '2025-12-01', endDate: '2026-07-01', startAge: 31.3, endAge: 31.9, type: 'work' }
];

export const lexisMarkers: LexisMarker[] = [
  { label: 'relocated to CANADA', date: '2020-08-01', age: 26 }
];
