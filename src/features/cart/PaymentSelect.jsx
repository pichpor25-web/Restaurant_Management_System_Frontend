import { PAYMENT_METHOD } from '../../utils/constants.js'
import { useCart } from '../../hooks/useCart.js'

const PaymentSelect = () => {
  const { paymentMethod, setPaymentMethod } = useCart()
  return (
    <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
      <span className="text-slate-500">Payment</span>
      <select
        className="bg-transparent font-bold outline-none"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value={PAYMENT_METHOD.BAKONG}>Bakong KHQR</option>
        <option value={PAYMENT_METHOD.CASH}>Cash</option>
      </select>
    </label>
  )
}

export default PaymentSelect
