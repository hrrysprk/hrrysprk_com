export interface SkillCategory {
  name: string;
  color: string;
  labelColor: string;
  skills: { name: string; rating: number }[];
}

export const skillCategories: SkillCategory[] = [
  { name: 'Programming', color: '#0a3a4a', labelColor: '#00d4ff', skills: [
    { name: 'Python', rating: 5 }, { name: 'R', rating: 4 }, { name: 'SQL', rating: 4 },
    { name: 'JavaScript', rating: 2 }, { name: 'Bash', rating: 3 }
  ]},
  { name: 'Bioinformatics', color: '#163a2e', labelColor: '#35b779', skills: [
    { name: 'Hi-C', rating: 5 }, { name: 'FastQC', rating: 4 }, { name: 'Seurat', rating: 3 },
    { name: 'Scanpy', rating: 3 }, { name: 'Bowtie2', rating: 3 }, { name: 'Bioconductor', rating: 3 },
    { name: 'scRNA-seq', rating: 1 }, { name: 'scATAC-seq', rating: 1 }, { name: 'scHi-C', rating: 1 },
    { name: 'RNA-seq', rating: 1 }, { name: 'ATAC-seq', rating: 1 }, { name: 'ChIP-seq', rating: 1 },
    { name: 'ChIA-PET', rating: 1 }, { name: '4C', rating: 1 }, { name: 'variant calling', rating: 1 },
    { name: 'DESeq2', rating: 1 }, { name: 'CellTypist', rating: 1 }, { name: 'GSEA', rating: 1 },
    { name: 'HiCUP', rating: 1 }, { name: 'HOMER', rating: 1 }, { name: 'TADbit', rating: 1 },
    { name: 'misha', rating: 1 }, { name: 'BWA', rating: 1 }, { name: 'SAMtools', rating: 1 },
    { name: 'BBDuk2', rating: 1 }, { name: 'FASTQ/BAM/VCF', rating: 1 }
  ]},
  { name: 'Genomic Resources', color: '#152a38', labelColor: '#5a9ec0', skills: [
    { name: 'TCGA', rating: 1 }, { name: 'COSMIC', rating: 1 }, { name: 'NCBI SRA', rating: 1 },
    { name: 'GEO', rating: 1 }, { name: 'ENA', rating: 1 }, { name: 'Ensembl', rating: 1 },
    { name: 'ENCODE', rating: 1 }, { name: 'Epigenome Roadmap', rating: 1 },
    { name: '4DN Portal', rating: 1 }, { name: 'WashU Epigenome Browser', rating: 1 }
  ]},
  { name: 'ML & Data', color: '#4a4210', labelColor: '#fde725', skills: [
    { name: 'PCA', rating: 5 }, { name: 'PyTorch', rating: 4 }, { name: 'FastAPI', rating: 4 },
    { name: 'XGBoost', rating: 3 }, { name: 'polars', rating: 3 }, { name: 'scikit-learn', rating: 1 },
    { name: 'pyArrow', rating: 2 }, { name: 'NetworkX', rating: 2 }, { name: 'clustering', rating: 1 }
  ]},
  { name: 'Cloud & Infra', color: '#4a2535', labelColor: '#ff6b9d', skills: [
    { name: 'Nextflow', rating: 5 }, { name: 'AWS', rating: 4 }, { name: 'BigQuery', rating: 3 },
    { name: 'Snakemake', rating: 3 }, { name: 'CI/CD', rating: 3 }, { name: 'Docker', rating: 2 },
    { name: 'SGE', rating: 2 }, { name: 'HPC', rating: 2 }, { name: 'Torque/PBS', rating: 1 },
    { name: 'Git', rating: 1 }, { name: 'MLflow', rating: 1 }
  ]},
  { name: 'Visualization', color: '#253e22', labelColor: '#6ece58', skills: [
    { name: 'D3.js', rating: 3 }, { name: 'Three.js', rating: 3 }, { name: 'ggplot2', rating: 2 },
    { name: 'LayerCake', rating: 2 }, { name: 'plotly', rating: 1 }
  ]},
  { name: 'Statistics', color: '#354012', labelColor: '#b5de2b', skills: [
    { name: 'Bayesian methods', rating: 3 }, { name: 'bootstrap resampling', rating: 3 },
    { name: 'regression', rating: 2 }, { name: 'ANOVA', rating: 1 },
    { name: 'hypothesis testing', rating: 1 }
  ]}
];
