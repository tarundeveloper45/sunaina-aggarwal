import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { Icon } from '../components/Icon';
import { Avatar } from '../components/people';
import { PageHero } from '../components/ui';
import { SITE } from '../config';
import { CONCERNS, SERVICE_BY } from '../data/content';
import { HEALERS, HEALER_BY, rupees } from '../data/healers';
import { PLACES, addDays, dayInfo, placesOn, prettyDate, slotsFor, toIso } from '../data/availability';

const STEPS = ['Healer', 'Service', 'Date', 'Time', 'Your details'];
const DAYS_SHOWN = 7;
const MAX_DAYS = 56;

const cleanPhone = (v) => v.replace(/[\s()-]/g, '').replace(/^(\+?91|0)/, '');
const phoneOk = (v) => /^[6-9]\d{9}$/.test(cleanPhone(v));
const durationOf = (slug) => { const g = SERVICE_BY[slug] && SERVICE_BY[slug].glance.find(([k]) => k === 'Duration'); return g ? g[1] : ''; };

export default function Book() {
  const [params] = useSearchParams();
  const headRef = useRef(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState({});
  const [pageStart, setPageStart] = useState(0); // first visible day offset
  const [f, setF] = useState({ healer: '', service: '', date: '', place: '', time: '', name: '', phone: '', email: '', notes: '', consent: false });
  const [today, setToday] = useState('');
  const set = (patch) => setF((p) => ({ ...p, ...patch }));

  useEffect(() => { setToday(toIso(new Date())); }, []);

  // Deep links: /book/?healer=slug&service=slug&concern=id
  useEffect(() => {
    const healer = params.get('healer'), service = params.get('service');
    const h = healer && HEALER_BY[healer] ? healer : '';
    const s = service && SERVICE_BY[service] ? service : '';
    setF((p) => ({ ...p, healer: h || p.healer, service: s || p.service }));
    if (h && s && HEALER_BY[h].services.includes(s)) setStep(2);
    else if (h) setStep(1);
    else setStep(0);
  }, [params]);

  const concern = CONCERNS.find((c) => c.id === params.get('concern'));
  const healer = f.healer && f.healer !== 'any' ? HEALER_BY[f.healer] : null;
  const serviceOk = (slug) => !healer || healer.services.includes(slug);
  const services = useMemo(() => {
    const slugs = healer ? healer.services : Object.keys(SERVICE_BY);
    return slugs.filter((s) => SERVICE_BY[s]);
  }, [healer]);
  const suggested = concern ? concern.services : [];
  const healers = f.service && !params.get('healer') ? HEALERS.filter((h) => h.services.includes(f.service)) : HEALERS;
  const fee = healer ? healer.price : 3000;
  const places = f.date ? placesOn(f.date) : [];
  const slots = f.date && f.place ? slotsFor(f.place, f.date) : [];
  const placeShort = (PLACES.find((p) => p.id === f.place) || {}).short || '';

  const go = (n, delay = 0) => {
    const run = () => { setStep(n); setErr({}); setTimeout(() => { if (headRef.current) { headRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); headRef.current.focus({ preventScroll: true }); } }, 40); };
    if (delay) setTimeout(run, delay); else run();
  };

  const pickHealer = (slug) => {
    const h = HEALER_BY[slug];
    const keep = f.service && (!h || h.services.includes(f.service));
    set({ healer: slug, service: keep ? f.service : '' });
    go(keep ? 2 : 1, 320);
  };
  const pickService = (slug) => { set({ service: slug }); go(2, 320); };
  const pickDate = (iso) => {
    const ps = placesOn(iso);
    const place = ps.find((p) => p.id === f.place) ? f.place : (ps[0] || {}).id || '';
    set({ date: iso, place, time: '' });
    go(3, 320);
  };
  const pickPlace = (id) => set({ place: id, time: '' });
  const pickTime = (t) => { set({ time: t }); go(4, 320); };

  const validateDetails = () => {
    const e = {};
    if (!f.name.trim()) e.name = 'Please enter your name.';
    if (!phoneOk(f.phone)) e.phone = 'Enter a valid 10-digit mobile number.';
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'That email does not look right.';
    if (!f.consent) e.consent = 'Please tick to let us contact you about this request.';
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const serviceName = f.service ? SERVICE_BY[f.service].name : '';
  const lines = [
    'Hello EL Healing Centre, I would like to book a session.',
    `Healer: ${healer ? healer.name : 'No preference (please match me)'}`,
    `Service: ${serviceName}`,
    f.date ? `Date: ${prettyDate(f.date)}` : null,
    f.time ? `Time: ${f.time} · ${f.place}` : null,
    `Name: ${f.name}`,
    `Mobile: +91 ${cleanPhone(f.phone)}`,
    f.email ? `Email: ${f.email}` : null,
    f.notes ? `What brings me: ${f.notes}` : null,
  ].filter(Boolean);
  const message = lines.join('\n');
  const waUrl = `https://wa.me/${SITE.wa}?text=${encodeURIComponent(message)}`;

  const sendWhatsApp = (e) => { e.preventDefault(); if (!validateDetails()) return; window.open(waUrl, '_blank', 'noopener'); setDone(true); go(5); };
  const sendEmail = () => { if (!validateDetails()) return; window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Session request – ' + serviceName)}&body=${encodeURIComponent(message)}`; setDone(true); go(5); };

  const Err = ({ k }) => (err[k] ? <p className="bk-err" role="alert">{err[k]}</p> : null);

  const days = [];
  if (today) for (let i = pageStart; i < Math.min(pageStart + DAYS_SHOWN, MAX_DAYS); i += 1) days.push(addDays(today, i));

  const summary = [
    ['With', healer ? healer.name : f.healer === 'any' ? 'We will match you' : '', 0],
    ['Session', serviceName ? `${serviceName}${durationOf(f.service) ? ' · ' + durationOf(f.service) : ''}` : '', 1],
    ['Date', f.date ? prettyDate(f.date) : '', 2],
    ['Time', f.time ? `${f.time} · ${placeShort}` : '', 3],
  ];

  return (
    <>
      <Seo
        path="/book/" title="Book a Healer Online"
        desc="Choose a healer, service, date and time at EL Healing Centre — Pranic Healing, Access Bars, counseling and more in Delhi, Gurugram and online. Book in about a minute."
        crumbs={[['Book a session', '/book/']]}
      />
      <PageHero title="Book your session" text="Five quick steps: choose a healer, a service, a date and a time, then share your details. We confirm every request personally." crumbs={[['Book a session']]} />

      <section>
        <div className="container bk2">
          <div className="bk-main">
            {!done && (
              <ol className="bk-steps" aria-label="Booking progress">
                {STEPS.map((l, i) => (
                  <li key={l} className={(i === step ? 'on ' : '') + (i < step ? 'ok' : '')} aria-current={i === step ? 'step' : undefined}>
                    <button type="button" disabled={i >= step} onClick={() => go(i)} aria-label={`${i < step ? 'Go back to ' : ''}Step ${i + 1}: ${l}`}>
                      <span>{i < step ? '✓' : i + 1}</span><em>{l}</em>
                    </button>
                  </li>
                ))}
              </ol>
            )}

            <div className="bk-card" key={done ? 'done' : step}>
              {concern && !done && step < 2 && <p className="bk-banner">Showing suggestions for <strong>{concern.label.toLowerCase()}</strong> — <Link to="/book/">clear</Link></p>}

              {/* 1 — healer */}
              {step === 0 && !done && (
                <div>
                  <h2 ref={headRef} tabIndex={-1}>1. Select a healer</h2>
                  <p className="bk-sub">Choose who you would like to sit with. You can <Link to="/healers/" target="_blank">read their profiles</Link> first. Not sure? Let us match you.</p>
                  <div className="opt-grid hpick">
                    {healers.map((h) => (
                      <button type="button" key={h.slug} className={'opt hp' + (f.healer === h.slug ? ' on' : '')} onClick={() => pickHealer(h.slug)}>
                        <span className="opt-av"><Avatar h={h} /></span>
                        <span className="opt-t"><b>{h.name}</b><small>{h.role}</small><small>Since {h.since} · from {rupees(h.price)}</small></span>
                      </button>
                    ))}
                    {healers.length === 0 && <p className="bk-hint" style={{ gridColumn: '1 / -1' }}>No practitioner is listed for this service yet — choose “Match me” and we will arrange the right person.</p>}
                    <button type="button" className={'opt hp' + (f.healer === 'any' ? ' on' : '')} onClick={() => pickHealer('any')}>
                      <span className="opt-ico"><Icon name="spark" /></span>
                      <span className="opt-t"><b>Match me with a healer</b><small>We will suggest the right person for your concern</small></span>
                    </button>
                  </div>
                </div>
              )}

              {/* 2 — service */}
              {step === 1 && !done && (
                <div>
                  <h2 ref={headRef} tabIndex={-1}>2. Select a service</h2>
                  <p className="bk-sub">{healer ? <>What you can book with <strong>{healer.name}</strong>.</> : 'Choose the session you would like.'}</p>
                  <div className="opt-grid">
                    {services.map((slug) => {
                      const s = SERVICE_BY[slug];
                      return (
                        <button type="button" key={slug} className={'opt hp' + (f.service === slug ? ' on' : '')} onClick={() => pickService(slug)}>
                          <span className="opt-ico"><Icon name={s.ico} /></span>
                          <span className="opt-t">
                            <b>{s.name}{suggested.includes(slug) && <i className="rec"> · Suggested for you</i>}</b>
                            <small>{durationOf(slug)} · from {rupees(fee)}</small>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3 — date */}
              {step === 2 && !done && (
                <div>
                  <h2 ref={headRef} tabIndex={-1}>3. Select a date</h2>
                  <p className="bk-sub">When suits you for <strong>{serviceName}</strong>?</p>
                  <div className="day-nav">
                    <button type="button" className="linkbtn" disabled={pageStart === 0} onClick={() => setPageStart(Math.max(0, pageStart - DAYS_SHOWN))}>← Earlier</button>
                    <span>{days.length ? `${prettyDate(days[0])} onwards` : ''}</span>
                    <button type="button" className="linkbtn" disabled={pageStart + DAYS_SHOWN >= MAX_DAYS} onClick={() => setPageStart(pageStart + DAYS_SHOWN)}>Later →</button>
                  </div>
                  <div className="day-strip" role="group" aria-label="Choose a date">
                    {days.map((iso) => {
                      const d = dayInfo(iso);
                      return (
                        <button type="button" key={iso} className={'day' + (f.date === iso ? ' on' : '')} aria-pressed={f.date === iso} onClick={() => pickDate(iso)}>
                          <small>{d.weekday}</small><b>{d.day}</b><small>{d.month}</small>
                        </button>
                      );
                    })}
                  </div>
                  <p className="bk-hint">Gurugram: Mon – Sat · Delhi: Thursdays · Online: every day.</p>
                </div>
              )}

              {/* 4 — time */}
              {step === 3 && !done && (
                <div>
                  <h2 ref={headRef} tabIndex={-1}>4. Select a time</h2>
                  <p className="bk-sub">{prettyDate(f.date)} — where would you like to meet?</p>
                  <div className="chips-row" role="group" aria-label="Where">
                    {places.map((p) => (
                      <button type="button" key={p.id} className={'pick' + (f.place === p.id ? ' on' : '')} aria-pressed={f.place === p.id} onClick={() => pickPlace(p.id)}>
                        <b>{p.short}</b><small>{p.note}</small>
                      </button>
                    ))}
                  </div>
                  {slots.length > 0 ? (
                    <div className="time-grid" role="group" aria-label="Choose a time">
                      {slots.map((t) => <button type="button" key={t} className={'time' + (f.time === t ? ' on' : '')} aria-pressed={f.time === t} onClick={() => pickTime(t)}>{t}</button>)}
                    </div>
                  ) : (
                    <p className="bk-hint">No more times are available for this place today. <button type="button" className="linkbtn" onClick={() => go(2)}>Choose another date</button>.</p>
                  )}
                  <p className="bk-hint">This is a request — we confirm the exact slot with you on WhatsApp.</p>
                </div>
              )}

              {/* 5 — details */}
              {step === 4 && !done && (
                <form onSubmit={sendWhatsApp} noValidate>
                  <h2 ref={headRef} tabIndex={-1}>5. Your details</h2>
                  <p className="bk-sub">Almost there. Tell us who the session is for.</p>
                  <div className="row2">
                    <div className="field"><label htmlFor="bk-name">Your name</label><input id="bk-name" value={f.name} autoComplete="name" onChange={(e) => set({ name: e.target.value })} /><Err k="name" /></div>
                    <div className="field"><label htmlFor="bk-phone">Mobile number</label><input id="bk-phone" type="tel" inputMode="tel" placeholder="98XXXXXXXX" value={f.phone} autoComplete="tel" onChange={(e) => set({ phone: e.target.value })} /><Err k="phone" /></div>
                  </div>
                  <div className="field"><label htmlFor="bk-email">Email <span className="opt-label">(optional)</span></label><input id="bk-email" type="email" value={f.email} autoComplete="email" onChange={(e) => set({ email: e.target.value })} /><Err k="email" /></div>
                  <div className="field"><label htmlFor="bk-notes">What brings you here? <span className="opt-label">(optional)</span></label><textarea id="bk-notes" rows="3" value={f.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="Share as much or as little as you like." /></div>
                  <label className="check"><input type="checkbox" checked={f.consent} onChange={(e) => set({ consent: e.target.checked })} /> I agree to be contacted on this number about my request.</label>
                  <Err k="consent" />
                  <div className="bk-send">
                    <button type="submit" className="btn btn-primary">Confirm on WhatsApp</button>
                    <button type="button" className="btn btn-outline" onClick={sendEmail}>Send by email instead</button>
                  </div>
                  <p className="bk-hint">No online payment. Pressing confirm opens WhatsApp with your request ready — just press send, and we will confirm your slot personally.</p>
                </form>
              )}

              {/* done */}
              {done && (
                <div className="bk-done">
                  <div className="done-ico" aria-hidden="true">✓</div>
                  <h2 ref={headRef} tabIndex={-1}>Your request is ready to send</h2>
                  <p>Press <strong>send</strong> in the WhatsApp chat and our team will reply personally to confirm your slot{f.place.startsWith('Online') ? ' and share your video link' : ''}.</p>
                  <dl className="bk-sum">
                    <div><dt>With</dt><dd>{healer ? healer.name : 'We will match you'}</dd><span /></div>
                    <div><dt>Session</dt><dd>{serviceName}</dd><span /></div>
                    <div><dt>When</dt><dd>{prettyDate(f.date)}, {f.time} · {f.place}</dd><span /></div>
                    <div><dt>You</dt><dd>{f.name} · +91 {cleanPhone(f.phone)}</dd><span /></div>
                  </dl>
                  <div className="bk-send" style={{ justifyContent: 'center' }}>
                    <a className="btn btn-primary" href={waUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp again</a>
                    <Link className="btn btn-outline" to="/healers/">Browse healers</Link>
                  </div>
                  <p className="bk-hint">Need to change something? <button type="button" className="linkbtn" onClick={() => { setDone(false); go(4); }}>Edit your request</button></p>
                </div>
              )}

              {!done && step > 0 && (
                <div className="bk-nav">
                  <button type="button" className="btn btn-outline" onClick={() => go(step - 1)}>← Back</button>
                  <span />
                </div>
              )}
            </div>
          </div>

          {/* running summary */}
          {!done && (
            <aside className="bk-aside" aria-label="Your booking">
              <h3>Your booking</h3>
              <dl>
                {summary.map(([k, v, s]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd className={v ? '' : 'empty'}>{v || 'Not chosen yet'}</dd>
                    {v && step > s && <button type="button" className="linkbtn" onClick={() => go(s)}>Change</button>}
                  </div>
                ))}
                <div className="total"><dt>Total</dt><dd>from {rupees(fee)}</dd></div>
              </dl>
              <p className="bk-hint">{step < 4 ? 'Make your choice and we will take you to the next step.' : 'Fill in your details and confirm to send your request.'}</p>
            </aside>
          )}
        </div>
        <p className="bk-foot">Prefer to talk? Call <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a> or <a href={`https://wa.me/${SITE.wa}`} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>. Healing and counseling are complementary practices and not a substitute for medical care.</p>
      </section>
    </>
  );
}
