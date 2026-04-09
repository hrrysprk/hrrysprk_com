<script lang="ts">
  import { projects } from '$lib/data/projects';
  import ProjectCard from './ProjectCard.svelte';

  const primaryProjects = projects.filter(p => p.primary);
  const otherProjects = projects.filter(p => !p.primary);
</script>

<section id="projects">
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
