import { apiFetch } from './api.js'

export const createBakongTestOrder = (amount, { baseURL, token }) =>
  apiFetch('/orders', {
    baseURL,
    token,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order_number: `BAKONG-TEST-${Date.now()}`,
      order_type: 'takeaway',
      status: 'pending',
      subtotal: Number(amount),
      discount: 0,
      tax: 0,
      total: Number(amount),
      notes: 'Local Bakong payment test',
    }),
  })

export const createBakongCheckout = (orderId, { baseURL, token }) =>
  apiFetch(`/payments/bakong/checkout/${encodeURIComponent(orderId)}`, {
    baseURL,
    token,
    method: 'POST',
  })

export const verifyBakongPayment = (md5, { baseURL, token }) =>
  apiFetch('/payments/bakong/verify', {
    baseURL,
    token,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ md5 }),
  })

// Admin: payment history / total_payment
export const listPayments = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return apiFetch(`/payments${qs ? `?${qs}` : ''}`)
}
