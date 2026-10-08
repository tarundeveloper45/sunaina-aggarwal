import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { Icon } from '../components/Icon';
import { Avatar, HealerCard } from '../components/people';
import { Cta, Crumbs, Faq, SectionHead } from '../components/ui';
import { SITE, abs } from '../config';
import { SERVICE_BY } from '../data/content';
import { HEALERS, HEALER_BY, rupees } from '../data/healers';
import NotFound from './NotFound';

const STEPS = [
  ['Book', 'Choose a service and a time that suits you.'],
  ['Arrive & settle', 'A short chat about what you are walking in with.'],
  ['Your session', 'Relax while the work is tailored to you.'],
  ['Take-home care', 'Simple guidance to carry the benefits forward.'],
];

export default function HealerProfile() {
  const { slug } = useParams();
  const h = HEALER_BY[slug];
  if (!h) return <NotFound />;

  const path = `/healers/${h.slug}/`;
  const first = h.name.split(' ')[0];
  const others = HEALERS.filter((x) => x.slug !== h.slug).slice(0, 3);
  const faq = [
    [`How do I book a session with ${first}?`, `Use the Book button on this page, pick a service, time and centre, and send the request on WhatsApp. ${first}'s team confirms your slot personally.`],
    ['Where are sessions held?', 'At DLF Phase 1, Gurugram and Paschim Vihar, Delhi, or online over video. Your centre or video link is confirmed when you book.'],
    ['Is this a substitute for medical care?', 'No. Healing and counseling are complementary practices and do not replace medical diagnosis or treatment.'],
  ];

  return (
    <>
      <Seo
        path={path} title={`${h.name} – ${h.tags[0]}`} faq={faq} crumbs={[['Healers', '/healers/'], [h.name, path]]}
        desc={`${h.name}, ${h.role.toLowerCase()}, practising since ${h.since} at EL Healing Centre in Delhi and Gurugram. View sessions, fees from ${rupees(h.price)} and book online.`}
        schema={[{ '@type': 'Person', '@id': abs(path) + '#person', name: h.name, jobTitle: h.role, worksFor: { '@id': SITE.domain + '/#business' }, url: abs(path), knowsAbout: h.tags }]}
      />
      <section className="page-hero">
        <div className="container">
          <Crumbs items={[['Healers', '/healers/'], [h.name]]} />
          <h1>{h.name}</h1>
          <p>{h.role}</p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 24 }}>
            <Link className="btn btn-primary" to={`/book/?healer=${h.slug}`}>Book with {first}</Link>
            <a className="btn btn-outline" href={`https://wa.me/${SITE.wa}?text=${encodeURIComponent(`Hello, I would like to know more about a session with ${h.name}.`)}`} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
          </div>
        </div>
      </section>

      <section>
        <div className="container svc-layout">
          <div className="svc-main">
            <div className="profile-head reveal">
              <Avatar h={h} large />
              <div>
                <p className="eyebrow" style={{ color: 'var(--ember)', marginBottom: 6 }}>{h.founder ? 'Founder' : 'Practitioner'} · since {h.since}</p>
                <ul className="tags">{h.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
            <h2 className="reveal">About {first}</h2>
            <p className="reveal">{h.summary || `${h.name} is a ${h.role.replace(/·/g, ',').toLowerCase()} at EL Healing Centre, practising since ${h.since}. Sessions are personal, unhurried and shaped around what you walk in with.`}</p>
            {h.founder && <p className="reveal">Sunaina has healed professionally since 2005 and trained students since 2008, drawing on Pranic Healing, Crystal Healing, Psychotherapy, Arhatic Yoga, Access Consciousness and Feng Shui. <Link to="/about-us/">Read her full story →</Link></p>}

            <h2 className="reveal">Sessions with {first}</h2>
            <div className="grid g2 reveal" style={{ marginTop: 18 }}>
              {h.services.map((s) => SERVICE_BY[s] && (
                <Link className="card rel" to={`/services/${s}/`} key={s}>
                  <div className="ico"><Icon name={SERVICE_BY[s].ico} /></div>
                  <h3>{SERVICE_BY[s].name}</h3><p>{SERVICE_BY[s].tag}</p><span className="more">Learn more →</span>
                </Link>
              ))}
            </div>
            <p className="note">Healing and counseling are complementary practices and not a substitute for medical diagnosis or treatment.</p>
          </div>

          <aside className="glance reveal">
            <h3>At a glance</h3>
            <dl>
              <div><dt>Practising since</dt><dd>{h.since}</dd></div>
              <div><dt>Sessions from</dt><dd>{rupees(h.price)}</dd></div>
              <div><dt>Centres</dt><dd>Gurugram · Delhi · Online</dd></div>
              <div><dt>Booking</dt><dd>Confirmed on WhatsApp</dd></div>
            </dl>
            <Link className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} to={`/book/?healer=${h.slug}`}>Book with {first}</Link>
            <a className="glance-link" href={`tel:${SITE.phoneRaw}`}>or call {SITE.phone}</a>
          </aside>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <SectionHead eyebrow="What to expect" title={`Your session with ${first}`} />
          <ol className="steps reveal">{STEPS.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ol>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Before you book" />
          <Faq items={faq} />
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <SectionHead eyebrow="The circle" title="Other practitioners" />
          <div className="grid g3 hgrid">{others.map((o) => <HealerCard key={o.slug} h={o} />)}</div>
          <p style={{ textAlign: 'center', margin: '34px 0 0' }}><Link className="btn btn-outline" to="/healers/">See all healers</Link></p>
        </div>
      </section>
      <Cta title={`Book a session with ${first}`} text="Pick a service, a centre and a time. We confirm every request personally." />
    </>
  );
}
