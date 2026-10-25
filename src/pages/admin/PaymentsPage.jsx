import PageHeader from '../../components/common/PageHeader.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import StatCard from '../../features/admin/StatCard.jsx'
import Loader from '../../components/ui/Loader.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { listPayments } from '../../services/paymentService.js'
import { formatCurrency } from '../../utils/formatCurrency.js'

const PaymentsPage = () => {
  const { data, loading, error } = useFetch(() => listPayments())
  const payments = Array.isArray(data) ? data : []
  const total = payments.reduce((s, p) => s + Number(p.amount || 0), 0)

  return (
    <>
      <PageHeader title="Payments" subtitle="Payment history" />
      <div className="mb-4 max-w-xs"><StatCard label="total_payment" value={formatCurrency(total)} /></div>
      <ErrorMessage message={error} />
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          rows={payments}
          columns={[
            { key: 'id', header: '#' },
            { key: 'order_id', header: 'Order' },
            { key: 'method', header: 'Method' },
            { key: 'amount', header: 'Amount', render: (p) => formatCurrency(p.amount) },
            { key: 'status', header: 'Status' },
          ]}
        />
      )}
    </>
  )
}

export default PaymentsPage
