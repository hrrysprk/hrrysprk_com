<script>
  import KpiCards from './KpiCards.svelte';
  import LexisChart from './LexisChart.svelte';
</script>

<section id="timeline" class="timeline">
  <h2>Timeline</h2>
  <KpiCards />
  <LexisChart />
</section>

<style>
  .timeline {
    padding: var(--space-xl) var(--space-lg);
    max-width: 1200px;
    margin: 0 auto;
  }

  h2 {
    color: var(--color-text-primary);
    margin-bottom: var(--space-md);
  }
</style>
