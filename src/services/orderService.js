import { createCrudService } from './crudService.js'
import { api } from './api.js'

export const orderService = {
  ...createCrudService('orders'),
  updateStatus: (id, status) => api.patch(`/orders/${id}`, { status }),
}
export const orderItemService = createCrudService('order-items')
