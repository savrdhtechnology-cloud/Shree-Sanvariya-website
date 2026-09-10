import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import AnimatedProductGrid from "@/components/AnimatedProductGrid";
import { company } from "@/lib/company";

const productCategories = [
  { name: "Pharmaceutical Tablets", text: "Illustrative tablet-packaging visual for category-level company presentation." },
  { name: "Capsules", text: "Illustrative capsule-packaging visual for category-level company presentation." },
  { name: "Syrups", text: "Illustrative syrup bottle and carton visual for category-level company presentation." },
  { name: "Multivitamins", text: "Illustrative multivitamin bottle visual for category-level company presentation." },
  { name: "Skin Care", text: "Illustrative topical-care packaging visual for category-level company presentation." },
  { name: "Liquid Drops", text: "Illustrative drops bottle and carton visual for category-level company presentation." },
];

export const metadata: Metadata = { title: `Product Information | ${company.name}`, description: "General corporate product information for Shree Sanvariya Seth Traders." };

export default function ProductsPage(){
  return <main>
    <Header/>
    <PageHero eyebrow="PRODUCT INFORMATION" title="Product Information" text="A corporate overview of product categories using illustrative packaging visuals. The images shown are presentation mockups, not verified product packs."/>
    <section className="section">
      <div className="container">
        <AnimatedProductGrid items={productCategories} />
        <div className="infoNotice"><strong>Important:</strong> Product visuals are illustrative mockups for website presentation. This website is informational only and does not provide medicine checkout, prescription fulfilment or controlled-drug ordering.</div>
      </div>
    </section>
    <Footer/>
  </main>
}
