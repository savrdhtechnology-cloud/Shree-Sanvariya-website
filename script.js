(() => {
  'use strict';

  const config = window.BUSINESS_CONFIG || {};
  const waNumber = config.whatsappNumber || '919131204037';
  const waBase = `https://wa.me/${waNumber}`;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  document.querySelectorAll('[data-wa]').forEach((link) => { link.href = waBase; });

  document.querySelectorAll('[data-img]').forEach((img) => {
    const key = img.dataset.img;
    const url = config.images && config.images[key];
    if (url) img.src = url;
    img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
    img.addEventListener('error', () => {
      img.style.display = 'none';
      img.parentElement?.classList.add('image-fallback');
    }, { once: true });
  });

  document.querySelectorAll('[data-bg]').forEach((el) => {
    const key = el.dataset.bg;
    const url = config.images && config.images[key];
    if (url) el.style.backgroundImage = `url("${url}")`;
  });

  const addressEl = document.getElementById('address');
  if (addressEl && config.address) addressEl.textContent = config.address;

  const mapFrame = document.getElementById('map-frame');
  const mapPlaceholder = document.getElementById('map-placeholder');
  const directions = document.getElementById('directions');
  if (config.googleMapsEmbedUrl && mapFrame && mapPlaceholder) {
    mapFrame.src = config.googleMapsEmbedUrl;
    mapFrame.style.display = 'block';
    mapPlaceholder.style.display = 'none';
  }
  if (config.googleMapsDirectionsUrl && directions) {
    directions.href = config.googleMapsDirectionsUrl;
    directions.classList.remove('disabled');
    directions.removeAttribute('aria-disabled');
    directions.target = '_blank';
    directions.rel = 'noopener';
  }

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  const header = document.querySelector('.header');
  let raf = 0;
  const updateScroll = () => {
    raf = 0;
    const y = window.scrollY || document.documentElement.scrollTop;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    header?.classList.toggle('scrolled', y > 12);
    progress.style.transform = `scaleX(${Math.min(1, y / max)})`;
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(updateScroll);
  };
  updateScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.navlinks');
  const closeMenu = () => {
    menu?.classList.remove('open');
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Open navigation');
  };
  menu?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    nav?.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', (e) => {
    if (!nav?.classList.contains('open')) return;
    if (!nav.contains(e.target) && !menu?.contains(e.target)) closeMenu();
  });

  document.querySelectorAll('[data-cat]').forEach((link) => {
    link.addEventListener('click', () => {
      const input = document.querySelector('input[name="product"]');
      if (input) input.value = link.dataset.cat || '';
    });
  });

  document.querySelectorAll('.product-wa').forEach((link) => {
    const product = link.dataset.product || 'a product';
    const message = `Hello Shree Sawariya Seth Traders, I want to enquire about ${product}. Please share availability/details.`;
    link.href = `${waBase}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener';
  });

  const form = document.getElementById('enquiry-form');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const mobile = String(data.get('mobile') || '').replace(/\D/g, '');
    const product = String(data.get('product') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !product || mobile.length < 10) {
      if (status) status.textContent = 'Please enter your name, a valid mobile number and product requirement.';
      return;
    }

    const text = [
      'Hello Shree Sawariya Seth Traders,',
      '',
      `Name: ${name}`,
      `Mobile: ${mobile}`,
      `Requirement: ${product}`,
      message ? `Message: ${message}` : '',
      '',
      'Please share availability/details.'
    ].filter(Boolean).join('\n');

    if (status) status.textContent = 'Opening WhatsApp with your enquiry…';
    window.open(`${waBase}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });

  const revealEls = [...document.querySelectorAll('.reveal')];
  revealEls.forEach((el, i) => {
    const group = el.parentElement?.querySelectorAll(':scope > .reveal');
    if (group && group.length > 1) {
      const localIndex = [...group].indexOf(el);
      el.style.setProperty('--delay', `${Math.min(localIndex * 70, 280)}ms`);
    } else if (!el.classList.contains('reveal--delay')) {
      el.style.setProperty('--delay', `${Math.min((i % 3) * 45, 90)}ms`);
    }
  });

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.navlinks a[href^="#"]')];
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-34% 0px -56% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  if (finePointer && !reducedMotion) {
    const glow = document.createElement('div');
    glow.className = 'pointer-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
    window.addEventListener('pointermove', (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    }, { passive: true });

    const heroMedia = document.querySelector('.hero__media');
    heroMedia?.addEventListener('pointermove', (e) => {
      const r = heroMedia.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      heroMedia.style.transform = `perspective(1100px) rotateX(${(-py * 3.2).toFixed(2)}deg) rotateY(${(px * 4.2).toFixed(2)}deg) translateY(-2px)`;
    });
    heroMedia?.addEventListener('pointerleave', () => { heroMedia.style.transform = ''; });

    document.querySelectorAll('.category').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', `${(x * 3.2).toFixed(2)}deg`);
        card.style.setProperty('--rx', `${(-y * 2.5).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--rx', '0deg');
      });
    });

    const cta = document.querySelector('.cta__box');
    cta?.addEventListener('pointermove', (e) => {
      const r = cta.getBoundingClientRect();
      cta.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      cta.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  }

  const mobileActions = document.createElement('div');
  mobileActions.className = 'mobile-actions';
  mobileActions.innerHTML = `
    <a class="call" href="tel:+919131204037" aria-label="Call Shree Sawariya Seth Traders">Call Now</a>
    <a class="wa" href="${waBase}" target="_blank" rel="noopener" aria-label="WhatsApp Shree Sawariya Seth Traders">WhatsApp</a>
  `;
  document.body.appendChild(mobileActions);

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
