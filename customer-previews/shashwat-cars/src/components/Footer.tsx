import Link from "next/link";
import { business } from "@/lib/config";
export function Footer(){return <footer className="footer"><div className="container footer-grid">
  <div><div className="brand"><span className="brand-mark">S</span><span>{business.name.toUpperCase()}</span></div><p>Pre-owned cars, smarter digital discovery and dealership-led assistance in Bhopal.</p></div>
  <div><h3>Discover</h3><Link href="/cars">Buy Cars</Link><Link href="/sell-your-car">Sell Your Car</Link><Link href="/car-valuation">Car Valuation</Link><Link href="/finance">Finance</Link></div>
  <div><h3>Support</h3><Link href="/inspection">Inspection</Link><Link href="/contact">Contact</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms-and-conditions">Terms</Link></div>
  <div><h3>Visit</h3><p>{business.address}</p><a href={business.mapsUrl} target="_blank" rel="noreferrer">Get Directions →</a>{business.email&&<a href={`mailto:${business.email}`}>{business.email}</a>}</div>
</div><div className="container footer-bottom">TRUST DRIVES EVERY JOURNEY • © {new Date().getFullYear()} {business.name}</div></footer>}
