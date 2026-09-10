"use client";

import { useState } from "react";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="topbar">
        <div className="container topbarInner">
          <span>Supplying Quality Medicines for a Healthier Tomorrow</span>
          <div className="topbarLinks">
            <a href="mailto:info@shreesanvariya.co.in">info@shreesanvariya.co.in</a>
            <span>Bhopal, Madhya Pradesh</span>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container navWrap">
          <Logo />
          <button className="menuButton" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
          <nav className={open ? "nav open" : "nav"} aria-label="Primary navigation">
            <a href="#home" onClick={() => setOpen(false)}>Home</a>
            <a href="#about" onClick={() => setOpen(false)}>About Us</a>
            <a href="#categories" onClick={() => setOpen(false)}>Categories</a>
            <a href="#why-us" onClick={() => setOpen(false)}>Why Us</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
            <a className="navCta" href="#contact" onClick={() => setOpen(false)}>Business Enquiry</a>
          </nav>
        </div>
      </header>
    </>
  );
}
