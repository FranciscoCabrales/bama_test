import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Avatar from '@radix-ui/react-avatar'
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from '@tanstack/react-router'

const Header: React.FC = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Panel de Administración
          </h2>
        </div>
        
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Avatar.Root className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                <Avatar.Image
                  className="w-full h-full object-cover rounded-full"
                  src=""
                  alt={user?.name}
                />
                <Avatar.Fallback className="text-blue-700 text-sm font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </Avatar.Fallback>
              </Avatar.Root>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-48 bg-white rounded-md shadow-lg border border-gray-200 p-1"
              sideOffset={5}
            >
              <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <PersonIcon className="w-4 h-4" />
                <span>Perfil</span>
              </DropdownMenu.Item>
              
              <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
              
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
                onClick={handleLogout}
              >
                <ExitIcon className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  )
}

export default Header