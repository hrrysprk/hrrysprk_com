<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { projects } from '$lib/data/projects';
  import { selectedProjectTag } from '$lib/stores/projectFilters';
  import ProjectCard from './ProjectCard.svelte';

  const allTags = ['all', ...Array.from(new Set(projects.flatMap((p) => p.tags))).sort()];
  const featuredProjectIds = ['genbrowser', 'chromapipe', 'spacegen', 'policylens', 'cne-gene-expression'];
  const secondaryProjectIds = [
    'neural-network-gene-length',
    'gene-expression-prediction',
    'web-dashboard-3d-genome',
    'sleep-disorder-analysis',
    'behavioral-patterns'
  ];
  const thumbnailByProjectId: Record<string, string> = {
    genbrowser: 'genBrowser.png',
    chromapipe: 'chromApipe.png',
    spacegen: 'spaceGen.png',
    policylens: 'policyLens.png',
    'neural-network-gene-length': 'pytorch_gene_length.png',
    'gene-expression-prediction': 'bio_vs_phy.png',
    'web-dashboard-3d-genome': '3D_genome_organization.png',
    'sleep-disorder-analysis': 'sleep_disorder.png',
    'behavioral-patterns': 'personality_vs_academics_networks.png',
    'cne-gene-expression': 'CNE.png'
  };

  const filteredProjects = $derived.by(() => {
    if ($selectedProjectTag === 'all') return projects;
    return projects.filter((p) => p.tags.includes($selectedProjectTag));
  });

  const featuredProjects = $derived(
    featuredProjectIds
      .map((id) => filteredProjects.find((p) => p.id === id))
      .filter((p): p is (typeof projects)[number] => Boolean(p))
  );

  const secondaryProjects = $derived(
    secondaryProjectIds
      .map((id) => filteredProjects.find((p) => p.id === id))
      .filter((p): p is (typeof projects)[number] => Boolean(p))
  );

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

  function resolveThumbnail(projectId: string): string {
    const filename = thumbnailByProjectId[projectId];
    if (filename) return `${base}/images/${filename}`;
    return `${base}/images/${projectId}.png`;
  }

  onMount(() => {
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

  <div class="tier-title">Featured</div>
  <div class="grid featured-grid">
    {#each featuredProjects as project (project.id)}
      <div class="card-shell featured-shell">
        <ProjectCard
          {project}
          thumbnailSrc={resolveThumbnail(project.id)}
          variant="featured"
        />
      </div>
    {/each}
  </div>

  <div class="tier-title secondary-title">Secondary</div>
  <div class="grid secondary-grid">
    {#each secondaryProjects as project (project.id)}
      <div class="card-shell secondary-shell">
        <ProjectCard
          {project}
          thumbnailSrc={resolveThumbnail(project.id)}
          variant="secondary"
        />
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
    gap: 0.75rem;
  }

  .featured-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .secondary-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
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

  .tier-title {
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.75rem;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0.25rem 0 0.45rem;
  }

  .secondary-title {
    margin-top: 0.9rem;
  }

  .card-shell {
    width: 100%;
  }

  .featured-shell {
    height: clamp(280px, 26vw, 330px);
  }

  .secondary-shell {
    height: clamp(220px, 24vw, 260px);
  }

  @media (min-width: 640px) {
    .featured-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .secondary-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1024px) {
    .featured-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .secondary-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (max-width: 900px) {
    .featured-grid {
      grid-template-columns: 1fr;
    }

    .featured-shell {
      height: clamp(260px, 55vw, 320px);
    }
  }
</style>
