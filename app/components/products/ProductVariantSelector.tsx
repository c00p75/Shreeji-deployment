'use client'

import { useState, useEffect } from 'react'
import clientApi from '@/app/lib/client/api'
import toast from 'react-hot-toast'
import { currencyFormatter } from '@/app/components/checkout/currency-formatter'

interface ProductVariant {
  id: number
  sku: string
  attributes: Record<string, string>
  price?: number
  discountedPrice?: number
  stockQuantity: number
  stockStatus: string
  images?: Array<{ url: string; alt?: string }>
  isActive: boolean
}

interface ProductVariantSelectorProps {
  productId: number
  productPrice: number
  productDiscountedPrice?: number
  onVariantSelect?: (variant: ProductVariant | null) => void
}

export default function ProductVariantSelector({
  productId,
  productPrice,
  productDiscountedPrice,
  onVariantSelect,
}: ProductVariantSelectorProps) {
  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)

  useEffect(() => {
    loadVariants()
  }, [productId])

  useEffect(() => {
    // Find matching variant based on selected attributes
    if (variants.length > 0 && Object.keys(selectedAttributes).length > 0) {
      const matchingVariant = variants.find((variant) => {
        return Object.keys(selectedAttributes).every(
          (key) => variant.attributes[key] === selectedAttributes[key],
        )
      })
      setSelectedVariant(matchingVariant || null)
      onVariantSelect?.(matchingVariant || null)
    } else {
      setSelectedVariant(null)
      onVariantSelect?.(null)
    }
  }, [selectedAttributes, variants, onVariantSelect])

  const loadVariants = async () => {
    try {
      setLoading(true)
      const response = await clientApi.getProductVariants(productId)
      const activeVariants = (response.data || []).filter((v: ProductVariant) => v.isActive)
      setVariants(activeVariants)
    } catch (error: any) {
      console.error('Failed to load variants:', error)
      // Silently fail - variants are optional
    } finally {
      setLoading(false)
    }
  }

  // Get unique attribute keys from all variants
  const attributeKeys = Array.from(
    new Set(variants.flatMap((v) => Object.keys(v.attributes))),
  )

  // Get available values for an attribute based on current selections
  const getAvailableValues = (attributeKey: string): string[] => {
    if (variants.length === 0) return []

    // Filter variants that match currently selected attributes (excluding the current attribute)
    const filteredVariants = variants.filter((variant) => {
      return Object.keys(selectedAttributes)
        .filter((key) => key !== attributeKey)
        .every((key) => variant.attributes[key] === selectedAttributes[key])
    })

    // Get unique values for this attribute from filtered variants
    const values = new Set(
      filteredVariants.map((v) => v.attributes[attributeKey]).filter(Boolean),
    )
    return Array.from(values)
  }

  const handleAttributeChange = (key: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  if (loading) {
    return null
  }

  if (variants.length === 0) {
    return null // Don't show selector if no variants
  }

  const displayPrice = selectedVariant?.price ?? productPrice
  // Only use discountedPrice if it's a valid positive number
  const displayDiscountedPrice = (selectedVariant?.discountedPrice && selectedVariant.discountedPrice > 0)
    ? selectedVariant.discountedPrice
    : ((productDiscountedPrice && productDiscountedPrice > 0) ? productDiscountedPrice : undefined)

  return (
    <div className="space-y-4">
      {attributeKeys.map((attributeKey) => {
        const availableValues = getAvailableValues(attributeKey)
        if (availableValues.length === 0) return null

        return (
          <div key={attributeKey}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {attributeKey}
            </label>
            <div className="flex flex-wrap gap-2">
              {availableValues.map((value) => {
                const isSelected = selectedAttributes[attributeKey] === value
                const variant = variants.find(
                  (v) =>
                    v.attributes[attributeKey] === value &&
                    Object.keys(selectedAttributes)
                      .filter((k) => k !== attributeKey)
                      .every((k) => v.attributes[k] === selectedAttributes[k]),
                )
                const isOutOfStock = variant?.stockStatus === 'out-of-stock'

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleAttributeChange(attributeKey, value)}
                    disabled={isOutOfStock}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-[var(--shreeji-primary)] bg-[var(--shreeji-primary)] text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    } ${
                      isOutOfStock
                        ? 'opacity-50 cursor-not-allowed line-through'
                        : 'cursor-pointer'
                    }`}
                  >
                    {value}
                    {isOutOfStock && <span className="ml-2 text-xs">(Out of Stock)</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {selectedVariant && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Selected:</strong> {selectedVariant.sku}
            {selectedVariant.stockQuantity > 0 && (
              <span className="ml-2">({selectedVariant.stockQuantity} in stock)</span>
            )}
          </p>
        </div>
      )}

      {/* Price Display */}
      <div className="mt-4">
        <div className="flex items-center space-x-3">
          {displayDiscountedPrice && displayDiscountedPrice < displayPrice ? (
            <>
              <span className="text-2xl font-bold text-[var(--shreeji-primary)]">
                {currencyFormatter(Number(displayDiscountedPrice || 0))}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {currencyFormatter(Number(displayPrice || 0))}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-[var(--shreeji-primary)]">
              {currencyFormatter(Number(displayPrice || 0))}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}



