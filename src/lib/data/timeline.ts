import type { TimelineEntry } from '$lib/types';

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'iiser-bsms',
    title: 'BS-MS, Biology',
    institution: 'IISER Pune',
    type: 'education',
    startDate: '2013-08-01',
    endDate: '2018-05-01',
    description: 'Integrated BS-MS in Biology with thesis projects on conserved non-coding elements and social network dynamics'
  },
  {
    id: 'iiser-research',
    title: 'Research Associate',
    institution: 'IISER Mohali',
    type: 'research',
    startDate: '2018-06-01',
    endDate: '2023-12-01',
    description: 'Computational genomics research resulting in 3 peer-reviewed publications on chromatin structure and genome evolution'
  },
  {
    id: 'ubc-mds',
    title: 'Master of Data Science',
    institution: 'UBC',
    type: 'education',
    startDate: '2024-09-01',
    endDate: '2025-06-01',
    description: 'Data science program covering ML, visualization, statistical inference, and software engineering'
  }
];
