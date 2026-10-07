import { Link } from 'react-router-dom';
import { Fragment, useEffect, useRef, useState } from 'react';
import { SITE, img } from '../config';
import { Icon } from './Icon';

// Tiny inline markup: **bold**, *italic*, [label](/path)
export function Rich({ text }) {
  const parts = String(text).split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((p, i) => {
    let m;
    if ((m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/))) return <Link key={i} to={m[2]}>{m[1]}</Link>;
    if ((m = p.match(/^\*\*([^*]+)\*\*$/))) return <strong key={i}>{m[1]}</strong>;
    if ((m = p.match(/^\*([^*]+)\*$/))) return <em key={i}>{m[1]}</em>;
    return <Fragment key={i}>{p}</Fragment>;
  });
}

export function Crumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map(([label, to], i) => (
        <Fragment key={label}><span>/</span>{to && i < items.length - 1 ? <Link to={to}>{label}</Link> : label}</Fragment>
      ))}
    </nav>
  );
}

export function PageHero({ title, text, crumbs, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        <Crumbs items={crumbs} />
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, text, style }) {
  return (
    <div className="sec-head reveal" style={style}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function Cta({ title = 'Ready to begin your healing journey?', text = 'Book a one-to-one session or ask a question — Sunaina will guide you to the right path.' }) {
  return (
    <section className="cta-sec">
      <div className="container">
        <div className="cta reveal">
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="hero-actions">
            <Link className="btn btn-light" to="/contact-us/">Book a Session</Link>
            <a className="btn btn-ghost" href={`https://wa.me/${SITE.wa}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items }) {
  return (
    <div className="faq reveal">
      {items.map(([q, a]) => (
        <details key={q}><summary>{q}</summary><p>{a}</p></details>
      ))}
    </div>
  );
}

export function Quote({ t }) {
  return (
    <blockquote className="quote reveal" style={{ margin: 0 }}>
      <p>{t.text}</p>
      <footer>
        <span className="avatar" aria-hidden="true">{t.name[0]}</span>
        <span><strong>{t.name}</strong><small>{t.role}</small></span>
      </footer>
    </blockquote>
  );
}

export function ServiceCard({ s }) {
  return (
    <Link className="card rel reveal" to={`/services/${s.slug}/`}>
      <div className="ico"><Icon name={s.ico} /></div>
      <h3>{s.name}</h3>
      <p>{s.tag}</p>
      <span className="more">Learn more →</span>
    </Link>
  );
}

export function Video({ id, n }) {
  return (
    <div className="video reveal">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={`Sunaina Aggarwal healing video ${n}`}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

// Auto-playing testimonial carousel. All slides stay in the HTML (good for SEO); only the active one is shown.
export function TestimonialSlider({ items }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;
  const go = (k) => setI((k + n) % n);

  useEffect(() => {
    if (paused || n < 2) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6500);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <div className="tslider reveal" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="tview">
        <div className="ttrack" style={{ transform: `translateX(-${i * 100}%)` }}>
          {items.map((t, k) => (
            <div className="tslide" key={t.name} aria-hidden={k !== i} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}`}>
              <div className="tcard">
                <blockquote>
                  <p>{t.text}</p>
                  <footer><span className="avatar" aria-hidden="true">{t.name[0]}</span><span><strong>{t.name}</strong><small>{t.role}</small></span></footer>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
      {n > 1 && (
        <div className="tnav">
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous testimonial"><Chevron dir="left" /></button>
          <div className="tdots">
            {items.map((t, k) => <button type="button" key={t.name} aria-label={`Show testimonial ${k + 1}`} aria-current={k === i} onClick={() => go(k)} />)}
          </div>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next testimonial"><Chevron dir="right" /></button>
        </div>
      )}
    </div>
  );
}

export function Marquee({ items }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t) => <span key={t}>{t}</span>)}
        {items.map((t) => <span key={t + '2'}>{t}</span>)}
      </div>
    </div>
  );
}

// Photo gallery with a simple full-screen viewer (click a photo, arrows / Esc to navigate)
export function Gallery({ items }) {
  const [open, setOpen] = useState(-1);
  const n = items.length;

  useEffect(() => {
    if (open < 0) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(-1);
      if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % n);
      if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + n) % n);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, n]);

  return (
    <>
      <div className="gallery">
        {items.map((g, i) => (
          <button type="button" className="g-item reveal" key={g.file} onClick={() => setOpen(i)} aria-label={`Open photo: ${g.alt}`}>
            <img src={img(g.file)} alt={g.alt} width={g.w} height={g.h} loading="lazy" />
          </button>
        ))}
      </div>
      {open >= 0 && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setOpen(-1)}>
          <button type="button" className="lb-close" aria-label="Close" onClick={() => setOpen(-1)}>×</button>
          <button type="button" className="lb-nav lb-prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + n) % n); }}><Chevron dir="left" /></button>
          <img src={img(items[open].file)} alt={items[open].alt} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lb-nav lb-next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % n); }}><Chevron dir="right" /></button>
        </div>
      )}
    </>
  );
}

// One muted, looping video that plays only while it is on screen. Tap the speaker to hear it.
const WIDE_VIDEOS = [3]; // landscape clips: shown letter-boxed inside the portrait card

function ClientVideo({ n }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);
  const base = import.meta.env.BASE_URL + 'assets/video/client-testimonial-' + n;

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    v.muted = true;
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } else v.pause();
    }, { threshold: 0.45 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => { const v = ref.current; v.muted = !v.muted; setMuted(v.muted); if (!v.muted) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } };

  return (
    <div className={'vcard reveal' + (WIDE_VIDEOS.includes(n) ? ' wide' : '')}>
      <video ref={ref} poster={base + '-poster.jpg'} muted loop playsInline autoPlay preload="none" aria-label={`Client video testimonial ${n}`}>
        <source src={base + '.mp4'} type="video/mp4" />
      </video>
      <button type="button" className="vsound" onClick={toggle} aria-label={muted ? 'Turn sound on' : 'Mute video'} aria-pressed={!muted}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 5L6 9H3v6h3l5 4z" />
          {muted ? <path d="M16 9l5 6M21 9l-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
        </svg>
      </button>
    </div>
  );
}

export function VideoTestimonials({ count = 4 }) {
  return (
    <div className="vgrid">
      {Array.from({ length: count }, (_, i) => <ClientVideo key={i} n={i + 1} />)}
    </div>
  );
}

export const Picture = ({ file, alt, w, h, eager, style, className }) => (
  <img src={img(file)} alt={alt} width={w} height={h} loading={eager ? 'eager' : 'lazy'} fetchpriority={eager ? 'high' : undefined} style={style} className={className} />
);
