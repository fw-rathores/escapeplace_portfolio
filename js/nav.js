/* ============================================
   NAV.JS — Floating Toolbar Navigation
   ============================================ */

class Navigation {
  constructor(engine) {
    this.engine = engine;
    this.toolbar = document.querySelector('.floating-toolbar');
    this.canvasName = document.querySelector('.canvas-name');
    this.socialDock = document.querySelector('.social-dock');
    this.claudeBadge = document.querySelector('.claude-badge');
    this.profileAvatar = document.querySelector('.profile-avatar');
    this.mobileNav = document.querySelector('.mobile-nav');
    this.navLinks = document.querySelectorAll('[data-nav-target]');
    this.activeLink = null;

    this._bindEvents();
  }

  _bindEvents() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.navTarget;
        const isMobileNav = Boolean(link.closest('.mobile-nav'));
        const openedRoute = isMobileNav ? false : this.openRoute(link);

        if (isMobileNav) {
          this.navigateToMobileTarget(link, target);
          this._setActive(link);
          return;
        }

        if (!openedRoute) this.navigateTo(target);
        this._setActive(link);
      });
    });
  }

  openRoute(link) {
    const elementId = link.dataset.elementId || CONFIG.navTargets[link.dataset.navTarget]?.elementId;
    if (!elementId || !window.__cardTransitions) return false;

    window.__cardTransitions.openCard(elementId);
    return true;
  }

  navigateToMobileTarget(link, targetName) {
    const elementId = link.dataset.elementId || CONFIG.navTargets[targetName]?.elementId;
    if (!elementId) {
      this.navigateTo(targetName);
      return;
    }

    const el = document.querySelector(`.canvas-element[data-element-id="${elementId}"]`);
    const x = Number(el?.dataset.originX);
    const y = Number(el?.dataset.originY);

    if (Number.isFinite(x) && Number.isFinite(y)) {
      this.engine.panTo(x, y, 1);
      return;
    }

    this.navigateTo(targetName);
  }

  navigateTo(targetName) {
    const target = CONFIG.navTargets[targetName];
    if (!target) return;

    // Pan the canvas engine to target position
    this.engine.panTo(target.x, target.y, 1.4);
  }

  _setActive(link) {
    // Remove active from all nav links (both desktop toolbar & mobile nav)
    this.navLinks.forEach(l => l.classList.remove('nav-active'));
    // Set active on both desktop and mobile buttons for the same target
    const target = link.dataset.navTarget;
    this.navLinks.forEach(l => {
      if (l.dataset.navTarget === target) l.classList.add('nav-active');
    });
    this.activeLink = link;
  }

  /** Show floating UI with animation */
  reveal() {
    const elements = [this.toolbar, this.canvasName, this.socialDock, this.claudeBadge, this.profileAvatar, this.mobileNav].filter(Boolean);

    if (prefersReducedMotion()) {
      elements.forEach(el => {
        el.style.opacity = '1';
      });
      return;
    }

    // Toolbar drops in from top
    if (this.toolbar) {
      gsap.fromTo(this.toolbar,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 }
      );
    }

    // Canvas name fades in
    if (this.canvasName) {
      gsap.fromTo(this.canvasName,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.3 }
      );
    }

    // Dock rises from bottom
    if (this.socialDock) {
      gsap.fromTo(this.socialDock,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.4 }
      );
    }

    // Claude badge fades in from bottom-left
    if (this.claudeBadge) {
      gsap.fromTo(this.claudeBadge,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.5 }
      );
    }

    // Profile avatar fades in from top-right
    if (this.profileAvatar) {
      gsap.fromTo(this.profileAvatar,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.35 }
      );
    }

    // Mobile nav rises from bottom
    if (this.mobileNav) {
      gsap.fromTo(this.mobileNav,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.3 }
      );
    }
  }

  /** Hide floating UI */
  hide() {
    const elements = [this.toolbar, this.canvasName, this.socialDock, this.claudeBadge, this.profileAvatar, this.mobileNav].filter(Boolean);
    elements.forEach(el => {
      gsap.to(el, { opacity: 0, duration: 0.3, ease: 'power2.in' });
    });
  }

  /** Show floating UI */
  show() {
    const elements = [this.toolbar, this.canvasName, this.socialDock, this.claudeBadge, this.profileAvatar, this.mobileNav].filter(Boolean);
    elements.forEach(el => {
      gsap.to(el, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    });
  }
}
