import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router'
import { useAuthStore } from './store/authStore'
import RootLayout from './components/Layout/RootLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'

// Root route
const rootRoute = createRootRoute({
  component: () => <RootLayout />,
})

// Login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => <LoginPage />,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (isAuthenticated) {
      throw redirect({ to: '/dashboard' })
    }
  },
})

// Protected route helper
const createProtectedRoute = (path: string, Component: React.ComponentType) => {
  return createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => <Component />,
    beforeLoad: () => {
      const { isAuthenticated } = useAuthStore.getState()
      if (!isAuthenticated) {
        throw redirect({ to: '/login' })
      }
    },
  })
}

// Dashboard route
const dashboardRoute = createProtectedRoute('/dashboard', DashboardPage)

// Products route
const productsRoute = createProtectedRoute('/products', ProductsPage)

// Index route - redirect to dashboard or login
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (isAuthenticated) {
      throw redirect({ to: '/dashboard' })
    } else {
      throw redirect({ to: '/login' })
    }
  },
})

// Route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
  productsRoute,
])

// Create router
export const router = createRouter({ routeTree })

// Register router types
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
