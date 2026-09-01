# Stripe donations

Reconstructed after `server/data/STRIPE_TO_DO.md` was deleted. That file was gitignored and
is not recoverable; this covers the parts that still apply to the current architecture.
Sections of the original about the local SQLite ledger and the webhook are intentionally
gone — both were removed once Stripe's dashboard became the sole record of every donation.

## How a donation flows

    DonationWidget  → POST /api/create-checkout-session  → Stripe session (ui_mode: 'elements')
                    ← clientSecret
    Payment Element → Stripe charges the card
                    → return_url: /get-involved/sponsor/complete?session_id=…
    DonationComplete → GET /api/session-status  → stripe.checkout.sessions.retrieve()

The outcome is always re-read from Stripe rather than trusted from the query string, so the
confirmation page cannot be spoofed by editing the URL. Nothing is written to disk.

## Going live

1. **Activate payments** in the Stripe dashboard. Live keys error out until the business
   account is submitted and approved, no matter what the code does.
2. Swap `STRIPE_SECRET_KEY` (server) and `VITE_STRIPE_PUBLISHABLE_KEY` (frontend) to their
   `sk_live_…` / `pk_live_…` values. **Both must be the same mode** — a `pk_test_` against an
   `sk_live_` fails at checkout with a misleading error.
3. `VITE_STRIPE_PUBLISHABLE_KEY` is baked into the bundle at build time. Changing it requires
   a **redeploy**, not a restart.
4. Set `CLIENT_URL` once a custom domain is attached. Until then `server/clientUrl.js` derives
   it from the deployment's own domain. Getting this wrong is the failure that silently ruins
   live donations: it builds `return_url`, so donors pay and then land on a dead address.

### First live check

Make one real $1 donation on the deployed site, confirm it appears in the Stripe dashboard,
then refund it from the dashboard. That is the only true validation.

## Test cards

Test mode only. Any future expiry, any CVC, any postal code.

| number | result |
|---|---|
| `4242 4242 4242 4242` | succeeds |
| `4000 0025 0000 3155` | requires 3D Secure authentication |
| `4000 0000 0000 9995` | declined — insufficient funds |
| `4000 0000 0000 0002` | declined — generic |

Full list: https://docs.stripe.com/testing

## If you later want donation records of your own

Everything below needs a webhook endpoint (`POST /api/stripe/webhook`), a
`STRIPE_WEBHOOK_SECRET`, and a database that survives a serverless invocation — Vercel's
filesystem does not. The webhook matters because the confirmation page only runs if the
donor's browser comes back; a webhook fires even if they close the tab.

- A "raised $X so far" total on the site
- Branded receipts or thank-you emails
- Monthly sponsorships. Only the **first** charge of a subscription arrives as
  `checkout.session.completed`; renewals come as `invoice.paid`. A $25/month sponsor would
  otherwise be counted once and never again.
