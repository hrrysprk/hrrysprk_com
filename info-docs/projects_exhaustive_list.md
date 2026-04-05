# EXHAUSTIVE PROJECT LIST

# Resume Projects - Two Versions**

------

## **VERSION A: Bioinformatics/Computational Biology Resume**

------

### **Selected Projects**

#### **Single-Cell Multiome ML Pipeline (spacemen) | Jan 2026 – Present**

*Python, Scanpy, AnnData, MuData, scikit-learn, XGBoost, MLflow, PyArrow*

- Engineered an end-to-end single-cell RNA-seq analysis and ML pipeline on NASA OSDR spaceflight data (Rodent Research-3, brain tissue) to characterize microgravity-induced transcriptomic changes at single-cell resolution

- Implemented bronze/silver/gold medallion data architecture with hexagonal (ports and adapters) design, cleanly separating ingestion, QC, normalization, and ML layers for reproducibility and modularity

- Applied Scanpy-based QC filtering, normalization, PCA, UMAP, and Leiden clustering to resolve cell population structure in single-nucleus multiome data

- Trained XGBoost and scikit-learn classifiers to discriminate spaceflight vs. ground control transcriptomic signatures, with full experiment tracking and model versioning via MLflow

- Adopted MuData (Muon) at the gold layer to enable future snATAC-seq integration without architectural refactoring

  

#### **Cloud-Native Chromatin Accessibility Pipeline (chromApipe) | Nov 2025 – Dec 2025**

*Nextflow DSL2, Python, AWS Batch, ECR, S3, Wave, Fusion, Docker, CloudWatch*

- Engineered a production-grade Nextflow DSL2 pipeline for automated chromatin accessibility quantification from Hi-C sequencing data, deployed on AWS Batch for scalable cloud execution
- Implemented Wave containers and Fusion file system to eliminate S3 staging overhead, resolving container-level AWS CLI/SSL compatibility issues and reducing pipeline I/O latency
- Containerized all pipeline processes with Docker, storing images in AWS ECR for versioned, reproducible execution across development and cloud environments
- Monitored pipeline performance and resource consumption via AWS CloudWatch with structured logging; published v1.0 release on GitHub with full documentation

#### **3D Chromosome Visualization Dashboard (genBrowser) | Oct 2025 – Nov 2025**

*TypeScript, Three.js, Vite, D3.js, lil-gui*

- Developed an interactive browser-based dashboard for 3D visualization of chromosome structure from Hi-C contact data, rendering genomic architecture at scale using Three.js and WebGL
- Implemented the CSAA (Chromosome Surface Accessibility Algorithm), a novel SASA-derived method to compute and visualize mutation-vulnerable surface regions across 225 Mb of chromosome 1
- Designed viridis-mapped surface point cloud, interactive hover tooltips with genomic coordinates, and real-time lil-gui parameter controls for exploratory structural analysis
- Deployed as a zero-dependency static application to GitHub Pages via Vite, publicly accessible at hrrysprk.github.io/genBrowser

------

#### **Neural Network for Gene Length Prediction** | Dec 2024

*PyTorch, scikit-learn*

- Developed a deep learning model in PyTorch to predict gene length from engineered genomic features with high accuracy
- Preprocessed and normalized large-scale genomic sequence data using scikit-learn, improving model convergence speed by 40% through architecture optimization
- Performed hyperparameter tuning using grid search and cross-validation to optimize prediction performance
- Demonstrated end-to-end deep learning expertise in biological sequence modeling

------

#### **Gene Expression Prediction Platform** | Nov 2024

*PostgreSQL, Python, scikit-learn, Pandas*

- Designed relational database schema in PostgreSQL for efficient storage and management of multi-omics gene expression datasets
- Optimized SQL queries and database indexing to improve data retrieval speeds by 140% for genome-wide analyses
- Built predictive models using scikit-learn to identify regulatory correlations in gene expression data across multiple conditions
- Enhanced prediction accuracy by 25% through feature engineering, data normalization, and iterative model refinement

------

#### **Web Dashboard for 3D Genome Organization** | 2019

*JavaScript, R, HTML/CSS, Plotly, ggplot2*

- Implemented interactive visualization platform for Hi-C contact matrices, integrating histone modification ChIP-seq data and transcription factor binding sites
- Created multi-layered genome browser using R (ggplot2) and JavaScript (Plotly) for exploratory analysis of 3D chromatin structure
- Quantified the impact of 3D genome organization on gene regulation, identifying spatial clustering patterns of co-regulated genes
- Secured competitive research grant from Government of India based on project significance and innovation

------

#### **Sleep Disorder Analysis** | 2024

*Python, scikit-learn, Altair, Pandera, Docker* | Collaborative project (team of 4)

- Built Ridge regression model to predict self-reported stress levels from sleep patterns, lifestyle factors, and physiological features in a 400+ participant health dataset
- Designed reproducible end-to-end ML pipeline with automated data validation (Pandera, Deepchecks), exploratory analysis, model training, and Quarto report generation orchestrated via Makefile
- Containerized analysis environment using Docker and Docker Compose, ensuring full reproducibility across development and production platforms
- Implemented automated data quality checks and distribution drift detection to ensure model reliability

------

#### **Behavioral Patterns in Student Populations** | Master's Thesis

*Python, R, Django, Network Analysis*

- Built Django web application to collect university-wide personality assessments, socioeconomic, and demographic data from 1500+ students and faculty
- Constructed social network graphs across student-faculty populations, extracting topological properties (degree centrality, betweenness, clustering coefficient) to quantify connectivity patterns
- Applied multivariate statistical analysis, supervised classification, and unsupervised clustering to predict academic performance from network topology, personality traits, and demographic features
- Demonstrated expertise in large-scale data collection, network analysis, and statistical modeling

------

------

## **VERSION B: Data Science/ML Engineering Resume**

------

### **Selected Projects**



#### **Single-Cell ML Pipeline for Spaceflight Transcriptomics (spacemen) | Jan 2026 – Present**

*Python, Scanpy, scikit-learn, XGBoost, MLflow, PyArrow, MuData, AWS*

- Built a production-grade ML pipeline on NASA OSDR single-cell RNA-seq data, applying unsupervised clustering and supervised classification to identify gene expression signatures associated with microgravity exposure
- Designed a modular bronze/silver/gold medallion data architecture with hexagonal (ports and adapters) pattern, enabling clean separation of data ingestion, transformation, and ML inference layers
- Tracked all experiments, hyperparameters, and model artifacts using MLflow, enabling reproducible model comparison across classifier configurations
- Engineered the gold layer using MuData (Muon) to support multi-modal data fusion (RNA + ATAC) without refactoring existing pipeline code, demonstrating forward-compatible system design
- Deployed pipeline on AWS with PyArrow-based columnar storage for efficient high-dimensional biological data handling

#### **Cloud-Native Bioinformatics Data Pipeline (chromApipe) | Nov 2025 – Dec 2025**

*Nextflow DSL2, Python, AWS Batch, ECR, S3, Wave, Fusion, Docker, CloudWatch*

- Built and deployed a production-grade Nextflow DSL2 data pipeline on AWS Batch, processing large-scale sequencing datasets with automated parallelization and cloud-native execution
- Resolved container-level cloud storage bottlenecks by adopting Wave containers and Fusion file system, eliminating S3 staging entirely and reducing I/O overhead significantly
- Containerized all pipeline stages via Docker with images versioned in AWS ECR, ensuring reproducible execution across local and cloud environments
- Instrumented pipeline with AWS CloudWatch for real-time monitoring, resource tracking, and cost visibility; shipped v1.0 GitHub release with full documentation



#### **Interactive 3D Genomic Data Visualization Platform (genBrowser) | Oct 2025 – Nov 2025**

*TypeScript, Three.js, Vite, D3.js, lil-gui*

- Built a browser-based interactive 3D data visualization platform rendering large-scale spatial network data (Hi-C contact matrices) using Three.js and WebGL for real-time exploration
- Developed a custom geometric surface algorithm (CSAA) to compute accessibility scores across 225M+ data points, mapping results to a continuous viridis color scale for immediate visual interpretation
- Implemented interactive tooltips, real-time parameter controls via lil-gui, and a modular TypeScript architecture for maintainability and extensibility
- Deployed as a production static application to GitHub Pages, demonstrating end-to-end ownership from algorithm design through public deployment

------

#### **Neural Network for Sequence Length Prediction** | Dec 2024

*PyTorch, scikit-learn*

- Developed deep neural network model in PyTorch to predict sequence attributes from engineered features with high accuracy
- Preprocessed and scaled large-scale sequential data using scikit-learn, achieving 40% improvement in model convergence speed through architecture optimization
- Performed systematic hyperparameter tuning using grid search and cross-validation to maximize prediction performance
- Demonstrated end-to-end deep learning expertise from data preprocessing through model deployment

------

#### **Predictive Analytics Platform with Database Optimization** | Nov 2024

*PostgreSQL, Python, scikit-learn, Pandas*

- Designed relational database schema in PostgreSQL for efficient storage and querying of large-scale multi-feature datasets
- Optimized SQL queries and implemented database indexing, improving data retrieval speeds by 140% for analytics workflows
- Built machine learning models using scikit-learn to identify correlations and predict outcomes in high-dimensional data
- Enhanced prediction accuracy by 25% through feature engineering, data preprocessing, and iterative model refinement in Jupyter notebooks

------

#### **Interactive Web Dashboard for Spatial Data Visualization** | 2019

*JavaScript, R, HTML/CSS, Plotly, ggplot2*

- Implemented interactive visualization platform for large-scale spatial network data, integrating multiple data layers for exploratory analysis
- Created multi-dimensional data browser using R (ggplot2) and JavaScript (Plotly) with drill-down capabilities and real-time filtering
- Analyzed relationships between spatial organization and categorical outcomes, identifying clustering patterns and correlations
- Secured competitive research grant from Government of India based on project innovation and impact potential

------

#### **Sleep Health Predictive Analytics Pipeline** | 2024

*Python, scikit-learn, Altair, Pandera, Docker* | Collaborative project (team of 4)

- Built Ridge regression model to predict stress levels from sleep patterns, lifestyle factors, and physiological metrics in 400+ participant dataset
- Designed reproducible end-to-end ML pipeline with automated data validation (Pandera, Deepchecks), EDA, model training, and automated reporting (Quarto) orchestrated via Makefile
- Containerized analysis environment using Docker and Docker Compose, ensuring full reproducibility and seamless deployment across platforms
- Implemented automated data quality checks and distribution drift detection to ensure model reliability and data integrity
- Authored modular Python scripts with Click CLI interfaces following software engineering best practices for maintainability

------

#### **Behavioral Network Analysis & Predictive Modeling** | Master's Thesis

*Python, R, Django, Network Analysis*

- Built Django web application to collect personality, socioeconomic, and demographic data from 1500+ university participants
- Constructed social network graphs and extracted topological features (degree centrality, betweenness, clustering coefficient) to quantify connectivity and influence patterns
- Applied multivariate statistical analysis, supervised classification (Random Forest, SVM), and unsupervised clustering (k-means, hierarchical) to predict outcomes from network topology and demographic features
- Demonstrated expertise in full-stack development, large-scale data collection, graph analytics, and machine learning

___

