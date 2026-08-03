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
