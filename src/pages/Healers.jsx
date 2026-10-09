import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { HealerCard } from '../components/people';
import { Cta, PageHero } from '../components/ui';
import { HEALERS } from '../data/healers';

const FILTERS = ['All', 'Pranic Healing', 'Access Bars', 'Reiki', 'Counselling'];

export default function Healers() {
  const [f, setF] = useState('All');
  const list = f === 'All' ? HEALERS : HEALERS.filter((h) => h.tags.includes(f));
  return (
    <>
      <Seo
        path="/healers/" title="Our Healers & Practitioners" crumbs={[['Healers', '/healers/']]}
        desc="Meet the healers at EL Healing Centre — Pranic Healing, Access Bars and counseling practitioners in Delhi and Gurugram. View profiles and book a session."
      />
      <PageHero title="Who would you like to sit with?" text="Meet the circle of practitioners at EL Healing Centre. Open a profile to see their sessions, fees and approach, then book with the person who feels right for you." crumbs={[['Healers']]} />
      <section>
        <div className="container">
          <div className="filters" role="group" aria-label="Filter healers by speciality">
            {FILTERS.map((x) => <button type="button" key={x} className={'filter' + (f === x ? ' on' : '')} aria-pressed={f === x} onClick={() => setF(x)}>{x}</button>)}
          </div>
          <div className="grid g3 hgrid">
            {list.map((h) => <HealerCard key={h.slug} h={h} />)}
          </div>
          {list.length === 0 && <p style={{ textAlign: 'center' }}>No practitioners listed for this yet — <Link to="/contact-us/">ask us</Link> and we will suggest someone.</p>}
          <p className="note" style={{ maxWidth: 760, margin: '40px auto 0' }}>Not sure who to choose? Choose <strong>“No preference”</strong> while booking and we will match you with the right practitioner for your concern.</p>
        </div>
      </section>
      <Cta title="Ready to book with a practitioner?" text="Choose a service, a healer and a time — it takes about a minute." />
    </>
  );
}
