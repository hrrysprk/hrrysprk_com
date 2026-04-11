<script lang="ts">
  import { onMount } from 'svelte';
  import { skillCategories } from '$lib/data/skills';
  import { forceSimulation, forceX, forceY, forceCollide, forceManyBody } from 'd3-force';

  let svgEl: SVGSVGElement;
  let width = $state(1000);
  let height = $state(780);
  let nodes: any[] = $state([]);
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
      top: pad + 10,
      bottom: pad + 34
    };
  }

  const narrowBreakpoint = 600;

  let narrowLayout = $derived(width < narrowBreakpoint);

  function radiusScale(w: number): number {
    if (w >= narrowBreakpoint) return 1;
    /* Larger bubbles on phones; still capped so labels fit */
    return Math.min(1.04, Math.max(0.9, 0.78 + w / 780));
  }

  function buildNodes(w: number, h: number) {
    const result: any[] = [];
    const narrow = w < narrowBreakpoint;
    const positions = narrow ? clusterPositionsNarrow : clusterPositions;
    const rScale = radiusScale(w);
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
        const baseR = ratingToRadius[skill.rating] || 18;
        const genomicBase = ratingToRadius[3] || 30;
        const genomicSizeAdjustments: Record<string, number> = {
          GEO: 1.2,
          Ensembl: 1.2,
          ENA: 0.65,
          'WashU Epigenome Browser': 0.8
        };
        const genomicAdjusted = genomicBase * (genomicSizeAdjustments[skill.name] || 1);
        const rawR = cat.name === 'Genomic Resources' ? genomicAdjusted : baseR;
        const r = rawR * rScale;
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
    const coll = forceCollide((d: any) => d.r + (narrow ? 10 : 2))
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
        const narrow = width < narrowBreakpoint;
        height = narrow
          ? Math.max(
              900,
              Math.min(
                Math.round(width * 1.75),
                typeof window !== 'undefined' ? Math.round(window.innerHeight * 0.88) : 1040
              )
            )
          : Math.max(680, width * 0.78);
      }
    }
    handleResize();
    nodes = buildNodes(width, height);
    simulation = forceSimulation(nodes)
      .alphaDecay(0.008)
      .on('tick', () => {
        const narrow = width < narrowBreakpoint;
        if (narrow) {
          const ins = chartInsets(width, height, true);
          for (const node of nodes) {
            node.x = Math.max(
              node.r + ins.left,
              Math.min(width - node.r - ins.right, node.x)
            );
            node.y = Math.max(
              node.r + ins.top,
              Math.min(height - node.r - ins.bottom, node.y)
            );
          }
        }
        nodes = [...nodes];
      });
    applySimulationForces(width);
    simulation.alpha(1).restart();

    window.addEventListener('resize', () => {
      handleResize();
      const updated = buildNodes(width, height);
      updated.forEach((n, i) => { if (nodes[i]) { n.x = nodes[i].x; n.y = nodes[i].y; } });
      nodes = updated;
      simulation.nodes(nodes);
      applySimulationForces(width);
      simulation.alpha(0.35).restart();
    });
    return () => simulation.stop();
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

    <!-- Skill bubbles -->
    {#each nodes as node}
      <g style="cursor: pointer;">
        <circle cx={node.x} cy={node.y} r={node.r}
          fill={node.color} opacity="1"
          stroke={node.color} stroke-width="1.5" stroke-opacity="1" />
        <text x={node.x} y={node.y}
          fill="var(--color-text-primary)"
          font-size={narrowLayout
            ? (node.r > 30 ? '12.5' : node.r > 22 ? '11' : '9.5')
            : (node.r > 32 ? '13' : node.r > 22 ? '11' : '9.5')}
          text-anchor="middle" dominant-baseline="middle"
          font-family="var(--font-mono)" style="pointer-events: none;"
        >{node.skill}</text>
      </g>
    {/each}
  </svg>

  <div class="experience-legend" aria-hidden="true">
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
      margin-top: -0.35rem;
      padding-bottom: 3.35rem;
    }

    .experience-legend {
      bottom: 2.85rem;
    }
  }
</style>
