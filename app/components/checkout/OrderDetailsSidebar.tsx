'use client'

import { useCart } from '@/app/contexts/CartContext'
import { currencyFormatter } from './currency-formatter'
import { generateQuotePDF } from '@/utils/quoteGenerator'
import { Download } from 'lucide-react'

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
  const totalAmount = cart.total || subtotal

  const handleDownloadQuote = () => {
    if (!cart || cart.items.length === 0) {
      return
    }
    generateQuotePDF(cart, fulfillmentType)
  }

  return (
    <div className='rounded-lg border-t-4 border-[var(--shreeji-primary)] bg-white p-6 shadow-sm'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-gray-900'>Order Details</h2>
        <div className="relative group">
          <button
            onClick={handleDownloadQuote}
            disabled={!cart || cart.items.length === 0}
            className='flex items-center gap-2 rounded-lg bg-[whitesmoke] px-4 py-2 text-sm font-medium text-[var(--shreeji-primary)] transition-colors hover:bg-[#544829] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--shreeji-primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[var(--shreeji-primary)]'
          >
            <Download className='h-4 w-4' />
          </button>
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Download Quote as PDF
          </span>
        </div>
      </div>

      <div className='space-y-3 text-sm'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Subtotal</span>
          <span className='font-medium text-gray-900'>{currencyFormatter(subtotal, cart.currency)}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-gray-600'>Discount</span>
          <span className={`font-medium ${discountAmount > 0 ? 'text-green-600' : 'text-gray-600'}`}>
            {discountAmount > 0 ? '-' : ''}{currencyFormatter(discountAmount, cart.currency)}
          </span>
        </div>

        {currentStep >= 2 && fulfillmentType === 'delivery' && (
          <div className='flex justify-between'>
            <span className='text-gray-600'>Delivery charges</span>
            <span className='font-medium text-green-600'>Free</span>
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

