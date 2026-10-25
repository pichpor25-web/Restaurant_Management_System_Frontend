import { createCrudService } from './crudService.js'
import { api } from './api.js'

export const inventoryService = {
  ...createCrudService('inventory'),
  adjustStock: (id, data) => api.post(`/inventory/${id}/adjust`, data),
}
