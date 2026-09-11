import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { company } from "@/lib/company";

export const metadata: Metadata = { title: `Testimonials & Reviews | ${company.name}`, description: `Public review summary for ${company.name}.` };
export default function TestimonialsPage(){return <main><Header/><PageHero eyebrow="TESTIMONIALS" title="Customer Reviews & Public Feedback" text="The legacy site included a Testimonials section. We only display review information that can be independently verified."/><section className="section"><div className="container reviewWrap"><div className="ratingCard"><span className="ratingScore">4.4</span><div><strong>Public listing rating</strong><p>10 reviews on a verified public business listing at the time of review.</p></div></div><div><h2>Responsible review presentation</h2><p className="bodyText">Individual testimonial text has not been copied because we could not independently verify each original statement from the legacy Testimonials page. This keeps the redesigned website accurate and avoids inventing customer endorsements.</p><a className="btn btnPrimary" href="/contact-us">Contact the company →</a></div></div></section><Footer/></main>}
