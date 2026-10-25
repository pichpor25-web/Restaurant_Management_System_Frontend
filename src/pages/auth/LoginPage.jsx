import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import { useAuth } from '../../hooks/useAuth.js'

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      navigate(location.state?.from?.pathname ?? '/admin', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <h1 className="text-2xl font-black">Admin login</h1>
      <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <ErrorMessage message={error} />
      <Button disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</Button>
    </form>
  )
}

export default LoginPage
