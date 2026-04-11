<script lang="ts">
  import SkillBubbles from './SkillBubbles.svelte';
</script>

<section id="skills">
  <h2>Skills</h2>
  <SkillBubbles />
</section>

<style>
  section {
    height: 100%;
    overflow: visible;
  }

  h2 {
    color: #ffffff;
    margin-bottom: var(--space-md);
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

    h2 {
      font-size: clamp(2.15rem, 10.5vw, 3.25rem);
      margin-bottom: var(--space-xs);
      padding-inline: clamp(0.35rem, 1.5vw, 0.75rem);
    }
  }
</style>
