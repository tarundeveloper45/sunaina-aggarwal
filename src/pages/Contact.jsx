import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Icon } from '../components/Icon';
import { Faq, PageHero, SectionHead } from '../components/ui';
import { SITE, abs } from '../config';
import { faqContact } from '../data/content';

const SERVICES_OPT = ['Not sure yet', 'Counselling', 'Healing', 'Pranic Healing', 'Access Bars Session', 'Access Body Process', 'Business Mentoring', 'Personalised Meditation', 'Feng Shui Consultation', 'Energetic Facial & Beauty Treatment', 'Classes / Workshops'];

function sendToWhatsApp(e) {
  e.preventDefault();
  const d = new FormData(e.currentTarget);
  const lines = [
    'Hello Sunaina, I would like to get in touch.',
    `Name: ${d.get('name')}`, `Mobile: ${d.get('phone')}`, d.get('email') ? `Email: ${d.get('email')}` : null,
    `Interested in: ${d.get('service')}`, `Centre: ${d.get('centre')}`, `Message: ${d.get('message') || '-'}`,
  ].filter(Boolean);
  window.open(`https://wa.me/${SITE.wa}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
}

export default function Contact() {
  return (
    <>
      <Seo
        path="/contact-us/" title="Contact Us – Book a Healing Session" faq={faqContact} crumbs={[['Contact Us', '/contact-us/']]}
        desc="Contact Sunaina Aggarwal to book Pranic Healing, Reiki, Access Bars or counseling in Delhi (Paschim Vihar) and Gurugram (DLF Phase 1). Call or WhatsApp today."
        schema={[{ '@type': 'ContactPage', name: 'Contact EL Healing Centre', url: abs('/contact-us/') }]}
      />
      <PageHero title="Contact Us" text="Book a session, ask a question or enquire about a class — we’re happy to help." crumbs={[['Contact Us']]} />

      <section>
        <div className="container contact-grid">
          <div className="reveal">
            <h2>Get in touch</h2>
            <p style={{ color: 'var(--muted)' }}>Reach out in whichever way is easiest. We usually reply the same day.</p>
            <ul className="info-list">
              <li><span className="ico"><Icon name="phone" /></span><div><b>Call</b><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></div></li>
              <li><span className="ico"><Icon name="chat" /></span><div><b>WhatsApp</b><a href={`https://wa.me/${SITE.wa}`} target="_blank" rel="noopener noreferrer">Chat with us</a></div></li>
              <li><span className="ico"><Icon name="mail" /></span><div><b>Email</b><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div></li>
              <li><span className="ico"><Icon name="clock" /></span><div><b>Hours</b><span>Gurugram: Mon – Sat, 10 am – 6 pm · Delhi: Thursdays, 12 – 4 pm. By appointment — <Link to="/book/">book a slot</Link></span></div></li>
            </ul>
          </div>

          <form className="box reveal" id="enquiry-form" onSubmit={sendToWhatsApp}>
            <h2>Tell Sunaina what’s going on</h2>
            <p style={{ color: 'var(--muted)' }}>She replies personally and suggests what fits. Want a specific slot? <Link to="/book/">Use the booking form →</Link></p>
            <div className="row2">
              <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" required autoComplete="name" /></div>
              <div className="field"><label htmlFor="phone">Mobile number</label><input id="phone" name="phone" type="tel" required autoComplete="tel" /></div>
            </div>
            <div className="field"><label htmlFor="email">Email <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label><input id="email" name="email" type="email" autoComplete="email" /></div>
            <div className="field"><label htmlFor="service">I’m interested in</label>
              <select id="service" name="service">{SERVICES_OPT.map((o) => <option key={o}>{o}</option>)}</select></div>
            <div className="field"><label htmlFor="centre">Which centre suits you?</label>
              <select id="centre" name="centre"><option>No preference</option><option>Online</option><option>DLF Phase 1, Gurugram</option><option>Paschim Vihar, New Delhi</option></select></div>
            <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" rows="4" /></div>
            <button className="btn btn-primary" type="submit">Send on WhatsApp</button>
            <p style={{ fontSize: '.8rem', color: 'var(--muted)', margin: '14px 0 0' }}>Your enquiry opens in WhatsApp so you can send it directly. We never share your details.</p>
          </form>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <SectionHead eyebrow="Visit us" title="Our centres in Delhi & Gurugram" />
          <div className="grid g2">
            {SITE.locs.map((l) => (
              <article className="loc reveal" key={l.name}>
                <h3>{l.name}</h3>
                <p>{l.street},<br />{l.locality}{l.region === 'Delhi' ? ' – ' : `, ${l.region} `}{l.postal}</p>
                <p><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a> · <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
                <div className="map-wrap"><iframe src={l.map} title={l.title} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div>
                <a className="btn btn-outline" style={{ marginTop: 14 }} target="_blank" rel="noopener noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`EL Healing Centre ${l.street} ${l.locality} ${l.postal}`)}`}>Get directions</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Before you book" />
          <Faq items={faqContact} />
        </div>
      </section>
    </>
  );
}
