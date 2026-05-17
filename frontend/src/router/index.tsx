import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './routes'
import AuthGuard from './guards/AuthGuard'
import RoleGuard from './guards/RoleGuard'

// Pages — lazy-loaded for code splitting
import { lazy } from 'react'
const LandingPage    = lazy(() => import('@/pages/LandingPage'))
const LoginPage      = lazy(() => import('@/pages/LoginPage'))
const RegisterPage   = lazy(() => import('@/pages/RegisterPage'))
const DashboardPage  = lazy(() => import('@/pages/DashboardPage'))
const AdminPage      = lazy(() => import('@/pages/AdminPage'))

export const router = createBrowserRouter([
  // Public
  { path: ROUTES.HOME,     element: <LandingPage /> },
  { path: ROUTES.LOGIN,    element: <LoginPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },

  // Authenticated
  {
    element: <AuthGuard />,
    children: [
      { path: ROUTES.DASHBOARD,    element: <DashboardPage /> },
      { path: ROUTES.APPLICATIONS, element: <DashboardPage /> },
      { path: ROUTES.COINS,        element: <DashboardPage /> },
      { path: ROUTES.INVESTMENTS,  element: <DashboardPage /> },
      { path: ROUTES.PROFILE,      element: <DashboardPage /> },
    ],
  },

  // Admin only
  {
    element: <AuthGuard />,
    children: [
      {
        element: <RoleGuard allowedRoles={['admin', 'manager']} />,
        children: [
          { path: ROUTES.ADMIN,     element: <AdminPage /> },
          { path: ROUTES.ADMIN_APPS, element: <AdminPage /> },
        ],
      },
    ],
  },
])
