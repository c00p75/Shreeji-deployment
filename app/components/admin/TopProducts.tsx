'use client'

interface Product {
  name: string
  price: string
  revenue: string
  sold: number
}

interface TopProductsProps {
  products: Product[]
}

export default function TopProducts({ products }: TopProductsProps) {
  return (
    <div className="card">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-md">
              Weekly
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
              Daily
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
              Monthly
            </button>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {products.map((product, index) => (
          <div key={index} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.price}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{product.revenue}</p>
                <p className="text-sm text-gray-500">{product.sold} Sold</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
