import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SITE, img, MENU_SERVICES } from '../config';
import { SERVICE_BY } from '../data/content';
import { Icon, WhatsAppIcon, SOCIAL_ICONS } from './Icon';

const NAV = [
  { t: 'Home', to: '/' },
  { t: 'About Us', to: '/about-us/', menu: [['About Sunaina', '/about-us/'], ['Photo Gallery', '/gallery/']], match: ['/about-us', '/gallery'] },
  { t: 'Healers', to: '/healers/' },
  { t: 'Services', to: '/services/', menu: 'services', match: ['/services'] },
  { t: 'Schedules', to: '/schedules/' },
  { t: 'Testimonials', to: '/testimonials/' },
  { t: 'Blog', to: '/blog/' },
  { t: 'Contact Us', to: '/contact-us/' },
];
const SERVICE_MENU = MENU_SERVICES.map((slug) => SERVICE_BY[slug]);
const logo = img('el-healing-centre-logo.webp');

function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); setSub(''); document.body.style.overflow = ''; }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setSub(''); document.body.style.overflow = ''; } };
    document.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('scroll', onScroll); document.removeEventListener('keydown', onKey); };
  }, []);

  const toggle = () => { const n = !open; setOpen(n); document.body.style.overflow = n ? 'hidden' : ''; };

  return (
    <header className={'site-header' + (scrolled ? ' scrolled' : '')}>
      <div className="container nav-wrap">
        <Link className="logo" to="/" aria-label={`${SITE.brand} – ${SITE.person} home`}>
          <img src={logo} alt="EL Healing Centre – Sunaina Aggarwal logo" width="500" height="138" />
        </Link>
        <button className="burger" aria-label="Open menu" aria-expanded={open} aria-controls="site-nav" onClick={toggle}>
          <span /><span /><span />
        </button>
        <nav className={'nav' + (open ? ' open' : '')} id="site-nav" aria-label="Main">
          <ul>
            {NAV.map((n) => {
              if (!n.menu) {
                return <li key={n.t}><NavLink className={({ isActive }) => 'nl' + (isActive ? ' active-link' : '')} to={n.to} end={n.to === '/'}>{n.t}</NavLink></li>;
              }
              const items = n.menu === 'services'
                ? [['All Services', '/services/'], ...SERVICE_MENU.map((x) => [x.name, `/services/${x.slug}/`])]
                : n.menu;
              const active = n.match.some((m) => pathname.startsWith(m));
              return (
                <li key={n.t} className={'has-sub' + (sub === n.t ? ' open' : '') + (active ? ' active' : '')}>
                  <button className="nl" type="button" aria-expanded={sub === n.t} aria-haspopup="true" onClick={() => setSub(sub === n.t ? '' : n.t)}>
                    {n.t}
                    <svg className="caret" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l4 4 4-4" /></svg>
                  </button>
                  <ul className="dropdown">
                    {items.map(([label, to]) => <li key={to}><Link to={to}>{label}</Link></li>)}
                  </ul>
                </li>
              );
            })}
          </ul>
          <Link className="btn btn-primary" to="/book/">Book Now</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const socials = Object.entries(SITE.social).filter(([, v]) => v);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-grid">
          <div>
            <Link className="foot-logo" to="/"><img src={logo} alt="EL Healing Centre logo" width="500" height="138" loading="lazy" /></Link>
            <p>A circle of experienced healers offering Pranic healing, Access Bars, counseling and spiritual guidance in Delhi &amp; Gurugram — and online. Founded by {SITE.person}.</p>
            {socials.length > 0 && (
              <div className="socials">
                {socials.map(([k, v]) => <a key={k} href={v} target="_blank" rel="noopener noreferrer" aria-label={k}>{SOCIAL_ICONS[k]}</a>)}
              </div>
            )}
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li><li><Link to="/about-us/">About Us</Link></li><li><Link to="/healers/">Our Healers</Link></li><li><Link to="/book/">Book a Session</Link></li><li><Link to="/schedules/">Schedules</Link></li><li><Link to="/gallery/">Gallery</Link></li>
              <li><Link to="/testimonials/">Testimonials</Link></li><li><Link to="/blog/">Blog</Link></li><li><Link to="/contact-us/">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {['healing', 'pranic-healing', 'access-bars', 'counseling', 'feng-shui-home-office', 'business-mentoring'].map((s) => (
                <li key={s}><Link to={`/services/${s}/`}>{SERVICE_BY[s].name.replace(' For Home And Office', '')}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              {SITE.locs.map((l) => <li key={l.name}><strong style={{ color: '#fff' }}>{l.name}:</strong> {l.street}, {l.locality} {l.postal}</li>)}
            </ul>
            <Link className="btn btn-primary" style={{ marginTop: 10 }} to="/contact-us/">Get in Touch</Link>
          </div>
        </div>
        <p className="disclaimer">Energy healing, Access Bars and counseling are complementary wellness practices. They are not a substitute for medical diagnosis, treatment or emergency care. Always consult a qualified doctor for medical conditions.</p>
        <div className="copy"><span>© {new Date().getFullYear()} sunainaaggarwal.com — All rights reserved.</span><span><Link to="/contact-us/">Privacy &amp; enquiries</Link></span></div>
      </div>
    </footer>
  );
}

function Floating() {
  return (
    <div className="float">
      <a className="wa" href={`https://wa.me/${SITE.wa}?text=Hello%20Sunaina%2C%20I%20would%20like%20to%20know%20more%20about%20your%20healing%20sessions.`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><WhatsAppIcon /></a>
      <a className="tel" href={`tel:${SITE.phoneRaw}`} aria-label="Call now"><Icon name="phone" /></a>
    </div>
  );
}

// Scroll to top (or to #hash) on navigation, fade-in elements as they enter the viewport,
// count up numbers, and drive the scroll progress bar / hero parallax / back-to-top button.
function PageEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = document.querySelectorAll('.reveal:not(.in)');
    const show = (el) => { el.classList.add('in'); setTimeout(() => el.classList.add('done'), 1300); };
    let io;
    if (!('IntersectionObserver' in window) || reduce) items.forEach(show);
    else {
      io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      items.forEach((i) => io.observe(i));
    }

    // count-up numbers
    let co;
    const counters = document.querySelectorAll('.count[data-to]');
    if ('IntersectionObserver' in window && !reduce) {
      co = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        const el = e.target, to = +el.dataset.to, suf = el.dataset.suffix || '', t0 = performance.now(), dur = 1600;
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1), v = Math.round(to * (1 - Math.pow(1 - p, 3)));
          el.textContent = v + suf;
          if (p < 1) requestAnimationFrame(tick);
        };
        el.textContent = '0' + suf;
        requestAnimationFrame(tick);
      }), { threshold: 0.6 });
      counters.forEach((c) => co.observe(c));
    }
    return () => { if (io) io.disconnect(); if (co) co.disconnect(); };
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const top = document.querySelector('.to-top');
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY, max = root.scrollHeight - window.innerHeight;
      root.style.setProperty('--p', max > 0 ? Math.min(y / max, 1).toFixed(4) : 0);
      root.style.setProperty('--py', (y < 1400 ? y * 0.22 : 0).toFixed(1) + 'px');
      root.style.setProperty('--bgy', (40 + (y % 3000) / 60).toFixed(1) + '%');
      if (top) top.classList.toggle('show', y > 700);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return null;
}

function ScrollUI() {
  return (
    <>
      <div className="progress" aria-hidden="true" />
      <button className="to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6" /></svg>
      </button>
    </>
  );
}

export default function Layout() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <Floating />
      <ScrollUI />
      <PageEffects />
    </>
  );
}
