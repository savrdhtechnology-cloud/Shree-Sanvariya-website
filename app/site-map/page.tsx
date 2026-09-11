import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
const links=[["Home","/"],["About Us","/about-us"],["Product Information","/products"],["Testimonials","/testimonials"],["Contact Us","/contact-us"],["Privacy Policy","/privacy-policy"],["Terms & Conditions","/terms-and-conditions"]];
export default function SiteMap(){return <main><Header/><PageHero eyebrow="SITE MAP" title="Website Navigation" text="Quick access to all primary pages of the redesigned company website."/><section className="section"><div className="container sitemapGrid">{links.map(([t,u])=><a key={u} href={u}><strong>{t}</strong><span>→</span></a>)}</div></section><Footer/></main>}
