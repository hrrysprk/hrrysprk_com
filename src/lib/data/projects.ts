import type { Project } from '$lib/types';

export const projects: Project[] = [
  {
    id: 'genbrowser',
    title: 'GenBrowser',
    description: 'Interactive 3D chromosome visualization implementing the novel CSAA algorithm to map mutation-vulnerable genomic regions on the chromosome surface.',
    highlights: [
      'Novel CSAA algorithm derived from protein solvent-accessible surface area (SASA)',
      'Renders 225 Mb of chromosome 1 in real-time using Three.js and WebGL',
      'Deployed as a zero-dependency static app on GitHub Pages'
    ],
    stack: ['TypeScript', 'Three.js', 'Vite', 'D3.js', 'lil-gui'],
    tags: ['visualization', 'bioinformatics', 'frontend'],
    thumbnail: '/images/genBrowser.png',
    liveUrl: 'https://hrrysprk.github.io/genBrowser',
    miniViz: { type: 'line', values: [24, 36, 31, 45, 54, 63, 58], accent: '#00d4ff' },
    primary: true
  },
  {
    id: 'chromapipe',
    title: 'ChromApipe',
    description: 'Cloud-native Nextflow DSL2 pipeline for chromatin accessibility analysis, deployed on AWS Batch with Wave containers and Fusion file system.',
    highlights: [
      'Wave containers and Fusion file system eliminate S3 staging overhead entirely',
      'Full CI/CD with Docker, AWS ECR, and CloudWatch monitoring',
      'v1.0 GitHub release with complete documentation'
    ],
    stack: ['Nextflow DSL2', 'Python', 'AWS Batch', 'ECR', 'S3', 'Wave', 'Fusion', 'Docker', 'CloudWatch'],
    tags: ['bioinformatics', 'cloud', 'pipelines', 'genomics'],
    thumbnail: '/images/chromApipe.png',
    repoUrl: 'https://github.com/hrrysprk/chromApipe',
    miniViz: { type: 'bars', values: [15, 28, 34, 52, 49, 61], accent: '#35b779' },
    primary: true
  },
  {
    id: 'spacegen',
    title: 'spaceGen',
    description: 'End-to-end single-cell multiome ML pipeline analyzing NASA OSDR spaceflight data to characterize how microgravity rewires gene expression in brain tissue.',
    highlights: [
      'Hexagonal architecture with bronze/silver/gold medallion data layers',
      'XGBoost and scikit-learn classifiers with full MLflow experiment tracking',
      'MuData gold layer enables future snATAC-seq integration without refactoring'
    ],
    stack: ['Python', 'Scanpy', 'AnnData', 'MuData', 'scikit-learn', 'XGBoost', 'MLflow', 'PyArrow'],
    tags: ['machine-learning', 'single-cell', 'bioinformatics', 'genomics'],
    thumbnail: '/images/spaceGen.png',
    repoUrl: 'https://github.com/hrrysprk/spaceGen',
    miniViz: { type: 'line', values: [18, 22, 29, 35, 47, 52, 66], accent: '#fde725' },
    primary: true
  },
  {
    id: 'policylens',
    title: 'PolicyLens',
    description: 'LLM-powered course policy QA system that routes queries through intent classification and retrieves answers exclusively from a structured facts database.',
    highlights: [
      'LLM used only for intent classification, never for factual generation',
      'Streaming responses with real-time word-by-word delivery via FastAPI',
      'Supports multiple courses via structured JSON facts databases'
    ],
    stack: ['FastAPI', 'React', 'TypeScript', 'Ollama'],
    tags: ['llm', 'web', 'backend'],
    thumbnail: '/images/policyLens.png',
    repoUrl: 'https://github.com/tanav2202/PolicyLens',
    miniViz: { type: 'bars', values: [20, 36, 40, 57, 62], accent: '#ff6b9d' },
    primary: true
  },
  {
    id: 'neural-network-gene-length',
    title: 'Neural Network for Gene Length Prediction',
    description: 'PyTorch neural network predicting gene length from biological and physical genomic features with hyperparameter tuning and cross-validation.',
    highlightShort: '40% improvement in model convergence via architecture optimization',
    stack: ['PyTorch', 'scikit-learn'],
    tags: ['machine-learning', 'genomics'],
    thumbnail: '/images/pytorch_gene_length.png',
    repoUrl: 'https://github.com/hrrysprk/pytorch_gene_length_pred',
    miniViz: { type: 'line', values: [14, 19, 27, 33, 44, 51], accent: '#b5de2b' },
    primary: false
  },
  {
    id: 'gene-expression-prediction',
    title: 'Biological vs Physical Genome',
    description: 'ML study predicting gene expression from 3D genome structural features, revealing how physical chromosome organization shapes biological function.',
    highlightShort: 'Combined biological and physical features outperform either modality alone',
    stack: ['PostgreSQL', 'Python', 'scikit-learn', 'Pandas'],
    tags: ['machine-learning', 'backend', 'genomics'],
    thumbnail: '/images/bio_vs_phy.png',
    repoUrl: 'https://github.com/hrrysprk/biological_vs_physical_genome',
    miniViz: { type: 'bars', values: [12, 20, 26, 31, 39, 42], accent: '#6ece58' },
    primary: false
  },
  {
    id: 'web-dashboard-3d-genome',
    title: 'Web Dashboard for 3D Genome Organization',
    description: 'Interactive visualization platform for Hi-C contact matrices integrating histone modifications and transcription factor binding sites, funded by a Government of India research grant.',
    highlightShort: 'Awarded competitive Government of India research grant',
    stack: ['JavaScript', 'R', 'HTML/CSS', 'Plotly', 'ggplot2'],
    tags: ['visualization', 'frontend', 'genomics'],
    thumbnail: '/images/3D_genome_organization.png',
    miniViz: { type: 'line', values: [30, 26, 34, 29, 41, 37, 48], accent: '#5a9ec0' },
    primary: false
  },
  {
    id: 'sleep-disorder-analysis',
    title: 'Sleep Disorder Analysis',
    description: 'Reproducible end-to-end ML pipeline predicting stress levels from sleep and lifestyle features, with automated data validation, Docker containerization, and Quarto reporting.',
    highlightShort: 'Full pipeline reproducibility via Docker, Makefile orchestration, and Pandera validation',
    stack: ['Python', 'scikit-learn', 'Altair', 'Pandera', 'Docker'],
    tags: ['machine-learning', 'analytics', 'visualization'],
    thumbnail: '/images/sleep_disorder.png',
    repoUrl: 'https://github.com/hrrysprk/sleep-disorder-analysis',
    miniViz: { type: 'line', values: [7.1, 6.3, 7.8, 5.9, 6.7, 7.4, 6.1], accent: '#00d4ff' },
    primary: false
  },
  {
    id: 'behavioral-patterns',
    title: 'Behavioral Patterns in Student Populations',
    description: 'Network analysis of social dynamics across 1500+ students and faculty, applying graph theory and supervised ML to predict academic performance from personality and demographic features.',
    highlightShort: '1500+ participants across student and faculty populations at IISER Mohali',
    stack: ['Python', 'R', 'Django', 'Network Analysis'],
    tags: ['analytics', 'network-science', 'research'],
    thumbnail: '/images/personality_vs_academics_networks.png',
    miniViz: { type: 'bars', values: [9, 14, 11, 18, 23, 17], accent: '#8888a0' },
    primary: false
  },
  {
    id: 'cne-gene-expression',
    title: 'Role of Conserved Non-Coding Elements in Gene Expression',
    description: 'Investigated how genomic proximity to conserved non-coding elements regulates gene expression during mammalian brain development, contributing directly to a publication in Genetics.',
    highlightShort: 'Contributed to peer-reviewed publication in Genetics (2019)',
    stack: ['Python', 'R', 'Bioconductor'],
    tags: ['genomics', 'research', 'bioinformatics'],
    thumbnail: '/images/CNE.png',
    miniViz: { type: 'line', values: [11, 16, 22, 30, 37, 45], accent: '#6ece58' },
    primary: false
  }
];
