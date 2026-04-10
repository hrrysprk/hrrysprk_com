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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
  }

  footer {
    text-align: center;
    padding: var(--space-lg);
    color: var(--color-text-secondary);
    font-size: 0.85rem;
  }
</style>
