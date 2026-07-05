/* ============================================
   CARD-TRANSITIONS.JS — Zoom Into / Out of Cards
   ============================================ */

class CardTransitions {
  constructor(engine, nav, cursor) {
    this.engine = engine;
    this.nav = nav;
    this.cursor = cursor;
    this.savedState = null;
    this.activePage = null;
    this.activeElementId = null;
    this.backBtn = document.querySelector('.page-back');
    this.routeToElement = new Map([
      ['/reach', 'stack-web'],
      ['/work', 'stack-brand'],
      ['/genres', 'stack-packaging'],
      ['/love', 'about'],
      ['/contact', 'contact'],
    ]);
    this.elementToRoute = new Map(
      Array.from(this.routeToElement, ([route, elementId]) => [elementId, route])
    );

    // Create page overlays
    this._createOverlays();
    this._bindBackButton();
    window.addEventListener('popstate', () => this._handlePopState());
  }

  _createOverlays() {
    // Project page overlay
    this.projectOverlay = document.createElement('div');
    this.projectOverlay.className = 'page-overlay project-page';
    this.projectOverlay.id = 'project-overlay';
    this.projectOverlay.setAttribute('role', 'dialog');
    this.projectOverlay.setAttribute('aria-modal', 'true');
    document.body.appendChild(this.projectOverlay);

    // Game page overlay
    this.gameOverlay = document.createElement('div');
    this.gameOverlay.className = 'page-overlay game-page';
    this.gameOverlay.id = 'game-overlay';
    this.gameOverlay.setAttribute('role', 'dialog');
    this.gameOverlay.setAttribute('aria-modal', 'true');
    document.body.appendChild(this.gameOverlay);

    // About page overlay
    this.aboutOverlay = document.createElement('div');
    this.aboutOverlay.className = 'page-overlay about-page';
    this.aboutOverlay.id = 'about-overlay';
    this.aboutOverlay.setAttribute('role', 'dialog');
    this.aboutOverlay.setAttribute('aria-modal', 'true');
    document.body.appendChild(this.aboutOverlay);

    // Contact page overlay
    this.contactOverlay = document.createElement('div');
    this.contactOverlay.className = 'page-overlay contact-page';
    this.contactOverlay.id = 'contact-overlay';
    this.contactOverlay.setAttribute('role', 'dialog');
    this.contactOverlay.setAttribute('aria-modal', 'true');
    document.body.appendChild(this.contactOverlay);

    // Work stack overlay
    this.workStackOverlay = document.createElement('div');
    this.workStackOverlay.className = 'page-overlay work-stack-page';
    this.workStackOverlay.id = 'work-stack-overlay';
    this.workStackOverlay.setAttribute('role', 'dialog');
    this.workStackOverlay.setAttribute('aria-modal', 'true');
    document.body.appendChild(this.workStackOverlay);
  }

  _bindBackButton() {
    if (this.backBtn) {
      this.backBtn.addEventListener('click', () => this.zoomOut());
    }

    // Escape key to go back
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activePage) {
        this.zoomOut();
      }
    });
  }

  /** Open a card — determine type and open appropriate page */
  openCard(elementId, options = {}) {
    const cfg = CONFIG.elements.find(el => el.id === elementId);
    if (!cfg) return;

    if (!options.skipHistory) {
      this._writeRouteForElement(elementId, options.replaceHistory ? 'replace' : 'push');
    }

    // Save engine state
    this.savedState = this.engine.saveState();
    this.activeElementId = elementId;
    this.engine.lock();

    // Hide nav and cursor
    if (this.nav) this.nav.hide();
    if (this.cursor) this.cursor.hideForOverlay();

    switch (cfg.type) {
      case 'work-card':
        this._openProjectPage(elementId, cfg);
        break;
      case 'game-card':
        this._openGamePage(elementId, cfg);
        break;
      case 'info-card':
        if (elementId === 'about') {
          this._openAboutPage(cfg);
        } else if (elementId === 'contact') {
          this._openContactPage(cfg);
        }
        break;
      case 'work-stack':
        this._openWorkStackPage(elementId, cfg);
        break;
    }
  }

  openInitialRoute() {
    const elementId = this.routeToElement.get(this._normalizePath());
    if (!elementId) return false;

    window.history.replaceState({ elementId }, '', this._normalizePath());
    window.requestAnimationFrame(() => {
      this.openCard(elementId, { skipHistory: true });
    });
    return true;
  }

  _normalizePath(path = window.location.pathname) {
    return path.replace(/\/+$/, '') || '/';
  }

  _writeRouteForElement(elementId, mode = 'push') {
    const route = this.elementToRoute.get(elementId);
    if (!route || this._normalizePath() === route) return;

    const method = mode === 'replace' ? 'replaceState' : 'pushState';
    window.history[method]({ elementId }, '', route);
  }

  _replaceRoute(path) {
    if (this._normalizePath() !== path) {
      window.history.replaceState({}, '', path);
    }
  }

  _handlePopState() {
    const elementId = this.routeToElement.get(this._normalizePath());

    if (!elementId) {
      if (this.activePage) this.zoomOut({ skipHistory: true });
      return;
    }

    if (this.activeElementId === elementId && this.activePage) return;

    if (this.activePage) {
      this.zoomOut({ skipHistory: true });
      window.setTimeout(() => {
        this.openCard(elementId, { skipHistory: true });
      }, prefersReducedMotion() ? 0 : 460);
      return;
    }

    this.openCard(elementId, { skipHistory: true });
  }

  _openProjectPage(id, cfg) {
    const project = CONFIG.projects[id];
    if (!project) return;

    this.activePage = 'project';

    // Build project page content
    this.projectOverlay.innerHTML = `
      <div class="project-page-inner">
        <div class="project-hero">
          <span class="project-hero-category">${project.category}</span>
          <h1 class="project-hero-title">${project.title}</h1>
          <p class="project-hero-subtitle">${project.subtitle}</p>
          <p class="project-hero-year">${project.year}</p>
        </div>
        ${project.sections.map(section => {
          if (section.type === 'text') {
            return `
              <div class="project-section">
                <h2 class="project-section-heading">${section.heading}</h2>
                <p class="project-section-body">${section.body}</p>
              </div>
            `;
          } else if (section.type === 'gallery') {
            const cols = section.images.length >= 3 ? 'cols-3' : 'cols-2';
            return `
              <div class="project-section project-gallery ${cols}">
                ${section.images.map(img => {
                  if (img.src) {
                    return `
                      <div class="project-gallery-image">
                        <img src="${img.src}" alt="${img.alt}" loading="lazy">
                      </div>
                    `;
                  }
                  return `
                    <div class="project-gallery-placeholder" style="background-color: ${img.placeholder || '#eee'}">
                      ${img.alt}
                    </div>
                  `;
                }).join('')}
              </div>
            `;
          }
          return '';
        }).join('')}
        <div class="project-section" style="text-align: center; padding: var(--space-4xl) 0;">
          <p style="font-family: var(--font-hand); font-size: var(--text-lg); color: var(--color-ink-muted);">
            Made for brand stories that feel human
          </p>
        </div>
      </div>
    `;

    this._showOverlay(this.projectOverlay, project.heroColor);
    this._animateProjectContent();
  }

  _openGamePage(id, cfg) {
    this.activePage = 'game';
    const gameType = cfg.data.gameType;

    this.gameOverlay.innerHTML = `
      <div class="game-container">
        <h2 class="game-title">${cfg.data.title}</h2>
        <p class="game-subtitle">${cfg.data.subtitle}</p>
        <div class="game-canvas-wrapper">
          <canvas id="game-canvas"></canvas>
          <div class="game-completion" id="game-completion">
            <h2>Nice work!</h2>
            <p>You found my mark</p>
          </div>
        </div>
        <div class="game-toolbar" id="game-toolbar"></div>
      </div>
    `;

    this._showOverlay(this.gameOverlay);

    // Initialize game after overlay is visible
    setTimeout(() => {
      if (gameType === 'connect-dots' && typeof ConnectDots !== 'undefined') {
        new ConnectDots('game-canvas', 'game-toolbar', 'game-completion');
      } else if (gameType === 'coloring-book' && typeof ColoringBook !== 'undefined') {
        new ColoringBook('game-canvas', 'game-toolbar');
      }
    }, 600);
  }

  /** Open Naruto runner game in the game overlay (native canvas, Chrome T-Rex engine) */
  openNarutoGame() {
    this.savedState = this.engine.saveState();
    this.engine.lock();
    if (this.nav) this.nav.hide();
    if (this.cursor) this.cursor.hideForOverlay();

    this.activePage = 'game';

    this.gameOverlay.innerHTML = `
      <div class="game-container naruto-game">
        <h2 class="game-title">Naruto Runner</h2>
        <p class="game-subtitle">Press space or tap to start. Use up/down arrows to control Naruto.</p>
        <div class="naruto-runner-wrapper">
          <header id="naruto-frame" class="interstitial-wrapper">
            <div class="runner-container"></div>
          </header>
          <section id="naruto-resources" style="display:none;">
            <img id="naruto-sprite-1x" src="assets/offline-sprite-1x-naruto.png" alt="">
            <img id="naruto-sprite-2x" src="assets/offline-sprite-2x-naruto.png" alt="">
          </section>
        </div>
      </div>
    `;

    this._showOverlay(this.gameOverlay);

    // Destroy previous instance if any
    if (this._narutoGame) {
      this._narutoGame.destroy();
      this._narutoGame = null;
    }

    // Wait for overlay + images to load, then init game
    setTimeout(() => {
      const img1x = document.getElementById('naruto-sprite-1x');
      const img2x = document.getElementById('naruto-sprite-2x');
      const initGame = () => {
        if (typeof NarutoRunnerGame !== 'undefined') {
          this._narutoGame = new NarutoRunnerGame('#naruto-frame');
        }
      };
      // Ensure sprites are loaded
      if (img2x && img2x.complete) { initGame(); }
      else if (img2x) { img2x.onload = initGame; }
      else if (img1x && img1x.complete) { initGame(); }
      else if (img1x) { img1x.onload = initGame; }
    }, 600);
  }

  _openAboutPage(cfg) {
    this.activePage = 'about';
    const about = CONFIG.about;
    const proofCards = about.proofCards || [];
    const commentCards = proofCards.filter((item) => item.image.includes('/comment-'));
    const insightCards = proofCards.filter((item) => !item.image.includes('/comment-'));

    this.aboutOverlay.innerHTML = `
      <div class="about-page-inner">
        <h1 class="about-heading">${about.heading}</h1>

        <section class="about-proof about-proof--gallery" aria-label="Audience and performance proof">
          <div class="about-proof__grid">
            <h2 class="about-proof__section-title">what people say</h2>
            ${commentCards.map((item) => `
              <article class="about-proof-card about-proof-card--comment">
                <div class="about-proof-card__media">
                  <img src="${item.image}" alt="${item.alt}" loading="lazy" draggable="false">
                </div>
              </article>
            `).join('')}
            <h2 class="about-proof__section-title about-proof__section-title--numbers">the numbers don't lie</h2>
            ${insightCards.map((item) => `
              <article class="about-proof-card about-proof-card--insight">
                <div class="about-proof-card__media">
                  <img src="${item.image}" alt="${item.alt}" loading="lazy" draggable="false">
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      </div>
    `;

    this._showOverlay(this.aboutOverlay);
    this._animateAboutContent();
  }

  _openContactPage(cfg) {
    this.activePage = 'contact';
    const contact = CONFIG.contact;

    this.contactOverlay.innerHTML = `
      <div class="contact-inner">
        <h1 class="contact-statement">${contact.statement}</h1>
        <a class="contact-email" href="mailto:${contact.email}">${contact.email}</a>
        <div class="contact-social">
          ${contact.social.map(s => `
            <a
              class="dock-link contact-social__link contact-social__link--${s.icon || s.platform.toLowerCase()}"
              href="${s.url}"
              ${s.url.startsWith('mailto:') ? '' : 'target="_blank" rel="noopener"'}
              aria-label="${s.platform}"
              title="${s.platform}"
            >
              ${this._renderSocialIcon(s.icon || s.platform)}
              <span>${s.platform}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;

    this._showOverlay(this.contactOverlay);
    this._animateContactContent();
  }

  _renderSocialIcon(icon) {
    const key = String(icon || '').toLowerCase();
    if (key === 'instagram') {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Zm5.05-2.45a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z"/>
        </svg>
      `;
    }
    if (key === 'x' || key === 'twitter') {
      return `
        <svg viewBox="-2 -2 28 28" aria-hidden="true" focusable="false">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.293 19.491h2.039L6.486 3.24H4.298l13.31 17.404Z"/>
        </svg>
      `;
    }
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4.25 5h15.5A2.25 2.25 0 0 1 22 7.25v9.5A2.25 2.25 0 0 1 19.75 19H4.25A2.25 2.25 0 0 1 2 16.75v-9.5A2.25 2.25 0 0 1 4.25 5Zm0 2A.25.25 0 0 0 4 7.25v.38l8 5.07 8-5.07v-.38a.25.25 0 0 0-.25-.25H4.25Zm15.5 10a.25.25 0 0 0 .25-.25V9.99l-7.46 4.72a1 1 0 0 1-1.08 0L4 9.99v6.76a.25.25 0 0 0 .25.25h15.5Z"/>
      </svg>
    `;
  }

  // ── Work Stack Pages ──

  _openWorkStackPage(id, cfg) {
    const stackType = cfg.data.stackType;
    if (stackType === 'reach') {
      this._openReachPage(cfg);
    } else if (stackType === 'brands') {
      this._openBrandsPage(cfg);
    } else if (stackType === 'genres') {
      this._openGenresPage(cfg);
    } else {
      this._openComingSoonOverlay(cfg.data.stackName);
    }
  }

  _openReachPage(cfg) {
    this.activePage = 'work-stack';
    const metrics = CONFIG.creator.reachMetrics;
    const colors = ['#F8C614', '#EA89B9', '#6CC2EA', '#A0D4A6'];

    this.workStackOverlay.className = 'page-overlay creator-kit-page';
    this.workStackOverlay.innerHTML = `
      <div class="creator-kit creator-kit--reach">
        <header class="creator-kit__header">
          <h2 class="creator-kit__title">${cfg.data.stackName}</h2>
        </header>
        <div class="creator-reach-board" aria-label="Reach and audience scrapbook">
          <img class="creator-reach-board__folder creator-reach-board__folder--lime" src="assets/anu/folders/folder-lime.png" alt="" loading="lazy" draggable="false">
          <img class="creator-reach-board__sticker creator-reach-board__sticker--camera" src="assets/anu/reach-stickers/reach-camera.png" alt="" loading="lazy" draggable="false">
          <img class="creator-reach-board__sticker creator-reach-board__sticker--cozy" src="assets/anu/reach-stickers/reach-cozy.png" alt="" loading="lazy" draggable="false">
          <div class="creator-metrics creator-metrics--scrapbook">
            ${metrics.map((item, index) => `
              <article class="creator-metric creator-metric--sticker" style="--metric-color: ${colors[index % colors.length]}; --metric-tilt: ${index % 2 ? '1.25deg' : '-1.25deg'};">
                <span class="creator-metric__stamp">0${index + 1}</span>
                <span class="creator-metric__value">${item.value}</span>
                <h3 class="creator-metric__label">${item.label}</h3>
                <p>${item.note}</p>
              </article>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this._showOverlay(this.workStackOverlay);
    this._animateCreatorKit();
  }

  _openBrandsPage(cfg) {
    this.activePage = 'work-stack';
    const logoDomains = CONFIG.creator.brandLogoDomains || {};
    const brands = CONFIG.creator.brandPartners.map((name) => ({
      name,
      domain: logoDomains[name],
      initials: this._getBrandInitials(name),
    }));

    this.workStackOverlay.className = 'page-overlay creator-kit-page';
    this.workStackOverlay.innerHTML = `
      <div class="creator-kit">
        <header class="creator-kit__header">
          <p class="creator-kit__eyebrow">Partnership experience</p>
          <h2 class="creator-kit__title">${cfg.data.stackName}</h2>
          <p class="creator-kit__intro">${brands.length} brands, arranged by broad mainstream recognition.</p>
        </header>
        <div class="creator-brand-grid creator-brand-grid--logos" aria-label="Brand collaboration logo grid">
          ${brands.map((brand, index) => `
            <article class="creator-brand-logo-card" style="--brand-rank: ${index + 1}">
              <div class="creator-brand-logo-card__mark" aria-hidden="true">
                <span class="creator-brand-logo-card__fallback">${brand.initials}</span>
                ${brand.domain ? `
                  <img
                    src="${this._getBrandLogoUrl(brand.domain)}"
                    alt=""
                    loading="lazy"
                    referrerpolicy="no-referrer"
                    onload="if (this.naturalWidth < 64 || this.naturalHeight < 64) this.closest('.creator-brand-logo-card').classList.add('creator-brand-logo-card--fallback')"
                    onerror="this.closest('.creator-brand-logo-card').classList.add('creator-brand-logo-card--fallback')"
                  >
                ` : ''}
              </div>
              <h3>${this._escapeHtml(brand.name)}</h3>
            </article>
          `).join('')}
        </div>
      </div>
    `;

    this._showOverlay(this.workStackOverlay);
    this._animateCreatorKit();
  }

  _getBrandLogoUrl(domain) {
    return `https://www.google.com/s2/favicons?sz=128&domain=${encodeURIComponent(domain)}`;
  }

  _getBrandInitials(name) {
    return name
      .replace(/&/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }

  _escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  _openGenresPage(cfg) {
    this.activePage = 'work-stack';
    const genres = CONFIG.creator.reelGenres;

    this.workStackOverlay.className = 'page-overlay creator-kit-page';
    this.workStackOverlay.innerHTML = `
      <div class="creator-kit creator-kit--genres">
        <header class="creator-kit__header">
          <h2 class="creator-kit__title">${cfg.data.stackName}</h2>
        </header>
        <div class="creator-genre-list">
          ${genres.map((genre, index) => {
            const colors = ['#F8C614', '#EA89B9', '#6CC2EA', '#A0D4A6', '#F37B75'];
            const genreColor = colors[index % colors.length];
            const tilt = index % 2 === 0 ? '-1.1deg' : '1.1deg';
            return `
            <article class="creator-genre-row" aria-label="${genre.title}" style="--genre-index: ${index}; --genre-color: ${genreColor}; --genre-tilt: ${tilt};">
              ${genre.sticker ? `<img class="creator-genre-row__sticker" src="${genre.sticker}" alt="${genre.title}" loading="lazy" draggable="false">` : `<h3>${genre.title}</h3>`}
              <div class="creator-genre-row__body">
                <p>${genre.desc}</p>
                ${Array.isArray(genre.links) && genre.links.length ? `
                  <div class="creator-genre-links" aria-label="${genre.title} sample reels">
                    ${genre.links.map((url, linkIndex) => `
                      <a href="${url}" target="_blank" rel="noopener" class="creator-genre-link" aria-label="Open ${genre.title} sample ${linkIndex + 1} on Instagram">
                        <span>Watch ${String(linkIndex + 1).padStart(2, '0')}</span>
                        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M5.2 3.6 11 8l-5.8 4.4V3.6Z"/></svg>
                      </a>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            </article>
          `;
          }).join('')}
        </div>
      </div>
    `;

    this._showOverlay(this.workStackOverlay);
    this._animateCreatorKit();
  }

  _animateCreatorKit() {
    if (prefersReducedMotion()) return;
    const header = this.workStackOverlay.querySelector('.creator-kit__header');
    const cards = this.workStackOverlay.querySelectorAll('.creator-metric, .creator-brand-card, .creator-brand-logo-card, .creator-brand-name, .creator-genre-row');
    if (header) gsap.fromTo(header, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.15 });
    cards.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.25 + i * 0.06 });
    });
  }

  _openWebSlider() {
    this.activePage = 'work-stack';
    this._currentWebSlide = 0;
    const projects = CONFIG.webProjects;

    const slidesHtml = projects.map((p, i) => {
      const domain = p.url.replace(/^https?:\/\//, '');
      return `
        <div class="web-slide" data-index="${i}">
          <div class="browser-mockup">
            <div class="browser-mockup__toolbar">
              <div class="browser-mockup__dots">
                <span class="browser-mockup__dot browser-mockup__dot--red"></span>
                <span class="browser-mockup__dot browser-mockup__dot--yellow"></span>
                <span class="browser-mockup__dot browser-mockup__dot--green"></span>
              </div>
              <div class="browser-mockup__url">${domain}</div>
              <div class="browser-mockup__actions"></div>
            </div>
            <div class="browser-mockup__content" style="background-color: ${p.color}">
              <img class="browser-mockup__screenshot" src="${p.screenshot}" alt="${p.title} website screenshot" loading="lazy">
            </div>
          </div>
          <div class="web-slide__info">
            <h3 class="web-slide__title">${p.title}</h3>
            <div class="web-slide__tags">
              ${p.tags.map(t => `<span class="web-slide__tag">${t}</span>`).join('')}
            </div>
            <a class="web-slide__visit" href="${p.url}" target="_blank" rel="noopener">Visit Website &rarr;</a>
          </div>
        </div>
      `;
    }).join('');

    const dotsHtml = projects.map((_, i) =>
      `<button class="web-slider__dot${i === 0 ? ' active' : ''}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`
    ).join('');

    this.workStackOverlay.innerHTML = `
      <div class="web-slider">
        <div class="web-slider__header">
          <h2 class="web-slider__title">Web Design & Development</h2>
          <span class="web-slider__counter">01 / ${String(projects.length).padStart(2, '0')}</span>
        </div>
        <div class="web-slider__viewport">
          <div class="web-slider__track">
            ${slidesHtml}
          </div>
        </div>
        <div class="web-slider__nav">
          <button class="web-slider__arrow web-slider__arrow--prev" aria-label="Previous project" disabled>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4l-6 6 6 6"/></svg>
          </button>
          <div class="web-slider__dots">${dotsHtml}</div>
          <button class="web-slider__arrow web-slider__arrow--next" aria-label="Next project">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4l6 6-6 6"/></svg>
          </button>
        </div>
      </div>
    `;

    this._showOverlay(this.workStackOverlay);
    this._bindWebSlider();
    this._animateWebSliderIn();
  }

  _bindWebSlider() {
    const overlay = this.workStackOverlay;
    const prevBtn = overlay.querySelector('.web-slider__arrow--prev');
    const nextBtn = overlay.querySelector('.web-slider__arrow--next');
    const dots = overlay.querySelectorAll('.web-slider__dot');

    prevBtn.addEventListener('click', () => {
      if (this._currentWebSlide > 0) this._goToWebSlide(this._currentWebSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
      if (this._currentWebSlide < CONFIG.webProjects.length - 1) this._goToWebSlide(this._currentWebSlide + 1);
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        this._goToWebSlide(parseInt(dot.dataset.slide));
      });
    });

    // Touch/swipe support
    this._bindSliderSwipe(
      overlay.querySelector('.web-slider__viewport'),
      () => this._currentWebSlide,
      CONFIG.webProjects.length,
      (i) => this._goToWebSlide(i)
    );

    // Keyboard nav
    this._sliderKeyHandler = (e) => {
      if (this.activePage !== 'work-stack') return;
      if (e.key === 'ArrowLeft' && this._currentWebSlide > 0) {
        this._goToWebSlide(this._currentWebSlide - 1);
      } else if (e.key === 'ArrowRight' && this._currentWebSlide < CONFIG.webProjects.length - 1) {
        this._goToWebSlide(this._currentWebSlide + 1);
      }
    };
    document.addEventListener('keydown', this._sliderKeyHandler);
  }

  /** Shared touch/swipe handler for any slider viewport */
  _bindSliderSwipe(viewport, getCurrentIndex, totalSlides, goToSlide) {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let tracking = false;

    const onStart = (x, y) => {
      startX = x;
      startY = y;
      currentX = x;
      tracking = true;
    };

    const onMove = (x, y, e) => {
      if (!tracking) return;
      currentX = x;
      // Prevent default to stop iOS Safari from doing anything else
      if (e && e.cancelable) e.preventDefault();
    };

    const onEnd = () => {
      if (!tracking) return;
      tracking = false;
      const dx = currentX - startX;
      const threshold = 40;
      const current = getCurrentIndex();

      if (dx < -threshold && current < totalSlides - 1) {
        goToSlide(current + 1);
      } else if (dx > threshold && current > 0) {
        goToSlide(current - 1);
      }
    };

    // Touch events (mobile)
    viewport.addEventListener('touchstart', (e) => {
      onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      onMove(e.touches[0].clientX, e.touches[0].clientY, e);
    }, { passive: false });

    viewport.addEventListener('touchend', () => {
      onEnd();
    }, { passive: true });

    viewport.addEventListener('touchcancel', () => {
      tracking = false;
    }, { passive: true });

    // Pointer events (fallback for hybrid devices)
    viewport.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') {
        viewport.setPointerCapture(e.pointerId);
        onStart(e.clientX, e.clientY);
      }
    });

    viewport.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch' && tracking) {
        onMove(e.clientX, e.clientY, e);
      }
    });

    viewport.addEventListener('pointerup', (e) => {
      if (e.pointerType === 'touch') {
        onEnd();
      }
    });

    viewport.addEventListener('pointercancel', (e) => {
      if (e.pointerType === 'touch') {
        tracking = false;
      }
    });
  }

  _goToWebSlide(index) {
    this._currentWebSlide = index;
    const overlay = this.workStackOverlay;
    const track = overlay.querySelector('.web-slider__track');
    const dots = overlay.querySelectorAll('.web-slider__dot');
    const counter = overlay.querySelector('.web-slider__counter');
    const prevBtn = overlay.querySelector('.web-slider__arrow--prev');
    const nextBtn = overlay.querySelector('.web-slider__arrow--next');
    const total = CONFIG.webProjects.length;

    // Animate track
    gsap.to(track, {
      x: `${-index * 100}%`,
      duration: 0.5,
      ease: 'power2.inOut',
    });

    // Update dots
    dots.forEach((d, i) => d.classList.toggle('active', i === index));

    // Update counter
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

    // Update button states
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === total - 1;
  }

  _animateWebSliderIn() {
    if (prefersReducedMotion()) return;

    const overlay = this.workStackOverlay;
    const header = overlay.querySelector('.web-slider__header');
    const firstSlide = overlay.querySelector('.web-slide');
    const nav = overlay.querySelector('.web-slider__nav');

    gsap.fromTo(header, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 });
    gsap.fromTo(firstSlide, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.35 });
    gsap.fromTo(nav, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.5 });
  }

  // ── Packaging Slider ──

  _openPackagingSlider(cfg) {
    this.activePage = 'work-stack';
    this._currentPkgSlide = 0;
    const projects = CONFIG.packagingProjects;

    const slidesHtml = projects.map((p, i) => `
      <div class="pkg-slide" data-index="${i}">
        <div class="pkg-slide__image" style="background-color: ${p.color}10">
          <img src="${p.thumb}" alt="${p.title}" loading="lazy" draggable="false">
        </div>
        <div class="pkg-slide__info">
          <h3 class="pkg-slide__title">${p.title}</h3>
          <div class="pkg-slide__tags">
            ${p.tags.map(t => `<span class="pkg-slide__tag">${t}</span>`).join('')}
          </div>
          <button class="pkg-slide__cta" data-pkg-index="${i}">View Case Study &rarr;</button>
        </div>
      </div>
    `).join('');

    const dotsHtml = projects.map((_, i) =>
      `<button class="web-slider__dot${i === 0 ? ' active' : ''}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`
    ).join('');

    this.workStackOverlay.innerHTML = `
      <div class="web-slider pkg-slider">
        <div class="web-slider__header">
          <h2 class="web-slider__title">${cfg.data.stackName}</h2>
          <span class="web-slider__counter">01 / ${String(projects.length).padStart(2, '0')}</span>
        </div>
        <div class="web-slider__viewport">
          <div class="web-slider__track">
            ${slidesHtml}
          </div>
        </div>
        <div class="web-slider__nav">
          <button class="web-slider__arrow web-slider__arrow--prev" aria-label="Previous project" disabled>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4l-6 6 6 6"/></svg>
          </button>
          <div class="web-slider__dots">${dotsHtml}</div>
          <button class="web-slider__arrow web-slider__arrow--next" aria-label="Next project">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4l6 6-6 6"/></svg>
          </button>
        </div>
      </div>
    `;

    this._showOverlay(this.workStackOverlay);
    this._bindPackagingSlider();
    this._animateWebSliderIn();
  }

  _bindPackagingSlider() {
    const overlay = this.workStackOverlay;
    const projects = CONFIG.packagingProjects;
    const prevBtn = overlay.querySelector('.web-slider__arrow--prev');
    const nextBtn = overlay.querySelector('.web-slider__arrow--next');
    const dots = overlay.querySelectorAll('.web-slider__dot');

    prevBtn.addEventListener('click', () => {
      if (this._currentPkgSlide > 0) this._goToPkgSlide(this._currentPkgSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
      if (this._currentPkgSlide < projects.length - 1) this._goToPkgSlide(this._currentPkgSlide + 1);
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        this._goToPkgSlide(parseInt(dot.dataset.slide));
      });
    });

    // Touch/swipe support
    this._bindSliderSwipe(
      overlay.querySelector('.web-slider__viewport'),
      () => this._currentPkgSlide,
      projects.length,
      (i) => this._goToPkgSlide(i)
    );

    // Case study buttons
    overlay.querySelectorAll('.pkg-slide__cta').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.pkgIndex);
        this._openCaseStudy(projects[idx]);
      });
    });

    // Keyboard nav
    this._sliderKeyHandler = (e) => {
      if (this.activePage !== 'work-stack') return;
      if (e.key === 'ArrowLeft' && this._currentPkgSlide > 0) {
        this._goToPkgSlide(this._currentPkgSlide - 1);
      } else if (e.key === 'ArrowRight' && this._currentPkgSlide < projects.length - 1) {
        this._goToPkgSlide(this._currentPkgSlide + 1);
      }
    };
    document.addEventListener('keydown', this._sliderKeyHandler);
  }

  _goToPkgSlide(index) {
    this._currentPkgSlide = index;
    const overlay = this.workStackOverlay;
    const track = overlay.querySelector('.web-slider__track');
    const dots = overlay.querySelectorAll('.web-slider__dot');
    const counter = overlay.querySelector('.web-slider__counter');
    const prevBtn = overlay.querySelector('.web-slider__arrow--prev');
    const nextBtn = overlay.querySelector('.web-slider__arrow--next');
    const total = CONFIG.packagingProjects.length;

    gsap.to(track, { x: `${-index * 100}%`, duration: 0.5, ease: 'power2.inOut' });
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === total - 1;
  }

  _openBrandSlider(cfg) {
    this.activePage = 'work-stack';
    const projects = CONFIG.brandProjects;

    const cardsHtml = projects.map((p, i) => `
      <div class="brand-grid-card" data-brand-index="${i}" role="button" tabindex="0" aria-label="View ${p.title} case study">
        <div class="brand-grid-card__thumb">
          <img src="${p.thumb}" alt="${p.title}" loading="lazy" draggable="false">
        </div>
        <div class="brand-grid-card__info">
          <h3 class="brand-grid-card__title">${p.title}</h3>
          <span class="brand-grid-card__tag">#${p.industry.replace(/\s+\/\s+/g, '').replace(/\s+/g, '')}</span>
        </div>
      </div>
    `).join('');

    this.workStackOverlay.className = 'page-overlay brand-grid-page';
    this.workStackOverlay.innerHTML = `
      <div class="brand-grid">
        <div class="brand-grid__header">
          <h2 class="brand-grid__title">${cfg.data.stackName}</h2>
          <p class="brand-grid__subtitle">${projects.length} case studies — logos, guidelines, strategy</p>
        </div>
        <div class="brand-grid__cards">
          ${cardsHtml}
        </div>
      </div>
    `;

    this._showOverlay(this.workStackOverlay);

    // Animate cards in
    if (!prefersReducedMotion()) {
      const header = this.workStackOverlay.querySelector('.brand-grid__header');
      const cards = this.workStackOverlay.querySelectorAll('.brand-grid-card');
      gsap.fromTo(header, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.2 });
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.3 + i * 0.08 });
      });
    }

    // Bind card clicks
    this.workStackOverlay.querySelectorAll('.brand-grid-card').forEach(card => {
      const handler = () => {
        const idx = parseInt(card.dataset.brandIndex);
        this._openCaseStudy(projects[idx]);
      };
      card.addEventListener('click', handler);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
    });
  }

  _openCaseStudy(project) {
    this.activePage = 'case-study';
    this._caseStudyFromGrid = true;

    // Find next project within the same category (brand or packaging)
    let projects = CONFIG.brandProjects;
    let currentIdx = projects.findIndex(p => p.id === project.id);
    if (currentIdx === -1) {
      projects = CONFIG.packagingProjects;
      currentIdx = projects.findIndex(p => p.id === project.id);
    }
    const nextIdx = (currentIdx + 1) % projects.length;
    const nextProject = projects[nextIdx];

    const tocHtml = project.toc.map(t => `<a class="case-study__toc-link" href="#">${t}</a>`).join('');

    const sectionsHtml = project.sections.map(section => {
      if (section.type === 'image') {
        return `
          <div class="case-study__section">
            <div class="case-study__image">
              <img src="${section.src}" alt="${project.title}" loading="lazy">
            </div>
            ${section.caption ? `<p class="case-study__image-caption">${section.caption}</p>` : ''}
          </div>
        `;
      } else if (section.type === 'text') {
        return `
          <div class="case-study__section">
            <h2 class="case-study__heading">${section.heading}</h2>
            <div class="case-study__text">${section.body}</div>
          </div>
        `;
      }
      return '';
    }).join('');

    const wasActive = this.projectOverlay.classList.contains('active');
    this.projectOverlay.className = 'page-overlay case-study-page' + (wasActive ? ' active' : '');
    this.projectOverlay.innerHTML = `
      <div class="case-study">
        <div class="case-study__hero">
          <div class="case-study__hero-meta">
            <p class="case-study__category">${project.category}</p>
            <h1 class="case-study__title">${project.title}</h1>
            <p class="case-study__subtitle">${project.subtitle}</p>
            <p class="case-study__detail-label">Creative Director</p>
            <p class="case-study__detail-value">${project.director}</p>
            <p class="case-study__detail-label">Industry</p>
            <p class="case-study__detail-value">${project.industry}</p>
            <p class="case-study__detail-label">Year</p>
            <p class="case-study__detail-value">${project.year}</p>
            <div class="case-study__toc">
              <p class="case-study__toc-label">Sections</p>
              ${tocHtml}
            </div>
          </div>
          <div class="case-study__hero-image">
            <img src="${project.heroImage}" alt="${project.title}" loading="lazy">
          </div>
        </div>
        <div class="case-study__body">
          ${sectionsHtml}
        </div>
        <div class="case-study__next" data-next-id="${nextProject.id}" role="button" tabindex="0" aria-label="View ${nextProject.title} case study">
          <p class="case-study__next-label">Next Case Study</p>
          <div class="case-study__next-card">
            <div class="case-study__next-thumb">
              <img src="${nextProject.heroImage}" alt="${nextProject.title}" loading="lazy">
            </div>
            <h3 class="case-study__next-title">${nextProject.title}</h3>
            <p class="case-study__next-industry">${nextProject.industry} — ${nextProject.year}</p>
          </div>
          <span class="case-study__next-arrow">&rarr;</span>
        </div>
      </div>
    `;

    // Bind next case study click
    const nextBtn = this.projectOverlay.querySelector('.case-study__next');
    if (nextBtn) {
      const goNext = () => {
        const caseStudyEl = this.projectOverlay.querySelector('.case-study');
        if (caseStudyEl && !prefersReducedMotion()) {
          gsap.to(caseStudyEl, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: () => {
            this._renderCaseStudyContent(nextProject);
          }});
        } else {
          this._renderCaseStudyContent(nextProject);
        }
      };
      nextBtn.addEventListener('click', goNext);
      nextBtn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goNext(); } });
    }

    // Hide grid, show case study (only on first open)
    if (this.workStackOverlay.classList.contains('active')) {
      gsap.to(this.workStackOverlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => {
        this.workStackOverlay.classList.remove('active');
      }});
      this._showOverlay(this.projectOverlay);
    }
    this._animateCaseStudy();
  }

  _animateCaseStudy() {
    const animElements = this.projectOverlay.querySelectorAll('.case-study__hero, .case-study__section, .case-study__next');
    if (prefersReducedMotion()) {
      animElements.forEach(el => el.classList.add('animate-in'));
      return;
    }

    const hero = this.projectOverlay.querySelector('.case-study__hero');
    const sections = this.projectOverlay.querySelectorAll('.case-study__section');
    const nextCta = this.projectOverlay.querySelector('.case-study__next');

    gsap.to(hero, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3,
      onComplete: () => hero.classList.add('animate-in')
    });

    sections.forEach((section, i) => {
      gsap.to(section, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.5 + i * 0.08,
        onComplete: () => section.classList.add('animate-in')
      });
    });

    if (nextCta) {
      gsap.to(nextCta, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.5 + sections.length * 0.08,
        onComplete: () => nextCta.classList.add('animate-in')
      });
    }
  }

  _renderCaseStudyContent(project) {
    this.projectOverlay.scrollTop = 0;
    this._openCaseStudy(project);
    // Since overlay is already visible, just fade the new content in
    const caseStudyEl = this.projectOverlay.querySelector('.case-study');
    if (caseStudyEl && !prefersReducedMotion()) {
      gsap.fromTo(caseStudyEl, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    }
  }

  _openComingSoonOverlay(stackName) {
    this.activePage = 'work-stack';

    this.workStackOverlay.innerHTML = `
      <div class="coming-soon-page">
        <h2 class="coming-soon-page__title">${stackName}</h2>
        <p class="coming-soon-page__text">Projects loading soon.</p>
      </div>
    `;

    this._showOverlay(this.workStackOverlay);

    if (!prefersReducedMotion()) {
      const title = this.workStackOverlay.querySelector('.coming-soon-page__title');
      const text = this.workStackOverlay.querySelector('.coming-soon-page__text');
      gsap.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.25 });
      gsap.fromTo(text, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.4 });
    }
  }

  _showOverlay(overlay, bgColor) {
    if (bgColor) {
      overlay.style.backgroundColor = bgColor;
    }

    overlay.classList.add('active');
    overlay.scrollTop = 0;

    if (prefersReducedMotion()) {
      if (this.backBtn) {
        this.backBtn.classList.add('visible');
      }
      return;
    }

    gsap.fromTo(overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );

    // Show back button
    if (this.backBtn) {
      setTimeout(() => this.backBtn.classList.add('visible'), 300);
    }
  }

  _animateProjectContent() {
    if (prefersReducedMotion()) {
      this.projectOverlay.querySelectorAll('.project-hero, .project-section').forEach(el => {
        el.classList.add('animate-in');
      });
      return;
    }

    const hero = this.projectOverlay.querySelector('.project-hero');
    const sections = this.projectOverlay.querySelectorAll('.project-section');

    gsap.to(hero, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3,
      onComplete: () => hero.classList.add('animate-in')
    });

    sections.forEach((section, i) => {
      gsap.to(section, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.5 + i * 0.1,
        onComplete: () => section.classList.add('animate-in')
      });
    });
  }

  _animateAboutContent() {
    if (prefersReducedMotion()) return;

    const heading = this.aboutOverlay.querySelector('.about-heading');
    const cols = this.aboutOverlay.querySelectorAll('.about-col');
    const proof = this.aboutOverlay.querySelector('.about-proof');
    const photo = this.aboutOverlay.querySelector('.about-photo');
    const skills = this.aboutOverlay.querySelector('.about-skills-section');

    gsap.to(heading, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 });

    cols.forEach((col, i) => {
      gsap.to(col, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.35 + i * 0.12 });
    });

    if (proof) gsap.to(proof, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.72 });
    if (photo) gsap.to(photo, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.7 });
    if (skills) gsap.to(skills, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.95 });
  }

  _animateContactContent() {
    if (prefersReducedMotion()) return;

    const statement = this.contactOverlay.querySelector('.contact-statement');
    const email = this.contactOverlay.querySelector('.contact-email');
    const social = this.contactOverlay.querySelector('.contact-social');

    gsap.to(statement, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3 });
    gsap.to(email, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.5 });
    gsap.to(social, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.65 });
  }

  /** Zoom out back to canvas */
  zoomOut(options = {}) {
    if (!this.activePage) return;

    // Case study → go back to brand grid instead of canvas
    if (this.activePage === 'case-study' && this._caseStudyFromGrid) {
      this._caseStudyFromGrid = false;
      this.activePage = 'work-stack';

      const fadeOut = () => {
        this.projectOverlay.classList.remove('active');
        this.projectOverlay.className = 'page-overlay project-page';
        // Re-show the grid
        this.workStackOverlay.style.opacity = '';
        this._showOverlay(this.workStackOverlay);
      };

      if (prefersReducedMotion()) { fadeOut(); return; }
      gsap.to(this.projectOverlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: fadeOut });
      return;
    }

    // Hide back button
    if (this.backBtn) this.backBtn.classList.remove('visible');

    // Get active overlay
    let overlay;
    switch (this.activePage) {
      case 'project':    overlay = this.projectOverlay; break;
      case 'game':       overlay = this.gameOverlay; break;
      case 'about':      overlay = this.aboutOverlay; break;
      case 'contact':    overlay = this.contactOverlay; break;
      case 'work-stack': overlay = this.workStackOverlay; break;
    }

    // Clean up slider keyboard listener if present
    if (this._sliderKeyHandler) {
      document.removeEventListener('keydown', this._sliderKeyHandler);
      this._sliderKeyHandler = null;
    }

    // Clean up naruto runner game if present
    if (this._narutoGame) {
      this._narutoGame.destroy();
      this._narutoGame = null;
    }

    const complete = () => {
      if (overlay) overlay.classList.remove('active');
      // Reset dynamic overlay classes
      this.projectOverlay.className = 'page-overlay project-page';
      this.workStackOverlay.className = 'page-overlay work-stack-page';
      this.activePage = null;
      this.activeElementId = null;
      this._caseStudyFromGrid = false;
      if (!options.skipHistory) this._replaceRoute('/');

      // Restore engine
      if (this.savedState) {
        this.engine.restoreState(this.savedState, 0.6);
        this.savedState = null;
      }
      this.engine.unlock();

      // Show nav and cursor
      if (this.nav) this.nav.show();
      if (this.cursor) this.cursor.showFromOverlay();
    };

    if (prefersReducedMotion()) {
      complete();
      return;
    }

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: complete
    });
  }
}
