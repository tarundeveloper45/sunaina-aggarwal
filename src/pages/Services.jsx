import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Cta, PageHero, SectionHead, ServiceCard } from '../components/ui';
import { SERVICES } from '../data/content';

export default function Services() {
  return (
    <>
      <Seo
        path="/services/" title="Healing & Counseling Services Delhi" crumbs={[['Services', '/services/']]}
        desc="Explore Pranic Healing, Access Bars, counseling, astrology, tarot, numerology, Feng Shui and business mentoring at EL Healing Centre in Delhi NCR."
      />
      <PageHero title="Our Services" text="Healing, counselling and guidance for mind, body, home and business. Choose the path that calls to you." crumbs={[['Services']]} />
      <section>
        <div className="container">
          <div className="grid g3">{SERVICES.map((s) => <ServiceCard key={s.slug} s={s} />)}</div>
        </div>
      </section>
      <section className="alt">
        <div className="container">
          <SectionHead eyebrow="Not sure where to start?" title="Which session is right for me?" />
          <ol className="steps reveal">
            <li><h3>Stressed or drained</h3><p>Start with <Link to="/services/healing/">Healing</Link> or <Link to="/services/access-bars/">Access Bars</Link>.</p></li>
            <li><h3>Restless mind</h3><p>Try <Link to="/services/personalised-meditation/">personalised meditation</Link>.</p></li>
            <li><h3>Life or relationship decisions</h3><p>Book <Link to="/services/counseling/">counselling</Link> for clarity.</p></li>
            <li><h3>Business or space feels stuck</h3><p>See <Link to="/services/business-mentoring/">business mentoring</Link> and <Link to="/services/feng-shui-home-office/">Feng Shui</Link>.</p></li>
          </ol>
        </div>
      </section>
      <Cta />
    </>
  );
}
