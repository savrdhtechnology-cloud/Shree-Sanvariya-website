"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
];

const categories = [
  ["Restaurants", "Curated dining, neighborhood favorites and special kitchens.", "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=82"],
  ["Home Chefs", "Small-batch food made with personality, skill and care.", "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=82"],
  ["Cloud Kitchens", "Focused menus designed for fast, dependable ordering.", "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=82"],
  ["Food Products", "Premium pantry essentials, snacks and packaged foods.", "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=900&q=82"],
  ["Desserts", "Sweet finishes, baked favorites and celebratory treats.", "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=82"],
  ["Beverages", "Refreshing drinks, café pours and all-day favorites.", "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=82"],
] as const;

const foods = [
  { name: "Butter Chicken", description: "Creamy tomato gravy, fragrant spices and tender chicken.", price: 329, rating: "4.8", veg: false, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=84" },
  { name: "Paneer Tikka", description: "Charred paneer, peppers and a bright tandoori marinade.", price: 279, rating: "4.7", veg: true, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=84" },
  { name: "Biryani", description: "Long-grain rice layered with herbs, aromatics and slow-cooked flavor.", price: 299, rating: "4.9", veg: false, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=84" },
  { name: "Masala Dosa", description: "Crisp dosa with spiced potato filling and classic accompaniments.", price: 189, rating: "4.7", veg: true, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=84" },
  { name: "Samosa", description: "Flaky pastry packed with a warm, savory potato filling.", price: 79, rating: "4.6", veg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=84" },
  { name: "Gulab Jamun", description: "Soft milk-solid dumplings soaked in aromatic sugar syrup.", price: 119, rating: "4.8", veg: true, image: "https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=800&q=84" },
] as const;

const restaurants = [
  { name: "The Copper Table", cuisine: "North Indian • Contemporary", location: "Central Bhopal", rating: "4.8", tag: "North Indian", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=84" },
  { name: "South Story Kitchen", cuisine: "South Indian • Breakfast", location: "Arera Colony", rating: "4.7", tag: "South Indian", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=84" },
  { name: "Bamboo Bowl", cuisine: "Chinese • Asian", location: "MP Nagar", rating: "4.6", tag: "Chinese", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=84" },
  { name: "Daily Ritual Café", cuisine: "Cafe • Bakery", location: "Shahpura", rating: "4.8", tag: "Cafe", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=84" },
  { name: "Crumb & Cocoa", cuisine: "Bakery • Desserts", location: "Bawadiya Kalan", rating: "4.7", tag: "Bakery", image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=84" },
  { name: "Mithai Atelier", cuisine: "Desserts • Indian Sweets", location: "New Market", rating: "4.9", tag: "Desserts", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=84" },
] as const;

const products = [
  ["Premium Cashews", "Roasted & whole", "₹499", "https://images.unsplash.com/photo-1600189020840-e9918c25269d?auto=format&fit=crop&w=800&q=82"],
  ["Premium Almonds", "Crunchy everyday premium", "₹449", "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=82"],
  ["Signature Spices", "Small-batch spice blends", "₹199", "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=82"],
  ["Savory Snacks", "Modern Indian snacking", "₹149", "https://images.unsplash.com/photo-1621939514649-280e2aa9454f?auto=format&fit=crop&w=800&q=82"],
  ["Pantry Collection", "Everyday packaged foods", "₹249", "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=82"],
] as const;

const nav = [["Home", "#home"], ["Menu", "#featured"], ["Restaurants", "#restaurants"], ["Food Products", "#products"], ["Marketplace", "#marketplace"], ["About", "#story"]] as const;
const restaurantFilters = ["All", "Indian", "North Indian", "South Indian", "Chinese", "Cafe", "Bakery", "Desserts"];

export default function AllinoHome() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => scrollY.on("change", (value) => setScrolled(value > 28)), [scrollY]);

  const filteredRestaurants = useMemo(() => {
    if (filter === "All" || filter === "Indian") return restaurants;
    return restaurants.filter((item) => item.tag === filter || item.cuisine.includes(filter));
  }, [filter]);

  const searchItems = useMemo(() => {
    const items = [
      ...foods.map((x) => ({ name: x.name, type: "Food", href: "#featured" })),
      ...restaurants.map((x) => ({ name: x.name, type: "Restaurant", href: "#restaurants" })),
      ...products.map((x) => ({ name: x[0], type: "Product", href: "#products" })),
      ...categories.map((x) => ({ name: x[0], type: "Category", href: "#categories" })),
    ];
    if (!query.trim()) return items.slice(0, 8);
    return items.filter((x) => x.name.toLowerCase().includes(query.toLowerCase())).slice(0, 10);
  }, [query]);

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.16 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };

  return (
    <main className="allinoSite">
      <motion.header className={"allinoNav " + (scrolled ? "isScrolled" : "")}>
        <a className="skipLink" href="#featured">Skip to food</a>
        <div className="allinoNavInner">
          <a className="allinoBrand" href="#home" aria-label="Allino home"><span>ALLINO</span><small>FOODS & RESTAURANTS</small></a>
          <nav className="desktopNav" aria-label="Primary navigation">{nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
          <div className="navActions">
            <button onClick={() => setSearchOpen(true)} aria-label="Search">⌕<span className="actionLabel">Search</span></button>
            <button onClick={() => setCartOpen(true)} aria-label={"Cart with " + cart.length + " items"}>◌<span className="actionLabel">Cart</span>{cart.length > 0 && <b>{cart.length}</b>}</button>
            <button className="accountButton" onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })}>Account</button>
            <button className="mobileMenuButton" onClick={() => setMobileOpen((v) => !v)} aria-expanded={mobileOpen} aria-label="Toggle menu"><i /><i /></button>
          </div>
        </div>
        {mobileOpen && <motion.nav className="mobileNav" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>{nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)}>{label}<span>↗</span></a>)}</motion.nav>}
      </motion.header>

      <section className="allinoHero" id="home">
        <motion.div className="heroBackdrop" initial={reduceMotion ? false : { scale: 1.04 }} animate={{ scale: reduceMotion ? 1 : 1.11 }} transition={{ duration: 16, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
          <img src={heroImages[0]} alt="A cinematic table spread of freshly prepared food" fetchPriority="high" />
        </motion.div>
        <div className="heroShade" />
        <div className="heroContent">
          <motion.span className="heroKicker" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}>ONE DESTINATION FOR GREAT FOOD.</motion.span>
          <div className="heroHeadline" aria-label="Good Food. Good Mood. Allino.">
            {["GOOD FOOD.", "GOOD MOOD.", "ALLINO."].map((line, index) => (
              <motion.span key={line} initial={reduceMotion ? false : { opacity: 0, y: 58 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 + index * .13, duration: .72, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span>
            ))}
          </div>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .72 }}>Discover delicious food, trusted restaurants, home chefs and premium food products — all in one place.</motion.p>
          <motion.div className="heroCtas" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .84 }}>
            <a className="primaryCta" href="#featured">Explore Food <span>↗</span></a>
            <a className="ghostCta" href="#restaurants">Discover Restaurants <span>→</span></a>
          </motion.div>
        </div>
        <motion.div className="heroFloating heroFloatingA" animate={reduceMotion ? {} : { y: [0, -9, 0] }} transition={{ duration: 5, repeat: Infinity }}><small>DISCOVER</small><strong>Local food, elevated</strong></motion.div>
        <motion.div className="heroFloating heroFloatingB" animate={reduceMotion ? {} : { y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }}><span>Fresh</span><small>Curated experiences</small></motion.div>
        <div className="heroScroll">SCROLL <span>↓</span></div>
      </section>

      <section className="allinoSection cravingSection" id="categories">
        <motion.div className="sectionIntro" {...reveal}><span className="sectionEyebrow">EXPLORE THE ALLINO WORLD</span><h2>WHAT ARE YOU <em>CRAVING?</em></h2><p>From restaurant tables to home kitchens and premium pantry goods, discover food in the way that suits your day.</p></motion.div>
        <div className="categoryRail">
          {categories.map(([title, text, image], index) => <motion.a href={index === 3 ? "#products" : index === 0 ? "#restaurants" : "#featured"} className="categoryCardNew" key={title} {...reveal} transition={{ ...reveal.transition, delay: index * .04 }}>
            <img src={image} alt={title + " food category"} loading="lazy" />
            <div className="categoryOverlay" /><div className="categoryCopy"><small>0{index + 1}</small><h3>{title}</h3><p>{text}</p><span className="roundArrow">↗</span></div>
          </motion.a>)}
        </div>
      </section>

      <section className="allinoSection featuredSection" id="featured">
        <motion.div className="sectionIntro splitIntro" {...reveal}><div><span className="sectionEyebrow">POPULAR RIGHT NOW</span><h2>MADE TO BE <em>CRAVED.</em></h2></div><p>Illustrative menu items for the new Allino marketplace experience. Real availability can be connected to live seller data later.</p></motion.div>
        <div className="foodGrid">
          {foods.map((item, index) => <motion.article className="foodCardNew" key={item.name} {...reveal} transition={{ ...reveal.transition, delay: index * .05 }}>
            <div className="foodImageWrap"><img src={item.image} alt={item.name} loading="lazy" /><span className={"dietDot " + (item.veg ? "veg" : "nonVeg")} aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}><i /></span></div>
            <div className="foodMeta"><div><h3>{item.name}</h3><p>{item.description}</p></div><div className="foodPrice"><strong>₹{item.price}</strong><span>★ {item.rating}</span></div><button onClick={() => setCart((items) => [...items, item.name])}>Add to Cart <span>+</span></button></div>
          </motion.article>)}
        </div>
      </section>

      <section className="restaurantSection" id="restaurants">
        <div className="allinoSection">
          <motion.div className="sectionIntro restaurantIntro" {...reveal}><span className="sectionEyebrow">FIND YOUR TABLE</span><h2>DISCOVER YOUR NEXT <em>FAVORITE.</em></h2><p>Browse illustrative restaurant profiles by cuisine. Ratings and locations shown here are prototype content, not business claims.</p></motion.div>
          <div className="filterRow" role="tablist" aria-label="Restaurant filters">{restaurantFilters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
          <motion.div layout className="restaurantGrid">{filteredRestaurants.map((item) => <motion.article layout className="restaurantCardNew" key={item.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><img src={item.image} alt={"Dining atmosphere for " + item.name} loading="lazy" /><div className="restaurantBody"><div className="restaurantTop"><div><small>{item.cuisine}</small><h3>{item.name}</h3></div><span>★ {item.rating}</span></div><div className="restaurantBottom"><span>{item.location}</span><a href="#featured">View food <b>↗</b></a></div></div></motion.article>)}</motion.div>
        </div>
      </section>

      <section className="allinoSection productSection" id="products">
        <motion.div className="sectionIntro splitIntro" {...reveal}><div><span className="sectionEyebrow">ALLINO FOOD PRODUCTS</span><h2>FROM OUR KITCHEN<br />TO YOUR <em>HOME.</em></h2></div><p>Premium pantry products designed to sit naturally beside restaurant and marketplace discovery.</p></motion.div>
        <div className="productRail">{products.map(([name, description, price, image], index) => <motion.article className="productCardNew" key={name} {...reveal}><div className="productImage"><span>ALLINO</span><img src={image} alt={name} loading="lazy" /></div><div className="productBody"><small>ALLINO SIGNATURE • 0{index + 1}</small><h3>{name}</h3><p>{description}</p><div><strong>{price}</strong><button onClick={() => setCart((items) => [...items, name])}>Shop Now ↗</button></div></div></motion.article>)}</div>
      </section>

      <section className="homeChefSection">
        <div className="homeChefVisual"><img src="https://images.unsplash.com/photo-1556911073-38141963c9e0?auto=format&fit=crop&w=1400&q=85" alt="A home chef preparing fresh food in a warm kitchen" loading="lazy" /></div>
        <motion.div className="homeChefCopy" {...reveal}><span className="sectionEyebrow">THE HUMAN SIDE OF FOOD</span><h2>LOCAL FLAVORS.<br /><em>REAL PEOPLE.</em></h2><p>Discover food prepared by passionate home chefs and independent kitchens — and give local talent a premium place to be found.</p><div><a className="primaryCta dark" href="#featured">Explore Home Chefs ↗</a><a className="textCta" href="#footer">Become an Allino Partner <span>→</span></a></div></motion.div>
      </section>

      <section className="marketplaceSection" id="marketplace">
        <div className="allinoSection">
          <motion.div className="sectionIntro marketIntro" {...reveal}><span className="sectionEyebrow">A CONNECTED FOOD ECOSYSTEM</span><h2>THE FUTURE OF FOOD<br />IS <em>LOCAL.</em></h2><p>Allino is designed to bring multiple food experiences into one clear destination, while keeping the identity of each restaurant, chef and brand visible.</p></motion.div>
          <motion.div className="ecosystem" {...reveal}>
            <div className="ecoCustomer">Customers</div><span className="ecoFlow">↓</span><div className="ecoAllino"><small>ONE DESTINATION</small><strong>ALLINO</strong><span>FOOD MARKETPLACE</span></div><span className="ecoFlow">↓</span>
            <div className="ecoSellers">{["Restaurants", "Home Chefs", "Cloud Kitchens", "Food Brands"].map((x, i) => <motion.div key={x} animate={reduceMotion ? {} : { y: [0, i % 2 ? 5 : -5, 0] }} transition={{ duration: 4 + i, repeat: Infinity }}><span>0{i + 1}</span>{x}</motion.div>)}</div>
          </motion.div>
        </div>
      </section>

      <section className="allinoSection whySection">
        <motion.div className="sectionIntro" {...reveal}><span className="sectionEyebrow">WHY ALLINO</span><h2>FOOD, WITHOUT THE <em>NOISE.</em></h2></motion.div>
        <div className="whyGrid">{[["✦","Fresh & Delicious","Designed around food that looks good, feels fresh and is easy to discover."],["✓","Trusted Sellers","A marketplace structure built for clear seller identity and responsible onboarding."],["↗","Easy Ordering","Simple product discovery and direct, focused actions without visual clutter."],["◎","One Food Marketplace","Restaurants, chefs, kitchens and food products in one premium experience."]].map(([icon,title,text],i)=><motion.article key={title} {...reveal} transition={{...reveal.transition,delay:i*.06}}><span>{icon}</span><h3>{title}</h3><p>{text}</p></motion.article>)}</div>
      </section>

      <section className="foodStory" id="story">
        <div className="storyImage"><img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=88" alt="Elegant restaurant food experience" loading="lazy" /></div><div className="storyShade" />
        <motion.div className="storyCopy" {...reveal}><span>ALLINO / FOOD STORIES</span><h2>FOOD IS MORE<br />THAN A <em>MEAL.</em></h2><p>It is craft, culture, comfort and connection. Allino is being built as a stage for all of it.</p></motion.div>
      </section>

      <section className="finalCta">
        <motion.div {...reveal}><span className="sectionEyebrow">READY WHEN YOU ARE</span><h2>WHAT'S ON YOUR<br /><em>PLATE TODAY?</em></h2><p>Explore something delicious with Allino.</p><div><a className="primaryCta dark" href="#featured">Explore Food ↗</a><a className="ghostDark" href="#footer">Join Allino →</a></div></motion.div>
      </section>

      <footer className="allinoFooter" id="footer">
        <div className="footerLead"><a className="allinoBrand footerBrand" href="#home"><span>ALLINO</span><small>FOODS & RESTAURANTS</small></a><h2>ONE DESTINATION<br />FOR GREAT FOOD.</h2><form onSubmit={(e) => e.preventDefault()}><label htmlFor="newsletter">Get Allino updates</label><div><input id="newsletter" type="email" required placeholder="Email address" /><button type="submit" aria-label="Subscribe">→</button></div></form></div>
        <div className="footerLinks"><div><h3>Food</h3>{["Restaurants","Home Chefs","Cloud Kitchens","Food Products","Marketplace"].map(x=><a key={x} href={x==="Food Products"?"#products":x==="Restaurants"?"#restaurants":"#featured"}>{x}</a>)}</div><div><h3>Company</h3><a href="#story">About</a><a href="mailto:hello@allinofoods.com">Contact</a><span>Careers — future</span></div><div><h3>Support</h3><span>Help Center — future</span><span>Terms — future</span><span>Privacy — future</span><span>Refund Policy — future</span></div><div><h3>Social</h3><span>Instagram — future</span><span>Facebook — future</span><span>YouTube — future</span></div></div>
        <div className="footerBottomNew"><span>© 2026 ALLINO FOODS & RESTAURANTS</span><span>Premium food marketplace concept • India</span></div>
      </footer>

      {searchOpen && <div className="modalLayer" role="dialog" aria-modal="true" aria-label="Search Allino" onMouseDown={(e) => e.currentTarget === e.target && setSearchOpen(false)}><motion.div className="searchModal" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><div className="modalHead"><strong>Search Allino</strong><button onClick={() => setSearchOpen(false)}>Close</button></div><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search food, restaurants, products..." /><div className="searchResults">{searchItems.map(item=><a key={item.type+item.name} href={item.href} onClick={()=>setSearchOpen(false)}><span>{item.name}</span><small>{item.type} ↗</small></a>)}{searchItems.length===0&&<p>No matching items in this preview.</p>}</div></motion.div></div>}
      {cartOpen && <div className="modalLayer cartLayer" role="dialog" aria-modal="true" aria-label="Cart" onMouseDown={(e) => e.currentTarget === e.target && setCartOpen(false)}><motion.aside className="cartDrawer" initial={{ x: "100%" }} animate={{ x: 0 }}><div className="modalHead"><strong>Your Cart ({cart.length})</strong><button onClick={() => setCartOpen(false)}>Close</button></div>{cart.length===0?<div className="emptyCart"><span>◌</span><h3>Your cart is empty</h3><p>Add something delicious from the menu or Allino products.</p><button onClick={()=>setCartOpen(false)}>Explore Food</button></div>:<><div className="cartItems">{cart.map((item,index)=><div key={item+index}><span>{item}</span><button onClick={()=>setCart(items=>items.filter((_,i)=>i!==index))}>Remove</button></div>)}</div><div className="cartNote">Checkout is intentionally not connected because this repository does not currently contain a payment or ordering backend.</div></>}</motion.aside></div>}
    </main>
  );
}
