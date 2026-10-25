import { api } from './api.js'

// Builds list / get / create / update / remove for a REST resource
export const createCrudService = (resource) => ({
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return api.get(`/${resource}${qs ? `?${qs}` : ''}`)
  },
  get: (id) => api.get(`/${resource}/${id}`),
  create: (data) => api.post(`/${resource}`, data),
  update: (id, data) => api.put(`/${resource}/${id}`, data),
  remove: (id) => api.delete(`/${resource}/${id}`),
})
