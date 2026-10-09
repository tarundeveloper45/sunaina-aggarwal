// Centres and the hours they are open for sessions. A booking is a *request* that the team confirms
// on WhatsApp, so these are the times people can ask for, not live diary slots.
export const PLACES = [
  { id: 'Gurugram – DLF Phase 1', short: 'Gurugram', note: 'DLF Phase 1 · Mon – Sat', days: [1, 2, 3, 4, 5, 6], from: 10, to: 18 },
  { id: 'Delhi – Paschim Vihar', short: 'Delhi', note: 'Paschim Vihar · Thursdays', days: [4], from: 12, to: 16 },
  { id: 'Online (video call)', short: 'Online', note: 'Video link sent on confirmation', days: [0, 1, 2, 3, 4, 5, 6], from: 10, to: 19 },
];

const pad = (n) => String(n).padStart(2, '0');
export const toIso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const fromIso = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const dayInfo = (iso) => { const d = fromIso(iso); return { weekday: DAYS[d.getDay()], day: d.getDate(), month: MONTHS[d.getMonth()], year: d.getFullYear(), dow: d.getDay() }; };
export const prettyDate = (iso) => { const i = dayInfo(iso); return `${i.weekday}, ${i.day} ${i.month} ${i.year}`; };

export const addDays = (iso, n) => { const d = fromIso(iso); d.setDate(d.getDate() + n); return toIso(d); };

export const placesOn = (iso) => { const dow = fromIso(iso).getDay(); return PLACES.filter((p) => p.days.includes(dow)); };

const label = (mins) => { const h = Math.floor(mins / 60), m = mins % 60; const ap = h >= 12 ? 'pm' : 'am'; const h12 = h % 12 === 0 ? 12 : h % 12; return `${h12}:${pad(m)} ${ap}`; };

// 30-minute start times for a place on a date. For today, only times at least 2 hours away are offered.
export function slotsFor(placeId, iso, now = new Date()) {
  const p = PLACES.find((x) => x.id === placeId);
  if (!p || !p.days.includes(fromIso(iso).getDay())) return [];
  const out = [];
  const isToday = iso === toIso(now);
  const earliest = now.getHours() * 60 + now.getMinutes() + 120;
  for (let m = p.from * 60; m < p.to * 60; m += 30) { if (!isToday || m >= earliest) out.push(label(m)); }
  return out;
}
