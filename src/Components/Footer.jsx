import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const exploreLinks = [
  ["Shop fish", "/product"],
  ["Gallery", "/gallery"],
  ["About us", "/about"],
  ["Contact", "/contact"],
];

const customerLinks = [
  ["Your cart", "/cart"],
  ["Checkout", "/payment"],
  ["Admin login", "/adminlogin"],
  ["Add product", "/addproducts"],
];

function Footer() {
  return (
    <footer className="aquapet-footer">
      <div className="container py-5">
        <div className="row g-4 g-lg-5">
          <div className="col-lg-5">
            <Link to="/" className="footer-brand" aria-label="AquaPet Fish Shop home">
              <img src={logo} alt="AquaPet Fish Shop logo" />
              <span><strong>AquaPet</strong><small>Fish Shop</small></span>
            </Link>
            <p className="footer-description">Healthy, vibrant fish and reliable aquarium essentials for every tank, from your first aquarium to your favourite centrepiece.</p>
            <div className="footer-socials" aria-label="Social media">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="AquaPet on Facebook"><i className="fab fa-facebook-f" /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="AquaPet on Instagram"><i className="fab fa-instagram" /></a>
              <a href="https://wa.me/9123456788" target="_blank" rel="noreferrer" aria-label="Contact AquaPet on WhatsApp"><i className="fab fa-whatsapp" /></a>
            </div>
          </div>
          <div className="col-6 col-lg-2"><h2>Explore</h2><ul>{exploreLinks.map(([label, to]) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul></div>
          <div className="col-6 col-lg-2"><h2>Customer</h2><ul>{customerLinks.map(([label, to]) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul></div>
          <div className="col-lg-3"><h2>Reach us</h2><address><span><i className="fas fa-location-dot" /> Mumbai, Maharashtra</span><a href="mailto:hello@aquapet.shop"><i className="fas fa-envelope" /> hello@aquapet.shop</a><a href="tel:+9123456788"><i className="fas fa-phone" /> +91 23456 788</a></address></div>
        </div>
      </div>
      <div className="footer-bottom"><div className="container d-flex flex-column flex-sm-row justify-content-between gap-2"><span>© 2026 AquaPet Fish Shop. All rights reserved.</span><Link to="/about">Made for aquarium lovers <i className="fas fa-heart" /></Link></div></div>
    </footer>
  );
}

export default Footer;
