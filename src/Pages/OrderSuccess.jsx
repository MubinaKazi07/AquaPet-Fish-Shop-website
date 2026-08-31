import React from "react";
import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const { state } = useLocation();
  const itemCount = state?.itemCount ?? 0;
  const total = Number(state?.total || 0).toLocaleString("en-IN");

  return (
    <main className="order-success-page py-5">
      <style>{`
        .order-success-page { min-height: 65vh; display: grid; place-items: center; color: #173950; }
        .order-success-card { width: min(100%, 620px); padding: clamp(2rem, 6vw, 4rem); text-align: center; background: #fff; border: 1px solid #e0edef; border-radius: 28px; box-shadow: 0 20px 48px rgba(16, 70, 91, .1); }
        .success-mark { width: 92px; height: 92px; margin: 0 auto 1.5rem; display: grid; place-items: center; border-radius: 50%; color: #fff; background: linear-gradient(135deg, #0b9b8c, #3dc47f); box-shadow: 0 13px 26px rgba(26, 170, 125, .25); font-size: 2.35rem; }
        .order-success-card h1 { color: #143a56; font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; letter-spacing: -.04em; margin-bottom: .7rem; }
        .order-success-card > p { color: #718592; margin: 0 auto 1.5rem; max-width: 420px; }
        .order-details { display: flex; justify-content: space-between; gap: 1rem; padding: 1rem 1.1rem; margin-bottom: 1.6rem; text-align: left; background: #f2fbf9; border-radius: 13px; color: #597581; font-size: .9rem; }
        .order-details strong { display: block; margin-top: .25rem; color: #107b78; font-size: 1.05rem; }
        .success-actions { display: flex; justify-content: center; gap: .7rem; flex-wrap: wrap; }
        .success-actions a { padding: .78rem 1.1rem; border-radius: 11px; text-decoration: none; font-weight: 700; }
        .continue-shopping { color: #fff; background: #087c82; }
        .continue-shopping:hover { color: #fff; background: #06666b; }
        .home-link { color: #087c82; border: 1px solid #bcdedc; }
        .home-link:hover { color: #05666a; background: #f2fbfa; }
      `}</style>
      <section className="order-success-card">
        <div className="success-mark"><i className="fas fa-check" /></div>
        <h1>Order placed successfully!</h1>
        <p>Thank you for your order. We&apos;ve received your payment and will prepare your fresh selection with care.</p>
        <div className="order-details">
          <span>Items<strong>{itemCount || "Your"} {itemCount === 1 ? "item" : "items"}</strong></span>
          <span>Amount paid<strong>₹{total}</strong></span>
        </div>
        <div className="success-actions">
          <Link className="continue-shopping" to="/product">Continue shopping <i className="fas fa-arrow-right ms-1" /></Link>
          <Link className="home-link" to="/"><i className="fas fa-home me-1" /> Back to home</Link>
        </div>
      </section>
    </main>
  );
}

export default OrderSuccess;
