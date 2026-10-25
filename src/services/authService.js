import { api } from './api.js'

export const login = (credentials) => api.post('/login', credentials, { token: null })
export const register = (data) => api.post('/register', data, { token: null })
export const logout = () => api.post('/logout')
export const me = () => api.get('/user')
