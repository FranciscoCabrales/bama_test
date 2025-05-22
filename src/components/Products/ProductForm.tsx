import React, { useState } from 'react'
import { useProductsStore, Product } from '../../store/productsStore'

interface ProductFormProps {
  product?: Product
  onSuccess: () => void
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess }) => {
  const { addProduct, updateProduct } = useProductsStore()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    category: product?.category || '',
    stock: product?.stock || 0,
    description: product?.description || ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
  
    try {
      // Simular demora para que isLoading sea visible
      await new Promise((resolve) => setTimeout(resolve, 100))
  
      if (product) {
        updateProduct(product.id, formData)
      } else {
        addProduct(formData)
      }
      onSuccess()
    } catch (error) {
      console.error('Error saving product:', error)
    } finally {
      setIsLoading(false)
    }
  }
  

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Producto
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Accesorios">Accesorios</option>
          <option value="Ropa">Ropa</option>
          <option value="Hogar">Hogar</option>
          <option value="Deportes">Deportes</option>
          <option value="Libros">Libros</option>
          <option value="Otros">Otros</option>
        </select>
        <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>

      {isLoading && (
        <div role="status" aria-live="polite" className="sr-only">
          Guardando...
        </div>
      )}

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Guardando...' : (product ? 'Actualizar' : 'Crear')}
        </button>
      </div>
    </form>
  )
}

export default ProductForm


