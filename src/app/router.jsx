import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx'
import CustomerLayout from '../layouts/CustomerLayout.jsx'
import AdminLayout from '../layouts/AdminLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'

import MenuPage from '../pages/customer/MenuPage.jsx'
import CheckoutPage from '../pages/customer/CheckoutPage.jsx'
import DineInSuccessPage from '../pages/customer/DineInSuccessPage.jsx'
import TakeawaySuccessPage from '../pages/customer/TakeawaySuccessPage.jsx'
import OrderTrackingPage from '../pages/customer/OrderTrackingPage.jsx'

import LoginPage from '../pages/auth/LoginPage.jsx'

import DashboardPage from '../pages/admin/DashboardPage.jsx'
import OrdersPage from '../pages/admin/OrdersPage.jsx'
import MenuManagePage from '../pages/admin/MenuManagePage.jsx'
import CategoryManagePage from '../pages/admin/CategoryManagePage.jsx'
import InventoryPage from '../pages/admin/InventoryPage.jsx'
import TablesPage from '../pages/admin/TablesPage.jsx'
import PaymentsPage from '../pages/admin/PaymentsPage.jsx'
import ReportsPage from '../pages/admin/ReportsPage.jsx'
import UsersPage from '../pages/admin/UsersPage.jsx'

import TestBakongPage from '../pages/dev/TestBakongPage.jsx'

export const router = createBrowserRouter([
  {
    element: <CustomerLayout />,
    children: [
      { path: '/', element: <MenuPage /> }, // customer scans QR → lands here
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/order/dine-in/:id', element: <DineInSuccessPage /> },
      { path: '/order/takeaway/:id', element: <TakeawaySuccessPage /> },
      { path: '/track/:id', element: <OrderTrackingPage /> },
      { path: '/dev/bakong', element: <TestBakongPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'orders', element: <OrdersPage /> },
          { path: 'menu', element: <MenuManagePage /> },
          { path: 'categories', element: <CategoryManagePage /> },
          { path: 'inventory', element: <InventoryPage /> },
          { path: 'tables', element: <TablesPage /> },
          { path: 'payments', element: <PaymentsPage /> },
          { path: 'reports', element: <ReportsPage /> },
          { path: 'users', element: <UsersPage /> },
        ],
      },
    ],
  },
])
