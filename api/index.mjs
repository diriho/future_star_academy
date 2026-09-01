// Vercel entrypoint. vercel.json rewrites every /api/* request here, so the whole
// Express app runs as a single serverless function and keeps doing its own routing.
//
// This exports the Express app itself rather than a (req, res) handler on purpose:
// @vercel/node skips its request helpers when the export has a .listen method, and
// those helpers would otherwise read the request body before express.raw() can, which
// breaks Stripe's webhook signature verification.
export { default } from '../server/server.js'
