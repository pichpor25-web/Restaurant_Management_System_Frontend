import StatusBadge from './StatusBadge.jsx'

const color = {
  available: 'border-emerald-300 bg-emerald-50',
  occupied: 'border-red-300 bg-red-50',
  reserved: 'border-amber-300 bg-amber-50',
}

const TableGrid = ({ tables = [] }) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
    {tables.map((t) => (
      <div key={t.id} className={`grid gap-2 rounded-2xl border p-4 text-center ${color[t.status] ?? 'border-slate-200 bg-white'}`}>
        <p className="text-2xl font-black">#{t.table_number ?? t.number ?? t.id}</p>
        <StatusBadge status={t.status} />
      </div>
    ))}
  </div>
)

export default TableGrid
