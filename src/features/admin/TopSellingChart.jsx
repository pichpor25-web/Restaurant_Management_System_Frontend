// data: [{ name, qty }]
const TopSellingChart = ({ data = [] }) => {
  const max = Math.max(1, ...data.map((d) => d.qty))
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="mb-4 font-bold">Top selling items</p>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.name}>
            <div className="flex justify-between text-sm"><span>{d.name}</span><b>{d.qty}</b></div>
            <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-rose-500" style={{ width: `${(d.qty / max) * 100}%` }} /></div>
          </div>
        ))}
        {data.length === 0 && <p className="text-sm text-slate-400">No data</p>}
      </div>
    </div>
  )
}

export default TopSellingChart
