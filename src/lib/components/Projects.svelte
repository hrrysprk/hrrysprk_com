<script lang="ts">
  import { projects } from '$lib/data/projects';
  import ProjectCard from './ProjectCard.svelte';

  const primaryProjects = projects.filter(p => p.primary);
  const otherProjects = projects.filter(p => !p.primary);
</script>

<section id="projects" class="projects">
  <h2>Projects</h2>

  <div class="grid">
    {#each primaryProjects as project (project.id)}
      <div class="primary">
        <ProjectCard {project} />
      </div>
    {/each}
    {#each otherProjects as project (project.id)}
      <div class="standard">
        <ProjectCard {project} />
      </div>
    {/each}
  </div>
</section>

<style>
  .projects {
    padding: var(--space-xl) var(--space-lg);
    max-width: 1200px;
    margin: 0 auto;
  }

  h2 {
    color: var(--color-text-primary);
    font-size: 2rem;
    margin-bottom: var(--space-lg);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .primary {
    grid-column: 1 / -1;
  }

  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .primary {
      grid-column: 1 / -1;
    }

    .primary :global(.card) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .primary :global(.thumbnail),
    .primary :global(.placeholder-img) {
      height: 100%;
      min-height: 220px;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .primary {
      grid-column: 1 / -1;
    }
  }
</style>
