'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { Popover, Transition } from '@headlessui/react'
import {
  getAvailableCategories,
  getAvailableSubcategories,
  getAvailableBrands,
  getPriceRange,
} from '@/app/lib/client/products'
import PriceRangeSlider from './PriceRangeSlider'

export default function SearchFilters({
  products,
  filters,
  onFilterChange,
  onClearFilters,
}) {

  // Extract available filter options
  const categories = getAvailableCategories(products)
  const subcategories = getAvailableSubcategories(
    products,
    filters?.category
  )
  const brands = getAvailableBrands(products)
  const priceRange = getPriceRange(products)

  // Count active filters
  const activeFilterCount =
    (filters?.category ? 1 : 0) +
    (filters?.subcategory ? 1 : 0) +
    (filters?.brandId ? 1 : 0) +
    (filters?.minPrice ? 1 : 0) +
    (filters?.maxPrice ? 1 : 0) +
    (filters?.inStockOnly ? 1 : 0)

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const handleRemoveFilter = (key) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    onFilterChange(newFilters)
  }

  return (
    <div className="mb-6">
      <Popover className="relative inline-block text-left">
        <Popover.Button className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--shreeji-primary)] text-white rounded-lg hover:bg-white/10 transition-colors shadow-sm ring-1 ring-inset ring-white/20">
          <Filter className="h-5 w-5" aria-hidden="true" />
          <span className="font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-white/20 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Popover.Button>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel className="absolute right-0 z-10 mt-2 w-80 origin-top-left rounded-lg bg-[var(--shreeji-primary)] shadow-lg ring-1 ring-white/20 focus:outline-none">
            <div className="px-5 py-4 space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Category
            </label>
            <select
              value={filters?.category || ''}
              onChange={(e) => {
                const value = e.target.value || undefined
                handleFilterChange('category', value)
                // Clear subcategory when category changes
                if (!value) {
                  handleRemoveFilter('subcategory')
                }
              }}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category} className="bg-[var(--shreeji-primary)]">
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Subcategory
            </label>
            <select
              value={filters?.subcategory || ''}
              onChange={(e) =>
                handleFilterChange('subcategory', e.target.value || undefined)
              }
              disabled={!filters?.category || subcategories.length === 0}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Subcategories</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory} className="bg-[var(--shreeji-primary)]">
                  {subcategory}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Brand
            </label>
            <select
              value={filters?.brandId || ''}
              onChange={(e) =>
                handleFilterChange(
                  'brandId',
                  e.target.value ? parseInt(e.target.value, 10) : undefined
                )
              }
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id} className="bg-[var(--shreeji-primary)]">
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Price Range (ZMW)
            </label>
            {priceRange.max > 0 ? (
              <PriceRangeSlider
                min={priceRange.min}
                max={priceRange.max}
                values={[
                  filters?.minPrice ?? priceRange.min,
                  filters?.maxPrice ?? priceRange.max,
                ]}
                onChangeEnd={(newValues) => {
                  const [newMin, newMax] = newValues
                  const updatedFilters = { ...filters }
                  
                  // Only set minPrice if it's different from the minimum range
                  if (newMin > priceRange.min) {
                    updatedFilters.minPrice = newMin
                  } else {
                    delete updatedFilters.minPrice
                  }
                  
                  // Only set maxPrice if it's different from the maximum range
                  if (newMax < priceRange.max) {
                    updatedFilters.maxPrice = newMax
                  } else {
                    delete updatedFilters.maxPrice
                  }
                  
                  onFilterChange(updatedFilters)
                }}
                step={Math.max(1, Math.round((priceRange.max - priceRange.min) / 100))}
              />
            ) : (
              <p className="text-xs text-gray-300">No price range available</p>
            )}
          </div>

          {/* In Stock Only */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="inStockOnly"
              checked={filters?.inStockOnly || false}
              onChange={(e) =>
                handleFilterChange('inStockOnly', e.target.checked || undefined)
              }
              className="w-4 h-4 text-[var(--shreeji-primary)] bg-white/10 border-white/20 rounded focus:ring-2 focus:ring-white/50"
            />
            <label htmlFor="inStockOnly" className="text-sm text-white">
              In Stock Only
            </label>
          </div>

              {/* Clear Filters Button */}
              {activeFilterCount > 0 && (
                <button
                  onClick={onClearFilters}
                  className="w-full px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

