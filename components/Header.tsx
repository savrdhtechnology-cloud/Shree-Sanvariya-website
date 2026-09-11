"use client";
import { useState } from "react";
import Logo from "./Logo";
import { company } from "@/lib/company";

export default function Header(){
  const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  return <>
    <div className="topbar"><div className="container topbarInner"><span>Supplying Quality Medicines for a Healthier Tomorrow</span><div className="topbarLinks"><span>Bhopal, Madhya Pradesh</span><a href={`mailto:${company.email}`}>{company.email}</a></div></div></div>
    <header className="header"><div className="container navWrap"><Logo/><button className="menuButton" aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(!open)}><span/><span/><span/></button><nav className={open?"nav open":"nav"} aria-label="Primary navigation"><a href="/" onClick={close}>Home</a><a href="/about-us" onClick={close}>About Us</a><a href="/#categories" onClick={close}>Categories</a><a href="/#why-us" onClick={close}>Why Us</a><a href="/contact-us" onClick={close}>Contact</a><a className="navCta" href="/contact-us" onClick={close}>Business Enquiry</a></nav></div></header>
  </>;
}
