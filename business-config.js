window.BUSINESS_CONFIG = {
  name: "SHREE SAWARIYA SETH TRADERS",
  shortName: "SHREE SAWARIYA",
  tagline: "Quality Products for Every Home & Construction Need",
  phonePrimary: "9131204037",
  phoneSecondary: "9754665479",
  whatsappNumber: "919131204037",
  address: "Near Royal Marriage Garden, Narmadapuram Road, Radhapuram, Bhopal - 462026, Madhya Pradesh, India",
  mapLink: "https://maps.app.goo.gl/CAVEysQYvk2bh63n7",
  locationMessage: "Near Royal Marriage Garden, Narmadapuram Road, Radhapuram, Bhopal - 462026, Madhya Pradesh, India",
  logo: "assets/logo.svg",
  images: {
    showroom: "assets/showroom-hero.webp",
    paints: "https://images.unsplash.com/photo-1596653038131-330fa75d23ab?auto=format&fit=crop&w=1200&q=84",
    hardware: "https://images.unsplash.com/photo-1759200165738-6366977a73c6?auto=format&fit=crop&w=1200&q=84",
    sanitary: "https://images.unsplash.com/photo-1768321916212-17ae334a3d63?auto=format&fit=crop&w=1200&q=84",
    electrical: "https://images.unsplash.com/photo-1784807799250-4279d6d0eb09?auto=format&fit=crop&w=1200&q=84"
  },
  brands: ["Asian Paints", "Branded Hardware", "Branded Sanitary & Plumbing", "Branded Electrical"]
};

(() => {
  const config = window.BUSINESS_CONFIG || {};
  const address = config.address || '';
  const mapLink = config.mapLink || '';
  if (!address || !mapLink || document.getElementById('shop-map-card')) return;

  const contactContainer = document.querySelector('.contact .container');
  if (!contactContainer) return;

  const oldLocationNote = document.querySelector('.contact__row em');
  if (oldLocationNote) oldLocationNote.textContent = 'Use the map below for direct directions to our shop.';

  const style = document.createElement('style');
  style.textContent = `
    .shop-map-card{margin-top:28px;display:grid;grid-template-columns:minmax(260px,.78fr) minmax(360px,1.22fr);overflow:hidden;border:1px solid #eadfce;border-radius:24px;background:#fff;box-shadow:0 18px 45px rgba(68,35,21,.09)}
    .shop-map-copy{padding:30px;display:flex;flex-direction:column;justify-content:center;gap:10px;background:linear-gradient(145deg,#fffaf2,#fff)}
    .shop-map-copy small{font-size:12px;font-weight:800;letter-spacing:.16em;color:#c28c2c}
    .shop-map-copy h3{margin:0;color:#71101d;font-size:clamp(22px,2.2vw,32px);line-height:1.15}
    .shop-map-copy p{margin:2px 0 8px;color:#5f5650;line-height:1.65;font-size:15px}
    .shop-map-link{align-self:flex-start;display:inline-flex;align-items:center;justify-content:center;padding:12px 18px;border-radius:999px;background:#71101d;color:#fff!important;text-decoration:none;font-weight:800;box-shadow:0 9px 20px rgba(113,16,29,.18);transition:transform .2s ease,box-shadow .2s ease}
    .shop-map-link:hover{transform:translateY(-2px);box-shadow:0 13px 26px rgba(113,16,29,.24)}
    .shop-map-frame{min-height:330px;background:#eee}
    .shop-map-frame iframe{display:block;width:100%;height:100%;min-height:330px;border:0}
    @media(max-width:760px){.shop-map-card{grid-template-columns:1fr}.shop-map-copy{padding:24px}.shop-map-frame,.shop-map-frame iframe{min-height:300px}}
  `;
  document.head.appendChild(style);

  const mapCard = document.createElement('div');
  mapCard.id = 'shop-map-card';
  mapCard.className = 'shop-map-card reveal';
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  mapCard.innerHTML = `
    <div class="shop-map-copy">
      <small>SHOP LOCATION</small>
      <h3>Visit Shree Sawariya Seth Traders</h3>
      <p>${address}</p>
      <a class="shop-map-link" href="${mapLink}" target="_blank" rel="noopener">Open in Google Maps ↗</a>
    </div>
    <div class="shop-map-frame">
      <iframe src="${embedUrl}" title="Shree Sawariya Seth Traders location on Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>`;

  contactContainer.appendChild(mapCard);
})();
