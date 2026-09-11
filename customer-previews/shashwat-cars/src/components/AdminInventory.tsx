"use client";
import { FormEvent, useState } from "react";
import type { Vehicle } from "@/lib/types";

export function AdminInventory({initial}:{initial:Vehicle[]}){
 const [cars,setCars]=useState(initial); const [msg,setMsg]=useState("");
 async function add(e:FormEvent<HTMLFormElement>){e.preventDefault();setMsg("");const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  const payload={...data,year:Number(data.year),price:Number(data.price),kmDriven:Number(data.kmDriven),features:String(data.features||"").split(",").map(x=>x.trim()).filter(Boolean),highlights:[],images:["/vehicle-placeholder.svg"],featured:false,status:"AVAILABLE",description:String(data.description||"")};
  const r=await fetch("/api/admin/vehicles",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}); const body=await r.json().catch(()=>({}));
  if(r.ok){setCars([body.vehicle,...cars]);e.currentTarget.reset();setMsg("Vehicle added.");}else setMsg(body.error||"Could not add vehicle.");
 }
 async function status(id:string,status:string){const r=await fetch(`/api/admin/vehicles/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status})});if(r.ok)setCars(cars.map(c=>c.id===id?{...c,status:status as Vehicle["status"]}:c));}
 return <><section className="admin-panel"><h2>Add New Car</h2><form onSubmit={add} className="form-grid admin-form">
 {[["brand","Brand"],["model","Model"],["variant","Variant"],["year","Year"],["price","Price"],["fuel","Fuel"],["transmission","Transmission"],["kmDriven","KM Driven"],["bodyType","Body Type"],["ownership","Ownership"],["registration","Registration"],["registrationState","Registration State"],["location","Location"],["slug","SEO Slug"]].map(([n,l])=><label key={n}>{l}<input name={n} required={!['registration','registrationState'].includes(n)} type={['year','price','kmDriven'].includes(n)?'number':'text'}/></label>)}
 <label className="wide">Features (comma separated)<input name="features" /></label><label className="wide">Description<textarea name="description" rows={3}/></label><button className="btn btn-accent" type="submit">Add Vehicle</button></form>{msg&&<p>{msg}</p>}</section>
 <section className="admin-panel"><h2>Inventory</h2><div className="table-wrap"><table><thead><tr><th>Vehicle</th><th>Year</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>{cars.map(c=><tr key={c.id}><td>{c.brand} {c.model} {c.variant}</td><td>{c.year}</td><td>₹{c.price.toLocaleString('en-IN')}</td><td>{c.status}</td><td className="table-actions"><button onClick={()=>status(c.id,'AVAILABLE')}>Available</button><button onClick={()=>status(c.id,'RESERVED')}>Reserved</button><button onClick={()=>status(c.id,'SOLD')}>Sold</button><button onClick={()=>status(c.id,'HIDDEN')}>Hide</button></td></tr>)}</tbody></table></div></section></>
}
