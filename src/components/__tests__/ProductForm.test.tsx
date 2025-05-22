import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProductForm from '../../components/Products/ProductForm'
import { useProductsStore } from '../../store/productsStore'

describe('ProductForm', () => {
  const mockOnSuccess = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useProductsStore.setState({ products: [] })
  })

  it('should render create form', () => {
    render(<ProductForm onSuccess={mockOnSuccess} />)
    
    expect(screen.getByLabelText('Nombre del Producto')).toBeInTheDocument()
    expect(screen.getByLabelText('Precio')).toBeInTheDocument()
    expect(screen.getByLabelText('Stock')).toBeInTheDocument()
    expect(screen.getByLabelText('Categoría')).toBeInTheDocument()
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument()
  })

  it('should render edit form with product data', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 99.99,
      category: 'Electrónica',
      stock: 10,
      description: 'Test description',
      createdAt: new Date().toISOString()
    }

    render(<ProductForm product={product} onSuccess={mockOnSuccess} />)
    
    expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument()
    expect(screen.getByDisplayValue('99.99')).toBeInTheDocument()
    expect(screen.getByDisplayValue('10')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Electrónica')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Actualizar' })).toBeInTheDocument()
  })

  it('should create a new product', async () => {
    render(<ProductForm onSuccess={mockOnSuccess} />)
    
    fireEvent.change(screen.getByLabelText('Nombre del Producto'), {
      target: { value: 'New Product' }
    })
    fireEvent.change(screen.getByLabelText('Precio'), {
      target: { value: '149.99' }
    })
    fireEvent.change(screen.getByLabelText('Stock'), {
      target: { value: '25' }
    })
    fireEvent.change(screen.getByLabelText('Categoría'), {
      target: { value: 'Electrónica' }
    })
    fireEvent.change(screen.getByLabelText('Descripción'), {
      target: { value: 'New product description' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: 'Crear' }))
    
    await waitFor(() => {
      const products = useProductsStore.getState().products
      expect(products).toHaveLength(1)
      expect(products[0].name).toBe('New Product')
      expect(products[0].price).toBe(149.99)
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })

  it('should update an existing product', async () => {
    const product = {
      id: '1',
      name: 'Original Product',
      price: 99.99,
      category: 'Electrónica',
      stock: 10,
      description: 'Original description',
      createdAt: new Date().toISOString()
    }

    // Agregar producto al store
    useProductsStore.setState({ products: [product] })

    render(<ProductForm product={product} onSuccess={mockOnSuccess} />)
    
    fireEvent.change(screen.getByDisplayValue('Original Product'), {
      target: { value: 'Updated Product' }
    })
    fireEvent.change(screen.getByDisplayValue('99.99'), {
      target: { value: '129.99' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: 'Actualizar' }))
    
    await waitFor(() => {
      const products = useProductsStore.getState().products
      expect(products[0].name).toBe('Updated Product')
      expect(products[0].price).toBe(129.99)
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })

  it('should show validation errors for required fields', async () => {
    render(<ProductForm onSuccess={mockOnSuccess} />)
    
    fireEvent.click(screen.getByRole('button', { name: 'Crear' }))
    
    await waitFor(() => {
      const errorMessages = screen.getAllByText('Este campo es requerido')
      expect(errorMessages.length).toBeGreaterThan(0)
    })
  })

  it('should show loading state during submission', async () => {
    render(<ProductForm onSuccess={mockOnSuccess} />)
  
    fireEvent.change(screen.getByLabelText('Nombre del Producto'), {
      target: { value: 'Test Product' }
    })
    fireEvent.change(screen.getByLabelText('Precio'), {
      target: { value: '99.99' }
    })
    fireEvent.change(screen.getByLabelText('Stock'), {
      target: { value: '10' }
    })
    fireEvent.change(screen.getByLabelText('Categoría'), {
      target: { value: 'Electrónica' }
    })
    fireEvent.change(screen.getByLabelText('Descripción'), {
      target: { value: 'Descripción de prueba' }
    })
  
    fireEvent.click(screen.getByRole('button', { name: 'Crear' }))
  
    // Esperar a que el estado de carga aparezca
    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/guardando/i)
      expect(screen.getByRole('button', { name: /guardando/i })).toBeDisabled()
    })
  
    // Verificar que vuelve a la normalidad luego
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /crear/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /crear/i })).not.toBeDisabled()
    })
  })
})
