import { Outlet } from 'react-router-dom'

const AuthLayout = () => (
  <div className="grid min-h-screen place-items-center bg-slate-50 p-4">
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
      <Outlet />
    </div>
  </div>
)

export default AuthLayout
