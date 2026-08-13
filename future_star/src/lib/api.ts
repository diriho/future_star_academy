export interface CheckoutSessionRequest {
  amount: number
  recurring: boolean
}

export interface CheckoutSessionResponse {
  url: string
}

export async function createCheckoutSession(
  payload: CheckoutSessionRequest,
): Promise<CheckoutSessionResponse> {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error ?? 'Something went wrong starting your donation. Please try again.')
  }

  return res.json()
}

export type NewsEventType = 'News' | 'Event'

export interface NewsEvent {
  id: string
  title: string
  type: NewsEventType | null
  status: 'Draft' | 'Published' | 'Archived' | null
  publishDate: string | null
  featured: boolean
  category: string[]
  summary: string
  featuredImage: string | null
  slug: string
  startDate: string | null
  endDate: string | null
  location: string | null
  registrationUrl: string | null
}

export async function fetchNewsEvents(): Promise<NewsEvent[]> {
  const res = await fetch('/api/news-events')

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error ?? 'Unable to load news & events right now. Please try again shortly.')
  }

  return res.json()
}

export async function fetchNewsEventBySlug(slug: string): Promise<NewsEvent> {
  const res = await fetch(`/api/news-events/${encodeURIComponent(slug)}`)

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error ?? 'Unable to load this article right now. Please try again shortly.')
  }

  return res.json()
}
