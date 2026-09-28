/* Varionica Craft Brewery — main.js */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const fmt = (n) => String(n).replace('.', ',');

  /* ------------------------------------------------------------
     Data
  ------------------------------------------------------------ */
  const BEERS = {
    klasici: [
      { img: 'pale-ale', name: 'Pale Ale', style: 'American Pale Ale', year: 2015, abv: 5.2, ibu: 38,
        tag: 'U početku bijaše Pale Ale.',
        desc: 'Posebno biranom kombinacijom sladova i američkih sorti hmelja nastalo je pivo bogatog okusa, voćnog mirisa i jantarne boje. Dodatnim suhim hmeljenjem naglašena je svježina hmelja te aroma citrusa i borovine.',
        notes: ['Pitko', 'Posebno', 'Citrusno'],
        award: 'Dvostruko zlato · European Beer Challenge 2020. i zlato · Asia Beer Challenge 2021.',
        accent: '#1aa3bf', liquid: '#e59b32' },
      { img: 'deep-dive-ipa', name: 'Deep Dive IPA', style: 'American IPA', year: 2019, abv: 6, ibu: 50,
        tag: 'Pivo koje će vas duboko dirnuti.',
        desc: 'Duboko udahnite i zaronite u punoću okusa. Američki hmeljevi Citra, Mosaic i Centennial donose arome koštuničavog voća, manga, papaje i citrusa – prava hmeljna bomba neodoljive pitkosti.',
        notes: ['Duboko', 'Hmeljasto', 'Tropsko-voćno'],
        award: 'Dvostruko zlato · European Beer Challenge 2021.',
        accent: '#7a3fb0', liquid: '#e9a53b' },
      { img: 'siesta-session', name: 'Siesta Session IPA', style: 'Session IPA', year: 2017, abv: 4.4, ibu: 45,
        tag: 'Uvijek je vrijeme za Siestu.',
        desc: 'Bogato zahmeljena, vrlo lagana i jako pitka IPA finih tropskih aroma, s hmeljevima Mosaic i Cascade. Isprobajte je uz tajlandski curry ili meksičke tortilje i pustite da tropsko voće i citrusi zaigraju sa začinima.',
        notes: ['Lagano', 'Svježe', 'Voćno'],
        award: 'Zlato · European Beer Challenge 2021. i srebro · Asia Beer Challenge 2021.',
        accent: '#239179', liquid: '#efb64d' },
      { img: 'neon-stout', name: 'Neon Stout', style: 'Oatmeal Stout', year: 2016, abv: 6.2, ibu: 28,
        tag: 'Malo crno pivo.',
        desc: 'Ponosni tamni predstavnik Varionice. Kombinacija više specijalnih sladova i žitarica daje izuzetnu punoću okusa i kremastu teksturu, naglašenu notama crne kave, orašastih plodova i čokolade.',
        notes: ['Puno', 'Kremasto', 'Čokoladno'],
        award: 'Zlato · European Beer Challenge 2021., London',
        accent: '#b02a6c', liquid: '#3a1c12' },
      { img: 'pop-lager', name: 'Pop!Lager', style: 'Munich Helles', year: 2020, abv: 4.9, ibu: 17,
        tag: 'Lager koji ćete uvijek htjeti imati na lageru.',
        desc: 'Predstavnik minhenskog helles stila koji se, poput pop-arta kojim je inspiriran, uvlači u svakodnevicu. Osvježavajući lager naglašenih sladnih aroma i mekane gorčine – idealan za vruće dane, uz meso i plodove mora.',
        notes: ['Pitko', 'Svježe', 'Mekane gorčine'],
        award: 'Bronca · Asia Beer Challenge 2021.',
        accent: '#3f78c0', liquid: '#f1c65c' }
    ],
    specijali: [
      { img: 'chefs-beer', name: "Chef's Beer", style: 'Old Ale × Flanders Oud Bruin', year: 2020, abv: 9.3, ibu: 30,
        tag: 'Pivo s umjetničkim potpisom.',
        desc: 'Nastalo iz jedinstvene suradnje pivara, vinara i chefa vrhunske kuhinje. Kompleksno pivo punog sladnog tijela, savršeno balansiranih voćnih, slatkastih i drvenastih aroma – zamišljeno kao dio gastronomskog doživljaja.',
        notes: ['Voćno', 'Slatkasto', 'Drvenasto'],
        award: "Zlato · European Beer Challenge 2020. Etiketa: A'Design Award i Platinum Crushie.",
        collab: 'BIBICh, Barut Brewing & Blending, Mate Janković, Zmajska pivovara',
        accent: '#8f8a93', liquid: '#6b2f18' },
      { img: 'hazel-cake-porter', name: 'Hazel Cake Porter', style: 'Porter', year: 2021, abv: 7.77, ibu: 50,
        tag: 'Desert u čaši.',
        desc: 'Zavodljiv, mirisan i slatkast porter – desert u obliku piva. Kremasti okus lješnjaka i marcipana obavijen je slojevima tamne čokolade i kakaa koji smo sami tostirali.',
        notes: ['Kremasto', 'Slatkasto', 'Lješnjak i kakao'],
        accent: '#b07a41', liquid: '#2f170d' },
      { img: 'mr-pink-monster', name: 'Mr. Pink Monster', style: 'Fruit Ale · maline', year: 2020, abv: 6.66, ibu: 28,
        tag: 'Čudo(vište) u rozom.',
        desc: 'Neobična kombinacija malina i cider kvasca zakuhala je voćnu, svježu i kiselkastu, ali prije svega pitku priču. Oprez: iza zavodljive voćnosti skriva se 6,66 % alkohola.',
        notes: ['Bobičasto', 'Svježe', 'Pitko'],
        collab: 'Munich Brew Mafia',
        accent: '#d4145a', liquid: '#c43a5c' },
      { img: 'passion-sour', name: 'Passion Sour', style: 'Gose · marakuja', year: 2020, abv: 4.5, ibu: 10,
        tag: 'Osvježavajuća marakuja.',
        desc: 'Svježe pivo na bazi gosea, slankasto-kiselkastog njemačkog stila s korijandrom, obogaćeno pireom od marakuje. Nastalo za zagrebački restoran NOEL – savršeno uz školjke, rakove i bijelu ribu.',
        notes: ['Voćno', 'Začinjeno', 'Slankasto'],
        award: 'Bronca · European Beer Challenge 2020.',
        collab: 'Restoran NOEL, Zagreb',
        accent: '#e9b10f', liquid: '#f0cf6d' },
      { img: 'lively-neon', name: 'Lively Neon Cold Brew', style: 'Coffee Stout', year: 2019, abv: 6.2, ibu: 28,
        tag: 'Kava ili pivo? Hvala. Može.',
        desc: 'Neon Stout susreće cold brew kostarikanske kave. Pojačane čokoladne i kavene arome prženog slada uz zavodljivu aromatiku orašastih plodova – najbolje iz pržionice i varionice.',
        notes: ['Puno', 'Kremasto', 'Kavasto'],
        collab: 'Lively Roaster Co.',
        accent: '#2f6fd6', liquid: '#2a150d' },
      { img: 'hack3r-ipa', name: 'Hack3r IPA', style: 'American IPA · Black Hat', year: 2021, abv: 6.6, ibu: 45,
        tag: 'Sigurno dobro pivo.',
        desc: 'Zavodljiva i opasna ljepotica u stilu američke IPA-e. Kreativna voćna bomba s tropskom harmonijom ananasa i kokosa, u savršenom balansu s aromatičnim hmeljem.',
        notes: ['Voćna bomba', 'Tropsko', 'Zavodljivo'],
        award: 'Zlato · Asia Beer Challenge 2021.',
        collab: 'Combis',
        accent: '#3fae6e', liquid: '#e3a33a' },
      { img: 'habaneon-stout', name: 'HabaNeon Stout', style: 'Oatmeal Stout · habanero', year: 2017, abv: 6.2, ibu: 28,
        tag: 'Tko se to ljuti?',
        desc: 'Puni okus crne kave i čokolade, začinjen tostiranim habanerom. Pikantna aroma i ugodno ljutkast završetak savršeno se slažu s kremastim osjećajem Oatmeal stouta.',
        notes: ['Puno', 'Kremasto', 'Ljutkasto'],
        collab: 'Volim ljuto',
        accent: '#d8412f', liquid: '#2a140c' },
      { img: 'papak', name: 'Papak', style: 'Lager', year: 2020, abv: 4.9, ibu: 37,
        tag: 'Predivno pitak.',
        desc: 'Svježe, karakterno i beskompromisno kvalitetno pivo, kreirano s chefom Matom Jankovićem. Bogata aroma krušnog slada uz biljne, cvjetne i začinske note hmelja. Ne budi papak, pij Papak.',
        notes: ['Cvjetno', 'Herbalno', 'Lagano'],
        collab: 'Mate Janković',
        accent: '#be3648', liquid: '#eab44c' },
      { img: 'swanky-blond-ale', name: 'Swanky Blond Ale', style: 'Blond Ale', year: 2019, abv: 4.7, ibu: 19,
        tag: 'B(l)ondajte se u Swankyju.',
        desc: 'Nježno i vrlo pitko pivo koje osvaja svježinom. Balansirana igra sladno-medenih aroma i voćnih nota – odličan izbor uz ugodno društvo, azijska jela, čili ili mango salsu.',
        notes: ['Lagano', 'Keksasto', 'Cvjetno'],
        collab: 'Swanky Monkey Garden',
        accent: '#e2b80c', liquid: '#f3c957' }
    ]
  };

  const LAB = [
    { name: 'Sunburst Pilsner', style: 'German Pilsner', year: 2024, abv: 4.9, ibu: 25, liquid: '#f3d064',
      desc: 'Suvremena interpretacija German pilsnera – kristalno bistar, osvježavajuće gorčine, cvjetnih i herbalnih nota te čistog, suhog završetka.' },
    { name: 'Tukan Sour', style: 'Sour · limeta i bosiljak', year: 2024, abv: 4.9, ibu: 10, liquid: '#cfd66a',
      desc: 'Citrusni sour s najsvježijim tajlandskim bosiljkom od Tukan greens – kiselkast, herbalan i vrlo pitak.' },
    { name: 'Solar Bock', style: 'Bock', year: 2024, abv: 6.5, ibu: 30, liquid: '#b8621f',
      desc: 'Hej Bock! Malo jači lager izraženog sladnog karaktera i suhog završetka koji pozdravlja proljeće.' },
    { name: '10 Cold IPA', style: 'Cold IPA', year: 2024, abv: 6.5, ibu: 30, liquid: '#f0c24e',
      desc: 'Rođendansko pivo za 10 godina hedonizma: marelica, nektarina i ananas, uz rižu i lager kvasac za vrhunsku svježinu.' },
    { name: 'Phantasm Orgasm', style: 'Thiolised IPA', year: 2023, abv: 6.7, ibu: 40, liquid: '#eeae3d',
      desc: 'Za 9. rođendan: prah od kožica novozelandskog Sauvignon Blanca i thiolima bogati hmeljevi za eksploziju voća.' },
    { name: 'Stellar Rave', style: 'Thiolised Pale Ale', year: 2023, abv: 6, ibu: 40, liquid: '#edb444',
      desc: 'Strata, Simcoe Cryo, Chinook i Saaz uz inovativni soj kvasca – savršen ritam grožđa, manga, guave i ananasa.' },
    { name: 'Stargazer', style: 'White IPA', year: 2022, abv: 6.3, ibu: 30, liquid: '#f1d27a',
      desc: 'Američki hmeljevi i belgijski kvasac: naranča, limeta, mandarina, kruška i začini. IPA sa stavom.' },
    { name: 'Melograno Sour', style: 'Fruited Sour · NOEL', year: 2022, abv: 4.7, ibu: 10, liquid: '#d9546b',
      desc: 'Kolaboracija s restoranom NOEL: nar, kardamom i limun u aromatičnoj, kiselkastoj priči bez gorčine.' }
  ];

  /* ------------------------------------------------------------
     Loader
  ------------------------------------------------------------ */
  const body = document.body;
  const pctEl = $('#loaderPct');
  const t0 = performance.now();
  const LOAD_MIN = RM ? 0 : 1500;
  let pageLoaded = document.readyState === 'complete';
  window.addEventListener('load', () => { pageLoaded = true; });
  function loaderTick(now) {
    const p = clamp((now - t0) / LOAD_MIN, 0, 1);
    const shown = pageLoaded ? p : Math.min(p, .9);
    if (pctEl) pctEl.textContent = Math.round(shown * 100);
    if (p >= 1 && pageLoaded) return finishLoading();
    if (now - t0 > 3800) return finishLoading();
    requestAnimationFrame(loaderTick);
  }
  let finished = false;
  function finishLoading() {
    if (finished) return; finished = true;
    if (pctEl) pctEl.textContent = '100';
    body.classList.add('loaded');
    body.classList.remove('is-loading');
    assembleLogo();
    setTimeout(() => { const l = $('#loader'); if (l) l.style.display = 'none'; }, 1300);
  }

  /* ------------------------------------------------------------
     Hero logo (clone symbol so petals can move independently)
  ------------------------------------------------------------ */
  const heroLogo = $('#heroLogo');
  const sym = $('#logo');
  let petals = [], stache = null, eyes = null;
  if (heroLogo && sym) {
    heroLogo.setAttribute('viewBox', sym.getAttribute('viewBox'));
    heroLogo.innerHTML = '';
    [...sym.children].forEach((ch) => heroLogo.appendChild(ch.cloneNode(true)));
    petals = $$('.lp', heroLogo);
    stache = $('.l-stache', heroLogo);
    eyes = $('.l-eye', heroLogo);
    petals.forEach((p, i) => p.style.setProperty('--i', i));
    heroLogo.classList.add('cloned');
  }
  function assembleLogo() {
    if (!heroLogo) return;
    requestAnimationFrame(() => heroLogo.classList.add('assembled'));
    setTimeout(() => { heroLogo.classList.add('idle'); twirl(); }, RM ? 0 : 2100);
  }
  function twirl() {
    if (!stache || RM) return;
    stache.classList.remove('twirl'); void stache.getBBox(); stache.classList.add('twirl');
  }
  if (heroLogo) {
    heroLogo.addEventListener('click', twirl);
    heroLogo.addEventListener('mouseenter', twirl);
    setInterval(() => { if (heroVisible && !document.hidden) twirl(); }, 7000);
  }

  // Petal vectors for scroll "bloom" + pointer parallax
  let vecs = [];
  function measurePetals() {
    if (!petals.length) return;
    const vb = heroLogo.viewBox.baseVal;
    const cx = vb.x + vb.width / 2, cy = vb.y + vb.height * .45;
    vecs = petals.map((p) => {
      const b = p.getBBox();
      const dx = b.x + b.width / 2 - cx, dy = b.y + b.height / 2 - cy;
      const len = Math.hypot(dx, dy) || 1;
      return { x: dx / len, y: dy / len, d: .5 + len / 500 };
    });
  }
  measurePetals();
  if (RM) finishLoading(); else requestAnimationFrame(loaderTick);

  const hero = $('.hero');
  const heroArt = $('.hero-art');
  const bottles = $$('.hero-bottle');
  let heroVisible = true;
  let ptr = { x: 0, y: 0 }, ptrS = { x: 0, y: 0 };
  if (FINE && hero) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      ptr.x = ((e.clientX - r.left) / r.width - .5) * 2;
      ptr.y = ((e.clientY - r.top) / r.height - .5) * 2;
    });
    hero.addEventListener('pointerleave', () => { ptr.x = 0; ptr.y = 0; });
  }

  /* ------------------------------------------------------------
     Bubbles canvas
  ------------------------------------------------------------ */
  const cv = $('#bubbles');
  let ctx, W = 0, H = 0, parts = [];
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  function mkBubble(init) {
    const r = Math.random() * 2.6 + .6;
    return {
      x: Math.random() * W, y: init ? Math.random() * H : H + 12,
      r, s: (Math.random() * .5 + .3) * (1 + r * .25), w: Math.random() * 6.28,
      ws: Math.random() * .02 + .008, a: Math.random() * .45 + .12,
      c: Math.random() < .72 ? '233,241,242' : (Math.random() < .5 ? '245,165,36' : '25,184,196')
    };
  }
  function sizeCanvas() {
    if (!cv) return;
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * DPR; cv.height = H * DPR;
    ctx = cv.getContext('2d'); ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const n = Math.round(clamp(W * H / 16000, 24, 80));
    parts = Array.from({ length: n }, () => mkBubble(true));
  }
  function drawBubbles() {
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.y -= p.s; p.w += p.ws;
      if (p.y < -12) Object.assign(p, mkBubble(false));
      const x = p.x + Math.sin(p.w) * 8;
      ctx.beginPath(); ctx.arc(x, p.y, p.r, 0, 6.2832);
      ctx.strokeStyle = `rgba(${p.c},${p.a})`; ctx.lineWidth = 1; ctx.stroke();
      if (p.r > 1.6) { ctx.beginPath(); ctx.arc(x - p.r * .35, p.y - p.r * .35, p.r * .28, 0, 6.2832); ctx.fillStyle = `rgba(255,255,255,${p.a * .9})`; ctx.fill(); }
    }
  }
  if (cv && !RM) sizeCanvas();

  /* ------------------------------------------------------------
     Main rAF loop (hero parallax + bubbles)
  ------------------------------------------------------------ */
  function heroFrame() {
    if (heroVisible && !document.hidden) {
      if (cv && ctx && !RM) drawBubbles();
      ptrS.x += (ptr.x - ptrS.x) * .08; ptrS.y += (ptr.y - ptrS.y) * .08;
      const sy = window.scrollY;
      const hh = hero ? hero.offsetHeight : 800;
      const p = clamp(sy / hh, 0, 1);
      if (heroLogo && heroLogo.classList.contains('idle') && !RM) {
        const bloom = p * 70;
        petals.forEach((el, i) => {
          const v = vecs[i]; if (!v) return;
          el.style.translate = `${(v.x * bloom + ptrS.x * 12 * v.d).toFixed(2)}px ${(v.y * bloom + ptrS.y * 12 * v.d).toFixed(2)}px`;
        });
        if (stache) stache.style.translate = `${(ptrS.x * 20).toFixed(2)}px ${(ptrS.y * 16 - p * 30).toFixed(2)}px`;
        if (eyes) eyes.style.translate = `${(ptrS.x * 26).toFixed(2)}px ${(ptrS.y * 20 - p * 30).toFixed(2)}px`;
      }
      if (heroArt && !RM) heroArt.style.transform = `translate3d(0, ${(sy * .18).toFixed(1)}px, 0)`;
      bottles.forEach((b, i) => { b.style.translate = `${(-ptrS.x * (i ? 18 : 14)).toFixed(1)}px ${(-ptrS.y * 12 + sy * (i ? -.06 : -.1)).toFixed(1)}px`; });
    }
    requestAnimationFrame(heroFrame);
  }
  requestAnimationFrame(heroFrame);
  if (hero) new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);

  /* ------------------------------------------------------------
     Nav: scrolled / hide on scroll / progress / active links
  ------------------------------------------------------------ */
  const nav = $('#nav');
  const prog = $('#progress');
  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 30);
    if (!body.classList.contains('menu-open')) {
      if (y > lastY + 6 && y > 500) nav.classList.add('hide');
      else if (y < lastY - 6 || y < 200) nav.classList.remove('hide');
    }
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (prog) prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    updateTimeline();
    updateParallax();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  const links = $$('.nav-links a');
  const secIO = new IntersectionObserver((ents) => {
    ents.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => secIO.observe(s));

  // Mobile menu
  const burger = $('#burger');
  const menu = $('#menu');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Zatvori izbornik' : 'Otvori izbornik');
    menu.setAttribute('aria-hidden', !open);
    if (open) nav.classList.remove('hide');
  }
  burger.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setMenu(false); closeLB(); } });

  /* ------------------------------------------------------------
     Reveal on scroll (+ stagger among simultaneous entries)
  ------------------------------------------------------------ */
  const revIO = new IntersectionObserver((ents) => {
    let k = 0;
    ents.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.style.transitionDelay = `${Math.min(k++ * 90, 450)}ms`;
      el.classList.add('in');
      revIO.unobserve(el);
      setTimeout(() => { el.style.transitionDelay = ''; }, 1600);
      $$('.count', el).concat(el.classList.contains('count') ? [el] : []).forEach(countUp);
    });
  }, { threshold: .14, rootMargin: '0px 0px -6% 0px' });
  function observeReveals(root = document) { $$('.reveal', root).forEach((el) => revIO.observe(el)); }

  function countUp(el) {
    const to = +el.dataset.to; if (!to || el.dataset.done) return;
    el.dataset.done = 1;
    const from = +(el.dataset.from || 0);
    const show = (n) => { el.textContent = 'plain' in el.dataset ? String(n) : n.toLocaleString('hr-HR'); };
    if (RM) { show(to); return; }
    const dur = 1800, st = performance.now();
    const step = (now) => {
      const t = clamp((now - st) / dur, 0, 1);
      const e = 1 - Math.pow(2, -10 * t);
      show(Math.round(from + (to - from) * (t === 1 ? 1 : e)));
      if (t < 1) requestAnimationFrame(step);
    };
    show(from);
    requestAnimationFrame(step);
  }

  /* ------------------------------------------------------------
     Beer showcase
  ------------------------------------------------------------ */
  const stage = $('#stage');
  const bottleEl = $('#stageBottle');
  const rail = $('#rail');
  const tabs = $$('.tab');
  const pill = $('.tab-pill');
  const F = {
    count: $('#sCount'), total: $('#sTotal'), style: $('#sStyle'), name: $('#sName'), tag: $('#sTag'),
    desc: $('#sDesc'), notes: $('#sNotes'), abv: $('#sAbv'), ibu: $('#sIbu'),
    abvBar: $('#sAbvBar'), ibuBar: $('#sIbuBar'), award: $('#sAward'), word: $('#stageWord')
  };
  let group = 'klasici', idx = 0, busy = false, stageSeen = false;

  // preload bottles
  window.addEventListener('load', () => {
    Object.values(BEERS).flat().forEach((b) => { const im = new Image(); im.src = `img/piva/${b.img}.webp`; });
  });

  function renderRail() {
    const list = BEERS[group];
    rail.innerHTML = list.map((b, i) =>
      `<button class="rail-item${i === idx ? ' is-active' : ''}" role="tab" aria-selected="${i === idx}" data-i="${i}"><img src="img/piva/${b.img}.webp" alt="" loading="lazy" width="60" height="230"><span>${b.name}</span></button>`
    ).join('');
    F.total.textContent = String(list.length).padStart(2, '0');
  }
  function setMeters(b) {
    F.abvBar.style.width = stageSeen ? `${clamp(b.abv / 10, 0, 1) * 100}%` : '0%';
    F.ibuBar.style.width = stageSeen ? `${clamp(b.ibu / 70, 0, 1) * 100}%` : '0%';
  }
  function fillInfo(b, i) {
    F.count.textContent = String(i + 1).padStart(2, '0');
    F.style.textContent = `${b.style} · ${b.year}.`;
    F.name.textContent = b.name;
    F.tag.textContent = b.tag;
    F.desc.textContent = b.desc;
    F.notes.innerHTML = b.notes.map((n) => `<li>${n}</li>`).join('');
    F.abv.textContent = `${fmt(b.abv)} %`;
    F.ibu.textContent = b.ibu;
    let aw = '';
    if (b.award || b.collab) {
      aw = (b.award ? '<svg viewBox="0 0 48 64" aria-hidden="true"><use href="#medal"/></svg>' : '<svg class="collab-ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/></svg>') +
        `<span>${b.award ? b.award : ''}${b.collab ? `<span class="collab">Suradnja: ${b.collab}</span>` : ''}</span>`;
    }
    F.award.innerHTML = aw;
    const t = `${b.name} • `.repeat(4);
    F.word.innerHTML = `<span>${t}</span><span>${t}</span>`;
    stage.style.setProperty('--accent', b.accent);
    stage.style.setProperty('--liquid', b.liquid);
    bottleEl.alt = `Boca piva ${b.name}`;
    setMeters(b);
    $$('.rail-item', rail).forEach((r, k) => { r.classList.toggle('is-active', k === i); r.setAttribute('aria-selected', k === i); });
    const act = rail.children[i];
    if (act && rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: act.offsetLeft - rail.clientWidth / 2 + act.offsetWidth / 2, behavior: RM ? 'auto' : 'smooth' });
    }
  }
  function show(i, dir = 1, force = false) {
    const list = BEERS[group];
    i = (i + list.length) % list.length;
    if ((i === idx && !force) || busy) return;
    const b = list[i];
    idx = i;
    if (RM) { bottleEl.src = `img/piva/${b.img}.webp`; fillInfo(b, i); return; }
    busy = true;
    const txt = $$('.sa', stage);
    txt.forEach((el) => el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-14px)' }], { duration: 260, easing: 'ease-in', fill: 'forwards' }));
    const out = bottleEl.animate(
      [{ transform: 'none', opacity: 1 }, { transform: `translateX(${-dir * 45}%) rotate(${-dir * 16}deg) scale(.88)`, opacity: 0 }],
      { duration: 380, easing: 'cubic-bezier(.55,0,.75,.2)', fill: 'forwards' });
    const img = new Image(); img.src = `img/piva/${b.img}.webp`;
    const ready = img.decode ? img.decode().catch(() => {}) : Promise.resolve();
    Promise.all([out.finished, ready]).then(() => {
      bottleEl.src = img.src;
      fillInfo(b, i);
      const inn = bottleEl.animate(
        [{ transform: `translateX(${dir * 55}%) rotate(${dir * 18}deg) scale(.88)`, opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: 900, easing: 'cubic-bezier(.22,1,.36,1)' });
      out.cancel();
      txt.forEach((el, k) => {
        el.getAnimations().forEach((a) => a.cancel());
        el.animate([{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }],
          { duration: 700, delay: 60 + k * 55, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
      });
      inn.finished.then(() => { busy = false; }).catch(() => { busy = false; });
    }).catch(() => { busy = false; });
  }
  function movePill() {
    const a = $('.tab.is-active');
    if (!a || !pill) return;
    pill.style.width = a.offsetWidth + 'px';
    pill.style.transform = `translateX(${a.offsetLeft}px)`;
  }
  tabs.forEach((t) => t.addEventListener('click', () => {
    if (t.classList.contains('is-active')) return;
    tabs.forEach((x) => { x.classList.toggle('is-active', x === t); x.setAttribute('aria-selected', x === t); });
    movePill();
    group = t.dataset.group; idx = -1; busy = false;
    renderRail();
    show(0, 1, true);
  }));
  rail.addEventListener('click', (e) => {
    const btn = e.target.closest('.rail-item'); if (!btn) return;
    const i = +btn.dataset.i;
    show(i, i >= idx ? 1 : -1);
  });
  $('#prevBeer').addEventListener('click', () => show(idx - 1, -1));
  $('#nextBeer').addEventListener('click', () => show(idx + 1, 1));
  // swipe
  const vis = $('#stageVisual');
  let sx = 0, sy0 = 0, st0 = 0;
  vis.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy0 = e.touches[0].clientY; st0 = Date.now(); }, { passive: true });
  vis.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy0;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2 && Date.now() - st0 < 800) show(idx + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }, { passive: true });
  // keyboard when in view
  let stageInView = false;
  new IntersectionObserver(([e]) => {
    stageInView = e.isIntersecting;
    if (e.isIntersecting && !stageSeen) { stageSeen = true; setMeters(BEERS[group][idx]); }
  }, { threshold: .35 }).observe(stage);
  document.addEventListener('keydown', (e) => {
    if (!stageInView || lbOpen) return;
    if (e.key === 'ArrowRight') show(idx + 1, 1);
    if (e.key === 'ArrowLeft') show(idx - 1, -1);
  });
  renderRail();
  fillInfo(BEERS[group][0], 0);

  /* ------------------------------------------------------------
     Lab cards
  ------------------------------------------------------------ */
  const labGrid = $('#labGrid');
  const glass = '<div class="glass" aria-hidden="true"><div class="glass-body"><div class="liquid"></div><div class="foam"></div></div></div>';
  labGrid.insertAdjacentHTML('beforeend', LAB.map((b) => `
    <article class="lab-card reveal" style="--liquid:${b.liquid}">
      ${glass}
      <span class="lab-year">${b.year}</span>
      <p class="lab-style">${b.style}</p>
      <h3>${b.name}</h3>
      <p>${b.desc}</p>
      <dl class="lab-stats"><div><dt>Alk.</dt><dd>${fmt(b.abv)} %</dd></div><div><dt>IBU</dt><dd>${b.ibu}</dd></div></dl>
    </article>`).join(''));

  observeReveals();

  /* ------------------------------------------------------------
     Timeline fill + light parallax
  ------------------------------------------------------------ */
  const tl = $('#timeline');
  const tlFill = $('#tlFill');
  function updateTimeline() {
    if (!tl || !tlFill) return;
    const r = tl.getBoundingClientRect();
    const p = clamp((innerHeight * .62 - r.top) / r.height, 0, 1);
    tlFill.style.height = (p * 100).toFixed(2) + '%';
  }
  const parallaxEls = $$('[data-speed]');
  function updateParallax() {
    if (RM || innerWidth < 760) { parallaxEls.forEach((el) => { el.style.translate = ''; }); return; }
    parallaxEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      const c = r.top + r.height / 2 - innerHeight / 2;
      el.style.translate = `0 ${(c * +el.dataset.speed).toFixed(1)}px`;
    });
  }

  /* ------------------------------------------------------------
     Magnetic buttons
  ------------------------------------------------------------ */
  if (FINE && !RM) {
    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.translate = `${((e.clientX - r.left - r.width / 2) * .22).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * .3).toFixed(1)}px`;
      });
      el.addEventListener('pointerleave', () => { el.style.translate = ''; });
    });
  }

  /* ------------------------------------------------------------
     Lightbox
  ------------------------------------------------------------ */
  const tiles = $$('.tile');
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  let lbI = 0, lbOpen = false;
  function lbShow(i) {
    lbI = (i + tiles.length) % tiles.length;
    const im = $('img', tiles[lbI]);
    lbImg.classList.remove('ready');
    lbImg.src = im.currentSrc || im.src;
    lbImg.alt = im.alt;
    lbCap.textContent = im.alt;
    const done = () => requestAnimationFrame(() => lbImg.classList.add('ready'));
    if (lbImg.complete) done(); else lbImg.onload = done;
  }
  function openLB(i) { lbOpen = true; lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); body.style.overflow = 'hidden'; lbShow(i); }
  function closeLB() { if (!lbOpen) return; lbOpen = false; lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); body.style.overflow = ''; }
  tiles.forEach((t, i) => t.addEventListener('click', () => openLB(i)));
  $('#lbClose').addEventListener('click', closeLB);
  $('#lbPrev').addEventListener('click', (e) => { e.stopPropagation(); lbShow(lbI - 1); });
  $('#lbNext').addEventListener('click', (e) => { e.stopPropagation(); lbShow(lbI + 1); });
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-fig')) closeLB(); });
  document.addEventListener('keydown', (e) => {
    if (!lbOpen) return;
    if (e.key === 'ArrowRight') lbShow(lbI + 1);
    if (e.key === 'ArrowLeft') lbShow(lbI - 1);
  });
  let lx = 0, ly = 0;
  lb.addEventListener('touchstart', (e) => { lx = e.touches[0].clientX; ly = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - lx, dy = e.changedTouches[0].clientY - ly;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) lbShow(lbI + (dx < 0 ? 1 : -1));
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) closeLB();
  }, { passive: true });

  /* ------------------------------------------------------------
     Resize / fonts
  ------------------------------------------------------------ */
  let rT;
  window.addEventListener('resize', () => {
    clearTimeout(rT);
    rT = setTimeout(() => { if (!RM) sizeCanvas(); movePill(); measurePetals(); onScroll(); }, 150);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(movePill);
  movePill();
  onScroll();

  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
})();
