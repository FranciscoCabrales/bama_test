import React from 'react'
import { Outlet, useRouterState } from '@tanstack/react-router'
import { useAuthStore } from '../../store/authStore'
import Sidebar from './Sidebar'
import Header from './Header'

const RootLayout: React.FC = () => {
  const { isAuthenticated } = useAuthStore()
  const router = useRouterState()
  const isLoginPage = router.location.pathname === '/login'

  if (!isAuthenticated || isLoginPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default RootLayout