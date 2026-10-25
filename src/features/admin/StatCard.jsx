const StatCard = ({ label, value, hint }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5">
    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
    <p className="mt-2 text-3xl font-black text-slate-900">{value}</p>
    {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
  </div>
)

export default StatCard
