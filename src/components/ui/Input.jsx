const Input = ({ label, className = '', ...props }) => (
  <label className="grid gap-1 text-xs font-semibold text-slate-600">
    {label}
    <input
      className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15 ${className}`}
      {...props}
    />
  </label>
)

export default Input
