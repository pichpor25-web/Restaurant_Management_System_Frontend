import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import OrderSummary from '../../features/cart/OrderSummary.jsx'
import BakongQR from '../../features/payment/BakongQR.jsx'
import { useCart } from '../../hooks/useCart.js'
import { placeOrder } from '../../services/checkoutService.js'
import { createBakongCheckout, verifyBakongPayment } from '../../services/paymentService.js'
import { ORDER_TYPE, PAYMENT_METHOD } from '../../utils/constants.js'

// Flow: place order → (Bakong) show QR → verify → success page.
const CheckoutPage = () => {
  const cart = useCart()
  const navigate = useNavigate()
  const [placed, setPlaced] = useState(null) // { order, table }
  const [payment, setPayment] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const isTakeaway = cart.orderType === ORDER_TYPE.TAKEAWAY

  if (cart.items.length === 0 && !placed) return <Navigate to="/" replace />

  const finish = (result) => {
    const id = result.order.id
    cart.clear()
    navigate(isTakeaway ? `/order/takeaway/${id}` : `/order/dine-in/${id}`, { state: result })
  }

  const pay = async () => {
    setError('')
    setBusy(true)
    try {
      // Don't create a second order if the first step already succeeded
      const result =
        placed ??
        (await placeOrder({
          items: cart.items,
          orderType: cart.orderType,
          customer: cart.customer,
          totals: cart.totals,
        }))
      setPlaced(result)

      if (cart.paymentMethod === PAYMENT_METHOD.BAKONG) {
        setPayment(await createBakongCheckout(result.order.id, {}))
      } else {
        finish(result) // cash: paid at the counter
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
      if (r.paid) finish(placed)
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
          <Button className="w-full py-3 text-base" disabled={busy} onClick={pay}>
            {busy ? 'Processing…' : 'Pay'}
          </Button>
        </>
      )}
      <ErrorMessage message={error} />
    </div>
  )
}

export default CheckoutPage
