<script lang="ts">
  import { onMount } from 'svelte';
  import { lexisEntries, lexisMarkers } from '$lib/data/lexis';

  let svgEl: SVGSVGElement;
  let width = $state(800);
  let hoveredIndex = $state(-1);

  const typeColors: Record<string, string> = {
    education: '#31688e',
    research: '#35b779',
    work: '#fde725',
    personal: '#ff6b9d'
  };

  const minYear = 2012;
  const maxYear = 2027;
  const barHeight = 22;
  const barGap = 6;
  const margin = { top: 60, right: 20, bottom: 70, left: 220 };

  // Sort entries by start date
  const sorted = [...lexisEntries].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  let chartHeight = $derived(margin.top + sorted.length * (barHeight + barGap) + margin.bottom);

  function xScale(date: string): number {
    const d = new Date(date);
    const year = d.getFullYear() + d.getMonth() / 12;
    return margin.left + ((year - minYear) / (maxYear - minYear)) * (width - margin.left - margin.right);
  }

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  onMount(() => {
    function handleResize() {
      if (svgEl?.parentElement) {
        width = svgEl.parentElement.clientWidth;
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
</script>

<div class="gantt-wrapper">
  <h3>Education & Experience</h3>
  <div class="legend">
    {#each [['education', 'Education'], ['research', 'Research'], ['work', 'Work']] as [type, label]}
      <span class="legend-item">
        <span class="legend-bar" style="background: {typeColors[type]};"></span>
        {label}
      </span>
    {/each}
  </div>

  <svg bind:this={svgEl} {width} height={chartHeight} viewBox="0 0 {width} {chartHeight}">
    <!-- Year gridlines -->
    {#each Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i) as year}
      <line
        x1={xScale(`${year}-01-01`)}
        y1={margin.top}
        x2={xScale(`${year}-01-01`)}
        y2={chartHeight - margin.bottom}
        stroke="rgba(255,255,255,0.06)"
        stroke-width="1"
      />
      <text
        x={xScale(`${year}-01-01`)}
        y={chartHeight - margin.bottom + 8}
        fill="#8888a0"
        font-size="11"
        text-anchor="end"
        font-family="var(--font-mono)"
        transform="rotate(-45, {xScale(`${year}-01-01`)}, {chartHeight - margin.bottom + 8})"
      >{year}</text>
    {/each}

    <!-- Marker lines (COVID, relocation) — vertical dashed with inline label -->
    {#each lexisMarkers as marker}
      {@const markerX = xScale(marker.date)}
      {@const labelY = margin.top + 40 - (marker.label.includes('CANADA') ? 48 : 24)}
      <!-- Top dashes — from chart top to label -->
      <line
        x1={markerX}
        y1={margin.top}
        x2={markerX}
        y2={labelY - 12}
        stroke="#ff2020"
        stroke-width="1"
        stroke-dasharray="6 4"
        opacity="0.7"
      />
      <!-- Label (rotated vertical) -->
      <text
        x={markerX}
        y={labelY}
        fill="#ff2020"
        font-size="18"
        font-weight="700"
        opacity="0.9"
        text-anchor="middle"
        font-family="var(--font-mono)"
        transform="rotate(-90, {markerX}, {labelY})"
      >{#if marker.label.includes('CANADA')}<tspan font-weight="400">relocated to</tspan><tspan font-weight="900" dx="4">CANADA</tspan>{:else}{marker.label}{/if}</text>
      <!-- Bottom dashes (below label to chart bottom) -->
      <line
        x1={markerX}
        y1={labelY + 12}
        x2={markerX}
        y2={chartHeight - margin.bottom}
        stroke="#ff2020"
        stroke-width="1"
        stroke-dasharray="6 4"
        opacity="0.7"
      />
    {/each}

    <!-- Gantt bars -->
    {#each sorted as entry, i}
      {@const y = margin.top + i * (barHeight + barGap)}
      {@const x1 = xScale(entry.startDate)}
      {@const x2 = xScale(entry.endDate)}
      {@const barW = Math.max(x2 - x1, 4)}
      {@const isHovered = hoveredIndex === i}

      <!-- Row label -->
      <text
        x={margin.left - 10}
        y={y + barHeight / 2 + 4}
        fill={isHovered ? typeColors[entry.type] : '#8888a0'}
        font-size="11.5"
        text-anchor="end"
        font-family="var(--font-body)"
        style="transition: fill 0.15s ease;"
      >{entry.label}</text>

      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <rect
        x={x1}
        {y}
        width={barW}
        height={barHeight}
        rx="4"
        fill={typeColors[entry.type]}
        opacity={isHovered ? 0.95 : 0.6}
        style="transition: opacity 0.15s ease; cursor: pointer;"
        role="img"
        aria-label="{entry.label}: {formatDate(entry.startDate)} to {formatDate(entry.endDate)}"
        onmouseenter={() => hoveredIndex = i}
        onmouseleave={() => hoveredIndex = -1}
        onfocus={() => hoveredIndex = i}
        onblur={() => hoveredIndex = -1}
        tabindex="0"
      />

      <!-- Hover tooltip: date range -->
      {#if isHovered}
        <text
          x={x1 + barW / 2}
          y={y - 5}
          fill={typeColors[entry.type]}
          font-size="10"
          text-anchor="middle"
          font-family="var(--font-mono)"
        >{formatDate(entry.startDate)} — {formatDate(entry.endDate)}</text>
      {/if}
    {/each}
  </svg>
  <p class="disclaimer">Displaying relevant education, research, and professional experience.</p>
</div>

<style>
  .gantt-wrapper {
    margin-top: var(--space-xl);
  }

  h3 {
    color: var(--color-text-primary);
    font-size: 1.25rem;
    margin-bottom: var(--space-md);
  }

  .legend {
    display: flex;
    gap: var(--space-lg);
    margin-bottom: var(--space-xs);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--color-text-secondary);
    font-size: 0.85rem;
  }

  .legend-bar {
    display: inline-block;
    width: 20px;
    height: 10px;
    border-radius: 3px;
  }

  svg {
    width: 100%;
    height: auto;
    overflow: visible;
  }

  .disclaimer {
    color: var(--color-text-secondary);
    font-size: 0.85rem;
    font-style: italic;
    opacity: 0.6;
    margin-top: var(--space-sm);
  }
</style>
