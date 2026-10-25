import { api } from './api.js'

export const login = (credentials) => api.post('/login', credentials, { token: null })
export const logout = () => api.post('/logout')
export const me = () => api.get('/me')
