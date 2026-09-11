"use client";
import { useMemo, useState } from "react";
import type { Lead, LeadStatus } from "@/lib/types";
const statuses:LeadStatus[]=["NEW","CONTACTED","FOLLOW_UP","SITE_VISIT","INSPECTION_SCHEDULED","VALUATION_GIVEN","NEGOTIATION","CONVERTED","PURCHASED","REJECTED","LOST"];

export function AdminLeads({ initial }: { initial: Lead[] }) {
  const [leads, setLeads] = useState(initial);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => leads.filter(l => [l.name,l.mobile,l.email,l.vehicleName,l.type,l.status,l.city,l.id].filter(Boolean).join(" ").toLowerCase().includes(query.toLowerCase())), [leads,query]);
  async function patch(id:string, update:Partial<Lead>){const r=await fetch(`/api/admin/leads/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(update)});if(r.ok)setLeads(leads.map(l=>l.id===id?{...l,...update}:l));}
  return <section className="admin-panel"><div className="crm-toolbar"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search customer, mobile, vehicle, lead ID or status"/><strong>{filtered.length} leads</strong></div><div className="table-wrap"><table><thead><tr><th>Customer</th><th>Type</th><th>Vehicle / City</th><th>Status</th><th>Follow-up</th><th>Assigned Staff</th><th>Message</th></tr></thead><tbody>{filtered.map(l=><tr key={l.id}><td>{l.name}<br/><small>{l.mobile}</small><br/><small>{l.email}</small></td><td>{l.type}</td><td>{l.vehicleName||l.city||"—"}</td><td><select value={l.status} onChange={e=>patch(l.id,{status:e.target.value as LeadStatus})}>{statuses.map(s=><option key={s}>{s}</option>)}</select></td><td><input type="datetime-local" value={l.nextFollowUp?.slice(0,16)||""} onChange={e=>patch(l.id,{nextFollowUp:e.target.value})}/></td><td><input value={l.assignedStaff||""} onBlur={e=>patch(l.id,{assignedStaff:e.target.value})} onChange={e=>setLeads(leads.map(x=>x.id===l.id?{...x,assignedStaff:e.target.value}:x))} placeholder="Staff name"/></td><td><input value={l.message||""} onBlur={e=>patch(l.id,{message:e.target.value})} onChange={e=>setLeads(leads.map(x=>x.id===l.id?{...x,message:e.target.value}:x))}/></td></tr>)}</tbody></table></div>{!filtered.length&&<p>No matching CRM leads.</p>}</section>;
}
