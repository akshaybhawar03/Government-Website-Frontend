# Indian Government Jobs Portal

Production-ready Indian government jobs portal:

- Public browsing pages (latest jobs, results, admit cards)
- Job details page with official apply link + structured data
- Admin panel (login, CRUD)
- Daily automation via Playwright scrapers + cron

Important:

- This is not a government website. Information is collected from official sources.
- Do not use government logos.
- Always verify details on the official source and official apply link.

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- MongoDB Atlas + Mongoose
- Playwright for scraping (public information only)
- Vercel Cron / local node-cron scheduler

## 1) Setup

Install dependencies:

```bash
npm install
```

Playwright browser install:

```bash
npx playwright install
```

Create `.env.local` (copy from `.env.example`) and fill values.

Minimum required:

- `MONGODB_URI`
- `JWT_SECRET`

Recommended:

- `ADMIN_SETUP_TOKEN`
- `CRON_SCRAPE_TOKEN`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`

## 2) Run locally

```bash
npm run dev
```

Open:

- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

## 3) Create the first admin

1. Set `ADMIN_SETUP_TOKEN` in `.env.local`
2. Open `/admin/setup`
3. Enter the token + email + password
4. Then login at `/admin/login`

## 4) Automation

### Run once (manual)

```bash
npm run automation:daily
```

### Local scheduler (non-Vercel deployments)

Runs once immediately and then schedules daily at 00:00 server time:

```bash
npm run cron:local
```

### Vercel Cron

This repo includes `vercel.json` cron schedule calling `/api/cron/daily` daily.

Security options:

- Recommended: set `CRON_SCRAPE_TOKEN` and call the endpoint with `Authorization: Bearer <token>` or `?token=<token>`.
- If `CRON_SCRAPE_TOKEN` is not set, the endpoint only executes when `User-Agent` contains `vercel-cron/1.0`.

## 5) Deployment notes

### MongoDB Atlas

- Use an Atlas connection string for `MONGODB_URI`
- Ensure your IP allowlist / network access is configured

### Vercel

- Add environment variables in Vercel Project Settings
- Ensure the cron schedule is enabled

### Render / VM

- Run `npm run build` then `npm run start`
- Run `npm run cron:local` as a separate background process

## Folder structure

- `src/app` - App Router pages + API routes
- `src/models` - Mongoose models
- `src/lib` - db/env/auth/query helpers
- `src/automation` - Playwright scrapers + cron runners
