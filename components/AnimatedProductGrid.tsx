"use client";

import type React from "react";

type Item = { name: string; text: string };

const productVisuals = [
  "/products/tablets.svg",
  "/products/capsules.svg",
  "/products/syrup.svg",
  "/products/multivitamin.svg",
  "/products/ointment.svg",
  "/products/drops.svg",
];

export default function AnimatedProductGrid({items,showLink=false}:{items:Item[];showLink?:boolean}){
  return <div className="categoryGrid animatedProductGrid">
    {items.slice(0,6).map((item,i)=><article className="categoryCard productCategoryCard" key={item.name} style={{"--product-delay":`${i*.28}s`} as React.CSSProperties}>
      <div className={`categoryArt productArt art${i+1}`}>
        <img className="productVisual" src={productVisuals[i]} alt={`Illustrative ${item.name} packaging`} />
      </div>
      <div className="categoryBody">
        <h3>{item.name}</h3>
        <p>{item.text}</p>
        <span className="productMeta">ILLUSTRATIVE VISUAL</span>
        {showLink && <a href="/products">View product information <span>→</span></a>}
      </div>
    </article>)}
  </div>;
}
