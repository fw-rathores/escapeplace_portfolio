/* ============================================
   RESUME-PANEL.JS — Side Panel Toggle
   ============================================ */

(function () {
  'use strict';

  const avatar = document.getElementById('profileAvatar');
  const panel = document.getElementById('resumePanel');
  const backdrop = document.getElementById('resumeBackdrop');
  const closeBtn = document.getElementById('resumeClose');

  if (!avatar || !panel) return;

  // Get custom cursor element
  const customCursor = document.querySelector('.custom-cursor');

  function normalizePath(path = window.location.pathname) {
    return path.replace(/\/+$/, '') || '/';
  }

  function writeRoute(path, mode = 'push') {
    if (normalizePath() === path) return;
    const method = mode === 'replace' ? 'replaceState' : 'pushState';
    window.history[method]({}, '', path);
  }

  function openPanel(options = {}) {
    if (!options.skipHistory) {
      writeRoute('/about', options.replaceHistory ? 'replace' : 'push');
    }

    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hide custom cursor and restore default
    if (customCursor) customCursor.style.display = 'none';
    document.body.classList.remove('has-custom-cursor');

    // Trap focus inside panel
    requestAnimationFrame(() => {
      closeBtn && closeBtn.focus();
    });
  }

  function closePanel(options = {}) {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore custom cursor
    if (customCursor && !('ontouchstart' in window)) {
      customCursor.style.display = '';
      document.body.classList.add('has-custom-cursor');
    }

    if (!options.skipHistory && normalizePath() === '/about') {
      writeRoute('/', 'replace');
    }

    if (!options.skipFocus) avatar.focus();
  }

  window.__resumePanel = {
    open: openPanel,
    close: closePanel,
    isOpen: () => panel.classList.contains('open'),
  };

  avatar.addEventListener('click', () => openPanel());
  backdrop.addEventListener('click', closePanel);
  closeBtn.addEventListener('click', closePanel);

  window.addEventListener('popstate', () => {
    if (normalizePath() === '/about') {
      openPanel({ skipHistory: true });
    } else if (panel.classList.contains('open')) {
      closePanel({ skipHistory: true, skipFocus: true });
    }
  });

  if (normalizePath() === '/about') {
    window.history.replaceState({}, '', '/about');
    openPanel({ skipHistory: true });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      closePanel();
    }
  });
})();
