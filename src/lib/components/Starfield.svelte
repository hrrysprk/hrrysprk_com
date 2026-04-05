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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let helices: DnaHelix[] = [];
    let animationId: number;
    let scrollY = 0;
    let time = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initHelices();
    }

    function initStars() {
      const count = Math.floor((canvas.width * canvas.height) / 6000);
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
      const count = Math.max(6, Math.floor((canvas.width * canvas.height) / 120000));
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

      // Helper: get curved axis offset at position t (0-1)
      // Parabolic bend: max at center, zero at ends
      function curveY(t: number): number {
        return bendAmount * (4 * t * (1 - t));
      }

      // Draw white base pair rungs connecting both strands
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

      // Draw two backbone strands — pink and light blue
      for (let s = 0; s < 2; s++) {
        const phaseOffset = s * Math.PI;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const px = t * length - length / 2;
          const cy = curveY(t);
          const py = cy + Math.sin((t * Math.PI * 2 * twists) + phase + time * 0.015 + phaseOffset) * amplitude;
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

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        const drawY = ((helix.y - helixDrift) % (canvas.height + 200) + (canvas.height + 200)) % (canvas.height + 200) - 100;
        if (helix.x < -100) helix.x = canvas.width + 100;
        if (helix.x > canvas.width + 100) helix.x = -100;
        const savedY = helix.y;
        helix.y = drawY;
        drawHelix(helix);
        helix.y = savedY;
      }

      animationId = requestAnimationFrame(draw);
    }

    function handleScroll() {
      scrollY = window.scrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
    };
  });
</script>

<canvas bind:this={canvas} class="starfield" aria-hidden="true"></canvas>

<style>
  .starfield {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
  }
</style>
