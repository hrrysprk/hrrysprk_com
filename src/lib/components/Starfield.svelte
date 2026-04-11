<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;

  interface Star {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    twinkleSpeed: number;
    twinkleOffset: number;
  }

  interface DnaHelix {
    x: number;
    y: number;
    length: number;
    angle: number;
    rotateSpeed: number;
    speed: number;
    driftX: number;
    opacity: number;
    phase: number;
    scale: number;
    bend: number;
  }

  onMount(() => {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let stars: Star[] = [];
    let helices: DnaHelix[] = [];
    let animationId = 0;
    let time = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let lastResizeW = 0;
    let lastResizeH = 0;

    /** Phones / narrow viewports: one static paint, no rAF (eliminates jank with browser chrome). */
    let mobileStatic = false;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function isNarrowViewport(): boolean {
      return window.innerWidth <= 768;
    }

    function applyCanvasSize(w: number, h: number) {
      canvas.width = w;
      canvas.height = h;
      lastResizeW = w;
      lastResizeH = h;
    }

    function resizeCommitted() {
      mobileStatic = isNarrowViewport();
      const w = window.innerWidth;
      const h = window.innerHeight;
      applyCanvasSize(w, h);
      initStars();
      if (mobileStatic || reduceMotion) {
        helices = [];
      } else {
        initHelices();
      }
      paint();

      const shouldAnimate = !mobileStatic && !reduceMotion;
      if (!shouldAnimate) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      } else if (animationId === 0) {
        animationId = requestAnimationFrame(loop);
      }
    }

    function scheduleResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (
        isNarrowViewport() &&
        w === lastResizeW &&
        lastResizeH > 0 &&
        Math.abs(h - lastResizeH) < 72
      ) {
        applyCanvasSize(w, h);
        paint();
        return;
      }
      if (resizeTimer) clearTimeout(resizeTimer);
      const delay = isNarrowViewport() ? 280 : 80;
      resizeTimer = setTimeout(() => {
        resizeTimer = null;
        resizeCommitted();
      }, delay);
    }

    function initStars() {
      const area = canvas.width * canvas.height;
      const narrow = canvas.width <= 768;
      const divisor = narrow ? 11000 : 6000;
      const cap = narrow ? 48 : 220;
      const count = Math.min(cap, Math.floor(area / divisor));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.7 + 0.15,
        twinkleSpeed: Math.random() * 0.03 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2
      }));
    }

    function initHelices() {
      const area = canvas.width * canvas.height;
      const count = Math.max(6, Math.floor(area / 120000));
      helices = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 30 + 25,
        angle: Math.random() * Math.PI * 2,
        rotateSpeed: (Math.random() - 0.5) * 0.008,
        speed: (Math.random() - 0.5) * 0.3,
        driftX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.3 + 0.15,
        phase: Math.random() * Math.PI * 2,
        scale: Math.random() * 0.6 + 0.4,
        bend: (Math.random() - 0.5) * 0.4
      }));
    }

    function drawHelix(helix: DnaHelix) {
      if (!ctx) return;
      const { x, y, length, opacity, phase, scale, bend } = helix;
      const steps = 24;
      const amplitude = 7 * scale;
      const currentAngle = helix.angle + time * helix.rotateSpeed;
      const twists = 3.5;
      const bendAmount = bend * length;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(currentAngle);
      ctx.globalAlpha = opacity;

      const strandColors = ['#ff6b9d', '#7ec8e3'];

      function curveY(t: number): number {
        return bendAmount * (4 * t * (1 - t));
      }

      for (let i = 1; i < steps; i += 2) {
        const t = i / steps;
        const px = t * length - length / 2;
        const cy = curveY(t);
        const py1 = cy + Math.sin((t * Math.PI * 2 * twists) + phase + time * 0.015) * amplitude;
        const py2 = cy + Math.sin((t * Math.PI * 2 * twists) + phase + time * 0.015 + Math.PI) * amplitude;
        ctx.beginPath();
        ctx.moveTo(px, py1);
        ctx.lineTo(px, py2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
        ctx.lineWidth = 1.0 * scale;
        ctx.stroke();
      }

      for (let s = 0; s < 2; s++) {
        const phaseOffset = s * Math.PI;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const px = t * length - length / 2;
          const cy = curveY(t);
          const py =
            cy + Math.sin((t * Math.PI * 2 * twists) + phase + time * 0.015 + phaseOffset) * amplitude;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = strandColors[s];
        ctx.lineWidth = 2.2 * scale;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      ctx.restore();
    }

    function paintStaticStars() {
      if (!ctx) return;
      for (const star of stars) {
        const alpha = star.opacity * 0.88;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 232, 240, ${Math.max(0.06, Math.min(0.85, alpha))})`;
        ctx.fill();
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 232, 240, ${alpha * 0.07})`;
          ctx.fill();
        }
      }
    }

    function paint() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mobileStatic || reduceMotion) {
        paintStaticStars();
        return;
      }

      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      time += 1;

      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity + twinkle * 0.25;
        const drift = scrollY * star.speed * 0.15;
        const drawY = ((star.y - drift) % canvas.height + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(star.x, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 232, 240, ${Math.max(0.05, Math.min(0.9, alpha))})`;
        ctx.fill();
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, drawY, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 232, 240, ${Math.max(0, alpha * 0.08)})`;
          ctx.fill();
        }
      }

      for (const helix of helices) {
        helix.x += helix.driftX;
        helix.y += helix.speed;
        const helixDrift = scrollY * helix.scale * 0.1;
        const drawY =
          ((helix.y - helixDrift) % (canvas.height + 200) + (canvas.height + 200)) %
            (canvas.height + 200) -
          100;
        if (helix.x < -100) helix.x = canvas.width + 100;
        if (helix.x > canvas.width + 100) helix.x = -100;
        const savedY = helix.y;
        helix.y = drawY;
        drawHelix(helix);
        helix.y = savedY;
      }
    }

    function loop() {
      paint();
      if (!mobileStatic && !reduceMotion) {
        animationId = requestAnimationFrame(loop);
      }
    }

    window.addEventListener('resize', scheduleResize);
    resizeCommitted();

    return () => {
      cancelAnimationFrame(animationId);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', scheduleResize);
    };
  });
</script>

<canvas bind:this={canvas} class="starfield" aria-hidden="true"></canvas>

<style>
  .starfield {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    max-height: -webkit-fill-available;
    z-index: 0;
    pointer-events: none;
  }
</style>
