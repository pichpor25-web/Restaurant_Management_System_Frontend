const SearchBar = ({ value, onChange, placeholder = 'Search any products…' }) => (
  <input
    className="w-full rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm outline-none focus:border-rose-500"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
  />
)

export default SearchBar
