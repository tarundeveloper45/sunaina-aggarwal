// Practitioners. To add or edit a healer, change this list — the list page, profile pages,
// booking form and sitemap update automatically.
// `services` = slugs of the service pages this healer offers (see services.json).
export const HEALERS = [
  {
    slug: 'sunaina-aggarwal', name: 'Sunaina Aggarwal', initials: 'SA', photo: 'sunaina-aggarwal-portrait.webp',
    role: 'Founder, EL Healing Centre', since: 2005, price: 3000,
    tags: ['Pranic Healing', 'Counselling', 'Healing', 'Personalised Meditation'],
    services: ['pranic-healing', 'counseling', 'healing', 'personalised-meditation', 'access-bars', 'feng-shui-home-office', 'business-mentoring'],
    summary: 'Intuitive energy healer, spiritual coach and business mentor. A session can be a conversation, hands-on energy work, or a mix of both.',
    founder: true,
  },
  { slug: 'amol-kunte', name: 'Amol Kunte', initials: 'AK', role: 'Associate Certified Pranic Healer', since: 2010, price: 3500, tags: ['Pranic Healing'], services: ['pranic-healing'] },
  { slug: 'gobinda-kumar', name: 'Gobinda Kumar', initials: 'GK', role: 'Pranic Healer', since: 2015, price: 3000, tags: ['Pranic Healing'], services: ['pranic-healing'] },
  { slug: 'karishma-duggal', name: 'Karishma Duggal', initials: 'KD', role: 'MSc IT · Pranic Healer · Arhatic Practitioner', since: 2025, price: 3000, tags: ['Pranic Healing', 'Arhatic Yoga'], services: ['pranic-healing', 'personalised-meditation'] },
  { slug: 'sakshi-mundra', name: 'Sakshi Mundra', initials: 'SM', role: 'Access Bars Facilitator', since: 2023, price: 3000, tags: ['Access Bars'], services: ['access-bars'] },
  { slug: 'shalini-upadhyay', name: 'Shalini Upadhyay', initials: 'SU', role: 'Pranic Healing · Access Bars · Tarot', since: 2015, price: 3000, tags: ['Pranic Healing', 'Access Bars', 'Tarot'], services: ['pranic-healing', 'access-bars', 'tarot-reading'] },
  { slug: 'sumiti-malhotra', name: 'Sumiti Malhotra', initials: 'SM', role: 'Pranic Healer · Access Bars Practitioner · Reiki Healer', since: 2019, price: 3000, tags: ['Pranic Healing', 'Access Bars', 'Reiki'], services: ['pranic-healing', 'access-bars', 'healing'] },
  { slug: 'versha', name: 'Versha', initials: 'V', role: 'Reiki Healing · Access Bars · Numerology', since: 2025, price: 3000, tags: ['Reiki', 'Access Bars', 'Numerology'], services: ['healing', 'access-bars', 'numerology'] },
];

/*
 * HOW TO ADD A PRACTITIONER (healer, astrologer, tarot reader, numerologist, …)
 * 1. Add an object to HEALERS above:
 *    { slug: 'first-last', name: 'First Last', initials: 'FL', role: 'Vedic Astrologer', since: 2012, price: 2500,
 *      tags: ['Astrology'], services: ['astrology'] }
 *    - tags      → shown as chips and used by the filters (new tags appear in the filter automatically)
 *    - services  → slugs from services.json; these appear on the profile and as bookable sessions
 *    - photo     → optional: 'file-name.webp' placed in public/assets/img (otherwise the initials are shown)
 * 2. Run the build — the profile page, list, booking and sitemap update by themselves.
 */
export const HEALER_BY = Object.fromEntries(HEALERS.map((h) => [h.slug, h]));
export const rupees = (n) => '₹' + n.toLocaleString('en-IN');
// (kept for future use)
export const years = (h) => new Date().getFullYear() - h.since; // used only on the client; SSR uses build year

// Filter chips for the list pages: every tag in use, most common first (new tags appear automatically).
export function filterTags(limit = 99) {
  const count = {};
  HEALERS.forEach((h) => h.tags.forEach((t) => { count[t] = (count[t] || 0) + 1; }));
  return Object.keys(count).sort((a, b) => count[b] - count[a] || a.localeCompare(b)).slice(0, limit);
}
