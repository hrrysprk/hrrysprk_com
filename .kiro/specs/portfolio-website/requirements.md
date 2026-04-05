# Requirements Document

## Introduction

A visualization-heavy personal portfolio website for Harpreet Singh, a computational biologist and data scientist completing MDS at UBC. The site showcases projects, publications, skills, education, and experience through a single-page scrollable layout built with SvelteKit, D3, Canvas, and LayerCake. The site must be live at hrrysprk.com (GitHub Pages) before Professor Tamara Munzner sends referral emails to industry contacts. Visual direction draws from sfingram.net for structure and The Pudding / Visualization Cinnamon for interactive storytelling craft.

## Glossary

- **Portfolio_Site**: The SvelteKit static single-page application deployed at hrrysprk.com
- **Hero_Section**: The top-of-page section containing headshot, name, positioning tagline, and social/resume links
- **About_Section**: A brief biographical section summarizing research background, publications, and current program
- **Skills_Section**: A categorized display of technical skills organized by domain (Languages, Bioinformatics, ML, Visualization, Pipelines, Other)
- **Projects_Section**: A card-based gallery of portfolio projects with thumbnails, descriptions, tech stacks, and live demo links
- **Publications_Section**: A formatted list of peer-reviewed publications with journal names, years, and DOI links
- **Timeline_Section**: An interactive D3/LayerCake/Canvas visualization showing education and experience chronologically from IISER through MDS
- **Contact_Section**: A section with contact information and social media links
- **Navigation_Bar**: A fixed or sticky navigation element enabling direct scroll-to-section access
- **Static_Adapter**: The SvelteKit adapter that pre-renders the site to static HTML/CSS/JS for GitHub Pages deployment
- **Viridis_Palette**: A perceptually uniform color scale used as the accent color system, consistent with the GenBrowser project aesthetic
- **LayerCake**: A Svelte-native graphics framework for responsive, layered data visualization using SVG, Canvas, and HTML
- **Project_Card**: A UI component displaying a single project with thumbnail, title, one-liner description, tech stack tags, and optional live demo link

## Requirements

### Requirement 1: Site Architecture and Navigation

**User Story:** As a visitor, I want a single-page scrollable portfolio with section-based navigation, so that I can quickly access any section without page reloads.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render as a single-page scrollable application with sections in this order: Hero, About, Skills, Projects, Publications, Timeline, Contact
2. THE Navigation_Bar SHALL provide clickable links that smooth-scroll to each section of the Portfolio_Site
3. WHILE a visitor scrolls the Portfolio_Site, THE Navigation_Bar SHALL remain visible at the top of the viewport
4. WHEN a visitor clicks a Navigation_Bar link, THE Portfolio_Site SHALL smooth-scroll to the corresponding section within 500 milliseconds
5. THE Portfolio_Site SHALL use the SvelteKit Static_Adapter to generate pre-rendered HTML, CSS, and JavaScript files suitable for GitHub Pages deployment
6. WHEN the Portfolio_Site is built, THE Static_Adapter SHALL produce output deployable to GitHub Pages without server-side rendering

### Requirement 2: Hero Section

**User Story:** As a visitor, I want to immediately see who this person is and how to connect with them, so that I can form a first impression and access key links.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a headshot photograph of the portfolio owner
2. THE Hero_Section SHALL display the full name "Harpreet Singh" and a one-liner positioning tagline describing the computational biology, data science, and visualization intersection
3. THE Hero_Section SHALL display clickable icon links to GitHub (github.com/hrrysprk), LinkedIn (linkedin.com/in/hrrysprk), and a downloadable resume PDF
4. WHEN a visitor clicks a social link in the Hero_Section, THE Portfolio_Site SHALL open the linked profile in a new browser tab
5. THE Hero_Section SHALL use the Viridis_Palette for accent elements against a dark background

### Requirement 3: About Section

**User Story:** As a visitor, I want a concise biography, so that I can understand the portfolio owner's background and research trajectory.

#### Acceptance Criteria

1. THE About_Section SHALL display 3 to 4 sentences covering: IISER research background, 3 peer-reviewed publications, MDS at UBC, and the computational biology plus ML plus visualization intersection
2. THE About_Section SHALL use consistent typography and spacing that matches the overall Portfolio_Site visual direction

### Requirement 4: Skills Section

**User Story:** As a hiring manager or collaborator, I want to see technical skills organized by category, so that I can quickly assess domain expertise.

#### Acceptance Criteria

1. THE Skills_Section SHALL display skills organized into these categories: Languages, Bioinformatics, ML and Data, Visualization, Pipelines and Cloud, Other
2. THE Skills_Section SHALL render each skill as a distinct visual element (tag or chip) within its category grouping
3. THE Skills_Section SHALL include all skills listed in the portfolio content: Python, R, TypeScript, JavaScript, Scanpy, AnnData, MuData, Seurat, GATK, BWA, STAR, scikit-learn, XGBoost, MLflow, PyArrow, Polars, Three.js, D3.js, LayerCake, lil-gui, Nextflow DSL2, AWS (Batch, S3, ECR, Wave, Fusion, CloudWatch), Docker, NetworkX, FastAPI, React
4. THE Skills_Section SHALL use the Viridis_Palette to visually distinguish skill categories

### Requirement 5: Projects Section

**User Story:** As a visitor, I want to browse portfolio projects with visual previews and key details, so that I can evaluate the depth and breadth of work.

#### Acceptance Criteria

1. THE Projects_Section SHALL display Project_Cards for each project: GenBrowser, ChromApipe, spaceGen/spacemen, PolicyLens, Neural Network for Gene Length Prediction, Gene Expression Prediction Platform, Web Dashboard for 3D Genome Organization, Sleep Disorder Analysis, Behavioral Patterns in Student Populations
2. WHEN a project has a live demo URL, THE Project_Card SHALL display a clickable link that opens the demo in a new browser tab
3. THE Project_Card SHALL display: a thumbnail or visual preview, the project title, a one-liner description, and the technology stack used
4. THE Projects_Section SHALL present the four primary projects (GenBrowser, ChromApipe, spaceGen, PolicyLens) with visual prominence over the remaining projects
5. WHEN a visitor hovers over or focuses on a Project_Card, THE Project_Card SHALL provide a visual feedback state (such as elevation change or border highlight) using the Viridis_Palette

### Requirement 6: Publications Section

**User Story:** As a researcher or hiring manager, I want to see peer-reviewed publications in a clean format, so that I can assess research output and access the papers.

#### Acceptance Criteria

1. THE Publications_Section SHALL list all three publications with: full title, complete author list with the portfolio owner's name visually emphasized in bold, journal name, publication year, and a clickable DOI or URL link
2. THE Publications_Section SHALL list publications in reverse chronological order (2021, 2020, 2019)
3. WHEN a visitor clicks a publication link, THE Portfolio_Site SHALL open the publication page in a new browser tab

### Requirement 7: Interactive Timeline Visualization

**User Story:** As a visitor, I want an interactive visual timeline of education and experience, so that I can understand the career trajectory at a glance.

#### Acceptance Criteria

1. THE Timeline_Section SHALL render an interactive timeline visualization using LayerCake with D3 scales and Canvas or SVG rendering
2. THE Timeline_Section SHALL display chronological entries spanning from IISER BS-MS (starting 2013) through MDS at UBC (ending 2026), including research positions and key milestones
3. WHEN a visitor hovers over or focuses on a timeline entry, THE Timeline_Section SHALL display a tooltip or expanded detail showing the entry title, institution, date range, and a brief description
4. THE Timeline_Section SHALL use the Viridis_Palette for color-coding timeline entries by type (education, research, work)
5. THE Timeline_Section SHALL be responsive, adapting its layout and readability to viewport widths from 320 pixels to 1920 pixels

### Requirement 8: Contact Section

**User Story:** As a visitor, I want to find contact information and social links, so that I can reach out for collaboration or hiring.

#### Acceptance Criteria

1. THE Contact_Section SHALL display an email address and clickable links to GitHub and LinkedIn profiles using the hrrysprk handle
2. WHEN a visitor clicks a contact link, THE Portfolio_Site SHALL open the corresponding platform in a new browser tab or initiate a mailto action for email

### Requirement 9: Visual Design and Theming

**User Story:** As a visitor, I want a polished, dark-themed visual experience with consistent color and typography, so that the site feels professional and cohesive.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use a dark background color scheme across all sections
2. THE Portfolio_Site SHALL use the Viridis_Palette as the primary accent color system for interactive elements, highlights, and category distinctions
3. THE Portfolio_Site SHALL use a clean, minimal layout with consistent spacing, font sizing, and typographic hierarchy across all sections
4. THE Portfolio_Site SHALL render text with sufficient contrast against the dark background to meet a minimum contrast ratio of 4.5:1 for body text

### Requirement 10: Responsive Design

**User Story:** As a visitor on any device, I want the portfolio to be usable and visually coherent, so that I can browse it on desktop, tablet, or mobile.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL adapt its layout to viewport widths ranging from 320 pixels to 1920 pixels without horizontal scrolling
2. WHEN the viewport width is below 768 pixels, THE Navigation_Bar SHALL collapse into a mobile-friendly navigation pattern (such as a hamburger menu)
3. WHEN the viewport width is below 768 pixels, THE Projects_Section SHALL stack Project_Cards vertically in a single column
4. THE Portfolio_Site SHALL ensure all interactive elements (links, buttons, timeline tooltips) have a minimum touch target size of 44 by 44 pixels on viewports below 768 pixels

### Requirement 11: Performance and Deployment

**User Story:** As a visitor, I want the site to load quickly and be accessible at hrrysprk.com, so that I have a smooth browsing experience.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL be deployable to GitHub Pages with custom domain hrrysprk.com (the site is only accessible at hrrysprk.com; the github.io URL redirects automatically)
2. THE Portfolio_Site SHALL load its initial visible content (above-the-fold Hero_Section) within 2 seconds on a standard broadband connection
3. THE Portfolio_Site SHALL lazy-load images and heavy visualization assets that are below the initial viewport fold
4. IF the Portfolio_Site fails to load a visualization asset, THEN THE Portfolio_Site SHALL display a graceful fallback (static placeholder or simplified view) instead of a broken layout

### Requirement 12: Accessibility

**User Story:** As a visitor using assistive technology, I want the portfolio to be navigable and readable, so that I can access all content regardless of ability.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL provide semantic HTML landmarks (header, nav, main, section, footer) for all major page regions
2. THE Portfolio_Site SHALL provide descriptive alt text for all images including the headshot and project thumbnails
3. THE Portfolio_Site SHALL ensure all interactive elements (Navigation_Bar links, Project_Card links, publication links, timeline entries) are keyboard-navigable using Tab and Enter keys
4. THE Timeline_Section SHALL provide a text-based alternative (such as an accessible list) for screen readers alongside the visual Canvas or SVG rendering
