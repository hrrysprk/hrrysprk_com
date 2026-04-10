import type { Project } from '$lib/types';

export const projects: Project[] = [
  {
    id: 'genbrowser',
    title: 'GenBrowser',
    description: 'Interactive 3D chromosome visualization with CSAA algorithm',
    stack: ['TypeScript', 'Three.js', 'Vite', 'D3.js', 'lil-gui'],
    tags: ['visualization', 'bioinformatics', 'frontend'],
    thumbnail: '/images/genbrowser.png',
    liveUrl: 'https://hrrysprk.github.io/genBrowser',
    repoUrl: 'https://github.com/hrrysprk/genBrowser',
    miniViz: { type: 'line', values: [24, 36, 31, 45, 54, 63, 58], accent: '#00d4ff' },
    primary: true
  },
  {
    id: 'chromapipe',
    title: 'ChromApipe',
    description: 'Cloud-native chromatin accessibility pipeline',
    stack: ['Nextflow DSL2', 'Python', 'AWS Batch', 'ECR', 'S3', 'Wave', 'Fusion', 'Docker', 'CloudWatch'],
    tags: ['bioinformatics', 'cloud', 'pipelines'],
    thumbnail: '/images/chromapipe.png',
    repoUrl: 'https://github.com/hrrysprk/chromApipe',
    miniViz: { type: 'bars', values: [15, 28, 34, 52, 49, 61], accent: '#35b779' },
    primary: true
  },
  {
    id: 'spacegen',
    title: 'spaceGen',
    description: 'Single-cell multiome ML pipeline on NASA OSDR spaceflight data',
    stack: ['Python', 'Scanpy', 'AnnData', 'MuData', 'scikit-learn', 'XGBoost', 'MLflow', 'PyArrow'],
    tags: ['machine-learning', 'single-cell', 'bioinformatics'],
    thumbnail: '/images/spacegen.png',
    repoUrl: 'https://github.com/hrrysprk/spacemen',
    miniViz: { type: 'line', values: [18, 22, 29, 35, 47, 52, 66], accent: '#fde725' },
    primary: true
  },
  {
    id: 'policylens',
    title: 'PolicyLens',
    description: 'LLM-powered course policy QA system',
    stack: ['FastAPI', 'React', 'TypeScript', 'Ollama'],
    tags: ['llm', 'web', 'backend'],
    thumbnail: '/images/policylens.png',
    repoUrl: 'https://github.com/hrrysprk/PolicyLens',
    miniViz: { type: 'bars', values: [20, 36, 40, 57, 62], accent: '#ff6b9d' },
    primary: true
  },
  {
    id: 'neural-network-gene-length',
    title: 'Neural Network for Gene Length Prediction',
    description: 'Deep learning model to predict gene length from engineered genomic features with high accuracy',
    stack: ['PyTorch', 'scikit-learn'],
    tags: ['machine-learning', 'genomics'],
    thumbnail: '/images/neural-network-gene-length.png',
    miniViz: { type: 'line', values: [14, 19, 27, 33, 44, 51], accent: '#b5de2b' },
    primary: false
  },
  {
    id: 'gene-expression-prediction',
    title: 'Gene Expression Prediction Platform',
    description: 'Relational database and ML platform for predicting regulatory correlations in gene expression data',
    stack: ['PostgreSQL', 'Python', 'scikit-learn', 'Pandas'],
    tags: ['machine-learning', 'backend', 'genomics'],
    thumbnail: '/images/gene-expression-prediction.png',
    miniViz: { type: 'bars', values: [12, 20, 26, 31, 39, 42], accent: '#6ece58' },
    primary: false
  },
  {
    id: 'web-dashboard-3d-genome',
    title: 'Web Dashboard for 3D Genome Organization',
    description: 'Interactive visualization platform for Hi-C contact matrices with histone modification and transcription factor data',
    stack: ['JavaScript', 'R', 'HTML/CSS', 'Plotly', 'ggplot2'],
    tags: ['visualization', 'frontend', 'genomics'],
    thumbnail: '/images/web-dashboard-3d-genome.png',
    miniViz: { type: 'line', values: [30, 26, 34, 29, 41, 37, 48], accent: '#5a9ec0' },
    primary: false
  },
  {
    id: 'sleep-disorder-analysis',
    title: 'Sleep Disorder Analysis',
    description: 'Reproducible ML pipeline predicting stress levels from sleep patterns and lifestyle factors',
    stack: ['Python', 'scikit-learn', 'Altair', 'Pandera', 'Docker'],
    tags: ['machine-learning', 'analytics', 'visualization'],
    thumbnail: '/images/sleep-disorder-analysis.png',
    miniViz: { type: 'line', values: [7.1, 6.3, 7.8, 5.9, 6.7, 7.4, 6.1], accent: '#00d4ff' },
    primary: false
  },
  {
    id: 'behavioral-patterns',
    title: 'Behavioral Patterns in Student Populations',
    description: 'Network analysis of social dynamics across student-faculty populations using personality and demographic data',
    stack: ['Python', 'R', 'Django', 'Network Analysis'],
    tags: ['analytics', 'network-science', 'research'],
    thumbnail: '/images/behavioral-patterns.png',
    miniViz: { type: 'bars', values: [9, 14, 11, 18, 23, 17], accent: '#8888a0' },
    primary: false
  }
];
