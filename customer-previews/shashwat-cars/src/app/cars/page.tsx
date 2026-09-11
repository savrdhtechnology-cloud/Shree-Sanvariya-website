import "../inventory-premium.css";
import type { Metadata } from "next";
import { CarsBrowser } from "@/components/CarsBrowser";
import { getVehicles } from "@/lib/db";

export const metadata:Metadata={title:"Browse Pre-Owned Cars",description:"Browse Shashwat Cars inventory by Sedan, Hatchback, SUV, brand, budget and more."};

export default async function CarsPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
  const q=await searchParams;
  const initial=Object.fromEntries(Object.entries(q).map(([k,v])=>[k,Array.isArray(v)?v[0]:v||""]));
  const cars=(await getVehicles()).filter(v=>v.status!=="HIDDEN");
  return <section className="section inventory-showcase"><div className="container">
    <div className="page-title"><div><p className="eyebrow">OUR INVENTORY</p><h1>Find Your Perfect Car</h1><p>Every active vehicle listed by the dealership admin appears here automatically.</p></div><div className="muted">Sedan · Hatchback · SUV</div></div>
    <CarsBrowser vehicles={cars} initial={initial}/>
  </div></section>;
}
