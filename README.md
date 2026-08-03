# Future Stars Academy

Full site: React + Tailwind + React Router frontend (`future_star/`), Express + SQLite backend (`server/`) for Stripe donation checkout.

## Setup

```bash
npm run install:all   # installs both future_star/ and server/ dependencies
cp server/.env.example server/.env   # then fill in a real STRIPE_SECRET_KEY
npm run dev            # runs the frontend (5173) and API (4000) together
```

The frontend proxies `/api/*` to the backend in dev, so no CORS config is needed locally.

## Configuration

- `server/.env` — `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (from `stripe listen`), `CLIENT_URL`, `DB_PATH`, `PORT`. See `server/.env.example`.
- `future_star/src/config/forms.ts` — placeholder Google Form URLs for the Volunteer and Partner modals. Replace with the real published form links.

## What's here

- `future_star/` — the site (Home, Get Involved / Volunteer / Sponsor / Partner, Programs).
- `server/` — `POST /api/create-checkout-session` (Stripe Checkout, one-time or monthly) and `POST /api/stripe/webhook` (marks donations completed), backed by a SQLite `donations` table.
