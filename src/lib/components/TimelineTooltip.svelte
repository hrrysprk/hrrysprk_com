<script>
  import { getContext } from 'svelte';

  const { width, height, data, xScale, yScale } = getContext('LayerCake');

  /** @type {{ title: string; institution: string; startDate: string; endDate: string; description: string; type: string } | null} */
  let hoveredEntry = null;
  let tooltipX = 0;
  let tooltipY = 0;

  /**
   * Format a date string to "Mon YYYY"
   * @param {string} dateStr
   * @returns {string}
   */
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  /** @type {Record<string, string>} */
  const typeColors = {
    education: '#31688e',
    research: '#35b779',
    work: '#fde725'
  };

  /**
   * @param {MouseEvent | TouchEvent} event
   */
  function handlePointer(event) {
    const rect = /** @type {HTMLElement} */ (event.currentTarget).getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    const px = clientX - rect.left;
    const py = clientY - rect.top;

    const xs = $xScale;
    const ys = $yScale;
    const entries = $data;
    const bandH = ys.bandwidth ? ys.bandwidth() : 30;

    let found = null;
    for (const entry of entries) {
      const x1 = xs(new Date(entry.startDate));
      const x2 = xs(new Date(entry.endDate));
      const y = ys(entry.title);
      if (px >= x1 && px <= x2 && py >= y && py <= y + bandH) {
        found = entry;
        break;
      }
    }

    if (found) {
      hoveredEntry = found;
      tooltipX = px;
      tooltipY = py;
    } else {
      hoveredEntry = null;
    }
  }

  function handleLeave() {
    hoveredEntry = null;
  }
</script>

<div
  class="tooltip-layer"
  style="width: {$width}px; height: {$height}px;"
  role="presentation"
  on:mousemove={handlePointer}
  on:touchstart={handlePointer}
  on:mouseleave={handleLeave}
>
  {#if hoveredEntry}
    <div
      class="tooltip"
      style="
        left: {Math.min(tooltipX + 12, $width - 220)}px;
        top: {Math.max(tooltipY - 80, 0)}px;
        border-left-color: {typeColors[hoveredEntry.type] || '#1f9e89'};
      "
      role="tooltip"
    >
      <div class="tooltip-title">{hoveredEntry.title}</div>
      <div class="tooltip-institution">{hoveredEntry.institution}</div>
      <div class="tooltip-dates">
        {formatDate(hoveredEntry.startDate)} — {formatDate(hoveredEntry.endDate)}
      </div>
      <div class="tooltip-desc">{hoveredEntry.description}</div>
    </div>
  {/if}

  <!-- Hidden focusable elements for keyboard accessibility -->
  <div class="sr-keyboard-nav" role="list" aria-label="Timeline entries for keyboard navigation">
    {#each $data as entry}
      <button
        class="sr-focus-target"
        type="button"
        aria-label="{entry.title} at {entry.institution}"
        on:focus={() => {
          hoveredEntry = entry;
          const xs = $xScale;
          const ys = $yScale;
          tooltipX = xs(new Date(entry.startDate));
          tooltipY = ys(entry.title);
        }}
        on:blur={() => { hoveredEntry = null; }}
      >
        {entry.title}
      </button>
    {/each}
  </div>
</div>

<style>
  .tooltip-layer {
    position: absolute;
    top: 0;
    left: 0;
  }

  .tooltip {
    position: absolute;
    background: #141420;
    border: 1px solid rgba(160, 160, 184, 0.2);
    border-left: 3px solid #1f9e89;
    border-radius: 6px;
    padding: 0.75rem;
    pointer-events: none;
    z-index: 10;
    min-width: 200px;
    max-width: 280px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }

  .tooltip-title {
    color: #e8e8f0;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .tooltip-institution {
    color: #a0a0b8;
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }

  .tooltip-dates {
    color: #1f9e89;
    font-size: 0.75rem;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    margin-bottom: 0.5rem;
  }

  .tooltip-desc {
    color: #a0a0b8;
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .sr-keyboard-nav {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }

  .sr-focus-target {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    background: transparent;
  }

  .sr-focus-target:focus {
    position: relative;
    width: auto;
    height: auto;
    clip: auto;
    margin: 0;
    padding: 0.25rem 0.5rem;
    color: #e8e8f0;
    background: #141420;
    border: 1px solid #1f9e89;
    border-radius: 4px;
    outline: 2px solid #1f9e89;
    outline-offset: 2px;
  }
</style>
