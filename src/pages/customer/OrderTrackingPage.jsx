import { useParams } from 'react-router-dom'
import Loader from '../../components/ui/Loader.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import StatusBadge from '../../features/admin/StatusBadge.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { orderService } from '../../services/orderService.js'
import { formatCurrency } from '../../utils/formatCurrency.js'

const OrderTrackingPage = () => {
  const { id } = useParams()
  const { data: order, loading, error, reload } = useFetch(() => orderService.get(id), String(id))

  if (loading) return <Loader />
  return (
    <div className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-black">Order tracking</h1>
      <ErrorMessage message={error} />
      {order && (
        <div className="space-y-2 rounded-2xl bg-white p-5">
          <p className="font-bold">{order.order_number}</p>
          <StatusBadge status={order.status} />
          <p className="text-sm text-slate-500">Total: {formatCurrency(order.total)}</p>
        </div>
      )}
      <button className="text-sm font-semibold text-rose-600" onClick={reload}>Refresh status</button>
    </div>
  )
}

export default OrderTrackingPage
