import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { headHtml } from './seo';
import { SERVICES, POSTS } from './data/content';

export const ROUTES = [
  '/', '/about-us/', '/services/',
  ...SERVICES.map((s) => `/services/${s.slug}/`),
  '/schedules/', '/testimonials/', '/blog/',
  ...POSTS.map((p) => `/blog/${p.slug}/`),
  '/contact-us/',
];

export function render(url) {
  globalThis.__SEO__ = null;
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  return { html, head: globalThis.__SEO__ ? headHtml(globalThis.__SEO__) : '' };
}
