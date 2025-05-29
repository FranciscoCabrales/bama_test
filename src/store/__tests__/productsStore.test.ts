import { describe, it, expect, beforeEach } from 'vitest'
import { useProductsStore } from '../productsStore'

describe('ProductsStore', () => {
  beforeEach(() => {
    // Resetear el store antes de cada prueba
    useProductsStore.setState({
      products: [],
      searchTerm: '',
      currentPage: 1,
      pageSize: 5
    })
  })

  it('should initialize with empty products', () => {
    const { products } = useProductsStore.getState()
    expect(products).toHaveLength(0)
  })

  it('should add a new product', () => {
    const { addProduct } = useProductsStore.getState()
    
    const newProduct = {
      name: 'Test Product',
      price: 99.99,
      category: 'Test',
      stock: 10,
      description: 'Test description'
    }
    
    addProduct(newProduct)
    
    const updatedProducts = useProductsStore.getState().products
    expect(updatedProducts).toHaveLength(1)
    expect(updatedProducts[0]).toMatchObject(newProduct)
    expect(updatedProducts[0].id).toBeDefined()
    expect(updatedProducts[0].createdAt).toBeDefined()
  })

  it('should update an existing product', () => {
    const { addProduct, updateProduct } = useProductsStore.getState()
    
    // Agregar producto
    addProduct({
      name: 'Original Product',
      price: 50,
      category: 'Test',
      stock: 5,
      description: 'Original description'
    })
    
    const productId = useProductsStore.getState().products[0].id
    
    // Actualizar producto
    updateProduct(productId, {
      name: 'Updated Product',
      price: 75
    })
    
    const updatedProduct = useProductsStore.getState().products[0]
    expect(updatedProduct.name).toBe('Updated Product')
    expect(updatedProduct.price).toBe(75)
    expect(updatedProduct.stock).toBe(5) // Should remain unchanged
  })

  it('should delete a product', () => {
    const { addProduct, deleteProduct } = useProductsStore.getState()
    
    // Agregar producto
    addProduct({
      name: 'Product to Delete',
      price: 30,
      category: 'Test',
      stock: 3,
      description: 'Will be deleted'
    })
    
    const productId = useProductsStore.getState().products[0].id
    expect(useProductsStore.getState().products).toHaveLength(1)
    
    // Eliminar producto
    deleteProduct(productId)
    
    expect(useProductsStore.getState().products).toHaveLength(0)
  })

  it('should filter products by search term', () => {
    const { addProduct, setSearchTerm, getFilteredProducts } = useProductsStore.getState()
    
    // Agregar productos
    addProduct({
      name: 'Laptop Dell',
      price: 1000,
      category: 'Electronics',
      stock: 5,
      description: 'High performance laptop'
    })
    
    addProduct({
      name: 'Mouse Logitech',
      price: 50,
      category: 'Accessories',
      stock: 20,
      description: 'Wireless mouse'
    })
    
    // Buscar por nombre
    setSearchTerm('Laptop')
    let filtered = getFilteredProducts()
    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe('Laptop Dell')
    
    // Buscar por categoría
    setSearchTerm('Accessories')
    filtered = getFilteredProducts()
    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe('Mouse Logitech')
    
    // Sin filtro
    setSearchTerm('')
    filtered = getFilteredProducts()
    expect(filtered).toHaveLength(2)
  })

  it('should paginate products correctly', () => {
    const { addProduct, setCurrentPage, getPaginatedProducts, getTotalPages } = useProductsStore.getState()
    
    // Agregar 7 productos
    for (let i = 0; i < 7; i++) {
      addProduct({
        name: `Product ${i + 1}`,
        price: 100,
        category: 'Test',
        stock: 10,
        description: `Product ${i + 1} description`
      })
    }
    
    // Con pageSize = 5, deberíamos tener 2 páginas
    expect(getTotalPages()).toBe(2)
    
    // Primera página: 5 productos
    setCurrentPage(1)
    let paginated = getPaginatedProducts()
    expect(paginated).toHaveLength(5)
    
    // Segunda página: 2 productos
    setCurrentPage(2)
    paginated = getPaginatedProducts()
    expect(paginated).toHaveLength(2)
  })
})