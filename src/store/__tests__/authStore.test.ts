import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '../authStore'

describe('AuthStore', () => {
  beforeEach(() => {
    // Limpiar el estado antes de cada prueba
    useAuthStore.getState().logout()
  })

  it('should initialize with no authenticated user', () => {
    const { user, isAuthenticated } = useAuthStore.getState()
    
    expect(user).toBeNull()
    expect(isAuthenticated).toBe(false)
  })

  it('should login with valid credentials', async () => {
    const { login } = useAuthStore.getState()
    
    const result = await login('admin@test.com', 'password')
    const { user, isAuthenticated } = useAuthStore.getState()
    
    expect(result).toBe(true)
    expect(isAuthenticated).toBe(true)
    expect(user).toEqual({
      id: '1',
      email: 'admin@test.com',
      name: 'Administrador'
    })
  })

  it('should fail login with invalid credentials', async () => {
    const { login } = useAuthStore.getState()
    
    const result = await login('wrong@email.com', 'wrongpassword')
    const { user, isAuthenticated } = useAuthStore.getState()
    
    expect(result).toBe(false)
    expect(isAuthenticated).toBe(false)
    expect(user).toBeNull()
  })

  it('should logout user', async () => {
    const { login, logout } = useAuthStore.getState()
    
    // Primero hacer login
    await login('admin@test.com', 'password')
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
    
    // Luego hacer logout
    logout()
    const { user, isAuthenticated } = useAuthStore.getState()
    
    expect(isAuthenticated).toBe(false)
    expect(user).toBeNull()
  })
})