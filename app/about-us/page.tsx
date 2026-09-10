import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { company } from "@/lib/company";

export const metadata: Metadata = { title: `About Us | ${company.name}`, description: `Company profile, business details and background of ${company.name}, Bhopal.` };

export default function AboutPage() {
  const profile = [
    ["Contact Person", company.contactPerson], ["Year of Establishment", company.established], ["Primary Business", company.businessType],
    ["Ownership", company.ownership], ["Employees", company.employees], ["Annual Turnover", company.turnover], ["GST No.", company.gst]
  ];
  return <main><Header/><PageHero eyebrow="ABOUT US" title="A Professional Pharmaceutical Trading Business" text="Company information retained from the legacy website and verified public business listings."/>
    <section className="section"><div className="container innerGrid"><div><span className="eyebrow">COMPANY PROFILE</span><h2>Shree Sanvariya Seth Traders</h2><p className="bodyText">Based in Bhopal, Madhya Pradesh, Shree Sanvariya Seth Traders operates as a pharmaceutical supplier and trader. The business was established in 2026 and is represented by Mr. K.G.</p><p className="bodyText">This redesigned website keeps the important company identity and business information while presenting it in a cleaner corporate format. It is informational and does not provide online medicine checkout or prescription fulfilment.</p></div><div className="profileCard">{profile.map(([k,v])=><div className="profileRow" key={k}><span>{k}</span><strong>{v}</strong></div>)}</div></div></section>
    <section className="section sectionTint"><div className="container"><div className="centerHead"><span className="eyebrow">BUSINESS APPROACH</span><h2>Trust, Clarity & <span>Professional Service</span></h2><p>Modern presentation focused on responsible business communication.</p></div><div className="valuesGrid"><article className="valueCard"><span>01</span><h3>Professional Coordination</h3><p>Clear communication for company-profile and institutional discussions.</p></article><article className="valueCard"><span>02</span><h3>Verified Company Details</h3><p>Key identity information is based on the legacy website and public business listings.</p></article><article className="valueCard"><span>03</span><h3>Compliance-Aware Website</h3><p>No direct online medicine sale, prescription fulfilment or controlled-drug ordering.</p></article></div></div></section><Footer/></main>;
}
