import React, { useState } from "react";

const topics = ["Fish care advice", "Order support", "Aquarium setup", "Something else"];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [topic, setTopic] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const chooseTopic = (choice) => {
    setTopic(choice);
    if (!form.message) setForm({ ...form, message: `Hi AquaPet, I need help with ${choice.toLowerCase()}.` });
  };
  const submit = (event) => {
    event.preventDefault();
    setSending(true);
    const contactMessage = {
      id: Date.now(),
      ...form,
      topic,
      submittedAt: new Date().toISOString(),
    };
    const existingMessages = window.localStorage.getItem("contactMessages");
    const savedMessages = existingMessages ? JSON.parse(existingMessages) : [];
    window.localStorage.setItem("contactMessages", JSON.stringify([...savedMessages, contactMessage]));
    window.setTimeout(() => { setSending(false); setSubmitted(true); }, 650);
  };
  const sendAnother = () => { setForm({ name: "", email: "", phone: "", message: "" }); setTopic(""); setSubmitted(false); };

  return (
    <main className="contact-page site-section">
      <div className="container contact-shell">
        <header className="contact-heading text-center">
          <span className="section-kicker">We are here to help</span>
          <h1 className="section-heading mt-2">Lets make your aquarium thrive.</h1>
          <p>Choose a topic or send us a message — our aquarium experts are happy to help.</p>
        </header>

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-5">
            <aside className="contact-info-panel">
              <div className="contact-orb"><i className="fas fa-fish" /></div>
              <h2>A little help goes a long way.</h2>
              <p>From choosing the right fish to keeping your water crystal clear, we&apos;re only a message away.</p>
              <div className="contact-info-list">
                <a href="mailto:hello@aquapet.shop"><i className="fas fa-envelope" /><span><small>Email us</small>hello@aquapet.shop</span></a>
                <a href="tel:+9123456788"><i className="fas fa-phone" /><span><small>Call us</small>+91 234 567 88</span></a>
                <div><i className="fas fa-location-dot" /><span><small>Visit us</small>Bandra West, Mumbai</span></div>
              </div>
              <div className="contact-response"><i className="fas fa-clock" /> Typical reply time: under one business day</div>
            </aside>
          </div>

          <div className="col-lg-7">
            <section className="contact-form-card" aria-live="polite">
              {submitted ? (
                <div className="contact-complete">
                  <span><i className="fas fa-check" /></span>
                  <h2>Message received!</h2>
                  <p>Thanks, {form.name || "friend"}. We&apos;ll be in touch at <strong>{form.email}</strong> shortly.</p>
                  <button className="aqua-btn" type="button" onClick={sendAnother}>Send another message <i className="fas fa-arrow-right ms-1" /></button>
                </div>
              ) : (
                <>
                  <h2>Send us a message</h2>
                  <p className="form-intro">What can we help you with?</p>
                  <div className="topic-list">{topics.map((choice) => <button key={choice} type="button" className={topic === choice ? "topic-pill selected" : "topic-pill"} onClick={() => chooseTopic(choice)}>{topic === choice && <i className="fas fa-check me-1" />}{choice}</button>)}</div>
                  <form onSubmit={submit} className="row g-3">
                    <div className="col-md-6"><label htmlFor="name">Your name</label><input id="name" name="name" value={form.name} onChange={update} className="form-control" placeholder="Aarav Sharma" required /></div>
                    <div className="col-md-6"><label htmlFor="phone">Phone <em>(optional)</em></label><input id="phone" name="phone" value={form.phone} onChange={update} className="form-control" inputMode="tel" placeholder="+91 98765 43210" /></div>
                    <div className="col-12"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" value={form.email} onChange={update} className="form-control" placeholder="you@example.com" required /></div>
                    <div className="col-12"><label htmlFor="message">Your message</label><textarea id="message" name="message" value={form.message} onChange={update} className="form-control" rows="5" placeholder="Tell us a little more..." required /></div>
                    <div className="col-12 d-flex flex-wrap align-items-center gap-3"><button className="aqua-btn" type="submit" disabled={sending}>{sending ? <><i className="fas fa-spinner fa-spin me-2" />Sending...</> : <>Send message <i className="fas fa-paper-plane ms-1" /></>}</button><span className="form-privacy"><i className="fas fa-lock me-1" /> Your details stay private.</span></div>
                  </form>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
      <style>{`
        .contact-page{background:radial-gradient(circle at 12% 10%,#e2f7f4 0,transparent 28%),#f7fbfc;min-height:70vh}.contact-shell{max-width:1120px}.contact-heading{max-width:650px;margin:0 auto 2.7rem}.contact-heading h1{font-size:clamp(2.15rem,4vw,3.35rem)}.contact-heading p{color:#718592;font-size:1.04rem;line-height:1.7}.contact-info-panel{height:100%;padding:clamp(2rem,5vw,3.3rem);border-radius:25px;color:#fff;background:linear-gradient(145deg,#063f63,#087d8b 68%,#14a69b);box-shadow:0 18px 42px rgba(6,63,99,.2)}.contact-orb{width:54px;height:54px;display:grid;place-items:center;border-radius:17px;background:rgba(255,255,255,.15);font-size:1.35rem}.contact-info-panel h2{font-size:clamp(1.65rem,3vw,2.25rem);font-weight:800;letter-spacing:-.04em;margin:1.2rem 0 .7rem}.contact-info-panel>p{color:rgba(255,255,255,.82);line-height:1.75}.contact-info-list{margin-top:2rem;display:grid;gap:.9rem}.contact-info-list>a,.contact-info-list>div{display:flex;align-items:center;gap:.8rem;color:#fff;text-decoration:none}.contact-info-list i{width:38px;height:38px;display:grid;place-items:center;border-radius:11px;background:rgba(255,255,255,.13)}.contact-info-list small{display:block;color:#a8eeea;font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;font-weight:800}.contact-info-list span{font-size:.9rem}.contact-response{margin-top:2rem;padding-top:1.2rem;border-top:1px solid rgba(255,255,255,.2);font-size:.78rem;color:#d4fffb}.contact-form-card{height:100%;padding:clamp(1.5rem,4vw,3rem);background:#fff;border:1px solid #dcebed;border-radius:25px;box-shadow:0 15px 36px rgba(14,71,93,.08)}.contact-form-card h2{color:#16324f;font-size:1.45rem;font-weight:800;margin:0}.form-intro{color:#718592;margin:.35rem 0 1.1rem}.topic-list{display:flex;flex-wrap:wrap;gap:.55rem;margin-bottom:1.5rem}.topic-pill{border:1px solid #d3e5e7;border-radius:99px;background:#fff;color:#496777;padding:.45rem .75rem;font-size:.78rem;font-weight:700;transition:.2s}.topic-pill:hover,.topic-pill.selected{border-color:#0b938e;color:#087d8b;background:#e9f8f6;transform:none;box-shadow:none}.contact-form-card label{display:block;margin-bottom:.42rem;color:#3c5d6e;font-size:.84rem;font-weight:750}.contact-form-card label em{color:#899ba5;font-style:normal;font-weight:500}.contact-form-card .form-control{border-color:#d5e5e8;border-radius:11px;padding:.72rem .85rem;box-shadow:none}.contact-form-card .form-control:focus{border-color:#0b938e;box-shadow:0 0 0 .2rem rgba(11,147,142,.12)}.form-privacy{color:#7c919c;font-size:.76rem}.aqua-btn:disabled{opacity:.7;cursor:wait;transform:none}.contact-complete{text-align:center;display:grid;place-items:center;min-height:380px}.contact-complete>span{width:68px;height:68px;display:grid;place-items:center;border-radius:50%;background:#dff7ed;color:#15956c;font-size:1.8rem}.contact-complete h2{margin:1.2rem 0 .5rem}.contact-complete p{max-width:380px;color:#718592;line-height:1.7}.contact-complete strong{color:#087d8b}@media(max-width:575.98px){.contact-page{padding-block:3rem}.contact-heading{margin-bottom:1.75rem}.contact-info-panel,.contact-form-card{border-radius:20px}}
      `}</style>
    </main>
  );
}

export default Contact;
