<script lang="ts">
  import { onMount } from 'svelte';

  const kpis = [
    { value: 5, suffix: '+', label: 'Years in Research' },
    { value: 6, suffix: '+', label: 'Years in Education' },
    { value: 3, suffix: '', label: 'Peer-Reviewed Publications' },
    { value: 10, suffix: '+', label: 'Projects' }
  ];

  let visible = $state(false);
  let counts = $state([0, 0, 0, 0]);
  let wrapperEl: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          animateCounts();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(wrapperEl);
    return () => observer.disconnect();
  });

  function animateCounts() {
    const duration = 1500;
    const start = performance.now();

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
      counts = kpis.map((k) => Math.round(k.value * ease));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
</script>

<div class="kpi-row" bind:this={wrapperEl}>
  {#each kpis as kpi, i}
    <div class="kpi-card">
      <span class="kpi-value">{counts[i]}{kpi.suffix}</span>
      <span class="kpi-label">{kpi.label}</span>
    </div>
  {/each}
</div>

<style>
  .kpi-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-md);
    margin-bottom: 0;
  }

  .kpi-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-md);
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border, rgba(255,255,255,0.08));
    border-radius: 10px;
  }

  .kpi-value {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 900;
    color: var(--color-accent);
    line-height: 1;
  }

  .kpi-label {
    font-size: 0.85rem;
    color: var(--color-text-secondary);
    text-align: center;
  }

  @media (max-width: 600px) {
    .kpi-row {
      grid-template-columns: repeat(2, 1fr);
    }

    .kpi-value {
      font-size: 2rem;
    }
  }
</style>
