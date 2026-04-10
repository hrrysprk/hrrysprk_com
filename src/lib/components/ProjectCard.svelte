<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Project } from '$lib/types';
  import ProjectMiniViz from './ProjectMiniViz.svelte';

  let { project, thumbnailSrc = project.thumbnail }: { project: Project; thumbnailSrc?: string } = $props();

  let imgFailed = $state(false);
  let hovered = $state(false);
  let visible = $state(false);
  let tiltX = $state(0);
  let tiltY = $state(0);

  function observeVisibility(node: HTMLElement) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  function handleImageError() {
    imgFailed = true;
  }

  function handleMouseMove(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    tiltY = (px - 0.5) * 6;
    tiltX = (0.5 - py) * 5;
  }

  function resetTilt() {
    hovered = false;
    tiltX = 0;
    tiltY = 0;
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<article
  class="card"
  tabindex="0"
  use:observeVisibility
  onmouseenter={() => hovered = true}
  onmouseleave={resetTilt}
  onmousemove={handleMouseMove}
  onfocus={() => hovered = true}
  onblur={resetTilt}
  style="transform: perspective(950px) rotateX({tiltX}deg) rotateY({tiltY}deg) translateY({hovered ? '-3px' : '0'});"
>
  <div class="media">
    {#if imgFailed}
      <div class="placeholder-img" aria-hidden="true">
        <span>{project.title[0]}</span>
      </div>
    {:else}
      <img
        src={thumbnailSrc}
        alt="{project.title} project thumbnail"
        loading="lazy"
        class="thumbnail"
        onerror={handleImageError}
      />
    {/if}

    {#if hovered && visible}
      <div class="mini-viz" in:fade={{ duration: 150 }} out:fade={{ duration: 120 }}>
        <ProjectMiniViz config={project.miniViz} />
      </div>
    {/if}
  </div>

  <div class="content">
    <h3 class="title">{project.title}</h3>
    <p class="description">{project.description}</p>

    {#if project.tags.length > 0}
      <div class="meta-tags">
        {#each project.tags as tag}
          <button type="button" class="meta-tag">{tag}</button>
        {/each}
      </div>
    {/if}

    {#if project.stack.length > 0}
      <div class="stack">
        {#each project.stack as tech}
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
</article>

<style>
  .card {
    background: var(--color-bg-elevated);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid transparent;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
    outline: none;
    display: flex;
    flex-direction: column;
  }

  .card:hover,
  .card:focus-visible {
    border-color: var(--color-accent);
    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.12);
  }

  .media {
    position: relative;
  }

  .thumbnail {
    width: 100%;
    height: 120px;
    object-fit: cover;
    display: block;
  }

  .placeholder-img {
    width: 100%;
    height: 120px;
    background: var(--color-bg-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  .mini-viz {
    position: absolute;
    inset: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    backdrop-filter: blur(1px);
  }

  .content {
    padding: 0.65rem 0.75rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    flex: 1;
  }

  .title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
    line-height: 1.3;
  }

  .description {
    font-size: 0.78rem;
    color: var(--color-text-secondary);
    margin: 0;
    line-height: 1.45;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    margin-top: 2px;
  }

  .meta-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .meta-tag {
    font-size: 0.62rem;
    padding: 1px 6px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.86);
    text-transform: lowercase;
    pointer-events: none;
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
    padding-top: 0.35rem;
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
</style>
