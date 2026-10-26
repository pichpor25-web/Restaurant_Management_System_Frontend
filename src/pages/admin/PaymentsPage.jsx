// src/pages/admin/PaymentsPage.jsx
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
  const paidCount = payments.filter(p => p.status === 'PAID').length
  const pendingCount = payments.filter(p => p.status === 'PENDING').length

  return (
    <div className="min-h-screen transition-colors duration-300">
      <PageHeader title="Payments" subtitle="Payment history" />
      
      {/* កាតសង្ខេប ៣ ប្រការ ដូច Image 2 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Total Payments" value={payments.length} />
        <StatCard label="Total Amount" value={formatCurrency(total)} />
        <StatCard label="Paid" value={paidCount} hint="Paid & confirmed" />
        <StatCard label="Pending" value={pendingCount} hint="Waiting for confirmation" />
      </div>

      <ErrorMessage message={error} />
      
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
          <DataTable
            rows={payments}
            columns={[
              { key: 'id', header: '#' },
              { key: 'order_id', header: 'Order' },
              { key: 'method', header: 'Method' },
              { key: 'amount', header: 'Amount', render: (p) => formatCurrency(p.amount) },
              { 
                key: 'status', 
                header: 'Status',
                render: (p) => (
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    p.status === 'PAID' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {p.status}
                  </span>
                )
              },
            ]}
          />
        </div>
      )}
    </div>
  )
}

export default PaymentsPage