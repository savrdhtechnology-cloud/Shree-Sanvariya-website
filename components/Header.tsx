"use client";
import { useState } from "react";
import Logo from "./Logo";
import { company } from "@/lib/company";

export default function Header(){
  const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  return <>
    <div className="topbar"><div className="container topbarInner"><span>Professional Pharmaceutical Trading • Bhopal</span><div className="topbarLinks"><a href={`mailto:${company.email}`}>{company.email}</a><span>GST: {company.gst}</span></div></div></div>
    <header className="header"><div className="container navWrap"><Logo/><button className="menuButton" aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(!open)}><span/><span/><span/></button><nav className={open?"nav open":"nav"} aria-label="Primary navigation"><a href="/" onClick={close}>Home</a><a href="/about-us" onClick={close}>About Us</a><a href="/products" onClick={close}>Product Info</a><a href="/testimonials" onClick={close}>Testimonials</a><a href="/contact-us" onClick={close}>Contact Us</a><a className="navCta" href="/contact-us" onClick={close}>Contact Company</a></nav></div></header>
  </>;
}
