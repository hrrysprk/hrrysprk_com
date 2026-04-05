<script lang="ts">
  import { onMount } from 'svelte';
  import { skillCategories } from '$lib/data/skills';
  import { forceSimulation, forceX, forceY, forceCollide, forceManyBody } from 'd3-force';

  let svgEl: SVGSVGElement;
  let width = $state(1000);
  let height = $state(750);
  let nodes: any[] = $state([]);
  let mouseX = $state(-9999);
  let mouseY = $state(-9999);

  const pad = 60;
  const ratingToRadius: Record<number, number> = { 1: 18, 2: 24, 3: 30, 4: 38, 5: 46 };

  const clusterPositions = [
    { xFrac: 0.60, yFrac: 0.01 },
    { xFrac: 0.85, yFrac: 0.20 },
    { xFrac: 0.88, yFrac: 0.55 },
    { xFrac: 0.72, yFrac: 0.90 },
    { xFrac: 0.12, yFrac: 0.20 },
    { xFrac: 0.10, yFrac: 0.55 },
    { xFrac: 0.22, yFrac: 0.85 },
  ];

  function buildNodes(w: number, h: number) {
    const result: any[] = [];
    skillCategories.forEach((cat, ci) => {
      const pos = clusterPositions[ci] || { xFrac: 0.5, yFrac: 0.5 };
      const cx = pad + (w - pad * 2) * pos.xFrac;
      const cy = pad + (h - pad * 2) * pos.yFrac;
      cat.skills.forEach((skill) => {
        const r = ratingToRadius[skill.rating] || 18;
        result.push({
          id: `${cat.name}-${skill.name}`, skill: skill.name,
          rating: skill.rating, category: cat.name, color: cat.color,
          targetX: cx + (Math.random() - 0.5) * 40,
          targetY: cy + (Math.random() - 0.5) * 40,
          x: cx + (Math.random() - 0.5) * 100,
          y: cy + (Math.random() - 0.5) * 100, r
        });
      });
    });
    return result;
  }

  function getCategoryTargets(w: number, h: number) {
    return skillCategories.map((cat, i) => {
      const pos = clusterPositions[i] || { xFrac: 0.5, yFrac: 0.5 };
      return {
        name: cat.name, color: cat.color, labelColor: cat.labelColor,
        x: pad + (w - pad * 2) * pos.xFrac,
        y: pad + (h - pad * 2) * pos.yFrac
      };
    });
  }

  let simulation: any;
  let catTargets = $derived(getCategoryTargets(width, height));

  function getCategoryCenters() {
    const centers: Record<string, { x: number; y: number; count: number }> = {};
    for (const node of nodes) {
      if (!centers[node.category]) centers[node.category] = { x: 0, y: 0, count: 0 };
      centers[node.category].x += node.x;
      centers[node.category].y += node.y;
      centers[node.category].count += 1;
    }
    return Object.entries(centers).map(([name, c]) => ({
      name, x: c.x / c.count, y: c.y / c.count,
      color: skillCategories.find(cat => cat.name === name)?.color || '#888'
    }));
  }
  let categoryCenters = $derived(getCategoryCenters());

  onMount(() => {
    function handleResize() {
      if (svgEl?.parentElement) {
        width = svgEl.parentElement.clientWidth;
        height = Math.max(650, width * 0.7);
      }
    }
    handleResize();
    nodes = buildNodes(width, height);
    simulation = forceSimulation(nodes)
      .force('x', forceX((d: any) => d.targetX).strength(0.06))
      .force('y', forceY((d: any) => d.targetY).strength(0.06))
      .force('collide', forceCollide((d: any) => d.r + 2).strength(0.8))
      .force('charge', forceManyBody().strength(-3))
      .alphaDecay(0.008)
      .on('tick', () => { nodes = [...nodes]; });

    window.addEventListener('resize', () => {
      handleResize();
      const updated = buildNodes(width, height);
      updated.forEach((n, i) => { if (nodes[i]) { n.x = nodes[i].x; n.y = nodes[i].y; } });
      nodes = updated;
      simulation.nodes(nodes);
      simulation.force('x', forceX((d: any) => d.targetX).strength(0.06));
      simulation.force('y', forceY((d: any) => d.targetY).strength(0.06));
      simulation.alpha(0.3).restart();
    });
    return () => simulation.stop();
  });

  function handleMouseMove(e: MouseEvent) {
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
    role="img" aria-label="Interactive skill bubble chart"
    onmousemove={handleMouseMove} onmouseleave={handleMouseLeave}
  >
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
        letter-spacing="0.04em" style="text-transform: uppercase;">
        <textPath href="#branch-{i}" startOffset="45%" text-anchor="middle">
          {cat.name}
        </textPath>
      </text>
    {/each}

    <!-- Root diamond — center (rendered after branches so it sits on top) -->
    <g transform="translate({width / 2},{height / 2})">
      <rect x="-30" y="-30" width="60" height="60" rx="4"
        fill="var(--color-bg)" fill-opacity="0.7" stroke="var(--color-accent)" stroke-width="2"
        stroke-dasharray="6 3" transform="rotate(45)" />
      <text fill="var(--color-accent)" font-size="14" text-anchor="middle"
        dominant-baseline="middle" font-family="var(--font-display)"
        font-weight="700" letter-spacing="0.05em">SKILLS</text>
    </g>

    <!-- Skill bubbles -->
    {#each nodes as node}
      <g style="cursor: pointer;">
        <circle cx={node.x} cy={node.y} r={node.r}
          fill={node.color} opacity="1"
          stroke={node.color} stroke-width="1.5" stroke-opacity="1" />
        <text x={node.x} y={node.y}
          fill="var(--color-text-primary)"
          font-size={node.r > 32 ? '11' : node.r > 22 ? '9' : '7.5'}
          text-anchor="middle" dominant-baseline="middle"
          font-family="var(--font-mono)" style="pointer-events: none;"
        >{node.skill}</text>
      </g>
    {/each}
  </svg>
</div>

<style>
  .bubbles-wrapper { width: 100%; overflow: visible; padding: 20px 0; }
  svg { width: 100%; height: auto; display: block; overflow: visible; }
</style>
