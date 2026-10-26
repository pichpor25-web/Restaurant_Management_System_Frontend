// src/pages/admin/MenuManagePage.jsx
import { useState } from "react";
import PageHeader from "../../components/common/PageHeader.jsx";
import DataTable from "../../components/ui/DataTable.jsx";
import Modal from "../../components/ui/Modal.jsx";
import Button from "../../components/ui/Button.jsx";
import Loader from "../../components/ui/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import MenuForm from "../../features/admin/MenuForm.jsx";
import { useCategories, useMenuItems } from "../../hooks/useMenu.js";
import { menuItemService } from "../../services/menuItemService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { imageUrl } from "../../utils/imageUrl.js";

const MenuManagePage = () => {
  const menu = useMenuItems({});
  const categories = useCategories();
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ១. បន្ថែម State សម្រាប់ការលុប (Delete Confirmation)
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const save = async (form) => {
    setSaving(true);
    setError("");
    try {
      await (editing.id
        ? menuItemService.update(editing.id, form)
        : menuItemService.create(form));
      setEditing(null);
      menu.reload();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  // ២. កែ Function remove ឱ្យប្រើ Modal
  const confirmRemove = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await menuItemService.remove(deletingId);
      menu.reload();
      setDeletingId(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <PageHeader
        title="Menu"
        actions={<Button onClick={() => setEditing({})}>+ New item</Button>}
      />
      <ErrorMessage message={menu.error || error} />

      {menu.loading ? (
        <Loader />
      ) : (
        <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors">
          <DataTable
            rows={Array.isArray(menu.data) ? menu.data : []}
            columns={[
              {
                key: "image",
                header: "Image",
                render: (r) => {
                  const src = imageUrl(r.image ?? r.image_url);
                  return src ? (
                    <img
                      src={src}
                      alt={r.name}
                      className="size-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-700" />
                  );
                },
              },
              {
                key: "name",
                header: "Name",
                render: (r) => (
                  <span className="text-gray-900 dark:text-gray-200">
                    {r.name}
                  </span>
                ),
              },
              {
                key: "price",
                header: "Price",
                render: (r) => (
                  <span className="text-gray-900 dark:text-gray-200">
                    {formatCurrency(r.price)}
                  </span>
                ),
              },
              {
                key: "actions",
                header: "",
                render: (r) => (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setEditing(r)}>
                      Edit
                    </Button>
                    {/* ៣. ប្តូរពណ៌ Delete ពីក្រហម ទៅជាពណ៌ Rose ឬ Slate ស្អាតៗ */}
                    <button
                      onClick={() => setDeletingId(r.id)}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      )}

      {/* Modal សម្រាប់ Edit/Create */}
      <Modal
        open={!!editing}
        title={editing?.id ? "Edit item" : "New item"}
        onClose={() => setEditing(null)}
      >
        {editing && (
          <MenuForm
            key={editing.id ?? "new"}
            initial={editing}
            categories={Array.isArray(categories.data) ? categories.data : []}
            onSubmit={save}
            submitting={saving}
          />
        )}
      </Modal>

      {/* ៤. Modal ថ្មីសម្រាប់ Confirm Delete */}
      <Modal
        open={!!deletingId}
        title="Confirm Deletion"
        onClose={() => setDeletingId(null)}
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeletingId(null)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmRemove}
              disabled={isDeleting}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MenuManagePage;
