import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Payment({ cart }) {
  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const checkoutItems = location.state?.buyNowProduct ? [location.state.buyNowProduct] : cart;
  const total = checkoutItems.reduce((sum, item) => sum + Number(item.price || 0) * (Number(item.quantity) || 1), 0);
  const itemCount = checkoutItems.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  const formattedTotal = `₹${total.toLocaleString("en-IN")}`;

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Handle Razorpay Payment
  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      // Simple client-side implementation without backend
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_1234567890123", // Add your Razorpay Key ID
        amount: total * 100, // Amount in paise
        currency: "INR",
        name: "FishMart",
        description: `Payment for ${checkoutItems.length} item(s)`,
        handler: (response) => {
          // Payment successful
          navigate("/order-success", { 
            state: { 
              total, 
              itemCount,
              paymentId: response.razorpay_payment_id,
              paymentMethod: "Razorpay"
            } 
          });
        },
        prefill: {
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#087b78" },
        modal: {
          ondismiss: () => {
            setLoading(false);
            alert("Payment cancelled");
          }
        }
      };

      if (window.Razorpay) {
        const razor = new window.Razorpay(options);
        razor.open();
      } else {
        alert("Razorpay is not loaded. Please refresh the page and try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Razorpay Error:", error);
      alert("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  const payNow = (event) => {
    event.preventDefault();
    
    if (method === "razorpay") {
      handleRazorpayPayment();
    } else if (method === "cod") {
      navigate("/order-success", { state: { total, itemCount, paymentMethod: "COD" } });
    } else {
      navigate("/order-success", { state: { total, itemCount } });
    }
  };

  return (
    <main className="payment-page py-4 py-md-5">
      <style>{`
        .payment-page { color: #173950; }
        .payment-shell { max-width: 1040px; margin: 0 auto; }
        .payment-head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }
        .payment-head h1 { margin: 0; color: #123451; font-size: clamp(1.7rem, 4vw, 2.35rem); font-weight: 800; letter-spacing: -.04em; }
        .payment-head p { color: #718592; margin: .35rem 0 0; }
        .secure-pill { color: #087b78; background: #e7f8f4; border-radius: 99px; padding: .5rem .75rem; font-size: .78rem; font-weight: 700; white-space: nowrap; }
        .payment-card, .payment-summary { background: #fff; border: 1px solid #e2edef; border-radius: 22px; box-shadow: 0 15px 38px rgba(16, 70, 91, .07); }
        .payment-card { padding: 1.65rem; }
        .payment-section-title { color: #183b56; font-size: 1.08rem; font-weight: 800; margin-bottom: 1rem; }
        .method-option { width: 100%; display: flex; align-items: center; gap: .85rem; padding: 1rem; margin-bottom: .75rem; text-align: left; border: 1px solid #dce9ec; border-radius: 14px; background: #fff; transition: .2s ease; }
        .method-option:hover, .method-option.active { border-color: #0b9692; background: #f2fbfa; box-shadow: 0 5px 14px rgba(10, 126, 127, .08); transform: none; }
        .method-icon { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; color: #fff; font-size: 1.1rem; background: linear-gradient(135deg, #047c8b, #14a69b); }
        .method-option:nth-of-type(3) .method-icon { background: linear-gradient(135deg, #435eab, #728ad0); }
        .method-option:nth-of-type(4) .method-icon { background: linear-gradient(135deg, #e67e22, #d35400); }
        .method-name { display: block; color: #173950; font-weight: 800; }
        .method-description { display: block; color: #718592; font-size: .8rem; margin-top: .1rem; }
        .method-check { margin-left: auto; color: #0a908a; font-size: 1.15rem; }
        .payment-form { margin-top: 1.2rem; padding: 1.2rem; border-radius: 14px; background: #f5fafb; }
        .payment-form label { font-size: .82rem; color: #476273; font-weight: 700; margin-bottom: .38rem; }
        .payment-form .form-control { border-color: #d9e7ea; border-radius: 10px; padding: .7rem .8rem; }
        .payment-summary { padding: 1.55rem; position: sticky; top: 98px; }
        .payment-summary h2 { font-size: 1.1rem; font-weight: 800; margin-bottom: 1rem; }
        .summary-line { display: flex; justify-content: space-between; gap: 1rem; color: #6c8393; font-size: .92rem; margin: .85rem 0; }
        .summary-line strong { color: #23475e; }
        .summary-total { border-top: 1px dashed #cbdcdf; padding-top: 1rem; color: #183b56; font-size: 1rem; font-weight: 800; }
        .summary-total strong { color: #087b78; font-size: 1.35rem; }
        .pay-button { width: 100%; border: 0; border-radius: 12px; color: #fff; background: linear-gradient(135deg, #087f84, #13a49a); padding: .9rem; margin-top: 1.1rem; font-weight: 800; box-shadow: 0 10px 21px rgba(8, 127, 132, .2); }
        .pay-button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 13px 24px rgba(8, 127, 132, .28); }
        .pay-button:disabled { opacity: 0.7; cursor: not-allowed; }
        .back-link { display: inline-flex; margin-top: 1rem; color: #087b78; text-decoration: none; font-size: .88rem; font-weight: 700; }
        @media (max-width: 991.98px) { .payment-summary { position: static; } }
        @media (max-width: 575.98px) { .payment-head { align-items: flex-start; flex-direction: column; } .payment-card, .payment-summary { border-radius: 18px; padding: 1.15rem; } }
      `}</style>

      <div className="container payment-shell">
        <header className="payment-head">
          <div><h1>Secure payment</h1><p>Choose a payment method to complete your order.</p></div>
          <span className="secure-pill"><i className="fas fa-lock me-1" /> 100% secure</span>
        </header>
        <div className="row g-4 align-items-start">
          <div className="col-lg-7">
            <form className="payment-card" onSubmit={payNow}>
              <h2 className="payment-section-title">Select payment method</h2>
              <button className={`method-option ${method === "upi" ? "active" : ""}`} type="button" onClick={() => setMethod("upi")}>
                <span className="method-icon"><i className="fas fa-mobile-alt" /></span><span><span className="method-name">UPI</span><span className="method-description">Google Pay, PhonePe, Paytm and more</span></span>{method === "upi" && <i className="fas fa-check-circle method-check" />}
              </button>
              <button className={`method-option ${method === "card" ? "active" : ""}`} type="button" onClick={() => setMethod("card")}>
                <span className="method-icon"><i className="far fa-credit-card" /></span><span><span className="method-name">Credit / debit card</span><span className="method-description">Visa, Mastercard, RuPay and Amex</span></span>{method === "card" && <i className="fas fa-check-circle method-check" />}
              </button>
              <button className={`method-option ${method === "razorpay" ? "active" : ""}`} type="button" onClick={() => setMethod("razorpay")}>
                <span className="method-icon"><i className="fas fa-credit-card" /></span><span><span className="method-name">Razorpay</span><span className="method-description">Secure online payment gateway</span></span>{method === "razorpay" && <i className="fas fa-check-circle method-check" />}
              </button>
              <button className={`method-option ${method === "cod" ? "active" : ""}`} type="button" onClick={() => setMethod("cod")}>
                <span className="method-icon"><i className="fas fa-money-bill-wave" /></span><span><span className="method-name">Cash on Delivery</span><span className="method-description">Pay when you receive your order</span></span>{method === "cod" && <i className="fas fa-check-circle method-check" />}
              </button>
              {method === "upi" ? (
                <div className="payment-form"><label htmlFor="upi-id">UPI ID</label><input id="upi-id" className="form-control" type="text" placeholder="name@bank" required /></div>
              ) : method === "card" ? (
                <div className="payment-form row g-3"><div className="col-12"><label htmlFor="card-number">Card number</label><input id="card-number" className="form-control" inputMode="numeric" placeholder="1234 5678 9012 3456" required /></div><div className="col-7"><label htmlFor="card-expiry">Expiry date</label><input id="card-expiry" className="form-control" placeholder="MM / YY" required /></div><div className="col-5"><label htmlFor="card-cvv">CVV</label><input id="card-cvv" className="form-control" inputMode="numeric" placeholder="•••" required /></div></div>
              ) : method === "razorpay" ? (
                <div className="payment-form"><label>Payment will be processed securely via Razorpay</label><p style={{ color: "#718592", marginTop: ".5rem" }}>You will be redirected to Razorpay to complete your payment.</p></div>
              ) : method === "cod" ? (
                <div className="payment-form"><label>Cash on Delivery</label><p style={{ color: "#718592", marginTop: ".5rem" }}>Please pay the amount upon delivery at your doorstep.</p></div>
              ) : null}
            </form>
          </div>
          <aside className="col-lg-5"><section className="payment-summary"><h2>Order summary</h2><div className="summary-line"><span>{itemCount} {itemCount === 1 ? "item" : "items"}</span><strong>{formattedTotal}</strong></div><div className="summary-line"><span>Delivery</span><strong className="text-success">Free</strong></div><div className="summary-line summary-total"><span>Amount to pay</span><strong>{formattedTotal}</strong></div><button className="pay-button" type="button" onClick={payNow} disabled={loading}>{loading ? "Processing..." : `Pay ${formattedTotal}`} <i className={`fas ${loading ? "fa-spinner fa-spin" : "fa-arrow-right"} ms-1`} /></button><Link className="back-link" to="/cart"><i className="fas fa-arrow-left me-2" /> Back to basket</Link></section></aside>
        </div>
      </div>
    </main>
  );
}

export default Payment;
