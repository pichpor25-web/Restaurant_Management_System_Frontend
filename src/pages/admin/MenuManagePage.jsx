import { useState } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import Modal from '../../components/ui/Modal.jsx'
import Button from '../../components/ui/Button.jsx'
import Loader from '../../components/ui/Loader.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import MenuForm from '../../features/admin/MenuForm.jsx'
import { useCategories, useMenuItems } from '../../hooks/useMenu.js'
import { menuItemService } from '../../services/menuItemService.js'
import { formatCurrency } from '../../utils/formatCurrency.js'

const MenuManagePage = () => {
  const menu = useMenuItems({})
  const categories = useCategories()
  const [editing, setEditing] = useState(null) // null | {} (new) | item
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const save = async (form) => {
    setSaving(true)
    setError('')
    try {
      await (editing.id ? menuItemService.update(editing.id, form) : menuItemService.create(form))
      setEditing(null)
      menu.reload()
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this menu item?')) return
    await menuItemService.remove(id)
    menu.reload()
  }

  return (
    <>
      <PageHeader title="Menu" actions={<Button onClick={() => setEditing({})}>+ New item</Button>} />
      <ErrorMessage message={menu.error || error} />
      {menu.loading ? (
        <Loader />
      ) : (
        <DataTable
          rows={Array.isArray(menu.data) ? menu.data : []}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'price', header: 'Price', render: (r) => formatCurrency(r.price) },
            {
              key: 'actions',
              header: '',
              render: (r) => (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setEditing(r)}>Edit</Button>
                  <Button variant="danger" onClick={() => remove(r.id)}>Delete</Button>
                </div>
              ),
            },
          ]}
        />
      )}
      <Modal open={!!editing} title={editing?.id ? 'Edit item' : 'New item'} onClose={() => setEditing(null)}>
        {editing && (
          <MenuForm
            key={editing.id ?? 'new'}
            initial={editing}
            categories={Array.isArray(categories.data) ? categories.data : []}
            onSubmit={save}
            submitting={saving}
          />
        )}
      </Modal>
    </>
  )
}

export default MenuManagePage
