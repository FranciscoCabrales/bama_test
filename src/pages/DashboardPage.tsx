import React from 'react'
import { Link } from '@tanstack/react-router'
import { useProductsStore } from '../store/productsStore'
import { useAuthStore } from '../store/authStore'
import { BoxIcon, PlusIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

const DashboardPage: React.FC = () => {
  const { products } = useProductsStore()
  const { user } = useAuthStore()

  const totalProducts = products.length
  const totalValue = products.reduce((sum: number, product: { price: number; stock: number }) => sum + (product.price * product.stock), 0)
  const lowStockProducts = products.filter((product: { stock: number }) => product.stock < 10).length
  const categories = [...new Set(products.map((product: { category: any }) => product.category))].length

  const stats = [
    {
      title: 'Total Productos',
      value: totalProducts,
      icon: <BoxIcon className="w-8 h-8" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Valor Total Inventario',
      value: `${totalValue.toLocaleString()}`,
      icon: <MagnifyingGlassIcon className="w-8 h-8" />,
      color: 'bg-green-500'
    },
    {
      title: 'Stock Bajo',
      value: lowStockProducts,
      icon: <BoxIcon className="w-8 h-8" />,
      color: 'bg-yellow-500'
    },
    {
      title: 'Categorías',
      value: categories,
      icon: <BoxIcon className="w-8 h-8" />,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bienvenido de vuelta, {user?.name}</p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Gestionar Productos</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Productos Recientes</h2>
        </div>
        <div className="p-6">
          {products.length === 0 ? (
            <div className="text-center py-8">
              <BoxIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay productos registrados</p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mt-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Agregar primer producto</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-gray-700">Producto</th>
                    <th className="text-left py-2 font-medium text-gray-700">Categoría</th>
                    <th className="text-left py-2 font-medium text-gray-700">Precio</th>
                    <th className="text-left py-2 font-medium text-gray-700">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((product: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; category: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; price: number; stock: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.description}</p>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-gray-900">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.stock < 10 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {product.stock} unidades
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage