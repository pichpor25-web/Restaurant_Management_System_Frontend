import { formatCurrency } from '../../utils/formatCurrency.js'
import { useCart } from '../../hooks/useCart.js'
import { ORDER_TYPE } from '../../utils/constants.js'

const Row = ({ label, value }) => (
  <div className="flex justify-between text-sm text-slate-500"><span>{label}</span><span className="font-semibold text-slate-800">{value}</span></div>
)

const OrderSummary = () => {
  const { totals, orderType } = useCart()
  return (
    <div className="space-y-2 border-t border-slate-100 pt-4">
      <Row label="Sub Total" value={formatCurrency(totals.subtotal)} />
      <Row
        label={orderType === ORDER_TYPE.TAKEAWAY ? 'Services (Waived)' : 'Services'}
        value={formatCurrency(totals.service)}
      />
      <Row label="Tax 10%" value={formatCurrency(totals.tax)} />
      <div className="flex items-center justify-between pt-2">
        <span className="font-black">Total Amount</span>
        <span className="text-2xl font-black text-rose-600">{formatCurrency(totals.total)}</span>
      </div>
    </div>
  )
}

export default OrderSummary
