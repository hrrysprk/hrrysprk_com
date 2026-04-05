import type { Project } from '$lib/types';

export const projects: Project[] = [
  {
    id: 'genbrowser',
    title: 'GenBrowser',
    description: 'Interactive 3D chromosome visualization with CSAA algorithm',
    stack: ['TypeScript', 'Three.js', 'Vite', 'D3.js', 'lil-gui'],
    thumbnail: 'images/genbrowser.png',
    liveUrl: 'https://hrrysprk.github.io/genBrowser',
    repoUrl: 'https://github.com/hrrysprk/genBrowser',
    primary: true
  },
  {
    id: 'chromapipe',
    title: 'ChromApipe',
    description: 'Cloud-native chromatin accessibility pipeline',
    stack: ['Nextflow DSL2', 'Python', 'AWS Batch', 'ECR', 'S3', 'Wave', 'Fusion', 'Docker', 'CloudWatch'],
    thumbnail: 'images/chromapipe.png',
    repoUrl: 'https://github.com/hrrysprk/chromApipe',
    primary: true
  },
  {
    id: 'spacegen',
    title: 'spaceGen',
    description: 'Single-cell multiome ML pipeline on NASA OSDR spaceflight data',
    stack: ['Python', 'Scanpy', 'AnnData', 'MuData', 'scikit-learn', 'XGBoost', 'MLflow', 'PyArrow'],
    thumbnail: 'images/spacegen.png',
    repoUrl: 'https://github.com/hrrysprk/spacemen',
    primary: true
  },
  {
    id: 'policylens',
    title: 'PolicyLens',
    description: 'LLM-powered course policy QA system',
    stack: ['FastAPI', 'React', 'TypeScript', 'Ollama'],
    thumbnail: 'images/policylens.png',
    repoUrl: 'https://github.com/hrrysprk/PolicyLens',
    primary: true
  },
  {
    id: 'neural-network-gene-length',
    title: 'Neural Network for Gene Length Prediction',
    description: 'Deep learning model to predict gene length from engineered genomic features with high accuracy',
    stack: ['PyTorch', 'scikit-learn'],
    thumbnail: 'images/neural-network-gene-length.png',
    primary: false
  },
  {
    id: 'gene-expression-prediction',
    title: 'Gene Expression Prediction Platform',
    description: 'Relational database and ML platform for predicting regulatory correlations in gene expression data',
    stack: ['PostgreSQL', 'Python', 'scikit-learn', 'Pandas'],
    thumbnail: 'images/gene-expression-prediction.png',
    primary: false
  },
  {
    id: 'web-dashboard-3d-genome',
    title: 'Web Dashboard for 3D Genome Organization',
    description: 'Interactive visualization platform for Hi-C contact matrices with histone modification and transcription factor data',
    stack: ['JavaScript', 'R', 'HTML/CSS', 'Plotly', 'ggplot2'],
    thumbnail: 'images/web-dashboard-3d-genome.png',
    primary: false
  },
  {
    id: 'sleep-disorder-analysis',
    title: 'Sleep Disorder Analysis',
    description: 'Reproducible ML pipeline predicting stress levels from sleep patterns and lifestyle factors',
    stack: ['Python', 'scikit-learn', 'Altair', 'Pandera', 'Docker'],
    thumbnail: 'images/sleep-disorder-analysis.png',
    primary: false
  },
  {
    id: 'behavioral-patterns',
    title: 'Behavioral Patterns in Student Populations',
    description: 'Network analysis of social dynamics across student-faculty populations using personality and demographic data',
    stack: ['Python', 'R', 'Django', 'Network Analysis'],
    thumbnail: 'images/behavioral-patterns.png',
    primary: false
  }
];
