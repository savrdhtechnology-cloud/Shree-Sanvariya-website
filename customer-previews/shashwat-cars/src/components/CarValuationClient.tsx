"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./CarValuation.module.css";

type FormState = {
  brand: string; model: string; variant: string; regYear: string; originalPrice: string;
  km: string; ownership: string; fuel: string; transmission: string; condition: string;
};

type Result = {
  age: number; basePercent: number; kmAdj: number; conditionAdj: number; ownerAdj: number;
  estimate: number; low: number; high: number; depreciation: number; expectedKm: number;
  reportId: string;
};

const initial: FormState = { brand:"", model:"", variant:"", regYear:"", originalPrice:"", km:"", ownership:"1", fuel:"Petrol", transmission:"Manual", condition:"good" };
const money = (n:number) => new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(Math.max(0, Math.round(n)));

function baseRetention(age:number){
  const table=[.90,.84,.77,.70,.64,.58,.52,.47,.42,.38,.34];
  if(age<=10) return table[Math.max(0,age)];
  return Math.max(.18,.34-(age-10)*.025);
}
function kmAdjustment(age:number, km:number){
  const expected=Math.max(12000,Math.max(1,age)*12000); const r=km/expected;
  if(r<.65)return .04; if(r<.9)return .02; if(r<=1.2)return 0; if(r<=1.5)return -.04; if(r<=1.9)return -.08; return -.12;
}
function conditionAdjustment(v:string){ return v==="excellent"?.06:v==="average"?-.06:v==="needs-work"?-.14:0; }
function ownerAdjustment(v:string){ const n=Number(v); return n<=1?0:n===2?-.035:n===3?-.07:-.11; }

export function CarValuationClient(){
  const [form,setForm]=useState<FormState>(initial); const [result,setResult]=useState<Result|null>(null); const [error,setError]=useState("");
  const year=new Date().getFullYear();
  const label=useMemo(()=>[form.brand,form.model,form.variant].filter(Boolean).join(" ")||"Your Vehicle",[form.brand,form.model,form.variant]);
  const update=(key:keyof FormState,value:string)=>setForm(s=>({...s,[key]:value}));
  function calculate(e:FormEvent){
    e.preventDefault(); setError("");
    const reg=Number(form.regYear), price=Number(form.originalPrice), km=Number(form.km);
    if(!form.brand.trim()||!form.model.trim()||!reg||!price||km<0){ setError("Please enter brand, model, registration year, original price and kilometres."); return; }
    if(reg<1995||reg>year||price<50000){ setError("Please check the registration year and original price."); return; }
    const age=Math.max(0,year-reg), base=baseRetention(age), kAdj=kmAdjustment(age,km), cAdj=conditionAdjustment(form.condition), oAdj=ownerAdjustment(form.ownership);
    const total=Math.max(.12,Math.min(.94,base+kAdj+cAdj+oAdj));
    const estimate=price*total; const spread=form.condition==="excellent"?.06:form.condition==="needs-work"?.11:.08;
    setResult({age,basePercent:base,kmAdj:kAdj,conditionAdj:cAdj,ownerAdj:oAdj,estimate,low:estimate*(1-spread),high:estimate*(1+spread),depreciation:price-estimate,expectedKm:Math.max(12000,Math.max(1,age)*12000),reportId:`SCV-${Date.now().toString().slice(-8)}`});
    setTimeout(()=>document.getElementById("valuation-report")?.scrollIntoView({behavior:"smooth",block:"start"}),50);
  }
  return <div className={styles.shell}>
    <section className={styles.hero}>
      <div className={styles.glow}/><div className="container">
        <p className={styles.kicker}>SHASHWAT CARS • SMART VALUATION</p>
        <h1>Know your car&apos;s <span>approximate value.</span></h1>
        <p>Get an instant indicative resale-value range based on age, kilometres, ownership and vehicle condition. No personal data is required for this preview.</p>
      </div>
    </section>

    <section className={`container ${styles.workspace}`}>
      <form className={styles.formCard} onSubmit={calculate}>
        <div className={styles.cardHead}><div><small>STEP 01</small><h2>Vehicle details</h2></div><span>Indicative Analysis</span></div>
        <div className={styles.grid}>
          <label>Brand<input value={form.brand} onChange={e=>update("brand",e.target.value)} placeholder="Hyundai" /></label>
          <label>Model<input value={form.model} onChange={e=>update("model",e.target.value)} placeholder="Creta" /></label>
          <label>Variant<input value={form.variant} onChange={e=>update("variant",e.target.value)} placeholder="SX(O)" /></label>
          <label>Registration Year<input type="number" min="1995" max={year} value={form.regYear} onChange={e=>update("regYear",e.target.value)} placeholder="2022" /></label>
          <label>Original / New-Car Price (₹)<input type="number" min="50000" step="1000" value={form.originalPrice} onChange={e=>update("originalPrice",e.target.value)} placeholder="1500000" /></label>
          <label>KM Driven<input type="number" min="0" step="100" value={form.km} onChange={e=>update("km",e.target.value)} placeholder="42000" /></label>
          <label>Ownership<select value={form.ownership} onChange={e=>update("ownership",e.target.value)}><option value="1">1st Owner</option><option value="2">2nd Owner</option><option value="3">3rd Owner</option><option value="4">4th+ Owner</option></select></label>
          <label>Condition<select value={form.condition} onChange={e=>update("condition",e.target.value)}><option value="excellent">Excellent</option><option value="good">Good</option><option value="average">Average</option><option value="needs-work">Needs Work</option></select></label>
          <label>Fuel<select value={form.fuel} onChange={e=>update("fuel",e.target.value)}><option>Petrol</option><option>Diesel</option><option>CNG</option><option>Electric</option><option>Hybrid</option></select></label>
          <label>Transmission<select value={form.transmission} onChange={e=>update("transmission",e.target.value)}><option>Manual</option><option>Automatic</option></select></label>
        </div>
        <div className={styles.methodNote}>Preview methodology uses a transparent depreciation heuristic; it does not query live marketplace listings. Final dealership value can change after physical inspection, documents, service history, insurance/accident history, tyre condition and local demand.</div>
        {error&&<p className={styles.error}>{error}</p>}
        <button className="btn btn-accent" type="submit">Analyze Approx. Value →</button>
      </form>

      <aside className={styles.sideCard}>
        <span className={styles.goldLine}/><p>WHAT WE ANALYZE</p><h3>Fast, explainable valuation.</h3>
        <div className={styles.factor}><b>01</b><div><strong>Vehicle Age</strong><small>Year-wise depreciation curve</small></div></div>
        <div className={styles.factor}><b>02</b><div><strong>Kilometres</strong><small>Compared with ~12,000 km/year benchmark</small></div></div>
        <div className={styles.factor}><b>03</b><div><strong>Ownership</strong><small>Owner-count adjustment</small></div></div>
        <div className={styles.factor}><b>04</b><div><strong>Condition</strong><small>Excellent / good / average / needs work</small></div></div>
      </aside>
    </section>

    {result&&<section id="valuation-report" className={styles.reportWrap}>
      <div className={`container ${styles.report}`}>
        <div className={styles.reportTop}><div><p>SHASHWAT CARS</p><h2>Indicative Vehicle Valuation Report</h2><small>Report ID: {result.reportId} • Generated {new Date().toLocaleDateString("en-IN")}</small></div><div className={styles.watermark}>APPROXIMATE</div></div>
        <div className={styles.vehicleTitle}><div><small>VEHICLE</small><h3>{label}</h3><p>{form.regYear} • {form.fuel} • {form.transmission} • {Number(form.km).toLocaleString("en-IN")} KM • {form.ownership}{form.ownership==="1"?"st":form.ownership==="2"?"nd":form.ownership==="3"?"rd":"th"} Owner</p></div></div>
        <div className={styles.valuePanel}><div><small>ESTIMATED FAIR VALUE</small><strong>{money(result.estimate)}</strong><p>Indicative range <b>{money(result.low)} – {money(result.high)}</b></p></div><div className={styles.gauge}><span style={{width:`${Math.min(100,Math.max(18,(result.estimate/Number(form.originalPrice))*100))}%`}}/></div></div>
        <div className={styles.metrics}>
          <div><small>Vehicle Age</small><b>{result.age} year{result.age===1?"":"s"}</b></div>
          <div><small>Base Retention</small><b>{Math.round(result.basePercent*100)}%</b></div>
          <div><small>Estimated Depreciation</small><b>{money(result.depreciation)}</b></div>
          <div><small>Expected KM Benchmark</small><b>{result.expectedKm.toLocaleString("en-IN")} KM</b></div>
        </div>
        <div className={styles.analysisGrid}>
          <div><h4>Adjustment Analysis</h4><table><tbody>
            <tr><td>Age-based base value</td><td>{Math.round(result.basePercent*100)}%</td></tr>
            <tr><td>Kilometre adjustment</td><td>{result.kmAdj>=0?"+":""}{Math.round(result.kmAdj*100)}%</td></tr>
            <tr><td>Condition adjustment</td><td>{result.conditionAdj>=0?"+":""}{Math.round(result.conditionAdj*100)}%</td></tr>
            <tr><td>Ownership adjustment</td><td>{result.ownerAdj>=0?"+":""}{Math.round(result.ownerAdj*100)}%</td></tr>
          </tbody></table></div>
          <div><h4>What can change final value?</h4><ul><li>Physical body / paint and mechanical inspection</li><li>Accident, insurance and service-history verification</li><li>Tyres, battery, interiors and upcoming maintenance</li><li>Exact variant, options, registration city and local demand</li><li>Live comparable listings and actual transaction prices</li></ul></div>
        </div>
        <div className={styles.disclaimer}><b>Important:</b> This is an automated indicative estimate for preliminary discussion only. It is not a certified valuation, purchase offer, loan value or guaranteed sale price. Final value must be confirmed after dealership inspection and document verification.</div>
        <div className={`${styles.actions} no-print`}><button className="btn btn-accent" onClick={()=>window.print()}>Print / Save Report as PDF</button><button className="btn btn-outline" onClick={()=>{setResult(null);window.scrollTo({top:0,behavior:"smooth"})}}>New Valuation</button></div>
      </div>
    </section>}
  </div>
}
