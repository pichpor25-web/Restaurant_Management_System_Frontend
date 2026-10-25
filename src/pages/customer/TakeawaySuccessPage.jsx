import { Link, useLocation, useParams } from 'react-router-dom'

const TakeawaySuccessPage = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const order = state?.order

  return (
    <div className="mx-auto max-w-md space-y-4 p-6 text-center">
      <h1 className="text-2xl font-black">Order placed 🎉</h1>
      <div className="rounded-3xl bg-amber-50 p-8">
        <p className="text-sm text-slate-500">Order number</p>
        <p className="text-4xl font-black text-rose-600">{order?.order_number ?? `#${id}`}</p>
        <p className="mt-3 text-sm text-slate-500">We will prepare it for pickup.</p>
      </div>
      <Link className="text-sm font-semibold text-rose-600" to={`/track/${id}`}>Track my order</Link>
    </div>
  )
}

export default TakeawaySuccessPage
