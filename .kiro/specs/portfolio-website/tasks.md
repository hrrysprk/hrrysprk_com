# Implementation Plan: Portfolio Website

## Overview

Build a single-page scrollable portfolio website using SvelteKit with static adapter, hosted via GitHub Pages at hrrysprk.com. Implementation proceeds from project scaffolding → data layer → static sections → interactive timeline → responsive/accessibility polish → testing → deployment readiness.

## Tasks

- [x] 1. Initialize SvelteKit project and configure build tooling
  - [x] 1.1 Scaffold SvelteKit project with TypeScript, install dependencies (`@sveltejs/adapter-static`, `layercake`, `d3-scale`, `d3-time-format`)
    - Configure `svelte.config.js` with static adapter (pages: 'build', fallback: '404.html', strict: true, base path empty)
    - Create `static/CNAME` with `hrrysprk.com`
    - Create `static/images/` directory for headshot and thumbnails
    - _Requirements: 1.5, 1.6, 11.1_
  - [x] 1.2 Set up global styles and viridis color system in `app.css`
    - Define all CSS custom properties: viridis palette stops (--viridis-0 through --viridis-9), semantic color mappings (--color-bg, --color-bg-elevated, --color-text-primary, --color-text-secondary, --color-accent, --color-accent-hover), timeline type colors, typography (Inter + JetBrains Mono), and spacing scale
    - Apply dark background and base typography to `body`
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [x] 1.3 Set up testing framework (Vitest, @testing-library/svelte, fast-check)
    - Install `vitest`, `@testing-library/svelte`, `jsdom`, `fast-check` as dev dependencies
    - Configure `vitest.config.ts` with svelte plugin and jsdom environment
    - _Requirements: (testing infrastructure)_

- [x] 2. Create TypeScript data layer
  - [x] 2.1 Define TypeScript interfaces in `src/lib/types.ts`
    - Create `Project`, `Publication`, `SkillCategory`, and `TimelineEntry` interfaces as specified in design
    - _Requirements: 5.3, 6.1, 4.1, 7.2_
  - [x] 2.2 Create static data files in `src/lib/data/`
    - `projects.ts`: all 9 projects with GenBrowser, ChromApipe, spaceGen, PolicyLens marked `primary: true`
    - `publications.ts`: 3 publications in reverse chronological order with full author lists and `<strong>` around Harpreet Singh
    - `skills.ts`: 6 categories with viridis colors and all skills from requirements
    - `timeline.ts`: entries from IISER BS-MS (2013) through MDS at UBC (2025)
    - _Requirements: 4.3, 5.1, 6.1, 6.2, 7.2_

- [x] 3. Implement layout and navigation
  - [x] 3.1 Create `+layout.svelte` with dark theme wrapper and semantic HTML landmarks
    - Wrap content in `<header>`, `<main>`, `<footer>` landmarks
    - Import and render `Nav` component
    - _Requirements: 1.1, 12.1_
  - [x] 3.2 Create `Nav.svelte` with sticky navigation and scroll-spy
    - Render links for all 7 sections with `href="#section-id"` anchors
    - Implement `position: sticky; top: 0` with semi-transparent dark background and backdrop blur
    - Implement Intersection Observer for scroll-spy active link highlighting
    - Implement smooth scroll via `element.scrollIntoView({ behavior: 'smooth' })`
    - _Requirements: 1.2, 1.3, 1.4_
  - [x] 3.3 Implement mobile hamburger menu in `Nav.svelte`
    - Below 768px: collapse nav into hamburger icon with slide-out panel
    - Use `<details>/<summary>` as no-JS fallback
    - Ensure 44×44px minimum touch targets
    - _Requirements: 10.2, 10.4_
  - [x] 3.4 Create `+page.svelte` composing all section components in order
    - Import and render: Hero, About, Skills, Projects, Publications, Timeline, Contact
    - Each section wrapped in `<section id="section-name">` for anchor navigation
    - _Requirements: 1.1_

- [x] 4. Checkpoint — Ensure project builds and navigation works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement static content sections
  - [x] 5.1 Create `Hero.svelte`
    - Render headshot `<img>` (not lazy-loaded, above the fold) with descriptive alt text
    - Display "Harpreet Singh" and positioning tagline
    - Render GitHub, LinkedIn, and resume PDF icon links with `target="_blank"` and `rel="noopener noreferrer"`
    - Viridis accent on hover states
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 12.2_
  - [x] 5.2 Create `About.svelte`
    - Render 3-4 sentence bio covering IISER research, publications, MDS at UBC, and the computational biology + ML + visualization intersection
    - _Requirements: 3.1, 3.2_
  - [x] 5.3 Create `Skills.svelte`
    - Import `skillCategories` from data layer
    - Render category headings with distinct viridis colors
    - Render each skill as a chip/tag element
    - Responsive: wrap chips within categories, stack categories vertically on narrow viewports
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [x] 5.4 Create `Contact.svelte`
    - Render email mailto link, GitHub and LinkedIn icon links
    - All links open in new tab or trigger mailto
    - _Requirements: 8.1, 8.2_
  - [ ]* 5.5 Write unit tests for Hero, About, Skills, and Contact components
    - Verify headshot renders with non-empty alt text
    - Verify all 6 skill categories and required skills render
    - Verify social links have correct href and target attributes
    - Verify semantic landmarks are present
    - _Requirements: 2.1, 2.3, 4.1, 4.3, 8.1, 12.1, 12.2_

- [x] 6. Implement Projects and Publications sections
  - [x] 6.1 Create `ProjectCard.svelte`
    - Accept `project: Project` prop
    - Render thumbnail (lazy-loaded), title, description, tech stack tags
    - Conditionally render live demo link and repo link when URLs are defined
    - Hover/focus state: viridis border glow and elevation via box-shadow
    - Image `on:error` handler swaps to placeholder SVG
    - _Requirements: 5.2, 5.3, 5.5, 11.4, 12.2_
  - [x] 6.2 Create `Projects.svelte`
    - Import projects data, render CSS Grid of ProjectCard components
    - 2 columns on desktop (≥1024px), 1 column on mobile (<768px)
    - Primary projects rendered with visual prominence
    - _Requirements: 5.1, 5.4, 10.3_
  - [x] 6.3 Create `Publications.svelte`
    - Import publications data, render ordered list in reverse chronological order
    - Display title (bold), full author list with portfolio owner in `<strong>`, journal (italic), year, clickable DOI link
    - Links open in new tab
    - _Requirements: 6.1, 6.2, 6.3_
  - [ ]* 6.4 Write property test: ProjectCard renders all required fields
    - **Property 1: ProjectCard renders all required fields**
    - Generate arbitrary `Project` objects with random titles, descriptions, stack arrays, and optional liveUrl
    - Verify rendered output contains title, description, every stack item, and liveUrl link when defined
    - **Validates: Requirements 5.2, 5.3**
  - [ ]* 6.5 Write property test: Publications are in reverse chronological order
    - **Property 2: Publications are in reverse chronological order**
    - Generate arbitrary arrays of `Publication` objects with random years
    - Pass through sorting logic and verify descending year order
    - **Validates: Requirements 6.2**
  - [ ]* 6.6 Write unit tests for Projects and Publications components
    - Verify all 9 projects render with correct data
    - Verify 4 primary projects have visual prominence
    - Verify all 3 publications render with title, journal, year, and link
    - _Requirements: 5.1, 5.4, 6.1, 6.2_

- [x] 7. Checkpoint — Ensure all static sections render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Implement interactive Timeline visualization
  - [x] 8.1 Create `Timeline.svelte` with LayerCake wrapper
    - Import timeline data, configure LayerCake instance with `d3.scaleTime()` (x) and `d3.scaleBand()` (y)
    - Set x domain from 2013 to 2026, y domain from entry labels
    - Include Canvas layer and HTML tooltip layer
    - Wrap in `onMount` try/catch for error handling with static fallback
    - _Requirements: 7.1, 7.2, 11.4_
  - [x] 8.2 Create `TimelineCanvas.svelte` for Canvas rendering
    - Draw horizontal bars for each timeline entry (start → end date)
    - Color-code bars by entry type using viridis palette: education → `--color-education`, research → `--color-research`, work → `--color-work`
    - Draw axis ticks and year labels
    - _Requirements: 7.1, 7.4_
  - [x] 8.3 Create `TimelineTooltip.svelte` for HTML tooltip layer
    - Listen for mouse/touch events on Canvas
    - Map pointer position back to data using LayerCake scales
    - Display positioned tooltip with title, institution, date range, description
    - Include hidden focusable elements for keyboard-accessible tooltip triggering
    - _Requirements: 7.3, 12.3_
  - [x] 8.4 Add accessible screen reader fallback for Timeline
    - Render visually hidden `<ul role="list">` with all timeline entries as text
    - Each `<li>` contains: title, institution, date range, description
    - _Requirements: 7.5, 12.4_
  - [ ]* 8.5 Write property test: Timeline entries map to correct viridis color by type
    - **Property 3: Timeline entries map to correct viridis color by type**
    - Generate arbitrary `TimelineEntry` objects with random types from `['education', 'research', 'work']`
    - Verify color mapping function returns correct viridis color for each type
    - **Validates: Requirements 7.4**
  - [ ]* 8.6 Write unit tests for Timeline components
    - Verify accessible hidden list renders all timeline entries
    - Verify timeline fallback renders when Canvas initialization fails
    - _Requirements: 7.2, 11.4, 12.4_

- [x] 9. Checkpoint — Ensure timeline visualization works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Responsive design and accessibility polish
  - [x] 10.1 Implement responsive breakpoints across all components
    - Verify no horizontal scrolling from 320px to 1920px
    - Projects grid: 2 columns ≥1024px, 1 column <768px
    - Timeline: adapt layout for narrow viewports (≤480px consider vertical stacked layout)
    - All interactive elements: 44×44px minimum touch targets below 768px
    - _Requirements: 10.1, 10.3, 10.4, 7.5_
  - [x] 10.2 Verify and fix keyboard navigation across all interactive elements
    - Ensure all nav links, project card links, publication links, and timeline entries are reachable via Tab and activatable via Enter
    - Verify logical focus order matches visual layout
    - _Requirements: 12.3_
  - [x] 10.3 Add lazy loading for below-fold images and assets
    - Add `loading="lazy"` to project thumbnails and below-fold images
    - Ensure Hero headshot is NOT lazy-loaded (above the fold)
    - _Requirements: 11.2, 11.3_
  - [ ]* 10.4 Write property test: Text-background color pairs meet WCAG contrast ratio
    - **Property 4: Text-background color pairs meet WCAG contrast ratio**
    - Compute WCAG 2.1 contrast ratios for all defined theme text/background color pairs
    - Verify all pairs meet minimum 4.5:1 ratio for body text
    - **Validates: Requirements 9.4**
  - [ ]* 10.5 Write property test: All images have non-empty alt text
    - **Property 5: All images have non-empty alt text**
    - Generate arbitrary `Project` objects, render ProjectCard, verify all `<img>` elements have non-empty `alt` attributes
    - **Validates: Requirements 12.2**

- [x] 11. Final integration and deployment readiness
  - [x] 11.1 Wire all components together and verify full page composition
    - Ensure all sections render in correct order in `+page.svelte`
    - Verify Nav scroll-spy highlights correct section during scroll
    - Verify smooth scroll navigation works for all section links
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [x] 11.2 Configure GitHub Pages deployment
    - Verify `static/CNAME` contains `hrrysprk.com`
    - Verify `npm run build` produces `build/` directory with `index.html`, CSS, JS, and `CNAME` file for custom domain
    - Add `prerender` entries in `+layout.ts` (`export const prerender = true`)
    - _Requirements: 1.5, 1.6, 11.1_
  - [ ]* 11.3 Write integration tests with Playwright
    - Build smoke test: verify output directory contains expected files
    - Timeline interaction: verify tooltip appears on hover with correct content
    - Keyboard navigation: verify Tab traversal through all interactive elements
    - Responsive: verify layout at 320px, 768px, 1024px, 1920px viewports
    - _Requirements: 1.1, 7.3, 10.1, 12.3_

- [x] 12. Final checkpoint — Ensure all tests pass and site is deployment-ready
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation after major milestones
- Property tests validate the 5 correctness properties defined in the design document
- All data is static TypeScript — no API calls or CMS integration needed
- The CNAME file and static adapter config handle GitHub Pages custom domain deployment
