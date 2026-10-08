import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { headHtml } from './seo';
import { SERVICES, POSTS } from './data/content';
import { HEALERS } from './data/healers';

export const ROUTES = [
  '/', '/about-us/', '/services/',
  ...SERVICES.map((s) => `/services/${s.slug}/`),
  '/healers/', ...HEALERS.map((h) => `/healers/${h.slug}/`), '/book/',
  '/schedules/', '/gallery/', '/testimonials/', '/blog/',
  ...POSTS.map((p) => `/blog/${p.slug}/`),
  '/contact-us/',
];

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function render(url) {
  globalThis.__SEO__ = null;
  const html = renderToString(
    <StaticRouter basename={BASE} location={BASE + url}>
      <App />
    </StaticRouter>
  );
  return { html, head: globalThis.__SEO__ ? headHtml(globalThis.__SEO__) : '' };
}
