const EmptyState = ({ title = 'Nothing here yet', hint }) => (
  <div className="grid place-items-center py-12 text-center">
    <p className="font-semibold text-slate-700">{title}</p>
    {hint && <p className="mt-1 text-sm text-slate-400">{hint}</p>}
  </div>
)

export default EmptyState
