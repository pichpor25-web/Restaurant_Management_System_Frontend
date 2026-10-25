import DataTable from '../../components/ui/DataTable.jsx'
import Button from '../../components/ui/Button.jsx'
import StatusBadge from './StatusBadge.jsx'
import { formatCurrency } from '../../utils/formatCurrency.js'
import { ORDER_STATUS } from '../../utils/constants.js'

const OrderTable = ({ orders, onStatusChange }) => (
  <DataTable
    rows={orders}
    empty="No orders"
    columns={[
      { key: 'order_number', header: 'Order' },
      { key: 'order_type', header: 'Type' },
      { key: 'total', header: 'Total', render: (o) => formatCurrency(o.total) },
      { key: 'status', header: 'Status', render: (o) => <StatusBadge status={o.status} /> },
      {
        key: 'actions',
        header: 'Actions',
        render: (o) =>
          o.status === ORDER_STATUS.PENDING && onStatusChange ? (
            <div className="flex gap-2">
              <Button onClick={() => onStatusChange(o.id, ORDER_STATUS.CONFIRMED)}>Confirm</Button>
              <Button variant="danger" onClick={() => onStatusChange(o.id, ORDER_STATUS.CANCELLED)}>Cancel</Button>
            </div>
          ) : null,
      },
    ]}
  />
)

export default OrderTable
