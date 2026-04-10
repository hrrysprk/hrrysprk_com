<script lang="ts">
</script>

<section id="hero" class="hero">
  <div class="hero-shell">
    <!-- Top-left role headline -->
    <div class="roles">
      <div class="role-row role-row-1">
        <span class="role role-main">COMPUTATIONAL</span>
        <span class="role role-side role-accent">ML</span>
      </div>
      <div class="role-row role-row-2">
        <span class="role role-main">BIOLOGIST</span>
        <span class="role role-side role-accent">ENGINEER</span>
      </div>
      <div class="role-row role-row-single">
        <span class="role role-researcher">RESEARCHER</span>
      </div>
    </div>

    <!-- Bottom split name -->
    <div class="name-block" aria-label="Harpreet Singh">
      <p class="name-line surname">SINGH</p>
      <p class="name-line given">HARPREET</p>
    </div>
  </div>

  <!-- Floating contact actions -->
  <nav class="floating-links" aria-label="Profile links">
    <a href="https://github.com/hrrysprk" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="icon-link">
      <span class="icon-label">GitHub</span>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    </a>
    <a href="mailto:hrrysprk@gmail.com" aria-label="Email" class="icon-link">
      <span class="icon-label">Email</span>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    </a>
    <a href="https://linkedin.com/in/hrrysprk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="icon-link">
      <span class="icon-label">LinkedIn</span>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>
    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume PDF" class="icon-link">
      <span class="icon-label">Resume</span>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/>
      </svg>
    </a>
  </nav>
</section>

<style>
  /* shared condensed text mixin values */
  :root {
    --hero-scaleX: 0.55;
    --hero-scaleY: 1.26;
  }

  .hero {
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    padding: 0 0 var(--space-xl) 0;
    background-color: transparent;
    overflow: visible;
  }

  .hero-shell {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    min-height: calc(100vh - 4rem);
    position: relative;
    top: -3rem;
  }

  /* ── Top-left role rows ── */
  .roles {
    display: flex;
    flex-direction: column;
    gap: clamp(0.18rem, 0.55vh, 0.5rem);
    margin-top: 0;
    margin-left: 0;
    align-self: flex-start;
    width: min(64%, 700px);
    padding-left: clamp(0.05rem, 0.35vw, 0.3rem);
    transform: translateY(-0.8rem);
  }

  .role-row {
    display: grid;
    grid-template-columns: auto clamp(5.8rem, 11vw, 8.8rem);
    justify-content: start;
    width: 100%;
    align-items: baseline;
    column-gap: clamp(0.15rem, 0.65vw, 0.45rem);
  }

  .role-row-single {
    display: grid;
    grid-template-columns: auto;
    justify-content: start;
    margin-top: clamp(0.1rem, 0.45vh, 0.35rem);
  }

  .role {
    font-family: 'Inter', var(--font-body), sans-serif;
    font-weight: 900;
    font-size: clamp(2.8rem, 9.6vw, 7.1rem);
    line-height: 0.9;
    letter-spacing: -0.045em;
    text-transform: uppercase;
    color: #aeaeae;
    transform: scaleX(0.62) scaleY(1.24);
    transform-origin: left top;
    -webkit-text-stroke: 0.025em currentColor;
    paint-order: stroke fill;
  }

  .role-accent { color: #bf530f; }

  .role-main {
    justify-self: start;
  }

  .role-side {
    width: 100%;
    justify-self: start;
    text-align: right;
  }

  .role-row-1 .role-side {
    margin-left: -4.5ch;
  }

  .role-row-2 .role-side {
    margin-left: -2.4ch;
  }

  .role-researcher {
    font-family: 'Inter', var(--font-body), sans-serif;
    font-weight: 900;
    font-size: clamp(3.2rem, 10.8vw, 8.1rem);
    line-height: 0.9;
    letter-spacing: -0.045em;
    text-transform: uppercase;
    transform: scaleX(0.62) scaleY(1.24);
    transform-origin: left top;
    -webkit-text-stroke: 0.025em currentColor;
    paint-order: stroke fill;
    color: #747474;
  }

  /* ── Bottom split name ── */
  .name-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: auto;
    align-self: flex-end;
    width: 100%;
    padding: 0 clamp(0.7rem, 1.6vw, 1.6rem) clamp(2.8rem, 7.8vh, 5.6rem) clamp(0.4rem, 1vw, 1rem);
    transform: translateY(1.05rem);
  }

  .name-line {
    margin: 0;
    display: block;
    width: max-content;
    margin-left: auto;
    font-family: 'Inter', var(--font-body), sans-serif;
    font-weight: 900;
    color: #aeaeae;
    text-transform: uppercase;
    white-space: nowrap;
    transform: scaleX(0.62) scaleY(1.26);
    transform-origin: right top;
    -webkit-text-stroke: 0.035em #aeaeae;
    paint-order: stroke fill;
    text-align: right;
  }

  .surname {
    font-size: clamp(5.4rem, 18.3vw, 15.9rem);
    line-height: 0.75;
    letter-spacing: -0.05em;
    position: relative;
    top: 0.2rem;
    text-align: right;
    transform-origin: right top;
    align-self: flex-end;
  }

  .given {
    font-size: clamp(5.2rem, 19vw, 17.2rem);
    line-height: 0.78;
    letter-spacing: -0.045em;
    margin-top: 0;
    position: relative;
    top: 1.45rem;
    align-self: flex-end;
    text-align: right;
    transform: scaleX(0.62) scaleY(1.26);
  }

  .floating-links {
    position: fixed;
    right: 0;
    top: calc(25vh - 88px);
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    z-index: 40;
  }

  .icon-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 7px 0 0 7px;
    background: rgba(150, 154, 160, 0.34);
    border: 1px solid var(--color-border);
    border-right: none;
    color: #d3d8e0;
    transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
    position: relative;
    overflow: visible;
  }

  .icon-link:hover,
  .icon-link:focus-visible {
    color: #ffffff;
    background: rgba(195, 200, 210, 0.44);
    border-color: var(--color-accent);
  }

  .icon-label {
    position: absolute;
    right: calc(100% + 0.45rem);
    top: 50%;
    transform: translateY(-50%) translateX(8px);
    opacity: 0;
    pointer-events: none;
    font-family: var(--font-mono);
    font-size: 0.74rem;
    letter-spacing: 0.03em;
    color: #ffffff;
    background: rgba(15, 18, 24, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 6px;
    padding: 0.26rem 0.5rem;
    white-space: nowrap;
    transition: opacity 0.18s ease, transform 0.18s ease;
  }

  .icon-link:hover .icon-label,
  .icon-link:focus-visible .icon-label {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }

  @media (max-width: 900px) {
    .roles {
      width: min(88%, 560px);
    }

    .role {
      font-size: clamp(2.2rem, 8.8vw, 5.3rem);
    }

    .surname {
      font-size: clamp(4rem, 15vw, 10rem);
    }

    .given {
      font-size: clamp(4.3rem, 18vw, 12rem);
    }

    .name-block {
      width: 100%;
      padding-right: clamp(0.6rem, 1.5vw, 1.3rem);
    }
  }

  @media (max-width: 600px) {
    .hero {
      padding-inline: var(--space-sm);
    }

    .hero-shell {
      min-height: calc(100vh - 3rem);
    }

    .roles {
      width: 100%;
      gap: 0.3rem;
    }

    .role-row {
      display: flex;
      gap: 0.35rem;
      flex-wrap: wrap;
    }

    .floating-links {
      right: 0;
      top: 38vh;
    }

    .icon-link {
      width: 36px;
      height: 36px;
    }

    .icon-label {
      display: none;
    }
  }
</style>
