"use client";
import { FormEvent, useState } from "react";
import type { LeadType } from "@/lib/types";

type Extra={name:string;label:string;type?:string;required?:boolean;placeholder?:string};
export function LeadForm({type,vehicleId,vehicleName,extras=[],button="SUBMIT ENQUIRY"}:{type:LeadType;vehicleId?:string;vehicleName?:string;extras?:Extra[];button?:string}){
 const [state,setState]=useState<"idle"|"sending"|"success"|"error">("idle");
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setState("sending");const form=new FormData(e.currentTarget);const data=Object.fromEntries(form.entries());
  const res=await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type,vehicleId,vehicleName,...data})});
  setState(res.ok?"success":"error"); if(res.ok)e.currentTarget.reset();
 }
 return <form className="lead-form" onSubmit={submit}><input className="hp-field" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"/><div className="form-grid"><label>Name<input name="name" required autoComplete="name" /></label><label>Mobile<input name="mobile" required inputMode="tel" autoComplete="tel" /></label><label>Email<input name="email" type="email" autoComplete="email" /></label>{extras.map(x=><label key={x.name}>{x.label}<input name={x.name} type={x.type||"text"} required={x.required} placeholder={x.placeholder}/></label>)}</div><label>Message<textarea name="message" rows={4} placeholder="Tell us what you need" /></label><button disabled={state==="sending"} className="btn btn-accent" type="submit">{state==="sending"?"Sending...":button}</button>{state==="success"&&<p className="success">Thank you. Your enquiry has been received.</p>}{state==="error"&&<p className="error">We could not process the enquiry. Please try again or use the direct contact options.</p>}</form>
}
