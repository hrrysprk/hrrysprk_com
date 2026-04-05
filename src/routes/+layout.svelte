<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Starfield from '$lib/components/Starfield.svelte';

  let { children } = $props();
</script>

<Starfield />

<div class="page-content">
  <header>
    <Nav />
  </header>

  <main>
    {@render children()}
  </main>

  <footer>
    <p>&copy; {new Date().getFullYear()} Harpreet Singh</p>
  </footer>
</div>

<style>
  .page-content {
    position: relative;
    z-index: 1;
  }

  header {
    position: sticky;
    top: 0;
    z-index: 100;
  }

  footer {
    text-align: center;
    padding: var(--space-lg);
    color: var(--color-text-secondary);
    font-size: 0.85rem;
  }
</style>
