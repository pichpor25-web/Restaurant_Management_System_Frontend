import Input from '../../components/ui/Input.jsx'
import { useCart } from '../../hooks/useCart.js'

const TakeawayForm = () => {
  const { customer, setCustomer } = useCart()
  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
      <Input label="Customer Name" value={customer.name} onChange={(e) => setCustomer({ name: e.target.value })} placeholder="Name" />
      <Input label="Phone Number" value={customer.phone} onChange={(e) => setCustomer({ phone: e.target.value })} placeholder="012 345 678" inputMode="tel" />
    </div>
  )
}

export default TakeawayForm
