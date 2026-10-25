import { createCrudService } from './crudService.js'
import { api } from './api.js'

const crud = createCrudService('menu-items')

// JSON → multipart so the image File can be sent. Empty values are skipped.
const toFormData = (data) => {
  const fd = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value === '' || value === null || value === undefined) return
    fd.append(key, value)
  })
  return fd
}

export const menuItemService = {
  ...crud,
  create: (data) => api.post('/menu-items', toFormData(data)),
  // PHP/Laravel cannot read multipart bodies sent with real PUT,
  // so we POST with _method=PUT (method spoofing) – the route still matches PUT.
  update: (id, data) => {
    const fd = toFormData(data)
    fd.append('_method', 'PUT')
    return api.post(`/menu-items/${id}`, fd)
  },
}