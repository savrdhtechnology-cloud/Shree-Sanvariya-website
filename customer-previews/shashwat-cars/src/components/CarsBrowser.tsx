"use client";
import { useMemo, useState } from "react";
import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "./VehicleCard";

type Filters = { brand:string; model:string; fuel:string; transmission:string; minPrice:string; maxPrice:string; year:string; minKm:string; maxKm:string; bodyType:string; ownership:string; location:string; status:string; sort:string };
const empty:Filters = { brand:"", model:"", fuel:"", transmission:"", minPrice:"", maxPrice:"", year:"", minKm:"", maxKm:"", bodyType:"", ownership:"", location:"", status:"", sort:"newest" };

export function CarsBrowser({ vehicles, initial = {} }: { vehicles: Vehicle[]; initial?: Partial<Filters> }) {
  const [f, setF] = useState<Filters>({ ...empty, ...initial });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtered = useMemo(() => {
    const result = vehicles.filter(v =>
      (!f.brand || v.brand.toLowerCase().includes(f.brand.toLowerCase())) &&
      (!f.model || v.model.toLowerCase().includes(f.model.toLowerCase())) &&
      (!f.fuel || v.fuel === f.fuel) && (!f.transmission || v.transmission === f.transmission) &&
      (!f.year || String(v.year) === f.year) && (!f.bodyType || v.bodyType === f.bodyType) &&
      (!f.ownership || v.ownership === f.ownership) && (!f.location || v.location === f.location) &&
      (!f.status || v.status === f.status) && (!f.minPrice || v.price >= Number(f.minPrice)) &&
      (!f.maxPrice || v.price <= Number(f.maxPrice)) && (!f.minKm || v.kmDriven >= Number(f.minKm)) &&
      (!f.maxKm || v.kmDriven <= Number(f.maxKm))
    );
    return [...result].sort((a,b) => f.sort === "price-asc" ? a.price-b.price : f.sort === "price-desc" ? b.price-a.price : f.sort === "km-asc" ? a.kmDriven-b.kmDriven : (b.createdAt || "").localeCompare(a.createdAt || ""));
  }, [vehicles, f]);
  const set = (k:keyof Filters) => (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => setF({...f,[k]:e.target.value});
  const options = (key:keyof Vehicle) => Array.from(new Set(vehicles.map(v => String(v[key] || "")).filter(Boolean))).sort();
  const filters = <>
    <div className="section-head"><h2>Filters</h2><button className="text-button" onClick={() => setF(empty)}>Reset</button></div>
    <label>Brand<input value={f.brand} onChange={set("brand")} placeholder="e.g. Hyundai" /></label>
    <label>Model<input value={f.model} onChange={set("model")} placeholder="e.g. Creta" /></label>
    <div className="two-col"><label>Min Price<input type="number" value={f.minPrice} onChange={set("minPrice")} /></label><label>Max Price<input type="number" value={f.maxPrice} onChange={set("maxPrice")} /></label></div>
    <div className="two-col"><label>Min KM<input type="number" value={f.minKm} onChange={set("minKm")} /></label><label>Max KM<input type="number" value={f.maxKm} onChange={set("maxKm")} /></label></div>
    <label>Fuel<select value={f.fuel} onChange={set("fuel")}><option value="">All</option>{options("fuel").map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Transmission<select value={f.transmission} onChange={set("transmission")}><option value="">All</option>{options("transmission").map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Year<select value={f.year} onChange={set("year")}><option value="">All</option>{options("year").reverse().map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Body Type<select value={f.bodyType} onChange={set("bodyType")}><option value="">All</option>{options("bodyType").map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Ownership<select value={f.ownership} onChange={set("ownership")}><option value="">All</option>{options("ownership").map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Location<select value={f.location} onChange={set("location")}><option value="">All</option>{options("location").map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Availability<select value={f.status} onChange={set("status")}><option value="">All</option><option value="AVAILABLE">Available</option><option value="RESERVED">Reserved</option><option value="SOLD">Sold</option></select></label>
  </>;
  return <div className="inventory-wrap">
    <button className="btn btn-dark mobile-filter-button" onClick={() => setFiltersOpen(true)}>Filters & Search</button>
    <div className="inventory-layout"><aside className="filters card desktop-filters">{filters}</aside><div><div className="inventory-toolbar"><strong>{filtered.length} cars found</strong><select value={f.sort} onChange={set("sort")}><option value="newest">Newest</option><option value="price-asc">Price Low to High</option><option value="price-desc">Price High to Low</option><option value="km-asc">KM Low to High</option></select></div>{filtered.length ? <div className="vehicle-grid">{filtered.map(v=><VehicleCard key={v.id} vehicle={v}/>)}</div> : <div className="empty-state"><h3>No cars match your current filters.</h3><p>Try changing your budget or search criteria.</p><button className="btn btn-dark" onClick={() => setF(empty)}>Clear Filters</button></div>}</div></div>
    {filtersOpen && <div className="filter-drawer-backdrop" onClick={() => setFiltersOpen(false)}><aside className="filter-drawer" onClick={e => e.stopPropagation()}><button className="drawer-close" onClick={() => setFiltersOpen(false)}>×</button>{filters}<button className="btn btn-accent" onClick={() => setFiltersOpen(false)}>Show {filtered.length} Cars</button></aside></div>}
  </div>;
}
