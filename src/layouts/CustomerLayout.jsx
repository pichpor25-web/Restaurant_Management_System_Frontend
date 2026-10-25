import { Outlet } from 'react-router-dom'

// Customers reach this via QR code – no login, no sidebar.
const CustomerLayout = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <Outlet />
  </div>
)

export default CustomerLayout
