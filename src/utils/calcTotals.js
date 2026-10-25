import { ORDER_TYPE, SERVICE_FEE, TAX_RATE } from './constants.js'

export const calcTotals = (items, orderType) => {
  const subtotal = items.reduce((sum, i) => sum + Number(i.price) * i.qty, 0)
  const service = orderType === ORDER_TYPE.DINE_IN && items.length ? SERVICE_FEE : 0
  const tax = subtotal * TAX_RATE
  return { subtotal, service, tax, total: subtotal + service + tax }
}
