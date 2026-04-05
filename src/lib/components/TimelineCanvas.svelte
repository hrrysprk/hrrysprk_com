<script>
  import { getContext, onMount } from 'svelte';

  const { width, height, data, xScale, yScale } = getContext('LayerCake');
  const { ctx } = getContext('canvas');

  /** @type {Record<string, string>} */
  const typeColors = {
    education: '#31688e',
    research: '#35b779',
    work: '#fde725'
  };

  /**
   * @param {CanvasRenderingContext2D} context
   */
  function draw(context) {
    if (!context) return;

    const w = $width;
    const h = $height;
    const xs = $xScale;
    const ys = $yScale;
    const entries = $data;

    context.clearRect(0, 0, w, h);

    const barHeight = ys.bandwidth ? ys.bandwidth() * 0.6 : 30;
    const barOffset = ys.bandwidth ? ys.bandwidth() * 0.2 : 5;

    // Draw bars
    entries.forEach((/** @type {any} */ entry) => {
      const x1 = xs(new Date(entry.startDate));
      const x2 = xs(new Date(entry.endDate));
      const y = ys(entry.title) + barOffset;

      context.fillStyle = typeColors[entry.type] || '#1f9e89';
      context.beginPath();
      context.roundRect(x1, y, x2 - x1, barHeight, 4);
      context.fill();
    });

    // Draw year labels along x-axis
    context.fillStyle = '#a0a0b8';
    context.font = '12px Inter, system-ui, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'top';

    const startYear = 2013;
    const endYear = 2026;
    for (let year = startYear; year <= endYear; year++) {
      const x = xs(new Date(year, 0, 1));
      // Tick mark
      context.strokeStyle = 'rgba(160, 160, 184, 0.3)';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, h);
      context.stroke();
      // Year label at bottom
      context.fillStyle = '#a0a0b8';
      context.fillText(String(year), x, h + 4);
    }

    // Draw entry labels along y-axis
    context.fillStyle = '#e8e8f0';
    context.font = '13px Inter, system-ui, sans-serif';
    context.textAlign = 'right';
    context.textBaseline = 'middle';

    entries.forEach((/** @type {any} */ entry) => {
      const y = ys(entry.title) + (ys.bandwidth ? ys.bandwidth() / 2 : 15);
      context.fillText(entry.institution, -8, y);
    });
  }

  $: if ($ctx) {
    draw($ctx);
  }

  $: if ($ctx && $width && $height && $xScale && $yScale && $data) {
    draw($ctx);
  }
</script>
