import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Icon } from '../components/Icon';
import { Cta, Faq, Marquee, Picture, SectionHead, TestimonialSlider, Video } from '../components/ui';
import { SITE, img } from '../config';
import { SERVICES, TESTIMONIALS, VIDEOS, faqHome } from '../data/content';

export default function Home() {
  return (
    <>
      <Seo
        path="/" noSuffix faq={faqHome}
        title="Sunaina Aggarwal | Pranic Healer & Reiki Expert, Delhi NCR"
        desc="Experience transformative healing with Sunaina Aggarwal. Pranic Healing, Reiki, Access Bars, counseling and spiritual wellness in Delhi and Gurugram."
      />

      <section className="hero">
        <img src={img('energy-healing-hands-banner.webp')} alt="Two hands reaching toward a glowing ball of healing energy" width="1920" height="1294" fetchpriority="high" />
        <div className="container">
          <div className="hero-inner">
            <span className="eyebrow">EL Healing Centre · Delhi &amp; Gurugram</span>
            <h1>Energy &amp; Healing<span>Pranic Healer, Reiki Expert &amp; Spiritual Mentor in Delhi NCR</span></h1>
            <p className="lead">Heal yourself with deep analysis of the issue — not just the symptom. Gentle, personalised energy healing and counseling with Sunaina Aggarwal.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/contact-us/">Book a Session</Link>
              <Link className="btn btn-ghost" to="/services/">Explore Services</Link>
            </div>
            <ul className="hero-badges"><li>Practising since 2005</li><li>Trainer &amp; mentor since 2008</li><li>In-person &amp; online</li></ul>
          </div>
        </div>
      </section>

      <Marquee items={['Pranic Healing', 'Reiki', 'Access Bars', 'Crystal Healing', 'Counselling', 'Feng Shui', 'Meditation', 'Business Mentoring']} />

      <section>
        <div className="container">
          <SectionHead eyebrow="Heal yourself" title="Experience the power of healing with deep analysis of the issue" text="True healing begins when we understand what is really going on beneath the surface — in the mind, the emotions and the energy body." />
          <div className="grid g3">
            {[
              ['mind', 'Mind', 'The mind is a beautiful being. Discover how to re-fix your patterns, calm overthinking and build a positive, peaceful mental space through meditation and guidance.'],
              ['heart', 'Mental Health', 'Becoming more aware of the present moment, and truly being in it, can help you enjoy the world around you. Counseling and energy work support emotional balance.'],
              ['leaf', 'Body', 'The body is where your soul lives. It holds stress, emotion and memory. Healing helps release what no longer serves you — so you feel light, rested and well.'],
            ].map(([ic, h, t]) => (
              <article className="card center reveal" key={h}><div className="ico"><Icon name={ic} /></div><h3>{h}</h3><p>{t}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="container split">
          <div className="reveal">
            <span className="eyebrow" style={{ color: 'var(--ember)' }}>Meet your healer</span>
            <h2>Sunaina Aggarwal — Founder, EL Healing Centre</h2>
            <p><strong>ENERGY CHANGER Sunaina Aggarwal.</strong> The name itself speaks volumes — a lady born with divine energies, a true gift. Sunaina is an intuitive healer who has carried the spark of spiritual healing power since childhood. She is a spiritual coach, healer, inspiration and flourishing entrepreneur, running her personalised venture, <em>EL Healing Centre</em>, based in Delhi/Gurugram.</p>
            <p>Based in Delhi &amp; Gurugram, she has guided thousands of clients and students towards clarity and peace.</p>
            <Link className="btn btn-primary" to="/about-us/">More About Her</Link>
          </div>
          <div className="img-frame reveal">
            <Picture file="sunaina-aggarwal-pranic-healer-delhi-gurugram.webp" alt="Sunaina Aggarwal, Pranic healer, Reiki expert and founder of EL Healing Centre in Delhi and Gurugram" w={453} h={529} style={{ maxWidth: 460, marginInline: 'auto' }} />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead eyebrow="Find what’s right for you" title="Healing & counseling services" text="Would you like to choose something that ignites enthusiasm within you, that gives you confidence, that creates space to explore? Start with the path that calls to you." />
          <div className="grid g3">
            {['healing', 'counseling', 'energetic-facials'].map((slug) => {
              const s = SERVICES.find((x) => x.slug === slug);
              return (
                <article className="card svc-card reveal" key={slug}>
                  <Picture file={s.img} alt={s.alt} w={1400} h={933} />
                  <div className="body">
                    <h3>{s.name}</h3><p>{s.tag}</p>
                    <Link className="more" to={`/services/${slug}/`}>Explore {s.name.toLowerCase()}</Link>
                  </div>
                </article>
              );
            })}
          </div>
          <ul className="chip-list" style={{ justifyContent: 'center' }}>
            {['Individual Session', 'Business Consultation', 'Meditation', 'Access Bars', 'Access Body Process', 'Feng Shui', 'Pranic Healing', 'Crystal Healing'].map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </section>

      <section className="alt">
        <div className="container split rev">
          <div className="reveal">
            <span className="eyebrow" style={{ color: 'var(--ember)' }}>Inner balance</span>
            <h2>Align your energy centres, calm your mind</h2>
            <p>Our body holds energy centres — chakras — that respond to stress, emotion and thought. Through guided meditation, breathwork and energy healing, Sunaina helps you clear heaviness, restore balance and reconnect with a quiet, steady centre within.</p>
            <ul className="checks">
              <li>Chakra-balancing energy healing</li>
              <li>Personalised meditation for calm, focus and sleep</li>
              <li>Gentle practices you can continue at home</li>
            </ul>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <Link className="btn btn-primary" to="/services/personalised-meditation/">Personalised Meditation</Link>
              <Link className="btn btn-outline" to="/services/healing/">Energy Healing</Link>
            </div>
          </div>
          <div className="img-stack reveal">
            <Picture file="chakra-meditation-healing.webp" alt="Meditating figure with glowing chakra points along the spine under a golden sun" w={568} h={484} />
            <Picture className="stack-small" file="sunset-lake-meditation.webp" alt="Woman meditating in lotus pose by a calm lake at sunset" w={239} h={210} />
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="container">
          <div className="stats reveal">
            <div><b className="count" data-to="2005">2005</b><span>Healing professionally since</span></div>
            <div><b className="count" data-to="2008">2008</b><span>Training &amp; mentoring since</span></div>
            <div><b className="count" data-to="9">9</b><span>Healing &amp; guidance services</span></div>
            <div><b className="count" data-to="2">2</b><span>Centres: Delhi &amp; Gurugram</span></div>
          </div>
        </div>
      </section>

      <section>
        <div className="container split rev">
          <div className="reveal">
            <span className="eyebrow" style={{ color: 'var(--ember)' }}>There’s a class for everyone</span>
            <h2>Come find yours</h2>
            <p>From Access Bars classes to weekly Bars &amp; Body Process swaps, there is a format that fits every schedule and level.</p>
            <ul className="checks">
              <li><strong>Bars Class</strong> — Gurugram, 10 AM – 6 PM</li>
              <li><strong>Bars &amp; Body Process swaps</strong> — every Thursday, Paschim Vihar, Delhi, 12 – 4 PM</li>
              <li><strong>Every Saturday</strong> — DLF 1, Gurugram, 12 – 4 PM</li>
            </ul>
            <Link className="btn btn-primary" to="/schedules/">All Schedules</Link>
          </div>
          <div className="img-frame reveal">
            <Picture file="group-healing-session-gurugram.webp" alt="Clients relaxing during a group healing session at EL Healing Centre, Gurugram" w={584} h={546} />
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <p className="bigword reveal" aria-hidden="true">HEALING</p>
          <div className="sec-head reveal" style={{ marginBottom: 0 }}>
            <h2>Heal emotional and spiritual pain the natural way</h2>
            <p>Why choose us? Because change can happen in a few minutes, in a single session, within a few sessions. Choose a calm space where your story is heard and your energy is cared for.</p>
            <Link className="btn btn-primary" to="/services/">View All Services</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead eyebrow="Testimonials" title="What clients say" />
          <TestimonialSlider items={TESTIMONIALS} />
          <p style={{ textAlign: 'center', margin: '34px 0 0' }}><Link className="btn btn-outline" to="/testimonials/">Read More Testimonials</Link></p>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <SectionHead eyebrow="Watch" title="Subscribe to our channel" text="Healing talks and guidance from Sunaina Aggarwal." />
          <div className="grid g2">{VIDEOS.map((id, i) => <Video key={id} id={id} n={i + 1} />)}</div>
          <p style={{ textAlign: 'center', margin: '34px 0 0' }}>
            <a className="btn btn-primary" href={SITE.social.youtube} target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead eyebrow="Questions" title="Frequently asked questions" />
          <Faq items={faqHome} />
        </div>
      </section>
      <Cta />
    </>
  );
}
