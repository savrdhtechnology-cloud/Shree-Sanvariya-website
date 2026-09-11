import Image from "next/image";
import Link from "next/link";
import { getVehicles } from "@/lib/db";
import { VehicleCard } from "@/components/VehicleCard";
import { business, phoneHref, whatsappHref } from "@/lib/config";

const hero="https://images.unsplash.com/photo-1760713170685-b67abc3be5ad?auto=format&fit=crop&w=1900&q=88";
const finance="https://images.unsplash.com/photo-1755288348267-3b8bf38e7961?auto=format&fit=crop&w=1500&q=84";
const inspection="https://images.unsplash.com/photo-1761169331343-df176a83c8a9?auto=format&fit=crop&w=1500&q=84";
const showroom="https://images.unsplash.com/photo-1613507323749-df09c966f063?auto=format&fit=crop&w=1600&q=84";

const services=[
  ["🚘","Buy Used Car","Premium cars, verified and ready.","/cars"],
  ["🏷","Sell Your Car","Start a transparent selling journey.","/sell-your-car"],
  ["⌁","Car Valuation","Get an approximate value range.","/car-valuation"],
  ["₹","Car Finance","Explore finance enquiry options.","/finance"],
  ["♢","Insurance","Insurance assistance can be enabled.","/contact"],
  ["⌕","Inspection","Quality and condition checks.","/inspection"],
  ["▤","RC / Documents","Documentation support enquiry.","/contact"],
] as const;

export default async function Home(){
  const cars=(await getVehicles()).filter(v=>v.status!=="HIDDEN");
  const featured=cars.filter(v=>v.featured&&v.status!=="SOLD").slice(0,5);
  return <div className="tech-home">
    <section className="tech-hero">
      <div className="tech-hero-photo"><Image src={hero} alt="Representative premium pre-owned car" fill priority sizes="(max-width: 900px) 100vw, 62vw"/></div>
      <div className="container tech-hero-content"><div className="tech-copy">
        <p className="tech-kicker">PRE-OWNED CARS • A SMARTER BHOPAL EXPERIENCE</p>
        <h1>Buy Better.<br/>Sell Smarter.<br/><span>Drive Exceptional.</span></h1>
        <p>A high-tech way to discover, evaluate and enquire about premium pre-owned cars with clear information and personal dealership assistance.</p>
        <div className="tech-actions"><Link className="btn btn-accent" href="/cars">Explore Our Cars →</Link><Link className="btn btn-ghost" href="/sell-your-car">Sell Your Car</Link></div>
        <div className="tech-mini-trust"><span>Curated inventory</span><span>Transparent enquiries</span><span>Bhopal-focused</span></div>
        <form className="instant-valuation" action="/car-valuation"><h3>Get Instant Car Valuation</h3><p>Start with your registration number, then add vehicle details for an approximate report.</p><div className="instant-row"><input name="registration" placeholder="MP 04 AB 1234" aria-label="Registration number"/><button className="btn btn-accent">Get Price →</button></div><div className="instant-note"><span>Free preview</span><span>No obligation</span><span>Indicative estimate</span></div></form>
      </div></div>
    </section>

    <section className="tech-stats"><div className="container tech-stats-grid"><div className="tech-stat"><strong>{cars.length || "—"}</strong><small>Current preview vehicles</small></div><div className="tech-stat"><strong>360°</strong><small>Digital discovery flow</small></div><div className="tech-stat"><strong>1:1</strong><small>Personal assistance</small></div><div className="tech-stat"><strong>Bhopal</strong><small>Local dealership focus</small></div></div></section>

    <section className="quick-services"><div className="container service-grid">{services.map(([icon,title,copy,href])=><Link href={href} className="service-tile" key={title}><span className="service-icon">{icon}</span><b>{title}</b><small>{copy}</small><i>→</i></Link>)}</div></section>

    <section className="trust-strip"><div className="container trust-strip-grid"><div className="trust-intro">TRUST IN EVERY KILOMETRE</div>{[["Fast Valuation","Explainable approximate estimate"],["Offer Journey","Inspection-led dealership discussion"],["Transparent Process","Clear steps and next actions"],["Document Support","RC and paperwork assistance"],["Verified Inventory","Admin-managed vehicle records"]].map(([a,b])=><div className="trust-point" key={a}><span className="trust-dot"/><b>{a}</b><small>{b}</small></div>)}</div></section>

    <section className="tech-section alt"><div className="container sell-flow"><div className="sell-flow-copy"><p className="eyebrow-tech">SELL YOUR CAR</p><h3>A clear journey in 4 simple steps.</h3><p className="muted">Inspired by the best digital car-selling flows, adapted for Shashwat Cars without overpromising.</p><Link href="/sell-your-car" className="btn btn-accent">Start Selling →</Link></div><div className="sell-steps">{[["01","Get Valuation","Enter vehicle details and get an indicative range."],["02","Inspection","Arrange physical verification of condition and documents."],["03","Discuss Offer","Review dealership assessment and commercial terms."],["04","Transfer","Complete mutually agreed paperwork and next steps."]].map(([n,t,c])=><div className="sell-step" key={n}><span className="num">{n}</span><h4>{t}</h4><p>{c}</p></div>)}</div></div></section>

    <section className="tech-section featured-tech"><div className="container"><div className="tech-section-head"><div><p className="eyebrow-tech">FEATURED PREMIUM CARS</p><h2>Handpicked. Clear. Discoverable.</h2><p>Customer-preview inventory uses representative imagery. Final production images will come from dealership inventory.</p></div><Link href="/cars" className="btn btn-outline">View All Cars →</Link></div>{featured.length?<div className="vehicle-grid">{featured.map(v=><VehicleCard vehicle={v} key={v.id}/>)}</div>:<div className="empty-state">Inventory will appear here after admin upload.</div>}</div></section>

    <section className="tech-section alt"><div className="container browse-grid"><div className="browse-card"><h3>Browse by Budget</h3><p>Find cars in your range.</p><div className="chip-row"><Link className="chip" href="/cars?maxPrice=700000">Under ₹7L</Link><Link className="chip" href="/cars?minPrice=700000&maxPrice=1000000">₹7–10L</Link><Link className="chip" href="/cars?minPrice=1000000&maxPrice=1500000">₹10–15L</Link><Link className="chip" href="/cars?minPrice=1500000">₹15L+</Link></div></div><div className="browse-card"><h3>Browse by Body Type</h3><p>Choose your style.</p><div className="chip-row"><Link className="chip" href="/cars?bodyType=Sedan">Sedan</Link><Link className="chip active" href="/cars?bodyType=SUV">SUV</Link><Link className="chip" href="/cars?bodyType=Hatchback">Hatchback</Link><Link className="chip" href="/cars?bodyType=MUV">MUV</Link></div></div><div className="browse-card"><h3>Browse by City</h3><p>Local-first discovery.</p><div className="chip-row"><span className="chip active">Bhopal</span><span className="chip">Indore</span><span className="chip">Jabalpur</span><span className="chip">Ujjain</span></div></div></div></section>

    <section className="tech-section"><div className="container dual-promo"><div className="promo-card"><Image src={finance} alt="Premium vehicle finance visual" fill sizes="(max-width: 800px) 100vw, 50vw"/><div className="promo-copy"><p className="eyebrow-tech">FLEXIBLE CAR FINANCE</p><h3>Drive your next car, easier.</h3><p>Submit a finance enquiry and discuss lender-dependent options, eligibility and indicative EMI planning.</p><ul><li>Finance enquiry workflow</li><li>Down-payment planning</li><li>Eligibility subject to lender approval</li></ul><Link className="btn btn-accent" href="/finance">Explore Finance →</Link></div></div><div className="promo-card"><Image src={inspection} alt="Vehicle inspection visual" fill sizes="(max-width: 800px) 100vw, 50vw"/><div className="promo-copy"><p className="eyebrow-tech">VEHICLE INSPECTION</p><h3>Buy with more confidence.</h3><p>Structure physical checks around body, mechanical condition, tyres, interior, documents and road-test observations.</p><ul><li>Condition checklist</li><li>Document verification support</li><li>Inspection notes for CRM</li></ul><Link className="btn btn-accent" href="/inspection">View Inspection →</Link></div></div></div></section>

    <section className="tech-section alt"><div className="container"><div className="tech-section-head"><div><p className="eyebrow-tech">WHY SHASHWAT CARS</p><h2>Technology for clarity. People for trust.</h2></div></div><div className="why-grid">{[["✓","Verified Quality","Inventory can carry admin-verified records."],["↔","Transparent Deals","Clear price, enquiry and follow-up flow."],["₹","Finance Assistance","Structured finance enquiry journey."],["⌕","Inspection Support","Condition checks before final decision."],["♡","Customer First","Human assistance through every step."]].map(([i,t,c])=><div className="why-card" key={t}><span className="why-icon">{i}</span><b>{t}</b><small>{c}</small></div>)}</div></div></section>

    <section className="tech-section"><div className="container faq-showroom"><div className="faq-card"><p className="eyebrow-tech">FAQ</p><h3>Frequently Asked</h3><details><summary>How does car valuation work?</summary><p>It produces an indicative range using transparent depreciation, kilometres, ownership and condition inputs. Final dealership value needs inspection.</p></details><details><summary>Can I finance a used car?</summary><p>You can submit a finance enquiry. Actual eligibility, rate and approval depend on the lender.</p></details><details><summary>Are preview cars real inventory?</summary><p>Demo-tagged vehicles and representative photos are for customer preview only. Production inventory comes from admin/database records.</p></details><details><summary>Can I sell my car here?</summary><p>Yes. Submit details, review indicative value, then arrange inspection and dealership follow-up.</p></details></div><div className="showroom-card"><Image src={showroom} alt="Representative dealership showroom visual" fill sizes="(max-width:800px) 100vw, 44vw"/><div className="showroom-overlay"><p className="eyebrow-tech">VISIT OUR SHOWROOM</p><h3>{business.name}</h3><p>{business.address}</p><a className="btn btn-accent" href={business.mapsUrl} target="_blank">Get Directions →</a></div></div><div className="contact-tech-card"><p className="eyebrow-tech">LET'S DRIVE YOUR NEXT CHAPTER</p><h3>Talk to the team.</h3><p>For buying, selling, valuation, finance or inspection assistance.</p>{business.phone&&<div className="contact-line">☎ {business.phone}</div>}{business.email&&<div className="contact-line">✉ {business.email}</div>}<div className="tech-actions"><a className="btn btn-accent" href={whatsappHref("Hello, I would like to enquire with Shashwat Cars.")}>Enquire →</a><a className="btn btn-outline" href={phoneHref()}>Call</a></div></div></div></section>
  </div>
}
