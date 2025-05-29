import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useAuthStore } from '../../store/authStore'
import LoginPage from '../../pages/LoginPage'


const mockLocation = {
  href: ''
}
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true
})

// Mock del router
// const mockNavigate = vi.fn()
// vi.mock('@tanstack/react-router', () => ({
//   useNavigate: () => mockNavigate
// }))

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.getState().logout()
  })

  it('should render login form', () => {
    render(<LoginPage />)

    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('should show validation error when fields are empty', async () => {
    render(<LoginPage />)

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toHaveTextContent(/correo/i)
    })
  })

  it('should login successfully with valid credentials', async () => {
    const loginMock = vi.fn().mockResolvedValue(true)
    useAuthStore.setState({ login: loginMock })

    render(<LoginPage />)

    fireEvent.change(screen.getByLabelText('Correo Electrónico'), {
      target: { value: 'admin@test.com' }
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password' }
    })

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    await waitFor(() => {
      expect(mockLocation.href).toBe('/dashboard')
    })
  })

  it('should show loading state during login', async () => {
    const loginMock = vi.fn().mockImplementation(() =>
      new Promise((resolve) => setTimeout(() => resolve(true), 100))
    )
    useAuthStore.setState({ login: loginMock })

    render(<LoginPage />)

    fireEvent.change(screen.getByLabelText('Correo Electrónico'), {
      target: { value: 'admin@test.com' }
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password' }
    })

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    // Verifica estado de carga
    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/iniciando sesión/i)
      expect(screen.getByRole('button', { name: /iniciando sesión/i })).toBeDisabled()
    })

    // Verifica que regrese a estado normal
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /iniciar sesión/i })).not.toBeDisabled()
    })
  })
})

