"use client";
import { FormEvent, useState } from "react";
import type { Vehicle } from "@/lib/types";

export function AdminInventory({initial}:{initial:Vehicle[]}){
 const [cars,setCars]=useState(initial); const [msg,setMsg]=useState("");
 async function add(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setMsg("");
  const form=e.currentTarget;const data=Object.fromEntries(new FormData(form).entries());
  const imageUrls=String(data.imageUrls||"").split(/[\n,]+/).map(x=>x.trim()).filter(Boolean);
  const payload={...data,year:Number(data.year),price:Number(data.price),kmDriven:Number(data.kmDriven),features:String(data.features||"").split(",").map(x=>x.trim()).filter(Boolean),highlights:[],images:imageUrls.length?imageUrls:["/vehicle-placeholder.svg"],featured:data.featured==="on",status:"AVAILABLE",description:String(data.description||"")};
  delete (payload as Record<string,unknown>).imageUrls;
  const r=await fetch("/api/admin/vehicles",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}); const body=await r.json().catch(()=>({}));
  if(r.ok){setCars([body.vehicle,...cars]);form.reset();setMsg("Vehicle added to inventory.");}else setMsg(body.error||"Could not add vehicle.");
 }
 async function patch(id:string,changes:Partial<Vehicle>){
  const r=await fetch(`/api/admin/vehicles/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(changes)});const body=await r.json().catch(()=>({}));
  if(r.ok&&body.vehicle)setCars(cars.map(c=>c.id===id?body.vehicle:c));else setMsg(body.error||"Update failed.");
 }
 async function status(id:string,status:Vehicle["status"]){await patch(id,{status});}
 async function featured(id:string,value:boolean){await patch(id,{featured:value});}
 return <>
 <section className="admin-panel"><h2>Add New Car</h2><p className="muted">Cars added here automatically appear on the Buy Cars inventory page. Turn on <b>Featured on Home</b> to show selected cars on the homepage.</p><form onSubmit={add} className="form-grid admin-form">
  <label>Brand<input name="brand" required placeholder="Hyundai"/></label>
  <label>Model<input name="model" required placeholder="Creta"/></label>
  <label>Variant<input name="variant" required placeholder="SX(O)"/></label>
  <label>Year<input name="year" required type="number" min="1995" max="2035"/></label>
  <label>Price (₹)<input name="price" required type="number" min="1"/></label>
  <label>Fuel<input name="fuel" required placeholder="Petrol"/></label>
  <label>Transmission<select name="transmission" required><option>Manual</option><option>Automatic</option></select></label>
  <label>KM Driven<input name="kmDriven" required type="number" min="0"/></label>
  <label>Body Type<select name="bodyType" required><option>Sedan</option><option>Hatchback</option><option>SUV</option><option>MUV</option><option>Coupe</option></select></label>
  <label>Ownership<select name="ownership" required><option>1st Owner</option><option>2nd Owner</option><option>3rd Owner</option><option>4th+ Owner</option></select></label>
  <label>Registration<input name="registration" placeholder="MP04"/></label>
  <label>Registration State<input name="registrationState" placeholder="Madhya Pradesh"/></label>
  <label>Location<input name="location" required defaultValue="Bhopal"/></label>
  <label>SEO Slug<input name="slug" required placeholder="hyundai-creta-sx-2022"/></label>
  <label className="wide">Car Images — PNG/JPG/WebP URLs<input name="imageUrls" placeholder="https://.../car-front.png, https://.../car-rear.png"/><small className="muted">For the clean cutout look, use transparent-background PNG/WebP images where possible. First URL becomes the card cover image.</small></label>
  <label className="wide">Features (comma separated)<input name="features" placeholder="ABS, Airbags, Rear Camera"/></label>
  <label className="wide">Description<textarea name="description" rows={3}/></label>
  <label className="wide" style={{display:"flex",alignItems:"center",gap:10}}><input name="featured" type="checkbox" style={{width:18,height:18,margin:0}}/> Featured on Home</label>
  <button className="btn btn-accent" type="submit">Add Vehicle</button>
 </form>{msg&&<p>{msg}</p>}</section>
 <section className="admin-panel"><h2>Inventory</h2><div className="table-wrap"><table><thead><tr><th>Vehicle</th><th>Type</th><th>Year</th><th>Price</th><th>Home</th><th>Status</th><th>Actions</th></tr></thead><tbody>{cars.map(c=><tr key={c.id}><td>{c.brand} {c.model} {c.variant}</td><td>{c.bodyType}</td><td>{c.year}</td><td>₹{c.price.toLocaleString('en-IN')}</td><td><button className={`admin-feature-toggle ${c.featured?'on':''}`} onClick={()=>featured(c.id,!c.featured)}>{c.featured?'★ Featured':'☆ Add to Home'}</button></td><td>{c.status}</td><td className="table-actions"><button onClick={()=>status(c.id,'AVAILABLE')}>Available</button><button onClick={()=>status(c.id,'RESERVED')}>Reserved</button><button onClick={()=>status(c.id,'SOLD')}>Sold</button><button onClick={()=>status(c.id,'HIDDEN')}>Hide</button></td></tr>)}</tbody></table></div></section>
 </>;
}
