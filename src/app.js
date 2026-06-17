/**
 * app.js â€” E-Magazine SPA: Đại hội XIV – 9 Nghị quyết chiến lược
 * Khoa LLCT&KHXHNV - Trường Đại học Cảnh sát nhân dân
 *
 * Kiến trúc: Vanilla JS SPA với hash-based routing
 * Animation: CSS transitions + Intersection Observer
 */

'use strict';

// â”€â”€ GLOBAL APP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const APP = (() => {
  let currentResolutionId = null;
  let scrollListeners = [];

  // â”€â”€ Init â”€â”€
  function init() {
    setupGlobalScrollProgress();
    renderHomePage();
    setupParticles();
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    // Use IntersectionObserver for performance â€” fallback to scroll listener
    if ('IntersectionObserver' in window) {
      setupIntersectionObserver();
    } else {
      window.addEventListener('scroll', onScrollReveal, { passive: true });
    }
    setupKeyboardNav();
    initAutoCounters();
  }

  // â”€â”€ Intersection Observer (preferred over scroll listener) â”€â”€
  let _revealObserver = null;
  function setupIntersectionObserver() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    _revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            if (reduced) {
              el.classList.add('revealed');
            } else {
              // stagger siblings within same parent
              const siblings = Array.from(el.parentElement.querySelectorAll('.reveal-on-scroll:not(.revealed)'));
              const idx = siblings.indexOf(el);
              const delay = Math.min(idx * 60, 400);
              setTimeout(() => el.classList.add('revealed'), delay);
            }
            _revealObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal-on-scroll').forEach(el => _revealObserver.observe(el));
  }

  function observeNewRevealElements() {
    if (_revealObserver) {
      document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach(el => _revealObserver.observe(el));
    }
  }

  // â”€â”€ Auto Counter Logic â”€â”€
  let _counterObserver = null;
  function initAutoCounters() {
    if (!_counterObserver && 'IntersectionObserver' in window) {
      _counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
          }
        });
      }, { threshold: 0.5 });
    }
    if (_counterObserver) {
      document.querySelectorAll('.auto-counter:not(.counted)').forEach(el => _counterObserver.observe(el));
    }
  }

  function animateCounter(el) {
    const originalText = el.getAttribute('data-raw-text') || el.innerText;
    const match = originalText.match(/(\d+(?:\.\d+)?)/);
    if (!match) return;
    const targetNum = parseFloat(match[1]);
    const prefix = originalText.substring(0, match.index);
    const suffix = originalText.substring(match.index + match[1].length);
    const isInt = match[1].indexOf('.') === -1;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = start + (targetNum - start) * easeOut;
      el.innerText = prefix + (isInt ? Math.floor(current) : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.innerText = originalText;
    }
    requestAnimationFrame(update);
  }
  // â”€â”€ Global Motion Context Tracker â”€â”€
  window._lastClickContext = { type: 'unknown', element: null };
  document.addEventListener('click', (e) => {
    const dockBtn = e.target.closest('.mac-dock-btn');
    if (dockBtn) {
      const aria = dockBtn.getAttribute('aria-label') || '';
      const isPrev = aria.includes('trước');
      window._lastClickContext = { type: isPrev ? 'prev' : 'next', element: dockBtn };
      return;
    }
    const node = e.target.closest('.resolution-node, .resolution-card');
    if (node) {
      window._lastClickContext = { type: 'node', element: node };
      return;
    }
    window._lastClickContext = { type: 'unknown', element: null };
  }, true);

  // â”€â”€ Routing â”€â”€
  window.isTransitioning = false;
  function handleRoute() {
    const hash = window.location.hash;
    const match = hash.match(/^#\/nghi-quyet\/(\d+)$/);
    if (match) {
      showDetailPage(match[1]);
    } else {
      showHomePage();
    }
  }

  function navigateTo(path) {
    if (window.isTransitioning) return;
    window.location.hash = path;
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // â”€â”€ Global Scroll Progress â”€â”€
  function setupGlobalScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const pct = getScrollPercent();
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  function getScrollPercent() {
    const top = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    return h > 0 ? (top / h) * 100 : 0;
  }

  // â”€â”€ Reveal on Scroll (fallback) â”€â”€
  function onScrollReveal() {
    document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        el.classList.add('revealed');
      }
    });
  }

  // â”€â”€ Keyboard Navigation & Presenter Mode â”€â”€
  let isPresenterMode = false;
  let currentSectionIndex = -1;

  function togglePresenterMode() {
    isPresenterMode = !isPresenterMode;
    if (isPresenterMode) {
      document.body.classList.add('presenter-mode');
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
      }
      currentSectionIndex = -1; // reset
      alert('Chế độ Trình chiếu Đã Bật. Dùng phím Space hoặc Mũi tên trái/phải để điều hướng.');
    } else {
      document.body.classList.remove('presenter-mode');
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
      }
      alert('Đã tắt chế độ Trình chiếu.');
    }
  }

  function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // Lightbox Escape
      if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
          APP.closeLightbox();
          return;
        }
        if (isPresenterMode) {
          togglePresenterMode();
          return;
        }
      }

      // Presenter Mode Navigation
      if (isPresenterMode) {
        const sections = Array.from(document.querySelectorAll('.content-section'));
        if (sections.length === 0) return;

        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
          e.preventDefault();
          if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          if (currentSectionIndex > 0) {
            currentSectionIndex--;
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            // Scroll to top if at beginning
            currentSectionIndex = -1;
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }
    });
  }

  // â”€â”€ Particles â”€â”€
  function setupParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const colors = [
      'rgba(212,175,55,0.7)',
      'rgba(196,30,58,0.5)',
      'rgba(255,255,255,0.25)'
    ];

    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = [
        `left: ${Math.random() * 100}%`,
        `--duration: ${6 + Math.random() * 9}s`,
        `--delay: ${-Math.random() * 12}s`,
        `--drift: ${(Math.random() - 0.5) * 180}px`,
        `background: ${colors[i % colors.length]}`,
        `width: ${2 + Math.random() * 3}px`,
        `height: ${2 + Math.random() * 3}px`
      ].join(';');
      container.appendChild(p);
    }
  }

  // â”€â”€ Render Home â”€â”€
    function renderHomePage() {
    renderHomeDynamicContent();
    renderMindMapDesktop();
    renderMindMapMobile();
    setTimeout(onScrollReveal, 120);
  }

    function renderHomeDynamicContent() {
    const container = document.getElementById('home-dynamic-content');
    if (!container) return;

    const data = CONGRESS_XIV_OVERVIEW;

    const statsHTML = data.stats.map((s, i) => `
      <div class="hero-stat-card reveal-on-scroll reveal-delay-${i + 1}">
        <div class="stat-icon">${s.icon}</div>
        <div class="stat-info">
          <div class="stat-value">${s.value}</div>
          <div class="stat-label">${s.label}</div>
        </div>
      </div>
    `).join('');

    const focusBlocksHTML = data.focusBlocks.map((b, i) => {
      let miniStatsHTML = '';
      if (b.miniStats) {
        miniStatsHTML = `<div class="focus-mini-stats">` + b.miniStats.map(m => `
          <div class="mini-stat">
            <span class="ms-val">${m.value}</span>
            <span class="ms-lbl">${m.label}</span>
          </div>
        `).join('') + `</div>`;
      }
      
      let imgHTML = b.image ? `<img src="${b.image}" alt="${b.title}" class="fb-img">` : '';

      return `
        <div class="focus-block-card reveal-on-scroll reveal-delay-${i + 1}" id="focus-${b.id}">
          <div class="fb-header-flex" style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
            <div class="fb-icon" style="margin:0;">${b.icon}</div>
            <h3 class="fb-title" style="margin:0;">${b.title}</h3>
          </div>
          ${imgHTML}
          <p class="fb-desc">${b.description || ''}</p>
          ${miniStatsHTML}
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <!-- NEW HERO SECTION -->
      <header class="hero-section" id="hero-section">
        <div class="hero-bg">
          <div class="hero-flag-bg"></div>
            <!-- Dynamic Light Rays -->
            <div class="hero-light-ray ray-left"></div>
            <div class="hero-light-ray ray-right"></div>
            
            <!-- Top Corner Logos -->
            <div class="hero-logo-left">
              <svg viewBox="0 0 100 100" class="flag-icon">
                <rect width="100" height="100" fill="#DA251D" rx="10"/>
                <g transform="translate(50, 50) scale(0.7) translate(-50, -57.5)"><polygon points="50,15 61,48 95,48 68,68 78,100 50,80 22,100 32,68 5,48 39,48" fill="#FFFF00"/></g>
              </svg>
            </div>
            <div class="hero-logo-right">
              <svg viewBox="0 0 100 100" class="flag-icon party-flag">
                <rect width="100" height="100" fill="#DA251D" rx="10"/>
                <!-- Hammer and Sickle SVG path -->
                <text x="50" y="50" font-size="65" fill="#FFFF00" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif">&#9773;</text>
              </svg>
            </div>
          <div class="hero-overlay">
          <div id="particles-js" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:1;"></div>
          <div class="bg-glow"></div></div>
        </div>
        
        <div class="hero-grid single-column section-container">
          <div class="hero-center">
            <div class="special-badge reveal-on-scroll">${data.badge}</div>
            <h1 class="hero-title reveal-on-scroll reveal-delay-1">
                ${data.title}
              </h1>
            <h2 class="hero-subtitle reveal-on-scroll reveal-delay-2">${data.subtitle}</h2>
            <div class="hero-desc reveal-on-scroll reveal-delay-3">${data.description}</div>
            
            <div class="hero-actions reveal-on-scroll reveal-delay-4">
              <button class="btn-primary interactive-surface" onclick="APP.scrollToSection('mindmap-section')">Khám phá 9 nghị quyết</button>
              <button class="btn-secondary interactive-surface" onclick="window.open('https://notebooklm.google.com/notebook/0b782612-6ac3-4fce-ae16-cce64a7beaac', '_blank')">HỎI NOTEBOOKLM</button>
            </div>

            

            <div class="hero-stats-grid balanced-grid" data-count="${data.stats.length}">
              ${statsHTML}
            </div>
          </div>
        </div>
      </header>

      <!-- INTRODUCTORY SECTION -->
      <section class="congress-intro-section" id="congress-intro">
        <div class="section-container">
          <div class="section-header reveal-on-scroll">
            <h2 class="section-title">Những nội dung lớn của Đại hội XIV</h2>
            <div class="title-divider"></div>
          </div>

          <div class="focus-blocks-grid balanced-grid" data-count="${data.focusBlocks.length}">
            ${focusBlocksHTML}
          </div>

          <div class="transition-text reveal-on-scroll">
            Từ những định hướng lớn của Đại hội XIV, 9 nghị quyết chiến lược được trực quan hóa dưới dạng sơ đồ tư duy tương tác, giúp người đọc dễ nắm bắt, so sánh và đi sâu vào từng lĩnh vực then chốt.
          </div>
        </div>
      </section>
    `;
  }

  function generateSolarSystemHTML() {
    const data = RESOLUTIONS_DATA;
    const n = data.length;
    const cx = 50, cy = 50;
    const rx = 44, ry = 44;

    const positions = data.map((_, i) => {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      return {
        x: cx + rx * Math.cos(angle),
        y: cy + ry * Math.sin(angle)
      };
    });

    let nodesHTML = '';
    positions.forEach((pos, i) => {
      const res = data[i];
      nodesHTML += `
        <div class="node-wrapper" style="left: ${pos.x}%; top: ${pos.y}%;">
          <div class="node-content-animator">
            <div class="resolution-node interactive-surface" style="--node-color: ${res.color};"
                 role="button" tabindex="0" 
                 aria-label="${res.number}: ${res.shortTitle}"
                 onclick="APP.navigateTo('#/nghi-quyet/${res.id}')"
                 onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();APP.navigateTo('#/nghi-quyet/${res.id}');}">
              <div class="node-inner" style="background: radial-gradient(circle at 35% 35%, ${res.colorLight} 0%, ${res.color}22 100%); border-color: ${res.color}88; box-shadow: 0 0 15px ${res.colorGlow};">
                <div class="node-number-big" style="color: ${res.color}; text-shadow: 0 2px 10px ${res.colorLight};">${res.number.replace('-NQ/TW', '')}</div>
                <div class="node-title-small">${res.shortTitle}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    return `
      <div class="solar-system">
        <svg class="mindmap-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style="position:absolute; width:100%; height:100%; top:0; left:0; pointer-events:none;">
          <defs>
            <radialGradient id="centerGrad" cx="30%" cy="30%">
              <stop offset="0%" stop-color="rgba(255,255,255,0.1)"/>
              <stop offset="100%" stop-color="rgba(0,0,0,0.2)"/>
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" r="44%" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.3" stroke-dasharray="4 4" />
        </svg>
        ${nodesHTML}
      </div>
      <div class="mindmap-center-node" style="z-index: 20; position: relative; overflow: hidden;">
        <div class="center-flags-bg" style="position: absolute; inset: 0; opacity: 0.35; display: flex; align-items: center; justify-content: center; transform: scale(1.6); pointer-events: none;">
          <!-- Vietnam Flag (Star stylized) -->
          <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; fill: #FFD700;">
             <polygon points="50,15 61,38 86,38 66,54 74,78 50,62 26,78 34,54 14,38 39,38"/>
          </svg>
        </div>
        <div class="center-content-wrapper" style="position: relative; z-index: 2;">
          <div class="center-text" style="color: #ffffff; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">ĐẠI HỘI XIV</div>
          <div class="center-sub" style="color: rgba(255,255,255,0.9); text-shadow: 0 1px 5px rgba(0,0,0,0.4);">Kỷ nguyên văn minh</div>
        </div>
      </div>
    `;
  }

  function renderMindMapDesktop() {
    const canvas = document.getElementById('mindmap-canvas');
    if (!canvas) return;
    canvas.innerHTML = generateSolarSystemHTML();
  }


  function generateMobileMindMapHTML() {
    return RESOLUTIONS_DATA.map(res => `
      <div class="resolution-card interactive-surface"
           style="--card-color: ${res.color};"
           onclick="APP.navigateTo('#/nghi-quyet/${res.id}')"
           role="button" tabindex="0"
           onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();APP.navigateTo('#/nghi-quyet/${res.id}');}">
        <div class="card-icon-wrap" style="background:${res.colorLight};color:${res.color};">
          ${res.icon}
        </div>
        <div class="card-body">
          <div class="card-num" style="color:${res.color};">${res.number}</div>
          <div class="card-title">${res.shortTitle}</div>
        </div>
        <div class="card-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </div>
    `).join('');
  }

  // â”€â”€ Mind Map Mobile â”€â”€
  function renderMindMapMobile() {
    const el = document.getElementById('mindmap-mobile');
    if (!el) return;
    el.innerHTML = generateMobileMindMapHTML();
  }

  // â”€â”€ Show / Hide Pages â”€â”€
  function transitionPage(pageOut, pageIn, isForward, updateDOMCallback, morphNode) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function doSwitch() {
      if (updateDOMCallback) updateDOMCallback();
      if (!pageOut.classList.contains('hidden')) {
        pageOut.classList.add('hidden');
        pageOut.classList.remove('active');
        pageOut.style.transform = '';
        pageOut.style.opacity = '';
        pageOut.style.pointerEvents = '';
      }
      if (pageIn.classList.contains('hidden')) {
        pageIn.classList.remove('hidden');
        pageIn.classList.add('active');
        pageIn.style.transform = '';
        pageIn.style.opacity = '';
        pageIn.style.pointerEvents = 'auto';
      }
      setTimeout(() => {
        document.querySelectorAll('.vt-active-node').forEach(el => el.classList.remove('vt-active-node'));
        document.documentElement.classList.remove('vt-slide-forward', 'vt-slide-backward');
        window.isTransitioning = false;
        document.body.classList.remove('is-transitioning');
        observeNewRevealElements();
        initAutoCounters();
      }, 800);
    }

    window.isTransitioning = true;
    document.body.classList.add('is-transitioning');

    // 1. View Transitions API (Modern Browsers)
    if (!prefersReducedMotion && document.startViewTransition) {
      document.startViewTransition(() => {
        doSwitch();
      });
      return;
    }

    // 2. Manual FLIP Morph Fallback (If VT API is not supported, and we are morphing from a node)
    if (morphNode && !prefersReducedMotion) {
      const sourceRect = morphNode.getBoundingClientRect();
      const clone = morphNode.cloneNode(true);
      clone.classList.add('flip-morph-clone');
      clone.style.left = sourceRect.left + 'px';
      clone.style.top = sourceRect.top + 'px';
      clone.style.width = sourceRect.width + 'px';
      clone.style.height = sourceRect.height + 'px';
      document.body.appendChild(clone);

      pageOut.style.opacity = '0.3';
      pageOut.style.filter = 'blur(8px)';
      pageOut.style.transition = 'opacity 0.2s ease, filter 0.2s ease';

      setTimeout(() => {
        if (updateDOMCallback) updateDOMCallback();
        pageIn.style.opacity = '0';
        pageIn.style.filter = 'blur(0)';
        void pageIn.offsetWidth;

        const targetHero = document.querySelector('.vt-active-hero');
        const targetRect = targetHero ? targetHero.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: 300 };

        clone.classList.add('animating');
        clone.style.transform = `translate(${targetRect.left - sourceRect.left}px, ${targetRect.top - sourceRect.top}px) scaleX(${targetRect.width / sourceRect.width}) scaleY(${targetRect.height / sourceRect.height})`;
        clone.style.borderRadius = '0';
        clone.style.opacity = '0';

        pageIn.style.transition = 'opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1)';
        pageIn.style.opacity = '1';

        setTimeout(() => {
          if (clone.parentNode) clone.parentNode.removeChild(clone);
          doSwitch(); // cleanup
        }, 720);
      }, 150);
      return;
    }

    // 3. Standard Fallback (Slide or Fade)
    if (updateDOMCallback) updateDOMCallback();
    
    if (pageOut === pageIn) {
      pageIn.style.opacity = '0';
      void pageIn.offsetWidth;
      pageIn.style.transition = 'opacity 0.3s ease';
      pageIn.style.opacity = '1';
      doSwitch();
      return;
    }

    const duration = '0.5s';
    const easing = 'cubic-bezier(0.32, 0.72, 0, 1)'; 
    
    pageOut.style.transition = `transform ${duration} ${easing}, opacity ${duration} ease`;
    pageOut.style.transform = isForward ? 'scale(0.92)' : 'scale(0.85)';
    pageOut.style.opacity = '0';
    pageOut.style.pointerEvents = 'none';
    
    pageIn.classList.remove('hidden');
    pageIn.classList.add('active');
    pageIn.style.transition = 'none';
    pageIn.style.transform = isForward ? 'scale(0.85)' : 'scale(0.92)';
    pageIn.style.opacity = '0';
    pageIn.style.pointerEvents = 'auto';
    
    void pageIn.offsetWidth;
    
    pageIn.style.transition = `transform ${duration} ${easing}, opacity 0.4s ease-out`;
    pageIn.style.transform = 'scale(1)';
    pageIn.style.opacity = '1';
    
    setTimeout(() => {
      pageOut.classList.add('hidden');
      pageOut.classList.remove('active');
      pageOut.style.transform = '';
      pageOut.style.opacity = '';
      pageOut.style.pointerEvents = '';
      doSwitch();
    }, 550);
  }

  function showHomePage() {
    const home = document.getElementById('page-home');
    const detail = document.getElementById('page-detail');
    
    document.title = 'Đại hội XIV – 9 Nghị quyết chiến lược | E-Magazine';
    currentResolutionId = null;

    if (detail.classList.contains('active')) {
      transitionPage(detail, home, false);
    } else {
      home.classList.remove('hidden');
      home.classList.add('active');
    }
    setTimeout(onScrollReveal, 150);
  }

  function showDetailPage(id) {
    const res = RESOLUTIONS_DATA.find(r => r.id === id);
    if (!res) { showHomePage(); return; }

    currentResolutionId = id;
    const idx = RESOLUTIONS_DATA.findIndex(r => r.id === id);
    const prev = idx > 0 ? RESOLUTIONS_DATA[idx - 1] : null;
    const next = idx < RESOLUTIONS_DATA.length - 1 ? RESOLUTIONS_DATA[idx + 1] : null;

    const home = document.getElementById('page-home');
    const detail = document.getElementById('page-detail');

    // Advanced Morphing & Slide Routing
    let morphNode = null;
    let isSlide = false;
    let slideDirection = 'forward';

    if (window._lastClickContext && window._lastClickContext.type === 'node') {
      morphNode = window._lastClickContext.element;
    } else if (window._lastClickContext && window._lastClickContext.type === 'next') {
      isSlide = true;
      slideDirection = 'forward';
    } else if (window._lastClickContext && window._lastClickContext.type === 'prev') {
      isSlide = true;
      slideDirection = 'backward';
    } else {
      // Fallback if not clicked via tracking (e.g. initial load or programmatic navigation)
      const activeContainer = home.classList.contains('active') ? home : detail;
      morphNode = activeContainer.querySelector(`.resolution-node[onclick*="'#/nghi-quyet/${id}'"], .resolution-card[onclick*="'#/nghi-quyet/${id}'"]`);
    }

    if (morphNode) {
      morphNode.classList.add('vt-active-node');
    }
    
    if (isSlide) {
      document.documentElement.classList.add(`vt-slide-${slideDirection}`);
    }

    const updateDOM = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      detail.innerHTML = buildDetailHTML(res, idx, prev, next);
      if (id === '57' || id === '59') setTimeout(() => initParticles(res.color), 100);
    };

    if (home.classList.contains('active')) {
      transitionPage(home, detail, true, updateDOM, morphNode);
    } else {
      transitionPage(detail, detail, true, updateDOM, morphNode); // switching between details
    }

    document.title = `${res.number}: ${res.shortTitle} | E-Magazine Đại hội XIV`;
    // Detail scroll progress
    const bar = document.getElementById('dp-scroll-bar');
    window.addEventListener('scroll', function detailScroll() {
      if (bar) bar.style.width = getScrollPercent() + '%';
      
      const backToTop = document.getElementById('backToTopBtn');
      if (backToTop) {
        if (window.scrollY > 500) {
          backToTop.style.opacity = '1';
          backToTop.style.pointerEvents = 'auto';
        } else {
          backToTop.style.opacity = '0';
          backToTop.style.pointerEvents = 'none';
        }
      }
    }, { passive: true });

    setTimeout(onScrollReveal, 200);
    setTimeout(() => {
      observeNewRevealElements();
      // Immediately reveal above-fold elements
      detail.querySelectorAll('.reveal-on-scroll').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add('revealed');
      });
    }, 250);
  }

  // â”€â”€ Build Detail Page HTML â”€â”€
  
  // Particles for NQ57
  function initParticles(hexColor) {
    const canvas = document.getElementById('particles-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Convert hex to rgb
    let r = 0, g = 150, b = 255;
    if (hexColor && hexColor.startsWith('#')) {
      r = parseInt(hexColor.slice(1,3), 16) || 0;
      g = parseInt(hexColor.slice(3,5), 16) || 150;
      b = parseInt(hexColor.slice(5,7), 16) || 255;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    for(let i=0; i<80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2
      });
    }

    function draw() {
      if(!document.getElementById('particles-bg')) return; // Exit if page changed
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for(let i=0; i<particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.4)`;
        ctx.fill();

        for(let j=i+1; j<particles.length; j++) {
          let p2 = particles[j];
          let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if(dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.15 * (1 - dist/100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  
  // Global Network Particles for NQ59
  function initGlobalParticles() {
    const canvas = document.getElementById('particles-bg-59');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let nodes = [];
    for(let i=0; i<40; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 3 + 1
      });
    }

    function draw() {
      if(!document.getElementById('particles-bg-59')) return; // Exit if page changed
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for(let i=0; i<nodes.length; i++) {
        let p = nodes[i];
        p.x += p.vx;
        p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 105, 92, 0.6)';
        ctx.fill();

        for(let j=i+1; j<nodes.length; j++) {
          let p2 = nodes[j];
          let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if(dist < 200) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            // Draw curved flight paths
            ctx.quadraticCurveTo(p.x + (p2.x - p.x)/2, p.y - 50, p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 105, 92, ${0.15 * (1 - dist/200)})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  
  // Particles for NQ59 - Globe/Network
  function initGlobeParticles() {
    const canvas = document.getElementById('globe-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let nodes = [];
    let numNodes = window.innerWidth < 768 ? 40 : 80;
    
    for(let i=0; i<numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1
      });
    }

    function drawGlobe() {
      if(!document.getElementById('globe-particles')) return; // Exit if page changed
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for(let i=0; i<nodes.length; i++) {
        let p = nodes[i];
        p.x += p.vx;
        p.y += p.vy;
        
        if(p.x < 0) p.x = canvas.width;
        if(p.x > canvas.width) p.x = 0;
        if(p.y < 0) p.y = canvas.height;
        if(p.y > canvas.height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 170, 0.6)';
        ctx.fill();

        for(let j=i+1; j<nodes.length; j++) {
          let p2 = nodes[j];
          let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if(dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            // Draw a subtle curve to simulate globe surface
            ctx.quadraticCurveTo(p.x + (p2.x - p.x)/2, p.y - 20, p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 170, ${0.15 * (1 - dist/120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawGlobe);
    }
    drawGlobe();
  }

  function buildDetailHTML(res, idx, prev, next) {
    const hasDate = res.date && res.date !== '2025' && res.date !== '2026';

    let introHTML = '';
    if (res.intro) {
      introHTML = `
        <div class="content-section reveal-on-scroll">
          <div class="resolution-intro" style="font-size:1.1rem; line-height:1.8; color:var(--clr-text); border-left: 4px solid ${res.color}; padding-left: 20px; margin-bottom: 30px; background: var(--glass-bg); padding: 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
            ${res.intro}
          </div>
        </div>
        ${buildInlineImage(res, 'intro')}
      `;
    }

    let contextHTML = '';
    if (res.context) {
      contextHTML = `
        <div class="content-section reveal-on-scroll">
          <div class="glass-context-box" style="--card-color: ${res.color};">
            <h2 class="glass-context-title">
              <span class="section-icon">📖</span>Bối cảnh ra đời
            </h2>
            <div class="glass-context-text">
              ${res.context}
            </div>
          </div>
        </div>
      `;
    }

    let coreIdeasHTML = '';
    if (res.coreIdeas && res.coreIdeas.length > 0) {
      coreIdeasHTML = `
        <div class="content-section reveal-on-scroll">
          <h2 class="content-section-title">
            <span class="section-icon">💡</span>Tinh thần cốt lõi
          </h2>
          <div class="glass-summary-grid balanced-grid" data-count="${res.coreIdeas.length}">
            ${res.coreIdeas.map((idea, i) => `
              <div class="glass-summary-card reveal-on-scroll" style="--card-color: ${res.color}; transition-delay: ${i*50}ms;">
                <div class="glass-summary-num">${i + 1}</div>
                <div class="glass-summary-text">${idea}</div>
              </div>
            `).join('')}
          </div>
        </div>
        ${buildInlineImage(res, 'coreIdeas')}
      `;
    }

    let generalGoalsHTML = '';
    if (res.generalGoals && res.generalGoals.length > 0) {
      generalGoalsHTML = `
        <div class="content-section reveal-on-scroll">
          <h2 class="content-section-title">
            <span class="section-icon">🎯</span>Mục tiêu tổng quát
          </h2>
          <div class="glass-pillar-grid balanced-grid" data-count="${res.generalGoals.length}">
            ${res.generalGoals.map((b, i) => `
              <div class="glass-pillar-card reveal-on-scroll" style="--card-color: ${res.color}; transition-delay: ${i*80}ms;">
                <div class="glass-pillar-icon" style="color: ${res.color};">${b.icon || 'ðŸŽ¯'}</div>
                <h3 class="glass-pillar-title">${b.title}</h3>
                <p class="glass-pillar-desc">${b.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
        ${buildInlineImage(res, 'generalGoals')}
      `;
    }

    let infographicBlocksHTML = '';
    if (res.infographicBlocks && res.infographicBlocks.length > 0) {
      infographicBlocksHTML = `
        <div class="content-section reveal-on-scroll">
          <h2 class="content-section-title">
            <span class="section-icon">✨</span>Điểm nhấn chiến lược
          </h2>
          <div class="glass-pillar-grid balanced-grid" data-count="${res.infographicBlocks.length}">
            ${res.infographicBlocks.map((b, i) => `
              <div class="glass-pillar-card reveal-on-scroll" style="--card-color: ${res.color}; transition-delay: ${i*80}ms;">
                ${b.image ? `<img src="${b.image}" alt="${b.title}" style="width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:var(--r-md); margin-bottom:1.5rem; border:1px solid rgba(0,0,0,0.05);">` : ''}
                <h3 class="glass-pillar-title">${b.title}</h3>
                <p class="glass-pillar-desc">${b.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
        ${buildInlineImage(res, 'infographicBlocks')}
      `;
    }

    let goalsHTML = '';
    if (res.goals2030 && res.goals2030.length > 0) {
      // Logic to choose between radial cards (if many % signs) or stat cards
      const hasPercentages = res.goals2030.some(g => g.value.includes('%'));
      
      let innerHTML = '';
      if (hasPercentages && res.id === "57") { // Keep radial for 57 to ensure we don't break logic, but we can do it for any
        innerHTML = `<div class="glass-radial-grid balanced-grid" data-count="${res.goals2030.length}">
          ${res.goals2030.map((g, i) => {
            let percentage = 100;
            if (g.value.includes('30%')) percentage = 30;
            else if (g.value.includes('50%')) percentage = 50;
            else if (g.value.includes('55%')) percentage = 55;
            else if (g.value.includes('80%')) percentage = 80;
            else if (g.value.includes('2%')) percentage = 25;
            let circumference = 2 * Math.PI * 45;
            let offset = circumference - (percentage / 100) * circumference;
            return `
              <div class="glass-radial-card reveal-on-scroll" style="--card-color: ${res.color}; transition-delay: ${i*50}ms;">
                <div class="glass-radial-circle">
                  <svg viewBox="0 0 100 100">
                    <circle class="glass-radial-bg" cx="50" cy="50" r="45"></circle>
                    <circle class="glass-radial-progress" cx="50" cy="50" r="45" style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};"></circle>
                  </svg>
                  <div class="glass-radial-value auto-counter" data-raw-text="${g.value}">${g.value}</div>
                </div>
                <div class="glass-radial-label">${g.label}</div>
                <div class="glass-stat-desc" style="margin-top:0.5rem;">${g.description}</div>
              </div>
            `;
          }).join('')}
        </div>`;
      } else {
        innerHTML = `<div class="glass-stat-grid balanced-grid" data-count="${res.goals2030.length}">
          ${res.goals2030.map((g, i) => `
            <div class="glass-stat-card reveal-on-scroll" style="--card-color: ${res.color}; transition-delay: ${i*60}ms;">
              <div class="glass-stat-value auto-counter" data-raw-text="${g.value}">${g.value}</div>
              <div class="glass-stat-label">${g.label}</div>
              <div class="glass-stat-desc">${g.description}</div>
            </div>
          `).join('')}
        </div>`;
      }
      
      goalsHTML = `
        <div class="content-section reveal-on-scroll">
          <h2 class="content-section-title">
            <span class="section-icon">⏳</span>Mục tiêu đến năm 2030
          </h2>
          ${innerHTML}
        </div>
        ${buildInlineImage(res, 'goals2030')}
      `;
    }

    let visionHTML = '';
    if (res.vision2045 && res.vision2045.length > 0) {
      visionHTML = `
        <div class="content-section reveal-on-scroll">
          <h2 class="content-section-title">
            <span class="section-icon">🔭</span>Tầm nhìn đến năm 2045
          </h2>
          <div class="glass-timeline">
            ${res.vision2045.map((v, i) => `
              <div class="glass-timeline-item reveal-on-scroll" style="--card-color: ${res.color}; transition-delay: ${i*70}ms;">
                <div class="glass-timeline-dot"></div>
                <div class="glass-timeline-content">
                  <div class="glass-timeline-desc">${v}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        ${buildInlineImage(res, 'vision2045')}
      `;
    }

    let tasksHTML = '';
    let tasksData = res.tasks || res.tasksList || [];
    if (tasksData.length > 0) {
      tasksHTML = `
        <div class="content-section reveal-on-scroll">
          <h2 class="content-section-title">
            <span class="section-icon">⚙️</span>Nhiệm vụ và giải pháp chủ yếu
          </h2>
          <div class="glass-timeline">
            ${tasksData.map((t, i) => {
              if (typeof t === 'string') {
                return `
                  <div class="glass-timeline-item reveal-on-scroll" style="--card-color: ${res.color}; transition-delay: ${(i%5)*60}ms;">
                    <div class="glass-timeline-dot"></div>
                    <div class="glass-timeline-content">
                      <div class="glass-timeline-desc">${t}</div>
                    </div>
                  </div>
                `;
              } else {
                return `
                  <div class="glass-timeline-item reveal-on-scroll" style="--card-color: ${res.color}; transition-delay: ${(i%5)*60}ms;">
                    <div class="glass-timeline-dot"></div>
                    <div class="glass-timeline-content">
                      <h3 class="glass-timeline-title">${t.title}</h3>
                      <div class="glass-timeline-desc">${t.description}</div>
                    </div>
                  </div>
                `;
              }
            }).join('')}
          </div>
        </div>
        ${buildInlineImage(res, 'tasksList')}
        ${buildInlineImage(res, 'tasks')}
      `;
    }

    let newPointsHTML = '';
    if (res.newPoints && res.newPoints.length > 0) {
      newPointsHTML = `
        <div class="content-section reveal-on-scroll" style="margin-top: 3rem;">
          <h2 class="content-section-title" style="color: #FFB300;">
            <span class="section-icon">✨</span>Điểm mới đột pháÃ¡
          </h2>
          <div class="glass-summary-grid balanced-grid" data-count="${res.newPoints.length}">
            ${res.newPoints.map((point, i) => `
              <div class="glass-highlight-card reveal-on-scroll" style="transition-delay: ${i*50}ms;">
                <div class="glass-highlight-badge">NEW</div>
                <div class="glass-highlight-text">${point}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    let practicalHTML = '';
    if (res.practicalApplication && res.practicalApplication.length > 0) {
      practicalHTML = `
        <div class="content-section reveal-on-scroll" style="margin-top: 3rem; background: linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%); padding: 2.5rem; border-radius: var(--radius-lg); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);">
          <h2 class="content-section-title" style="color: #4CAF50;">
            <span class="section-icon">👮</span>Hành động của Lực lượng CSND
          </h2>
          <div class="glass-pillar-grid balanced-grid" data-count="${res.practicalApplication.length}">
            ${res.practicalApplication.map((action, i) => `
              <div class="glass-action-card reveal-on-scroll" style="transition-delay: ${i*80}ms;">
                <div class="glass-action-icon">âœ”ï¸</div>
                <div class="glass-action-text">${action}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    
    let csndHTML = '';
    if (res.csndApplication) {
      csndHTML = `
        <div class="content-section reveal-on-scroll" style="margin-top: 3.5rem; background: linear-gradient(135deg, rgba(30, 60, 114, 0.2) 0%, rgba(42, 82, 152, 0.1) 100%); padding: 2.5rem; border-radius: var(--radius-lg); border: 1px solid rgba(100, 150, 255, 0.3); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); position: relative; overflow: hidden;">
          <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: var(--gold-color); opacity: 0.1; filter: blur(50px); border-radius: 50%;"></div>
          
          <h2 class="content-section-title" style="color: var(--gold-color); margin-bottom: 0.5rem; text-shadow: 0 2px 10px rgba(255, 215, 0, 0.2); font-size: 1.8rem;">
            <span class="section-icon" style="background: rgba(255, 255, 255, 0.8); padding: 4px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; width: 50px; height: 50px; margin-right: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);"><img src="https://upload.wikimedia.org/wikipedia/vi/c/c5/Logo_dai_hoc_CSNDấu ấn Trường Đại học CSND
          </h2>
          <p style="color: rgba(255,255,255,0.85); font-size: 1.1rem; margin-bottom: 2rem; padding-left: 60px; font-style: italic;">Từ nghị quyết của Đảng đến đào tạo, nghiên cứu và xây dựng người cán bộ Cảnh sát nhân dân</p>
          
          <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: rgba(0,0,0,0.3); border-left: 4px solid var(--gold-color); border-radius: 0 var(--radius-md) var(--radius-md) 0;">
            <p style="font-size: 1.15rem; line-height: 1.7; margin-bottom: 1rem;">${res.csndApplication.intro}</p>
            <p style="font-size: 1.25rem; font-weight: 600; color: #4CAF50; line-height: 1.6; text-shadow: 0 1px 5px rgba(0,0,0,0.5);"><em>"${res.csndApplication.slogan}"</em></p>
          </div>

          <div class="glass-pillar-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
            ${res.csndApplication.cards.map((card, i) => `
              <div class="glass-action-card reveal-on-scroll" style="transition-delay: ${i*100}ms; background: rgba(255,255,255,0.05); border-top: 2px solid ${i===0 ? '#4CAF50' : i===1 ? '#2196F3' : '#FF9800'}; padding: 1.5rem; height: 100%; display: flex; flex-direction: column;">
                <div style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
                  <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.1); font-size: 0.9rem;">${i+1}</span>
                  ${card.title}
                </div>
                <div style="color: rgba(255,255,255,0.8); line-height: 1.6; flex-grow: 1;">${card.desc}</div>
              </div>
            `).join('')}
          </div>

          <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px dashed rgba(255,255,255,0.2);">
            <p style="font-size: 1.15rem; font-weight: 500; color: #fff; line-height: 1.8; max-width: 900px; margin: 0 auto;">
              "Náº¿u cÃ¡c Ä‘Æ¡n vá»‹ chiáº¿n Ä‘áº¥u trá»±c tiáº¿p cá»¥ thá»ƒ hÃ³a nghá»‹ quyáº¿t báº±ng chiáº¿n cÃ´ng, mÃ´ hÃ¬nh vÃ  káº¿t quáº£ trÃªn Ä‘á»‹a bÃ n, thÃ¬ <span style="color: var(--gold-color);">TrÆ°á»ng Äáº¡i há»c CSND</span> cá»¥ thá»ƒ hÃ³a nghá»‹ quyáº¿t báº±ng viá»‡c Ä‘Ã o táº¡o nÃªn nhá»¯ng cÃ¡n bá»™ Cáº£nh sÃ¡t nhÃ¢n dÃ¢n cÃ³ <span style="color: #4CAF50;">báº£n lÄ©nh chÃ­nh trá»‹ vá»¯ng vÃ ng, phÃ¡p luáº­t vá»¯ng cháº¯c, nghiá»‡p vá»¥ tinh thÃ´ng, cÃ´ng nghá»‡ thÃ nh tháº¡o vÃ  vÄƒn hÃ³a á»©ng xá»­ nhÃ¢n vÄƒn, vÃ¬ NhÃ¢n dÃ¢n phá»¥c vá»¥.</span>"
            </p>
          </div>
        </div>
      `;
    }

    let quotesHTML = '';
    if (res.quoteBlocks && res.quoteBlocks.length > 0) {
      quotesHTML = `
        <div class="content-section reveal-on-scroll">
          <h2 class="content-section-title">
            <span class="section-icon">🎙️</span>Phát biểu nổi bật
          </h2>
          <div>
            ${res.quoteBlocks.map((q, i) => `
              <div class="glass-impact-card reveal-on-scroll" style="--card-color: ${res.color}; transition-delay: ${i*50}ms;">
                <div class="glass-impact-text">${q.quote}</div>
                <div class="glass-impact-speaker">${q.speaker}${q.context ? `<br><span style="font-size:0.85em; font-weight:normal; opacity:0.8;">${q.context}</span>` : ''}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return `
      <div class="detail-page">
        ${res.id === "57" ? '<canvas id="particles-bg"></canvas>' : ''}
        ${res.id === "59" ? '<canvas id="globe-particles"></canvas><canvas id="particles-bg-59" class="particles-canvas"></canvas>' : ''}
        
        <!-- iOS Style Floating Close Button -->
        <button class="ios-close-btn interactive-surface tooltip-target" aria-label="ÄÃ³ng" onclick="APP.navigateTo('#/')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div id="dp-scroll-bar" class="scroll-progress-bar"></div>

        <div class="detail-hero apple-news-hero vt-active-hero" style="position:relative;">
          <div class="detail-hero-bg" style="background:${res.heroGradient};"></div>
          ${res.heroImage ? `<img src="${res.heroImage}" alt="${res.shortTitle}" class="detail-hero-img" onerror="this.style.display='none'">` : ''}
          <div class="detail-hero-overlay"></div>
          <div class="detail-hero-content">
            <div class="detail-resolution-number">${res.number}</div>
            <h1 class="detail-hero-title">${res.title}</h1>
            <p class="detail-tagline">"${res.tagline}"</p>
          </div>
        </div>

        <div class="detail-content">
          <div class="resolution-metadata reveal-on-scroll">
            <div class="meta-item">
              <span class="meta-label">Số hiệu</span>
              <span class="meta-value" style="color:${res.color};">${res.number}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Lĩnh vực</span>
              <span class="meta-value">${res.theme}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Thá»© tá»±</span>
              <span class="meta-value">${idx + 1} / 9 nghị quyết</span>
            </div>
          </div>

          <div class="detail-main detail-stagger animate-stagger">
            ${introHTML}
            ${contextHTML}
            ${coreIdeasHTML}
            ${generalGoalsHTML}
            ${infographicBlocksHTML}
            ${goalsHTML}
            ${visionHTML}
            ${tasksHTML}
            ${newPointsHTML}
            ${practicalHTML}
            ${csndHTML}
            ${quotesHTML}
          </div>
        </div>

        ${buildGalleryStrip(res)}

        <div class="discover-more-section reveal-on-scroll" style="margin-bottom: 60px;">
          <h3 class="discover-title">Khám phá các Nghị quyết</h3>
          <div class="mindmap-desktop">
            <div class="mindmap-canvas" style="position:relative; width:100%; height:680px; max-height:80vh;">
              ${generateSolarSystemHTML()}
            </div>
          </div>
          <div class="mindmap-mobile" style="margin-top: 2rem;">
            ${generateMobileMindMapHTML()}
          </div>
        </div>

        <footer class="main-footer">
          <div class="footer-content">
            <div class="footer-brand">
              <span class="footer-star">â­</span>
              <div>
                <div class="footer-title">E-magazine kết hợp với phong cách infographic số hóa</div>
                <div class="footer-subtitle">Khoa LLCT&amp;KHXHNV - Trường Đại học Cảnh sát nhân dân</div>
              </div>
            </div>
            <div class="footer-divider"></div>
            <p class="footer-desc">Sản phẩm học liệu số phục vụ giảng dạy, nghiên cứu lý luận chính trị.</p>
          </div>
        </footer>

        <!-- macOS Style Floating Navigation Dock -->
        <nav class="mac-dock-nav">
          ${prev ? `
          <button class="mac-dock-btn interactive-surface tooltip-target" aria-label="Nghị quyết trước: ${prev.number}" onclick="APP.navigateTo('#/nghi-quyet/${prev.id}')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          ` : `<div class="mac-dock-spacer"></div>`}
          
          <div class="mac-dock-divider"></div>

          <button class="mac-dock-btn home-btn interactive-surface tooltip-target" aria-label="Trở về 9 Nghị quyết" onclick="APP.navigateTo('#/')">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>

          <div class="mac-dock-divider"></div>

          ${next ? `
          <button class="mac-dock-btn interactive-surface tooltip-target" aria-label="Nghị quyết tiếp: ${next.number}" onclick="APP.navigateTo('#/nghi-quyet/${next.id}')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          ` : `<div class="mac-dock-spacer"></div>`}
          
          <div class="mac-dock-divider"></div>

          <button class="mac-dock-btn presenter-btn interactive-surface tooltip-target" aria-label="Trình chiếu" onclick="APP.togglePresenterMode()">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M4 14l8-4 8 4M4 10l8-4 8 4M12 22V14"></path>
            </svg>
          </button>

          <div class="mac-dock-divider"></div>

          <button class="mac-dock-btn back-to-top-btn interactive-surface tooltip-target" aria-label="Lên đầu trang" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" id="backToTopBtn" style="opacity: 0; pointer-events: none; transition: opacity 0.3s ease;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </nav>
      </div>
    `;
  }

function updatingNotice(label) {
    return `
      <div class="updating-notice">
        <div class="updating-notice-icon">ðŸ”„</div>
Đang cập nhật: ${label}</div>
        <div class="updating-notice-desc">Nội dung đang được bổ sung từ nguồn tài liệu chính thống.
          Chỉnh sửa trong <code>src/data/resolutions.js</code>.</div>
      </div>`;
  }

  // â”€â”€ Inline Image Builder â”€â”€
  function buildInlineImage(res, afterSection) {
    if (!res.inlineImages || res.inlineImages.length === 0) return '';
    const imgs = res.inlineImages.filter(i => i.after === afterSection);
    if (imgs.length === 0) return '';
    
    // Fallback to all inlineImages if gallery is removed
    const allImgs = (res.gallery && res.gallery.length > 0) ? res.gallery : res.inlineImages;
    
    return imgs.map(img => {
      const galleryIdx = allImgs.findIndex(i => i.src === img.src);
      return `
        <figure class="inline-figure reveal-on-scroll" style="--figure-color:${res.color};">
          <div class="inline-figure-img-wrap" ${res.id === '80' ? 'style="max-height: none;"' : ''}>
            <img src="${img.src}" alt="${img.caption}" class="inline-figure-img"
                 loading="lazy"
                 onerror="this.closest('figure').style.display='none'"
                 onclick="APP.openLightbox('${encodeURIComponent(JSON.stringify(allImgs))}', ${galleryIdx >= 0 ? galleryIdx : 0})"
                 style="cursor:zoom-in; ${res.id === '80' ? 'object-fit: contain; max-height: none; height: auto;' : ''}">
            <div class="inline-figure-zoom">ðŸ” Nhấn để phóng to</div>
          </div>
          <figcaption class="inline-figure-caption">${img.caption}</figcaption>
        </figure>
      `;
    }).join('');
  }

  // â”€â”€ Gallery Strip Builder â”€â”€
  function buildGalleryStrip(res) {
    if (!res.gallery || res.gallery.length === 0) return '';
    const allImgsJson = encodeURIComponent(JSON.stringify(res.gallery));
    return `
      <div class="content-section reveal-on-scroll">
        <h2 class="content-section-title">
          <span class="section-icon">📸</span>Thư viện ảnh minh họa
        </h2>
        <div class="gallery-strip">
          ${res.gallery.map((g, i) => `
            <figure class="gallery-item interactive-surface" onclick="APP.openLightbox('${allImgsJson}', ${i})">
              <img src="${g.src}" alt="${g.caption}" class="gallery-thumb"
                   loading="lazy" onerror="this.closest('figure').style.display='none'">
              <figcaption class="gallery-caption">${g.caption}</figcaption>
            </figure>
          `).join('')}
        </div>
      </div>`;
  }

  // â”€â”€ Lightbox â”€â”€
  let _lightboxImages = [];
  let _lightboxIdx = 0;

  function openLightbox(imgsJson, idx) {
    try {
      _lightboxImages = JSON.parse(decodeURIComponent(imgsJson));
    } catch(e) { return; }
    _lightboxIdx = idx || 0;
    _showLightboxFrame();
    const lb = document.getElementById('lightbox');
    if (lb) {
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    document.addEventListener('keydown', _lightboxKeyHandler);
  }

  function closeLightbox(e) {
    if (e && e.target !== document.getElementById('lightbox') &&
        !e.target.classList.contains('lightbox-close') &&
        !e.target.classList.contains('lightbox-prev') &&
        !e.target.classList.contains('lightbox-next')) return;
    const lb = document.getElementById('lightbox');
    if (lb) {
      lb.style.transition = 'opacity 0.22s ease';
      lb.style.opacity = '0';
      setTimeout(() => {
        lb.classList.remove('active');
        lb.style.opacity = '';
        lb.style.transition = '';
        document.body.style.overflow = '';
      }, 220);
    }
    document.removeEventListener('keydown', _lightboxKeyHandler);
    _lightboxImages = [];
  }

  function lightboxNav(dir) {
    _lightboxIdx = (_lightboxIdx + dir + _lightboxImages.length) % _lightboxImages.length;
    // Animate transition between images
    const el = document.getElementById('lightbox-img');
    if (el) {
      el.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
      el.style.opacity = '0';
      el.style.transform = dir > 0 ? 'translateX(20px)' : 'translateX(-20px)';
      setTimeout(() => {
        _showLightboxFrame();
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }, 180);
    } else {
      _showLightboxFrame();
    }
  }

  function _showLightboxFrame() {
    const img = _lightboxImages[_lightboxIdx];
    if (!img) return;
    const el = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (el) { el.src = img.src; el.alt = img.caption || ''; }
    if (cap) cap.textContent = img.caption || '';
    // hide nav arrows if single image
    const prev = document.querySelector('.lightbox-prev');
    const next = document.querySelector('.lightbox-next');
    if (prev) prev.style.display = _lightboxImages.length <= 1 ? 'none' : '';
    if (next) next.style.display = _lightboxImages.length <= 1 ? 'none' : '';
  }

  function _lightboxKeyHandler(e) {
    if (e.key === 'Escape') closeLightbox({target: document.getElementById('lightbox')});
    if (e.key === 'ArrowLeft') lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  }

  // Public API
  return { 
    init, 
    navigateTo, 
    scrollToSection, 
    openLightbox, 
    closeLightbox, 
    lightboxNav, 
    togglePresenterMode, 
    observeNewRevealElements,
    getCurrentResolutionId: () => currentResolutionId
  };
})();

// â”€â”€ Init â”€â”€
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', APP.init);
} else {
  APP.init();
}

