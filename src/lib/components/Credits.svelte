<section id="credits">
  <h2>Credits</h2>

  <p class="credits-copy">
    This site was designed and built from scratch without any templates. Planning, content refinement, and
    architectural decisions were worked through with <strong>Claude Opus 4.6</strong>. The project structure,
    codebase organization, and initial implementation were developed in <strong>Kiro IDE</strong>. Rapid iteration
    and visual refinement were done in <strong>Cursor IDE</strong>.
  </p>

  <h3>Built With</h3>
  <p class="stack">
    SvelteKit · D3.js · LayerCake · Three.js · Canvas API · Claude Opus 4.6 · Kiro IDE · Cursor IDE
  </p>
</section>

<style>
  section {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  h2 {
    color: #ffffff;
    margin-bottom: var(--space-sm);
  }

  .credits-copy {
    color: rgba(232, 232, 240, 0.86);
    line-height: 1.62;
    font-size: 0.95rem;
  }

  h3 {
    font-family: var(--font-display);
    color: #ffffff;
    font-size: 0.95rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-top: var(--space-sm);
  }

  .stack {
    color: rgba(232, 232, 240, 0.95);
    font-size: 0.92rem;
    line-height: 1.6;
  }
</style>
