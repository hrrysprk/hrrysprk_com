<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Publications from '$lib/components/Publications.svelte';
  import Timeline from '$lib/components/Timeline.svelte';
  import Contact from '$lib/components/Contact.svelte';
</script>

<Hero />

<div class="bento-grid">
  <!-- About -->
  <div class="bento-card card-olive col-3">
    <About />
  </div>

  <!-- Skills — no background box -->
  <div class="col-9" style="padding: clamp(1.25rem, 2.5vw, 2rem);">
    <Skills />
  </div>

  <!-- Projects — full width -->
  <div class="bento-card card-teal col-12">
    <Projects />
  </div>

  <!-- Publications — narrower left -->
  <div class="bento-card card-wine col-5">
    <Publications />
  </div>

  <!-- Timeline — wider right -->
  <div class="bento-card card-stone col-7">
    <Timeline />
  </div>

  <!-- Contact — full width, rose CTA -->
  <div class="bento-card card-rose col-12">
    <Contact />
  </div>
</div>
