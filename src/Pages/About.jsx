import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/logo.png";

const reasons = [
  ["fa-fish", "Premium quality", "Healthy fish selected for thriving home aquariums."],
  ["fa-water", "Aquarium care", "Thoughtful guidance from set-up to daily care."],
  ["fa-truck", "Safe delivery", "Reliable, secure delivery for every order."],
  ["fa-headset", "Expert support", "Friendly advice whenever you need it."],
];

function About() {
  const [showCookies, setShowCookies] = useState(() => !Cookies.get("aquapet-cookie-consent"));
  const saveCookiePreference = (preference) => {
    Cookies.set("aquapet-cookie-consent", preference, { expires: 180, sameSite: "Lax" });
    setShowCookies(false);
  };

  return (
    <main>
      <section className="about-hero site-section">
        <div className="container">
          <div className="row g-5 align-items-stretch about-intro-row">
            <div className="col-lg-6 d-flex">
              <div className="about-copy w-100">
                <div className="about-brand"><img src={logo} alt="AquaPet Fish Shop logo" /><span>About AquaPet Fish Shop</span></div>
                <span className="section-kicker">About AquaPet</span>
                <h1 className="section-heading mt-2">For aquariums full of life.</h1>
                <p>We are passionate about making beautiful, healthy aquatic worlds more accessible. Every fish and essential in our collection is chosen with care by people who genuinely love the hobby.</p>
                <p>From a small first tank to a lush centrepiece aquarium, AquaPet is here to make the experience rewarding from day one.</p>
                <Link className="aqua-btn d-inline-block" to="/product">Explore the collection <i className="fas fa-arrow-right ms-1" /></Link>
              </div>
            </div>
            <div className="col-lg-6 d-flex"><img className="about-image" src="https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg" alt="Colourful freshwater fish in a blue aquarium" /></div>
          </div>
        </div>
      </section>
      <section className="about-reasons site-section">
        <div className="container">
          <div className="text-center mb-5"><span className="section-kicker">Why choose us</span><h2 className="section-heading mt-2">Care in every detail</h2></div>
          <div className="row g-4">{reasons.map(([icon, title, text]) => <div className="col-sm-6 col-lg-3" key={title}><article className="aqua-card reason-card"><i className={`fas ${icon}`} /><h3>{title}</h3><p>{text}</p></article></div>)}</div>
        </div>
      </section>
      {showCookies && <aside className="cookie-notice" aria-label="Cookie preferences"><div><strong>Cookies for a smoother visit</strong><p>We use a small preference cookie to remember your choice.</p></div><div className="cookie-actions"><button type="button" className="cookie-link" onClick={() => saveCookiePreference("essential")}>Essential only</button><button type="button" className="aqua-btn cookie-accept" onClick={() => saveCookiePreference("accepted")}>Accept cookies</button></div></aside>}
      <style>{`.about-hero{background:linear-gradient(180deg,#f7fbfc,#fff)}.about-hero h1{font-size:clamp(2.5rem,5vw,4rem);max-width:560px}.about-hero p{color:#688090;line-height:1.8;max-width:540px}.about-intro-row>.col-lg-6{height:420px}.about-copy{display:flex;height:100%;flex-direction:column;justify-content:center}.about-brand{display:flex;align-items:center;gap:.65rem;color:#16324f;font-weight:800;margin-bottom:1.25rem}.about-brand img{width:46px;height:46px;object-fit:contain;border-radius:50%;background:#e6f7f5;padding:3px}.about-image{width:100%;height:100%;object-fit:cover;border-radius:25px;box-shadow:0 22px 44px rgba(14,71,93,.15)}.about-reasons{background:#eef9f8}.reason-card{padding:1.8rem}.reason-card>i{color:#078783;font-size:1.5rem}.reason-card h3{font-size:1.1rem;font-weight:800;margin:1rem 0 .5rem}.reason-card p{color:#6e8493;margin:0;line-height:1.65}.cookie-notice{position:fixed;z-index:1050;bottom:1rem;left:50%;transform:translateX(-50%);width:min(680px,calc(100% - 2rem));display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.15rem;border:1px solid #bfe2e0;border-radius:16px;background:#fff;box-shadow:0 16px 38px rgba(14,71,93,.18)}.cookie-notice strong{color:#16324f}.cookie-notice p{margin:.2rem 0 0;color:#688090;font-size:.86rem}.cookie-actions{display:flex;align-items:center;gap:.75rem;flex-shrink:0}.cookie-link{border:0;background:transparent;color:#087d8b;font-weight:700;font-size:.85rem}.cookie-accept{padding:.6rem .85rem;font-size:.85rem}@media(max-width:991.98px){.about-intro-row>.col-lg-6{height:auto}.about-copy{min-height:0}.about-image{height:320px}}@media(max-width:575.98px){.cookie-notice{align-items:flex-start;flex-direction:column}.cookie-actions{width:100%;justify-content:flex-end}.about-image{height:300px}}`}</style>
    </main>
  );
}

export default About;
