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
    class="hero-shell"
    style="transform: perspective(800px) rotateX({tiltDeg}deg) scale({scale}); opacity: {1 - fadeOut * 0.8};"
  >

    <!-- Big name -->
    <h1 class="masthead">HARPREET SINGH</h1>

    <!-- COMPUTATIONAL / ML and BIOLOGIST / ENGINEER rows -->
    <div class="roles">
      <div class="role-row">
        <span class="role">COMPUTATIONAL</span>
        <span class="role role-dim">ML</span>
      </div>
      <div class="role-row">
        <span class="role">BIOLOGIST</span>
        <span class="role role-dim">ENGINEER</span>
      </div>
    </div>

    <!-- Bottom: RESEARCHER + icons on left, photo on right -->
    <div class="hero-bottom">
      <div class="hero-bottom-left">
        <p class="researcher">RESEARCHER</p>
        <nav class="icon-grid" aria-label="Profile links">
          <a href="https://github.com/hrrysprk" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="icon-link">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/hrrysprk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="icon-link">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="mailto:harpreetsingh@example.com" aria-label="Email" class="icon-link">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume PDF" class="icon-link">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/>
            </svg>
          </a>
        </nav>
      </div>

      <img
        src="/images/headshot.jpg"
        alt="Harpreet Singh"
        class="hero-photo"
        width="300"
        height="300"
      />
    </div>

  </div>
</section>

<style>
  /* shared condensed text mixin values */
  :root {
    --hero-scaleX: 0.55;
    --hero-scaleY: 1.26;
  }

  .hero {
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    padding: clamp(2rem, 6vh, 4rem) 0 var(--space-xl) 0;
    background-color: transparent;
    overflow: hidden;
  }

  .hero-shell {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    transform-origin: center top;
    will-change: transform, opacity;
  }

  /* ── Big name ── */
  .masthead {
    margin: 0 0 clamp(0.5rem, 1.5vh, 1.2rem) 0;
    font-family: 'Inter', var(--font-body), sans-serif;
    font-size: clamp(5rem, 19vw, 19rem);
    font-weight: 900;
    line-height: 0.78;
    letter-spacing: -0.05em;
    word-spacing: -0.04em;
    color: var(--color-text-primary);
    text-transform: uppercase;
    white-space: nowrap;
    transform: scaleX(0.55) scaleY(1.26);
    transform-origin: left top;
    -webkit-text-stroke: 0.035em var(--color-text-primary);
    paint-order: stroke fill;
  }

  /* ── Role rows ── */
  .roles {
    display: flex;
    flex-direction: column;
    gap: clamp(0.7rem, 1.5vh, 1.2rem);
    margin-bottom: clamp(0.8rem, 2vh, 1.5rem);
  }

  .role-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .role {
    font-family: 'Inter', var(--font-body), sans-serif;
    font-weight: 900;
    font-size: clamp(3rem, 10.5vw, 8rem);
    line-height: 0.9;
    letter-spacing: -0.045em;
    text-transform: uppercase;
    color: var(--color-text-secondary);
    transform: scaleX(0.55) scaleY(1.24);
    transform-origin: left top;
    -webkit-text-stroke: 0.025em currentColor;
    paint-order: stroke fill;
  }

  .role-dim {
    opacity: 0.6;
    transform-origin: right top;
  }

  /* ── Bottom section ── */
  .hero-bottom {
    display: flex;
    align-items: flex-start;
    gap: clamp(1.5rem, 4vw, 4rem);
  }

  .hero-bottom-left {
    display: flex;
    flex-direction: column;
    gap: clamp(0.8rem, 1.5vh, 1.2rem);
    flex: 1;
  }

  .researcher {
    margin: 0;
    font-family: 'Inter', var(--font-body), sans-serif;
    font-weight: 900;
    font-size: clamp(3rem, 10.5vw, 8rem);
    line-height: 0.9;
    letter-spacing: -0.045em;
    text-transform: uppercase;
    color: var(--color-text-secondary);
    transform: scaleX(0.55) scaleY(1.24);
    transform-origin: left top;
    -webkit-text-stroke: 0.025em currentColor;
    paint-order: stroke fill;
  }

  /* ── 2x2 icon grid ── */
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(2, 52px);
    grid-template-rows: repeat(2, 52px);
    gap: 0.5rem;
    margin-top: clamp(0.4rem, 1vh, 0.8rem);
  }

  .icon-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid var(--color-border);
    color: var(--color-text-secondary);
    transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  }

  .icon-link:hover,
  .icon-link:focus-visible {
    color: var(--color-text-primary);
    background: rgba(0, 212, 255, 0.1);
    border-color: var(--color-accent);
  }

  /* ── Photo ── */
  .hero-photo {
    width: clamp(200px, 28vw, 320px);
    height: clamp(200px, 28vw, 320px);
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.12);
    flex-shrink: 0;
    align-self: stretch;
  }

  @media (max-width: 900px) {
    .masthead {
      font-size: clamp(4rem, 18vw, 12rem);
    }

    .role, .researcher {
      font-size: clamp(2.5rem, 10vw, 5.5rem);
    }
  }

  @media (max-width: 600px) {
    .hero {
      padding-inline: var(--space-sm);
    }

    .hero-bottom {
      flex-direction: column;
    }

    .hero-photo {
      width: 100%;
      max-width: 280px;
      height: auto;
      aspect-ratio: 1;
    }
  }
</style>
