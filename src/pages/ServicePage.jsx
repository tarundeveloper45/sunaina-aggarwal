import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { Icon } from '../components/Icon';
import { Cta, Faq, PageHero, Picture, SectionHead } from '../components/ui';
import { SITE, abs } from '../config';
import { SERVICE_BY } from '../data/content';
import NotFound from './NotFound';

const STEPS = [
  ['Reach out', 'Message us on WhatsApp or the contact form.'],
  ['Share your goal', 'Tell us what you would like to work on.'],
  ['Your session', 'Relax while it is tailored to you.'],
  ['Next steps', 'Receive simple guidance to continue at home.'],
];

export default function ServicePage() {
  const { slug } = useParams();
  const s = SERVICE_BY[slug];
  if (!s) return <NotFound />;

  const path = `/services/${s.slug}/`;
  const hub = s.group === 'main' ? null : s.group === 'healing' ? ['Healing', '/services/healing/'] : ['Counselling', '/services/counseling/'];
  const crumbs = hub ? [['Services', '/services/'], hub, [s.name, path]] : [['Services', '/services/'], [s.name, path]];
  const heroCrumbs = hub ? [['Services', '/services/'], hub, [s.name]] : [['Services', '/services/'], [s.name]];

  return (
    <>
      <Seo
        path={path} title={s.title} desc={s.desc} faq={s.faq} crumbs={crumbs}
        schema={[{ '@type': 'Service', name: s.name, serviceType: s.name, description: s.desc, provider: { '@id': SITE.domain + '/#business' }, areaServed: ['Delhi', 'Gurugram', 'Delhi NCR'], url: abs(path) }]}
      />
      <PageHero title={s.h1} text={s.tag} crumbs={heroCrumbs}>
        <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 24 }}>
          <Link className="btn btn-primary" to={`/book/?service=${s.slug}`}>Book a Session</Link>
          <a className="btn btn-outline" href={`https://wa.me/${SITE.wa}`} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        </div>
      </PageHero>

      <section>
        <div className="container svc-layout">
          <div className="svc-main">
            <Picture className="svc-cover reveal" file={s.img} alt={s.alt} w={1100} h={825} style={s.pos ? { objectPosition: s.pos } : undefined} />
            <h2 className="reveal">About {s.name}</h2>
            {s.intro.map((p) => <p className="reveal" key={p}>{p}</p>)}
            <h2 className="reveal">Who it is for</h2>
            <ul className="checks reveal">{s.who.map((w) => <li key={w}>{w}</li>)}</ul>
            <p className="note">This is a complementary wellness practice and not a substitute for medical diagnosis or treatment.</p>
          </div>
          <aside className="glance reveal">
            <h3>At a glance</h3>
            <dl>{s.glance.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <Link className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} to={`/book/?service=${s.slug}`}>Book Now</Link>
            <a className="glance-link" href={`tel:${SITE.phoneRaw}`}>or call {SITE.phone}</a>
          </aside>
        </div>
      </section>

      {s.methods && (
        <section className="alt">
          <div className="container">
            <SectionHead eyebrow="Our methods" title={`Types of ${s.name.toLowerCase()} we offer`} />
            <div className="grid g3">
              {s.methods.map(([id, h, ic, t]) => (
                <div className="card reveal" id={id} key={id}><div className="ico"><Icon name={ic} /></div><h3>{h}</h3><p>{t}</p></div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={s.methods ? '' : 'alt'}>
        <div className="container">
          <SectionHead eyebrow="Benefits" title={`Why choose ${s.name}`} />
          <div className="grid g3">{s.benefits.map(([h, t]) => <div className="card reveal" key={h}><h3>{h}</h3><p>{t}</p></div>)}</div>
        </div>
      </section>

      <section className={s.methods ? 'alt' : ''}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="Simple steps to begin" />
          <ol className="steps reveal">{STEPS.map(([h, t]) => <li key={h}><h3>{h}</h3><p>{t}</p></li>)}</ol>
        </div>
      </section>

      <section className={s.methods ? '' : 'alt'}>
        <div className="container">
          <SectionHead eyebrow="FAQ" title={`${s.name}: common questions`} />
          <Faq items={s.faq} />
        </div>
      </section>

      <section className={s.methods ? 'alt' : ''}>
        <div className="container">
          <SectionHead eyebrow="Explore more" title="Related services" />
          <div className="grid g3">
            {s.related.map((r) => (
              <Link className="card rel reveal" to={`/services/${r}/`} key={r}>
                <div className="ico"><Icon name={SERVICE_BY[r].ico} /></div><h3>{SERVICE_BY[r].name}</h3><p>{SERVICE_BY[r].tag}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta title={`Ready to book ${s.name}?`} text="Share your concern and Sunaina will guide you to the right session." />
    </>
  );
}
