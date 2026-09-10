import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import styles from "./home-effects.module.css";
import { BuildingIcon, ChatIcon, GlobeIcon, ShieldIcon, TagIcon, TruckIcon, UsersIcon } from "@/components/Icons";

const trust = [
  { title: "Quality Focus", text: "Professional sourcing and responsible business practices.", icon: <ShieldIcon /> },
  { title: "Reliable Coordination", text: "Structured communication for business requirements.", icon: <TruckIcon /> },
  { title: "Competitive Business", text: "Commercial discussions handled through verified channels.", icon: <TagIcon /> },
  { title: "Responsive Support", text: "Clear and professional customer communication.", icon: <ChatIcon /> },
];

const categories = [
  { name: "Pharmaceutical Tablets", text: "Information about tablet-based pharmaceutical product categories.", code: "TAB" },
  { name: "Capsules", text: "Company catalogue information for capsule product categories.", code: "CAP" },
  { name: "Syrups", text: "General information on syrup-based pharmaceutical categories.", code: "SYR" },
  { name: "Multivitamins", text: "Informational category for multivitamin products handled by the business.", code: "VIT" },
  { name: "Healthcare Products", text: "General healthcare category information for business customers.", code: "HCP" },
  { name: "Business Catalogue", text: "Contact the company for current verified catalogue information.", code: "CAT" },
];

const values = [
  ["Genuine Business Information", "Company details presented without unsupported medical claims."],
  ["Professional Coordination", "Clear communication for institutional and trade discussions."],
  ["Customer-Focused Approach", "Business enquiries handled through responsible contact channels."],
  ["Pan-India Business Outlook", "Serving business relationships across India where legally permitted."],
  ["Clear Product Presentation", "Clean category-level information rather than confusing catalogue clutter."],
  ["Compliance-Aware Website", "No direct online sale or medicine checkout is provided on this site."],
];

export default function Home() {
  return (
    <main>
      <Header />
      <section className="hero" id="home">
        <div className="container heroGrid">
          <div className={`heroCopy ${styles.heroCopyEnter}`}>
            <span className="eyebrow">PHARMACEUTICAL TRADING • BHOPAL</span>
            <h1>Trusted Pharmaceutical <span>Trading Partner</span></h1>
            <p className="heroLead">Quality-focused business. Reliable coordination. Professional service.</p>
            <p className="heroText">Shree Sanvariya Seth Traders is a pharmaceutical trading company focused on professional business relationships, clear communication and responsible product information.</p>
            <div className="heroActions">
              <a className="btn btnPrimary" href="#categories">Explore Categories <span>→</span></a>
              <a className="btn btnSecondary" href="/contact-us">Business Enquiry</a>
            </div>
            <div className="heroStats">
              <div><BuildingIcon /><span><strong>Bhopal</strong><small>Madhya Pradesh</small></span></div>
              <div><GlobeIcon /><span><strong>India</strong><small>Business Coverage</small></span></div>
              <div><UsersIcon /><span><strong>B2B</strong><small>Professional Focus</small></span></div>
            </div>
          </div>
          <div className={`heroVisual ${styles.heroVisualEnter}`} aria-label="Abstract pharmaceutical visual">
            <div className={`heroOrb ${styles.orbMotion}`}>
              <div className={`capsule capsuleA ${styles.capsuleOne}`}><i /><b /></div>
              <div className={`capsule capsuleB ${styles.capsuleTwo}`}><i /><b /></div>
              <div className={`capsule capsuleC ${styles.capsuleThree}`}><i /><b /></div>
              <div className={`tablet tabletA ${styles.tabletMotion}`} />
              <div className={`tablet tabletB ${styles.tabletMotion}`} />
              <div className={`bottle ${styles.bottleMotion}`}><span /><em /></div>
            </div>
            <div className={`qualityCard ${styles.qualityMotion}`}>
              {trust.map((item) => <div className="qualityItem" key={item.title}><span className="iconBox">{item.icon}</span><span><strong>{item.title}</strong><small>{item.text.split(" ").slice(0,4).join(" ")}</small></span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.networkSection} aria-label="Business network highlights">
        <div className="container">
          <Reveal>
            <div className={styles.networkHead}>
              <span className={styles.networkEyebrow}>TRUSTED BUSINESS NETWORK</span>
              <h2 className={styles.networkTitle}>From <span>Bhopal</span> to Professional Business Relationships Across India</h2>
              <p className={styles.networkText}>A modern corporate presence centered on clear information, responsible communication and dependable B2B coordination.</p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className={styles.networkStage}>
              <div className={`${styles.orbit} ${styles.orbitOne}`}><span className={styles.orbitDot} /></div>
              <div className={`${styles.orbit} ${styles.orbitTwo}`}><span className={styles.orbitDot} /></div>
              <div className={styles.hub}>
                <span className={styles.hubMark}>+</span>
                <strong>SHREE SANVARIYA</strong>
                <small>B2B CORPORATE NETWORK</small>
              </div>
              <div className={`${styles.satellite} ${styles.satA}`}><strong>Bhopal Base</strong><small>Madhya Pradesh</small></div>
              <div className={`${styles.satellite} ${styles.satB}`}><strong>Pan-India Outlook</strong><small>Professional relationships</small></div>
              <div className={`${styles.satellite} ${styles.satC}`}><strong>Responsible Coordination</strong><small>Clear business communication</small></div>
            </div>
          </Reveal>

          <div className={styles.networkStrip}>
            <Reveal delay={0}><div className={styles.networkCard}><strong>Professional Identity</strong><small>Clean, credible digital presentation</small></div></Reveal>
            <Reveal delay={90}><div className={styles.networkCard}><strong>Business Coordination</strong><small>Structured communication and support</small></div></Reveal>
            <Reveal delay={180}><div className={styles.networkCard}><strong>Compliance-Aware</strong><small>Informational corporate website scope</small></div></Reveal>
          </div>
        </div>
      </section>

      <section className="trustStrip">
        <Reveal className={styles.trustReveal}>
          <div className="container trustGrid">
            {trust.map((item) => <article key={item.title} className="trustCard"><span className="trustIcon">{item.icon}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
          </div>
        </Reveal>
      </section>

      <section className="section" id="categories">
        <div className="container">
          <Reveal><div className="sectionHead"><div><span className="eyebrow">PRODUCT INFORMATION</span><h2>Explore Our <span>Product Categories</span></h2><p>Clean category-level information for professional visitors and business customers.</p></div></div></Reveal>
          <div className="categoryGrid">
            {categories.map((c, i) => <Reveal delay={i * 70} key={c.name}><article className="categoryCard">
              <div className={`categoryArt art${i + 1}`}><span>{c.code}</span><i /><b /></div>
              <div className="categoryBody"><h3>{c.name}</h3><p>{c.text}</p><a href="/products">View company information <span>→</span></a></div>
            </article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section sectionTint" id="about">
        <div className="container aboutGrid">
          <Reveal><div className="aboutVisual">
            <div className="aboutPanel"><span className="microLabel">SHREE SANVARIYA</span><h3>Professional pharmaceutical business presence.</h3><p>Modern presentation built around trust, clarity and responsible communication.</p></div>
            <div className="metricCard metricA"><strong>B2B</strong><small>Business Focus</small></div>
            <div className="metricCard metricB"><strong>MP</strong><small>Bhopal Base</small></div>
          </div></Reveal>
          <Reveal delay={110}><div className="aboutCopy">
            <span className="eyebrow">ABOUT THE COMPANY</span>
            <h2>Your Professional <span>Trading Partner</span></h2>
            <p>Shree Sanvariya Seth Traders is presented here as a professional pharmaceutical trading business based in Bhopal, Madhya Pradesh. This redesigned website focuses on company credibility, category-level product information and a clear corporate contact experience.</p>
            <p>The website intentionally avoids unsupported certifications, medical claims and direct medicine checkout. Business discussions are handled through verified company contact channels.</p>
            <div className="aboutPoints"><div><ShieldIcon />Responsible information</div><div><ChatIcon />Professional communication</div><div><GlobeIcon />Modern digital presence</div></div>
            <a className="textLink" href="/about-us">Learn more about us <span>→</span></a>
          </div></Reveal>
        </div>
      </section>

      <section className="section" id="why-us">
        <div className="container">
          <Reveal><div className="centerHead"><span className="eyebrow">WHY CHOOSE US</span><h2>Built Around <span>Trust & Professionalism</span></h2><p>A cleaner B2B experience with clear information and responsible communication.</p></div></Reveal>
          <div className="valuesGrid">
            {values.map(([title, text], index) => <Reveal delay={index * 65} key={title}><article className="valueCard"><span>{String(index + 1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="compliance" id="compliance">
        <div className="container complianceInner"><div><span className="eyebrow light">WEBSITE COMPLIANCE</span><h2>Corporate information only — no online medicine sale.</h2><p>This website does not provide an online checkout, direct medicine purchase, prescription fulfilment or controlled-drug ordering flow. Product information is presented at a general category level.</p></div><ShieldIcon /></div>
      </section>

      <section className="section contactSection" id="contact">
        <div className="container contactGrid">
          <Reveal><div className="contactCopy"><span className="eyebrow">CONTACT</span><h2>Start a <span>Business Conversation</span></h2><p>For company-profile, institutional, vendor or general business communication, use the verified contact channel below.</p><div className="contactInfo"><div><strong>Location</strong><span>Bhopal, Madhya Pradesh, India</span></div><div><strong>Email</strong><a href="mailto:info@shreesanvariya.co.in">info@shreesanvariya.co.in</a></div></div></div></Reveal>
          <Reveal delay={110}><div className="contactCard"><span className="contactBadge">GENERAL BUSINESS ENQUIRY</span><h3>Contact Shree Sanvariya Seth Traders</h3><p>Use email for corporate introductions, company information and permitted business correspondence.</p><a className="btn btnPrimary wide" href="mailto:info@shreesanvariya.co.in?subject=General%20Business%20Enquiry">Send an Email <span>→</span></a><small>No online medicine ordering is available through this website.</small></div></Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
