import { createCrudService } from './crudService.js'
import { api } from './api.js'

export const tableService = {
  ...createCrudService('tables'),
  updateStatus: (id, status) => api.patch(`/tables/${id}/status`, { status }),
}
