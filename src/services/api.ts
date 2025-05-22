import axios from 'axios'
import { Product } from '../store/productsStore'

// Configuración de axios
const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

// Interceptor para agregar token de autenticación
api.interceptors.request.use((config) => {
  const authData = localStorage.getItem('auth-storage')
  if (authData) {
    const { state } = JSON.parse(authData)
    if (state.isAuthenticated) {
      config.headers.Authorization = `Bearer ${state.user?.id}`
    }
  }
  return config
})

// Mock API usando localStorage como backend simulado
export class MockAPI {
  private static getStorageKey(resource: string): string {
    return `mock-api-${resource}`
  }

  private static getData<T>(resource: string): T[] {
    const data = localStorage.getItem(this.getStorageKey(resource))
    return data ? JSON.parse(data) : []
  }

  private static setData<T>(resource: string, data: T[]): void {
    localStorage.setItem(this.getStorageKey(resource), JSON.stringify(data))
  }

  // Productos
  static async getProducts(): Promise<Product[]> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.getData<Product>('products')
  }

  static async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const products = this.getData<Product>('products')
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }
    
    products.push(newProduct)
    this.setData('products', products)
    
    return newProduct
  }

  static async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const products = this.getData<Product>('products')
    const index = products.findIndex(p => p.id === id)
    
    if (index === -1) {
      throw new Error('Producto no encontrado')
    }
    
    products[index] = { ...products[index], ...updates }
    this.setData('products', products)
    
    return products[index]
  }

  static async deleteProduct(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const products = this.getData<Product>('products')
    const filteredProducts = products.filter(p => p.id !== id)
    
    this.setData('products', filteredProducts)
  }
}

// Funciones del servicio API
export const apiService = {
  // Autenticación
  login: async (email: string, password: string) => {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (email === 'admin@test.com' && password === 'password') {
      return {
        user: { id: '1', email, name: 'Administrador' },
        token: 'mock-jwt-token'
      }
    }
    
    throw new Error('Credenciales inválidas')
  },

  // Productos
  getProducts: () => MockAPI.getProducts(),
  createProduct: (product: Omit<Product, 'id' | 'createdAt'>) => MockAPI.createProduct(product),
  updateProduct: (id: string, updates: Partial<Product>) => MockAPI.updateProduct(id, updates),
  deleteProduct: (id: string) => MockAPI.deleteProduct(id),
}

export default api