<script lang="ts">
  import { publications } from '$lib/data/publications';

  const awards = [
    {
      title: "DST-INSPIRE Fellowship, Bachelor's (2012-2015)",
      details:
        'Awarded by the Department of Science and Technology, Government of India, to the top 1% of national science students'
    },
    {
      title: "DST-INSPIRE Fellowship, Master's (2015-2017)",
      details:
        "Continued fellowship recognition through Master's studies, granted to exceptional science students ranked in the top 1% nationally"
    },
    {
      title: 'Government of India Research Grant (2019)',
      details:
        'Competitive research grant awarded for independent study on 3D genome organization and its regulatory impact on gene expression'
    }
  ];
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

  <h2 class="subheading">AWARDS</h2>
  <ol class="awards-list">
    {#each awards as award}
      <li class="award-item">
        <p class="pub-title">{award.title}</p>
        <p class="pub-authors">{award.details}</p>
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

  .subheading {
    color: #ffffff;
    margin-top: var(--space-xl);
    margin-bottom: var(--space-md);
  }

  .awards-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    counter-reset: award-counter;
  }

  .award-item {
    counter-increment: award-counter;
    padding-left: var(--space-lg);
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .award-item::before {
    content: counter(award-counter) ".";
    position: absolute;
    left: 0;
    color: rgba(221, 200, 208, 0.6);
    font-weight: 700;
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
