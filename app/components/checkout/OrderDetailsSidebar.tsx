'use client'

import { useCart } from '@/app/contexts/CartContext'
import { currencyFormatter } from './currency-formatter'

export default function OrderDetailsSidebar() {
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
    (sum, item) => sum + (item.productSnapshot.price ?? 0) * item.quantity,
    0,
  )
  const discountedTotal = cart.subtotal
  const discountAmount = originalTotal - discountedTotal
  const deliveryCharges = 0 // Free delivery
  const totalAmount = cart.total

  return (
    <div className='rounded-lg border-t-4 border-blue-500 bg-white p-6 shadow-sm'>
      <h2 className='mb-4 text-xl font-semibold text-gray-900'>Order Details</h2>

      <div className='space-y-3 text-sm'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Price</span>
          <span className='font-medium text-gray-900'>{currencyFormatter(discountedTotal, cart.currency)}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-gray-600'>Delivery charges</span>
          <span className='font-medium text-green-600'>Free</span>
        </div>

        {discountAmount > 0 && (
          <div className='flex justify-between'>
            <span className='text-gray-600'>Discount price</span>
            <span className='font-medium text-gray-900'>{currencyFormatter(discountAmount, cart.currency)}</span>
          </div>
        )}
      </div>

      <div className='my-4 border-t border-dashed border-gray-300'></div>

      <div className='mb-4'>
        <div className='flex justify-between'>
          <div>
            <p className='font-semibold text-gray-900'>Total Amount</p>
            <p className='text-xs text-gray-500'>(Incl GST)</p>
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

