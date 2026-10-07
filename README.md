# EL Healing Centre – React website

React 18 + Vite + React Router. Every page is pre-rendered to static HTML at build time (good for SEO).

## Commands
- `npm install` – first time only
- `npm run dev` – local development (http://localhost:5173)
- `npm run build` – creates the `dist/` folder (19 pages, 404.html, sitemap.xml)
- `npm run preview` – open the built site locally

## Go live (cPanel)
Upload the **contents of `dist/`** into `public_html` (including the hidden `.htaccess`).

## Where to edit
- `src/config.js` – phone, WhatsApp, email, social links, addresses, maps
- `src/data/content.js` – FAQs, schedule, testimonials, videos, blog posts
- `src/data/services.json` – all 9 service pages
- `src/pages/` – page layouts, `src/components/` – header, footer, shared parts
- `src/styles.css` – all styling
- `public/assets/img/` – images
