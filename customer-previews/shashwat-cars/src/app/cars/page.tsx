import type { Metadata } from "next";
import { CarsBrowser } from "@/components/CarsBrowser";
import { getVehicles } from "@/lib/db";
export const metadata:Metadata={title:"Browse Pre-Owned Cars",description:"Browse and filter available pre-owned cars in Bhopal."};
export default async function CarsPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const q=await searchParams;const initial=Object.fromEntries(Object.entries(q).map(([k,v])=>[k,Array.isArray(v)?v[0]:v||""]));const cars=(await getVehicles()).filter(v=>v.status!=="HIDDEN");return <section className="section container"><div className="page-title"><p className="eyebrow">SHASHWAT CARS INVENTORY</p><h1>Browse Pre-Owned Cars</h1><p>Filter by brand, price, fuel, transmission, year and more.</p></div><CarsBrowser vehicles={cars} initial={initial}/></section>}
