<script lang="ts">
  import SkillBubbles from './SkillBubbles.svelte';
</script>

<section id="skills" class="skills">
  <h2>Skills</h2>
  <SkillBubbles />
</section>

<style>
  .skills {
    padding: var(--space-xl) var(--space-lg);
    max-width: 1200px;
    margin: 0 auto;
  }

  h2 {
    margin-bottom: var(--space-lg);
  }
</style>
