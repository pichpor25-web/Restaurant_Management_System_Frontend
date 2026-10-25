import { createCrudService } from './crudService.js'
import { api } from './api.js'

export const dineInService = {
  ...createCrudService('dine-in-orders'),
  // Backend should pick a free table and return it (table_number) with the order
  place: (payload) => api.post('/dine-in-orders', payload),
}
