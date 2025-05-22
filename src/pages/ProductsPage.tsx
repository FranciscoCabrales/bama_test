import React, { useState } from 'react'
import { useProductsStore, Product } from '../store/productsStore'
import * as Dialog from '@radix-ui/react-dialog'
import { PlusIcon, MagnifyingGlassIcon, Pencil1Icon, TrashIcon, Cross2Icon } from '@radix-ui/react-icons'
import ProductForm from '../components/Products/ProductForm'
import ProductTable from '../components/Products/ProductTable'
import SearchInput from '../components/UI/SearchInput'
import Pagination from '../components/UI/Pagination'

const ProductsPage: React.FC = () => {
  const {
    searchTerm,
    currentPage,
    setSearchTerm,
    setCurrentPage,
    getPaginatedProducts,
    getTotalPages,
    deleteProduct
  } = useProductsStore()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const paginatedProducts = getPaginatedProducts()
  const totalPages = getTotalPages()

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsEditModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      deleteProduct(id)
    }
  }

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false)
  }

  const handleEditSuccess = () => {
    setIsEditModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600">Gestiona tu inventario de productos</p>
        </div>
        
        <Dialog.Root open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <Dialog.Trigger asChild>
            <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <PlusIcon className="w-4 h-4" />
              <span>Nuevo Producto</span>
            </button>
          </Dialog.Trigger>
          
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold">
                  Crear Producto
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Cross2Icon className="w-5 h-5" />
                  </button>
                </Dialog.Close>
              </div>
              
              <ProductForm onSuccess={handleCreateSuccess} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar productos por nombre o categoría..."
            />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow">
        <ProductTable
          products={paginatedProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Dialog.Root open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-semibold">
                Editar Producto
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-gray-600">
                  <Cross2Icon className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>
            
            {selectedProduct && (
              <ProductForm
                product={selectedProduct}
                onSuccess={handleEditSuccess}
              />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default ProductsPage
