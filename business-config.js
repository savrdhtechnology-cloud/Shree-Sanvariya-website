window.BUSINESS_CONFIG = {
  name: "SHREE SAWARIYA SETH TRADERS",
  shortName: "SHREE SAWARIYA",
  tagline: "Quality Products for Every Home & Construction Need",
  phonePrimary: "9131204037",
  phoneSecondary: "9754665479",
  whatsappNumber: "919131204037",
  address: "[EDITABLE_ADDRESS]",
  googleMapsEmbedUrl: "",
  googleMapsDirectionsUrl: "",
  businessHours: "",
  logo: "assets/logo.svg",
  images: {
    hero: "https://images.unsplash.com/photo-1759200165738-6366977a73c6?auto=format&fit=crop&w=1400&q=82",
    paints: "https://images.unsplash.com/photo-1596653038131-330fa75d23ab?auto=format&fit=crop&w=1000&q=80",
    hardware: "https://images.unsplash.com/photo-1759200165738-6366977a73c6?auto=format&fit=crop&w=1000&q=80",
    sanitary: "https://images.unsplash.com/photo-1768321916212-17ae334a3d63?auto=format&fit=crop&w=1000&q=80",
    electrical: "https://images.unsplash.com/photo-1784807799250-4279d6d0eb09?auto=format&fit=crop&w=1000&q=80"
  },
  brands: ["Asian Paints", "Branded Hardware", "Branded Sanitary & Plumbing", "Branded Electrical"],
  social: { facebook: "", instagram: "", youtube: "" }
};

/*
  Hero-only enhancement.
  The page layout, colours, navigation and all lower sections remain unchanged.
  This adds branded 3D product-style visuals inside the existing 4-slide hero carousel.
*/
document.addEventListener('DOMContentLoaded', () => {
  const heroSlides = [...document.querySelectorAll('.hero-slide')];
  if (!heroSlides.length) return;

  const style = document.createElement('style');
  style.textContent = `
    .hero__media.hero-3d-enabled{background:linear-gradient(145deg,#4f0a15,#220409);overflow:hidden;isolation:isolate}
    .hero__media.hero-3d-enabled>img{display:none!important}
    .hero-3d-scene{position:absolute;inset:0;display:grid;place-items:center;perspective:1200px;overflow:hidden}
    .hero-3d-scene:before{content:'';position:absolute;width:72%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(232,207,146,.18),rgba(232,207,146,.04) 46%,transparent 70%);filter:blur(2px);transform:translateY(-8%)}
    .hero-3d-scene:after{content:'';position:absolute;left:50%;bottom:13%;width:46%;height:8%;transform:translateX(-50%);border-radius:50%;background:radial-gradient(ellipse,rgba(0,0,0,.48),rgba(0,0,0,.08) 62%,transparent 72%);filter:blur(13px)}
    .hero-3d-product{position:relative;z-index:2;transform-style:preserve-3d;animation:ss-float 5.6s ease-in-out infinite;filter:drop-shadow(0 30px 24px rgba(0,0,0,.25))}
    @keyframes ss-float{0%,100%{transform:translateY(0) rotateY(-7deg)}50%{transform:translateY(-13px) rotateY(7deg)}}
    .hero-3d-brand{position:absolute;z-index:3;left:22px;top:22px;display:flex;flex-direction:column;gap:3px;padding:11px 13px;border:1px solid rgba(255,255,255,.14);border-radius:13px;background:rgba(43,5,11,.48);backdrop-filter:blur(12px);color:#fff}
    .hero-3d-brand strong{font-family:var(--serif);font-size:18px;line-height:1}
    .hero-3d-brand small{color:var(--gold2);font-size:9px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
    .hero-3d-features{position:absolute;z-index:3;right:18px;bottom:118px;display:flex;flex-direction:column;align-items:flex-end;gap:7px}
    .hero-3d-features span{padding:7px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.055);backdrop-filter:blur(9px);color:rgba(255,255,255,.88);font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}

    /* Paint bucket */
    .p3d-paint{width:250px;height:360px}
    .p3d-paint .lid{position:absolute;left:24px;top:24px;width:202px;height:38px;border-radius:50%;background:linear-gradient(180deg,#fff,#d9dde1 70%,#b8c0c7);transform:translateZ(44px);box-shadow:0 9px 18px rgba(0,0,0,.17),inset 0 -6px 0 rgba(133,142,151,.33)}
    .p3d-paint .body{position:absolute;left:42px;top:50px;width:166px;height:248px;border-radius:24px 24px 36px 36px;background:linear-gradient(155deg,#f8fafb 0 18%,#7c1927 18% 48%,#4a1420 48% 62%,#263b5c 62%);transform:translateZ(30px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.28),0 30px 44px rgba(0,0,0,.23)}
    .p3d-paint .body:before{content:'';position:absolute;left:0;right:0;top:-10px;height:28px;border-radius:50%;background:linear-gradient(180deg,#f8fafb,#ccd3d8)}
    .p3d-paint .label{position:absolute;left:17px;right:17px;top:64px;padding:17px 13px;border-radius:15px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);text-align:center;color:#fff}
    .p3d-paint .label b{display:block;font-family:var(--serif);font-size:24px;line-height:.98}.p3d-paint .label em{display:block;margin-top:6px;color:var(--gold2);font-size:10px;font-style:normal;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
    .p3d-paint .base{position:absolute;left:45px;top:278px;width:160px;height:38px;border-radius:0 0 34px 34px;background:linear-gradient(180deg,#354d70,#263957);transform:translateZ(24px)}
    .p3d-paint .handle{position:absolute;left:29px;top:93px;width:192px;height:118px;border:4px solid #c6ccd1;border-top-color:transparent;border-radius:0 0 100px 100px;transform:translateZ(12px)}

    /* Hardware toolbox */
    .p3d-tools{width:310px;height:330px}
    .p3d-tools .case{position:absolute;left:43px;top:116px;width:224px;height:126px;border-radius:20px;background:linear-gradient(145deg,#272e39,#49586d 52%,#242a33);transform:translateZ(30px);box-shadow:0 30px 44px rgba(0,0,0,.26),inset 0 0 0 1px rgba(255,255,255,.07)}
    .p3d-tools .case:before{content:'';position:absolute;left:0;right:0;top:0;height:34px;border-radius:20px 20px 7px 7px;background:linear-gradient(145deg,#8a1f31,#5b0c17)}
    .p3d-tools .handle{position:absolute;left:116px;top:58px;width:78px;height:68px;border:11px solid #d9dde0;border-bottom:none;border-radius:22px 22px 8px 8px;transform:translateZ(42px)}
    .p3d-tools .label{position:absolute;left:22px;right:22px;top:52px;padding:15px 12px;border-radius:13px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.09);text-align:center;color:#fff}.p3d-tools .label b{font-family:var(--serif);font-size:22px}.p3d-tools .label small{display:block;color:var(--gold2);font-size:9px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
    .p3d-tools .tools{position:absolute;right:28px;top:70px;display:flex;gap:9px;align-items:flex-end;transform:translateZ(55px) rotate(-7deg)}.p3d-tools .tools i{display:block;width:12px;border-radius:9px;background:linear-gradient(180deg,#edcf8a,#a36f1b)}.p3d-tools .tools i:nth-child(1){height:112px}.p3d-tools .tools i:nth-child(2){height:94px}.p3d-tools .tools i:nth-child(3){height:78px}

    /* Sanitary display */
    .p3d-sanitary{width:320px;height:340px}
    .p3d-sanitary .unit{position:absolute;left:78px;top:55px;width:164px;height:234px;border-radius:26px 26px 46px 46px;background:linear-gradient(150deg,#fafafa,#e6ebef 58%,#a8b6c4);transform:translateZ(30px);box-shadow:0 28px 42px rgba(0,0,0,.2),inset 0 0 0 1px rgba(255,255,255,.8)}
    .p3d-sanitary .unit:before{content:'';position:absolute;left:5px;right:5px;top:-12px;height:34px;border-radius:50%;background:linear-gradient(180deg,#fff,#d7dde2)}
    .p3d-sanitary .label{position:absolute;left:20px;right:20px;top:78px;padding:15px 12px;border-radius:14px;background:linear-gradient(145deg,#7a1725,#4a0a13);text-align:center;color:#fff}.p3d-sanitary .label b{font-family:var(--serif);font-size:23px}.p3d-sanitary .label small{display:block;margin-top:4px;color:var(--gold2);font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
    .p3d-sanitary .faucet{position:absolute;right:28px;top:98px;width:96px;height:26px;border-radius:30px;background:linear-gradient(180deg,#f4f6f7,#bfc6cc);transform:translateZ(55px)}.p3d-sanitary .faucet:before{content:'';position:absolute;right:0;top:-30px;width:26px;height:58px;border-radius:18px;background:inherit}.p3d-sanitary .faucet:after{content:'';position:absolute;left:7px;top:-20px;width:44px;height:16px;border-radius:20px;background:inherit}
    .p3d-sanitary .pipe{position:absolute;left:34px;bottom:74px;width:72px;height:72px;border:17px solid #c2cbd2;border-top-width:10px;border-right-width:10px;border-radius:50%;transform:translateZ(38px) rotate(10deg)}

    /* Electrical pack */
    .p3d-electric{width:300px;height:330px}
    .p3d-electric .pack{position:absolute;left:57px;top:72px;width:186px;height:210px;border-radius:22px;background:linear-gradient(155deg,#283750,#506582 56%,#242d3e);transform:translateZ(30px);box-shadow:0 29px 44px rgba(0,0,0,.25),inset 0 0 0 1px rgba(255,255,255,.08)}
    .p3d-electric .pack:before{content:'';position:absolute;left:16px;right:16px;top:16px;height:44px;border-radius:15px;background:linear-gradient(145deg,#f8f8f8,#d9dee4)}
    .p3d-electric .label{position:absolute;left:20px;right:20px;top:75px;padding:14px 12px;border-radius:13px;background:linear-gradient(145deg,#7b1725,#4d0913);text-align:center;color:#fff}.p3d-electric .label b{font-family:var(--serif);font-size:22px}.p3d-electric .label small{display:block;margin-top:4px;color:var(--gold2);font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
    .p3d-electric .switches{position:absolute;left:22px;right:22px;bottom:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.p3d-electric .switches i{height:42px;border-radius:11px;background:linear-gradient(180deg,#fff,#dde2e7);box-shadow:inset 0 -6px 8px rgba(124,132,143,.18)}
    .p3d-electric .wire{position:absolute;right:20px;top:46px;width:98px;height:132px;border:9px solid #e2b055;border-left:none;border-top:none;border-radius:0 0 54px 0;transform:translateZ(16px) rotate(9deg)}

    @media(max-width:900px){.hero-3d-brand{left:14px;top:14px}.hero-3d-features{right:14px;bottom:105px}.hero-3d-product{transform:scale(.92)}}
    @media(max-width:640px){.hero-3d-brand{padding:8px 10px}.hero-3d-brand strong{font-size:15px}.hero-3d-features{bottom:96px}.hero-3d-features span{font-size:8px;padding:6px 8px}.p3d-paint{transform:scale(.75)}.p3d-tools{transform:scale(.74)}.p3d-sanitary{transform:scale(.73)}.p3d-electric{transform:scale(.74)}}
    @media(prefers-reduced-motion:reduce){.hero-3d-product{animation:none!important}}
  `;
  document.head.appendChild(style);

  const details = [
    {
      kicker: 'Branded Paint Range',
      title: 'Asian Paints & Premium Wall Finishes for Better Spaces',
      lead: 'Asian Paints and other branded paint solutions for interiors, exteriors, wall finishing and project requirements.',
      badges: ['ASIAN PAINTS','INTERIOR PAINTS','EXTERIOR PAINTS','ACCESSORIES'],
      brand: 'Asian Paints',
      sub: 'Branded Paint Range',
      features: ['Interior & Exterior','Wall Finishes','Paint Accessories'],
      type: 'paint',
      noteTitle: 'Finish beautifully.',
      noteText: 'Premium branded paint products presented in a modern 3D showcase.'
    },
    {
      kicker: 'Branded Hardware Range',
      title: 'Branded Hardware, Tools & Fasteners for Every Build',
      lead: 'Branded tools, fasteners and construction hardware for practical home, repair and building requirements.',
      badges: ['BRANDED TOOLS','FASTENERS','CONSTRUCTION','HARDWARE'],
      brand: 'Branded Hardware',
      sub: 'Tools & Fasteners',
      features: ['Tools','Fasteners','Construction'],
      type: 'tools',
      noteTitle: 'Built for the job.',
      noteText: 'A premium product-style presentation while keeping the website design unchanged.'
    },
    {
      kicker: 'Branded Sanitary Range',
      title: 'Branded Sanitary & Plumbing Products for Modern Spaces',
      lead: 'Bathroom fittings, sanitary products, pipes and plumbing accessories from branded product ranges.',
      badges: ['BATHROOM FITTINGS','SANITARY','PIPES & FITTINGS','PLUMBING'],
      brand: 'Sanitary & Plumbing',
      sub: 'Branded Product Range',
      features: ['Bathroom Fittings','Pipes','Plumbing'],
      type: 'sanitary',
      noteTitle: 'Fit it right.',
      noteText: 'A clean 3D sanitary display designed to match the existing premium hero.'
    },
    {
      kicker: 'Branded Electrical Range',
      title: 'Branded Electrical Essentials for Homes & Projects',
      lead: 'Switches, wires & cables, lighting and electrical accessories from branded product ranges for everyday installations.',
      badges: ['SWITCHES','WIRES & CABLES','LIGHTING','ACCESSORIES'],
      brand: 'Electrical',
      sub: 'Branded Product Range',
      features: ['Switches','Cables','Lighting'],
      type: 'electric',
      noteTitle: 'Power every space.',
      noteText: 'Premium branded electrical presentation without changing the rest of the website.'
    }
  ];

  const productMarkup = (item) => {
    if (item.type === 'paint') return `<div class="hero-3d-product p3d-paint"><div class="lid"></div><div class="handle"></div><div class="body"><div class="label"><b>ASIAN PAINTS</b><em>Premium Wall Finishes</em></div></div><div class="base"></div></div>`;
    if (item.type === 'tools') return `<div class="hero-3d-product p3d-tools"><div class="handle"></div><div class="case"><div class="label"><b>BRANDED HARDWARE</b><small>Tools & Fasteners</small></div></div><div class="tools"><i></i><i></i><i></i></div></div>`;
    if (item.type === 'sanitary') return `<div class="hero-3d-product p3d-sanitary"><div class="unit"><div class="label"><b>SANITARY</b><small>Branded Range</small></div></div><div class="faucet"></div><div class="pipe"></div></div>`;
    return `<div class="hero-3d-product p3d-electric"><div class="pack"><div class="label"><b>ELECTRICAL</b><small>Branded Range</small></div><div class="switches"><i></i><i></i><i></i></div></div><div class="wire"></div></div>`;
  };

  heroSlides.forEach((slide, index) => {
    const item = details[index];
    if (!item) return;

    const kicker = slide.querySelector('.hero-slide__kicker');
    const title = slide.querySelector('h1');
    const lead = slide.querySelector('.hero__lead');
    const badges = slide.querySelector('.badges');
    const media = slide.querySelector('.hero__media');
    const noteTitle = slide.querySelector('.hero__note strong');
    const noteText = slide.querySelector('.hero__note span');

    if (kicker) kicker.textContent = item.kicker;
    if (title) title.textContent = item.title;
    if (lead) lead.textContent = item.lead;
    if (badges) badges.innerHTML = item.badges.map((badge) => `<a href="#${['paints','hardware','sanitary','electrical'][index]}">${badge}</a>`).join('');
    if (noteTitle) noteTitle.textContent = item.noteTitle;
    if (noteText) noteText.textContent = item.noteText;

    if (media) {
      media.classList.add('hero-3d-enabled');
      const scene = document.createElement('div');
      scene.className = 'hero-3d-scene';
      scene.setAttribute('aria-label', `${item.brand} product showcase`);
      scene.innerHTML = `
        <div class="hero-3d-brand"><strong>${item.brand}</strong><small>${item.sub}</small></div>
        ${productMarkup(item)}
        <div class="hero-3d-features">${item.features.map((feature) => `<span>${feature}</span>`).join('')}</div>
      `;
      media.prepend(scene);
    }
  });
});
