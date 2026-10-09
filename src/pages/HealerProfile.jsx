import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { Icon } from '../components/Icon';
import { Avatar, HealerCard } from '../components/people';
import { Crumbs, Cta, Faq, SectionHead } from '../components/ui';
import { SITE, abs } from '../config';
import { SERVICE_BY } from '../data/content';
import { HEALERS, HEALER_BY, rupees } from '../data/healers';
import NotFound from './NotFound';

const FIRST = [
  ['Settle in', 'A few minutes to arrive, in the room or online. No preparation needed.'],
  ['Talk it through', 'Share what is going on. Your healer listens and suggests the approach.'],
  ['The work', 'Healing at your pace. Most people simply rest.'],
  ['Aftercare', 'Simple practices to carry the session into your week.'],
];
const dur = (slug) => { const g = SERVICE_BY[slug].glance.find(([k]) => k === 'Duration'); return g ? g[1] : ''; };

export default function HealerProfile() {
  const { slug } = useParams();
  const h = HEALER_BY[slug];
  if (!h) return <NotFound />;

  const path = `/healers/${h.slug}/`;
  const first = h.name.split(' ')[0];
  const services = h.services.filter((s) => SERVICE_BY[s]);
  const others = HEALERS.filter((x) => x.slug !== h.slug).slice(0, 3);
  const faq = [
    [`How do I book a session with ${first}?`, `Press Book on this page: choose a service, a date and a time, and share your details. Your request opens in WhatsApp and our team confirms your slot personally.`],
    ['Where are sessions held?', 'At DLF Phase 1, Gurugram and Paschim Vihar, Delhi, or online over video. You choose the place while booking.'],
    ['Is this a substitute for medical care?', 'No. Healing and counseling are complementary practices and do not replace medical diagnosis or treatment.'],
  ];

  return (
    <>
      <Seo
        path={path} title={`${h.name} – ${h.tags[0]}`} faq={faq} crumbs={[['Healers', '/healers/'], [h.name, path]]}
        desc={`${h.name}, ${h.role.toLowerCase()}, practising since ${h.since} at EL Healing Centre in Delhi and Gurugram. View sessions, fees from ${rupees(h.price)} and book online.`}
        schema={[{ '@type': 'Person', '@id': abs(path) + '#person', name: h.name, jobTitle: h.role, worksFor: { '@id': SITE.domain + '/#business' }, url: abs(path), knowsAbout: h.tags }]}
      />

      <section className="page-hero profile-hero">
        <div className="container">
          <Crumbs items={[['Healers', '/healers/'], [h.name]]} />
          <Avatar h={h} large />
          <p className="eyebrow" style={{ color: 'var(--ember)', margin: '14px 0 4px' }}>{h.role}</p>
          <h1>{h.name}</h1>
          <ul className="profile-stats">
            <li><b>{h.since}</b><span>Since</span></li>
            <li><b>{h.tags.length}</b><span>{h.tags.length === 1 ? 'Modality' : 'Modalities'}</span></li>
            <li><b>{services.length}</b><span>{services.length === 1 ? 'Session' : 'Sessions'}</span></li>
            <li><b>{rupees(h.price)}</b><span>From</span></li>
          </ul>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 24 }}>
            <Link className="btn btn-primary" to={`/book/?healer=${h.slug}`}>Book with {first}</Link>
            <a className="btn btn-outline" href={`https://wa.me/${SITE.wa}?text=${encodeURIComponent(`Hello, I would like to know more about a session with ${h.name}.`)}`} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
          </div>
          <nav className="profile-tabs" aria-label="On this page">
            <a href="#sessions">Sessions</a><a href="#first-session">Your first session</a><a href="#others">Others</a>
          </nav>
        </div>
      </section>

      <section>
        <div className="container prose">
          <h2 className="reveal">About {first}</h2>
          <p className="reveal">{h.summary || `${h.name} is ${/^[aeiou]/i.test(h.role) ? 'an' : 'a'} ${h.role.replace(/·/g, ',').toLowerCase()} at EL Healing Centre, practising since ${h.since}. Sessions are personal, unhurried and shaped around what you walk in with.`}</p>
          {h.founder && <p className="reveal">Sunaina founded EL Healing Centre. She has healed professionally since 2005 and trained students since 2008, drawing on Pranic Healing, Crystal Healing, Psychotherapy, Arhatic Yoga, Access Consciousness and Feng Shui. <Link to="/about-us/">Read her full story →</Link></p>}
          <ul className="tags reveal" style={{ marginTop: 16 }}>{h.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </section>

      <section className="alt" id="sessions">
        <div className="container">
          <SectionHead eyebrow="Sessions" title={`What you can book with ${first}`} />
          <div className="grid g3">
            {services.map((s) => (
              <Link className="card rel reveal" to={`/book/?healer=${h.slug}&service=${s}`} key={s}>
                <div className="ico"><Icon name={SERVICE_BY[s].ico} /></div>
                <h3>{SERVICE_BY[s].name}</h3>
                <p>{SERVICE_BY[s].tag}</p>
                <p className="sess-meta"><span>{dur(s)}</span><b>{rupees(h.price)} →</b></p>
              </Link>
            ))}
          </div>
          <p className="note" style={{ maxWidth: 760, margin: '34px auto 0' }}>Healing and counseling are complementary practices and not a substitute for medical diagnosis or treatment.</p>
        </div>
      </section>

      <section id="first-session">
        <div className="container">
          <SectionHead eyebrow="Your first session" title="What the hour looks like" />
          <ol className="steps reveal">{FIRST.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ol>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Before you book" />
          <Faq items={faq} />
        </div>
      </section>

      <section id="others">
        <div className="container">
          <SectionHead eyebrow="Also in the circle" title="Someone else in mind?" />
          <div className="grid g3 hgrid">{others.map((o) => <HealerCard key={o.slug} h={o} />)}</div>
          <p style={{ textAlign: 'center', margin: '34px 0 0' }}><Link className="btn btn-outline" to="/healers/">See all healers</Link></p>
        </div>
      </section>
      <Cta title={`Book a session with ${first}`} text="Choose a service, a date and a time. We confirm every request personally." />
    </>
  );
}
