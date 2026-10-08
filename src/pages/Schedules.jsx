import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { useUpcoming } from '../components/people';
import { Cta, PageHero } from '../components/ui';
import { SITE } from '../config';
import { dateParts } from '../data/content';
import { rupees } from '../data/healers';

export default function Schedules() {
  const upcoming = useUpcoming();
  return (
    <>
      <Seo
        path="/schedules/" title="Healing Classes & Workshop Schedule" crumbs={[['Schedules', '/schedules/']]}
        desc="See upcoming Access Bars classes and Bars & Body Process swap evenings with Sunaina Aggarwal in Delhi and Gurugram. Check dates, prices and reserve your seat."
      />
      <PageHero title="Classes & swaps" text="Learn it, and practise on each other. Group classes and swap evenings at both centres." crumbs={[['Schedules']]} />
      <section>
        <div className="container prose" style={{ maxWidth: 900 }}>
          {upcoming.length > 0 ? (
            <div className="sched">
              {upcoming.map((c) => {
                const d = dateParts(c.date);
                return (
                  <article className="sched-item reveal" key={c.date + c.title}>
                    <div className="sched-date"><b>{d.day}</b><small>{d.weekday} · {d.month}</small></div>
                    <div>
                      <h3>{c.title} — {c.centre}</h3>
                      <p><strong>{c.place} · {c.time}</strong></p>
                      <p>{c.text}</p>
                      <p><b>{rupees(c.price)}</b> · limited to {c.seats} seats</p>
                    </div>
                    <a className="btn btn-outline" href={`https://wa.me/${SITE.wa}?text=${encodeURIComponent(`Hello, I would like to reserve a seat: ${c.title}, ${c.centre}, ${d.weekday} ${d.day} ${d.month}, ${c.time}.`)}`} target="_blank" rel="noopener noreferrer">Reserve via WhatsApp</a>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="note">There are no classes listed right now. New dates are announced regularly — <Link to="/contact-us/">get in touch</Link> to hear about the next one.</p>
          )}
          <p className="note"><strong>Please note:</strong> seats are confirmed when we reply on WhatsApp. To take a seat, reserve on WhatsApp, call <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a> or <Link to="/contact-us/">send a message</Link>.</p>

          <h2 style={{ marginTop: 50 }}>Regular hours at our centres</h2>
          <div className="grid g2" style={{ marginTop: 18 }}>
            <div className="card"><h3>Gurugram</h3><p>E-5/6, DLF Phase 1, Gurugram<br /><strong>Mon – Sat, 10 am – 6 pm</strong> (by appointment)</p></div>
            <div className="card"><h3>Delhi</h3><p>Paschim Vihar, New Delhi<br /><strong>Thursdays, 12 pm – 4 pm</strong> (by appointment)</p></div>
          </div>

          <h2 style={{ marginTop: 50 }}>Looking for a one-to-one session?</h2>
          <p>Private healing and counseling sessions are available on appointment, in person and online. <Link to="/book/">Book a session</Link>, meet our <Link to="/healers/">healers</Link>, or explore <Link to="/services/">all services</Link>.</p>
        </div>
      </section>
      <Cta title="Can’t find a suitable date?" text="Tell us your preferred days and we will let you know about the next batch." />
    </>
  );
}
