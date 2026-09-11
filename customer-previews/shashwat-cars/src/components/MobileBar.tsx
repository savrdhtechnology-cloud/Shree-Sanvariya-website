import Link from "next/link";
export function MobileBar(){return <nav className="mobile-bar" aria-label="Mobile quick actions"><Link href="/cars">🚘 Cars</Link><Link href="/car-valuation">⌁ Value</Link><Link href="/contact">💬 Enquire</Link></nav>}
