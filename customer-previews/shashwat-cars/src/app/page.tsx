import Link from "next/link";
import { getVehicles } from "@/lib/db";
import { VehicleCard } from "@/components/VehicleCard";
import { business, phoneHref, whatsappHref } from "@/lib/config";

export default async function Home(){
  const cars=(await getVehicles()).filter(v=>v.status!=="HIDDEN");
  const featured=cars.filter(v=>v.featured&&v.status!=="SOLD").slice(0,6);
  return <>
    <section className="hero premium-hero">
      <div className="hero-grid-bg" />
      <div className="hero-gold-orb" />
      <div className="hero-overlay"></div>
      <div className="container hero-content premium-hero-content">
        <div className="premium-hero-copy">
          <p className="eyebrow light">PREMIUM PRE-OWNED CARS · BHOPAL</p>
          <h1>Drive something <span>exceptional.</span></h1>
          <p>A refined way to discover quality pre-owned cars — transparent details, confident choices and a dealership experience designed around you.</p>
          <div className="hero-actions"><Link className="btn btn-accent" href="/cars">Explore Cars →</Link><Link className="btn btn-ghost" href="/sell-your-car">Sell Your Car</Link></div>
          <div className="premium-trust-row"><span>◆ Curated Inventory</span><span>◆ Transparent Deals</span><span>◆ Personal Assistance</span></div>
        </div>
        <form className="hero-search premium-search" action="/cars" method="get"><div className="premium-search-head"><h2>Find Your Car</h2><span>SEARCH THE COLLECTION</span></div><div className="search-grid"><input name="brand" placeholder="Brand"/><input name="model" placeholder="Model"/><input name="minPrice" type="number" placeholder="Min Price"/><input name="maxPrice" type="number" placeholder="Max Price"/><select name="fuel"><option value="">Fuel</option><option>Petrol</option><option>Diesel</option><option>CNG</option><option>Electric</option></select><select name="transmission"><option value="">Transmission</option><option>Manual</option><option>Automatic</option></select><input name="year" type="number" placeholder="Year"/><button className="btn btn-accent">Search Cars</button></div></form>
      </div>
    </section>

    <section className="premium-stats"><div className="container premium-stats-grid"><div><strong>{cars.length}</strong><span>Current Vehicles</span></div><div><strong>360°</strong><span>Digital Discovery</span></div><div><strong>1:1</strong><span>Personal Assistance</span></div><div><strong>Bhopal</strong><span>Local Dealership</span></div></div></section>
    <div className="premium-marquee"><div>PRE-OWNED CARS ◆ TRANSPARENT DEALS ◆ PREMIUM EXPERIENCE ◆ SELL YOUR CAR ◆ FINANCE ASSISTANCE ◆ PRE-OWNED CARS ◆ TRANSPARENT DEALS ◆ PREMIUM EXPERIENCE ◆</div></div>

    <section className="section container premium-featured"><div className="section-head"><div><p className="eyebrow">CURATED INVENTORY</p><h2>Featured automobiles.</h2><p className="muted">Selected vehicles presented with clarity and confidence.</p></div><Link href="/cars">View full collection →</Link></div>{featured.length?<div className="vehicle-grid">{featured.map(v=><VehicleCard key={v.id} vehicle={v}/>)}</div>:<div className="empty-state"><h3>Fresh inventory is being prepared.</h3><p>Production vehicles will appear here as soon as they are added by the dealership admin.</p><Link className="btn btn-dark" href="/contact">Contact Shashwat Cars</Link></div>}</section>

    <section className="section section-dark premium-band"><div className="container trust-grid"><div><p className="eyebrow light">SELL YOUR CAR</p><h2>Upgrade your journey, effortlessly.</h2><p>Share your vehicle details and request a competitive valuation from {business.name}. Final value is subject to physical inspection and document verification.</p><Link href="/sell-your-car" className="btn btn-accent">Request Valuation →</Link></div><div className="trust-card premium-process"><span>01</span><h3>Share your car</h3><p>Tell us about your vehicle and expected value.</p><span>02</span><h3>Schedule inspection</h3><p>Plan a physical evaluation with the dealership.</p><span>03</span><h3>Review the offer</h3><p>Discuss valuation and next steps with clarity.</p></div></div></section>

    <section className="section container"><div className="section-head"><div><p className="eyebrow">VISIT SHASHWAT CARS</p><h2>See your next car in person.</h2></div></div><div className="visit-card premium-visit"><div><h3>{business.address}</h3><p>Use the verified Google Maps reference for directions. Call and WhatsApp details can be configured by the dealership admin.</p></div><div className="card-actions"><a className="btn btn-dark" href={business.mapsUrl} target="_blank">Get Directions</a><a className="btn btn-outline" href={whatsappHref("Hello, I would like to visit Shashwat Cars.")}>WhatsApp</a><a className="btn btn-outline" href={phoneHref()}>Call</a></div></div></section>
  </>
}
