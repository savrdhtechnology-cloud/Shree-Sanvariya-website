import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { whatsappHref } from "@/lib/config";

const money = (n:number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export function VehicleCard({vehicle}:{vehicle:Vehicle}) {
  const image = vehicle.images?.[0] || "/vehicle-placeholder.svg";
  return <article className="vehicle-card">
    <div className="vehicle-image">
      <img src={image} alt={`${vehicle.brand} ${vehicle.model}`} loading="lazy" />
      <span className="vehicle-category">{vehicle.bodyType || "CAR"}</span>
      {vehicle.featured && <span className="vehicle-featured">FEATURED</span>}
      <span className={`status status-${vehicle.status.toLowerCase()}`}>{vehicle.status}</span>
      {vehicle.id.startsWith("demo-") && <span className="demo-tag">DEMO</span>}
    </div>
    <div className="vehicle-body">
      <p className="eyebrow">{vehicle.year} • {vehicle.fuel} • {vehicle.transmission}</p>
      <h3>{vehicle.brand} {vehicle.model} <span>{vehicle.variant}</span></h3>
      <p className="vehicle-price">{money(vehicle.price)}</p>
      <div className="spec-row"><span>{vehicle.kmDriven.toLocaleString("en-IN")} KM</span><span>{vehicle.ownership}</span><span>{vehicle.location}</span></div>
      <div className="card-actions"><Link href={`/cars/${vehicle.slug}`} className="btn btn-dark">View Details</Link><a href={whatsappHref(`Hello, I am interested in ${vehicle.brand} ${vehicle.model} ${vehicle.variant}. Please share details.`)} className="btn btn-outline">WhatsApp</a></div>
    </div>
  </article>
}
