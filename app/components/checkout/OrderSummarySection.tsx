'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/app/contexts/CartContext'
import { currencyFormatter } from './currency-formatter'

// Normalize image URLs to match actual file names in public/products
// Converts camelCase filenames to kebab-case (e.g., hpEnvyMoveAllInOne24.png -> hp-envy-move-all-in-one-24.png)
function normalizeImageUrl(url: string): string {
  if (!url) return url
  
  // If it's already an absolute URL, return as-is
  if (url.startsWith('http')) return url
  
  // Extract filename from path
  const pathParts = url.split('/')
  const filename = pathParts[pathParts.length - 1]
  
  // Only normalize if it looks like a camelCase product image filename
  // Pattern: contains uppercase letters followed by lowercase (camelCase)
  if (filename && /[a-z][A-Z]/.test(filename)) {
    // Convert camelCase to kebab-case
    const kebabCase = filename
      .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert hyphen before capital letters
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // Handle consecutive capitals
      .replace(/([a-z])(\d)/g, '$1-$2') // Insert hyphen before numbers that follow letters
      .replace(/(\d)([A-Z])/g, '$1-$2') // Insert hyphen between numbers and capital letters
      .toLowerCase()
    
    // Reconstruct path with normalized filename
    pathParts[pathParts.length - 1] = kebabCase
    return pathParts.join('/')
  }
  
  // Also handle cases where the filename might already be partially normalized
  // but missing hyphens before numbers (e.g., "hp-envy-move-all-in-one24.png" -> "hp-envy-move-all-in-one-24.png")
  if (filename && /[a-z]\d/.test(filename)) {
    const normalized = filename.replace(/([a-z])(\d)/g, '$1-$2')
    pathParts[pathParts.length - 1] = normalized
    return pathParts.join('/')
  }
  
  return url
}

export default function OrderSummarySection() {
  const { cart, updateItem, removeItem } = useCart()

  const handleQuantityChange = async (itemId: string, delta: number) => {
    const item = cart?.items.find((i) => i.id === itemId)
    if (!item) return
    const newQuantity = item.quantity + delta
    if (newQuantity < 1) return
    await updateItem(itemId, newQuantity)
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className='space-y-4 rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500'>
        <p>Your cart is empty.</p>
        <Link
          href='/products'
          className='mt-4 inline-flex items-center justify-center rounded-full border border-[var(--shreeji-primary)] px-6 py-3 text-[var(--shreeji-primary)] transition hover:bg-[var(--shreeji-primary)] hover:text-white'
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='mb-6'>
        <div className='flex items-center gap-3'>
          <ShoppingBag className='h-5 w-5 text-[#544829]' />
          <h2 className='text-xl font-semibold text-gray-900'>Order Summary</h2>
        </div>
        <p className='mt-1 text-sm text-gray-500'>Review your order details before proceeding</p>
      </div>

      <div className='space-y-4'>
        {cart.items.map((item) => {
          const originalPrice = item.productSnapshot.price
          // Treat 0, null, or undefined as "no discount" - use original price
          const discountedPrice = (item.productSnapshot.discountedPrice && item.productSnapshot.discountedPrice > 0) 
            ? item.productSnapshot.discountedPrice 
            : originalPrice
          const discount = originalPrice - discountedPrice
          const discountPercent = discount > 0 ? Math.round((discount / originalPrice) * 100) : 0

          // Get the main image or first available image
          // Check both productSnapshot.images and item.images (backend stores in both places)
          const productImages = item.productSnapshot?.images || (item as any).images || []
          
          // Debug: Log image data to help diagnose issues
          if (productImages.length === 0) {
            console.log('No images found for item:', {
              itemId: item.id,
              productName: item.productSnapshot.name,
              productSnapshot: item.productSnapshot,
              itemImages: (item as any).images,
            })
          }
          
          const mainImage = productImages.find((img: any) => img?.isMain) || productImages[0]
          
          // Handle different image formats - could be object with url property or string
          let imageUrl = null
          if (mainImage) {
            if (typeof mainImage === 'string') {
              imageUrl = mainImage
            } else if (mainImage?.url) {
              imageUrl = mainImage.url
            }
          }
          
          // Ensure proper URL format for Next.js Image
          if (imageUrl) {
            // Normalize the image URL to match actual file names (camelCase -> kebab-case)
            imageUrl = normalizeImageUrl(imageUrl)
            
            // Handle relative paths
            if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
              imageUrl = `/${imageUrl}`
            }
            // Remove leading double slashes
            imageUrl = imageUrl.replace(/^\/\//, '/')
          }

          return (
            <div key={item.id} className='flex gap-4 rounded-lg border border-gray-200 bg-white p-4'>
              <div className='relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100'>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={typeof mainImage === 'object' ? mainImage?.alt : item.productSnapshot.name || 'Product image'}
                    fill
                    className='object-cover'
                    unoptimized={imageUrl.startsWith('http') || imageUrl.startsWith('/products/')}
                    sizes='80px'
                    onError={(e) => {
                      // Fallback if image fails to load
                      console.error('Image failed to load:', imageUrl)
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className='flex h-full w-full items-center justify-center bg-gray-200 text-xs text-gray-400'>
                    No Image
                  </div>
                )}
              </div>

              <div className='flex-1'>
                <h3 className='font-semibold text-gray-900'>{item.productSnapshot.name}</h3>
                <p className='text-sm text-gray-500'>Seller: Shreeji</p>

                <div className='mt-2 space-y-1'>
                  {/* Unit Price */}
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-gray-600'>Unit Price:</span>
                    {discount > 0 && discountedPrice < originalPrice && (
                      <>
                        <span className='text-sm text-gray-500 line-through'>
                          {currencyFormatter(originalPrice, cart.currency)}
                        </span>
                        <span className='text-sm font-medium text-green-600'>({discountPercent}% off)</span>
                      </>
                    )}
                    <span className='text-sm font-semibold text-gray-900'>
                      {currencyFormatter(discountedPrice, cart.currency)}
                    </span>
                  </div>
                  
                  {/* Total Price */}
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-gray-600'>Total ({item.quantity} {item.quantity === 1 ? 'item' : 'items'}):</span>
                    {discount > 0 && discountedPrice < originalPrice && (
                      <span className='text-sm text-gray-500 line-through'>
                        {currencyFormatter(originalPrice * item.quantity, cart.currency)}
                      </span>
                    )}
                    <span className='font-semibold text-gray-900'>
                      {currencyFormatter(discountedPrice * item.quantity, cart.currency)}
                    </span>
                  </div>
                </div>

                <div className='mt-3 flex items-center gap-4'>
                  <div className='flex items-center gap-2'>
                    <button
                      type='button'
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className='flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    >
                      <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 12H4' />
                      </svg>
                    </button>
                    <input
                      type='text'
                      value={String(item.quantity).padStart(2, '0')}
                      readOnly
                      className='h-8 w-12 border-0 text-center text-sm focus:outline-none'
                    />
                    <button
                      type='button'
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className='flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    >
                      <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                      </svg>
                    </button>
                  </div>
                  <button
                    type='button'
                    onClick={() => removeItem(item.id)}
                    className='text-sm font-medium text-red-600 hover:text-red-700'
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

