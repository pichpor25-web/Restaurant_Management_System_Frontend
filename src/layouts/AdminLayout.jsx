import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/menu', label: 'Menu' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/inventory', label: 'Inventory / Stock' },
  { to: '/admin/tables', label: 'Tables' },
  { to: '/admin/payments', label: 'Payments' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/users', label: 'Staff' },
]

const AdminLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white p-4 md:flex">
        <p className="mb-6 px-3 text-lg font-black text-rose-600">Restaurant Admin</p>
        <nav className="grid gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-semibold ${
                  isActive ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
          <span className="text-sm text-slate-500">Signed in as <b>{user?.name ?? 'Admin'}</b></span>
          <button
            className="text-sm font-semibold text-rose-600"
            onClick={async () => { await logout(); navigate('/login') }}
          >
            Logout
          </button>
        </header>
        <main className="flex-1 p-6"><Outlet /></main>
      </div>
    </div>
  )
}

export default AdminLayout
