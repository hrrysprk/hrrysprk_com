<script lang="ts">
  import { publications } from '$lib/data/publications';
</script>

<section id="publications" class="publications">
  <h2>Publications</h2>

  <ol class="pub-list">
    {#each publications as pub}
      <li class="pub-item">
        <p class="pub-title">{pub.title}</p>
        <p class="pub-authors">{@html pub.authors}</p>
        <p class="pub-meta">
          <em>{pub.journal}</em>, {pub.year}.
          <a href={pub.url} target="_blank" rel="noopener noreferrer" class="doi-link">
            View Publication
          </a>
        </p>
      </li>
    {/each}
  </ol>
</section>

<style>
  .publications {
    padding: var(--space-xl) var(--space-lg);
    max-width: 900px;
    margin: 0 auto;
  }

  h2 {
    color: var(--color-text-primary);
    font-size: 2rem;
    margin-bottom: var(--space-lg);
  }

  .pub-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    counter-reset: pub-counter;
  }

  .pub-item {
    counter-increment: pub-counter;
    padding-left: var(--space-lg);
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .pub-item::before {
    content: counter(pub-counter) ".";
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-weight: 700;
  }

  .pub-title {
    font-weight: 700;
    color: var(--color-text-primary);
    line-height: 1.4;
    margin: 0;
  }

  .pub-authors {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }

  .pub-authors :global(.me) {
    color: #b0b0c4;
    font-weight: 700;
  }

  .pub-meta {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    margin: 0;
  }

  .doi-link {
    color: var(--color-accent);
    text-decoration: none;
    margin-left: var(--space-sm);
    transition: color 0.2s ease;
  }

  .doi-link:hover,
  .doi-link:focus-visible {
    color: var(--color-accent-hover);
    text-decoration: underline;
  }

  @media (max-width: 767px) {
    .doi-link {
      min-height: 44px;
      display: inline-flex;
      align-items: center;
    }

    .pub-title {
      word-break: break-word;
    }

    .pub-authors {
      word-break: break-word;
    }
  }
</style>
