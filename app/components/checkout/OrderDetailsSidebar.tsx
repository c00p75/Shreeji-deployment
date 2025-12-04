'use client'

import { useCart } from '@/app/contexts/CartContext'
import { currencyFormatter } from './currency-formatter'

interface OrderDetailsSidebarProps {
  fulfillmentType?: 'pickup' | 'delivery'
  currentStep?: number
}

export default function OrderDetailsSidebar({ fulfillmentType = 'pickup', currentStep = 1 }: OrderDetailsSidebarProps) {
  const { cart } = useCart()

  if (!cart) {
    return (
      <div className='rounded-lg border-t-4 border-[var(--shreeji-primary)] bg-white p-6 shadow-sm'>
        <h2 className='mb-4 text-xl font-semibold text-gray-900'>Order Details</h2>
        <p className='text-sm text-gray-500'>Cart totals will appear here.</p>
      </div>
    )
  }

  const originalTotal = cart.items.reduce(
    (sum, item) => {
      const originalPrice = item.productSnapshot.price ?? 0
      return sum + originalPrice * item.quantity
    },
    0,
  )
  const discountedTotal = cart.items.reduce(
    (sum, item) => {
      const originalPrice = item.productSnapshot.price ?? 0
      // Treat 0, null, or undefined as "no discount" - use original price
      const discountedPrice = (item.productSnapshot.discountedPrice && item.productSnapshot.discountedPrice > 0)
        ? item.productSnapshot.discountedPrice
        : originalPrice
      return sum + discountedPrice * item.quantity
    },
    0,
  )
  const discountAmount = originalTotal - discountedTotal
  const deliveryCharges = 0 // Free delivery
  const subtotal = cart.subtotal || discountedTotal
  const vatAmount = cart.taxTotal || 0
  const totalAmount = cart.total

  // Calculate VAT percentage
  // First, try to get taxRate from cart items (if all items have the same rate)
  const taxRates = cart.items
    .map(item => item.taxRate || item.productSnapshot.taxRate)
    .filter((rate): rate is number => rate !== null && rate !== undefined)
  
  let vatPercentage: number | null = null
  if (taxRates.length > 0) {
    // Check if all items have the same tax rate
    const uniqueRates = [...new Set(taxRates)]
    if (uniqueRates.length === 1) {
      vatPercentage = uniqueRates[0]
    } else {
      // If different rates, calculate from totals
      vatPercentage = subtotal > 0 ? (vatAmount / subtotal) * 100 : null
    }
  } else if (subtotal > 0 && vatAmount > 0) {
    // Fallback: calculate from totals
    vatPercentage = (vatAmount / subtotal) * 100
  }

  return (
    <div className='rounded-lg border-t-4 border-[var(--shreeji-primary)] bg-white p-6 shadow-sm'>
      <h2 className='mb-4 text-xl font-semibold text-gray-900'>Order Details</h2>

      <div className='space-y-3 text-sm'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Subtotal</span>
          <span className='font-medium text-gray-900'>{currencyFormatter(subtotal, cart.currency)}</span>
        </div>

        {discountAmount > 0 && (
          <div className='flex justify-between'>
            <span className='text-gray-600'>Discount</span>
            <span className='font-medium text-green-600'>-{currencyFormatter(discountAmount, cart.currency)}</span>
          </div>
        )}

        {currentStep >= 2 && fulfillmentType === 'delivery' && (
          <div className='flex justify-between'>
            <span className='text-gray-600'>Delivery charges</span>
            <span className='font-medium text-green-600'>Free</span>
          </div>
        )}

        {vatAmount > 0 && (
          <div className='flex justify-between'>
            <span className='text-gray-600'>
              Value Added Tax (VAT)
              {vatPercentage !== null && (
                <span className='ml-1 text-xs text-gray-500'>({vatPercentage.toFixed(1)}%)</span>
              )}
            </span>
            <span className='font-medium text-gray-900'>{currencyFormatter(vatAmount, cart.currency)}</span>
          </div>
        )}
      </div>

      <div className='my-4 border-t border-dashed border-gray-300'></div>

      <div className='mb-4'>
        <div className='flex justify-between'>
          <div>
            <p className='font-semibold text-gray-900'>Total Cost</p>
            <p className='text-xs text-gray-500'>(Incl VAT)</p>
          </div>
          <span className='text-lg font-bold text-gray-900'>{currencyFormatter(totalAmount, cart.currency)}</span>
        </div>
      </div>

      {discountAmount > 0 && (
        <div className='rounded-lg bg-green-50 p-4'>
          <p className='text-sm font-medium text-gray-800'>Your total Savings amount on this order</p>
          <p className='mt-1 text-lg font-bold text-green-600'>{currencyFormatter(discountAmount, cart.currency)}</p>
        </div>
      )}
    </div>
  )
}

