// src/services/inventoryService.js
import { api } from "./api.js";

export const inventoryService = {
  // ទាញយកទិន្នន័យទាំងអស់
  getAll: () => api.get("/inventory"),

  // បន្ថែមទំនិញថ្មី
  create: (data) => api.post("/inventory", data),

  // កែសម្រួលព័ត៌មានទំនិញ
  update: (id, data) => api.put(`/inventory/${id}`, data),

  // លុបទំនិញ
  remove: (id) => api.delete(`/inventory/${id}`),

  // កែសម្រួលចំនួន Stock (Stock In/Out)
  adjustStock: (id, data) => api.post(`/inventory/${id}/adjust`, data),
};
