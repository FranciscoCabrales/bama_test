import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../store/authStore'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Por favor ingresa tu correo electrónico')
      return
    }

    if (!password) {
      setError('Por favor ingresa tu contraseña')
      return
    }

    setIsLoading(true)

    const success = await login(email, password)

    setIsLoading(false)

    if (success) {
      navigate({ to: '/dashboard' })
    } else {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
          <p className="text-gray-600 mt-2">Accede a tu panel de administración</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            // required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="admin@test.com"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="password"
            />
          </div>

          {error && (
            <p role="alert" className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}

          {isLoading && (
            <div role="status" aria-live="polite" className="sr-only">
              Iniciando sesión...
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-md text-sm text-gray-600 text-center">
          <strong>Credenciales de prueba:</strong><br />
          Email: admin@test.com<br />
          Password: password
        </div>
      </div>
    </div>
  )
}

export default LoginPage


