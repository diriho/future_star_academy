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
  The `/:slug` form also returns the item's page body as content blocks, plus a flat list of every
  picture on the page.

## Writing news & events

Each row in the Notion database is one card on `/news-events`. The database properties fill in the
card itself: `Title`, `Type` (News or Event), `Description` (the summary), `Image`, `Category`,
dates, `Location`, `Registration URL`. A row only appears once `Status` is `Published` and its
`Published Date` has arrived.

Clicking a card opens the full story in a dialog, and that dialog renders **whatever you write
inside the Notion page itself** — headings, paragraphs, bullet and numbered lists, quotes, callouts,
dividers, and images (with their captions). Pictures are clickable: they open a full-screen viewer
that pages through every image on the page, the `Image` property first. Anything else Notion
supports (tables, embeds, videos, code) is skipped rather than half-rendered.

So a row with only properties filled in still works — it just shows the summary and one picture.
To give a story real depth, write the body inside its Notion page and drop photos in as you go.

## Deploying

One Vercel project from the repo root — `vercel.json` builds `future_star/` as the static site and
runs the Express app as a single serverless function at `/api/*`, so both halves share one domain.
Set `STRIPE_SECRET_KEY`, `NOTION_API_KEY`, `NOTION_DATABASE_ID`, and `VITE_STRIPE_PUBLISHABLE_KEY`
in the project's environment variables. Leave `PORT` and `CLIENT_URL` unset — the platform supplies
the socket, and `server/clientUrl.js` derives the origin from the deployment's own domain.
