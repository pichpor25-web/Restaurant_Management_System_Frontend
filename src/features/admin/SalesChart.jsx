// Dependency-free bar chart. data: [{ label, value }]
// Swap for recharts later: npm i recharts
const SalesChart = ({ data = [], title = 'Sales' }) => {
  const max = Math.max(1, ...data.map((d) => d.value))
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="mb-4 font-bold">{title}</p>
      <div className="flex h-48 items-end gap-3">
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
            <div className="w-full rounded-t-lg bg-rose-500" style={{ height: `${(d.value / max) * 100}%` }} title={d.value} />
            <span className="text-xs text-slate-400">{d.label}</span>
          </div>
        ))}
        {data.length === 0 && <p className="m-auto text-sm text-slate-400">No data</p>}
      </div>
    </div>
  )
}

export default SalesChart
