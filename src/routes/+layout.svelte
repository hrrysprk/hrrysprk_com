<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Starfield from '$lib/components/Starfield.svelte';

  let { children } = $props();

  /** Matches Starfield’s narrow breakpoint: skip canvas entirely on phones (avoids jank / layout glitches). */
  const starfieldMinWidthPx = 769;
  let showStarfield = $state(false);

  onMount(() => {
    const mq = window.matchMedia(`(min-width: ${starfieldMinWidthPx}px)`);
    const sync = () => {
      showStarfield = mq.matches;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  });
</script>

{#if showStarfield}
  <Starfield />
{/if}

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
    position: static;
    z-index: 60;
    position: relative;
  }

  footer {
    text-align: center;
    padding: var(--space-lg);
    color: var(--color-text-secondary);
    font-size: 0.85rem;
  }
</style>
