import { createCrudService } from './crudService.js'

// POST /dine-in-orders expects { order_id, table_id }
export const dineInService = createCrudService('dine-in-orders')
