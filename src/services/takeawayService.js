import { createCrudService } from './crudService.js'

// POST /takeaway-orders expects { order_id, customer_name, customer_phone }
export const takeawayService = createCrudService('takeaway-orders')
