import { SITE, abs, absImg } from './config';

const strip = (s) => String(s).replace(/<[^>]+>/g, '');

function business() {
  const o = {
    '@type': ['HealthAndBeautyBusiness', 'LocalBusiness'],
    '@id': SITE.domain + '/#business',
    name: SITE.brand,
    url: SITE.domain + '/',
    logo: absImg('el-healing-centre-logo.png'),
    image: absImg('og-image-el-healing-centre.jpg'),
    description: 'Pranic healing, Reiki, Access Bars, crystal healing, counseling, Feng Shui and meditation by Sunaina Aggarwal in Delhi and Gurugram.',
    telephone: SITE.phoneRaw,
    email: SITE.email,
    address: SITE.locs.map((l) => ({ '@type': 'PostalAddress', streetAddress: l.street, addressLocality: l.locality, addressRegion: l.region, postalCode: l.postal, addressCountry: 'IN' })),
    areaServed: ['Delhi', 'Gurugram', 'Delhi NCR'],
    founder: { '@type': 'Person', '@id': SITE.domain + '/#sunaina', name: SITE.person, jobTitle: 'Pranic Healer, Reiki Expert & Spiritual Mentor' },
    priceRange: '₹₹',
  };
  const same = Object.values(SITE.social).filter(Boolean);
  if (same.length) o.sameAs = same;
  return o;
}

export function pageMeta(p) {
  const url = abs(p.path);
  const title = p.noSuffix ? p.title : `${p.title} | ${SITE.brand}`;
  const crumbs = [{ n: 'Home', u: SITE.domain + '/' }, ...(p.crumbs || []).map(([n, path]) => ({ n, u: abs(path) }))];
  const graph = [
    business(),
    { '@type': 'WebSite', '@id': SITE.domain + '/#website', name: SITE.brand, url: SITE.domain + '/', publisher: { '@id': SITE.domain + '/#business' }, inLanguage: 'en-IN' },
    { '@type': 'WebPage', '@id': url + '#webpage', url, name: title, description: p.desc, isPartOf: { '@id': SITE.domain + '/#website' }, about: { '@id': SITE.domain + '/#business' }, inLanguage: 'en-IN' },
  ];
  if (p.path !== '/' && p.crumbs) graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.n, item: c.u })) });
  if (p.faq) graph.push({ '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) });
  (p.schema || []).forEach((s) => graph.push(s));
  return {
    title, url,
    desc: p.desc,
    robots: (p.noindex || import.meta.env.VITE_NOINDEX) ? 'noindex,nofollow' : 'index,follow,max-image-preview:large',
    ogType: p.ogType || 'website',
    ogImage: absImg(p.ogImage || 'og-image-el-healing-centre.jpg'),
    json: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
  };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// HTML string for <head> (used when pre-rendering)
export function headHtml(p) {
  const m = pageMeta(p);
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.desc)}">`,
    `<link rel="canonical" href="${m.url}">`,
    `<meta name="robots" content="${m.robots}">`,
    `<meta property="og:type" content="${m.ogType}">`,
    `<meta property="og:site_name" content="${SITE.brand}">`,
    `<meta property="og:title" content="${esc(m.title)}">`,
    `<meta property="og:description" content="${esc(m.desc)}">`,
    `<meta property="og:url" content="${m.url}">`,
    `<meta property="og:image" content="${m.ogImage}">`,
    `<meta property="og:locale" content="en_IN">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<script type="application/ld+json" id="ld-json">${m.json.replace(/</g, '\\u003c')}</script>`,
  ].join('\n');
}

// Browser-side update on route change
export function applyHead(p) {
  const m = pageMeta(p);
  document.title = m.title;
  const set = (sel, create, attr, val) => {
    let el = document.head.querySelector(sel);
    if (!el) { el = document.createElement(create); document.head.appendChild(el); }
    return el;
  };
  const meta = (key, val, prop) => {
    const sel = prop ? `meta[property="${key}"]` : `meta[name="${key}"]`;
    let el = document.head.querySelector(sel);
    if (!el) { el = document.createElement('meta'); el.setAttribute(prop ? 'property' : 'name', key); document.head.appendChild(el); }
    el.setAttribute('content', val);
  };
  meta('description', m.desc); meta('robots', m.robots);
  meta('og:type', m.ogType, 1); meta('og:title', m.title, 1); meta('og:description', m.desc, 1);
  meta('og:url', m.url, 1); meta('og:image', m.ogImage, 1);
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
  link.href = m.url;
  const ld = set('script#ld-json', 'script');
  ld.type = 'application/ld+json'; ld.id = 'ld-json'; ld.textContent = m.json;
}
