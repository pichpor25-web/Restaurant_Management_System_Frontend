import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import OrderSummary from '../../features/cart/OrderSummary.jsx'
import BakongQR from '../../features/payment/BakongQR.jsx'
import { useCart } from '../../hooks/useCart.js'
import { dineInService } from '../../services/dineInService.js'
import { takeawayService } from '../../services/takeawayService.js'
import { createBakongCheckout, verifyBakongPayment } from '../../services/paymentService.js'
import { ORDER_TYPE, PAYMENT_METHOD } from '../../utils/constants.js'

// Flow: place order → (Bakong) show QR → verify → success page.
//   Dine-in : backend assigns a free table and returns it
//   Take-away: sends customer name + phone
const CheckoutPage = () => {
  const cart = useCart()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [payment, setPayment] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const isTakeaway = cart.orderType === ORDER_TYPE.TAKEAWAY

  if (cart.items.length === 0 && !order) return <Navigate to="/" replace />

  const finish = (o) => {
    const id = o.id ?? o.order_id
    cart.clear()
    navigate(isTakeaway ? `/order/takeaway/${id}` : `/order/dine-in/${id}`, { state: { order: o } })
  }

  const pay = async () => {
    setError('')
    setBusy(true)
    try {
      const payload = {
        items: cart.items.map((i) => ({ menu_item_id: i.id, quantity: i.qty, price: i.price })),
        payment_method: cart.paymentMethod,
        ...(isTakeaway && { customer_name: cart.customer.name, phone: cart.customer.phone }),
      }
      const res = await (isTakeaway ? takeawayService.place(payload) : dineInService.place(payload))
      const created = res.data ?? res
      setOrder(created)

      if (cart.paymentMethod === PAYMENT_METHOD.BAKONG) {
        const orderId = created.order_id ?? created.order?.id ?? created.id
        setPayment(await createBakongCheckout(orderId, {}))
      } else {
        finish(created)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  const verify = async () => {
    setBusy(true)
    setError('')
    try {
      const r = await verifyBakongPayment(payment.md5, {})
      setPayment((p) => ({ ...p, paid: r.paid }))
      if (r.paid) finish(order)
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-5 p-6">
      <h1 className="text-2xl font-black">Checkout</h1>
      {payment ? (
        <BakongQR payment={payment} onVerify={verify} verifying={busy} />
      ) : (
        <>
          <OrderSummary />
          <ErrorMessage message={error} />
          <Button className="w-full py-3 text-base" disabled={busy} onClick={pay}>
            {busy ? 'Processing…' : 'Pay'}
          </Button>
        </>
      )}
      {payment && <ErrorMessage message={error} />}
    </div>
  )
}

export default CheckoutPage
