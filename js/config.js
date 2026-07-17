/* ============================================
   CONFIG.JS — Canvas Element Positions & Data
   ============================================
   Layout reference: Umi-style dense scatter
   — Elements crowd tightly around central hero
   — Mix of card types, sizes, illustrations
   — Overlap and layering creates depth
   ============================================ */

const CONFIG = {
  canvas: {
    width: 5000,
    height: 4000,
    centerX: 2500,
    centerY: 2000,
    bounds: {
      left: 1910,
      right: 3105,
      top: 1610,
      bottom: 2425,
    },
    desktopPanAllowance: {
      x: 110,
      y: 90,
    },
    mobileBounds: {
      left: 2115,
      right: 2880,
      top: 1265,
      bottom: 2766,
    },
  },

  startX: 2500,
  startY: 2000,

  minZoom: (() => {
    const w = window.innerWidth;
    return w < 768 ? 0.42 : 0.4;
  })(),
  maxZoom: 1.5,
  defaultZoom: (() => {
    const w = window.innerWidth;
    if (w >= 2560) return 1.28;
    if (w >= 1920) return 1.18;
    if (w >= 1440) return 1.12;
    if (w >= 1024) return 1.04;
    if (w >= 768) return 0.78;
    return 0.74;
  })(),

  inertiaDecay: 0.92,
  inertiaDuration: 1.2,
  clickThreshold: 5,

  navTargets: {
    hero:    { x: 2500, y: 2000 },
    insights: { x: 2020, y: 1620, elementId: 'stack-web', route: '/insights' },
    brandCollabs: { x: 2845, y: 1640, elementId: 'stack-brand', route: '/brand-collabs' },
    work:    { x: 2030, y: 2235, elementId: 'stack-packaging', route: '/work' },
    whyMe:   { x: 2500, y: 2205, elementId: 'about', route: '/why-me' },
    contact: { x: 3020, y: 2290 },
  },

  // ── Mobile element position overrides (minimal adjustments) ──
  // Only move elements that are off-screen or per user request.
  // At zoom 0.52 on 375px, visible x: ~2139–2861, y: ~1359–2641
  mobileOverrides: {
    'stack-web':       { x: 2170, y: 1450, width: 190, height: 250 },
    'stack-brand':     { x: 2665, y: 1465, width: 190, height: 250 },
    'stack-packaging': { x: 2175, y: 2295, width: 190, height: 250 },
    'illust-designer': { x: 2140, y: 1715, width: 138, height: 138 },
    'about':           { x: 2398, y: 2138, width: 172, height: 172 },
    'contact':         { x: 2630, y: 2310, width: 178, height: 178 },
    'illust-chai':     { x: 2605, y: 2135, width: 140, height: 140 },
    'sticker-bookshelf': { x: 2390, y: 1290, width: 156, height: 156 },
    'sticker-energy':  { x: 2635, y: 1724, width: 150, height: 150 },
    'sticker-supplements': { x: 2485, y: 1555, width: 140, height: 140 },
  },

  creator: {
    logoDevToken: 'pk_UJuddRiXRV6sGzfrs_nFZw',
    reachMetrics: [
      { label: 'Instagram reach', value: '2.1M', note: 'monthly discovery across reels and stories' },
      { label: 'Avg. reel views', value: '25K', note: 'fitness, skincare, fashion and cafe culture' },
      { label: 'Interactions', value: '59K', note: 'high-intent comments, taps, shares, and replies' },
      { label: 'Save rate', value: '7%', note: 'routine-led content people come back to' },
    ],
    brandPartners: [
      'Google',
      'Amazon Prime',
      'Uber',
      'Flipkart',
      'Swiggy',
      'Zomato',
      'KFC',
      'Subway',
      'Tinder',
      'OYO Hotels',
      'MakeMyTrip',
      'Axis Bank',
      'AJIO',
      'Nykaa',
      'Zepto',
      'WakeFit',
      'Giva',
      'New Me',
      'Nothing Phones',
      'Perplexity AI',
      'Sunfeast',
      "L'Oreal",
      'Dove',
      'Garnier',
      'Olay',
      'Lakme',
      'Sugar Cosmetics',
      'Tira Beauty',
      'Minimalist',
      'Dot & Key',
      'Plum',
      'Swiss Beauty',
      'Bioderma',
      'Biolage',
      'Matrix',
      'Pilgrim',
      'Foxtale',
      'Be Bodywise',
      'Conscious Chemist',
      'Wishcare',
      'Fixderma',
      'Episoft',
      'Quench Botanics',
      'Pink Foundry',
      'Brillare',
      'SoulFlower',
      'ClayCo',
      'Mars Beauty',
      'Milkshake Beauty',
      'Hince',
      'Aromatica',
      'Luvum',
      'Neutraderma',
      'Novology',
      'Biryani by Kilo',
      'California Burrito',
      'Samosa Party',
      'Byg Brewski',
      'Atlantis Bar',
      'Babai Tiffins',
      'Cava Athleisure',
      'Neude',
      'Novoume',
      'Numour',
      'Overlaps',
      'House of B',
      'Molten Beauty',
      'Street Origins',
    ],
    brandLogoDomains: {
      'Google': 'google.com',
      'Amazon Prime': 'primevideo.com',
      'Uber': 'uber.com',
      'Flipkart': 'flipkart.com',
      'Swiggy': 'swiggy.com',
      'Zomato': 'zomato.com',
      'KFC': 'kfc.com',
      'Subway': 'subway.com',
      'Tinder': 'tinder.com',
      'OYO Hotels': 'oyorooms.com',
      'MakeMyTrip': 'makemytrip.com',
      'Axis Bank': 'axisbank.com',
      'AJIO': 'ajio.com',
      'Nykaa': 'nykaa.com',
      'Zepto': 'zeptonow.com',
      'WakeFit': 'wakefit.co',
      'Giva': 'giva.co',
      'New Me': 'newme.asia',
      'Nothing Phones': 'nothing.tech',
      'Perplexity AI': 'perplexity.ai',
      'Sunfeast': 'sunfeastworld.com',
      "L'Oreal": 'lorealparis.co.in',
      'Dove': 'dove.com',
      'Garnier': 'garnier.in',
      'Olay': 'olay.com',
      'Lakme': 'lakmeindia.com',
      'Sugar Cosmetics': 'sugarcosmetics.com',
      'Tira Beauty': 'tira.com',
      'Minimalist': 'beminimalist.co',
      'Dot & Key': 'dotandkey.com',
      'Plum': 'plumgoodness.com',
      'Swiss Beauty': 'swissbeauty.in',
      'Bioderma': 'bioderma.co.in',
      'Biolage': 'biolage.com',
      'Matrix': 'matrixprofessional.in',
      'Pilgrim': 'discoverpilgrim.com',
      'Foxtale': 'foxtale.in',
      'Be Bodywise': 'bebodywise.com',
      'Conscious Chemist': 'consciouschemist.com',
      'Wishcare': 'mywishcare.com',
      'Fixderma': 'fixderma.com',
      'Episoft': 'episoft.in',
      'Quench Botanics': 'quenchbotanics.com',
      'Pink Foundry': 'thepinkfoundry.com',
      'Brillare': 'brillare.co.in',
      'SoulFlower': 'soulflower.in',
      'ClayCo': 'clayco.in',
      'Mars Beauty': 'marscosmetics.in',
      'Milkshake Beauty': 'milkshakehair.com',
      'Hince': 'hince.co.kr',
      'Aromatica': 'aromatica.co.kr',
      'Luvum': 'luvum.co.kr',
      'Neutraderma': 'neutriderm.com',
      'Novology': 'novology.com',
      'Biryani by Kilo': 'biryanibykilo.com',
      'California Burrito': 'californiaburrito.in',
      'Samosa Party': 'samosaparty.in',
      'Byg Brewski': 'bygbrewski.com',
      'Atlantis Bar': 'atlantisbar.in',
      'Babai Tiffins': 'babaitiffins.com',
      'Cava Athleisure': 'cavaathleisure.com',
      'Neude': 'neude.co',
      'Novoume': 'novoume.com',
      'Numour': 'numour.in',
      'Overlaps': 'overlaysnow.com',
      'House of B': 'houseofb.in',
      'Molten Beauty': 'moltenbeauty.com',
      'Street Origins': 'streetorigins.in',
    },
    reelGenres: [
      {
        title: 'Sponsored Reels',
        desc: 'native brand stories with a strong hook, clean product moments, and a clear save or shop cue',
        sticker: 'assets/anu/genre-stickers/sponsored-reels.png',
        links: [
          'https://www.instagram.com/reel/DY_hXUoPH9L/?igsh=cDVwczN0Mm5tZ2N0',
          'https://www.instagram.com/reel/DZAC8DfSIZe/?igsh=MWc3amV2N2o4Y2JjcA==',
          'https://www.instagram.com/reel/DZIOkkmPGXB/?igsh=MTFncHc4MWxyMjR2OQ==',
        ]
      },
      {
        title: 'UGC',
        desc: 'relatable product-first edits made for paid ads, landing pages, and social proof',
        sticker: 'assets/anu/genre-stickers/ugc.png',
        links: [
          'https://www.instagram.com/reel/DaDD7g1Sv4P/?igsh=MW1oc2ZleXplZmZicw==',
          'https://www.instagram.com/reel/DaE_bLkPQBe/?igsh=MWJmZmllaWppemxudA==',
          'https://www.instagram.com/reel/DZxMRKjvy5N/?igsh=bjhnb2tmcGxoa2N3',
        ]
      },
      {
        title: 'Cafe Visits',
        desc: 'warm location-led edits with menu highlights, taste notes, and weekend plan energy',
        sticker: 'assets/anu/genre-stickers/cafe-visits.png',
        links: [
          'https://www.instagram.com/reel/DWwSzSpD9hU/?igsh=dHlldnVhNTNvaGg1',
          'https://www.instagram.com/reel/DULCo4jj-go/?igsh=NGxoZmFiaHR2NWps',
          'https://www.instagram.com/reel/DXYU5XRDx5q/?igsh=MWE1Y25objd4N2Q5Yw==',
          'https://www.instagram.com/reel/DXwm8jaPSVN/?igsh=MWd2d3FwMmUzcG1jeQ==',
          'https://www.instagram.com/reel/DVVRoGSj2st/?igsh=MXVyb3ozN3JjcjR4NQ==',
        ]
      },
      {
        title: 'Try On Hauls',
        desc: 'fit checks, styling transitions, sizing notes, and wearable outfit combinations',
        sticker: 'assets/anu/genre-stickers/try-on-hauls.png',
        links: [
          'https://www.instagram.com/reel/DNsD0DCXpDa/?igsh=MWVyN3c3aDV5bDV0Ng==',
          'https://www.instagram.com/reel/DNVR1LSzv20/?igsh=MTBlMjc4NzY4c29xeg==',
          'https://www.instagram.com/reel/DMNJ8K3T1qx/?igsh=aHQ5ZnFsb2RsZzRr',
          'https://www.instagram.com/reel/DN8CVVCD_1M/?igsh=MWp3ZHJ4Znk3Zm1yYQ==',
          'https://www.instagram.com/reel/DU2QqUkj6xw/?igsh=dHdudDdvbWVvY3M0',
          'https://www.instagram.com/reel/DP3pm0WD3yX/?igsh=MWRtcnRqd3RxdzBncw==',
        ]
      },
      {
        title: 'Skincare Reviews',
        desc: 'texture shots, routine context, honest first impressions, and ingredient-led takeaways',
        sticker: 'assets/anu/genre-stickers/skincare-reviews.png',
        links: [
          'https://www.instagram.com/reel/DaF5bqWPKaO/?igsh=MWNzMDR5YTVpeWV0Yw==',
          'https://www.instagram.com/reel/DZWdX4GvqYo/?igsh=bnRmN2NqNnVyc3R5',
          'https://www.instagram.com/reel/DXZo-gvj4qR/?igsh=MXF3Z28wb3NjZjZjNg==',
        ]
      },
      {
        title: 'Fitness Challenges',
        desc: 'challenge formats, gym routines, progress check-ins, and activewear integrations',
        sticker: 'assets/anu/genre-stickers/fitness-challenges.png',
        links: [
          'https://www.instagram.com/reel/DYSFC_ZPy-k/?igsh=MTZheWgwNmE2NnVkbA==',
          'https://www.instagram.com/reel/DYXWQqUomgj/?igsh=MXJlaDBkcmp2YWhxeA==',
          'https://www.instagram.com/reel/DaPqg7fS-rM/?igsh=MXJtN2h3ZGEweHZrYg==',
          'https://www.instagram.com/reel/DYhUIAIv9BY/?igsh=MTJ1aXlvZzFoNjlrNw==',
        ]
      },
      {
        title: 'Hair Care Reviews',
        desc: 'wash-day routines, product texture shots, styling results, and easy-to-follow haircare POVs',
        sticker: 'assets/anu/genre-stickers/hair-care-reviews.png',
        links: [
          'https://www.instagram.com/reel/DY7FuJAPwyF/?igsh=MWZqbjltemI2MjRo',
          'https://www.instagram.com/reel/DY9J8w3v36U/?igsh=MWNhcXFxZXR6b2E0cQ==',
          'https://www.instagram.com/reel/DZKfXSpPZuA/?igsh=b3dnY3M4bW1mbzY0',
          'https://www.instagram.com/reel/DV3w9WaD3J_/?igsh=MWI2N2EyeHkzaHJz',
        ]
      },
      {
        title: 'Makeup Reviews',
        desc: 'swatches, wear tests, finish checks, and creator-led beauty opinions that feel useful',
        sticker: 'assets/anu/genre-stickers/makeup-reviews.png',
        links: [
          'https://www.instagram.com/reel/DaNeI7zP3VH/?igsh=cmRoY3g2emxlanRw',
          'https://www.instagram.com/reel/DYydOorv6DK/?igsh=MTFjZDUxbTdwODFxdQ==',
          'https://www.instagram.com/reel/DXzARbtvJn0/?igsh=OHJpZnBsOWF1dGhv',
        ]
      },
      {
        title: 'Day In My Life',
        desc: 'lifestyle-led vlogs that place products naturally inside errands, rituals, food, and routines',
        sticker: 'assets/anu/genre-stickers/day-in-my-life.png',
        links: [
          'https://www.instagram.com/reel/DZpSu6VPaa8/?igsh=MWIxN2V4NHNmb2Q0aA==',
          'https://www.instagram.com/reel/DZtvEmRPNSt/?igsh=b3BvdG00eWw1ZGd6',
          'https://www.instagram.com/reel/DZ9fNZPPqBW/?igsh=a2hmOThiemg3dndr',
          'https://www.instagram.com/reel/DLeNteATcyr/?igsh=ZHQxeTB4M3RmbDZm',
        ]
      },
      {
        title: 'Store Visits',
        desc: 'in-store discovery, shelf moments, launch displays, trials, and location-first brand recall',
        sticker: 'assets/anu/genre-stickers/store-visits.png',
        links: [
          'https://www.instagram.com/reel/DUscYndj_gA/?igsh=NnptbG81czExZjkx',
          'https://www.instagram.com/reel/DTKTD-FD0qt/?igsh=MXN4cjE2Y3pzN3I1dQ==',
          'https://www.instagram.com/reel/DXs-6fgDy67/?igsh=MjN5OWZrenA1dnZn',
        ]
      },
      {
        title: 'Brand Integration',
        desc: 'soft product placement inside real creator moments, keeping the brand visible without forcing the edit',
        sticker: 'assets/anu/genre-stickers/brand-integration.png',
        links: [
          'https://www.instagram.com/reel/DYxG9eaPeAR/?igsh=MTBhN3c1aTM5M3A0YQ==',
          'https://www.instagram.com/reel/DYuaHjVPlgB/?igsh=ZWNtM3Vra3Q5dXR3',
        ]
      },
    ],
    loveComments: [
      { quote: 'Your routines feel so doable. I actually started lifting because of your reels.', source: 'Follower DM' },
      { quote: 'This is the first skincare review that felt honest and still made me curious.', source: 'Comment on skincare reel' },
      { quote: 'Saved this immediately. The matcha places you find are always elite.', source: 'Cafe reel comment' },
      { quote: 'Our reel had the exact tone we wanted: polished, warm, and not salesy.', source: 'Brand partner' },
    ],
  },

  // ── Element definitions ──
  elements: [
    // ─── HERO (dead center, large) ───
    {
      id: 'hero',
      type: 'hero',
      x: 2200,
      y: 1880,
      width: 620,
      height: 250,
      depth: 3,
      rotation: 0,
      data: {
        name: '',
        tagline: 'Anu',
        highlightWord: 'Srivastava',
        tagline2: '',
        subtitle: 'Fitness · Iced Coffees · Skincare · Fashion Creator'
      }
    },

    // ─── STICKER (next to hero) ───
    {
      id: 'illust-designer',
      type: 'image-sticker',
      x: 2055,
      y: 1780,
      width: 176,
      height: 176,
      depth: 2,
      rotation: -3,
      data: {
        src: 'assets/anu/sticker-beauty-last-row.png',
        alt: 'Beauty and skincare product flatlay',
        speechBubble: 'GRWM?',
        clickAction: 'openNotesPanel',
        noteKey: 'grwm'
      }
    },

    // ─── CHAI STICKER (interactive, opens recipe panel) ───
    {
      id: 'illust-chai',
      type: 'image-sticker',
      x: 2625, y: 2205,
      width: 150, height: 150,
      depth: 2, rotation: 5,
      data: {
        src: 'assets/anu/sticker-iced-coffee.png',
        alt: 'Iced coffee and cafe drink ritual',
        speechBubble: 'iced coffee >>',
        clickAction: 'openNotesPanel',
        noteKey: 'coffee'
      }
    },

    // ─── DRAGGABLE STICKERS (scattered around) ───
    {
      id: 'sticker-bookshelf',
      type: 'draggable-sticker',
      x: 2395,
      y: 1710,
      width: 150,
      height: 150,
      depth: 2,
      rotation: 7,
      data: {
        src: 'assets/anu/sticker-shopping.png',
        alt: 'Fashion and shopping content'
      }
    },
    // ─── CREATOR ENERGY STICKER ───
    {
      id: 'sticker-energy',
      type: 'draggable-sticker',
      x: 2755, y: 1960,
      width: 166, height: 166,
      depth: 2, rotation: -3,
      data: {
        src: 'assets/anu/sticker-gym-top.png',
        alt: 'Fitness creator energy sticker'
      }
    },
    {
      id: 'sticker-supplements',
      type: 'image-sticker',
      x: 2635,
      y: 1665,
      width: 152,
      height: 152,
      depth: 2,
      rotation: -5,
      data: {
        src: 'assets/anu/sticker-supplements.png',
        alt: 'Fitness supplements and wellness products',
        speechBubble: 'lifemaxxing stack',
        clickAction: 'openNotesPanel',
        noteKey: 'supplements'
      }
    },

    // ─── WORK STACKS (grouped project decks) ───
    {
      id: 'stack-web',
      type: 'work-stack',
      x: 1935,
      y: 1635,
      width: 220,
      height: 290,
      depth: 3,
      rotation: -2,
      data: {
        stackName: 'Insights',
        stackType: 'reach',
        shortcut: {
          label: 'Insights',
          slug: '/insights',
          folder: 'assets/anu/folders/folder-blue.png',
        },
        categoryTags: ['Instagram', 'Reels', 'Interactions'],
        cards: [
          { title: '2.1M', color: '#A0D4A6', thumbText: '2.1M', desc: 'Monthly Instagram reach.' },
          { title: '25K', color: '#EA89B9', thumbText: '25K', desc: 'Average reel views.' },
          { title: '59K', color: '#6CC2EA', thumbText: '59K', desc: 'Interactions across content.' },
          { title: '7%', color: '#F8C614', thumbText: '7%', desc: 'Save rate on routine-led reels.' },
        ]
      }
    },
    {
      id: 'stack-brand',
      type: 'work-stack',
      x: 2845,
      y: 1640,
      width: 220,
      height: 290,
      depth: 3,
      rotation: 3,
      data: {
        stackName: 'Brand Collabs',
        stackType: 'brands',
        shortcut: {
          label: 'Brand Collabs',
          slug: '/brand-collabs',
          folder: 'assets/anu/folders/folder-pink.png',
        },
        categoryTags: ['Fitness', 'Beauty', 'Fashion'],
        previewNames: ['Google', 'Amazon Prime', 'Uber', 'Flipkart', 'Swiggy', 'Zomato', 'KFC', 'Subway', 'Tinder', 'Nykaa', 'Zepto', 'Giva'],
        cards: [
          { title: 'Pilates Club', color: '#F8C614', thumbText: 'PC', desc: 'Fitness studio campaigns.' },
          { title: 'Glow Theory', color: '#EA89B9', thumbText: 'GT', desc: 'Skincare product routines.' },
          { title: 'Matcha Lab', color: '#A0D4A6', thumbText: 'ML', desc: 'Cafe and menu drops.' },
          { title: 'Muse Label', color: '#6CC2EA', thumbText: 'ML', desc: 'Fashion styling reels.' },
        ]
      }
    },
    {
      id: 'stack-packaging',
      type: 'work-stack',
      x: 1935,
      y: 2110,
      width: 220,
      height: 290,
      depth: 3,
      rotation: -1,
      data: {
        stackName: 'Work',
        stackType: 'genres',
        shortcut: {
          label: 'Work',
          slug: '/work',
          folder: 'assets/anu/folders/folder-lime.png',
        },
        categoryTags: ['Sponsored', 'UGC', 'Cafe'],
        cards: [
          { title: 'Sponsored Reels', color: '#F37B75', thumbText: 'SPON', desc: 'Native brand-led reels.' },
          { title: 'UGC', color: '#A0D4A6', thumbText: 'UGC', desc: 'Ad-ready social proof.' },
          { title: 'Cafe Visits', color: '#6CC2EA', thumbText: 'CAFE', desc: 'Location-led food edits.' },
          { title: 'Try On Hauls', color: '#F8C614', thumbText: 'TRY', desc: 'Styling and fit-check edits.' },
        ]
      }
    },

    // ─── ABOUT & CONTACT INFO CARDS ───
    {
      id: 'about',
      type: 'info-card',
      x: 2350,
      y: 2010,
      width: 220,
      height: 220,
      depth: 3,
      rotation: -2,
      data: {
        variant: 'about',
        title: 'People love this',
        content: 'Why me →',
        photo: 'assets/anu/anu-profile.png',
        photoAlt: 'Anu Srivastava'
      }
    },
    {
      id: 'contact',
      type: 'info-card',
      x: 2860,
      y: 1925,
      width: 220,
      height: 220,
      depth: 3,
      rotation: 2,
      data: {
        variant: 'contact',
        title: "Let's Collab",
        content: "UGC, reels, event visits, product launches and honest storytelling.",
        email: 'escapeplace1@gmail.com',
        cta: 'Pitch me',
        icon: '→'
      }
    },
  ],

  // ── Brand project data for grid + case study ──
  brandProjects: [
    {
      id: 'presales',
      title: 'PreSales Collective',
      subtitle: 'Branding, illustration, and web design for PreSales Collective — the world\'s largest community for presales professionals. A cohesive visual system built to serve 50,000+ members worldwide.',
      category: 'Brand Identity Design',
      industry: 'Professional Community',
      year: '2025',
      director: 'Anu Srivastava',
      thumb: 'assets/Branding Case Studies/Presales Collective/Thumbnail.png',
      heroImage: 'assets/Branding Case Studies/Presales Collective/Identity Concept 2-01.png',
      toc: ['The Challenge', 'Process', 'Outcome'],
      sections: [
        { type: 'image', src: 'assets/Branding Case Studies/Presales Collective/Identity Concept 2-02.png', caption: 'The refined PSC monogram — professional authority with approachable warmth.' },
        { type: 'image', src: 'assets/Branding Case Studies/Presales Collective/Identity Concept 2-03.png' },
        { type: 'text', heading: 'The Challenge', body: '<p>PreSales Collective had outgrown its original identity. With 50,000+ members across the globe, the brand needed a visual system that could scale across events, digital content, merchandise, and a content-heavy website.</p><h4>Scalability requirements</h4><p>The identity needed to work from conference stage backdrops to social media thumbnails, maintaining consistency across hundreds of content pieces per month.</p>' },
        { type: 'image', src: 'assets/Branding Case Studies/Presales Collective/Identity Concept 2-04.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Presales Collective/Identity Concept 2-05.png' },
        { type: 'text', heading: 'Process', body: '<p>Custom illustrations and a refined typographic system anchor the brand. Soft gradients and a lavender palette set the tone — professional yet approachable.</p><h4>Design methodology</h4><ol><li>Brand strategy & positioning research</li><li>Visual identity exploration & concepts</li><li>Custom illustration system development</li><li>Typography & color palette design</li><li>Website infrastructure & content templates</li></ol>' },
        { type: 'image', src: 'assets/Branding Case Studies/Presales Collective/Identity Concept 2-06.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Presales Collective/Identity Concept 2-08.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Presales Collective/Identity Concept 2-09.png' },
        { type: 'text', heading: 'Outcome', body: '<p>A scalable identity system with custom illustrations, type guidelines, and a content-forward website infrastructure — designed to serve a global community and grow with it.</p><p>The new brand increased member engagement and gave the community a visual identity that matched its industry authority.</p>' },
        { type: 'image', src: 'assets/Branding Case Studies/Presales Collective/Identity Concept 2-10.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Presales Collective/Identity Concept 2-12.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Presales Collective/Identity Concept 2-13.png' },
      ]
    },
    {
      id: 'operators',
      title: 'Operators',
      subtitle: 'Operators is a premier platform empowering strategic operations professionals — Chiefs of Staff, BizOps leaders, and more — by connecting them with curated communities and expert resources.',
      category: 'Brand Identity Design',
      industry: 'Tech Community',
      year: '2025',
      director: 'Anu Srivastava',
      thumb: 'assets/Branding Case Studies/operators/Thumbnail.png',
      heroImage: 'assets/Branding Case Studies/operators/Behance-01.png',
      toc: ['The Challenge', 'Process', 'Outcome'],
      sections: [
        { type: 'image', src: 'assets/Branding Case Studies/operators/Behance-02.png', caption: 'Logo construction — the cross-shaped mark built on a precise grid system.' },
        { type: 'image', src: 'assets/Branding Case Studies/operators/Behance-03.png' },
        { type: 'text', heading: 'The Challenge', body: '<p>Operators needed an identity that could stand alongside the biggest names in tech while feeling grassroots and genuine. The mark needed to signal precision, collaboration, and belonging.</p><h4>Community-first branding</h4><p>Unlike corporate brands, community identities need to feel ownable by members — something they\'re proud to wear and share.</p>' },
        { type: 'image', src: 'assets/Branding Case Studies/operators/Behance-04.png' },
        { type: 'image', src: 'assets/Branding Case Studies/operators/Behance-05.png' },
        { type: 'text', heading: 'Process', body: '<p>The cross-shaped mark suggests precision and collaboration. A dark palette with a neon yellow accent gives the brand an unmistakable presence.</p><h4>Design methodology</h4><ol><li>Community member interviews & surveys</li><li>Visual audit of tech community brands</li><li>Logo exploration & grid-based construction</li><li>Color system & dark mode-first approach</li><li>Brand guidelines & merchandise templates</li></ol>' },
        { type: 'image', src: 'assets/Branding Case Studies/operators/Behance-06.png' },
        { type: 'image', src: 'assets/Branding Case Studies/operators/Behance-07.png' },
        { type: 'text', heading: 'Outcome', body: '<p>A tight identity system that works across digital platforms, event materials, and community merchandise — building recognition for a fast-growing tech network.</p><p>The bold, minimal mark became instantly recognizable in the tech community space.</p>' },
        { type: 'image', src: 'assets/Branding Case Studies/operators/Behance-10.png' },
      ]
    },
    {
      id: 'miitra',
      title: 'Miitra',
      subtitle: 'Miitra is a lightweight customer data platform that aims to revolutionize the way community managers help their communities interact, collaborate, and thrive.',
      category: 'Brand Identity Design',
      industry: 'SaaS / Community Tech',
      year: '2024',
      director: 'Anu Srivastava',
      thumb: 'assets/Branding Case Studies/Miitra/Thumbnail.png',
      heroImage: 'assets/Branding Case Studies/Miitra/Behance-01.png',
      toc: ['The Challenge', 'Process', 'Outcome'],
      sections: [
        { type: 'image', src: 'assets/Branding Case Studies/Miitra/Behance-02.png', caption: 'Brand pillars — maximize engagement, leave no member behind, personalized at scale.' },
        { type: 'text', heading: 'The Challenge', body: '<p>Miitra needed to stand apart in the crowded community-management space. The brand had to communicate data intelligence and human connection simultaneously — technical enough for product teams, warm enough for community managers.</p><h4>Market positioning</h4><p>With Slack communities growing rapidly, Miitra needed a visual identity that signaled both analytical rigor and genuine community care.</p>' },
        { type: 'image', src: 'assets/Branding Case Studies/Miitra/Behance-03.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Miitra/Behance-04.png' },
        { type: 'text', heading: 'Process', body: '<p>The custom "M" mark abstracts growth and connection — two pillars of community building. A deep green palette with mint accents creates a sophisticated tech feel without being cold.</p><h4>Design methodology</h4><ol><li>Community research & stakeholder interviews</li><li>Visual identity exploration & concept development</li><li>Logo design & typography selection</li><li>Color palette & illustration system</li><li>Brand guidelines & digital applications</li></ol>' },
        { type: 'image', src: 'assets/Branding Case Studies/Miitra/Behance-05.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Miitra/Behance-07.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Miitra/Behance-08.png' },
        { type: 'text', heading: 'Outcome', body: '<p>A complete identity system spanning web, mobile, marketing collateral, and custom illustrations — designed to scale as the platform grows from startup to industry standard.</p><p>The custom illustration style became the brand\'s most distinctive asset, creating a recognizable visual language across all touchpoints.</p>' },
        { type: 'image', src: 'assets/Branding Case Studies/Miitra/01_new_Macbook-Pro-03-Standard-Mockup.png', caption: 'The final brand identity system in context.' },
      ]
    },
    {
      id: 'mycelium',
      title: 'Mycelium India',
      subtitle: 'Mycelium India is a leading biotech company harnessing the power of mycelium for health and sustainability — nutraceuticals and eco-friendly packaging solutions for a better future.',
      category: 'Brand Identity Design',
      industry: 'Biotech / Agriculture',
      year: '2023',
      director: 'Anu Srivastava',
      thumb: 'assets/Branding Case Studies/Mycelium India/Thumbnail.png',
      heroImage: 'assets/Branding Case Studies/Mycelium India/Behance-01.png',
      toc: ['The Challenge', 'Process', 'Outcome'],
      sections: [
        { type: 'image', src: 'assets/Branding Case Studies/Mycelium India/Behance-02.png', caption: 'Logomark and logo with wordmark — the flowing M references mycelium networks.' },
        { type: 'text', heading: 'The Challenge', body: '<p>Mycelium India is pioneering fungi-based solutions for agriculture and sustainability. The existing brand didn\'t reflect their scientific credibility or their mission to bring fungi innovation mainstream.</p><h4>Brand perception gap</h4><p>The company needed to be taken seriously by investors and scientists while remaining approachable for farmers and consumers.</p>' },
        { type: 'image', src: 'assets/Branding Case Studies/Mycelium India/Behance-03.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Mycelium India/Behance-04.png' },
        { type: 'text', heading: 'Process', body: '<p>The flowing "M" mark references mycelium networks — organic, interconnected, alive. We explored multiple color directions before landing on a rich teal palette that grounds the brand in nature.</p><h4>Design methodology</h4><ol><li>Industry research & competitive analysis</li><li>Brand strategy & positioning workshops</li><li>Logo design exploring organic forms</li><li>Color & typography system development</li><li>Comprehensive brand guidelines</li></ol>' },
        { type: 'image', src: 'assets/Branding Case Studies/Mycelium India/Behance-05.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Mycelium India/Behance-08.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Mycelium India/Behance-09.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Mycelium India/Behance-10.png' },
        { type: 'text', heading: 'Outcome', body: '<p>The rebrand positioned Mycelium India as a credible, forward-thinking biotech company. The visual language earns trust from both scientists and investors while celebrating the beauty of fungal networks.</p><p>The identity system now works across research presentations, product packaging, and digital platforms.</p>' },
        { type: 'image', src: 'assets/Branding Case Studies/Mycelium India/Behance-11.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Mycelium India/Behance-14.png' },
        { type: 'image', src: 'assets/Branding Case Studies/Mycelium India/Behance-15.png' },
      ]
    }
  ],

  // ── Packaging projects for slider + case study ──
  packagingProjects: [
    {
      id: 'oar',
      title: 'OAR Cosmetics',
      subtitle: 'Packaging design and brand identity for OAR Cosmetics, an advanced natural skincare line. The project encompassed label design across a full multi-SKU range.',
      category: 'Packaging Design',
      industry: 'Skincare / Beauty',
      year: '2026',
      director: 'Anu Srivastava',
      thumb: 'assets/Packaging/OAR Cosmetics/Thumbnail.png',
      tags: ['Packaging', 'Skincare', 'Multi-SKU'],
      color: '#F37B75',
      toc: ['The Challenge', 'The Approach', 'The Result'],
      sections: [
        { type: 'image', src: 'assets/Packaging/OAR Cosmetics/OAR-cosmetics_Design-Concept-Presentation.png', caption: 'OAR Cosmetics — full range packaging concept.' },
        { type: 'text', heading: 'The Challenge', body: '<p>OAR Cosmetics came to us as a skincare brand with a clear product vision but no design direction. The ask was open: create packaging that felt premium, natural, and distinctive — across a full product line including a Perfecting Toning Mist, Facial Cleansing Cream, Hyaluronic Acid Serum, Hydrating Moisturiser, and 15% Vitamin C treatment.</p><h4>Market context</h4><p>The brand needed to occupy a confident space in a saturated skincare market — one where consumers are increasingly drawn to clean aesthetics that still feel luxurious.</p>' },
        { type: 'image', src: 'assets/Packaging/OAR Cosmetics/OAR cosmetics_Design Concept Presentation-13.png' },
        { type: 'image', src: 'assets/Packaging/OAR Cosmetics/OAR cosmetics_Design Concept Presentation-14.png' },
        { type: 'text', heading: 'The Approach', body: '<p>The design system was built around restraint. A bespoke wordmark for OAR anchored the identity — geometric and minimal, with a quiet sophistication that communicates clinical credibility without feeling cold.</p><h4>Design language</h4><p>The colour palette leaned into warm amber browns and matte whites, referencing natural ingredients and earthy provenance while staying distinctly modern. Typography was kept spare and editorial, letting breathing room do the heavy lifting.</p>' },
        { type: 'image', src: 'assets/Packaging/OAR Cosmetics/freepik__oar-facial-cleansing-cream-bottle-on-concrete-surf__27669.png' },
        { type: 'image', src: 'assets/Packaging/OAR Cosmetics/freepik__oar-eye-cream-tube-on-concrete-surface-with-olive-__27671.png' },
        { type: 'image', src: 'assets/Packaging/OAR Cosmetics/freepik__professional-product-photograph-of-oar-facial-clea__87613.png' },
        { type: 'text', heading: 'The Result', body: '<p>A cohesive multi-SKU packaging system delivered within a tight one-month timeline, with the first concept presented within three days of project kickoff.</p><p>The final system scales effortlessly across formats: from full-size spray bottles to compact serums and travel tubes, the OAR identity remains immediately recognisable on shelf.</p>' },
        { type: 'image', src: 'assets/Packaging/OAR Cosmetics/freepik__enhance__87619.png' },
        { type: 'image', src: 'assets/Packaging/OAR Cosmetics/freepik__enhance__86482.png' },
        { type: 'image', src: 'assets/Packaging/OAR Cosmetics/freepik__enhance__87625.png' },
      ]
    },
    {
      id: 'lifecykel',
      title: 'Lifecykel',
      subtitle: 'Packaging design for Lifecykel\'s medicinal mushroom extract range. Featuring custom botanical illustrations and a muted earthy palette to create a premium, approachable system.',
      category: 'Packaging Design',
      industry: 'Biotech / Nutraceuticals',
      year: '2026',
      director: 'Anu Srivastava',
      thumb: 'assets/Packaging/Lifecykel/Thumbnail.png',
      tags: ['Packaging', 'Supplements', 'Illustration'],
      color: '#A0D4A6',
      toc: ['The Brief', 'The Process', 'The Result'],
      sections: [
        { type: 'image', src: 'assets/Packaging/Lifecykel/LC Range.png', caption: 'Lifecykel — full medicinal mushroom extract range.' },
        { type: 'text', heading: 'The Brief', body: '<p>Lifecykel is an Australian mushroom biotechnology company dedicated to harnessing the remarkable potential of medicinal mushrooms. Founded in 2015, the brand has grown into a globally recognized name, offering full-spectrum double liquid extracts.</p><h4>Objective</h4><p>Design a cohesive premium packaging system where each product feels elevated and shelf-worthy, while remaining distinctly approachable — communicating the organic, science-backed nature of the brand to a health-conscious audience.</p>' },
        { type: 'image', src: 'assets/Packaging/Lifecykel/Before After.png', caption: 'Before and after — the rebrand transformation.' },
        { type: 'image', src: 'assets/Packaging/Lifecykel/LC Images.png' },
        { type: 'text', heading: 'The Process', body: '<p>To achieve a high-end feel in line with Lifecykel\'s ethos, I built the design language around a muted, earthy color palette — grounding each product in its natural origins while keeping the overall range visually cohesive.</p><h4>Custom illustrations</h4><p>At the heart of the system are custom botanical illustrations, uniquely crafted for each mushroom variety. Rather than relying on photography or generic icons, these hand-crafted illustrations give each package its own character and instantly connect the customer to what\'s inside.</p>' },
        { type: 'image', src: 'assets/Packaging/Lifecykel/LC Images2.png' },
        { type: 'image', src: 'assets/Packaging/Lifecykel/LC Images3.png' },
        { type: 'image', src: 'assets/Packaging/Lifecykel/LC Images4.png' },
        { type: 'text', heading: 'The Result', body: '<p>The result is a packaging range that feels both personal and purposeful — making it effortless for customers to identify and choose between individual mushroom varieties at a glance.</p>' },
        { type: 'image', src: 'assets/Packaging/Lifecykel/freepik__enhance__79186.png' },
        { type: 'image', src: 'assets/Packaging/Lifecykel/freepik__enhance__79189.png' },
        { type: 'image', src: 'assets/Packaging/Lifecykel/freepik__enhance__79197.png' },
      ]
    },
    {
      id: 'hempful',
      title: 'Hempful',
      subtitle: 'A vibrant packaging design case study for Hempful, a hemp-based food brand offering flavourful hemp dip spreads. Bold, expressive label design that bridges wellness and everyday cooking.',
      category: 'Packaging Design',
      industry: 'Food / CPG',
      year: '2026',
      director: 'Anu Srivastava',
      thumb: 'assets/Packaging/Hempful/Thumbnail.png',
      tags: ['Packaging', 'Food', 'CPG'],
      color: '#F8C614',
      toc: ['The Challenge', 'The Process', 'The Result'],
      sections: [
        { type: 'image', src: 'assets/Packaging/Hempful/freepik__enhance__83082.png', caption: 'Hempful hemp dip spreads — full product range.' },
        { type: 'text', heading: 'The Challenge', body: '<p>Hempful is a hemp-based food brand bringing the nutritional power of hemp seeds into everyday kitchen staples. The challenge was to design packaging that felt approachable, joyful, and shelf-ready, while clearly communicating the brand\'s plant-forward values.</p><h4>Product differentiation</h4><p>Each variant needed a distinct personality through color and form, yet remain cohesive as a product family — bridging the gap between health-conscious shoppers and casual grocery buyers.</p>' },
        { type: 'image', src: 'assets/Packaging/Hempful/freepik__enhance__69322.png' },
        { type: 'image', src: 'assets/Packaging/Hempful/freepik__enhance__69323.png' },
        { type: 'text', heading: 'The Process', body: '<p>This case study documents the complete label design system for Hempful\'s range of hemp dip spreads — still emerging, often misunderstood, and needing to bridge the gap between health-conscious shoppers and casual grocery buyers.</p><h4>Design approach</h4><p>Bold, expressive label design that bridges wellness and everyday cooking — crafted to stand out on shelf while communicating the brand\'s natural, plant-forward identity.</p>' },
        { type: 'image', src: 'assets/Packaging/Hempful/freepik__enhance__83085.png' },
        { type: 'text', heading: 'The Result', body: '<p>A cohesive product family where each variant has its own personality through color and illustration, yet instantly reads as part of the Hempful range on any shelf.</p>' },
        { type: 'image', src: 'assets/Packaging/Hempful/freepik__enhance__98820.png' },
      ]
    }
  ],

  // ── Legacy project page content (kept for any remaining references) ──
  projects: {},

  // ── Web projects for slider ──
  webProjects: [
    { id: 'web-kindred', title: 'Kindred Web Studio', url: 'https://kindredwebstudio.com', tags: ['Web Design', 'Development'], color: '#6CC2EA', screenshot: 'assets/screenshots/kindred.png?v=5' },
    { id: 'web-sylva', title: 'Sylva', url: 'https://withsylva.com', tags: ['Web Design', 'Development'], color: '#EA89B9', screenshot: 'assets/screenshots/sylva.png?v=3' },
    { id: 'web-operators', title: 'Operators', url: 'https://joinoperators.com', tags: ['Web Design', 'Development'], color: '#A0D4A6', screenshot: 'assets/screenshots/operators.png?v=3' },
    { id: 'web-presales', title: 'PreSales Collective', url: 'https://presalescollective.com', tags: ['Web Design', 'Development', 'Brand Refresh'], color: '#F8C614', screenshot: 'assets/screenshots/presales.png?v=3' },
    { id: 'web-closedloop', title: 'Closed Loop Center', url: 'https://closedloopcenter.com', tags: ['Web Design', 'UX Strategy'], color: '#F37B75', screenshot: 'assets/screenshots/closedloop.png?v=3' },
  ],

  about: {
    heading: 'Why work with Anu',
    bio: "I create feel-good lifestyle content around fitness, matcha and ube finds, skincare rituals, and fashion. The work sits between useful and aspirational: routines people can copy, products they can understand, and reels that still feel like a real recommendation.",
    philosophy: "My audience shows up for warmth, consistency, and taste. I care about pacing, hooks, texture shots, honest captions, and the small human details that make branded content feel native to the feed.",
    aiThesis: "For brand partners, I bring a creator's eye and a strategist's discipline: clear concepts, quick turnaround, clean deliverables, and content built for saves, shares, replies, and product curiosity.",
    proofIntro: 'Real audience reactions and real reel performance, side by side.',
    proofCards: [
      {
        title: 'Authenticity people call out',
        label: 'Audience love',
        copy: 'Followers describe the content as wholesome, genuine, and easy to trust.',
        image: 'assets/anu/social-proof/comment-authentic.png',
        alt: 'Instagram comment praising Anu as authentic and wholesome'
      },
      {
        title: 'UGC that creates product intent',
        label: 'Beauty proof',
        copy: 'Recommendation-led content turns curiosity into cart-ready comments.',
        image: 'assets/anu/social-proof/comment-mars.png',
        alt: 'Instagram comment saying the product recommendation is going into cart'
      },
      {
        title: 'Products people want to try',
        label: 'Lifestyle pull',
        copy: 'Casual comments become a signal that the format is memorable and persuasive.',
        image: 'assets/anu/social-proof/comment-video-cool.png',
        alt: 'Instagram comment saying the video and products are cool'
      },
      {
        title: 'Content that drives questions',
        label: 'Purchase intent',
        copy: 'Strong visuals make followers ask for links, not just leave likes.',
        image: 'assets/anu/social-proof/comment-share-link.png',
        alt: 'Instagram comment asking Anu to share the link'
      },
      {
        title: 'Brand collaborations with traction',
        label: '106K views',
        copy: 'Sponsored work can still feel native when the hook and pacing are right.',
        image: 'assets/anu/social-proof/insight-street-origins.png',
        alt: 'Instagram reel insight showing 106,442 views'
      },
      {
        title: 'High-retention reel formats',
        label: '1M+ views',
        copy: 'Strong formats create repeatable momentum across beauty and lifestyle briefs.',
        image: 'assets/anu/social-proof/insight-one-million.png',
        alt: 'Instagram reel insight showing 1,049,035 views'
      },
      {
        title: 'Reach beyond the first platform',
        label: '114K reached',
        copy: 'Cross-posted content can keep finding new viewers after the first push.',
        image: 'assets/anu/social-proof/insight-crosspost.png',
        alt: 'Instagram reel insight showing 251,442 views and 114,642 accounts reached'
      },
      {
        title: 'Proof at scale',
        label: '5.4M views',
        copy: 'When the concept lands, saves and shares compound into serious discovery.',
        image: 'assets/anu/social-proof/insight-viral.png',
        alt: 'Instagram reel insight showing 5,435,190 views'
      },
    ],
    skills: ['Fitness Reels', 'Skincare POVs', 'Fashion Try-ons', 'Cafe Visits', 'UGC', 'Story Campaigns']
  },

  contact: {
    statement: "Let's make content people actually save.",
    email: 'escapeplace1@gmail.com',
    social: [
      { platform: 'Instagram', url: 'https://www.instagram.com/escapeplace_', icon: 'instagram' },
      { platform: 'X', url: 'https://x.com/escapeplace__', icon: 'x' },
      { platform: 'Email', url: 'mailto:escapeplace1@gmail.com', icon: 'email' }
    ]
  }
};
