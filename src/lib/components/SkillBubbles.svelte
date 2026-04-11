<script lang="ts">
  import { onMount } from 'svelte';
  import { skillCategories } from '$lib/data/skills';
  import { forceSimulation, forceX, forceY, forceCollide, forceManyBody } from 'd3-force';

  let svgEl: SVGSVGElement;
  let width = $state(1000);
  let height = $state(780);
  let nodes: any[] = $state([]);
  /** Category captions above each stacked cluster (narrow / static layout only). */
  let mobileSectionLabels = $state<
    { name: string; labelColor: string; x: number; y: number; fontSize: number }[]
  >([]);
  let mouseX = $state(-9999);
  let mouseY = $state(-9999);

  const pad = 50;
  /** Extra top inset so tall bubbles are less likely to leave the viewBox (force can push nodes up). */
  const padTop = pad + 52;
  const ratingToRadius: Record<number, number> = { 1: 18, 2: 24, 3: 30, 4: 38, 5: 46 };

  const clusterPositions = [
    { xFrac: 0.43, yFrac: 0.03 },  // Programming — nudged slightly toward center
    { xFrac: 0.86, yFrac: 0.10 },  // Bioinformatics — moved farther outward
    { xFrac: 0.96, yFrac: 0.55 },  // Genomic Resources — right middle
    { xFrac: 0.72, yFrac: 0.89 },  // ML & Data — moved farther outward
    { xFrac: 0.14, yFrac: 0.22 },  // Cloud & Infra — nudged slightly toward center
    { xFrac: 0.10, yFrac: 0.55 },  // Visualization — left middle
    { xFrac: 0.22, yFrac: 0.85 },  // Statistics — bottom left
  ];

  /**
   * Narrow viewports: one band per category on the Y axis so clusters don’t stack
   * on the same row (main cause of overlap on phones).
   */
  const clusterPositionsNarrow = [
    { xFrac: 0.38, yFrac: 0.05 },
    { xFrac: 0.82, yFrac: 0.19 },
    { xFrac: 0.22, yFrac: 0.33 },
    { xFrac: 0.78, yFrac: 0.46 },
    { xFrac: 0.2, yFrac: 0.6 },
    { xFrac: 0.7, yFrac: 0.74 },
    { xFrac: 0.5, yFrac: 0.88 },
  ];

  function chartInsets(_w: number, _h: number, narrow: boolean) {
    if (!narrow) {
      return { left: pad, right: pad, top: padTop, bottom: pad };
    }
    return {
      left: 4,
      right: 36,
      top: pad - 4,
      /* Extra room at SVG bottom so lowest bubbles sit above the legend overlay */
      bottom: pad + 50
    };
  }

  const narrowBreakpoint = 600;

  let narrowLayout = $derived(width < narrowBreakpoint);

  function radiusScale(w: number): number {
    if (w >= narrowBreakpoint) return 1;
    /* Larger bubbles on phones; still capped so labels fit */
    return Math.min(1.15, Math.max(0.98, 0.86 + w / 700));
  }

  const genomicSizeAdjustments: Record<string, number> = {
    GEO: 1.2,
    Ensembl: 1.2,
    ENA: 0.65,
    'WashU Epigenome Browser': 0.8
  };

  /** Visual radius tier (stored skill rating unchanged; legend still reflects data). */
  function radiusFromTier(catName: string, skillName: string, ratingTier: number): number {
    let r = ratingToRadius[ratingTier] || 18;
    if (catName === 'Bioinformatics' && skillName === 'HiCUP') {
      r = Math.max(r, ratingToRadius[4] || 38);
    }
    return r;
  }

  function bubbleRadius(catName: string, skill: { name: string; rating: number }, w: number): number {
    const rScale = radiusScale(w);
    const baseR = radiusFromTier(catName, skill.name, skill.rating);
    const genomicBase = ratingToRadius[3] || 30;
    const genomicAdjusted = genomicBase * (genomicSizeAdjustments[skill.name] || 1);
    const rawR = catName === 'Genomic Resources' ? genomicAdjusted : baseR;
    return rawR * rScale;
  }

  /**
   * Narrow static layout only: Programming bubble radii vs data ratings (legend still uses stored ratings).
   * R → Python-sized; JavaScript → slightly below SQL/Perl tier; Perl uses data (same rating as SQL).
   */
  function mobileRadiusRating(catName: string, skillName: string, actualRating: number): number {
    if (catName !== 'Programming') return actualRating;
    if (skillName === 'R') return 5;
    if (skillName === 'JavaScript') return 3;
    return actualRating;
  }

  /** Minimum radius so the longest word / line block fits at ~mono widths (narrow static layout). */
  function minRadiusForLabel(skillName: string, canvasW: number): number {
    const words = skillName.trim().split(/\s+/);
    const longest = Math.max(1, ...words.map((x) => x.length));
    const lineCount = words.length;
    const fs = 10;
    const halfW = (longest * fs * 0.52) / 2 + 10;
    const halfH = (lineCount * fs * 1.2) / 2 + 8;
    return Math.min(canvasW * 0.22, Math.max(halfW, halfH, 14));
  }

  /**
   * Narrow only: stacked sections (one per category), each a full-width grid.
   * Seven anchor points on one canvas packed every cluster into the same space → heavy overlap.
   */
  function computeStaticMobileLayout(w: number): {
    nodes: any[];
    height: number;
    sectionLabels: { name: string; labelColor: string; x: number; y: number; fontSize: number }[];
  } {
    const insetLeft = 14;
    const insetRight = 14;
    const insetTop = 24;
    const insetBottom = 76;
    const innerW = Math.max(100, w - insetLeft - insetRight);
    const mobileScale = Math.min(0.8, Math.max(0.58, w / 420));
    const sectionLabels: { name: string; labelColor: string; x: number; y: number; fontSize: number }[] =
      [];
    /** Tighten vertical/horizontal packing on mobile (~10% less spacing). */
    const sp = 0.9;
    /** Space reserved above each cluster for the category caption. */
    const labelSlot = Math.round(22 * sp);

    function rawR(catName: string, skill: { name: string; rating: number }): number {
      const effRating = mobileRadiusRating(catName, skill.name, skill.rating);
      const baseR = radiusFromTier(catName, skill.name, effRating);
      const genomicBase = ratingToRadius[3] || 30;
      const genomicAdjusted = genomicBase * (genomicSizeAdjustments[skill.name] || 1);
      const raw = catName === 'Genomic Resources' ? genomicAdjusted : baseR;
      return raw * mobileScale;
    }

    const sectionGap = Math.round(32 * sp);
    let sectionY = insetTop;
    const out: any[] = [];
    const cellGap = Math.round(12 * sp);
    const edgePad = Math.max(2, Math.floor(3 * sp));

    for (const cat of skillCategories) {
      const nl = cat.name.length;
      const fontSize =
        nl > 26 ? 7.5 : nl > 20 ? 8.25 : nl > 15 ? 8.75 : 9.5;
      sectionLabels.push({
        name: cat.name,
        labelColor: cat.labelColor,
        x: insetLeft + 2,
        y: sectionY + 11,
        fontSize
      });
      sectionY += labelSlot;

      const skills = cat.skills;
      const n = skills.length;
      let radii = skills.map((s) => Math.max(rawR(cat.name, s), minRadiusForLabel(s.name, w)));

      for (let attempt = 0; attempt < 14; attempt++) {
        const maxR = Math.max(...radii, 11);
        const colsTry = Math.min(n, Math.max(1, Math.floor(innerW / (2 * maxR + cellGap))));
        const cellWTry = innerW / Math.max(colsTry, 1);
        const tight = radii.some((r) => cellWTry < 2 * r + cellGap - 0.5);
        if (!tight) break;
        radii = radii.map((r) => Math.max(11, r * 0.93));
      }

      const maxR = Math.max(...radii, 11);
      let cols = Math.min(n, Math.max(1, Math.floor(innerW / (2 * maxR + cellGap))));
      if (n <= 1) cols = 1;
      const cellW = innerW / Math.max(cols, 1);
      const rows = Math.ceil(n / cols);

      const rowHeights: number[] = [];
      for (let row = 0; row < rows; row++) {
        let rh = cellGap;
        for (let col = 0; col < cols; col++) {
          const si = row * cols + col;
          if (si >= n) break;
          const r = radii[si];
          const lineCount = skills[si].name.trim().split(/\s+/).length;
          const fs = r > 28 ? 11.25 : r > 22 ? 10.25 : 9.25;
          const textBlock = lineCount * fs * 1.2;
          rh = Math.max(rh, 2 * r + Math.max(Math.round(10 * sp), textBlock - r * 1.05));
        }
        rowHeights.push(rh);
      }

      for (let si = 0; si < n; si++) {
        const col = si % cols;
        const row = Math.floor(si / cols);
        let rowOff = 0;
        for (let rr = 0; rr < row; rr++) rowOff += rowHeights[rr];
        const cx = insetLeft + (col + 0.5) * cellW;
        const cy = sectionY + rowOff + rowHeights[row] / 2;
        const r = radii[si];
        const xMin = insetLeft + r + edgePad;
        const xMax = w - insetRight - r - edgePad;
        const yMin = sectionY + rowOff + r + edgePad;
        const yMax = sectionY + rowOff + rowHeights[row] - r - edgePad;
        const x = Math.max(xMin, Math.min(xMax, cx));
        const y = Math.max(yMin, Math.min(yMax, cy));
        out.push({
          id: `${cat.name}-${skills[si].name}`,
          skill: skills[si].name,
          rating: skills[si].rating,
          category: cat.name,
          color: cat.color,
          targetX: x,
          targetY: y,
          x,
          y,
          r,
          vx: 0,
          vy: 0
        });
      }

      sectionY += rowHeights.reduce((a, h) => a + h, 0) + sectionGap;
    }

    const height = Math.max(Math.ceil(sectionY + insetBottom), 520);
    return { nodes: out, height, sectionLabels };
  }

  function buildNodes(w: number, h: number) {
    const result: any[] = [];
    const narrow = w < narrowBreakpoint;
    const positions = narrow ? clusterPositionsNarrow : clusterPositions;
    const tgtJ = narrow ? 12 : 40;
    const initJ = narrow ? 32 : 100;
    const inset = chartInsets(w, h, narrow);
    const innerH = h - inset.top - inset.bottom;
    skillCategories.forEach((cat, ci) => {
      const pos = positions[ci] || { xFrac: 0.5, yFrac: 0.5 };
      const cx = inset.left + (w - inset.left - inset.right) * pos.xFrac;
      const cy = inset.top + innerH * pos.yFrac;
      const nSkills = cat.skills.length;
      cat.skills.forEach((skill, si) => {
        let cxUse = cx;
        let cyUse = cy;
        if (narrow && nSkills > 4) {
          const rows = Math.min(5, Math.max(2, Math.ceil(nSkills / 4)));
          const perRow = Math.ceil(nSkills / rows);
          const row = Math.min(rows - 1, Math.floor(si / perRow));
          const step = Math.min(32, innerH * 0.038);
          cyUse = cy + (row - (rows - 1) / 2) * step;
          const slot = si % perRow;
          cxUse = cx + (slot - (perRow - 1) / 2) * 10;
        }
        const r = bubbleRadius(cat.name, skill, w);
        result.push({
          id: `${cat.name}-${skill.name}`, skill: skill.name,
          rating: skill.rating, category: cat.name, color: cat.color,
          targetX: cxUse + (Math.random() - 0.5) * tgtJ,
          targetY: cyUse + (Math.random() - 0.5) * tgtJ,
          x: cxUse + (Math.random() - 0.5) * initJ,
          y: cyUse + (Math.random() - 0.5) * initJ, r
        });
      });
    });
    return result;
  }

  function getCategoryTargets(w: number, h: number) {
    const narrow = w < narrowBreakpoint;
    const positions = narrow ? clusterPositionsNarrow : clusterPositions;
    const inset = chartInsets(w, h, narrow);
    return skillCategories.map((cat, i) => {
      const pos = positions[i] || { xFrac: 0.5, yFrac: 0.5 };
      return {
        name: cat.name, color: cat.color, labelColor: cat.labelColor,
        x: inset.left + (w - inset.left - inset.right) * pos.xFrac,
        y: inset.top + (h - inset.top - inset.bottom) * pos.yFrac
      };
    });
  }

  function getLabelStartOffset(name: string) {
    // Pull these two labels toward the center so text avoids nearby bubbles.
    if (name === 'Programming' || name === 'Cloud & Infra') return '62%';
    if (name === 'Bioinformatics') return '42%';
    return '45%';
  }

  let simulation: any;
  let catTargets = $derived(getCategoryTargets(width, height));

  function applySimulationForces(w: number) {
    if (!simulation) return;
    const narrow = w < narrowBreakpoint;
    simulation.alphaDecay(narrow ? 0.0045 : 0.008);
    const coll = forceCollide((d: any) => d.r + (narrow ? 11 : 2))
      .strength(narrow ? 1 : 0.8)
      .iterations(narrow ? 5 : 1);
    simulation
      .force('x', forceX((d: any) => d.targetX).strength(narrow ? 0.1 : 0.06))
      .force('y', forceY((d: any) => d.targetY).strength(narrow ? 0.18 : 0.06))
      .force('collide', coll)
      .force('charge', forceManyBody().strength(narrow ? -0.9 : -3));
  }

  onMount(() => {
    function handleResize() {
      if (svgEl?.parentElement) {
        width = svgEl.parentElement.clientWidth;
        if (width >= narrowBreakpoint) {
          height = Math.max(680, width * 0.78);
        }
        /* Narrow SVG height comes from computeStaticMobileLayout (stacked categories). */
      }
    }

    function isNarrow() {
      return width < narrowBreakpoint;
    }

    function applyLayout() {
      handleResize();
      if (isNarrow()) {
        if (simulation) {
          simulation.stop();
          simulation = null;
        }
        const { nodes: next, height: nh, sectionLabels } = computeStaticMobileLayout(width);
        height = nh;
        nodes = next;
        mobileSectionLabels = sectionLabels;
        return;
      }

      mobileSectionLabels = [];

      const prev = nodes;
      const updated = buildNodes(width, height);
      if (prev.length && simulation) {
        updated.forEach((n, i) => {
          const p = prev[i];
          if (p && n.id === p.id) {
            n.x = p.x;
            n.y = p.y;
          }
        });
      }
      nodes = updated;

      const createdSim = !simulation;
      if (!simulation) {
        simulation = forceSimulation(nodes)
          .alphaDecay(0.008)
          .on('tick', () => {
            nodes = [...nodes];
          });
      } else {
        simulation.nodes(nodes);
      }
      applySimulationForces(width);
      simulation.alpha(createdSim ? 1 : 0.35).restart();
    }

    applyLayout();

    window.addEventListener('resize', applyLayout);
    return () => {
      simulation?.stop();
      window.removeEventListener('resize', applyLayout);
    };
  });

  function handleMouseMove(e: MouseEvent) {
    if (width < narrowBreakpoint) return;
    const rect = svgEl.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    let kick = false;
    for (const node of nodes) {
      const dx = node.x - mouseX, dy = node.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 70 && dist > 0) {
        const f = ((70 - dist) / 70) * 10;
        node.vx = (node.vx || 0) + (dx / dist) * f;
        node.vy = (node.vy || 0) + (dy / dist) * f;
        kick = true;
      }
    }
    if (kick && simulation) simulation.alpha(0.08).restart();
  }
  function handleMouseLeave() { mouseX = -9999; mouseY = -9999; }

</script>

<div class="bubbles-wrapper">
  <svg
    bind:this={svgEl}
    width={width} height={height}
    viewBox="0 0 {width} {height}"
    overflow={narrowLayout ? 'hidden' : 'visible'}
    role="img"
    aria-label={narrowLayout
      ? 'Skill bubbles by category (color); larger bubbles mean more years of experience'
      : 'Interactive skill bubble chart'}
    onmousemove={handleMouseMove} onmouseleave={handleMouseLeave}
  >
    {#if !narrowLayout}
    <defs>
      {#each catTargets as cat, i}
        <marker id="arrow-{i}" viewBox="0 0 10 6" refX="10" refY="3"
          markerWidth="10" markerHeight="6" orient="auto">
          <path d="M0,0 L10,3 L0,6 Z" fill={cat.labelColor} opacity="0.9" />
        </marker>
        <!-- Reverse path for left-side clusters so text reads left-to-right -->
        {#if cat.x < width / 2}
          <path id="branch-{i}"
            d="M{cat.x},{cat.y} Q{width/2 + (cat.x - width/2)*0.4},{height/2 + (cat.y - height/2)*0.15} {width/2},{height/2}"
            fill="none"
          />
          <path id="branch-draw-{i}"
            d="M{width/2},{height/2} Q{width/2 + (cat.x - width/2)*0.4},{height/2 + (cat.y - height/2)*0.15} {cat.x},{cat.y}"
            fill="none"
          />
        {:else}
          <path id="branch-{i}"
            d="M{width/2},{height/2} Q{width/2 + (cat.x - width/2)*0.4},{height/2 + (cat.y - height/2)*0.15} {cat.x},{cat.y}"
            fill="none"
          />
          <path id="branch-draw-{i}"
            d="M{width/2},{height/2} Q{width/2 + (cat.x - width/2)*0.4},{height/2 + (cat.y - height/2)*0.15} {cat.x},{cat.y}"
            fill="none"
          />
        {/if}
      {/each}
    </defs>

    <!-- Branch paths with labels -->
    {#each catTargets as cat, i}
      <use href="#branch-draw-{i}"
        stroke={cat.labelColor} stroke-width="1.5" stroke-dasharray="8 5"
        opacity="0.6" fill="none"
      />
      <text font-size="13" fill={cat.labelColor} opacity="0.85"
        font-family="var(--font-display)" font-weight="600"
        letter-spacing="0.04em" dy="-8" style="text-transform: uppercase;">
        <textPath href="#branch-{i}" startOffset={getLabelStartOffset(cat.name)} text-anchor="middle">
          {cat.name}
        </textPath>
      </text>
    {/each}
    {/if}

    {#if !narrowLayout}
    <!-- Root diamond — center (desktop only; hidden on narrow viewports) -->
    <g transform="translate({width / 2},{height / 2})">
      <rect x="-30" y="-30" width="60" height="60" rx="4"
        fill="var(--color-bg)" fill-opacity="0.7" stroke="var(--color-accent)" stroke-width="2"
        stroke-dasharray="6 3" transform="rotate(45)" />
      <text fill="var(--color-accent)" font-size="14" text-anchor="middle"
        dominant-baseline="middle" font-family="var(--font-display)"
        font-weight="700" letter-spacing="0.05em">SKILLS</text>
    </g>
    {/if}

    {#if narrowLayout}
      <g class="mobile-cluster-labels">
        {#each mobileSectionLabels as lab}
          <text
            x={lab.x}
            y={lab.y}
            text-anchor="start"
            fill={lab.labelColor}
            font-size={lab.fontSize}
            font-family="var(--font-display)"
            font-weight="600"
            letter-spacing="0.08em"
            style="text-transform: uppercase;"
            opacity="0.88"
          >{lab.name}</text>
        {/each}
      </g>
    {/if}

    <!-- Skill bubbles -->
    {#each nodes as node}
      {@const labelWords = node.skill.trim().split(/\s+/)}
      {@const longestWord = Math.max(1, ...labelWords.map((x: string) => x.length))}
      {@const fsNarrowBase = node.r > 32 ? 12 : node.r > 24 ? 10.5 : 9.5}
      {@const fsNarrow = Math.max(
        7.8,
        Math.min(fsNarrowBase, (node.r * 1.42) / Math.max(longestWord * 0.5, 0.01))
      )}
      {@const fsWide = node.r > 32 ? 13 : node.r > 22 ? 11 : 9.5}
      {@const fsNum = narrowLayout ? fsNarrow : fsWide}
      {@const linePx = fsNum * 1.14}
      {@const blockTop = node.y - ((labelWords.length - 1) * linePx) / 2}
      <g style="cursor: pointer;">
        <circle cx={node.x} cy={node.y} r={node.r}
          fill={node.color} opacity="1"
          stroke={node.color} stroke-width="1.5" stroke-opacity="1" />
        {#if narrowLayout && labelWords.length > 1}
          <text
            fill="var(--color-text-primary)"
            font-size={fsNum}
            text-anchor="middle"
            font-family="var(--font-mono)"
            style="pointer-events: none;"
          >
            {#each labelWords as word, wi}
              <tspan x={node.x} y={blockTop + wi * linePx + linePx * 0.28}>{word}</tspan>
            {/each}
          </text>
        {:else}
          <text x={node.x} y={node.y}
            fill="var(--color-text-primary)"
            font-size={fsNum}
            text-anchor="middle" dominant-baseline="middle"
            font-family="var(--font-mono)" style="pointer-events: none;"
          >{node.skill}</text>
        {/if}
      </g>
    {/each}
  </svg>

  <div class="experience-legend experience-legend--chart" aria-hidden="true">
    <svg class="experience-legend__circles" viewBox="-2 -18 154 42" width="154" height="42">
      <!-- Larger left → smaller right; r=7 unchanged, others scaled up; baseline y = 22 -->
      <circle cx="21" cy="3" r="19" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-dasharray="5 4" />
      <circle cx="61" cy="7" r="15" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-dasharray="5 4" />
      <circle cx="94" cy="10" r="12" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-dasharray="5 4" />
      <circle cx="121" cy="13" r="9" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-dasharray="5 4" />
      <circle cx="143" cy="15" r="7" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-dasharray="5 4" />
    </svg>
    <p class="experience-legend__label">Years of experience</p>
  </div>
</div>

<style>
  .bubbles-wrapper {
    position: relative;
    width: 100%;
    overflow: visible;
    padding: 0 0 4.25rem;
    transform: translateX(-2rem);
  }
  svg { width: 100%; height: auto; display: block; overflow: visible; }

  .experience-legend {
    position: absolute;
    left: 0;
    bottom: 0.25rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
    pointer-events: none;
    max-width: min(100%, 15rem);
  }

  .experience-legend__circles {
    width: 100%;
    max-width: 12rem;
    height: auto;
    display: block;
    opacity: 0.92;
  }

  .experience-legend__label {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(232, 232, 240, 0.72);
    text-align: left;
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    .bubbles-wrapper {
      transform: none;
    }
  }

  @media (max-width: 600px) {
    .bubbles-wrapper {
      width: 100%;
      box-sizing: border-box;
      margin-top: -1.2rem;
      padding-bottom: 1.25rem;
    }

    /* Legend lives beside the section title in Skills.svelte on mobile */
    .experience-legend--chart {
      display: none;
    }
  }
</style>
