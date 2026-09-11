"use client";
import Image from "next/image";
import { useState } from "react";

export function VehicleGallery({ images, alt }: { images: string[]; alt: string }) {
  const list = images.length ? images : ["/vehicle-placeholder.svg"];
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const previous = () => setIndex(i => (i - 1 + list.length) % list.length);
  const next = () => setIndex(i => (i + 1) % list.length);
  let touchX = 0;
  return <>
    <div className="detail-image gallery-main" onClick={() => setOpen(true)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setOpen(true)} aria-label="Open full-screen vehicle gallery">
      <Image src={list[index]} alt={`${alt} image ${index + 1}`} fill priority sizes="(max-width:900px) 100vw, 60vw" />
      <button className="gallery-arrow left" onClick={e => { e.stopPropagation(); previous(); }} aria-label="Previous image">‹</button>
      <button className="gallery-arrow right" onClick={e => { e.stopPropagation(); next(); }} aria-label="Next image">›</button>
      <span className="gallery-count">{index + 1}/{list.length}</span>
    </div>
    <div className="thumb-row">{list.map((img, i) => <button className={`thumb ${i === index ? "active" : ""}`} key={img + i} onClick={() => setIndex(i)} aria-label={`Show image ${i + 1}`}><Image src={img} alt={`${alt} thumbnail ${i + 1}`} fill sizes="120px" /></button>)}</div>
    {open && <div className="gallery-modal" role="dialog" aria-modal="true" aria-label="Vehicle image viewer" onClick={() => setOpen(false)} onTouchStart={e => touchX = e.changedTouches[0].clientX} onTouchEnd={e => { const dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 45) dx > 0 ? previous() : next(); }}>
      <button className="gallery-close" onClick={() => setOpen(false)} aria-label="Close image viewer">×</button>
      <button className="gallery-arrow left" onClick={e => { e.stopPropagation(); previous(); }} aria-label="Previous image">‹</button>
      <div className="gallery-modal-image" onClick={e => e.stopPropagation()}><Image src={list[index]} alt={`${alt} full screen ${index + 1}`} fill sizes="100vw" /></div>
      <button className="gallery-arrow right" onClick={e => { e.stopPropagation(); next(); }} aria-label="Next image">›</button>
    </div>}
  </>;
}
