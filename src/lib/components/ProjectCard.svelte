<script lang="ts">
  import type { Project } from '$lib/types';

  type CardVariant = 'featured' | 'secondary';

  let {
    project,
    thumbnailSrc = project.thumbnail,
    variant = 'secondary'
  }: { project: Project; thumbnailSrc?: string; variant?: CardVariant } = $props();

  let imgFailed = $state(false);
  let attemptedStaticFallback = $state(false);
  let currentThumbnailSrc = $state(thumbnailSrc);

  $effect(() => {
    currentThumbnailSrc = thumbnailSrc;
    attemptedStaticFallback = false;
    imgFailed = false;
  });

  function handleImageError() {
    if (!attemptedStaticFallback && currentThumbnailSrc.startsWith('/api/project-image/')) {
      attemptedStaticFallback = true;
      currentThumbnailSrc = currentThumbnailSrc.replace('/api/project-image/', '/images/');
      return;
    }
    imgFailed = true;
  }

  const isSecondary = $derived(variant === 'secondary');
  const stackForBack = $derived(isSecondary ? project.stack.slice(0, 4) : project.stack);
  const highlightsForBack = $derived(!isSecondary ? (project.highlights ?? []).slice(0, 3) : []);
  const descForBack = $derived(
    isSecondary
      ? (() => {
          const copy = project.highlightShort ?? project.description;
          return copy.length > 95 ? `${copy.slice(0, 92)}...` : copy;
        })()
      : project.description
  );
  const showThesisBadge = $derived(
    project.id === 'behavioral-patterns' || project.id === 'cne-gene-expression'
  );
</script>

<article
  class="flip-card"
  class:featured={variant === 'featured'}
  class:secondary={variant === 'secondary'}
>
  <div class="flip-card-inner">
    <div class="face front">
      {#if imgFailed}
        <div class="placeholder-img" aria-hidden="true">
          <span>{project.title[0]}</span>
        </div>
      {:else}
        <img
          src={currentThumbnailSrc}
          alt="{project.title} architecture preview"
          loading="lazy"
          class="thumbnail"
          onerror={handleImageError}
        />
      {/if}

      {#if showThesisBadge}
        <span class="thesis-badge">Master's Thesis</span>
      {/if}

      <div class="title-overlay">
        <h3 class="title">{project.title}</h3>
      </div>
    </div>

    <div class="face back">
      <h3 class="title">{project.title}</h3>
      <p class="description">{descForBack}</p>

      {#if highlightsForBack.length > 0}
        <ul class="highlights">
          {#each highlightsForBack as point}
            <li>{point}</li>
          {/each}
        </ul>
      {/if}

      {#if stackForBack.length > 0}
        <div class="stack">
          {#each stackForBack as tech}
            <span class="tag">{tech}</span>
          {/each}
        </div>
      {/if}

      <div class="links">
        {#if project.liveUrl}
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="link">
            Live Demo
          </a>
        {/if}
        {#if project.repoUrl}
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" class="link">
            Repo
          </a>
        {/if}
      </div>
    </div>
  </div>
</article>

<style>
  .flip-card {
    background: transparent;
    border-radius: 10px;
    perspective: 1200px;
    height: 100%;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease-in-out;
    transform-style: preserve-3d;
    border-radius: 10px;
  }

  .flip-card:hover .flip-card-inner,
  .flip-card:focus-within .flip-card-inner {
    transform: rotateY(180deg);
  }

  .face {
    position: absolute;
    inset: 0;
    border-radius: 10px;
    overflow: hidden;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border: 1px solid rgba(255, 255, 255, 0.09);
  }

  .front {
    background: #131318;
  }

  .back {
    background: #191919;
    transform: rotateY(180deg);
    padding: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .thumbnail,
  .placeholder-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .thumbnail {
    object-fit: cover;
    display: block;
  }

  .placeholder-img {
    background: var(--color-bg-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  .title-overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1.25rem 0.9rem 0.8rem;
    background: linear-gradient(180deg, rgba(12, 12, 14, 0) 0%, rgba(12, 12, 14, 0.82) 80%);
  }

  .thesis-badge {
    position: absolute;
    top: 0.55rem;
    right: 0.55rem;
    padding: 0.2rem 0.45rem;
    border-radius: 999px;
    font-size: 0.58rem;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
    line-height: 1.25;
  }

  .description {
    font-size: 0.79rem;
    color: var(--color-text-secondary);
    margin: 0;
    line-height: 1.4;
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .highlights {
    margin: 0;
    padding-left: 1rem;
    color: rgba(255, 255, 255, 0.86);
    font-size: 0.73rem;
    line-height: 1.35;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .tag {
    font-size: 0.65rem;
    padding: 1px 6px;
    border-radius: 999px;
    background: var(--color-bg);
    color: var(--color-accent);
    border: 1px solid var(--color-border);
    font-family: var(--font-mono);
  }

  .links {
    display: flex;
    gap: var(--space-sm);
    margin-top: auto;
    padding-top: 0.3rem;
  }

  .link {
    font-size: 0.75rem;
    color: var(--color-accent);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .link:hover,
  .link:focus-visible {
    color: var(--color-accent-hover);
    text-decoration: underline;
  }

  .secondary .back {
    padding: 0.7rem;
    gap: 0.4rem;
  }

  .secondary .title {
    font-size: 0.82rem;
  }

  .secondary .description {
    font-size: 0.72rem;
    line-height: 1.35;
  }

  .secondary .tag {
    font-size: 0.6rem;
    padding: 1px 5px;
  }

  .secondary .link {
    font-size: 0.7rem;
  }
</style>
