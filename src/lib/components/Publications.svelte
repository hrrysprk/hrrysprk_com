<script lang="ts">
  import { publications } from '$lib/data/publications';
</script>

<section id="publications">
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
  section {
    height: 100%;
  }

  h2 {
    color: #ffffff;
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
    color: rgba(221, 200, 208, 0.6);
    font-weight: 700;
  }

  .pub-title {
    font-weight: 700;
    color: rgba(255, 245, 248, 0.9);
    line-height: 1.4;
    margin: 0;
  }

  .pub-authors {
    color: rgba(221, 200, 208, 0.65);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }

  .pub-authors :global(.me) {
    color: #e0c0cc;
    font-weight: 700;
  }

  .pub-meta {
    color: rgba(221, 200, 208, 0.65);
    font-size: 0.9rem;
    margin: 0;
  }

  .doi-link {
    color: #e8a0b0;
    text-decoration: none;
    margin-left: var(--space-sm);
    transition: color 0.2s ease;
  }

  .doi-link:hover,
  .doi-link:focus-visible {
    color: #ffbfcc;
    text-decoration: underline;
  }
</style>
