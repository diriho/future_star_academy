// The origin of the public site. Stripe builds donor redirect URLs from this, so a
// wrong value silently sends real donors to a dead address after they pay.
//
// CLIENT_URL wins when set. Otherwise fall back to the domain Vercel injects, which
// keeps preview deployments self-consistent instead of pointing them at production:
// VERCEL_PROJECT_PRODUCTION_URL is the stable production domain, VERCEL_URL is this
// specific deployment. Both are bare hosts, with no scheme.
export function getClientUrl() {
  if (process.env.CLIENT_URL) return process.env.CLIENT_URL

  const vercelHost =
    process.env.VERCEL_ENV === 'production'
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
      : process.env.VERCEL_URL
  if (vercelHost) return `https://${vercelHost}`

  return 'http://localhost:5173'
}
