export interface CheckoutSessionRequest {
  amount: number
  recurring: boolean
}

export interface CheckoutSessionResponse {
  clientSecret: string
}

export interface SessionStatus {
  status: 'open' | 'complete' | 'expired' | null
  paymentStatus: 'paid' | 'unpaid' | 'no_payment_required' | null
  amountTotal: number | null
  currency: string | null
  customerEmail: string | null
  recurring: boolean
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

export async function fetchSessionStatus(sessionId: string): Promise<SessionStatus> {
  const res = await fetch(`/api/session-status?session_id=${encodeURIComponent(sessionId)}`)

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error ?? 'Unable to confirm your donation status right now.')
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

// One styled run of text inside a Notion page body.
export interface RichTextRun {
  text: string
  bold: boolean
  italic: boolean
  code: boolean
  href: string | null
}

export type ContentBlock =
  | { type: 'paragraph' | 'quote' | 'callout' | 'bulleted-list-item' | 'numbered-list-item'; richText: RichTextRun[] }
  | { type: 'heading'; level: number; richText: RichTextRun[] }
  | { type: 'image'; url: string; caption: string }
  | { type: 'divider' }

export interface ContentImage {
  url: string
  caption: string
}

// A single item plus the body written inside its Notion page. `images` is every
// picture on the page in reading order — the featured image first — which is what
// the lightbox pages through.
export interface NewsEventDetail extends NewsEvent {
  content: ContentBlock[]
  images: ContentImage[]
}

export async function fetchNewsEventBySlug(slug: string): Promise<NewsEventDetail> {
  const res = await fetch(`/api/news-events/${encodeURIComponent(slug)}`)

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error ?? 'Unable to load this article right now. Please try again shortly.')
  }

  return res.json()
}
