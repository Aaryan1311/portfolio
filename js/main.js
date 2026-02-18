/* ============================================
   AARYAN TRIPATHI — PORTFOLIO SCRIPTS
   Particles, Typewriter, Animations & More
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============ PARTICLE SYSTEM ============
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  const PARTICLE_COUNT = 80;
  const CONNECTION_DISTANCE = 150;
  const MOUSE_RADIUS = 200;

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

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          this.vx += (dx / dist) * force * 0.02;
          this.vy += (dy / dist) * force * 0.02;
        }
      }

      // Damping
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
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DISTANCE) {
          const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 255, 163, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  // ============ CURSOR GLOW ============
  const cursorGlow = document.getElementById('cursorGlow');
  let glowVisible = false;

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (cursorGlow) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      if (!glowVisible) {
        cursorGlow.style.opacity = '1';
        glowVisible = true;
      }
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

  const commands = [
    { cmd: 'whoami', delay: 80 },
  ];

  const outputLines = [
    { text: '> Name: Aaryan Tripathi', highlight: false },
    { text: '> Role: Software Developer Engineer @ Hypergro.ai', highlight: false },
    { text: '> Stack: Java | TypeScript | Python | Node.js | PostgreSQL', highlight: false },
    { text: '> Status: Building backends & training LLMs at 2 AM 🌙', highlight: true },
    { text: '> Fun fact: Switched from circuits to code — zero regrets', highlight: false },
    { text: '', highlight: false },
    { text: '> Ready to collaborate? Scroll down ↓', highlight: true },
  ];

  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function typeCommand(text, delay) {
    for (let i = 0; i < text.length; i++) {
      heroCommand.textContent += text[i];
      await sleep(delay);
    }
  }

  async function printOutput() {
    for (let i = 0; i < outputLines.length; i++) {
      const line = document.createElement('p');
      line.className = 'output-line';
      if (outputLines[i].highlight) {
        line.classList.add('highlight-output');
      }
      line.textContent = outputLines[i].text;
      line.style.animationDelay = `${i * 0.1}s`;
      heroOutput.appendChild(line);
      await sleep(100);
    }
  }

  async function runTerminal() {
    await sleep(800);
    for (const command of commands) {
      await typeCommand(command.cmd, command.delay);
      await sleep(400);
      if (cursor) cursor.style.display = 'none';
      await printOutput();
    }
  }

  runTerminal();

  // ============ NAVBAR ============
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = navLinks.querySelectorAll('a');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Active section highlighting
  const sections = document.querySelectorAll('.section');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px',
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ============ REVEAL ON SCROLL ============
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============ COUNTER ANIMATION ============
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el, target) {
    let current = 0;
    const increment = target / 40;
    const duration = 1500;
    const stepTime = duration / 40;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, stepTime);
  }

  // ============ PROJECT CARD GLOW EFFECT ============
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // ============ KONAMI CODE EASTER EGG ============
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA',
  ];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateEasterEgg() {
    document.documentElement.style.setProperty('--accent', '#ff6b6b');
    document.documentElement.style.setProperty('--accent-dim', '#ee5a5a');
    document.documentElement.style.setProperty('--accent-glow', 'rgba(255, 107, 107, 0.15)');
    document.documentElement.style.setProperty('--accent-glow-strong', 'rgba(255, 107, 107, 0.3)');

    const msg = document.createElement('div');
    msg.textContent = '🎮 Konami Code activated! You found the easter egg!';
    msg.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #1a1a2e;
      color: #ff6b6b;
      font-family: var(--font-mono);
      padding: 16px 32px;
      border-radius: 12px;
      border: 1px solid #ff6b6b;
      z-index: 10000;
      animation: fadeInUp 0.5s ease;
      box-shadow: 0 8px 30px rgba(255, 107, 107, 0.3);
    `;
    document.body.appendChild(msg);

    setTimeout(() => {
      msg.style.opacity = '0';
      msg.style.transition = 'opacity 0.5s ease';
      setTimeout(() => msg.remove(), 500);
    }, 3000);

    // Revert colors after 10 seconds
    setTimeout(() => {
      document.documentElement.style.setProperty('--accent', '#00ffa3');
      document.documentElement.style.setProperty('--accent-dim', '#00cc82');
      document.documentElement.style.setProperty('--accent-glow', 'rgba(0, 255, 163, 0.15)');
      document.documentElement.style.setProperty('--accent-glow-strong', 'rgba(0, 255, 163, 0.3)');
    }, 10000);
  }

  // ============ CHESS PIECE CURSOR ON FOOTER HOVER ============
  const footerChess = document.querySelector('.footer-chess');
  if (footerChess) {
    footerChess.addEventListener('mouseenter', () => {
      document.body.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' style=\'font-size:24px\'><text y=\'24\'>♞</text></svg>") 16 16, auto';
    });
    footerChess.addEventListener('mouseleave', () => {
      document.body.style.cursor = '';
    });
  }

  // ============ PAGE LOAD ANIMATION ============
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

});
