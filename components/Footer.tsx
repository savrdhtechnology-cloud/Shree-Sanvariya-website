import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footerGrid">
        <div className="footerBrand">
          <Logo />
          <p>Professional pharmaceutical trading company based in Bhopal, Madhya Pradesh.</p>
        </div>
        <div><h3>Company</h3><a href="#about">About Us</a><a href="#why-us">Why Choose Us</a><a href="#contact">Contact</a></div>
        <div><h3>Information</h3><a href="#categories">Product Categories</a><a href="#compliance">Website Compliance</a><a href="#contact">Business Enquiry</a></div>
        <div><h3>Contact</h3><p>Bhopal, Madhya Pradesh, India</p><a href="mailto:info@shreesanvariya.co.in">info@shreesanvariya.co.in</a></div>
      </div>
      <div className="container footerBottom">
        <span>© 2026 Shree Sanvariya Seth Traders. All Rights Reserved.</span>
        <span>Corporate informational website</span>
      </div>
    </footer>
  );
}
