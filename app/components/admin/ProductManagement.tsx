'use client'

import { useState, useEffect } from 'react'
import Layout from './Layout'
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import api from '@/app/lib/admin/api'
import { processProductImages } from '@/app/lib/admin/image-mapping'
import EditProductModal from './EditProductModal'
import AddProductModal from './AddProductModal'
import ViewProductModal from './ViewProductModal'

interface Product {
  id: number
  documentId?: string
  name: string
  slug: string
  category: string | number // Can be category ID (number) or legacy string
  subcategory?: string | number | null // Can be subcategory ID (number) or legacy string, optional
  brand: string | number // Can be brand ID (number) or legacy string
  price: string
  discountedPrice?: string
  tagline?: string
  description?: string
  specs?: any
  isActive: boolean
  images: Array<{ url: string; alt: string; isMain?: boolean }>
  SKU?: string
  stockQuantity?: number
  minStockLevel?: number
  maxStockLevel?: number
  stockStatus?: 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued' | string
  costPrice?: number
  taxRate?: number
  discountPercent?: number
  weight?: number
  Dimensions?: { length: number; width: number; height: number; unit: string } | any
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.getProducts({ 
        pagination: { page: 1, pageSize: 100 },
        sort: 'createdAt:desc' // Show newest products first
      })
      
      console.log('API Response:', response)
      console.log('Response meta:', response.meta)
      
      // Handle NestJS response structure: { data: [...], meta: {...} }
      // Products are in response.data array
      const productsArray = response.data || []
      
      console.log('Products array length:', productsArray.length)
      console.log('First product in array:', productsArray[0])
      
      if (productsArray.length === 0) {
        setError('No products found. Make sure products exist in the backend and the API is configured correctly.')
      }
      
      // Transform NestJS data to match our interface
      const transformedProducts = productsArray
        .map((product: any) => {
          try {
            // Handle NestJS structure - products are returned directly
            const productData = product
            // Use enhanced image processing that prioritizes local images
            const images = processProductImages(productData);

            // Extract brand name (handle both string and object)
            const brand = typeof productData.brand === 'object' && productData.brand !== null
              ? productData.brand.name || productData.brand
              : productData.brand || '';

            // Extract subcategory name (handle both string and object)
            const subcategory = typeof productData.subcategory === 'object' && productData.subcategory !== null
              ? productData.subcategory.name || productData.subcategory
              : productData.subcategory || null;

            // Ensure id is a number
            const productId = typeof product.id === 'number' 
              ? product.id 
              : typeof product.id === 'string' 
                ? parseInt(product.id, 10) 
                : typeof productData.id === 'number'
                  ? productData.id
                  : parseInt(productData.id || '0', 10);

            const documentIdValue = product.documentId || productData.documentId || productId.toString();
            const transformed: Product = {
              id: productId,
              ...(documentIdValue && { documentId: documentIdValue }),
              name: productData.name,
              slug: productData.slug,
              category: productData.category || '',
              subcategory: subcategory,
              brand: brand,
              price: productData.price || productData.sellingPrice || '0',
              discountedPrice: productData.discountedPrice || null,
              tagline: productData.tagline,
              description: productData.description,
              specs: productData.specs,
              isActive: productData.isActive ?? true,
              images: images,
              SKU: productData.SKU || productData.sku,
              stockQuantity: productData.stockQuantity,
              minStockLevel: productData.minStockLevel,
              maxStockLevel: productData.maxStockLevel,
              stockStatus: productData.stockStatus,
              costPrice: productData.costPrice,
              weight: productData.weight,
              Dimensions: productData.Dimensions || productData.dimensions
            };
            return transformed;
          } catch (error) {
            console.error('Error transforming product:', product, error);
            return null;
          }
        })
        .filter((p): p is Product => {
          // Type guard: ensure p is not null and has required fields
          return p !== null && 
                 typeof p.id === 'number' && 
                 typeof p.name === 'string' &&
                 typeof p.brand === 'string';
        }) // Remove any failed transformations

      console.log('Transformed products:', transformedProducts)
      console.log('Transformed products count:', transformedProducts.length)
      console.log('Product IDs:', transformedProducts.map(p => ({ id: p.id, name: p.name })))
      
      setProducts(transformedProducts)
      setFilteredProducts(transformedProducts)
    } catch (error: any) {
      console.error('Error fetching products:', error)
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        stack: error.stack
      })
      
      // Set user-friendly error message
      if (error.status === 401 || error.status === 403) {
        setError(
          'Authentication failed. Please ensure you have logged in or configured an API token. ' +
          'Please check your backend API configuration. Ensure NEXT_PUBLIC_ECOM_API_URL is set correctly in .env.local'
        )
      } else if (error.status === 404) {
        setError('Products endpoint not found. Make sure the backend is running and the products API is available.')
      } else {
        setError(`Failed to load products: ${error.message || 'Unknown error'}`)
      }
      
      // Set empty arrays instead of mock data
      setProducts([])
      setFilteredProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchLower) ||
        (typeof product.brand === 'string' ? product.brand.toLowerCase() : String(product.brand)).includes(searchLower) ||
        (typeof product.category === 'string' ? product.category.toLowerCase() : String(product.category)).includes(searchLower) ||
        (product.subcategory && (typeof product.subcategory === 'string' ? product.subcategory.toLowerCase() : String(product.subcategory)).includes(searchLower))
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory)
    }

    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand === selectedBrand)
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, selectedSubcategory, selectedBrand, products])

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)))
  const subcategories = Array.from(new Set(products.map(p => p.subcategory).filter(Boolean)))
  const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)))

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const toggleActive = (id: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ))
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowEditModal(true)
  }

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product)
    setShowViewModal(true)
  }

  const handleSaveProduct = async (updatedProduct: Product) => {
    try {
      if (!updatedProduct.documentId) {
        console.error('No documentId found for product')
        throw new Error('Product ID is missing. Cannot save product.')
      }

      // Prepare the data for NestJS backend - only include fields that have values
      // Convert price strings to numbers (remove currency symbols and commas)
      const priceValue = typeof updatedProduct.price === 'string' 
        ? parseFloat(updatedProduct.price.replace(/[^0-9.]/g, '')) || 0
        : updatedProduct.price || 0;
      
      const discountedPriceValue = updatedProduct.discountedPrice
        ? (typeof updatedProduct.discountedPrice === 'string'
          ? parseFloat(updatedProduct.discountedPrice.replace(/[^0-9.]/g, '')) || null
          : updatedProduct.discountedPrice)
        : null;

      let normalizedSubcategory: string | number | null =
        updatedProduct.subcategory === undefined ? null : (updatedProduct.subcategory as string | number | null);
      if (typeof normalizedSubcategory === 'string') {
        normalizedSubcategory = normalizedSubcategory.trim() || null;
      }

      const productData = {
        name: updatedProduct.name,
        slug: updatedProduct.slug,
        category: updatedProduct.category,
        subcategory: normalizedSubcategory,
        brand: updatedProduct.brand,
        price: priceValue,
        discountedPrice: discountedPriceValue,
        tagline: updatedProduct.tagline || null,
        description: updatedProduct.description || null,
        specs: updatedProduct.specs || null,
        images: updatedProduct.images || null,
        isActive: updatedProduct.isActive,
        // Provide default values for required fields
        sku: updatedProduct.SKU || `SKU-${Date.now()}`,
        stockQuantity: updatedProduct.stockQuantity || 0,
        ...(updatedProduct.minStockLevel !== undefined && updatedProduct.minStockLevel !== null && { minStockLevel: updatedProduct.minStockLevel }),
        ...(updatedProduct.maxStockLevel !== undefined && updatedProduct.maxStockLevel !== null && { maxStockLevel: updatedProduct.maxStockLevel }),
        ...(updatedProduct.stockStatus && { stockStatus: updatedProduct.stockStatus }),
        ...(updatedProduct.costPrice !== undefined && updatedProduct.costPrice !== null && { costPrice: updatedProduct.costPrice }),
        ...(updatedProduct.weight !== undefined && updatedProduct.weight !== null && { weight: updatedProduct.weight }),
        ...(updatedProduct.Dimensions && { dimensions: updatedProduct.Dimensions }),
      }

      console.log('Updating product with data:', productData)
      console.log('Product ID:', updatedProduct.documentId)
      
      const response = await api.updateProduct(updatedProduct.documentId, productData)
      console.log('Update response:', response)
      
      // Refresh products list to get latest data
      await fetchProducts()
      
      console.log('Product updated successfully')
    } catch (error: any) {
      console.error('Error updating product:', error)
      
      // Provide more specific error messages
      if (error.response?.status === 404) {
        throw new Error('Product not found. It may have been deleted.')
      } else if (error.response?.status === 401) {
        throw new Error('Unauthorized. Please check your API permissions.')
      } else if (error.response?.status === 403) {
        throw new Error('Forbidden. You do not have permission to update this product.')
      } else if (error.response?.status >= 500) {
        throw new Error('Server error. Please try again later.')
      } else if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.')
      } else {
        throw error // Re-throw so the modal can handle the error
      }
    }
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setEditingProduct(null)
  }

  const handleCloseViewModal = () => {
    setShowViewModal(false)
    setViewingProduct(null)
  }

  const handleEditFromView = (product: Product) => {
    setShowViewModal(false)
    setViewingProduct(null)
    setEditingProduct(product)
    setShowEditModal(true)
  }

  if (loading) {
    return (
      <Layout currentPage="Products">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout currentPage="Products">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your product catalog ({filteredProducts.length} products)
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-red-800">Error Loading Products</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm text-red-600 hover:text-red-800 underline"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, brand, category, subcategory..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="input-field"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setSelectedSubcategory('') // Reset subcategory when category changes
              }}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={`category-${category}-${index}`} value={category}>{category}</option>
              ))}
            </select>

            {/* Subcategory Filter */}
            <select
              className="input-field"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              disabled={!selectedCategory}
            >
              <option value="">All Subcategories</option>
              {subcategories
                .filter(sub => !selectedCategory || products.some(p => p.category === selectedCategory && p.subcategory === sub))
                .map((subcategory, index) => (
                  <option key={`subcategory-${subcategory}-${index}`} value={subcategory}>{subcategory}</option>
                ))}
            </select>

            {/* Brand Filter */}
            <select
              className="input-field"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {brands.map((brand, index) => (
                <option key={`brand-${brand}-${index}`} value={brand}>{brand}</option>
              ))}
            </select>

            {/* View Mode and Clear Filters */}
            <div className="flex space-x-2">
              <button
                className={`px-3 py-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                Grid
              </button>
              <button
                className={`px-3 py-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                List
              </button>
              <button
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('')
                  setSelectedSubcategory('')
                  setSelectedBrand('')
                }}
                title="Clear All Filters"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={`product-${product.id}-${product.slug}`} product={product} onDelete={handleDelete} onToggleActive={toggleActive} onEdit={handleEditProduct} onView={handleViewProduct} />
            ))}
          </div>
        ) : (
          <ProductTable products={filteredProducts} onDelete={handleDelete} onToggleActive={toggleActive} onEdit={handleEditProduct} onView={handleViewProduct} />
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => {
          setShowAddModal(false)
          // Reset filters to ensure new product is visible
          setSelectedCategory('')
          setSelectedSubcategory('')
          setSelectedBrand('')
          setSearchTerm('')
          // Force refresh
          fetchProducts()
        }}
      />

      {/* View Product Modal */}
      <ViewProductModal
        isOpen={showViewModal}
        onClose={handleCloseViewModal}
        product={viewingProduct}
        onEdit={handleEditFromView}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </Layout>
  )
}

function ProductCard({ product, onDelete, onToggleActive, onEdit, onView }: { 
  product: Product, 
  onDelete: (id: number) => void, 
  onToggleActive: (id: number) => void,
  onEdit: (product: Product) => void,
  onView: (product: Product) => void
}) {
  // Get the main image or fallback
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : { url: 'https://via.placeholder.com/300x200?text=No+Image', alt: product.name };
  
  return (
    <div className="card overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        <img
          src={mainImage.url}
          alt={mainImage.alt || product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Error';
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {product.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{product.brand} • {product.category}</p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-lg font-semibold text-gray-900">{product.price}</span>
            {product.discountedPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">{product.discountedPrice}</span>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            className="flex items-center justify-center btn-secondary text-sm py-2"
            onClick={() => onView(product)}
          >
            <EyeIcon className="w-4 h-4 mr-1" />
            View
          </button>
          <button 
            className="flex justify-center items-center btn-secondary text-sm py-2"
            onClick={() => onEdit(product)}
          >
            <PencilIcon className="w-4 h-4 mr-1" />
            Edit
          </button>
          <button 
            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            onClick={() => onDelete(product.id)}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductTable({ products, onDelete, onToggleActive, onEdit, onView }: { 
  products: Product[], 
  onDelete: (id: number) => void, 
  onToggleActive: (id: number) => void,
  onEdit: (product: Product) => void,
  onView: (product: Product) => void
}) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">Product</th>
              <th className="table-header">Category</th>
              <th className="table-header">Brand</th>
              <th className="table-header">Price</th>
              <th className="table-header">Status</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => {
              // Get the main image or fallback
              const mainImage = product.images && product.images.length > 0 
                ? product.images[0] 
                : { url: 'https://via.placeholder.com/50x50?text=No+Image', alt: product.name };
              
              return (
                <tr key={`product-row-${product.id}-${product.slug}`} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <img
                        src={mainImage.url}
                        alt={mainImage.alt || product.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.currentTarget.src = 'https://via.placeholder.com/50x50?text=Error';
                        }}
                      />
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.subcategory}</p>
                      </div>
                    </div>
                  </td>
                <td className="table-cell">{product.category}</td>
                <td className="table-cell">{product.brand}</td>
                <td className="table-cell">
                  <div>
                    <p className="font-medium">{product.price}</p>
                    {product.discountedPrice && (
                      <p className="text-sm text-gray-500 line-through">{product.discountedPrice}</p>
                    )}
                  </div>
                </td>
                <td className="table-cell">
                  <button
                    onClick={() => onToggleActive(product.id)}
                    className={`px-2 py-1 text-xs rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {product.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="table-cell">
                  <div className="flex space-x-2">
                    <button 
                      className="text-primary-600 hover:text-primary-900"
                      onClick={() => onView(product)}
                      title="View Product"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button 
                      className="text-gray-600 hover:text-gray-900"
                      onClick={() => onEdit(product)}
                      title="Edit Product"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => onDelete(product.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
