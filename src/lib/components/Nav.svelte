<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

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

  function scrollToSection(e: MouseEvent, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onMount(() => {
    function updateActiveSection() {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20) {
        activeSection = sections[sections.length - 1].id;
        return;
      }

      const scrollTop = window.scrollY + 120;
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

  <div class="mobile-profile-links" aria-label="Profile links">
    <a
      href="https://linkedin.com/in/hrrysprk"
      target="_blank"
      rel="noopener noreferrer"
      class="header-icon-link"
      aria-label="LinkedIn"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        />
      </svg>
    </a>
    <a href="mailto:hrrysprk@gmail.com" class="header-icon-link" aria-label="Email">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path
          d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
        />
      </svg>
    </a>
    <a
      href="{base}/resume.pdf?v=20260410b"
      target="_blank"
      rel="noopener noreferrer"
      class="header-icon-link"
      aria-label="Resume PDF"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path
          d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"
        />
      </svg>
    </a>
    <a
      href="https://github.com/hrrysprk"
      target="_blank"
      rel="noopener noreferrer"
      class="header-icon-link"
      aria-label="GitHub"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path
          d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
        />
      </svg>
    </a>
  </div>
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

  .mobile-profile-links {
    display: none;
  }

  .header-icon-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(150, 154, 160, 0.28);
    border: 1px solid var(--color-border);
    color: #d3d8e0;
    transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  }

  .header-icon-link:hover,
  .header-icon-link:focus-visible {
    color: #ffffff;
    background: rgba(195, 200, 210, 0.38);
    border-color: var(--color-accent);
    outline: none;
  }

  @media (max-width: 767px) {
    .nav {
      justify-content: flex-end;
      width: 100%;
      box-sizing: border-box;
      padding: var(--space-sm) max(var(--space-sm), env(safe-area-inset-right)) var(--space-sm)
        max(var(--space-sm), env(safe-area-inset-left));
      min-height: 48px;
    }

    .desktop-nav {
      display: none;
    }

    .mobile-profile-links {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      gap: 0.35rem;
      flex-wrap: nowrap;
    }
  }
</style>
