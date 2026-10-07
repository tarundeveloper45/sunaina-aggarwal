// Pre-renders every route to static HTML (good for SEO) and writes sitemap.xml.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) throw new Error('Template placeholders missing');
const { render, ROUTES } = await import(pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href);

const DOMAIN = 'https://www.sunainaaggarwal.com';
const today = new Date().toISOString().slice(0, 10);

const write = (file, html) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, html); };
const page = (url) => { const { html, head } = render(url); return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html); };

for (const r of ROUTES) write(path.join(dist, r === '/' ? '' : r, 'index.html'), page(r));
write(path.join(dist, '404.html'), page('/page-not-found/'));

const urls = ROUTES.map((r) => {
  const depth = r.split('/').filter(Boolean).length;
  return `  <url><loc>${DOMAIN}${r}</loc><lastmod>${today}</lastmod><priority>${r === '/' ? '1.0' : depth === 1 ? '0.8' : '0.7'}</priority></url>`;
}).join('\n');
write(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
if (process.env.VITE_NOINDEX) write(path.join(dist, 'robots.txt'), ['User-agent: *', 'Disallow: /', ''].join(String.fromCharCode(10))); // staging: keep search engines out
fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
console.log(`Pre-rendered ${ROUTES.length} pages + 404 + sitemap.xml`);
