<script lang="ts">
  import { onMount } from 'svelte';

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'publications', label: 'Publications' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'contact', label: 'Contact' }
  ];
  const desktopPrimary = sections.slice(0, 4);
  const desktopSecondary = [
    { id: 'timeline', label: 'Education & Research' },
    { id: 'contact', label: 'Contact' }
  ];

  let activeSection = $state('');
  let menuOpen = $state(false);

  function scrollToSection(e: MouseEvent, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    menuOpen = false;
  }

  function scrollToTop(e: MouseEvent) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    menuOpen = false;
  }

  onMount(() => {
    function updateActiveSection() {
      // If scrolled to bottom, highlight last section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20) {
        activeSection = sections[sections.length - 1].id;
        return;
      }

      const scrollTop = window.scrollY + 120; // offset for sticky nav height
      let current = sections[0].id;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollTop) {
          current = section.id;
        }
      }

      activeSection = current;
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();

    return () => window.removeEventListener('scroll', updateActiveSection);
  });
</script>

<nav class="nav" aria-label="Main navigation">
  <!-- Desktop nav links -->
  <div class="desktop-nav">
    <ul class="nav-links">
      {#each desktopPrimary as section}
        <li>
          <a
            href="#{section.id}"
            class="nav-link"
            class:active={activeSection === section.id}
            onclick={(e) => scrollToSection(e, section.id)}
          >
            {section.label}
          </a>
        </li>
      {/each}
    </ul>
    <ul class="nav-links nav-links-secondary">
      {#each desktopSecondary as section}
        <li>
          <a
            href="#{section.id}"
            class="nav-link"
            class:active={activeSection === section.id}
            onclick={(e) => scrollToSection(e, section.id)}
          >
            {section.label}
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Mobile hamburger menu -->
  <details class="mobile-menu" bind:open={menuOpen}>
    <summary class="hamburger" aria-label="Toggle navigation menu">
      <span class="hamburger-icon" class:open={menuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </summary>
    <ul class="mobile-nav-links">
      {#each sections as section}
        <li>
          <a
            href="#{section.id}"
            class="mobile-nav-link"
            class:active={activeSection === section.id}
            onclick={(e) => scrollToSection(e, section.id)}
          >
            {section.label}
          </a>
        </li>
      {/each}
    </ul>
  </details>
</nav>

<style>
  .nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: var(--space-sm) var(--space-lg);
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 0.8rem;
    justify-content: flex-end;
  }

  .desktop-nav {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.1rem;
  }

  .nav-links-secondary {
    gap: 0.9rem;
  }

  .nav-link {
    color: #aeaeae;
    text-decoration: none;
    font-size: 0.98rem;
    padding: 0.05rem var(--space-xs);
    border-radius: 4px;
    transition: color 0.2s ease;
    min-height: 20px;
    display: inline-flex;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    font-weight: 700;
  }

  .nav-link:hover {
    color: var(--color-text-primary);
  }

  .nav-link.active {
    color: var(--color-accent);
  }

  /* Mobile menu */
  .mobile-menu {
    display: none;
  }

  .hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    cursor: pointer;
    list-style: none;
    background: none;
    border: none;
  }

  .hamburger::-webkit-details-marker {
    display: none;
  }

  .hamburger-icon {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 24px;
  }

  .hamburger-icon span {
    display: block;
    height: 2px;
    background: var(--color-text-primary);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .hamburger-icon.open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger-icon.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger-icon.open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  .mobile-nav-links {
    list-style: none;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    background: rgba(10, 10, 15, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: var(--space-sm) 0;
    display: flex;
    flex-direction: column;
  }

  .mobile-nav-link {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: var(--space-sm) var(--space-lg);
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.2s ease, background-color 0.2s ease;
  }

  .mobile-nav-link:hover {
    color: var(--color-text-primary);
    background: rgba(255, 255, 255, 0.05);
  }

  .mobile-nav-link.active {
    color: var(--color-accent);
  }

  @media (max-width: 767px) {
    .desktop-nav {
      display: none;
    }

    .mobile-menu {
      display: block;
      position: relative;
    }
  }
</style>
