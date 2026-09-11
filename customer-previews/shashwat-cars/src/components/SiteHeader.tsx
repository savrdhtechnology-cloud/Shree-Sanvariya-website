import Link from "next/link";
import { business } from "@/lib/config";

export function SiteHeader(){return <header className="site-header"><div className="container nav-wrap">
  <Link href="/" className="brand"><span className="brand-mark">S</span><span>{business.name.toUpperCase()}</span></Link>
  <nav className="desktop-nav" aria-label="Primary"><Link href="/">Home</Link><Link href="/cars">Buy Cars</Link><Link href="/sell-your-car">Sell Your Car</Link><Link href="/car-valuation">Car Valuation</Link><Link href="/finance">Finance</Link><Link href="/inspection">Inspection</Link><Link href="/contact">Contact</Link></nav>
  <Link href="/contact" className="btn btn-accent nav-cta">Visit Showroom →</Link>
</div></header>}
