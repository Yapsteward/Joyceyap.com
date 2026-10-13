/**
 * ============================================================================
 * CONSTELLATION ENGINE MODULE (SRP: Particle Physics & Canvas Rendering)
 * ============================================================================
 * High-performance green neon constellation canvas background with interactive
 * magnetic cursor attraction and twinkle breathing nodes.
 */

(function () {
  'use strict';

  function initConstellation() {
    const canvas = document.getElementById('constellationCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let animationFrameId = null;

    // Mouse tracking for interactive constellation connections
    const mouse = {
      x: null,
      y: null,
      radius: 175,
      active: false
    };

    // Rich Green Neon configuration
    const CONFIG = {
      densityDivider: 14000,
      minParticles: 55,
      maxParticles: 120,
      maxConnectDist: 135,
      mouseConnectDist: 175,
      speed: 0.35,
      neonGreen: 'rgba(157, 229, 0, ',    // Core neon lime
      electricGreen: 'rgba(166, 255, 0, ', // Accent bright green
      mintCyan: 'rgba(0, 210, 255, '        // Accent cyan star
    };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
      initParticles();
    }

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = initial ? Math.random() * width : (Math.random() < 0.5 ? 0 : width);
        this.y = initial ? Math.random() * height : Math.random() * height;

        const angle = Math.random() * Math.PI * 2;
        const speed = 0.15 + Math.random() * CONFIG.speed;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.baseRadius = 1.2 + Math.random() * 2.0;
        this.radius = this.baseRadius;

        // Color: 85% Neon Green, 15% Cyber Cyan
        this.isCyan = Math.random() < 0.15;
        this.colorPrefix = this.isCyan ? CONFIG.mintCyan : CONFIG.neonGreen;

        // Twinkle / pulse properties
        this.alpha = 0.4 + Math.random() * 0.5;
        this.pulseSpeed = 0.015 + Math.random() * 0.03;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Seamless screen wrap
        if (this.x < -15) this.x = width + 15;
        else if (this.x > width + 15) this.x = -15;
        if (this.y < -15) this.y = height + 15;
        else if (this.y > height + 15) this.y = -15;

        // Twinkle breathing pulse
        this.pulsePhase += this.pulseSpeed;
        this.currentAlpha = this.alpha + Math.sin(this.pulsePhase) * 0.22;
        if (this.currentAlpha < 0.2) this.currentAlpha = 0.2;
        if (this.currentAlpha > 0.95) this.currentAlpha = 0.95;

        // Interactive magnetic cursor nudge
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 1) {
            const force = (1 - dist / mouse.radius) * 0.45;
            this.x -= (dx / dist) * force;
            this.y -= (dy / dist) * force;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.colorPrefix + this.currentAlpha + ')';
        ctx.shadowColor = this.isCyan ? '#00d2ff' : '#9de500';
        ctx.shadowBlur = this.radius > 2.2 ? 10 : 5;
        ctx.fill();
      }
    }

    function initParticles() {
      const area = width * height;
      let count = Math.floor(area / CONFIG.densityDivider);
      count = Math.max(CONFIG.minParticles, Math.min(CONFIG.maxParticles, count));

      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function drawConstellationLines() {
      const pLen = particles.length;
      const maxDist = CONFIG.maxConnectDist;
      const maxDistSq = maxDist * maxDist;

      for (let i = 0; i < pLen; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDist) * 0.32;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = CONFIG.neonGreen + alpha + ')';
            ctx.lineWidth = 0.85;
            ctx.shadowColor = '#9de500';
            ctx.shadowBlur = 3;
            ctx.stroke();
          }
        }

        // Laser threads to mouse cursor
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const mdx = mouse.x - p1.x;
          const mdy = mouse.y - p1.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const mouseDist = CONFIG.mouseConnectDist;

          if (mDistSq < mouseDist * mouseDist) {
            const mDist = Math.sqrt(mDistSq);
            const mAlpha = (1 - mDist / mouseDist) * 0.55;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = CONFIG.electricGreen + mAlpha + ')';
            ctx.lineWidth = 1.1;
            ctx.shadowColor = '#a6ff00';
            ctx.shadowBlur = 8;
            ctx.stroke();
          }
        }
      }
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Draw lines between nearby nodes
      drawConstellationLines();

      // Update & render stars/nodes
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      // Glowing active cursor node
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(166, 255, 0, 0.85)';
        ctx.shadowColor = '#a6ff00';
        ctx.shadowBlur = 12;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    }

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.x = null;
      mouse.y = null;
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    });

    resize();
    animationFrameId = requestAnimationFrame(render);
  }

  // Expose module initialization
  window.PortfolioConstellation = {
    init: initConstellation
  };
})();
