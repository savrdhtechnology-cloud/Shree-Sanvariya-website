import "./premium-home.css";
import Link from "next/link";
import { getVehicles } from "@/lib/db";
import { VehicleCard } from "@/components/VehicleCard";
import { business } from "@/lib/config";

const services = [
  ["🚘","Buy Used Car","Premium inventory","/cars"],
  ["🏷","Sell Your Car","Start a clear selling journey","/sell-your-car"],
  ["▥","Car Valuation","Approximate value range","/car-valuation"],
  ["₹","Car Finance","Finance enquiry options","/finance"],
  ["◇","Insurance","Assistance enquiry","/contact"],
  ["⌕","Inspection","Condition checks","/contact"],
  ["▤","RC / Documents","Paperwork support","/contact"],
] as const;

export default async function Home(){
  const cars=(await getVehicles()).filter(v=>v.status!=="HIDDEN");
  const featured=cars.filter(v=>v.featured&&v.status!=="SOLD").slice(0,6);
  return <>
    <section className="ht-hero">
      <div className="ht-grid"/><div className="ht-orb"/><div className="ht-beam"/>
      <div className="ht-photo" aria-hidden="true"/>
      <div className="container ht-hero-inner">
        <div className="ht-copy">
          <p className="ht-kicker">PREMIUM CARS · A SMARTER WAY</p>
          <h1>Your Next Chapter <span>Drives Here.</span></h1>
          <p className="ht-sub">Buy, sell, or value your car with complete confidence. A premium pre-owned experience designed for Bhopal.</p>
          <div className="hero-actions"><Link className="btn btn-accent" href="/cars">Explore Our Cars →</Link><Link className="btn btn-ghost" href="/sell-your-car">Sell Your Car</Link></div>
          <div className="ht-proof"><span>✓ Verified-style inventory</span><span>✓ Transparent process</span><span>✓ Personal assistance</span></div>
        </div>
        <aside className="ht-valuation">
          <div className="ht-val-title"><span>▥</span><div><h2>Instant Car Valuation</h2><p>Get an approximate value range in seconds.</p></div></div>
          <Link className="ht-faux-field" href="/car-valuation"><span>🚘</span><b>Select Make & Model</b></Link>
          <Link className="ht-faux-field" href="/car-valuation"><span>▣</span><b>Year · KM · Condition</b></Link>
          <Link className="btn btn-accent ht-full" href="/car-valuation">Get My Car Value →</Link>
          <div className="ht-mini">Free preview · No obligation · Indicative result</div>
        </aside>
      </div>
      <div className="ht-line"/>
    </section>

    <section className="ht-stats"><div className="container ht-stats-grid"><div><strong>{cars.length}</strong><span>Demo Vehicles</span></div><div><strong>360°</strong><span>Digital Discovery</span></div><div><strong>1:1</strong><span>Personal Assistance</span></div><div><strong>Bhopal</strong><span>Local Dealership Focus</span></div></div></section>

    <section className="ht-services"><div className="container ht-service-grid">{services.map(([icon,title,sub,href])=><Link key={title} className="ht-service" href={href}><span className="ht-service-icon">{icon}</span><h3>{title}</h3><p>{sub}</p><i>→</i></Link>)}</div></section>

    <section className="ht-trust"><div className="container ht-trust-grid"><div className="ht-trust-lead">TRUST IN EVERY<br/>KILOMETRE</div><div><b>◇</b><strong>Fast Valuation</strong><small>Explainable estimate</small></div><div><b>⚙</b><strong>Inspection Journey</strong><small>Physical verification</small></div><div><b>▤</b><strong>Transparent Process</strong><small>Clear next steps</small></div><div><b>◎</b><strong>Document Support</strong><small>RC assistance enquiry</small></div><div><b>▥</b><strong>Managed Inventory</strong><small>Admin-controlled records</small></div></div></section>

    <section className="ht-steps section-dark"><div className="container ht-steps-grid"><div className="ht-step-intro"><p className="eyebrow light">SELL YOUR CAR</p><h2>A clear journey in 4 simple steps.</h2><p>Conversion-first flow adapted for {business.name}.</p><Link className="btn btn-accent" href="/sell-your-car">Start Selling →</Link></div>{[
      ["01","Get Valuation","Enter details and get an indicative range."],
      ["02","Inspection","Verify vehicle condition and documents."],
      ["03","Discuss Offer","Review assessment and commercial terms."],
      ["04","Transfer","Complete agreed paperwork and next steps."],
    ].map(([n,t,d])=><div key={n} className="ht-step"><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>

    <section className="section container premium-featured"><div className="section-head"><div><p className="eyebrow">CURATED INVENTORY</p><h2>Featured cars.</h2><p className="muted">Representative demo listings for the customer preview.</p></div><Link href="/cars">View full collection →</Link></div>{featured.length?<div className="vehicle-grid">{featured.map(v=><VehicleCard key={v.id} vehicle={v}/>)}</div>:<div className="empty-state"><h3>Fresh inventory is being prepared.</h3><p>Production vehicles will appear here after dealership admin adds verified inventory.</p></div>}</section>

    <section className="section section-dark premium-band"><div className="container trust-grid"><div><p className="eyebrow light">CONNECTED CAR JOURNEY</p><h2>Everything around the car, connected.</h2><p>Discover a car, request valuation, ask about finance, and arrange inspection or documentation support through one digital experience.</p><Link href="/contact" className="btn btn-accent">Talk to Shashwat Cars →</Link></div><div className="trust-card premium-process"><span>01</span><h3>Valuation</h3><p>Approximate estimate before inspection.</p><span>02</span><h3>Finance</h3><p>Eligibility remains subject to lender assessment.</p><span>03</span><h3>Inspection & Documents</h3><p>Physical verification and paperwork support.</p></div></div></section>
  </>;
}
