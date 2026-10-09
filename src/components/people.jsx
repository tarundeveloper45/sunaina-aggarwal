import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { img } from '../config';
import { SCHEDULE } from '../data/content';
import { rupees } from '../data/healers';

export function Avatar({ h, large }) {
  if (h.photo) return <img className={'avatar-img' + (large ? ' lg' : '')} src={img(h.photo)} alt={`${h.name}, ${h.role}`} width="160" height="200" loading="lazy" />;
  return <span className={'avatar-ini' + (large ? ' lg' : '')} aria-hidden="true">{h.initials}</span>;
}

export function HealerCard({ h, compact }) {
  return (
    <article className={'hcard reveal' + (compact ? ' compact' : '')}>
      <Link className="hc-top" to={`/healers/${h.slug}/`} aria-label={`View ${h.name}'s profile`}>
        <Avatar h={h} />
        <span><h3>{h.name}</h3><span className="hc-role">{h.role}</span></span>
      </Link>
      <p className="hc-since">{h.founder ? 'Founder · ' : ''}Practising since {h.since}</p>
      <ul className="tags">{h.tags.map((t) => <li key={t}>{t}</li>)}</ul>
      <div className="hc-foot">
        <span className="hc-price">from <b>{rupees(h.price)}</b></span>
        <span className="hc-actions">
          <Link className="btn btn-outline" to={`/healers/${h.slug}/`}>Profile</Link>
          <Link className="btn btn-primary" to={`/book/?healer=${h.slug}`}>Book</Link>
        </span>
      </div>
    </article>
  );
}

const pad = (n) => String(n).padStart(2, '0');
const todayIso = () => { const t = new Date(); return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`; };

// Upcoming classes. The first render uses the build date (so server and browser HTML match);
// after mount it switches to the visitor's real "today" so past classes disappear.
export function useUpcoming() {
  // eslint-disable-next-line no-undef
  const [list, setList] = useState(() => SCHEDULE.filter((s) => s.date >= __BUILD_DATE__));
  useEffect(() => { const t = todayIso(); setList(SCHEDULE.filter((s) => s.date >= t)); }, []);
  return list;
}

export { todayIso };
