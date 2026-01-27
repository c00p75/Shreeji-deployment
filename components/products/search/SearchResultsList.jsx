'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import ProductPreview from '../ProductPreview'
import { ProductListItemSkeleton } from '@/app/components/ui/Skeletons'
import SearchFilters from './SearchFilters'
import { getAllProductsList } from '@/app/lib/client/products'

export default function SearchResultsList({ query, products, pagination, initialFilters = {} }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState(initialFilters)
  const [allProducts, setAllProducts] = useState([])
  const prevParamsRef = useRef({ page: pagination.page, filters: initialFilters, query })

  // Reset loading state when new data arrives (after navigation)
  useEffect(() => {
    const currentParams = { page: pagination.page, filters: initialFilters, query }
    const paramsChanged = 
      prevParamsRef.current.page !== currentParams.page ||
      JSON.stringify(prevParamsRef.current.filters) !== JSON.stringify(currentParams.filters) ||
      prevParamsRef.current.query !== currentParams.query
    if (paramsChanged && loading) {
      setLoading(false)
    }
    
    // Sync filters with URL params when they change
    if (JSON.stringify(initialFilters) !== JSON.stringify(filters)) {
      setFilters(initialFilters)
    }
    
    // Update ref for next comparison
    prevParamsRef.current = currentParams
  }, [pagination.page, initialFilters, query, loading, filters])

  // Fetch all products for filter options (only once)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const all = await getAllProductsList()
        setAllProducts(all)
      } catch (error) {
        console.error('Error fetching all products for filters:', error)
        // Fallback to current products if fetch fails
        setAllProducts(products)
      }
    }
    fetchAllProducts()
  }, []) // Only fetch once on mount

  // Use all products for filter options, fallback to current products
  const productsForFilters = allProducts.length > 0 ? allProducts : products

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.pageCount) return
    
    setLoading(true)
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/products/search?${params.toString()}`)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setLoading(true)
    
    // Build URL with filters
    const params = new URLSearchParams()
    params.set('q', query)
    params.set('page', '1') // Reset to page 1 when filters change
    
    if (newFilters.category) {
      params.set('category', newFilters.category)
    }
    if (newFilters.subcategory) {
      params.set('subcategory', newFilters.subcategory)
    }
    if (newFilters.brandId) {
      params.set('brandId', newFilters.brandId.toString())
    }
    if (newFilters.minPrice !== undefined && newFilters.minPrice !== null) {
      params.set('minPrice', newFilters.minPrice.toString())
    }
    if (newFilters.maxPrice !== undefined && newFilters.maxPrice !== null) {
      params.set('maxPrice', newFilters.maxPrice.toString())
    }
    if (newFilters.inStockOnly) {
      params.set('inStockOnly', 'true')
    }
    
    router.push(`/products/search?${params.toString()}`)
  }

  const handleClearFilters = () => {
    setFilters({})
    setLoading(true)
    const params = new URLSearchParams()
    params.set('q', query)
    params.set('page', '1')
    router.push(`/products/search?${params.toString()}`)
  }

  // Get filter labels for display
  const getFilterLabel = (key, value) => {
    switch (key) {
      case 'category':
        return `Category: ${value}`
      case 'subcategory':
        return `Subcategory: ${value}`
      case 'brandId':
        const brand = productsForFilters.find(p => {
          if (typeof p.brand === 'object' && p.brand?.id === value) {
            return true
          }
          return false
        })
        const brandName = brand && typeof brand.brand === 'object' 
          ? brand.brand.name 
          : `Brand ID: ${value}`
        return `Brand: ${brandName}`
      case 'minPrice':
        return `Min Price: K ${parseFloat(value).toLocaleString()}`
      case 'maxPrice':
        return `Max Price: K ${parseFloat(value).toLocaleString()}`
      case 'inStockOnly':
        return 'In Stock Only'
      default:
        return `${key}: ${value}`
    }
  }

  const activeFilters = Object.entries(filters).filter(([_, value]) => 
    value !== undefined && value !== null && value !== ''
  )

  if (!query || !query.trim()) {
    return (
      <div className="product-category-list bg-[var(--shreeji-primary)] h-fit relative flex flex-col">
        <div className="scroll-container overflow-visible md:overflow-hidden relative px-5 md:px-10 pt-10">
          <div className="w-full text-center py-10">
            <p className="text-white text-lg">Please enter a search term to find products.</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="product-category-list bg-[var(--shreeji-primary)] h-fit relative flex flex-col">
        <div className="scroll-container overflow-visible md:overflow-hidden relative px-5 md:px-10 pt-10">
          <div className="w-full product-containermin-w-full flex flex-col md:grid grid-cols-3 gap-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductListItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="product-category-list bg-[var(--shreeji-primary)] h-fit relative flex flex-col">
      <div className="scroll-container overflow-visible md:overflow-hidden relative px-5 md:px-10 pt-10">
        {/* Search Results Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Search Results for &quot;{query}&quot;
            </h2>
            {/* Search Filters */}
            <SearchFilters
              products={productsForFilters}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
          <p className="text-gray-300">
            {pagination.total > 0 
              ? `Found ${pagination.total} product${pagination.total !== 1 ? 's' : ''}`
              : 'No products found'}
          </p>
        </div>

        

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-300">Active filters:</span>
            {activeFilters.map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-sm"
              >
                {getFilterLabel(key, value)}
                <button
                  onClick={() => {
                    const newFilters = { ...filters }
                    delete newFilters[key]
                    // Also clear subcategory if category is removed
                    if (key === 'category') {
                      delete newFilters.subcategory
                    }
                    handleFilterChange(newFilters)
                  }}
                  className="hover:bg-white/30 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${key} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="w-full product-containermin-w-full flex flex-col md:grid grid-cols-3 gap-7">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductPreview key={product.id || index} product={product} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-white text-lg mb-2">No products found matching &quot;{query}&quot;</p>
              <p className="text-gray-300">Try adjusting your search terms or browse our categories.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.pageCount > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10 pb-10">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </button>
            
            <span className="text-white">
              Page {pagination.page} of {pagination.pageCount}
            </span>
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.pageCount}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

