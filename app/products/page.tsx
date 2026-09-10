import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { company, informationCategories } from "@/lib/company";

export const metadata: Metadata = { title: `Product Information | ${company.name}`, description: "General corporate product information for Shree Sanvariya Seth Traders." };
export default function ProductsPage(){ return <main><Header/><PageHero eyebrow="PRODUCT INFORMATION" title="Product Information" text="A corporate overview of the company’s trading activity. Detailed medicine listings are intentionally not reproduced on this site."/><section className="section"><div className="container"><div className="categoryGrid">{informationCategories.map(([name,text],i)=><article className="categoryCard" key={name}><div className={`categoryArt art${(i%6)+1}`}><span>{["INF","B2B","QMS","ARC","CMP","CNT"][i]}</span><i/><b/></div><div className="categoryBody"><h3>{name}</h3><p>{text}</p><span className="categoryMeta">Informational category</span></div></article>)}</div><div className="infoNotice"><strong>Important:</strong> This website is informational only. Detailed medicine listings, online purchasing, prescription fulfilment and controlled-drug ordering are not provided.</div></div></section><Footer/></main> }
