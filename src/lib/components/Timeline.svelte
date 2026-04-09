<script>
  import KpiCards from './KpiCards.svelte';
  import LexisChart from './LexisChart.svelte';
</script>

<section id="timeline">
  <h2>Timeline</h2>
  <KpiCards />
  <LexisChart />
</section>

<style>
  section {
    height: 100%;
  }

  h2 {
    color: #ffffff;
    margin-bottom: var(--space-md);
  }
</style>
