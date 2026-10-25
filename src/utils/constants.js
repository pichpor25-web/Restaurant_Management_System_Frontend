export const ORDER_TYPE = { DINE_IN: 'dine_in', TAKEAWAY: 'takeaway' }

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const TABLE_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  RESERVED: 'reserved',
}

export const PAYMENT_METHOD = { CASH: 'cash', BAKONG: 'bakong' }

export const SERVICE_FEE = 2.99 // dine-in only, waived for takeaway
export const TAX_RATE = 0.1
export const TOKEN_KEY = 'rms_token'
