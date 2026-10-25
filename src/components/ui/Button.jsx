const variants = {
  primary: 'bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-900/10',
  outline: 'border border-rose-200 text-rose-600 hover:bg-rose-50',
  ghost: 'text-slate-600 hover:bg-slate-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const Button = ({ variant = 'primary', className = '', ...props }) => (
  <button
    className={`rounded-xl px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    {...props}
  />
)

export default Button
