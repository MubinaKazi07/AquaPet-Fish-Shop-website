import React from "react";
import { Link } from "react-router-dom";

const highlights = [
  ["180+", "Fish species available", "fa-fish"],
  ["12K+", "Happy aquarium keepers", "fa-heart"],
  ["18+", "Years of experience", "fa-award"],
  ["24/7", "Friendly fish care support", "fa-headset"],
];

function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="container home-hero-content">
          <span className="hero-kicker">AquaPet · since 2007</span>
          <h1>Bring a little <span>ocean magic</span> home.</h1>
          <p>Healthy, vibrant fish and everything you need to build an aquarium you & all love looking after.</p>
          <div className="d-flex flex-wrap gap-3"><Link to="/product" className="aqua-btn">Shop the collection <i className="fas fa-arrow-right ms-1" /></Link><Link to="/about" className="hero-secondary">Discover AquaPet</Link></div>
        </div>
      </section>

      <section className="container home-stats"><div className="row g-3">{highlights.map(([number, text, icon]) => <div className="col-6 col-lg-3" key={text}><div className="stat-card"><i className={`fas ${icon}`} /><strong>{number}</strong><span>{text}</span></div></div>)}</div></section>

      <section className="site-section"><div className="container"><div className="row g-4 align-items-center"><div className="col-lg-6"><div className="expert-copy"><span className="section-kicker">Guidance that grows with you</span><h2 className="section-heading mt-2">Your dream aquarium starts with the right care.</h2><p>Whether you&apos;re choosing your very first fish or curating a thriving tank, our collection is selected with health, beauty, and easy care in mind.</p><Link to="/contact" className="aqua-btn d-inline-block">Talk to an expert <i className="fas fa-arrow-right ms-1" /></Link></div></div><div className="col-lg-6"><img className="expert-image" src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80" alt="Colourful fish swimming in an aquarium" /></div></div></div></section>

      <section className="site-section home-value-section"><div className="container"><div className="text-center mb-5"><span className="section-kicker">The AquaPet difference</span><h2 className="section-heading mt-2">Made for happy fish keepers</h2><p className="text-muted mb-0">A thoughtful experience from selection to your aquarium.</p></div><div className="row g-4">{[["fa-heart", "Ethically sourced", "Every fish is responsibly selected and cared for."], ["fa-shield-alt", "14-day guarantee", "More confidence for every addition to your tank."], ["fa-star", "Expert curation", "Healthy, colourful, tank-ready companions."]].map(([icon, title, text]) => <div className="col-md-4" key={title}><div className="aqua-card value-card"><span className="value-icon"><i className={`fas ${icon}`} /></span><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>
      <style>{`
        .home-hero { min-height: 550px; display: grid; align-items: center; background: linear-gradient(90deg, rgba(3,43,65,.9), rgba(3,63,82,.48)), url('') center/cover; color: #fff; }
        .home-hero-content { max-width: 720px; padding-block: 5rem; }.hero-kicker { color: #7ee7df; text-transform: uppercase; font-size: .75rem; letter-spacing: .15em; font-weight: 800; }.home-hero h1 { font-size: clamp(2.7rem, 6vw, 4.7rem); font-weight: 800; letter-spacing: -.06em; line-height: 1; margin: 1rem 0; }.home-hero h1 span { color: #82f1e6; }.home-hero p { max-width: 570px; font-size: 1.1rem; line-height: 1.75; color: rgba(255,255,255,.86); margin-bottom: 1.75rem; }.hero-secondary { border: 1px solid rgba(255,255,255,.55); border-radius: 12px; color: #fff; font-weight: 700; padding: .8rem 1.15rem; text-decoration: none; }.hero-secondary:hover { color: #fff; background: rgba(255,255,255,.13); }.home-stats { margin-top: -42px; position: relative; z-index: 1; }.stat-card { height: 100%; display: grid; grid-template-columns: 37px 1fr; column-gap: .7rem; align-items: center; padding: 1rem; border: 1px solid #dcebed; border-radius: 16px; background: #fff; box-shadow: 0 12px 30px rgba(11,62,80,.1); }.stat-card i { grid-row: span 2; color: #0a8d8b; font-size: 1.2rem; }.stat-card strong { color: #173950; font-size: 1.2rem; }.stat-card span { color: #718592; font-size: .76rem; }.expert-copy p, .value-card p { color: #6e8493; line-height: 1.75; }.expert-image { width: 100%; min-height: 360px; object-fit: cover; border-radius: 24px; box-shadow: 0 20px 40px rgba(14,71,93,.14); }.home-value-section { background: #eef9f8; }.value-card { padding: 2rem; }.value-card h3 { color: #16324f; font-size: 1.1rem; font-weight: 800; margin-top: 1rem; }.value-card p { margin: .5rem 0 0; }.value-icon { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 14px; background: #e0f5f2; color: #078783; font-size: 1.1rem; }
      `}</style>
    </main>
  );
}
export default Home;
