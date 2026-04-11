<script lang="ts">
  import SkillBubbles from './SkillBubbles.svelte';
</script>

<section id="skills">
  <div class="skills-head">
    <h2>Skills</h2>
    <div class="skills-head__legend" aria-hidden="true">
      <svg class="skills-head__circles" viewBox="-2 -18 154 42" width="154" height="42">
        <circle cx="21" cy="3" r="19" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-dasharray="5 4" />
        <circle cx="61" cy="7" r="15" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-dasharray="5 4" />
        <circle cx="94" cy="10" r="12" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-dasharray="5 4" />
        <circle cx="121" cy="13" r="9" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-dasharray="5 4" />
        <circle cx="143" cy="15" r="7" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-dasharray="5 4" />
      </svg>
      <p class="skills-head__legend-label">Years of experience</p>
    </div>
  </div>
  <SkillBubbles />
</section>

<style>
  section {
    height: 100%;
    overflow: visible;
  }

  .skills-head {
    margin-bottom: var(--space-md);
  }

  .skills-head h2 {
    color: #ffffff;
    margin: 0;
  }

  .skills-head__legend {
    display: none;
  }

  @media (max-width: 640px) {
    /* Bleed into the column padding so the chart uses full phone width */
    section {
      margin-left: calc(-1 * clamp(1.25rem, 2.5vw, 2rem));
      margin-right: calc(-1 * clamp(1.25rem, 2.5vw, 2rem));
      width: calc(100% + 2 * clamp(1.25rem, 2.5vw, 2rem));
      max-width: none;
      box-sizing: border-box;
    }

    .skills-head {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      gap: 0.5rem 0.75rem;
      flex-wrap: wrap;
      margin-bottom: var(--space-xs);
      padding-inline: clamp(0.35rem, 1.5vw, 0.75rem);
    }

    .skills-head h2 {
      font-size: clamp(2.15rem, 10.5vw, 3.25rem);
      margin-bottom: 0;
      flex: 0 1 auto;
      line-height: 1;
    }

    .skills-head__legend {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.2rem;
      flex: 0 0 auto;
      max-width: min(11rem, 42vw);
      pointer-events: none;
    }

    .skills-head__circles {
      width: 100%;
      height: auto;
      display: block;
      opacity: 0.92;
    }

    .skills-head__legend-label {
      margin: 0;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.58rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(232, 232, 240, 0.72);
      text-align: right;
      line-height: 1.15;
    }
  }
</style>
