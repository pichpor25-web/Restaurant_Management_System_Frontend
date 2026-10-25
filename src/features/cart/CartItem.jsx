import { formatCurrency } from '../../utils/formatCurrency.js'
import { useCart } from '../../hooks/useCart.js'

const CartItem = ({ item }) => {
  const { addItem, decreaseItem } = useCart()
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-bold">{item.name}</p>
        <p className="text-sm font-bold text-rose-600">{formatCurrency(item.price)} <span className="text-xs text-slate-400">{item.qty}x</span></p>
        <div className="mt-1 flex w-fit items-center gap-3 rounded-lg bg-slate-100 px-2 py-0.5 text-sm">
          <button onClick={() => decreaseItem(item.id)}>-</button>
          <b>{item.qty}</b>
          <button className="rounded bg-rose-600 px-1.5 text-white" onClick={() => addItem(item)}>+</button>
        </div>
      </div>
      <span className="font-bold text-rose-600">{formatCurrency(item.price * item.qty)}</span>
    </div>
  )
}

export default CartItem
