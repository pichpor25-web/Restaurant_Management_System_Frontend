const CategoryTabs = ({ categories = [], activeId, onChange }) => {
  const all = [{ id: null, name: 'All Menu' }, ...categories]
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {all.map((c) => (
        <button
          key={c.id ?? 'all'}
          onClick={() => onChange(c.id)}
          className={`shrink-0 rounded-2xl border px-5 py-3 text-left text-sm font-bold transition ${
            activeId === c.id ? 'border-rose-500 bg-white text-rose-600' : 'border-slate-200 bg-white text-slate-700'
          }`}
        >
          {c.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs
