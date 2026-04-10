<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Publications from '$lib/components/Publications.svelte';
  import Timeline from '$lib/components/Timeline.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Credits from '$lib/components/Credits.svelte';
</script>

<Hero />

<div class="bento-grid">
  <!-- About -->
  <div class="bento-card card-olive col-4">
    <About />
  </div>

  <!-- Skills — no background box -->
  <div class="col-8" style="padding: clamp(1.25rem, 2.5vw, 2rem);">
    <Skills />
  </div>

  <!-- Projects — full width -->
  <div class="bento-card card-teal col-12">
    <Projects />
  </div>

  <!-- Timeline — wider left -->
  <div class="col-7" style="padding: clamp(1.25rem, 2.5vw, 2rem);">
    <Timeline />
  </div>

  <!-- Publications — narrower right -->
  <div class="bento-card card-wine col-5">
    <Publications />
  </div>

  <!-- Contact — same width as timeline section -->
  <div class="bento-card card-rose col-7 contact-lift">
    <Contact />
  </div>

  <!-- Credits — bottom right -->
  <div class="col-5" style="padding: clamp(1.25rem, 2.5vw, 2rem);">
    <Credits />
  </div>
</div>

<style>
  .contact-lift {
    margin-top: 0;
    align-self: start;
  }

  @media (max-width: 1024px) {
    .contact-lift {
      margin-top: 0;
    }
  }
</style>
