import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
  description: string
  createdAt: string
}

interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
  searchTerm: string
  currentPage: number
  pageSize: number
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  setSearchTerm: (term: string) => void
  setCurrentPage: (page: number) => void
  getFilteredProducts: () => Product[]
  getPaginatedProducts: () => Product[]
  getTotalPages: () => number
}

// Datos iniciales simulados
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Dell XPS 13',
    price: 1299.99,
    category: 'Electrónica',
    stock: 10,
    description: 'Laptop ultrabook con procesador Intel i7',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Mouse Logitech MX Master',
    price: 99.99,
    category: 'Accesorios',
    stock: 25,
    description: 'Mouse inalámbrico para productividad',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Teclado Mecánico RGB',
    price: 149.99,
    category: 'Accesorios',
    stock: 15,
    description: 'Teclado mecánico con iluminación RGB',
    createdAt: new Date().toISOString()
  }
]

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      loading: false,
      error: null,
      searchTerm: '',
      currentPage: 1,
      pageSize: 5,
      
      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          products: [...state.products, newProduct]
        }))
      },
      
      updateProduct: (id, updatedData) => {
        set((state) => ({
          products: state.products.map(product =>
            product.id === id ? { ...product, ...updatedData } : product
          )
        }))
      },
      
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter(product => product.id !== id)
        }))
      },
      
      setSearchTerm: (term) => {
        set({ searchTerm: term, currentPage: 1 })
      },
      
      setCurrentPage: (page) => {
        set({ currentPage: page })
      },
      
      getFilteredProducts: () => {
        const { products, searchTerm } = get()
        if (!searchTerm) return products
        
        return products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      },
      
      getPaginatedProducts: () => {
        const { currentPage, pageSize } = get()
        const filteredProducts = get().getFilteredProducts()
        const startIndex = (currentPage - 1) * pageSize
        const endIndex = startIndex + pageSize
        
        return filteredProducts.slice(startIndex, endIndex)
      },
      
      getTotalPages: () => {
        const { pageSize } = get()
        const filteredProducts = get().getFilteredProducts()
        return Math.ceil(filteredProducts.length / pageSize)
      }
    }),
    {
      name: 'products-storage',
    }
  )
)