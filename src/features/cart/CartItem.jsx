import { FiMinus, FiPlus } from 'react-icons/fi'
import { formatCurrency } from '../../utils/formatCurrency.js'
import { useCart } from '../../hooks/useCart.js'

const CartItem = ({ item }) => {
  const { addItem, decreaseItem } = useCart()
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        {item.image && <img src={item.image} alt={item.name} className="size-full object-cover" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{item.name}</p>
        <p className="text-sm font-bold text-rose-600">
          {formatCurrency(item.price)} <span className="text-xs font-normal text-slate-400">{item.qty}x</span>
        </p>
        <div className="mt-1 flex w-fit items-center gap-3 rounded-lg bg-slate-100 p-1 text-sm">
          <button
            onClick={() => decreaseItem(item.id)}
            aria-label="Decrease"
            className="grid size-6 place-items-center rounded-md bg-white text-slate-600"
          >
            <FiMinus size={14} />
          </button>
          <b className="min-w-4 text-center">{item.qty}</b>
          <button
            onClick={() => addItem(item)}
            aria-label="Increase"
            className="grid size-6 place-items-center rounded-md bg-rose-600 text-white"
          >
            <FiPlus size={14} />
          </button>
        </div>
      </div>
      <span className="font-bold text-rose-600">{formatCurrency(item.price * item.qty)}</span>
    </div>
  )
}

export default CartItem