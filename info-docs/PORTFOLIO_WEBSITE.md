# Portfolio Website — Project Context

## Overview

Building a personal portfolio website for Harpreet Singh, a computational biologist and data scientist completing MDS at UBC. The site will be the primary deliverable required by Professor Tamara Munzner (UBC visualization) before she sends personal referral emails to industry contacts including the head of AbCellera, staff scientists at BC Children's Research Institute, Raymond Ng, and others in the Vancouver bioinformatics community.

---

## Domain

`hrrysprk.com` — purchased via Squarespace. Will be pointed to GitHub Pages via custom domain DNS settings.

---

## Consistent Handle

`hrrysprk` across GitHub, LinkedIn, Instagram, X, and the domain.

---

## Inspiration

Three reference sites shared by Tamara:

- https://sfingram.net/ — stood out the most. Single page, clean nav, photo + intro, skills by category, domains, projects with thumbnails, publications, SVG experience timeline, contact.
- https://visvar.github.io/members/michael_sedlmair.html
- https://www.ccs.neu.edu/home/borkin/

Primary reference is sfingram.net. Goal is a structurally similar site but with stronger visual craft reflecting Harpreet's GenBrowser aesthetic.

---

## Tech Stack

- **Framework:** SvelteKit with static adapter (deploys to GitHub Pages)
- **Visualization:** LayerCake + D3 + Canvas (for the experience timeline and any interactive elements)
- **Deployment:** GitHub Pages with custom domain `hrrysprk.com`

---

## Site Structure

Single page, scrollable. Sections in order:

1. **Hero** — photo, name, one-liner positioning, links to GitHub / LinkedIn / resume
2. **About** — 3-4 sentences covering IISER research background, 3 publications, MDS at UBC, the computational biology + ML + visualization intersection
3. **Skills** — organized by category (not a tag cloud)
4. **Projects** — cards with thumbnails, one-liner, live demo link where available
5. **Publications** — three papers, clean list
6. **Timeline** — D3/LayerCake interactive timeline from IISER through MDS
7. **Contact**

---

## Visual Direction

- Dark background
- Viridis accent colors (consistent with GenBrowser)
- Clean and minimal layout, not busy
- Visual craft should reflect the GenBrowser aesthetic without being flashy

---

## Content

### Headshot
Available — visible on LinkedIn profile. Needs to be exported/saved for use on site.

### Projects (in order of portfolio narrative)

| Project | Description | Stack | Live |
|---|---|---|---|
| GenBrowser | Interactive 3D chromosome visualization with CSAA algorithm | Three.js, TypeScript, Vite | Yes — GitHub Pages |
| ChromApipe | Cloud-native chromatin accessibility pipeline | Nextflow DSL2, AWS Batch, Wave, Fusion, Docker | No |
| spaceGen | Single-cell multiome ML pipeline on NASA OSDR spaceflight data | Scanpy, AnnData, MuData, scikit-learn, XGBoost, MLflow | In progress |
| PolicyLens | LLM-powered course policy QA system | FastAPI, React, TypeScript, Ollama | No |

Portfolio narrative: chromosome structure (GenBrowser) → chromatin accessibility (ChromApipe) → gene expression and spaceflight response (spaceGen)

### Publications

- **Convergent evolution of a genomic rearrangement may explain cancer resistance in hystrico- and sciuromorpha rodents** — Nature NPJ Aging, 2021. https://www.nature.com/articles/s41514-021-00072-9
- **Biased visibility in Hi-C datasets marks dynamically regulated condensed and decondensed chromatin states genome-wide** — BMC Genomics, 2020. https://link.springer.com/article/10.1186/s12864-020-6580-6
- **Evolutionary loss of genomic proximity to CNEs impacted gene expression dynamics during mammalian brain development** — Genetics, 2019. https://pmc.ncbi.nlm.nih.gov/articles/PMC6456320/

### Skills (by category)

- **Languages:** Python, R, TypeScript, JavaScript
- **Bioinformatics:** Scanpy, AnnData, MuData (Muon), Seurat (planned), GATK, BWA, STAR
- **ML & Data:** scikit-learn, XGBoost, MLflow, PyArrow, Polars
- **Visualization:** Three.js, D3.js, LayerCake, lil-gui
- **Pipelines & Cloud:** Nextflow DSL2, AWS (Batch, S3, ECR, Wave, Fusion, CloudWatch), Docker
- **Other:** NetworkX, FastAPI, React

---

## Key Context

- Tamara Munzner praised spaceGen and called Harpreet's GitHub the most organized she has seen
- Tanya Aneichyk (founder at Vedaly.io, ex-Harvard) said the same about the GitHub
- The site needs to be live before Tamara sends referral emails
- spaceGen is in progress (silver layer done) and will be added to the site as it ships
- The site will be iterated on continuously — ship a solid v1 first, then improve

---

## Deployment Plan

1. Build locally with SvelteKit + static adapter
2. Deploy to GitHub Pages at `hrrysprk.github.io`
3. Point `hrrysprk.com` to GitHub Pages via Squarespace DNS settings (CNAME record)
4. Set custom domain in GitHub repo settings

---

## Status

- [ ] SvelteKit project initialized
- [ ] Hero section
- [ ] About section
- [ ] Skills section
- [ ] Projects section
- [ ] Publications section
- [ ] Timeline (D3/LayerCake)
- [ ] Contact section
- [ ] Custom domain configured
- [ ] Live at hrrysprk.com
