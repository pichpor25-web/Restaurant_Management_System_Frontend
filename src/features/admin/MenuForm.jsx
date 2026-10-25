import { useEffect, useRef, useState } from 'react'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'
import { imageUrl } from '../../utils/imageUrl.js'

const MAX_SIZE = 2 * 1024 * 1024 // 2 MB
const empty = { name: '', price: '', description: '', category_id: '' }

const MenuForm = ({ initial = {}, categories = [], onSubmit, submitting }) => {
  const [form, setForm] = useState({
    ...empty,
    name: initial.name ?? '',
    price: initial.price ?? '',
    description: initial.description ?? '',
    category_id: initial.category_id ?? '',
  })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')

  // Free the temporary preview URL when the form closes
  const previewRef = useRef('')
  useEffect(() => () => URL.revokeObjectURL(previewRef.current), [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const pickFile = (e) => {
    const chosen = e.target.files?.[0]
    setError('')
    if (!chosen) return
    if (!chosen.type.startsWith('image/')) return setError('Please choose an image file.')
    if (chosen.size > MAX_SIZE) return setError('Image must be 2 MB or smaller.')
    URL.revokeObjectURL(previewRef.current)
    previewRef.current = URL.createObjectURL(chosen)
    setPreview(previewRef.current)
    setFile(chosen)
  }

  const shownImage = file ? preview : imageUrl(initial.image ?? initial.image_url)

  const submit = () => {
    if (!form.name.trim()) return setError('Name is required.')
    if (form.price === '' || Number(form.price) < 0) return setError('Enter a valid price.')
    setError('')
    // `image` is only sent when a new file was chosen (keeps the old one on edit)
    onSubmit({ ...form, ...(file && { image: file }) })
  }

  return (
    <div className="grid gap-3">
      <Input label="Name" value={form.name} onChange={set('name')} />
      <Input label="Price" type="number" step="0.01" min="0" value={form.price} onChange={set('price')} />

      <div className="grid gap-1 text-xs font-semibold text-slate-600">
        Image
        <div className="flex items-center gap-3">
          <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
            {shownImage ? <img src={shownImage} alt="Preview" className="size-full object-cover" /> : 'No image'}
          </div>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={pickFile}
            className="w-full text-sm font-normal file:mr-3 file:rounded-lg file:border-0 file:bg-rose-50 file:px-3 file:py-2 file:font-semibold file:text-rose-600"
          />
        </div>
        <span className="font-normal text-slate-400">JPG, PNG or WebP, max 2 MB</span>
      </div>

      <Input label="Description" value={form.description} onChange={set('description')} />
      <label className="grid gap-1 text-xs font-semibold text-slate-600">
        Category
        <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm" value={form.category_id} onChange={set('category_id')}>
          <option value="">Select…</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>

      {error && <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</p>}
      <Button disabled={submitting} onClick={submit}>{submitting ? 'Saving…' : 'Save'}</Button>
    </div>
  )
}

export default MenuForm