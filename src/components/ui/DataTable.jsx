// columns: [{ key, header, render?: (row) => node }]
const DataTable = ({ columns, rows = [], empty = 'No data' }) => (
  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 text-xs uppercase text-slate-500">
        <tr>{columns.map((c) => <th key={c.key} className="px-4 py-3">{c.header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.length === 0 && (
          <tr><td className="px-4 py-8 text-center text-slate-400" colSpan={columns.length}>{empty}</td></tr>
        )}
        {rows.map((row, i) => (
          <tr key={row.id ?? i} className="border-t border-slate-100">
            {columns.map((c) => (
              <td key={c.key} className="px-4 py-3">{c.render ? c.render(row) : row[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default DataTable
