import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './authContext.js'
import { login as loginRequest, logout as logoutRequest } from '../services/authService.js'
import { TOKEN_KEY } from '../utils/constants.js'

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rms_user')) } catch { return null }
  })

  const login = useCallback(async (credentials) => {
    const data = await loginRequest(credentials)
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem('rms_user', JSON.stringify(data.user ?? null))
    setToken(data.token)
    setUser(data.user ?? null)
    return data
  }, [])

  const logout = useCallback(async () => {
    try { await logoutRequest() } catch { /* ignore */ }
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem('rms_user')
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ token, user, isAuthenticated: !!token, login, logout }),
    [token, user, login, logout],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
