# Future Stars Academy

Full site: React + Tailwind + React Router frontend (`future_star/`), Express backend (`server/`) for Stripe
donation checkout and Notion-backed news & events. Stripe's dashboard is the sole record of every
donation — the server stores nothing.

## Setup

```bash
npm run install:all   # installs both future_star/ and server/ dependencies
cp server/.env.example server/.env   # then fill in a real STRIPE_SECRET_KEY
npm run dev            # runs the frontend (5173) and API (4000) together
```

The frontend proxies `/api/*` to the backend in dev, so no CORS config is needed locally.

## Configuration

- `server/.env` — `STRIPE_SECRET_KEY`, `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `CLIENT_URL`, `PORT`. See `server/.env.example`.
- `future_star/.env` — `VITE_STRIPE_PUBLISHABLE_KEY`. Must match the test/live mode of `STRIPE_SECRET_KEY`.
- `future_star/src/config/forms.ts` — placeholder Google Form URLs for the Volunteer and Partner modals. Replace with the real published form links.

## What's here

- `future_star/` — the site (Home, Get Involved / Volunteer / Sponsor / Partner, Programs).
- `server/` — `POST /api/create-checkout-session` (one-time or monthly), `GET /api/session-status`
  (re-reads a donation's outcome straight from Stripe), and `GET /api/news-events[/:slug]` (Notion).

## Deploying

One Vercel project from the repo root — `vercel.json` builds `future_star/` as the static site and
runs the Express app as a single serverless function at `/api/*`, so both halves share one domain.
Set `STRIPE_SECRET_KEY`, `NOTION_API_KEY`, `NOTION_DATABASE_ID`, and `VITE_STRIPE_PUBLISHABLE_KEY`
in the project's environment variables. Leave `PORT` and `CLIENT_URL` unset — the platform supplies
the socket, and `server/clientUrl.js` derives the origin from the deployment's own domain.
