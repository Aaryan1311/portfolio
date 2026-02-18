/* ============================================
   HOME PAGE JS — Particles, Typewriter, etc.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============ PARTICLE SYSTEM ============
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          this.vx += (dx / dist) * force * 0.02;
          this.vy += (dy / dist) * force * 0.02;
        }
      }
      this.vx *= 0.999;
      this.vy *= 0.999;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 163, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 255, 163, ${(1 - dist / 150) * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  initParticles();
  animate();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  // ============ CURSOR GLOW ============
  const cursorGlow = document.getElementById('cursorGlow');
  let glowVisible = false;

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (cursorGlow) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      if (!glowVisible) { cursorGlow.style.opacity = '1'; glowVisible = true; }
    }
  });

  document.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
    if (cursorGlow) cursorGlow.style.opacity = '0';
    glowVisible = false;
  });

  // ============ TERMINAL TYPEWRITER ============
  const heroCommand = document.getElementById('heroCommand');
  const heroOutput = document.getElementById('heroOutput');
  const cursor = document.querySelector('.terminal-cursor');

  const outputLines = [
    { text: '> Name: Aaryan Tripathi', highlight: false },
    { text: '> Role: Software Developer Engineer @ Hypergro.ai', highlight: false },
    { text: '> Stack: Java | TypeScript | Python | Node.js | PostgreSQL', highlight: false },
    { text: '> Status: Building backends & training LLMs at 2 AM', highlight: true },
    { text: '> Fun fact: Switched from circuits to code — zero regrets', highlight: false },
    { text: '', highlight: false },
    { text: '> Ready to collaborate? Scroll down', highlight: true },
  ];

  async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function runTerminal() {
    await sleep(800);
    const cmd = 'whoami';
    for (let i = 0; i < cmd.length; i++) {
      heroCommand.textContent += cmd[i];
      await sleep(80);
    }
    await sleep(400);
    if (cursor) cursor.style.display = 'none';
    for (const line of outputLines) {
      const p = document.createElement('p');
      p.className = 'output-line' + (line.highlight ? ' highlight-output' : '');
      p.textContent = line.text;
      heroOutput.appendChild(p);
      await sleep(100);
    }
  }
  runTerminal();

  // ============ COUNTER ANIMATION ============
  document.querySelectorAll('[data-count]').forEach(el => {
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { el.textContent = target; clearInterval(timer); }
          else el.textContent = Math.floor(current);
        }, 37);
        obs.unobserve(el);
      }
    }, { threshold: 0.5 }).observe(el);
  });

  // ============ PROJECT CARD GLOW ============
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width) * 100 + '%');
      card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height) * 100 + '%');
    });
  });

  // ============ KONAMI CODE ============
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
  let ki = 0;
  document.addEventListener('keydown', (e) => {
    if (e.code === konami[ki]) { ki++; if (ki === konami.length) { activateEaster(); ki = 0; } }
    else ki = 0;
  });

  function activateEaster() {
    document.documentElement.style.setProperty('--accent', '#ff6b6b');
    const msg = document.createElement('div');
    msg.textContent = 'Konami Code activated!';
    msg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#1a1a2e;color:#ff6b6b;font-family:var(--font-mono);padding:16px 32px;border-radius:12px;border:1px solid #ff6b6b;z-index:10000;box-shadow:0 8px 30px rgba(255,107,107,0.3)';
    document.body.appendChild(msg);
    setTimeout(() => { msg.remove(); document.documentElement.style.setProperty('--accent', '#00ffa3'); }, 3000);
  }

});
