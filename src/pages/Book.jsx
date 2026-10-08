import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { Icon } from '../components/Icon';
import { Avatar, todayIso } from '../components/people';
import { PageHero } from '../components/ui';
import { SITE } from '../config';
import { CONCERNS, SERVICES, SERVICE_BY, longDate } from '../data/content';
import { HEALERS, HEALER_BY, rupees } from '../data/healers';

const STEP_LABELS = ['Service', 'Healer & place', 'Date & time', 'Your details', 'Confirm'];

const CENTRES = [
  { id: 'Gurugram – DLF Phase 1', title: 'Gurugram', sub: 'DLF Phase 1 · Mon–Sat, 10 am – 6 pm', times: ['10:00 am', '11:00 am', '12:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm'] },
  { id: 'Delhi – Paschim Vihar', title: 'Delhi', sub: 'Paschim Vihar · Thursdays, 12 – 4 pm', times: ['12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm'] },
  { id: 'Online (video call)', title: 'Online', sub: 'Counselling, meditation, distance healing · link sent on confirmation', times: ['10:00 am', '11:00 am', '12:00 pm', '2:00 pm', '4:00 pm', '5:00 pm', '7:00 pm'] },
];

const tomorrowIso = () => { const t = new Date(); t.setDate(t.getDate() + 1); return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`; };
const weekdayOf = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); };
const cleanPhone = (v) => v.replace(/[\s()-]/g, '').replace(/^(\+?91|0)/, '');
const phoneOk = (v) => /^[6-9]\d{9}$/.test(cleanPhone(v));

export default function Book() {
  const [params] = useSearchParams();
  const topRef = useRef(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState({});
  const [f, setF] = useState({
    concern: '', service: '', healer: 'any', centre: '', date: '', time: '', flexible: false,
    name: '', phone: '', email: '', notes: '', consent: false,
  });
  const set = (k, v) => { setF((p) => ({ ...p, [k]: v })); setErr((e) => ({ ...e, [k]: undefined })); };

  // Pre-fill from links like /book/?service=access-bars&healer=amol-kunte&concern=mind
  useEffect(() => {
    const service = params.get('service'), healer = params.get('healer'), concern = params.get('concern');
    setF((p) => ({
      ...p,
      service: service && SERVICE_BY[service] ? service : p.service,
      healer: healer && HEALER_BY[healer] ? healer : p.healer,
      concern: concern && CONCERNS.some((c) => c.id === concern) ? concern : p.concern,
    }));
    if (healer && HEALER_BY[healer] && !service) setStep(0);
  }, [params]);

  const recommended = useMemo(() => (CONCERNS.find((c) => c.id === f.concern) || { services: [] }).services, [f.concern]);
  const eligible = useMemo(() => (f.service && f.service !== 'unsure' ? HEALERS.filter((h) => h.services.includes(f.service)) : HEALERS), [f.service]);
  const centre = CENTRES.find((c) => c.id === f.centre);
  const healer = f.healer !== 'any' ? HEALER_BY[f.healer] : null;
  const serviceName = f.service === 'unsure' ? 'Not sure yet — please suggest' : f.service ? SERVICE_BY[f.service].name : '';
  const fee = healer ? healer.price : 3000;

  // if the chosen healer does not offer the chosen service, reset to "no preference"
  useEffect(() => { if (f.healer !== 'any' && f.service && f.service !== 'unsure' && !HEALER_BY[f.healer].services.includes(f.service)) set('healer', 'any'); }, [f.service]); // eslint-disable-line react-hooks/exhaustive-deps

  const dateNote = (() => {
    if (!f.date || !centre) return '';
    const wd = weekdayOf(f.date);
    if (centre.title === 'Delhi' && wd !== 4) return 'Delhi sessions are usually on Thursdays (12 – 4 pm). We will offer the closest available slot.';
    if (centre.title === 'Gurugram' && wd === 0) return 'Sunday is by special request — we will confirm if it is possible.';
    return '';
  })();

  const validate = (s) => {
    const e = {};
    if (s === 0 && !f.service) e.service = 'Please choose a service (or “Not sure yet”).';
    if (s === 1 && !f.centre) e.centre = 'Please choose where you would like to meet.';
    if (s === 2 && !f.flexible) {
      if (!f.date) e.date = 'Pick a preferred date, or tick “I’m flexible”.';
      else if (f.date < tomorrowIso()) e.date = 'Please choose a future date.';
      if (f.date && !f.time) e.time = 'Pick a preferred time.';
    }
    if (s === 3) {
      if (!f.name.trim()) e.name = 'Please enter your name.';
      if (!phoneOk(f.phone)) e.phone = 'Enter a valid 10-digit mobile number.';
      if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'That email does not look right.';
      if (!f.consent) e.consent = 'Please tick to let us contact you about this request.';
    }
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const go = (n) => { setStep(n); setTimeout(() => topRef.current && topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30); };
  const next = () => { if (validate(step)) go(step + 1); };

  const when = f.flexible ? 'Flexible — please suggest a time' : f.date ? `${longDate(f.date)}, ${f.time}` : '';
  const lines = [
    'Hello EL Healing Centre, I would like to book a session.',
    `Service: ${serviceName}`,
    `Healer: ${healer ? healer.name : 'No preference (please match me)'}`,
    `Centre: ${f.centre}`,
    `Preferred time: ${when}`,
    `Name: ${f.name}`,
    `Mobile: +91 ${cleanPhone(f.phone)}`,
    f.email ? `Email: ${f.email}` : null,
    f.notes ? `What brings me: ${f.notes}` : null,
  ].filter(Boolean);
  const message = lines.join('\n');

  const sendWhatsApp = () => { window.open(`https://wa.me/${SITE.wa}?text=${encodeURIComponent(message)}`, '_blank', 'noopener'); setDone(true); go(5); };
  const sendEmail = () => { window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Session request – ' + serviceName)}&body=${encodeURIComponent(message)}`; setDone(true); go(5); };

  const Err = ({ k }) => (err[k] ? <p className="bk-err" role="alert">{err[k]}</p> : null);

  return (
    <>
      <Seo
        path="/book/" title="Book a Healing Session Online"
        desc="Book Pranic Healing, Access Bars, counseling, Feng Shui or mentoring with Sunaina Aggarwal and the EL Healing Centre team in Delhi and Gurugram — in about a minute."
        crumbs={[['Book a session', '/book/']]}
      />
      <PageHero title="Book your session" text="Choose a service, a healer and a time. We confirm every request personally on WhatsApp." crumbs={[['Book a session']]} />

      <section>
        <div className="container bk" ref={topRef}>
          {!done && (
            <ol className="bk-steps" aria-label="Booking progress">
              {STEP_LABELS.map((l, i) => (
                <li key={l} className={(i === step ? 'on ' : '') + (i < step ? 'ok' : '')} aria-current={i === step ? 'step' : undefined}>
                  <span>{i < step ? '✓' : i + 1}</span><em>{l}</em>
                </li>
              ))}
            </ol>
          )}

          <div className="bk-card">
            {/* STEP 0 — service */}
            {step === 0 && !done && (
              <div>
                <h2>What would you like to book?</h2>
                <p className="bk-sub">Not sure where to start? Tell us what brings you here and we will point you to the right sessions.</p>
                <div className="chips-pick" role="group" aria-label="What brings you here">
                  {CONCERNS.map((c) => (
                    <button type="button" key={c.id} className={'pick' + (f.concern === c.id ? ' on' : '')} aria-pressed={f.concern === c.id} onClick={() => set('concern', f.concern === c.id ? '' : c.id)}>
                      <b>{c.label}</b><small>{c.hint}</small>
                    </button>
                  ))}
                </div>
                <fieldset className="bk-fs">
                  <legend>Choose a service</legend>
                  <div className="opt-grid">
                    {SERVICES.map((s) => (
                      <label className={'opt' + (f.service === s.slug ? ' on' : '')} key={s.slug}>
                        <input type="radio" name="service" value={s.slug} checked={f.service === s.slug} onChange={() => set('service', s.slug)} />
                        <span className="opt-ico"><Icon name={s.ico} /></span>
                        <span className="opt-t"><b>{s.name}</b>{recommended.includes(s.slug) && <i className="rec">Suggested for you</i>}</span>
                      </label>
                    ))}
                    <label className={'opt' + (f.service === 'unsure' ? ' on' : '')}>
                      <input type="radio" name="service" value="unsure" checked={f.service === 'unsure'} onChange={() => set('service', 'unsure')} />
                      <span className="opt-ico"><Icon name="spark" /></span>
                      <span className="opt-t"><b>Not sure yet</b><small>We will suggest the right session</small></span>
                    </label>
                  </div>
                  <Err k="service" />
                </fieldset>
              </div>
            )}

            {/* STEP 1 — healer + centre */}
            {step === 1 && !done && (
              <div>
                <h2>Who would you like to sit with, and where?</h2>
                <fieldset className="bk-fs">
                  <legend>Healer</legend>
                  <div className="opt-grid">
                    <label className={'opt' + (f.healer === 'any' ? ' on' : '')}>
                      <input type="radio" name="healer" value="any" checked={f.healer === 'any'} onChange={() => set('healer', 'any')} />
                      <span className="opt-ico"><Icon name="spark" /></span>
                      <span className="opt-t"><b>No preference</b><small>We will match you with the right person</small></span>
                    </label>
                    {eligible.map((h) => (
                      <label className={'opt' + (f.healer === h.slug ? ' on' : '')} key={h.slug}>
                        <input type="radio" name="healer" value={h.slug} checked={f.healer === h.slug} onChange={() => set('healer', h.slug)} />
                        <span className="opt-av"><Avatar h={h} /></span>
                        <span className="opt-t"><b>{h.name}</b><small>{h.role} · from {rupees(h.price)}</small></span>
                      </label>
                    ))}
                  </div>
                  <p className="bk-hint">Want to know more first? <Link to="/healers/" target="_blank">See all profiles</Link>.</p>
                </fieldset>
                <fieldset className="bk-fs">
                  <legend>Where</legend>
                  <div className="opt-grid three">
                    {CENTRES.map((c) => (
                      <label className={'opt' + (f.centre === c.id ? ' on' : '')} key={c.id}>
                        <input type="radio" name="centre" value={c.id} checked={f.centre === c.id} onChange={() => { set('centre', c.id); set('time', ''); }} />
                        <span className="opt-ico"><Icon name={c.title === 'Online' ? 'phone' : 'pin'} /></span>
                        <span className="opt-t"><b>{c.title}</b><small>{c.sub}</small></span>
                      </label>
                    ))}
                  </div>
                  <Err k="centre" />
                </fieldset>
              </div>
            )}

            {/* STEP 2 — date + time */}
            {step === 2 && !done && (
              <div>
                <h2>When would you like to come?</h2>
                <p className="bk-sub">Pick a preferred day and time. This is a request — we confirm the exact slot with you on WhatsApp.</p>
                <div className="field">
                  <label htmlFor="bk-date">Preferred date</label>
                  <input id="bk-date" type="date" min={tomorrowIso()} value={f.date} disabled={f.flexible} onChange={(e) => set('date', e.target.value)} />
                  <Err k="date" />
                  {dateNote && <p className="bk-hint">{dateNote}</p>}
                </div>
                <fieldset className="bk-fs" disabled={f.flexible}>
                  <legend>Preferred time {centre ? `· ${centre.title}` : ''}</legend>
                  <div className="time-grid">
                    {(centre ? centre.times : CENTRES[0].times).map((t) => (
                      <button type="button" key={t} className={'time' + (f.time === t ? ' on' : '')} aria-pressed={f.time === t} onClick={() => set('time', t)}>{t}</button>
                    ))}
                  </div>
                  <Err k="time" />
                </fieldset>
                <label className="check"><input type="checkbox" checked={f.flexible} onChange={(e) => { set('flexible', e.target.checked); if (e.target.checked) { set('date', ''); set('time', ''); } }} /> I’m flexible — please suggest the next available time</label>
              </div>
            )}

            {/* STEP 3 — details */}
            {step === 3 && !done && (
              <div>
                <h2>Your details</h2>
                <div className="row2">
                  <div className="field"><label htmlFor="bk-name">Your name</label><input id="bk-name" value={f.name} autoComplete="name" onChange={(e) => set('name', e.target.value)} /><Err k="name" /></div>
                  <div className="field"><label htmlFor="bk-phone">Mobile number</label><input id="bk-phone" type="tel" inputMode="tel" placeholder="98XXXXXXXX" value={f.phone} autoComplete="tel" onChange={(e) => set('phone', e.target.value)} /><Err k="phone" /></div>
                </div>
                <div className="field"><label htmlFor="bk-email">Email <span className="opt-label">(optional)</span></label><input id="bk-email" type="email" value={f.email} autoComplete="email" onChange={(e) => set('email', e.target.value)} /><Err k="email" /></div>
                <div className="field"><label htmlFor="bk-notes">What brings you here? <span className="opt-label">(optional)</span></label><textarea id="bk-notes" rows="4" value={f.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Share as much or as little as you like." /></div>
                <label className="check"><input type="checkbox" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} /> I agree to be contacted on this number about my request.</label>
                <Err k="consent" />
              </div>
            )}

            {/* STEP 4 — review */}
            {step === 4 && !done && (
              <div>
                <h2>Review & send</h2>
                <dl className="bk-sum">
                  <div><dt>Service</dt><dd>{serviceName}</dd><button type="button" onClick={() => go(0)}>Edit</button></div>
                  <div><dt>Healer</dt><dd>{healer ? healer.name : 'No preference — we will match you'}</dd><button type="button" onClick={() => go(1)}>Edit</button></div>
                  <div><dt>Centre</dt><dd>{f.centre}</dd><button type="button" onClick={() => go(1)}>Edit</button></div>
                  <div><dt>When</dt><dd>{when}</dd><button type="button" onClick={() => go(2)}>Edit</button></div>
                  <div><dt>You</dt><dd>{f.name} · +91 {cleanPhone(f.phone)}{f.email ? ` · ${f.email}` : ''}</dd><button type="button" onClick={() => go(3)}>Edit</button></div>
                  {f.notes && <div><dt>Note</dt><dd>{f.notes}</dd><button type="button" onClick={() => go(3)}>Edit</button></div>}
                  <div><dt>Fee</dt><dd>From {rupees(fee)} <small>(confirmed when we reply)</small></dd><span /></div>
                </dl>
                <p className="bk-hint">There is no online payment. Pressing send opens WhatsApp (or your email) with this request ready — just press send there, and we will confirm your slot personally.</p>
                <div className="bk-send">
                  <button type="button" className="btn btn-primary" onClick={sendWhatsApp}>Confirm on WhatsApp</button>
                  <button type="button" className="btn btn-outline" onClick={sendEmail}>Send by email instead</button>
                </div>
              </div>
            )}

            {/* DONE */}
            {done && (
              <div className="bk-done">
                <div className="done-ico" aria-hidden="true">✓</div>
                <h2>Your request is ready to send</h2>
                <p>If WhatsApp did not open, tap the button below. Once you press <strong>send</strong> in the chat, our team will reply personally to confirm your slot{f.centre.startsWith('Online') ? ' and share your video link' : ''}.</p>
                <div className="bk-send" style={{ justifyContent: 'center' }}>
                  <a className="btn btn-primary" href={`https://wa.me/${SITE.wa}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">Open WhatsApp again</a>
                  <Link className="btn btn-outline" to="/">Back to home</Link>
                </div>
                <p className="bk-hint">Need to change something? <button type="button" className="linkbtn" onClick={() => { setDone(false); go(4); }}>Edit your request</button></p>
              </div>
            )}

            {!done && (
              <div className="bk-nav">
                {step > 0 ? <button type="button" className="btn btn-outline" onClick={() => go(step - 1)}>Back</button> : <span />}
                {step < 4 && <button type="button" className="btn btn-primary" onClick={next}>Continue</button>}
              </div>
            )}
          </div>

          <div className="bk-table reveal">
            <h2>At a glance</h2>
            <p className="bk-sub">Appointments are held in private, confidential rooms in Gurugram and West Delhi, and online over video.</p>
            <table>
              <thead><tr><th>Service</th><th>Duration / format</th><th>Venue</th><th>Next step</th></tr></thead>
              <tbody>
                <tr><td data-l="Service">Access Bars Session</td><td data-l="Duration">60 – 75 min (1:1)</td><td data-l="Venue">DLF Phase 1, Gurugram</td><td><Link to="/book/?service=access-bars">Select a slot</Link></td></tr>
                <tr><td data-l="Service">Pranic Healing</td><td data-l="Duration">45 – 60 min</td><td data-l="Venue">Delhi centre or online</td><td><Link to="/book/?service=pranic-healing">Book a session</Link></td></tr>
                <tr><td data-l="Service">Feng Shui Consultation</td><td data-l="Duration">Spatial site audit</td><td data-l="Venue">On-site, home or office</td><td><Link to="/book/?service=feng-shui-home-office">Request a site call</Link></td></tr>
                <tr><td data-l="Service">Business Mentoring</td><td data-l="Duration">Ongoing mentoring</td><td data-l="Venue">Online or in person</td><td><Link to="/book/?service=business-mentoring">Discovery call</Link></td></tr>
              </tbody>
            </table>
          </div>

          <p className="bk-foot">Prefer to talk? Call <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a> or <a href={`https://wa.me/${SITE.wa}`} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>. Healing and counseling are complementary practices and not a substitute for medical care.</p>
        </div>
      </section>
    </>
  );
}
