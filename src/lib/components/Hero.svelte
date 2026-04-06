<script lang="ts">
  import { onMount } from 'svelte';

  let heroEl: HTMLElement;
  let tiltDeg = $state(0);
  let fadeOut = $state(0);
  let scale = $state(1);

  onMount(() => {
    function handleScroll() {
      const rect = heroEl.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      tiltDeg = progress * 45;
      fadeOut = progress;
      scale = 1 - progress * 0.15;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<section id="hero" class="hero" bind:this={heroEl}>
  <div
    class="hero-content"
    style="
      transform: perspective(800px) rotateX({tiltDeg}deg) scale({scale});
      opacity: {1 - fadeOut * 0.8};
    "
  >
    <img
      src="/images/headshot.jpg"
      alt="Harpreet Singh, computational biologist and data scientist"
      class="headshot"
      width="180"
      height="180"
    />
    <h1>Harpreet Singh</h1>
    <p class="tagline">Computational Biologist & ML Engineer | Researcher | 3 Peer-Reviewed Publications</p>
    <nav class="social-links" aria-label="Social links">
      <a href="https://github.com/hrrysprk" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="icon-link">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>
      <a href="https://linkedin.com/in/hrrysprk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="icon-link">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume PDF" class="icon-link">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/>
        </svg>
      </a>
    </nav>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--space-lg);
    background-color: transparent;
    overflow: hidden;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    transform-origin: center bottom;
    will-change: transform, opacity;
  }

  .headshot {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--color-accent);
  }

  h1 {
    font-family: var(--font-display);
    font-size: 3rem;
    font-weight: 900;
    color: var(--color-text-primary);
    line-height: 1.1;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .tagline {
    color: var(--color-accent);
    font-family: var(--font-mono);
    font-size: 1rem;
    letter-spacing: 0.1em;
    max-width: 500px;
  }

  .social-links {
    display: flex;
    gap: var(--space-lg);
    margin-top: var(--space-sm);
  }

  .icon-link {
    color: var(--color-text-secondary);
    transition: color 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    padding: var(--space-sm);
  }

  .icon-link:hover,
  .icon-link:focus-visible {
    color: var(--color-accent-hover);
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.75rem;
    }

    .tagline {
      font-size: 0.85rem;
    }

    .headshot {
      width: 140px;
      height: 140px;
    }
  }
</style>
