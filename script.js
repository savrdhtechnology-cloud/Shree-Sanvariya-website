(() => {
  'use strict';

  const config = window.BUSINESS_CONFIG || {};
  const waNumber = config.whatsappNumber || '919131204037';
  const waBase = `https://wa.me/${waNumber}`;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* Premium 4-slide hero carousel */
  const sliderCSS = document.createElement('style');
  sliderCSS.textContent = `
    .hero{min-height:0;padding:0;overflow:hidden}
    .hero-slider{position:relative;isolation:isolate;min-height:625px}
    .hero-slider:before{content:'';position:absolute;inset:0;z-index:-2;background:radial-gradient(circle at 16% 28%,rgba(232,207,146,.12),transparent 30%),linear-gradient(120deg,#3d0710,#6d0e1b 58%,#3a060d)}
    .hero-slider:after{content:'';position:absolute;z-index:-1;width:680px;height:680px;right:-250px;top:-280px;border:1px solid rgba(232,207,146,.13);border-radius:50%;box-shadow:0 0 0 110px rgba(232,207,146,.025),0 0 0 220px rgba(232,207,146,.018);animation:heroOrbit 18s linear infinite}
    @keyframes heroOrbit{to{transform:rotate(360deg)}}
    .hero-slide{position:absolute;inset:0;opacity:0;visibility:hidden;pointer-events:none;transform:translateX(34px) scale(.992);transition:opacity .78s cubic-bezier(.22,.61,.36,1),transform .9s cubic-bezier(.22,.61,.36,1),visibility 0s linear .9s}
    .hero-slide.is-active{position:relative;opacity:1;visibility:visible;pointer-events:auto;transform:none;transition-delay:0s}
    .hero-slide.is-exiting{opacity:0;transform:translateX(-28px) scale(.994)}
    .hero-slide .hero__grid{min-height:625px;padding-block:70px 94px}
    .hero-slide .hero__copy>*{opacity:0;transform:translateY(20px);filter:blur(3px)}
    .hero-slide.is-active .hero__copy>*{animation:heroTextIn .72s cubic-bezier(.2,.7,.2,1) forwards}
    .hero-slide.is-active .hero__copy>*:nth-child(1){animation-delay:.12s}
    .hero-slide.is-active .hero__copy>*:nth-child(2){animation-delay:.2s}
    .hero-slide.is-active .hero__copy>*:nth-child(3){animation-delay:.29s}
    .hero-slide.is-active .hero__copy>*:nth-child(4){animation-delay:.38s}
    .hero-slide.is-active .hero__copy>*:nth-child(5){animation-delay:.47s}
    .hero-slide.is-active .hero__copy>*:nth-child(6){animation-delay:.55s}
    @keyframes heroTextIn{to{opacity:1;transform:none;filter:blur(0)}}
    .hero-slide .hero__media{opacity:0;transform:translateX(40px) scale(.97);transition:opacity .85s .12s ease,transform 1s .12s cubic-bezier(.2,.7,.2,1)}
    .hero-slide.is-active .hero__media{opacity:1;transform:none}
    .hero-slide .hero__media img{transform:scale(1.08);transition:transform 7s cubic-bezier(.18,.69,.2,1)}
    .hero-slide.is-active .hero__media img{transform:scale(1.01)}
    .hero-slide__kicker{display:inline-flex;align-items:center;gap:9px;margin:0 0 13px;color:var(--gold2);font-size:12px;line-height:1.2;font-weight:900;letter-spacing:.17em;text-transform:uppercase}
    .hero-slide__kicker:before{content:'';width:28px;height:1px;background:linear-gradient(90deg,var(--gold),transparent)}
    .hero-slide h1{max-width:720px;font-size:clamp(42px,5.25vw,70px)}
    .hero-slide .hero__lead{max-width:650px}
    .hero-slide .badges a{cursor:pointer}
    .hero-slide__tag{position:absolute;z-index:3;right:18px;top:18px;display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(42,5,11,.64);backdrop-filter:blur(12px);color:#fff;font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
    .hero-slide__tag i{width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 5px rgba(201,153,66,.12)}
    .hero-slider__controls{position:absolute;z-index:20;left:50%;bottom:24px;width:min(1180px,calc(100% - 40px));transform:translateX(-50%);display:flex;align-items:center;justify-content:space-between;pointer-events:none}
    .hero-slider__dots{display:flex;align-items:center;gap:9px;padding:8px 10px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(35,5,10,.5);backdrop-filter:blur(12px);pointer-events:auto}
    .hero-dot{position:relative;width:42px;height:4px;padding:0;border:0;border-radius:999px;background:rgba(255,255,255,.22);overflow:hidden;cursor:pointer}
    .hero-dot:after{content:'';position:absolute;inset:0;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,var(--gold2),var(--gold))}
    .hero-dot.is-active:after{animation:heroProgress 5.8s linear forwards}
    .hero-slider.is-paused .hero-dot.is-active:after{animation-play-state:paused}
    @keyframes heroProgress{to{transform:scaleX(1)}}
    .hero-slider__arrows{display:flex;gap:8px;pointer-events:auto}
    .hero-arrow{width:44px;height:44px;display:grid;place-items:center;border-radius:50%;border:1px solid rgba(255,255,255,.22);background:rgba(35,5,10,.54);backdrop-filter:blur(12px);color:#fff;font-size:20px;cursor:pointer;transition:.25s ease}
    .hero-arrow:hover{background:var(--gold);color:var(--m950);border-color:var(--gold);transform:translateY(-2px)}
    .hero-slider__counter{position:absolute;z-index:4;left:24px;top:22px;display:flex;align-items:baseline;gap:4px;color:#fff;font-weight:900;letter-spacing:.08em}
    .hero-slider__counter b{font-family:var(--serif);font-size:28px;color:var(--gold2)}
    .hero-slider__counter span{font-size:11px;color:rgba(255,255,255,.56)}
    @media(max-width:900px){
      .hero-slider,.hero-slide .hero__grid{min-height:auto}
      .hero-slide .hero__grid{padding-block:58px 104px}
      .hero-slider__controls{bottom:18px}
      .hero-slider__counter{display:none}
      .hero-slide__tag{right:12px;top:12px}
    }
    @media(max-width:640px){
      .hero-slide .hero__grid{padding-block:44px 100px}
      .hero-slide h1{font-size:clamp(38px,12vw,54px)}
      .hero-slide .hero__media{min-height:330px}
      .hero-slide .hero__media img{height:330px}
      .hero-slider__controls{width:calc(100% - 28px)}
      .hero-dot{width:29px}
      .hero-arrow{width:40px;height:40px}
      .hero-slide__tag{font-size:9px;padding:7px 9px}
    }
    @media(prefers-reduced-motion:reduce){
      .hero-slider:after,.hero-slide.is-active .hero__copy>*,.hero-dot.is-active:after{animation:none!important}
      .hero-slide,.hero-slide .hero__media,.hero-slide .hero__media img{transition:none!important}
      .hero-slide .hero__copy>*{opacity:1;transform:none;filter:none}
      .hero-dot.is-active:after{transform:scaleX(1)}
    }
  `;
  document.head.appendChild(sliderCSS);

  const hero = document.querySelector('.hero');
  const heroSlides = [
    {
      key: 'products',
      imageKey: 'showroom',
      label: 'Complete Product Range',
      title: 'Everything Your Project Needs, in One Place',
      lead: 'Paints, hardware, sanitary & plumbing and electrical products for home improvement, renovation and construction requirements.',
      badges: ['PAINTS','HARDWARE','SANITARY & PLUMBING','ELECTRICAL'],
      noteTitle: 'Plan. Build. Finish.',
      noteText: 'Explore essential products across four core categories.',
      facts: ['Four core categories','Direct assistance','Easy enquiry']
    },
    {
      key: 'paints',
      imageKey: 'paints',
      label: 'Paints',
      title: 'Premium Paints for Beautiful, Lasting Spaces',
      lead: 'Interior & exterior paints, wall finishing products, paint accessories, rollers and brushes for your project requirements.',
      badges: ['INTERIOR PAINTS','EXTERIOR PAINTS','FINISHES','ACCESSORIES'],
      noteTitle: 'Finish beautifully.',
      noteText: 'Explore paint solutions for walls, surfaces and finishing work.',
      facts: ['Wall finishing products','Rollers & brushes','Easy enquiry']
    },
    {
      key: 'hardware',
      imageKey: 'hardware',
      label: 'Hardware',
      title: 'Reliable Hardware for Every Build & Repair',
      lead: 'Tools, fasteners, construction hardware and general hardware items for practical home, repair and building requirements.',
      badges: ['TOOLS','FASTENERS','CONSTRUCTION','GENERAL HARDWARE'],
      noteTitle: 'Built for the job.',
      noteText: 'Find practical hardware essentials for construction, fitting and repair work.',
      facts: ['Tools & equipment','Fasteners','Construction hardware']
    },
    {
      key: 'sanitary',
      imageKey: 'sanitary',
      label: 'Sanitary & Plumbing',
      title: 'Sanitary & Plumbing for Better Everyday Spaces',
      lead: 'Bathroom fittings, pipes & fittings, plumbing accessories and sanitary products — selected around real project needs.',
      badges: ['BATHROOM FITTINGS','PIPES & FITTINGS','PLUMBING','SANITARY'],
      noteTitle: 'Fit it right.',
      noteText: 'Explore sanitary and plumbing essentials for bathrooms and water systems.',
      facts: ['Bathroom fittings','Pipes & fittings','Plumbing accessories']
    },
    {
      key: 'electrical',
      imageKey: 'electrical',
      label: 'Electrical',
      title: 'Electrical Essentials for Modern Homes & Projects',
      lead: 'Switches, wires & cables, lighting and electrical accessories for everyday home improvement and construction requirements.',
      badges: ['SWITCHES','WIRES & CABLES','LIGHTING','ACCESSORIES'],
      noteTitle: 'Power every space.',
      noteText: 'Find everyday electrical products for fit-outs, upgrades and new work.',
      facts: ['Switches & sockets','Wires & cables','Lighting products']
    }
  ];

  if (hero) {
    hero.innerHTML = `
      <div class="hero-slider" aria-roledescription="carousel" aria-label="Product categories">
        ${heroSlides.map((s, index) => `
          <article class="hero-slide${index === 0 ? ' is-active' : ''}" data-slide="${index}" aria-hidden="${index === 0 ? 'false' : 'true'}">
            <div class="container hero__grid">
              <div class="hero__copy">
                <p class="hero-slide__kicker">${s.label}</p>
                <h1>${s.title}</h1>
                <p class="hero__lead">${s.lead}</p>
                <div class="badges">${s.badges.map((b) => `<a href="#${s.key}">${b}</a>`).join('')}</div>
                <div class="hero__actions">
                  <a class="btn btn--gold btn--lg" href="${waBase}?text=${encodeURIComponent(`Hello Shree Sawariya Seth Traders, I want to enquire about ${s.label}. Please share availability/details.`)}" target="_blank" rel="noopener">WhatsApp Enquiry</a>
                  <a class="btn btn--ghost btn--lg" href="tel:+919131204037">Call Now</a>
                </div>
                <div class="hero__facts">${s.facts.map((f) => `<span>${f}</span>`).join('')}</div>
              </div>
              <div class="hero__media">
                <img data-img="${s.imageKey}" alt="${s.label} products" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
                <div class="hero-slide__tag"><i></i>${s.label}</div>
                <div class="hero__note"><strong>${s.noteTitle}</strong><span>${s.noteText}</span></div>
              </div>
            </div>
          </article>
        `).join('')}
        <div class="hero-slider__counter" aria-hidden="true"><b>01</b><span>/ ${String(heroSlides.length).padStart(2, '0')}</span></div>
        <div class="hero-slider__controls">
          <div class="hero-slider__dots" role="tablist" aria-label="Choose hero slide">
            ${heroSlides.map((s, index) => `<button class="hero-dot${index === 0 ? ' is-active' : ''}" type="button" role="tab" aria-label="Show ${s.label} slide" aria-selected="${index === 0 ? 'true' : 'false'}" data-go="${index}"></button>`).join('')}
          </div>
          <div class="hero-slider__arrows">
            <button class="hero-arrow hero-arrow--prev" type="button" aria-label="Previous slide">‹</button>
            <button class="hero-arrow hero-arrow--next" type="button" aria-label="Next slide">›</button>
          </div>
        </div>
      </div>
    `;
  }

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

  /* Slider behavior: autoplay, controls, swipe, keyboard, hover/focus pause */
  const slider = document.querySelector('.hero-slider');
  const slideEls = slider ? [...slider.querySelectorAll('.hero-slide')] : [];
  const dotEls = slider ? [...slider.querySelectorAll('.hero-dot')] : [];
  const counterEl = slider?.querySelector('.hero-slider__counter b');
  let slideIndex = 0;
  let slideTimer = 0;
  let paused = false;
  let touchStartX = 0;
  const AUTOPLAY = 5800;

  const restartProgress = () => {
    dotEls.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === slideIndex);
      dot.setAttribute('aria-selected', String(i === slideIndex));
      if (i === slideIndex) {
        dot.style.animation = 'none';
        void dot.offsetWidth;
        dot.style.animation = '';
      }
    });
  };

  const scheduleSlide = () => {
    clearTimeout(slideTimer);
    if (reducedMotion || paused || !slideEls.length) return;
    slideTimer = window.setTimeout(() => goToSlide(slideIndex + 1), AUTOPLAY);
  };

  const goToSlide = (next) => {
    if (!slideEls.length) return;
    const newIndex = (next + slideEls.length) % slideEls.length;
    if (newIndex === slideIndex) return;
    const old = slideEls[slideIndex];
    old.classList.add('is-exiting');
    old.classList.remove('is-active');
    old.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => old.classList.remove('is-exiting'), reducedMotion ? 0 : 850);
    slideIndex = newIndex;
    const current = slideEls[slideIndex];
    current.classList.add('is-active');
    current.setAttribute('aria-hidden', 'false');
    if (counterEl) counterEl.textContent = String(slideIndex + 1).padStart(2, '0');
    restartProgress();
    scheduleSlide();
  };

  dotEls.forEach((dot) => dot.addEventListener('click', () => goToSlide(Number(dot.dataset.go || 0))));
  slider?.querySelector('.hero-arrow--prev')?.addEventListener('click', () => goToSlide(slideIndex - 1));
  slider?.querySelector('.hero-arrow--next')?.addEventListener('click', () => goToSlide(slideIndex + 1));
  slider?.addEventListener('mouseenter', () => { paused = true; slider.classList.add('is-paused'); clearTimeout(slideTimer); });
  slider?.addEventListener('mouseleave', () => { paused = false; slider.classList.remove('is-paused'); scheduleSlide(); });
  slider?.addEventListener('focusin', () => { paused = true; slider.classList.add('is-paused'); clearTimeout(slideTimer); });
  slider?.addEventListener('focusout', (e) => {
    if (slider.contains(e.relatedTarget)) return;
    paused = false;
    slider.classList.remove('is-paused');
    scheduleSlide();
  });
  slider?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goToSlide(slideIndex - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goToSlide(slideIndex + 1); }
  });
  slider?.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  slider?.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 45) goToSlide(slideIndex + (delta < 0 ? 1 : -1));
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearTimeout(slideTimer); else scheduleSlide();
  });
  restartProgress();
  scheduleSlide();

  const locationMessage = document.getElementById('location-message');
  if (locationMessage && config.locationMessage) locationMessage.textContent = config.locationMessage;

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
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(updateScroll); };
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

  /* Product search and category filters */
  const productSearch = document.getElementById('product-search');
  const productCards = [...document.querySelectorAll('.product[data-category]')];
  const productFilters = [...document.querySelectorAll('.filter[data-filter]')];
  const productEmpty = document.getElementById('product-empty');
  let activeFilter = 'all';

  const filterProducts = () => {
    const query = String(productSearch?.value || '').trim().toLowerCase();
    let visible = 0;
    productCards.forEach((card) => {
      const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
      const searchable = `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
      const matchesQuery = !query || searchable.includes(query);
      const show = matchesCategory && matchesQuery;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (productEmpty) productEmpty.hidden = visible !== 0;
  };

  productFilters.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      productFilters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      filterProducts();
    });
  });
  productSearch?.addEventListener('input', filterProducts);

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
    const text = ['Hello Shree Sawariya Seth Traders,','',`Name: ${name}`,`Mobile: ${mobile}`,`Requirement: ${product}`,message ? `Message: ${message}` : '','','Please share availability/details.'].filter(Boolean).join('\n');
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
        navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
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

    document.querySelectorAll('.hero__media').forEach((heroMedia) => {
      heroMedia.addEventListener('pointermove', (e) => {
        const r = heroMedia.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        heroMedia.style.transform = `perspective(1100px) rotateX(${(-py * 3.2).toFixed(2)}deg) rotateY(${(px * 4.2).toFixed(2)}deg) translateY(-2px)`;
      });
      heroMedia.addEventListener('pointerleave', () => { heroMedia.style.transform = ''; });
    });

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
  mobileActions.innerHTML = `<a class="call" href="tel:+919131204037" aria-label="Call Shree Sawariya Seth Traders">Call Now</a><a class="wa" href="${waBase}" target="_blank" rel="noopener" aria-label="WhatsApp Shree Sawariya Seth Traders">WhatsApp</a>`;
  document.body.appendChild(mobileActions);

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
