import DataTable from '../../components/ui/DataTable.jsx'
import Badge from '../../components/ui/Badge.jsx'

const StockTable = ({ items }) => (
  <DataTable
    rows={items}
    empty="No inventory items"
    columns={[
      { key: 'name', header: 'Item' },
      { key: 'quantity', header: 'Quantity' },
      { key: 'unit', header: 'Unit' },
      {
        key: 'low',
        header: 'Stock',
        render: (i) =>
          Number(i.quantity) <= Number(i.reorder_level ?? 0)
            ? <Badge tone="red">Low</Badge>
            : <Badge tone="green">OK</Badge>,
      },
    ]}
  />
)

export default StockTable
