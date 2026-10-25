import { useState } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'
import Loader from '../../components/ui/Loader.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import { useCategories } from '../../hooks/useMenu.js'
import { categoryService } from '../../services/categoryService.js'

const CategoryManagePage = () => {
  const { data, loading, error, reload } = useCategories()
  const [name, setName] = useState('')

  const add = async () => {
    if (!name.trim()) return
    await categoryService.create({ name })
    setName('')
    reload()
  }
  const remove = async (id) => {
    if (!confirm('Delete this category?')) return
    await categoryService.remove(id)
    reload()
  }

  return (
    <>
      <PageHeader title="Categories" />
      <div className="mb-4 flex max-w-md items-end gap-2">
        <div className="flex-1"><Input label="New category" value={name} onChange={(e) => setName(e.target.value)} /></div>
        <Button onClick={add}>Add</Button>
      </div>
      <ErrorMessage message={error} />
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          rows={Array.isArray(data) ? data : []}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'actions', header: '', render: (r) => <Button variant="danger" onClick={() => remove(r.id)}>Delete</Button> },
          ]}
        />
      )}
    </>
  )
}

export default CategoryManagePage
