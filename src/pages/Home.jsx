import { Link } from 'react-router-dom';
import { HealerCard, useUpcoming } from '../components/people';
import Seo from '../components/Seo';
import { Icon } from '../components/Icon';
import { Cta, Faq, Gallery, Marquee, Picture, SectionHead, TestimonialSlider, Video, VideoTestimonials } from '../components/ui';
import { SITE, img } from '../config';
import { GALLERY, SERVICES, TESTIMONIALS, TRIAGE, VIDEOS, faqHome, longDate } from '../data/content';
import { HEALERS } from '../data/healers';

export default function Home() {
  const upcoming = useUpcoming().slice(0, 3);
  return (
    <>
      <Seo
        path="/" noSuffix faq={faqHome}
        title="Sunaina Aggarwal | Energy Healing & Access Bars, Delhi NCR"
        desc="Find calm and clarity with Sunaina Aggarwal — Access Bars facilitator, Pranic healer and counselor in Gurugram and Delhi NCR. Book a 1:1 session today."
      />

      <section className="hero">
        <img src={img('energy-healing-hands-banner.webp')} alt="Two hands reaching toward a glowing ball of healing energy" width="1920" height="1294" fetchpriority="high" />
        <div className="container">
          <div className="hero-inner">
            <span className="eyebrow">EL Healing Centre · Delhi, Gurugram &amp; Online</span>
            <h1>Release What Weighs You Down. Awaken Clarity, Vitality, and Ease.</h1>
            <p className="lead">Step into a safe sanctuary of conscious transformation. Through energetic alignment, subconscious release and personalised counseling, Sunaina Aggarwal guides you out of mental overload and into peace, health and a more easeful life.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/book/">Book Your 1:1 Consultation</Link>
              <Link className="btn btn-ghost" to="/services/">Explore Healing Modalities</Link>
            </div>
            <ul className="hero-badges"><li>20+ years of practice</li><li>Delhi &amp; Gurugram centres</li><li>Trainer &amp; mentor since 2008</li></ul>
          </div>
        </div>
      </section>

      <Marquee items={['Pranic Healing', 'Reiki', 'Access Bars', 'Crystal Healing', 'Counselling', 'Feng Shui', 'Meditation', 'Business Mentoring']} />

      <section>
        <div className="container">
          <div className="split">
            <div className="reveal">
              <span className="eyebrow" style={{ color: 'var(--ember)' }}>The gentle science of healing</span>
              <h2>You don’t have to carry the struggle alone</h2>
              <p>Life can gather invisible baggage: chronic stress, friction in relationships, restless sleep, or tension that check-ups cannot explain. At EL Healing Centre we look at the energetic patterns that keep those blocks in place — and release them gently.</p>
              <p><strong>Transformation doesn’t require endless suffering — ease is your natural state.</strong></p>
              <Link className="btn btn-outline" to="/about-us/">About Sunaina</Link>
            </div>
            <div className="reveal">
              <SectionHead eyebrow="Where are you feeling stuck today?" title="Choose your concern" />
              <div style={{ display: 'grid', gap: 16 }}>
                {TRIAGE.map((t) => (
                  <Link className="card rel" to={`/book/?concern=${t.concern}`} key={t.title} style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <div className="ico" style={{ margin: 0, flex: 'none' }}><Icon name={t.ico} /></div>
                      <div><h3 style={{ marginBottom: 4 }}>{t.title}</h3><p>{t.text}</p><span className="next">{t.next}</span></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="container split">
          <div className="reveal">
            <span className="eyebrow" style={{ color: 'var(--ember)' }}>Meet your healer</span>
            <h2>Sunaina Aggarwal</h2>
            <p className="founder-role">Founder | EL Healing Centre</p>
            <p><strong>ENERGY CHANGER Sunaina Aggarwal.</strong> The name itself speaks volumes — a lady born with divine energies, a true gift. Sunaina is an intuitive healer who has carried the spark of spiritual healing power since childhood. She is a spiritual coach, healer, inspiration and flourishing entrepreneur, running her personalised venture, <em>EL Healing Centre</em>, based in Delhi/Gurugram.</p>
            <p>Based in Delhi &amp; Gurugram, she has guided thousands of clients and students towards clarity and peace.</p>
            <Link className="btn btn-primary" to="/about-us/">More About Her</Link>
          </div>
          <div className="img-frame reveal">
            <Picture file="sunaina-aggarwal-portrait.webp" alt="Sunaina Aggarwal, Pranic healer, Reiki expert and founder of EL Healing Centre in Delhi and Gurugram" w={720} h={900} style={{ maxWidth: 460, marginInline: 'auto' }} />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead eyebrow="Practitioners" title="Who would you like to sit with?" text="Each practitioner keeps their own diary. Open a profile to see their sessions and book a time." />
          <div className="grid g3 hgrid">{HEALERS.slice(0, 3).map((h) => <HealerCard key={h.slug} h={h} />)}</div>
          <p style={{ textAlign: 'center', margin: '40px 0 0' }}>
            <Link className="btn btn-primary" to="/healers/">Meet all {HEALERS.length} practitioners</Link>{' '}
            <Link className="btn btn-outline" to="/book/">Find my session</Link>
          </p>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <SectionHead eyebrow="Find what’s right for you" title="Healing & counseling services" text="Would you like to choose something that ignites enthusiasm within you, that gives you confidence, that creates space to explore? Start with the path that calls to you." />
          <div className="grid g3">
            {['healing', 'counseling', 'energetic-facials'].map((slug) => {
              const s = SERVICES.find((x) => x.slug === slug);
              return (
                <article className="card svc-card reveal" key={slug}>
                  <Picture file={s.img} alt={s.alt} w={1100} h={825} style={s.pos ? { objectPosition: s.pos } : undefined} />
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

      <section>
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
            <div><b className="count" data-to="10">10</b><span>Healing &amp; guidance services</span></div>
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
            {upcoming.length > 0 ? (
              <ul className="checks">
                {upcoming.map((c) => <li key={c.date + c.title}><strong>{longDate(c.date)}, {c.time}</strong> — {c.title}, {c.place}</li>)}
              </ul>
            ) : <p>New classes are announced regularly — message us for the next date.</p>}
            <Link className="btn btn-primary" to="/schedules/">All Schedules</Link>
          </div>
          <div className="img-frame reveal">
            <Picture file="group-healing-class-gurugram.webp" alt="Clients and students at a group healing class at EL Healing Centre, Gurugram" w={1100} h={825} />
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
          <SectionHead eyebrow="Gallery" title="Inside our healing sessions" text="Moments from one-to-one sessions, classes and workshops at our Delhi and Gurugram centres." />
          <Gallery items={GALLERY} />
          <p style={{ textAlign: 'center', margin: '40px 0 0' }}><Link className="btn btn-outline" to="/gallery/">View Full Gallery</Link></p>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <SectionHead eyebrow="Testimonials" title="What clients say" />
          <TestimonialSlider items={TESTIMONIALS} />
          <div style={{ marginTop: 'var(--space-section)' }}>
            <SectionHead eyebrow="Video stories" title="Hear it from our clients" />
            <VideoTestimonials />
          </div>
          <p style={{ textAlign: 'center', margin: '40px 0 0' }}><Link className="btn btn-outline" to="/testimonials/">Read More Testimonials</Link></p>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead eyebrow="Watch" title="Subscribe to our channel" text="Healing talks and guidance from Sunaina Aggarwal." />
          <div className="grid g2">{VIDEOS.map((id, i) => <Video key={id} id={id} n={i + 1} />)}</div>
          <p style={{ textAlign: 'center', margin: '34px 0 0' }}>
            <a className="btn btn-primary" href={SITE.social.youtube} target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
          </p>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <SectionHead eyebrow="Questions" title="Frequently asked questions" />
          <Faq items={faqHome} />
        </div>
      </section>
      <Cta />
    </>
  );
}
