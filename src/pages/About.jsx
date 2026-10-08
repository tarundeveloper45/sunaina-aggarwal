import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Icon } from '../components/Icon';
import { Cta, PageHero, Picture, SectionHead } from '../components/ui';
import { SITE, abs } from '../config';

const METHODS = [
  ['hands', 'Pranic Healing', 'No-touch energy cleansing to restore balance to the body’s energy field.'],
  ['gem', 'Crystal Healing', 'Using the vibration of natural crystals to clear and re-align the energy centres.'],
  ['bars', 'Access Consciousness', 'Certified Access Bars and Body Process facilitation for deep relaxation and letting go.'],
  ['chat', 'Psychotherapy & Counseling', 'Supportive conversation to understand patterns, relationships and life decisions.'],
  ['home', 'Feng Shui', 'Harmonising homes and workplaces so that energy supports prosperity and peace.'],
  ['lotus', 'Arhatic Yoga & Meditation', 'Personalised meditations and breath practices for calm, clarity and spiritual growth.'],
];

export default function About() {
  return (
    <>
      <Seo
        path="/about-us/" title="About Sunaina Aggarwal – Healer & Mentor" crumbs={[['About Us', '/about-us/']]}
        desc="Meet Sunaina Aggarwal, Pranic Healing instructor, Access Consciousness facilitator, trainer and mentor helping people heal since 2005 in Delhi and Gurugram."
        schema={[{ '@type': 'Person', '@id': SITE.domain + '/#sunaina', name: SITE.person, jobTitle: 'Pranic Healer & Spiritual Mentor', worksFor: { '@id': SITE.domain + '/#business' }, url: abs('/about-us/'), knowsAbout: ['Pranic Healing', 'Crystal Healing', 'Access Bars', 'Feng Shui', 'Psychotherapy', 'Arhatic Yoga'] }]}
      />
      <PageHero title="About Sunaina Aggarwal" text="Healer, trainer, mentor and guide — helping people find balance in health, relationships, business and spirit." crumbs={[['About Us']]} />

      <section>
        <div className="container split">
          <div className="reveal">
            <h2>Want to know about her?</h2>
            <p className="lead">Sunaina Aggarwal is an Access Consciousness certified facilitator, Pranic Healing practitioner, Feng Shui consultant and business mentor based in the National Capital Region. Her practice rests on one belief: healing should be gentle, empowering and evident in the quality of your daily life.</p>
            <p>Sunaina started healing as a child. Professionally, she began her career in 2005 and there has been no looking back. She has learned and practised <strong>Pranic Healing, Crystal Healing, Psychotherapy</strong> and <strong>Arhatic Yoga</strong>, and is a former Pranic Healing instructor. Since 2008 she has been a trainer, mentor and guide, changing the lives of many people for the better.</p>
            <p>Her experience spans health healing, relationship healing, mental wellbeing, business healing and spiritual growth. When people felt lost, they came to her to find direction through the help of energies. When people struggled with jobs or business problems, she supported them through healing and her Feng Shui expertise. Many clients have shared how relationship energy shifted for the better after working with her.</p>
            <p>Today she is a healer for health as well as a facilitator, trainer and mentor for students who wish to learn these healing arts themselves.</p>
            <Link className="btn btn-primary" to="/book/">Book a Session</Link>{' '}
            <Link className="btn btn-outline" to="/healers/">Meet our healers</Link>
          </div>
          <div className="img-frame reveal">
            <Picture file="sunaina-aggarwal-portrait.webp" alt="Sunaina Aggarwal, Pranic healer and founder of EL Healing Centre in Delhi and Gurugram" w={720} h={900} style={{ maxWidth: 460, marginInline: 'auto' }} />
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="container">
          <div className="stats reveal">
            <div><b className="count" data-to="20" data-suffix="+">20+</b><span>Years of healing practice</span></div>
            <div><b className="count" data-to="2008">2008</b><span>Teaching since</span></div>
            <div><b className="count" data-to="6">6</b><span>Healing disciplines</span></div>
            <div><b>1:1</b><span>Personalised sessions</span></div>
          </div>
        </div>
      </section>

      <section>
        <div className="container split rev">
          <div className="reveal">
            <span className="eyebrow" style={{ color: 'var(--ember)' }}>Healing circles</span>
            <h2>Learning and healing together</h2>
            <p>Alongside one-to-one sessions, Sunaina runs regular classes and healing circles in Gurugram and Delhi, where students and clients practise Access Bars, the Body Process and meditation together.</p>
            <Link className="btn btn-outline" to="/schedules/">See Schedules</Link>
          </div>
          <div className="img-frame reveal">
            <Picture file="access-bars-workshop-gurugram.webp" alt="Students and clients during an Access Bars workshop with Sunaina Aggarwal in Gurugram" w={1100} h={825} />
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <SectionHead eyebrow="Training & practice" title="Certified, hands-on and personal" text="Sunaina trains and certifies students in Access Bars and guides one-to-one sessions with care." />
          <div className="cert-grid">
            <figure className="reveal"><Picture file="access-bars-practitioner-certificate.webp" alt="Access Bars Practitioner certificate presentation at EL Healing Centre" w={720} h={1280} /><figcaption>Access Bars Practitioner certification</figcaption></figure>
            <figure className="reveal"><Picture file="access-bars-practitioner-certificate-class.webp" alt="Student receiving an Access Bars Practitioner certificate from Sunaina Aggarwal" w={1100} h={825} /><figcaption>Certificate after an Access Bars class</figcaption></figure>
            <figure className="reveal"><Picture file="counseling-session-sunaina-aggarwal.webp" alt="Sunaina Aggarwal in a one-to-one counseling session" w={720} h={1280} style={{ objectPosition: '50% 30%' }} /><figcaption>One-to-one counseling session</figcaption></figure>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead eyebrow="Her practice" title="Healing methods Sunaina practises" />
          <div className="grid g3">
            {METHODS.map(([ic, h, t]) => (
              <div className="card reveal" key={h}><div className="ico"><Icon name={ic} /></div><h3>{h}</h3><p>{t}</p></div>
            ))}
          </div>
        </div>
      </section>
      <Cta title="Let’s talk about what you need" text="Share your concern and Sunaina will suggest the most suitable session for you." />
    </>
  );
}
