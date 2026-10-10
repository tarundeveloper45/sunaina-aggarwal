# EL Healing Centre – React website

React 18 + Vite + React Router. Every page is pre-rendered to static HTML at build time (good for SEO).

## Commands
- `npm install` – first time only
- `npm run dev` – local development (http://localhost:5173)
- `npm run build` – creates the `dist/` folder
- `npm run preview` – open the built site locally

## Adding people and services (the site is data-driven)
- **New practitioner** (healer, astrologer, tarot reader, numerologist, …): add one object to `HEALERS` in `src/data/healers.js` (instructions are in the comment under the list). The profile page, list, filters, booking step and sitemap update automatically. Put an optional photo in `public/assets/img/`.
- **New service**: add one object to `src/data/services.json` (copy an existing entry), add its slug to `MENU_SERVICES` in `src/config.js`, then add the slug to the `services` of the practitioners who offer it.
- **Classes / swaps**: `SCHEDULE` in `src/data/content.js` (past dates hide themselves).

## Where to edit
- `src/config.js` – phone, WhatsApp, email, social links, addresses, maps
- `src/data/content.js` – FAQs, schedule, testimonials, videos, blog posts
- `src/pages/` – page layouts, `src/components/` – header, footer, shared parts
- `src/*.css` – styling

## Go live
Push to GitHub – the workflow in `.github/workflows/deploy.yml` builds and publishes the site.
