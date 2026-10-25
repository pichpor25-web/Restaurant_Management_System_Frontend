import { ORDER_TYPE } from '../../utils/constants.js'
import { useCart } from '../../hooks/useCart.js'

const tabs = [
  { value: ORDER_TYPE.DINE_IN, label: 'Dine In' },
  { value: ORDER_TYPE.TAKEAWAY, label: 'Take Away' },
]

const OrderTypeTabs = () => {
  const { orderType, setOrderType } = useCart()
  return (
    <div className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1">
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => setOrderType(t.value)}
          className={`rounded-xl py-2 text-sm font-bold ${
            orderType === t.value ? 'bg-rose-600 text-white' : 'text-slate-500'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export default OrderTypeTabs
