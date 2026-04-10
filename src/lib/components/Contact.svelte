<section id="contact">
  <h2>Contact</h2>
  <div class="inner">
    <div class="info-col">
      <div class="card-row">
        <div class="icon-circle">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
          </svg>
        </div>
        <div class="info">
          <span class="label">Location</span>
          <span class="value">Vancouver, BC, Canada</span>
        </div>
      </div>
      <div class="card-row">
        <div class="icon-circle">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
        <div class="info">
          <span class="label">Email</span>
          <a href="mailto:hrrysprk@gmail.com" class="value link">hrrysprk@gmail.com</a>
        </div>
      </div>
      <div class="card-row">
        <div class="icon-circle">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </div>
        <div class="info">
          <span class="label">GitHub</span>
          <a href="https://github.com/hrrysprk" target="_blank" rel="noopener noreferrer" class="value link">github.com/hrrysprk</a>
        </div>
      </div>
      <div class="card-row">
        <div class="icon-circle">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
        <div class="info">
          <span class="label">LinkedIn</span>
          <a href="https://linkedin.com/in/hrrysprk" target="_blank" rel="noopener noreferrer" class="value link">linkedin.com/in/hrrysprk</a>
        </div>
      </div>
    </div>
    <div class="map-col">
      <iframe
        title="Location map — Vancouver, BC"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83327.34088292407!2d-123.19394!3d49.257784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673f143a94fb3%3A0xbb9196ea9b81f38b!2sVancouver%2C%20BC!5e0!3m2!1sen!2sca!4v1700000000000"
        width="100%"
        height="100%"
        style="border:0; width:100%; height:100%; display:block;"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</section>

<style>
  section {
    height: auto;
  }

  h2 {
    color: #ffffff;
    margin-bottom: var(--space-lg);
  }

  .inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg);
    align-items: start;
  }

  .info-col {
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
    justify-content: flex-start;
  }

  .map-col {
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 1.25 / 1;
    width: 104%;
    justify-self: end;
    align-self: start;
    margin-top: -3rem;
    transform: translateX(-2rem);
  }

  .card-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 58px;
  }

  .icon-circle {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #ffffff;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .label {
    color: rgba(255, 255, 255, 0.95);
    font-size: 1.05rem;
    font-weight: 600;
  }

  .value {
    color: rgba(255, 255, 255, 0.75);
    font-size: 1rem;
  }

  .link {
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .link:hover,
  .link:focus-visible {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    .inner {
      grid-template-columns: 1fr;
    }

    .map-col {
      width: 100%;
      margin-top: 0;
      aspect-ratio: 1 / 1;
      transform: none;
    }
  }
</style>
