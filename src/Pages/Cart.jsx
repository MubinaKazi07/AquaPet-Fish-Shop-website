import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart({ cart, setCart, onRemoveFromCart, onUpdateQuantity }) {
  const navigate = useNavigate();
  const removeItem = (index) => {
    if (onRemoveFromCart) {
      onRemoveFromCart(cart[index], index).catch(() => {});
      return;
    }
    setCart(cart.filter((item, itemIndex) => itemIndex !== index));
  };

  const totalPrice = cart.reduce((total, item) => total + Number(item.price || 0) * (Number(item.quantity) || 1), 0);
  const itemCount = cart.reduce((total, item) => total + (Number(item.quantity) || 1), 0);
  const formattedPrice = (price) => `₹${Number(price || 0).toLocaleString("en-IN")}`;
  const fallbackImage = "https://images.unsplash.com/photo-1520302519886-71a4c51a8f20?auto=format&fit=crop&w=600&q=80";

  return (
    <main className="cart-page py-4 py-md-5">
      <style>{`
        .cart-page { color: #16324f; }
        .cart-page * { box-sizing: border-box; }
        .cart-shell { max-width: 1180px; margin: 0 auto; }
        .cart-hero { background: linear-gradient(120deg, #063f63 0%, #087d8b 58%, #16a6a0 100%); border-radius: 28px; color: #fff; overflow: hidden; position: relative; padding: 2.3rem 2.5rem; }
        .cart-hero::after { content: ""; position: absolute; width: 270px; height: 270px; border: 42px solid rgba(255,255,255,.1); border-radius: 50%; right: -70px; top: -130px; }
        .cart-eyebrow { letter-spacing: .13em; font-size: .72rem; font-weight: 700; text-transform: uppercase; opacity: .78; }
        .cart-title { font-size: clamp(1.8rem, 4vw, 2.65rem); font-weight: 800; letter-spacing: -.04em; margin: .35rem 0 .25rem; position: relative; }
        .cart-subtitle { margin: 0; opacity: .85; position: relative; }
        .cart-count { position: relative; z-index: 1; min-width: 78px; height: 78px; border: 1px solid rgba(255,255,255,.25); background: rgba(255,255,255,.12); backdrop-filter: blur(8px); border-radius: 20px; display: grid; place-items: center; text-align: center; }
        .cart-count strong { display: block; font-size: 1.5rem; line-height: 1; }
        .cart-count span { font-size: .7rem; opacity: .82; margin-top: .15rem; }
        .cart-content { margin-top: 1.6rem; }
        .cart-items-panel, .cart-summary { background: #fff; border: 1px solid #e4eef1; border-radius: 22px; box-shadow: 0 15px 40px rgba(14, 71, 93, .07); }
        .cart-items-panel { padding: .5rem 1.25rem; }
        .cart-product { display: grid; grid-template-columns: 92px minmax(0, 1fr) auto; gap: 1.15rem; align-items: center; padding: 1.1rem .25rem; border-bottom: 1px solid #e9f0f2; }
        .cart-product:last-child { border-bottom: 0; }
        .cart-product-image { width: 92px; height: 92px; object-fit: cover; border-radius: 17px; background: #eaf5f5; }
        .cart-product-name { color: #123451; font-size: 1.05rem; font-weight: 750; margin: 0 0 .4rem; }
        .cart-product-note { display: flex; align-items: center; gap: .35rem; color: #6d8393; font-size: .82rem; margin: 0; }
        .cart-product-price { color: #0a7f82; font-weight: 800; font-size: 1.08rem; white-space: nowrap; }
        .remove-btn { width: 36px; height: 36px; margin-left: .75rem; border: 0; border-radius: 10px; color: #d25555; background: #fff1f1; transition: .2s ease; }
        .quantity-btn { width: 30px; height: 30px; margin: 0; color: #087b78; background: #e7f8f4; }
        .quantity-btn:hover { color: #fff; background: #087b78; }
        .quantity-value { min-width: 20px; text-align: center; color: #173950; font-weight: 700; }
        .remove-btn:hover { color: #fff; background: #d9534f; transform: none; box-shadow: none; }
        .cart-summary { padding: 1.55rem; position: sticky; top: 98px; }
        .summary-heading { font-size: 1.15rem; font-weight: 800; margin: 0 0 1.25rem; color: #123451; }
        .summary-row { display: flex; justify-content: space-between; gap: 1rem; color: #657c8d; font-size: .92rem; margin-bottom: .8rem; }
        .summary-row strong { color: #24455d; }
        .summary-total { border-top: 1px dashed #cbdcdf; margin-top: 1.15rem; padding-top: 1.15rem; align-items: center; color: #173a56; font-size: 1rem; font-weight: 700; }
        .summary-total strong { color: #0b7278; font-size: 1.45rem; }
        .checkout-btn { width: 100%; border: 0; border-radius: 12px; padding: .9rem 1rem; margin-top: 1.25rem; color: #fff; background: linear-gradient(135deg, #0a7780, #12a096); font-weight: 700; box-shadow: 0 10px 20px rgba(10, 119, 128, .2); transition: .2s ease; }
        .checkout-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 25px rgba(10, 119, 128, .28); }
        .secure-note { display: flex; justify-content: center; gap: .4rem; color: #8294a0; font-size: .74rem; margin: 1rem 0 0; }
        .cart-empty { max-width: 620px; margin: 2rem auto 0; padding: 4rem 2rem; text-align: center; background: #fff; border: 1px solid #e4eef1; border-radius: 26px; box-shadow: 0 15px 40px rgba(14, 71, 93, .06); }
        .empty-icon { width: 86px; height: 86px; margin: 0 auto 1.35rem; display: grid; place-items: center; border-radius: 25px; background: #e3f7f4; color: #07898a; font-size: 2.15rem; }
        .cart-empty h2 { color: #123451; font-weight: 800; margin-bottom: .65rem; }
        .cart-empty p { color: #708594; margin-bottom: 1.5rem; }
        .continue-btn { display: inline-flex; align-items: center; gap: .55rem; padding: .75rem 1.1rem; border-radius: 11px; color: #fff; background: #0a7780; text-decoration: none; font-weight: 700; }
        .continue-btn:hover { color: #fff; background: #08636a; }
        @media (max-width: 767.98px) { .cart-hero { padding: 1.7rem; border-radius: 22px; } .cart-product { grid-template-columns: 72px minmax(0, 1fr) auto; gap: .8rem; } .cart-product-image { width: 72px; height: 72px; } .remove-btn { margin-left: .35rem; } .cart-summary { position: static; } }
      `}</style>

      <div className="container cart-shell">
        <section className="cart-hero d-flex align-items-center justify-content-between gap-3">
          <div>
            <div className="cart-eyebrow">Fresh selections</div>
            <h1 className="cart-title"><i className="fas fa-shopping-basket me-2" />Your basket</h1>
            <p className="cart-subtitle">Everything you love, ready for checkout.</p>
          </div>
          <div className="cart-count">
            <div><strong>{itemCount}</strong><span>{itemCount === 1 ? "item" : "items"}</span></div>
          </div>
        </section>

        {cart.length === 0 ? (
          <section className="cart-empty">
            <div className="empty-icon"><i className="fas fa-fish" /></div>
            <h2>Your basket is waiting</h2>
            <p>Explore our fresh collection and add something special to your next order.</p>
            <Link to="/product" className="continue-btn">Browse fresh fish <i className="fas fa-arrow-right" /></Link>
          </section>
        ) : (
          <div className="row g-4 cart-content align-items-start">
            <div className="col-lg-8">
              <section className="cart-items-panel" aria-label="Cart items">
                {cart.map((item, index) => (
                  <article className="cart-product" key={`${item.name}-${index}`}>
                    <img className="cart-product-image" src={item.image || fallbackImage} alt={item.name} onError={(event) => { event.currentTarget.src = fallbackImage; }} />
                    <div>
                      <h2 className="cart-product-name">{item.name}</h2>
                      <p className="cart-product-note"><i className="fas fa-check-circle text-success" /> Freshly selected for you</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <button className="remove-btn quantity-btn" type="button" onClick={() => onUpdateQuantity ? onUpdateQuantity(item, (Number(item.quantity) || 1) - 1).catch(() => {}) : null} aria-label={`Decrease quantity of ${item.name}`} title="Decrease quantity"><i className="fas fa-minus" /></button>
                        <span className="quantity-value" aria-label={`Quantity ${item.quantity || 1}`}>{item.quantity || 1}</span>
                        <button className="remove-btn quantity-btn" type="button" onClick={() => onUpdateQuantity ? onUpdateQuantity(item, (Number(item.quantity) || 1) + 1).catch(() => {}) : null} aria-label={`Increase quantity of ${item.name}`} title="Increase quantity"><i className="fas fa-plus" /></button>
                      </div>
                      <span className="cart-product-price">{formattedPrice(Number(item.price || 0) * (Number(item.quantity) || 1))}</span>
                      <button className="remove-btn" type="button" onClick={() => removeItem(index)} aria-label={`Remove ${item.name}`} title="Remove item"><i className="fas fa-trash-alt" /></button>
                    </div>
                  </article>
                ))}
              </section>
            </div>
            <aside className="col-lg-4">
              <section className="cart-summary" aria-label="Order summary">
                <h2 className="summary-heading">Order summary</h2>
                <div className="summary-row"><span>Subtotal</span><strong>{formattedPrice(totalPrice)}</strong></div>
                <div className="summary-row"><span>Delivery</span><strong className="text-success">Free</strong></div>
                <div className="summary-row summary-total"><span>Total</span><strong>{formattedPrice(totalPrice)}</strong></div>
                <button className="checkout-btn" type="button" onClick={() => navigate("/payment")}>Proceed to checkout <i className="fas fa-arrow-right ms-1" /></button>
                <p className="secure-note"><i className="fas fa-lock" /> Secure checkout · Freshness guaranteed</p>
              </section>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;
