import PageHeader from '../../components/common/PageHeader.jsx'
import OrderTable from '../../features/admin/OrderTable.jsx'
import Loader from '../../components/ui/Loader.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import { useOrders } from '../../hooks/useOrders.js'
import { orderService } from '../../services/orderService.js'

const OrdersPage = () => {
  const { data, loading, error, reload } = useOrders({})

  const changeStatus = async (id, status) => {
    await orderService.updateStatus(id, status)
    reload()
  }

  return (
    <>
      <PageHeader title="Orders" subtitle="Confirm or cancel incoming orders" />
      <ErrorMessage message={error} />
      {loading ? <Loader /> : <OrderTable orders={Array.isArray(data) ? data : []} onStatusChange={changeStatus} />}
    </>
  )
}

export default OrdersPage
