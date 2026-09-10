"use client";

import { useEffect, useState } from "react";

type Item = { name: string; text: string };

declare global {
  interface Window { PICS?: string[] }
}

const visualScripts = [1,2,3,4,5,6].map((n)=>`/product-images/p${n}.js`);
const fallbackCodes = ["TAB","CAP","SYR","VIT","HCP","DRP"];

function loadScript(src:string){
  return new Promise<void>((resolve)=>{
    const existing = document.querySelector(`script[data-product-visual="${src}"]`) as HTMLScriptElement | null;
    if(existing){ resolve(); return; }
    const script=document.createElement("script");
    script.src=src;
    script.async=true;
    script.dataset.productVisual=src;
    script.onload=()=>resolve();
    script.onerror=()=>resolve();
    document.head.appendChild(script);
  });
}

export default function AnimatedProductGrid({items,showLink=false}:{items:Item[];showLink?:boolean}){
  const [pics,setPics]=useState<string[]>([]);
  useEffect(()=>{
    let active=true;
    Promise.all(visualScripts.map(loadScript)).then(()=>{
      if(active) setPics([...(window.PICS||[])]);
    });
    return()=>{active=false};
  },[]);

  return <div className="categoryGrid animatedProductGrid">
    {items.slice(0,6).map((item,i)=><article className="categoryCard productCategoryCard" key={item.name} style={{"--product-delay":`${i*.28}s`} as React.CSSProperties}>
      <div className={`categoryArt productArt art${i+1}`}>
        {pics[i]
          ? <img className="productPng" src={pics[i]} alt={`Illustrative ${item.name} packaging`} />
          : <span>{fallbackCodes[i]}</span>}
        <span className="productGlow" aria-hidden="true" />
      </div>
      <div className="categoryBody">
        <h3>{item.name}</h3>
        <p>{item.text}</p>
        {showLink && <a href="/products">View product information <span>→</span></a>}
      </div>
    </article>)}
  </div>;
}
