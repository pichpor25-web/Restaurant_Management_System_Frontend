import { createCrudService } from './crudService.js'
import { api } from './api.js'

export const takeawayService = {
  ...createCrudService('takeaway-orders'),
  place: (payload) => api.post('/takeaway-orders', payload), // { customer_name, phone, items }
}
