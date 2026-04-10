<script lang="ts">
  import { scaleLinear } from 'd3-scale';
  import type { MiniVizConfig } from '$lib/types';

  let { config }: { config: MiniVizConfig } = $props();

  const width = 320;
  const height = 120;
  const padX = 14;
  const padY = 14;
  const viz = $derived.by(() => {
    const accent = config.accent ?? 'var(--color-accent)';
    const minV = Math.min(...config.values);
    const maxV = Math.max(...config.values);
    const yMax = maxV === minV ? maxV + 1 : maxV;
    const xScale = scaleLinear().domain([0, Math.max(config.values.length - 1, 1)]).range([padX, width - padX]);
    const yScale = scaleLinear().domain([minV, yMax]).range([height - padY, padY]);

    const points = config.values.map((v, i) => ({ x: xScale(i), y: yScale(v), v }));
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaD = `${pathD} L ${width - padX} ${height - padY} L ${padX} ${height - padY} Z`;
    return { accent, points, pathD, areaD };
  });
</script>

<div class="viz-wrap" aria-hidden="true">
  <svg viewBox="0 0 {width} {height}" role="presentation">
    {#if config.type === 'line'}
      <path d={viz.areaD} fill={viz.accent} opacity="0.14" />
      <path d={viz.pathD} stroke={viz.accent} stroke-width="2" fill="none" />
      {#each viz.points as p}
        <circle cx={p.x} cy={p.y} r="2.1" fill={viz.accent} />
      {/each}
    {:else}
      {@const barW = (width - padX * 2) / Math.max(config.values.length, 1)}
      {#each viz.points as p, i}
        <rect
          x={padX + i * barW + 1}
          y={p.y}
          width={Math.max(barW - 2, 2)}
          height={height - padY - p.y}
          rx="2"
          fill={viz.accent}
          opacity="0.88"
        />
      {/each}
    {/if}
  </svg>
</div>

<style>
  .viz-wrap {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
