import { useState } from 'react'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'

const empty = { name: '', price: '', description: '', category_id: '', image_url: '' }

const MenuForm = ({ initial = empty, categories = [], onSubmit, submitting }) => {
  const [form, setForm] = useState({ ...empty, ...initial })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="grid gap-3">
      <Input label="Name" value={form.name} onChange={set('name')} />
      <Input label="Price" type="number" step="0.01" value={form.price} onChange={set('price')} />
      <Input label="Image URL" value={form.image_url} onChange={set('image_url')} />
      <Input label="Description" value={form.description} onChange={set('description')} />
      <label className="grid gap-1 text-xs font-semibold text-slate-600">
        Category
        <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm" value={form.category_id} onChange={set('category_id')}>
          <option value="">Select…</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>
      <Button disabled={submitting} onClick={() => onSubmit(form)}>{submitting ? 'Saving…' : 'Save'}</Button>
    </div>
  )
}

export default MenuForm
