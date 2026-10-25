import PageHeader from '../../components/common/PageHeader.jsx'
import StatCard from '../../features/admin/StatCard.jsx'
import SalesChart from '../../features/admin/SalesChart.jsx'
import TopSellingChart from '../../features/admin/TopSellingChart.jsx'
import OrderTable from '../../features/admin/OrderTable.jsx'
import Loader from '../../components/ui/Loader.jsx'
import { useOrders } from '../../hooks/useOrders.js'
import { formatCurrency } from '../../utils/formatCurrency.js'

const DashboardPage = () => {
  const { data, loading } = useOrders({})
  const orders = Array.isArray(data) ? data : []

  const revenue = orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + Number(o.total || 0), 0)
  const pending = orders.filter((o) => o.status === 'pending').length

  // Group revenue by day for the chart
  const byDay = Object.values(
    orders.reduce((acc, o) => {
      const d = (o.created_at ?? '').slice(5, 10) || '—'
      acc[d] = acc[d] ?? { label: d, value: 0 }
      acc[d].value += Number(o.total || 0)
      return acc
    }, {}),
  ).slice(-7)

  if (loading) return <Loader />
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of today's restaurant activity" />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total payment" value={formatCurrency(revenue)} />
        <StatCard label="Orders" value={orders.length} />
        <StatCard label="Pending" value={pending} hint="Waiting for confirmation" />
        <StatCard label="Avg. order" value={formatCurrency(orders.length ? revenue / orders.length : 0)} />
      </div>
      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2"><SalesChart title="Sales (last 7 days)" data={byDay} /></div>
        <TopSellingChart data={[]} />
      </div>
      <OrderTable orders={orders.slice(0, 8)} />
    </>
  )
}

export default DashboardPage
