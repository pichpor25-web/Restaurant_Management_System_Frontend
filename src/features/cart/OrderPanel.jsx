import { useNavigate } from 'react-router-dom'
import OrderTypeTabs from './OrderTypeTabs.jsx'
import CartItem from './CartItem.jsx'
import OrderSummary from './OrderSummary.jsx'
import PaymentSelect from './PaymentSelect.jsx'
import TakeawayForm from '../takeaway/TakeawayForm.jsx'
import { useTakeawayValid } from '../../hooks/useTakeawayValid.js'
import Button from '../../components/ui/Button.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import { useCart } from '../../hooks/useCart.js'
import { ORDER_TYPE } from '../../utils/constants.js'

// Right-hand "Order Details" panel (design screens 3 & 4)
const OrderPanel = () => {
  const { items, orderType } = useCart()
  const navigate = useNavigate()
  const takeawayValid = useTakeawayValid()
  const isTakeaway = orderType === ORDER_TYPE.TAKEAWAY

  // Take-away must have name + phone before paying
  const canPay = items.length > 0 && (!isTakeaway || takeawayValid)

  return (
    <aside className="flex h-full flex-col gap-4 bg-white p-5">
      <p className="text-xs font-bold tracking-widest text-slate-400">ORDER DETAILS</p>
      <h2 className="text-2xl font-black">{isTakeaway ? 'Take Away' : 'Dine In'}</h2>
      <OrderTypeTabs />
      {isTakeaway && <TakeawayForm />}

      <div className="min-h-0 flex-1 divide-y divide-slate-100 overflow-y-auto">
        {items.length === 0 ? <EmptyState title="Your order is empty" hint="Add items from the menu" /> : items.map((i) => <CartItem key={i.id} item={i} />)}
      </div>

      <OrderSummary />
      <PaymentSelect />
      <Button className="w-full py-3 text-base" disabled={!canPay} onClick={() => navigate('/checkout')}>
        Place Order
      </Button>
    </aside>
  )
}

export default OrderPanel
