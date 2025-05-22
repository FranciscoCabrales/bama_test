import React from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import * as Separator from '@radix-ui/react-separator'
import { DashboardIcon, BoxIcon } from '@radix-ui/react-icons'

const Sidebar: React.FC = () => {
  const router = useRouterState()
  const currentPath = router.location.pathname

  const menuItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon className="w-5 h-5" />
    },
    {
      path: '/products',
      label: 'Productos',
      icon: <BoxIcon className="w-5 h-5" />
    }
  ]

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      
      <Separator.Root className="bg-gray-200 h-px mx-4" />
      
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPath === item.path
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar