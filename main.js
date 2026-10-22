// Shared behavior for every page: menu, theme, clips, paper rail and the
// publication filter. Each block is a no-op on pages without its markup, and
// every page stays fully readable with JavaScript disabled.
(() => {
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Mobile menu ──
  const nav = document.querySelector('.site-nav');
  const navToggle = nav && nav.querySelector('.nav-toggle');
  if (navToggle) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    navToggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    // Section links stay on the page, so close the menu once one is chosen.
    nav.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); navToggle.focus(); }
    });
  }

  // ── Theme toggle (the saved choice is applied in <head> to avoid a flash) ──
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    const current = () => root.dataset.theme
      || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const label = () => toggle.setAttribute('aria-label',
      `Switch to ${current() === 'dark' ? 'light' : 'dark'} theme`);
    label();
    toggle.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
      label();
    });
  }

  // ── Clips: only play while on screen, never with reduced motion ──
  const clips = document.querySelectorAll('video[data-autoplay]');
  if (clips.length && !reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) target.play().catch(() => {});
        else target.pause();
      });
    }, { threshold: 0.2 });
    clips.forEach((v) => { v.preload = 'auto'; io.observe(v); });
  }

  // ── Paper rail arrows ──
  document.querySelectorAll('[data-rail]').forEach((section) => {
    const rail = section.querySelector('.rail');
    const nav = section.querySelector('.rail-nav');
    if (!rail || !nav) return;
    nav.hidden = false;
    nav.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        rail.scrollBy({ left: Number(button.dataset.dir) * rail.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  });

  // ── Publication search and filters ──
  const form = document.querySelector('.filters');
  if (form) {
    const search = form.querySelector('#pub-search');
    const year = form.querySelector('#pub-year');
    const venue = form.querySelector('#pub-venue');
    const pubs = [...document.querySelectorAll('.pub')];
    const groups = [...document.querySelectorAll('.year-block')];
    const count = document.querySelector('#pub-count');
    const empty = document.querySelector('.empty-results');
    pubs.forEach((pub) => { pub.dataset.search = pub.textContent.toLowerCase().replace(/\s+/g, ' '); });
    form.hidden = false;

    const filter = () => {
      const words = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      let visible = 0;
      pubs.forEach((pub) => {
        pub.hidden = !words.every((word) => pub.dataset.search.includes(word))
          || (year.value && pub.dataset.year !== year.value)
          || (venue.value && pub.dataset.venue !== venue.value);
        if (!pub.hidden) visible++;
      });
      groups.forEach((group) => {
        const total = group.querySelectorAll('.pub:not([hidden])').length;
        group.hidden = total === 0;
        group.querySelector('h2 span').textContent = String(total);
      });
      document.querySelectorAll('.year-nav a').forEach((link) => {
        link.hidden = document.querySelector(link.hash)?.closest('.year-block')?.hidden ?? false;
      });
      count.textContent = visible === pubs.length
        ? `${pubs.length} publications`
        : `${visible} of ${pubs.length} publications`;
      empty.hidden = visible > 0;
    };

    form.addEventListener('submit', (event) => event.preventDefault());
    form.addEventListener('input', filter);
    form.addEventListener('change', filter);
    form.addEventListener('reset', () => setTimeout(filter));
  }
})();
