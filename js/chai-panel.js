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
      eyebrow: 'coffee ritual',
      title: 'Iced Coffee >>',
      subtitle: 'coffee time is sacred',
      margin: 'do not<br>interrupt.',
      intro: "The non-negotiable time of my day is my coffee time. Nobody is allowed to interrupt it. It's me and my coffee in my favourite glass first thing in the morning.",
      listTitle: 'Coffee notes:',
      points: [
        "For my daily coffee needs, Levista's Rs.2 sachets are my favourites.",
        'The zero sugar Hazelnut and Caramel syrups from Good & More are always stocked up in my fridge.',
        "The mocha pot coffee is reserved for days when it's raining. It's like a tradition.",
        "I always order Vietnamese coffee at a new coffee shop, and if the condensed milk is not blended I know they know their coffee game.",
        'Davidoff instant creams work really well for cold foam coffee.',
        'The second coffee of my day always has a scoop of SuperYou protein.',
        'Ube tastes best with cold brew coffee.',
        'Matcha goes really well with oat milk.',
        'When bored of protein shakes, I add a little matcha in it for a taste change.',
        'Fresh fruit pulp in my fridge is a must-have for all my mango matcha and strawberry matcha needs.'
      ],
      note: "I am still on a hunt for a good coffee place in Bangalore. Blue Tokai's Vietnamese coffee is one of the best I have tasted till now.",
      sign: 'coffee time is sacred, everything else can wait.'
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
      eyebrow: 'tiny rituals',
      title: 'GRWM',
      subtitle: 'the in-between things',
      margin: 'routine<br>over hype.',
      intro: "GRWM isn't about the products, it's about the tiny rituals in between them that nobody puts in the caption. Here's mine:",
      listTitle: 'The routine:',
      points: [
        "The final face check happens in the phone camera because that's the lens that never lies.",
        'Always keeping face tissues to wipe my face after washing it. Not trusting clean towels is my favourite hack to keep my face clean.',
        'Spraying a little bit of perfume before going to bed to feel like the main character.',
        'Reorganising my jewellery every month so nothing gets forgotten at the back of the drawer.',
        'Keeping one cotton pad tucked in my makeup bag always, in case of emergency.',
        'A box full of safety pins, hair pins, rubber bands and clutchers in my almirah for days everything goes haywire.',
        'Socks are the first thing that gets in the organiser after wash days so I never lose one of them or my head over it.',
        'Keeping staples in my wardrobes ready for days I am in a hurry. My go-to is Uniqlo.',
        'Talking my skin through it like "okay, we are just going to hydrate now" - full narration, every time.',
        'Doing my eyebrows before anything else, because a bad brow day ruins the whole GRWM.'
      ],
      sign: 'make the routine feel like yours.'
    },
    supplements: {
      eyebrow: 'lifemaxxing notes',
      title: 'Lifemaxxing Stack',
      subtitle: 'the whimsy is the whole point',
      margin: 'whimsy<br>always.',
      intro: "Lifemaxxing isn't about following what the internet trend tells you to, it's about adding whimsy in everything you do and sticking to it. Here's my secret of what I do to keep the whimsy alive:",
      listTitle: 'Whimsy rules:',
      points: [
        'Adding Diet Coke to my SuperYou Protein Shake to make my Coke float.',
        "Eating three pieces of green chilli every time I feel like crying. Don't ask why three, it's a system.",
        'Leaving one of my soft toys in charge every time I leave the house.',
        'I drink my coffee in wine glasses and my Diet Coke in whiskey glasses.',
        'On weekends, I make a big deal of my breakfasts: coffee in the fanciest glass, plates well aligned, fresh flowers and a matching pajama set.',
        'Setting up reminders on my phone to call my friends and check on them.',
        "Always keeping a SuperYou protein bar in my bag before leaving for anywhere. Can't compromise on the protein requirement.",
        'Sending a long paragraph to an internet stranger about how they are doing good in life.',
        'Sprinkling a whole Max Protein bar on my ice cream to make it protein-friendly.',
        'Doing a monthly one-on-one with myself and noting down the areas of improvement.',
        'Telling my clothes "it is bath time" every time I turn on the washing machine.',
        'Never talking bad about myself, even subconsciously, and always adding "it is not that difficult" after a train of what-if thoughts.'
      ],
      sign: 'the whimsy is the whole point.'
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
        <p class="chai-note-pad__label">Anu's note</p>
        <p>${note.note || 'A little ritual page for the things that make the routine feel personal.'}</p>
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
