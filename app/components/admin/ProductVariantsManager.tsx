'use client'

import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Transition } from '@headlessui/react'
import api from '@/app/lib/admin/api'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { generateVariantSKU, generateUniqueVariantSKU } from '@/utils/sku-generator'
import { currencyFormatter } from '@/app/components/checkout/currency-formatter'

interface ProductVariant {
  id: number
  sku: string
  specs: Record<string, string>
  price?: number
  discountedPrice?: number
  stockQuantity: number
  stockStatus: string
  minStockLevel?: number
  images?: Array<{ url: string; alt?: string }>
  isActive: boolean
}

interface ProductVariantsManagerProps {
  productId: number
  productName: string
}

export default function ProductVariantsManager({ productId, productName }: ProductVariantsManagerProps) {
  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null)

  useEffect(() => {
    loadVariants()
  }, [productId])

  const loadVariants = async () => {
    try {
      setLoading(true)
      const response = await api.getProductVariants(productId)
      // Map backend attributes to specs for frontend
      const variants = (response.data || []).map((variant: any) => ({
        ...variant,
        specs: variant.attributes || variant.specs || {}
      }))
      setVariants(variants)
    } catch (error: any) {
      console.error('Failed to load variants:', error)
      toast.error(error.message || 'Failed to load variants')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateVariant = async (variantData: any) => {
    try {
      await api.createProductVariant(productId, variantData)
      toast.success('Variant created successfully')
      setIsCreating(false)
      loadVariants()
    } catch (error: any) {
      toast.error(error.message || 'Failed to create variant')
      throw error
    }
  }

  const handleUpdateVariant = async (variantId: number, variantData: any) => {
    try {
      await api.updateProductVariant(productId, variantId, variantData)
      toast.success('Variant updated successfully')
      setEditingVariant(null)
      loadVariants()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update variant')
      throw error
    }
  }

  const handleDeleteVariant = async (variantId: number) => {
    if (!confirm('Are you sure you want to delete this variant?')) {
      return
    }

    try {
      await api.deleteProductVariant(productId, variantId)
      toast.success('Variant deleted successfully')
      loadVariants()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete variant')
    }
  }

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading variants...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Product Variants</h3>
        {!isCreating && !editingVariant && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--shreeji-primary)] hover:opacity-90"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Variant
          </button>
        )}
      </div>

      {isCreating && (
        <VariantForm
          productId={productId}
          productName={productName}
          onSave={handleCreateVariant}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingVariant && (
        <VariantForm
          productId={productId}
          productName={productName}
          variant={editingVariant}
          onSave={(data) => handleUpdateVariant(editingVariant.id, data)}
          onCancel={() => setEditingVariant(null)}
        />
      )}

      {variants.length === 0 && !isCreating && !editingVariant ? (
        <div className="text-center py-8 text-gray-500">
          <p>No variants yet. Click "Add Variant" to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-semibold text-gray-900">{variant.sku}</span>
                    {!variant.isActive && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Inactive</span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded ${
                      variant.stockStatus === 'in-stock' ? 'bg-green-100 text-green-800' :
                      variant.stockStatus === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {variant.stockStatus}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    {Object.entries(variant.specs).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium">{key}:</span> {value}
                      </div>
                    ))}
                    <div className="flex items-center space-x-4 mt-2">
                      {variant.price && (
                        <span>Price: K{variant.price.toLocaleString()}</span>
                      )}
                      {variant.discountedPrice && (
                        <span className="text-green-600">
                          Discounted: K{variant.discountedPrice.toLocaleString()}
                        </span>
                      )}
                      <span>Stock: {variant.stockQuantity}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setEditingVariant(variant)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit variant"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteVariant(variant.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete variant"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Component to handle specification input with searchable dropdown for spec name
function AttributeInput({ 
  attributeKey, 
  attributeValue, 
  availableSpecNames,
  onKeyChange, 
  onValueChange,
  onRemove
}: { 
  attributeKey: string; 
  attributeValue: string; 
  availableSpecNames: string[];
  onKeyChange: (oldKey: string, newKey: string) => void;
  onValueChange: (key: string, value: string) => void;
  onRemove: (key: string) => void;
}) {
  const [query, setQuery] = useState(attributeKey || '');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update query when attributeKey changes externally
  useEffect(() => {
    if (inputRef.current !== document.activeElement) {
      // If key is a temporary generated key (spec_ followed by numbers), show empty
      // Otherwise show the actual key
      const isTempKey = attributeKey.startsWith('spec_') && /^spec_\d+$/.test(attributeKey);
      setQuery(isTempKey ? '' : (attributeKey || ''));
    }
  }, [attributeKey]);

  // Filter available specs based on query
  const filteredSpecs = availableSpecNames.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  // Check if current attributeKey is in available list
  const isCustomSpec = attributeKey && !availableSpecNames.includes(attributeKey);
  
  // Show "Add new" option if query doesn't match any existing spec and query is not empty
  const showAddNew = query.trim() !== '' && 
                     !availableSpecNames.some(name => name.toLowerCase() === query.toLowerCase().trim()) &&
                     (!attributeKey || query.toLowerCase().trim() !== attributeKey.toLowerCase());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
  };

  const handleSelect = (value: string) => {
    if (value && value.trim() !== '') {
      onKeyChange(attributeKey, value.trim());
      setQuery(value.trim());
      setIsOpen(false);
    }
  };

  const handleAddNew = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onKeyChange(attributeKey, trimmedQuery);
      setQuery(trimmedQuery);
      setIsOpen(false);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    // Delay to allow click events on dropdown items
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        // If query doesn't match attributeKey, update it
        if (query.trim() !== attributeKey && query.trim() !== '') {
          handleAddNew();
        } else if (query.trim() === '') {
          setQuery(attributeKey || '');
        }
      }
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && showAddNew) {
      e.preventDefault();
      handleAddNew();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery(attributeKey || '');
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="flex-1 relative" ref={dropdownRef}>
        <div className="relative">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Search or add specification"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>
        {isOpen && (
          <Transition
            show={isOpen}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {query === '' && (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Start typing to search or add a new specification
                </div>
              )}
              {filteredSpecs.length === 0 && query !== '' && !showAddNew && (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  No specifications found.
                </div>
              )}
              {filteredSpecs.map((name) => (
                <div
                  key={name}
                  onClick={() => handleSelect(name)}
                  className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    attributeKey === name
                      ? 'bg-primary-600 text-white font-medium'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="block truncate">{name}</span>
                  {attributeKey === name && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </div>
              ))}
              {isCustomSpec && attributeKey && !filteredSpecs.includes(attributeKey) && (
                <div
                  onClick={() => handleSelect(attributeKey)}
                  className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    'bg-primary-600 text-white font-medium'
                  }`}
                >
                  <span className="block truncate">{attributeKey} (custom)</span>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              )}
              {showAddNew && (
                <div
                  onClick={handleAddNew}
                  className="relative cursor-pointer select-none py-2 pl-10 pr-4 text-primary-600 hover:bg-primary-50 font-medium"
                >
                  <span className="block truncate">
                    <PlusIcon className="inline h-4 w-4 mr-1" />
                    Add "{query.trim()}"
                  </span>
                </div>
              )}
            </div>
          </Transition>
        )}
      </div>
      <input
        type="text"
        value={String(attributeValue || '')}
        onChange={(e) => onValueChange(attributeKey, e.target.value)}
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        placeholder="Specification value"
      />
      <button
        type="button"
        onClick={() => onRemove(attributeKey)}
        className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        title="Remove specification"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

interface VariantFormProps {
  productId: number
  productName: string
  variant?: ProductVariant
  onSave: (data: any) => Promise<void>
  onCancel: () => void
}

function VariantForm({ productId, productName, variant, onSave, onCancel }: VariantFormProps) {
  const [formData, setFormData] = useState({
    sku: variant?.sku || '',
    specs: variant?.specs || {},
    price: variant?.price || '',
    discountedPrice: variant?.discountedPrice || '',
    stockQuantity: variant?.stockQuantity || 0,
    minStockLevel: variant?.minStockLevel ?? 1,
    isActive: variant?.isActive !== undefined ? variant.isActive : true,
  })
  const [saving, setSaving] = useState(false)
  const [availableSpecNames, setAvailableSpecNames] = useState<string[]>([])

  // Fetch all specification names from products for dropdown
  useEffect(() => {
    const fetchAllSpecNames = async () => {
      try {
        const response = await api.getProducts({ 
          pagination: { page: 1, pageSize: 1000 } // Get many products to collect spec names
        });
        const products = response.data || [];
        const specNamesSet = new Set<string>();
        
        products.forEach((product: any) => {
          if (product.specs && typeof product.specs === 'object') {
            Object.keys(product.specs).forEach(key => {
              if (key && key.trim()) {
                specNamesSet.add(key.trim());
              }
            });
          }
        });
        
        // Also add current variant's spec names
        if (formData.specs && typeof formData.specs === 'object') {
          Object.keys(formData.specs).forEach(key => {
            if (key && key.trim()) {
              specNamesSet.add(key.trim());
            }
          });
        }
        
        setAvailableSpecNames(Array.from(specNamesSet).sort());
      } catch (error) {
        console.error('Error fetching spec names:', error);
        // Fallback to current variant's specs
        if (formData.specs && typeof formData.specs === 'object') {
          setAvailableSpecNames(Object.keys(formData.specs).sort());
        } else {
          setAvailableSpecNames([]);
        }
      }
    };
    
    fetchAllSpecNames();
  }, [formData.specs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation() // Prevent event bubbling that might cause page refresh
    
    if (!formData.sku.trim()) {
      toast.error('SKU is required')
      return
    }

    // Validate specs - backend requires at least one specification
    if (!formData.specs || Object.keys(formData.specs).length === 0) {
      toast.error('At least one specification (e.g., Size, Color) is required')
      return
    }

    try {
      setSaving(true)
      const submitData = {
        sku: formData.sku.trim(),
        attributes: formData.specs, // Map specs to attributes for backend API
        price: formData.price ? parseFloat(formData.price.toString()) : undefined,
        discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice.toString()) : undefined,
        stockQuantity: parseInt(formData.stockQuantity.toString()) || 0,
        minStockLevel: parseInt(formData.minStockLevel.toString()) || 1,
        isActive: formData.isActive,
      }
      await onSave(submitData)
    } catch (error: any) {
      // Error handling - show user-friendly message
      console.error('Variant save error:', error)
      // Parent already shows error, but log it for debugging
      throw error // Re-throw so parent can handle it
    } finally {
      setSaving(false)
    }
  }

  const handleAddSpec = () => {
    const newKey = `spec_${Date.now()}`;
    setFormData({
      ...formData,
      specs: {
        ...formData.specs,
        [newKey]: '',
      },
    });
  }

  const handleSpecKeyChange = (oldKey: string, newKey: string) => {
    const newSpecs = { ...formData.specs };
    if (newKey && newKey.trim() !== '') {
      const value = newSpecs[oldKey] || '';
      delete newSpecs[oldKey];
      newSpecs[newKey.trim()] = value;
    } else {
      delete newSpecs[oldKey];
    }
    setFormData({ ...formData, specs: newSpecs });
  };

  const handleSpecValueChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      specs: {
        ...formData.specs,
        [key]: value,
      },
    });
  };

  const handleRemoveSpec = (key: string) => {
    const newSpecs = { ...formData.specs }
    delete newSpecs[key]
    setFormData({ ...formData, specs: newSpecs })
  }

  // Handle SKU generation with uniqueness checking
  const handleGenerateSKU = async () => {
    if (!productName) {
      toast.error('Product name is required to generate SKU')
      return
    }

    // Check if we have at least one specification
    if (!formData.specs || Object.keys(formData.specs).length === 0) {
      toast.error('Please add at least one specification (e.g., Size, Color) before generating SKU')
      return
    }

    try {
      // Generate unique SKU with retry logic
      const generatedSKU = await generateUniqueVariantSKU(
        productName,
        formData.specs,
        async (sku: string) => {
          try {
            // If editing, exclude current variant's SKU from the check
            if (variant && sku === variant.sku) {
              return false
            }
            return await api.checkSKUExists(sku)
          } catch (error) {
            console.error('Error checking SKU:', error)
            return false // Allow generation if check fails
          }
        }
      )

      setFormData({ ...formData, sku: generatedSKU })
      toast.success('SKU generated successfully')
    } catch (error) {
      console.error('Error generating SKU:', error)
      // Fallback to simple generation if uniqueness check fails
      const fallbackSKU = generateVariantSKU(productName, formData.specs)
      setFormData({ ...formData, sku: fallbackSKU })
      toast.success('SKU generated (uniqueness check unavailable)')
    }
  }

  // Handle form submission - cannot use <form> because it's nested in parent form
  const handleFormSubmit = (e: React.FormEvent) => {
    handleSubmit(e)
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <h4 className="font-semibold text-gray-900 mb-4">
        {variant ? 'Edit Variant' : 'Create New Variant'}
      </h4>

      <div className="space-y-4">
        <div>
          <label htmlFor="variant-sku" className="block text-sm font-medium text-gray-700 mb-2">
            SKU <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="variant-sku"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleFormSubmit(e as any)
                }
              }}
              required
              className="w-full px-3 py-2 pr-20 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Product SKU"
            />
            {productName && (
              <button
                type="button"
                onClick={handleGenerateSKU}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded hover:bg-primary-200 transition-colors"
                title="Generate SKU from product name and variant attributes"
              >
                Generate
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
          <div className="space-y-2">
            {Object.entries(formData.specs).map(([key, value], index) => (
              <AttributeInput
                key={`spec-${index}-${key}`}
                attributeKey={key}
                attributeValue={String(value || '')}
                availableSpecNames={availableSpecNames}
                onKeyChange={(oldKey, newKey) => {
                  handleSpecKeyChange(oldKey, newKey);
                }}
                onValueChange={(specKey, newValue) => {
                  handleSpecValueChange(specKey, newValue);
                }}
                onRemove={(specKey) => {
                  handleRemoveSpec(specKey);
                }}
              />
            ))}
            <button
              type="button"
              onClick={handleAddSpec}
              className="flex items-center text-sm font-semibold mt-4 text-primary-600 hover:text-primary-500"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Specification
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
          <label htmlFor="variant-price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              id="variant-price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
          <label htmlFor="variant-discounted-price" className="block text-sm font-medium text-gray-700 mb-1">Discounted Price</label>
            <input
              type="number"
              step="0.01"
              id="variant-discounted-price"
              value={formData.discountedPrice}
              onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
          <label htmlFor="variant-stock-quantity" className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              min="0"
              id="variant-stock-quantity"
              value={formData.stockQuantity}
              onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
          <label htmlFor="variant-min-stock-level" className="block text-sm font-medium text-gray-700 mb-1">Min Stock Level</label>
            <input
              type="number"
              min="1"
              id="variant-min-stock-level"
              value={formData.minStockLevel}
              onChange={(e) => setFormData({ ...formData, minStockLevel: parseInt(e.target.value) || 1 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="variant-is-active"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="h-4 w-4 text-[var(--shreeji-primary)] focus:ring-[var(--shreeji-primary)] border-gray-300 rounded"
          />
          <label htmlFor="variant-is-active" className="ml-2 text-sm text-gray-700">
            Active
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleFormSubmit}
            disabled={saving}
            className="px-4 py-2 bg-[var(--shreeji-primary)] text-white rounded-md hover:opacity-90 disabled:opacity-50"
          >
            {saving ? 'Saving...' : variant ? 'Update Variant' : 'Create Variant'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}



