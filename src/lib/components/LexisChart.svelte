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
  /** Readable timeline width when the viewport column is very narrow (horizontal scroll). */
  const minPlotOuterWidth = 500;

  // Sort entries by start date
  const sorted = [...lexisEntries].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  /** Mobile: no left column for row titles — labels sit above each bar */
  let ganttMobile = $derived(width < 560);

  let margin = $derived.by(() => {
    const compact = width < 560;
    return {
      top: compact ? 44 : 60,
      right: compact ? 8 : 2,
      bottom: compact ? 56 : 70,
      left: compact ? 10 : 170
    };
  });

  let innerBarGap = $derived(ganttMobile ? 20 : barGap);
  let labelBandAbove = $derived(ganttMobile ? 18 : 0);
  let rowStride = $derived(barHeight + innerBarGap + labelBandAbove);

  let chartHeight = $derived(margin.top + sorted.length * rowStride + margin.bottom);

  /** Fewer year ticks when the drawable width is tight */
  let sparseYearTicks = $derived(width < 520);

  let rowLabelFontSize = $derived(width < 540 ? 10 : 11.5);

  function xScale(date: string): number {
    const d = new Date(date);
    const year = d.getFullYear() + d.getMonth() / 12;
    const m = margin;
    return m.left + ((year - minYear) / (maxYear - minYear)) * (width - m.left - m.right);
  }

  function showYearTick(year: number): boolean {
    if (!sparseYearTicks) return true;
    return year % 2 === 0 || year === minYear || year === maxYear;
  }

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  /** Vertical anchor for rotated marker labels (desktop Canada needs room above y=0 once text is ~90px half-span). */
  function markerLabelY(
    marker: { label: string },
    m: { top: number },
    mobile: boolean
  ): number {
    const isCanada = marker.label.includes('CANADA');
    const canadaMobile = isCanada && mobile;
    const base =
      m.top +
      (mobile ? 26 : 40) -
      (isCanada ? (mobile ? 14 : 24) : mobile ? 18 : 24) +
      (canadaMobile ? 12 : 0);
    if (!mobile && isCanada) {
      /* High floor so we can shift the label upward in SVG without clipping the top of the rotated string. */
      return Math.max(base, 108);
    }
    return base;
  }

  onMount(() => {
    function handleResize() {
      const parent = svgEl?.parentElement;
      if (parent) {
        const cw = parent.clientWidth;
        width = cw < minPlotOuterWidth ? minPlotOuterWidth : cw;
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

  <div class="chart-scroll">
  <svg
    bind:this={svgEl}
    {width}
    height={chartHeight}
    viewBox="0 0 {width} {chartHeight}"
    overflow="visible"
  >
    <!-- Year gridlines -->
    {#each Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i) as year}
      {#if showYearTick(year)}
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
        font-size={sparseYearTicks ? 9.5 : 11}
        text-anchor="end"
        font-family="var(--font-mono)"
        transform="rotate(-45, {xScale(`${year}-01-01`)}, {chartHeight - margin.bottom + 8})"
      >{year}</text>
      {/if}
    {/each}

    <!-- Gantt bars -->
    {#each sorted as entry, i}
      {@const blockTop = margin.top + i * rowStride}
      {@const y = blockTop + labelBandAbove}
      {@const x1 = xScale(entry.startDate)}
      {@const x2 = xScale(entry.endDate)}
      {@const barW = Math.max(x2 - x1, 4)}
      {@const isHovered = hoveredIndex === i}
      {@const labelCenterX = Math.max(
        margin.left + 4,
        Math.min(width - margin.right - 4, x1 + barW / 2)
      )}

      {#if ganttMobile}
        <text
          x={labelCenterX}
          y={blockTop + 12}
          fill={isHovered ? typeColors[entry.type] : 'rgba(200, 200, 215, 0.88)'}
          font-size="9.25"
          text-anchor="middle"
          font-family="var(--font-body)"
          font-weight="500"
          style="transition: fill 0.15s ease;"
        >{entry.label}</text>
      {:else}
        <text
          x={margin.left - 10}
          y={y + barHeight / 2 + 4}
          fill={isHovered ? typeColors[entry.type] : '#8888a0'}
          font-size={rowLabelFontSize}
          text-anchor="end"
          font-family="var(--font-body)"
          style="transition: fill 0.15s ease;"
        >{entry.label}</text>
      {/if}

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

      {#if isHovered}
        <text
          x={x1 + barW / 2}
          y={ganttMobile ? blockTop + 2 : y - 5}
          fill={typeColors[entry.type]}
          font-size="9.5"
          text-anchor="middle"
          font-family="var(--font-mono)"
        >{formatDate(entry.startDate)} — {formatDate(entry.endDate)}</text>
      {/if}
    {/each}

    <!-- Markers after bars so rotated labels are not covered by bar fills -->
    {#each lexisMarkers as marker}
      {@const markerX = xScale(marker.date)}
      {@const isCanadaMarker = marker.label.includes('CANADA')}
      {@const canadaMobile = isCanadaMarker && ganttMobile}
      {@const canadaBothUp = isCanadaMarker ? (canadaMobile ? 14 : 18) : 0}
      {@const labelY = markerLabelY(marker, margin, ganttMobile) - canadaBothUp}
      {@const labelHalf = canadaMobile ? 9 : 12}
      {@const canadaRectLift = canadaMobile ? 10 : 16}
      <!-- Top dashes — from chart top to label -->
      <line
        x1={markerX}
        y1={margin.top}
        x2={markerX}
        y2={labelY - labelHalf}
        stroke="#ff2020"
        stroke-width="1"
        stroke-dasharray="6 4"
        opacity="0.7"
      />
      {#if isCanadaMarker}
        <!-- Pill behind text only: translated up vs the label anchor so it does not sit on top of the “CANADA” glyphs. -->
        <rect
          x={markerX - (canadaMobile ? 54 : 124)}
          y={labelY - labelHalf}
          width={canadaMobile ? 108 : 260}
          height={canadaMobile ? 18 : 26}
          rx={canadaMobile ? 3 : 4}
          fill="var(--color-bg)"
          transform="translate(0, {-canadaRectLift}) rotate(-90, {markerX}, {labelY})"
        />
      {/if}
      <!-- Label (rotated vertical) -->
      <text
        x={markerX}
        y={labelY}
        fill="#ff2020"
        font-size={canadaMobile ? '10.5' : isCanadaMarker ? '17' : '18'}
        font-weight="700"
        opacity="0.9"
        text-anchor="middle"
        font-family="var(--font-mono)"
        clip-path="none"
        transform="rotate(-90, {markerX}, {labelY})"
      >{#if marker.label.includes('CANADA')}<tspan font-weight="400">relocated to</tspan><tspan font-weight="900" dx="12">CANADA</tspan>{:else}{marker.label}{/if}</text>
      <!-- Bottom dashes (below label to chart bottom) -->
      <line
        x1={markerX}
        y1={labelY + labelHalf}
        x2={markerX}
        y2={chartHeight - margin.bottom}
        stroke="#ff2020"
        stroke-width="1"
        stroke-dasharray="6 4"
        opacity="0.7"
      />
    {/each}
  </svg>
  </div>
  <p class="disclaimer">Displaying relevant education, research, and professional experience.</p>
  <div class="disclaimer-gap" aria-hidden="true"></div>
</div>

<style>
  .gantt-wrapper {
    margin-top: var(--space-lg);
  }

  h3 {
    color: var(--color-text-primary);
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(1rem, 1.8vw, 1.4rem);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: var(--space-md);
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-md) var(--space-lg);
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

  .chart-scroll {
    width: 100%;
    /* Vertical padding: overflow-x: auto makes overflow-y compute to auto in browsers, which was clipping the rotated marker text. */
    padding-block: 2.25rem;
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
  }

  .chart-scroll svg {
    display: block;
    width: 100%;
    min-width: 500px;
    height: auto;
    overflow: visible;
  }

  .disclaimer {
    color: rgba(255, 255, 255, 0.82);
    font-size: 0.92rem;
    font-style: normal;
    font-weight: 500;
    opacity: 0.95;
    margin-top: -0.35rem;
    margin-bottom: 0;
  }

  .disclaimer-gap {
    display: block;
    height: 5em;
    font-size: 0.92rem;
    line-height: 1;
    background: transparent;
  }
</style>
