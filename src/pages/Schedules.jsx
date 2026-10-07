import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Cta, PageHero } from '../components/ui';
import { SITE } from '../config';
import { SCHEDULE } from '../data/content';

export default function Schedules() {
  return (
    <>
      <Seo
        path="/schedules/" title="Healing Classes & Workshop Schedule" crumbs={[['Schedules', '/schedules/']]}
        desc="See upcoming Access Bars classes, Bars & Body Process swaps and weekly sessions with Sunaina Aggarwal in Delhi and Gurugram. Find a class that fits you."
      />
      <PageHero title="Schedules" text="There’s a class for everyone — come find yours. Upcoming classes, workshops and weekly sessions." crumbs={[['Schedules']]} />
      <section>
        <div className="container prose" style={{ maxWidth: 900 }}>
          <div className="sched">
            {SCHEDULE.map((s) => (
              <article className="sched-item reveal" key={s.title}>
                <div className="sched-date"><b>{s.d}</b><small>{s.m}</small></div>
                <div><h3>{s.title}</h3><p><strong>{s.where}</strong></p><p>{s.text}</p></div>
                <a className="btn btn-outline" href={`https://wa.me/${SITE.wa}?text=${encodeURIComponent('Hello, I would like to join: ' + s.title)}`} target="_blank" rel="noopener noreferrer">Reserve Seat</a>
              </article>
            ))}
          </div>
          <p className="note"><strong>Please note:</strong> dates and timings are updated regularly and may change. Confirm availability on <a href={`https://wa.me/${SITE.wa}`} target="_blank" rel="noopener noreferrer">WhatsApp</a> or via the <Link to="/contact-us/">contact page</Link> before you plan.</p>
          <h2 style={{ marginTop: 50 }}>Looking for a one-to-one session?</h2>
          <p>Private healing and counseling sessions are available on appointment, in-person at Delhi &amp; Gurugram and online. Explore <Link to="/services/healing/">healing</Link> or <Link to="/services/counseling/">counseling</Link>.</p>
        </div>
      </section>
      <Cta title="Can’t find a suitable date?" text="Tell us your preferred days and we will let you know about the next batch." />
    </>
  );
}
