import Link from "next/link";
import { business } from "@/lib/config";

export function Footer() {
  return <footer className="footer"><div className="container footer-grid">
    <div><div className="brand"><span className="brand-mark">SC</span><span>{business.name}</span></div><p>Trusted pre-owned car discovery in Bhopal with transparent, enquiry-first buying and selling journeys.</p></div>
    <div><h3>Explore</h3><Link href="/cars">Buy Cars</Link><Link href="/sell-your-car">Sell Your Car</Link><Link href="/finance">Finance</Link><Link href="/about">About</Link></div>
    <div><h3>Support</h3><Link href="/contact">Contact</Link><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-and-conditions">Terms & Conditions</Link><Link href="/disclaimer">Disclaimer</Link></div>
    <div><h3>Visit</h3><p>{business.address}</p><a href={business.mapsUrl} target="_blank" rel="noreferrer">Get Directions →</a>{business.email && <a href={`mailto:${business.email}`}>{business.email}</a>}</div>
  </div><div className="container footer-bottom">© {new Date().getFullYear()} {business.name}. All rights reserved.</div></footer>
}
