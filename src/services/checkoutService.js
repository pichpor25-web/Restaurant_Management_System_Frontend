import { api } from './api.js'
import { orderService, orderItemService } from './orderService.js'
import { tableService } from './tableService.js'
import { dineInService } from './dineInService.js'
import { takeawayService } from './takeawayService.js'
import { ORDER_TYPE, TABLE_STATUS } from '../utils/constants.js'

const unwrap = (res) => res?.data ?? res
const money = (n) => Number(Number(n).toFixed(2))

// Backend flow (4 calls, matches your Laravel controllers):
//  1. (dine-in) pick a free table          GET  /tables
//  2. create the order                      POST /orders
//  3. create each order line                POST /order-items
//  4. link dine-in table / takeaway contact POST /dine-in-orders | /takeaway-orders
// Returns { order, table }.  Payment (Bakong) is a separate step on the order id.
export const placeOrder = async ({ items, orderType, customer, totals }) => {
  // Recommended: one atomic endpoint where the SERVER computes prices and assigns the table
  // (see CheckoutController). Enable with VITE_SERVER_CHECKOUT=true in .env
  if (import.meta.env.VITE_SERVER_CHECKOUT === 'true') {
    const res = await api.post('/checkout', {
      order_type: orderType,
      items: items.map((i) => ({ menu_item_id: i.id, quantity: i.qty })),
      ...(orderType === ORDER_TYPE.TAKEAWAY && {
        customer_name: customer.name,
        customer_phone: customer.phone,
      }),
    })
    return { order: res.order, table: res.table ?? null }
  }

  let table = null

  // Pick the table first so we never leave an orphan order if none is free
  if (orderType === ORDER_TYPE.DINE_IN) {
    const tables = unwrap(await tableService.list())
    table = (Array.isArray(tables) ? tables : []).find((t) => t.status === TABLE_STATUS.AVAILABLE)
    if (!table) throw new Error('No free table right now. Please ask the staff.')
  }

  const order = unwrap(
    await orderService.create({
      order_number: `ORD-${Date.now()}`,
      order_type: orderType,
      status: 'pending',
      subtotal: money(totals.subtotal),
      discount: 0,
      tax: money(totals.tax),
      total: money(totals.total), // includes dine-in service fee
    }),
  )

  await Promise.all(
    items.map((i) =>
      orderItemService.create({
        order_id: order.id,
        menu_item_id: i.id,
        quantity: i.qty,
        unit_price: i.price,
      }),
    ),
  )

  if (orderType === ORDER_TYPE.DINE_IN) {
    await dineInService.create({ order_id: order.id, table_id: table.id })
  } else {
    await takeawayService.create({
      order_id: order.id,
      customer_name: customer.name,
      customer_phone: customer.phone,
    })
  }

  return { order, table }
}
