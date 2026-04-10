<script lang="ts">
  import { onMount } from 'svelte';
  import { projects } from '$lib/data/projects';
  import { selectedProjectTag } from '$lib/stores/projectFilters';
  import ProjectCard from './ProjectCard.svelte';

  const allTags = ['all', ...Array.from(new Set(projects.flatMap((p) => p.tags))).sort()];
  let imageFiles = $state<string[]>([]);

  const filteredProjects = $derived.by(() => {
    if ($selectedProjectTag === 'all') return projects;
    return projects.filter((p) => p.tags.includes($selectedProjectTag));
  });

  const primaryProjects = $derived(filteredProjects.filter(p => p.primary));
  const otherProjects = $derived(filteredProjects.filter(p => !p.primary));

  function setTag(tag: string) {
    selectedProjectTag.set(tag);
    const url = new URL(window.location.href);
    if (tag === 'all') {
      url.searchParams.delete('projectTag');
    } else {
      url.searchParams.set('projectTag', tag);
    }
    window.history.replaceState({}, '', url);
  }

  function normalizedTokens(projectId: string, title: string): string[] {
    const idTokens = projectId.split(/[-_]/g);
    const titleTokens = title.toLowerCase().split(/[^a-z0-9]+/g);
    return [...new Set([...idTokens, ...titleTokens])]
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length >= 3);
  }

  function resolveThumbnail(projectId: string, title: string, fallback: string): string {
    if (!imageFiles.length) return fallback;
    const tokens = normalizedTokens(projectId, title);
    let bestMatch = '';
    let bestScore = -1;
    for (const file of imageFiles) {
      const name = file.toLowerCase();
      const score = tokens.reduce((sum, token) => sum + (name.includes(token) ? 1 : 0), 0);
      if (score > bestScore || (score === bestScore && score > 0 && file.length < bestMatch.length)) {
        bestScore = score;
        bestMatch = file;
      }
    }
    return bestScore > 0 ? `/images/${bestMatch}` : fallback;
  }

  onMount(() => {
    fetch('/api/image-index')
      .then((res) => res.json())
      .then((data) => {
        imageFiles = Array.isArray(data?.files) ? data.files : [];
      })
      .catch(() => {
        imageFiles = [];
      });

    const url = new URL(window.location.href);
    const fromUrl = url.searchParams.get('projectTag');
    if (fromUrl && allTags.includes(fromUrl)) {
      selectedProjectTag.set(fromUrl);
    }
  });
</script>

<section id="projects">
  <h2>Projects</h2>

  <div class="filters" role="toolbar" aria-label="Project filters">
    {#each allTags as tag}
      <button
        type="button"
        class="filter-btn"
        class:active={$selectedProjectTag === tag}
        onclick={() => setTag(tag)}
      >
        {tag}
      </button>
    {/each}
  </div>

  <div class="grid">
    {#each primaryProjects as project (project.id)}
      <div class="primary">
        <ProjectCard {project} thumbnailSrc={resolveThumbnail(project.id, project.title, project.thumbnail)} />
      </div>
    {/each}
    {#each otherProjects as project (project.id)}
      <div class="standard">
        <ProjectCard {project} thumbnailSrc={resolveThumbnail(project.id, project.title, project.thumbnail)} />
      </div>
    {/each}
  </div>
</section>

<style>
  section {
    height: 100%;
  }

  h2 {
    color: #ffffff;
    margin-bottom: var(--space-lg);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.85rem;
  }

  .filter-btn {
    border: 1px solid var(--color-border);
    background: rgba(255, 255, 255, 0.04);
    color: var(--color-text-secondary);
    border-radius: 999px;
    font-size: 0.72rem;
    font-family: var(--font-mono);
    text-transform: lowercase;
    padding: 0.22rem 0.55rem;
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
  }

  .filter-btn:hover {
    color: var(--color-text-primary);
    border-color: rgba(0, 212, 255, 0.45);
  }

  .filter-btn.active {
    color: var(--color-accent);
    background: rgba(0, 212, 255, 0.1);
    border-color: var(--color-accent);
  }

  .primary {
    grid-column: 1 / -1;
  }

  @media (min-width: 640px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(4, 1fr);
    }

    .primary {
      grid-column: span 2;
    }
  }
</style>
