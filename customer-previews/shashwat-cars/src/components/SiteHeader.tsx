import Link from "next/link";
import { business } from "@/lib/config";

export function SiteHeader() {
  return <header className="site-header"><div className="container nav-wrap">
    <Link href="/" className="brand"><span className="brand-mark">SC</span><span>{business.name}</span></Link>
    <nav className="desktop-nav" aria-label="Primary"><Link href="/">Home</Link><Link href="/cars">Buy Cars</Link><Link href="/sell-your-car">Sell Your Car</Link><Link href="/finance">Finance</Link><Link href="/about">About</Link><Link href="/reviews">Reviews</Link><Link href="/contact">Contact</Link></nav>
    <Link href="/cars" className="btn btn-accent nav-cta">Get Best Deal</Link>
  </div></header>
}
