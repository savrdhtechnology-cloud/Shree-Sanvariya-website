import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { company } from "@/lib/company";

export const metadata: Metadata = { title: `Contact Us | ${company.name}`, description: `Address, email, business hours and company details for ${company.name}, Bhopal.` };
export default function ContactPage(){return <main><Header/><PageHero eyebrow="CONTACT US" title="Connect With Our Company" text="Verified company identity, address, email and opening hours from the legacy business presence."/><section className="section"><div className="container contactPageGrid"><div className="contactPanel"><span className="eyebrow">COMPANY DETAILS</span><h2>{company.name}</h2><div className="detailList"><div><span>Contact Person</span><strong>{company.contactPerson}</strong></div><div><span>Address</span><strong>{company.address}</strong></div><div><span>Email</span><a href={`mailto:${company.email}`}>{company.email}</a></div><div><span>GST No.</span><strong>{company.gst}</strong></div></div></div><div className="hoursCard"><h3>Opening Hours</h3>{company.hours.map(([d,h])=><div className="hoursRow" key={d}><span>{d}</span><strong>{h}</strong></div>)}<a className="btn btnPrimary wide" href={`mailto:${company.email}?subject=General%20Company%20Enquiry`}>Send General Company Email →</a><small>No online medicine ordering is provided through this website.</small></div></div></section><Footer/></main>}
