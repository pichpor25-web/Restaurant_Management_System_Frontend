import { FaShoppingBasket } from 'react-icons/fa'
import { useCart } from '../../hooks/useCart.js'
import { formatCurrency } from '../../utils/formatCurrency.js'

// Floating basket button (bottom-right) – opens the cart pop-up
const CartButton = ({ onClick }) => {
  const { items, totals } = useCart()
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <button
      onClick={onClick}
      aria-label={`Open order, ${count} items`}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-rose-600 py-3 pl-4 pr-5 text-white shadow-xl shadow-rose-900/25 transition hover:bg-rose-700 active:scale-95"
    >
      <span className="relative">
        <FaShoppingBasket size={24} />
        {count > 0 && (
          <span
            key={count}
            className="absolute -right-3 -top-3 grid min-w-5 place-items-center rounded-full bg-white px-1 text-[11px] font-black text-rose-600"
          >
            {count}
          </span>
        )}
      </span>
      {count > 0 && <span className="text-sm font-bold">{formatCurrency(totals.total)}</span>}
    </button>
  )
}

export default CartButton