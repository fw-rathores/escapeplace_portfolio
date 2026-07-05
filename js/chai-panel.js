/* ============================================
   CHAI-PANEL.JS - Creator Notes Side Panel
   ============================================ */

(function () {
  'use strict';

  const panel = document.getElementById('chaiPanel');
  const backdrop = document.getElementById('chaiBackdrop');
  const closeBtn = document.getElementById('chaiClose');
  const notebook = document.getElementById('chaiNotebook');

  if (!panel || !notebook) return;

  const notes = {
    coffee: {
      eyebrow: 'cafe notes',
      title: 'Iced Coffee >>',
      subtitle: 'drink-led reels, cafe visits, soft cravings',
      margin: 'texture first.<br>sip second.',
      intro: 'Use this page for cafe finds, iced coffee runs, matcha/ube orders, and drink-led collaborations that should feel saveable instead of scripted.',
      listTitle: 'Notes to keep:',
      points: [
        'Open on the actual drink or storefront so the reel has an immediate reason to exist.',
        'Capture texture: ice, pour, foam, straw tap, first sip, sleeve, table setup.',
        'Add a human cue: post-workout stop, fit check, friend reaction, or honest taste note.',
        'Close with what to order, when to go, and why someone should save it.'
      ],
      sign: 'save this for the next cafe plan.'
    },
    fashion: {
      eyebrow: 'style notes',
      title: 'Fit Check Notes',
      subtitle: 'try-ons, hauls, styling, mirror-shot proof',
      margin: 'fit first.<br>link later.',
      intro: 'Use this page for fashion hauls and styling reels where the viewer needs to understand fit, fabric, sizing, and how the piece moves in real life.',
      listTitle: 'Notes to keep:',
      points: [
        'Start with the full outfit before cutting into details.',
        'Show front, side, mirror, walking, and close fabric shots so the haul feels useful.',
        'Mention sizing, comfort, styling options, and what you would actually repeat-wear.',
        'Keep transitions quick, but leave enough time for the outfit to be understood.'
      ],
      sign: 'pretty is good, useful gets saved.'
    },
    grwm: {
      eyebrow: 'beauty notes',
      title: 'GRWM Notes',
      subtitle: 'skincare, makeup, transitions, product texture',
      margin: 'face card.<br>product proof.',
      intro: 'Use this page for GRWM, skincare, and makeup-led content where the sequence should feel personal, pretty, and still useful for the viewer.',
      listTitle: 'Notes to keep:',
      points: [
        'Open with the final vibe or a bare-face starting frame so the transformation has a clear arc.',
        'Show texture: pump, swatch, blend, tap-in, close-up, mirror check, and natural light finish.',
        'Keep product mentions conversational with skin type, shade, scent, feel, or wear-time notes.',
        'Close with the finished look and one reason people should save or try the routine.'
      ],
      sign: 'make the routine feel real.'
    },
    supplements: {
      eyebrow: 'fitness notes',
      title: 'Lifemaxxing Stack',
      subtitle: 'supplements, routines, gym context, wellness habits',
      margin: 'routine > hype.',
      intro: 'Use this page for supplement, fitness, and wellness content where the product needs context: when it fits into the day, what it pairs with, and why it belongs in the routine.',
      listTitle: 'Notes to keep:',
      points: [
        'Anchor the product to a real moment: pre-gym, post-gym, morning routine, or reset day.',
        'Show the stack cleanly: label, scoop, bottle, shaker, bag, gym floor, desk, or fridge setup.',
        'Keep the claim language grounded and talk about habit fit, taste, ease, and consistency.',
        'End with a routine cue people can copy, not a hard sell.'
      ],
      sign: 'make the habit look doable.'
    }
  };

  function render(noteKey) {
    const note = notes[noteKey] || notes.coffee;

    notebook.innerHTML = `
      <div class="chai-rings" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <div class="chai-title-area">
        <p class="chai-eyebrow">${note.eyebrow}</p>
        <h2 class="chai-title">${note.title}</h2>
        <p class="chai-subtitle-note">${note.subtitle}</p>
      </div>

      <div class="chai-margin-note chai-margin-note--top" aria-hidden="true">
        ${note.margin}
      </div>

      <div class="chai-intro-note">
        <p>${note.intro}</p>
      </div>

      <div class="chai-ingredients-section">
        <h3 class="chai-list-heading">${note.listTitle}</h3>
        <ul class="chai-ingredients-list">
          ${note.points.map((point, index) => `
            <li><span class="chai-qty">${String(index + 1).padStart(2, '0')}</span> ${point}</li>
          `).join('')}
        </ul>
      </div>

      <div class="chai-divider" aria-hidden="true">
        <svg viewBox="0 0 200 12" fill="none"><path d="M4 6 Q20 2 40 6 Q60 10 80 6 Q100 2 120 6 Q140 10 160 6 Q180 2 196 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
      </div>

      <div class="chai-note-pad" aria-label="Notes area">
        <p class="chai-note-pad__label">Open notes</p>
        <p>Leave campaign hooks, talking points, shot ideas, or product details here when building this page out.</p>
      </div>

      <div class="chai-closing-note">
        <p>${note.sign}</p>
        <p class="chai-sign">- Anu</p>
      </div>
    `;

    panel.dataset.note = noteKey;
  }

  function open(noteKey = 'coffee') {
    render(noteKey);
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (notebook) notebook.scrollTop = 0;

    requestAnimationFrame(() => {
      closeBtn && closeBtn.focus();
    });
  }

  function close() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (backdrop) backdrop.addEventListener('click', close);
  if (closeBtn) closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      close();
    }
  });

  window.__creatorNotesPanel = { open, close };
  window.__chaiPanel = { open, close };
})();
