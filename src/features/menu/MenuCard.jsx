import { formatCurrency } from '../../utils/formatCurrency.js'
import { useCart } from '../../hooks/useCart.js'

const MenuCard = ({ item }) => {
  const { items, addItem, decreaseItem } = useCart()
  const inCart = items.find((i) => i.id === item.id)
  const image = item.image_url ?? item.image

  return (
    <div className={`rounded-3xl border bg-white p-4 ${inCart ? 'border-rose-500' : 'border-slate-200'}`}>
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
        {image && <img src={image} alt={item.name} className="h-full w-full object-cover" />}
      </div>
      <h3 className="mt-3 font-bold">{item.name}</h3>
      <p className="line-clamp-2 text-xs text-slate-400">{item.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-extrabold text-rose-600">{formatCurrency(item.price)}</span>
        {inCart ? (
          <div className="flex items-center gap-3 rounded-xl border border-rose-200 px-2 py-1">
            <button onClick={() => decreaseItem(item.id)}>-</button>
            <span className="text-sm font-bold">{inCart.qty}</span>
            <button className="rounded bg-rose-600 px-2 text-white" onClick={() => addItem(item)}>+</button>
          </div>
        ) : (
          <button
            className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white"
            onClick={() => addItem({ id: item.id, name: item.name, price: item.price, image })}
          >
            Add to Order
          </button>
        )}
      </div>
    </div>
  )
}

export default MenuCard
