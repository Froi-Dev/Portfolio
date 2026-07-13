/* ==========================================================================
   FROILAN — Portfolio
   main.js — data, interactions, and motion
   ========================================================================== */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  document.getElementById('footerYear').textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     DATA — Projects
     ------------------------------------------------------------------ */
  const PROJECTS = [
    {
      mark: 'ET',
      type: 'Web App',
      category: 'Finance',
      name: 'Expense Tracker',
      tagline: 'A clean, fast way to log spending and see where the money actually goes.',
      tech: ['React', 'Node.js', 'MongoDB'],
      desc: 'A personal finance dashboard that turns raw transactions into readable trends, with budgets that adjust as spending habits change.',
      features: [
        'Category-based budgeting with live progress bars',
        'Monthly trend charts built from real transaction history',
        'CSV import for bank statements',
        'Multi-currency support'
      ]
    },
    {
      mark: 'MH',
      type: 'Mobile Application',
      category: 'Health',
      name: 'Mental Health App',
      tagline: 'Daily check-ins and guided journaling for calmer, more consistent days.',
      tech: ['Kotlin', 'Jetpack Compose', 'Firebase'],
      desc: 'A mobile companion for mood tracking and guided journaling, designed to feel calm rather than clinical.',
      features: [
        'Daily mood check-in with gentle reminders',
        'Guided journaling prompts',
        'Private, on-device-first data model',
        'Weekly reflection summaries'
      ]
    },
    {
      mark: 'MP',
      type: 'Web App',
      category: 'Media',
      name: 'Music Player',
      tagline: 'A distraction-free player with playlists, queueing, and a focus on sound.',
      tech: ['JavaScript', 'HTML5 Audio', 'Firebase'],
      desc: 'A lightweight web music player focused on a fast, uncluttered listening experience with real-time queue management.',
      features: [
        'Drag-to-reorder playback queue',
        'Custom playlists with shareable links',
        'Waveform-based seek bar',
        'Offline caching for recent tracks'
      ]
    },
    {
      mark: 'CS',
      type: 'Website',
      category: 'Social',
      name: 'Campus Social Network',
      tagline: 'A closed community space for students to share, plan, and stay in the loop.',
      tech: ['PHP', 'MySQL', 'Bootstrap'],
      desc: 'A campus-only social platform for clubs, events, and announcements, built to reduce reliance on scattered group chats.',
      features: [
        'Verified student authentication',
        'Event pages with RSVP tracking',
        'Club-specific discussion boards',
        'Admin moderation dashboard'
      ]
    },
    {
      mark: 'RS',
      type: 'Web App',
      category: 'Operations',
      name: 'Reservation System',
      tagline: 'Booking and scheduling that keeps double-bookings from ever happening.',
      tech: ['React', 'Node.js', 'MySQL'],
      desc: 'A booking platform for small venues, handling availability, confirmations, and reminders end to end.',
      features: [
        'Real-time availability calendar',
        'Automated email/SMS confirmations',
        'Role-based staff access',
        'Exportable booking reports'
      ]
    },
    {
      mark: 'IS',
      type: 'Tools',
      category: 'Operations',
      name: 'Inventory System',
      tagline: 'Stock levels, purchase orders, and low-stock alerts in one dashboard.',
      tech: ['PHP', 'MySQL', 'Bootstrap'],
      desc: 'An inventory management tool for small retailers, tracking stock movement across multiple locations.',
      features: [
        'Low-stock alerts with reorder suggestions',
        'Barcode-friendly product lookup',
        'Multi-location stock transfer',
        'Sales & stock history reports'
      ]
    },
    {
      mark: 'JC',
      type: 'Web App',
      category: 'E-commerce',
      name: 'Jewelry Customization App',
      tagline: 'Design a piece in real time and see the price update as choices change.',
      tech: ['React', 'Node.js', 'Firebase'],
      desc: 'An interactive configurator letting customers build custom jewelry pieces and preview them before ordering.',
      features: [
        'Real-time visual customization',
        'Dynamic pricing based on materials',
        'Saved designs & wishlists',
        'Order tracking dashboard'
      ]
    }
  ];

  const PROJECT_TYPES = ['All', 'Website', 'Web App', 'Mobile Application', 'Tools'];

  /* ------------------------------------------------------------------
     DATA — Tech stack (4 fixed categories -> 4 cards)
     ------------------------------------------------------------------ */
  const STACK = [
    {
      category: 'Frontend', items: [
        { name: 'HTML', icon: 'devicon-html5-plain colored', devicon: true },
        { name: 'CSS', icon: 'devicon-css3-plain colored', devicon: true },
        { name: 'JavaScript', icon: 'devicon-javascript-plain colored', devicon: true },
        { name: 'React', icon: 'devicon-react-original colored', devicon: true },
        { name: 'Bootstrap', icon: 'devicon-bootstrap-plain colored', devicon: true },
        { name: 'Kotlin (Mobile)', icon: 'devicon-kotlin-plain colored', devicon: true }
      ]
    },
    {
      category: 'Backend', items: [
        { name: 'Node.js', icon: 'devicon-nodejs-plain colored', devicon: true },
        { name: 'PHP', icon: 'devicon-php-plain colored', devicon: true },
        { name: 'MySQL', icon: 'devicon-mysql-plain colored', devicon: true },
        { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', devicon: true },
        { name: 'Firebase', icon: 'devicon-firebase-plain colored', devicon: true }
      ]
    },
    {
      category: 'AI Technologies', items: [
        { name: 'ChatGPT', icon: 'bi-stars', color: '#10a37f' },
        { name: 'Claude', icon: 'bi-magic', color: '#da7756' },
        { name: 'Gemini', icon: 'bi-gem', color: '#4285f4' },
        { name: 'Cursor', icon: 'bi-cursor', color: '#6366f1' },
        { name: 'GitHub Copilot', icon: 'bi-robot', color: '#8957e5' }
      ]
    },
    {
      category: 'Developer Tools', items: [
        { name: 'Git', icon: 'devicon-git-plain colored', devicon: true },
        { name: 'GitHub', icon: 'devicon-github-original colored', devicon: true },
        { name: 'Figma', icon: 'devicon-figma-plain colored', devicon: true },
        { name: 'VS Code', icon: 'devicon-vscode-plain colored', devicon: true },
        { name: 'Android Studio', icon: 'bi-phone', color: '#3ddc84' }
      ]
    }
  ];

  /* ------------------------------------------------------------------
     RENDER — Filter tabs
     ------------------------------------------------------------------ */
  const filtersWrap = document.getElementById('projectFilters');
  let activeFilter = 'All';

  PROJECT_TYPES.forEach(type => {
    const count = type === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.type === type).length;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-tab' + (type === 'All' ? ' is-active' : '');
    btn.dataset.type = type;
    btn.setAttribute('aria-pressed', type === 'All' ? 'true' : 'false');
    btn.textContent = `${type} (${count})`;
    btn.addEventListener('click', () => {
      if (type === activeFilter) return;
      activeFilter = type;
      filtersWrap.querySelectorAll('.filter-tab').forEach(t => {
        t.classList.toggle('is-active', t.dataset.type === type);
        t.setAttribute('aria-pressed', t.dataset.type === type ? 'true' : 'false');
      });
      renderProjects(activeFilter);
    });
    filtersWrap.appendChild(btn);
  });

  /* ------------------------------------------------------------------
     RENDER — Projects into Splide list (filter-aware)
     ------------------------------------------------------------------ */
  const projectsList = document.getElementById('projectsList');
  let splide = null;

  function cardMarkup(p, originalIndex, displayNum) {
    return `
      <article class="project-card" data-index="${originalIndex}" tabindex="0" role="button" aria-haspopup="dialog" aria-label="View details for ${p.name}">
        <div class="project-card__media">
          <span class="project-card__media-mark">${p.mark}</span>
        </div>
        <span class="project-card__num">${displayNum} / ${p.category} \u00b7 ${p.type}</span>
        <h3 class="project-card__name">${p.name}</h3>
        <p class="project-card__tagline">${p.tagline}</p>
        <div class="project-card__icons">
          ${p.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
        <span class="project-card__cta">Learn More <i class="bi bi-arrow-up-right"></i></span>
      </article>
    `;
  }

  function renderProjects(filter) {
    const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === filter);

    projectsList.innerHTML = filtered.map((p, i) => {
      const originalIndex = PROJECTS.indexOf(p);
      return `<li class="splide__slide">${cardMarkup(p, originalIndex, String(i + 1).padStart(2, '0'))}</li>`;
    }).join('');

    if (splide) {
      splide.destroy();
      splide = null;
    }
    splide = mountSplide();

    if (!prefersReducedMotion) {
      gsap.fromTo('.project-card', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06
      });
    }
  }

  /* ------------------------------------------------------------------
     RENDER — Tech stack (4 vertical cards, one horizontal row)
     ------------------------------------------------------------------ */
  const stackWrap = document.getElementById('stackCategories');
  STACK.forEach((group, i) => {
    const card = document.createElement('div');
    card.className = 'stack__category reveal-up';
    card.tabIndex = 0;
    card.innerHTML = `
      <span class="stack__category-index">${String(i + 1).padStart(2, '0')}</span>
      <h3 class="stack__category-title">${group.category}</h3>
      <div class="stack__list">
        ${group.items.map(item => {
      const iconClass = item.devicon
        ? `${item.icon} stack__item-icon`
        : `bi ${item.icon} stack__item-icon stack__item-icon--brand`;
      const iconStyle = item.color ? ` style="color:${item.color}"` : '';
      return `
          <div class="stack__item">
            <i class="${iconClass}"${iconStyle} aria-hidden="true"></i>
            <span class="stack__item-name">${item.name}</span>
          </div>
        `;
    }).join('')}
      </div>
    `;
    stackWrap.appendChild(card);
  });

  // Mouse-tracked glow on each stack card
  document.querySelectorAll('.stack__category').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });

  /* ------------------------------------------------------------------
     SPLIDE — Projects carousel (re-created on each filter change)
     ------------------------------------------------------------------ */
  function mountSplide() {
    return new Splide('#projectsSplide', {
      type: 'slide',
      perPage: 4,
      gap: '1.1rem',
      padding: { left: 0, right: '8%' },
      pagination: false,
      arrows: false,
      breakpoints: {
        1200: { perPage: 3, padding: { right: '8%' } },
        860: { perPage: 2, padding: { right: '10%' } },
        560: { perPage: 1, padding: { right: '14%' } }
      }
    }).mount();
  }

  document.getElementById('projPrev').addEventListener('click', () => { if (splide) splide.go('<'); });
  document.getElementById('projNext').addEventListener('click', () => { if (splide) splide.go('>'); });

  renderProjects('All');

  /* ------------------------------------------------------------------
     PROJECT MODAL
     ------------------------------------------------------------------ */
  const modal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalMediaMark = document.getElementById('modalMediaMark');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalStack = document.getElementById('modalStack');

  let lastFocused = null;

  function openModal(index) {
    const p = PROJECTS[index];
    modalMediaMark.textContent = p.mark;
    modalCategory.textContent = `${p.category} \u00b7 ${p.type}`;
    modalTitle.textContent = p.name;
    modalDesc.textContent = p.desc;
    modalFeatures.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');
    modalStack.innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');

    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocused) lastFocused.focus();
  }

  projectsList.addEventListener('click', e => {
    const card = e.target.closest('.project-card');
    if (card) openModal(Number(card.dataset.index));
  });
  projectsList.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('project-card')) {
      e.preventDefault();
      openModal(Number(e.target.dataset.index));
    }
  });
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  /* ------------------------------------------------------------------
     LENIS — Smooth scroll (+ GSAP ScrollTrigger sync)
     ------------------------------------------------------------------ */
  gsap.registerPlugin(ScrollTrigger);
  let lenis;

  function initSmoothScroll() {
    if (prefersReducedMotion || typeof Lenis === 'undefined') return;
    lenis = new Lenis({
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Anchor links respect Lenis smooth scroll, landing with clearance below the floating nav
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const navClearance = siteNav.offsetHeight + 24;
          if (lenis) lenis.scrollTo(target, { offset: -navClearance });
          else target.scrollIntoView({ behavior: 'smooth' });
          document.getElementById('mobileMenu').classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  /* ------------------------------------------------------------------
     SCROLL PROGRESS BAR + NAV SHRINK
     ------------------------------------------------------------------ */
  const scrollBar = document.getElementById('scrollProgressBar');
  const siteNav = document.getElementById('siteNav');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar.style.width = pct + '%';
    siteNav.classList.toggle('is-scrolled', scrollTop > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
     MOBILE MENU
     ------------------------------------------------------------------ */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  /* ------------------------------------------------------------------
     THEME TOGGLE (in-memory only — no persistence)
     ------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  themeToggle.addEventListener('click', () => {
    const isLight = htmlEl.getAttribute('data-theme') === 'light';
    htmlEl.setAttribute('data-theme', isLight ? 'dark' : 'light');
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to light theme' : 'Switch to dark theme');
  });

  /* ------------------------------------------------------------------
     CUSTOM CURSOR
     ------------------------------------------------------------------ */
  if (!isCoarsePointer) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('[data-cursor="link"], a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('is-link'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-link'));
    });
  }

  /* ------------------------------------------------------------------
     MAGNETIC BUTTONS
     ------------------------------------------------------------------ */
  if (!prefersReducedMotion && !isCoarsePointer) {
    document.querySelectorAll('.btn-magnetic, .carousel-btn, .theme-toggle, .site-footer__top').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: relX * 0.3, y: relY * 0.4, duration: 0.4, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  /* ------------------------------------------------------------------
     HERO MARQUEE — ticker of tools with colored logos, seamless loop
     ------------------------------------------------------------------ */
  (function initHeroMarquee() {
    const track = document.getElementById('heroMarquee');
    if (!track) return;
    const items = [
      { name: 'React', icon: 'devicon-react-original colored' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
      { name: 'PHP', icon: 'devicon-php-plain colored' },
      { name: 'Kotlin', icon: 'devicon-kotlin-plain colored' },
      { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
      { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
      { name: 'Git', icon: 'devicon-git-plain colored' },
      { name: 'Figma', icon: 'devicon-figma-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' }
    ];
    const html = items.map(i => `<span><i class="${i.icon}" aria-hidden="true"></i>${i.name}</span>`)
      .join('<span class="hero__marquee-sep">/</span>');
    track.innerHTML = html + '<span class="hero__marquee-sep">/</span>' + html;
  })();

  /* ------------------------------------------------------------------
     HERO ROLE ROTATOR
     ------------------------------------------------------------------ */
  (function initRotator() {
    const words = document.querySelectorAll('#roleRotator .rotator__word');
    if (words.length < 2) return;
    let current = 0;
    setInterval(() => {
      const next = (current + 1) % words.length;
      words[current].classList.add('is-leaving');
      words[current].classList.remove('is-active');
      words[next].classList.add('is-active');
      setTimeout(() => words[current].classList.remove('is-leaving'), 650);
      current = next;
    }, 2600);
  })();

  /* ------------------------------------------------------------------
     HERO CANVAS — reactive dot grid
     ------------------------------------------------------------------ */
  (function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    let w, h, dots = [];
    const spacing = 34;
    let pointer = { x: -9999, y: -9999 };

    function isLight() { return htmlEl.getAttribute('data-theme') === 'light'; }

    function resize() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
      dots = [];
      const cols = Math.ceil(w / (spacing * devicePixelRatio)) + 1;
      const rows = Math.ceil(h / (spacing * devicePixelRatio)) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({ x: i * spacing * devicePixelRatio, y: j * spacing * devicePixelRatio, baseR: 1.1 * devicePixelRatio });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const color = isLight() ? '10,10,10' : '244,244,245';
      dots.forEach(d => {
        const dx = d.x - pointer.x, dy = d.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / (260 * devicePixelRatio));
        const r = d.baseR + influence * 2.4 * devicePixelRatio;
        const alpha = 0.12 + influence * 0.55;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) * devicePixelRatio;
      pointer.y = (e.clientY - rect.top) * devicePixelRatio;
    });
    canvas.addEventListener('mouseleave', () => { pointer.x = -9999; pointer.y = -9999; });

    window.addEventListener('resize', resize);
    resize();
    draw();
  })();

  /* ------------------------------------------------------------------
     GSAP SCROLL REVEALS
     ------------------------------------------------------------------ */
  function initReveals() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
        el.style.opacity = 1; el.style.transform = 'none';
      });
      return;
    }

    gsap.utils.toArray('.reveal-up').forEach(el => {
      gsap.fromTo(el, { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    gsap.utils.toArray('.reveal-scale').forEach(el => {
      gsap.fromTo(el, { scale: 0.94, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    // Hero split-line reveal (page load, not scroll)
    gsap.set('.hero__wordmark .split-line__inner', { y: '110%' });
    gsap.to('.hero__wordmark .split-line__inner', {
      y: '0%', duration: 1.1, ease: 'power4.out', stagger: 0.09, delay: 0.15
    });
    gsap.to('.hero-reveal', {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.5
    });

    // Project cards stagger reveal within carousel
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.fromTo(card, { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: (i % 3) * 0.08,
        scrollTrigger: { trigger: '.projects__carousel-wrap', start: 'top 85%' }
      });
    });
  }

  // set initial hidden state for hero entrance elements (avoid flash before JS runs)
  gsap.set('.hero-reveal', { y: 14, opacity: 0 });

  /* ------------------------------------------------------------------
     ANIMATED COUNTERS
     ------------------------------------------------------------------ */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count-to]');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.countTo, 10);
      const suffix = counter.dataset.suffix || '';
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => { counter.textContent = Math.round(obj.val) + suffix; }
          });
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     CONTACT FORM (simulated submit)
     ------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formNote = document.getElementById('formNote');

  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      formNote.textContent = 'Please fill in all fields with a valid email.';
      formNote.classList.remove('is-success');
      return;
    }
    submitBtn.classList.add('is-loading');
    formNote.textContent = '';
    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      formNote.textContent = 'Message sent — thanks for reaching out. I\u2019ll reply soon.';
      formNote.classList.add('is-success');
      contactForm.reset();
    }, 1400);
  });

  /* ------------------------------------------------------------------
     BOOT SEQUENCE — runs immediately, no preloader gate
     ------------------------------------------------------------------ */
  initSmoothScroll();
  initReveals();
  initCounters();
  ScrollTrigger.refresh();

})();