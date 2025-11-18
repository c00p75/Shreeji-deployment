'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/app/contexts/CartContext'
import { currencyFormatter } from './currency-formatter'

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
      <div className='space-y-4'>
        <div className='flex items-center gap-3'>
          <ShoppingBag className='h-5 w-5 text-[#544829]' />
          <h2 className='text-xl font-semibold text-gray-900'>Order Summary</h2>
        </div>
        <p className='text-gray-500'>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <ShoppingBag className='h-5 w-5 text-[#544829]' />
        <h2 className='text-xl font-semibold text-gray-900'>Order Summary</h2>
      </div>

      <div className='space-y-4'>
        {cart.items.map((item) => {
          const originalPrice = item.productSnapshot.price
          const discountedPrice = item.productSnapshot.discountedPrice ?? originalPrice
          const discount = originalPrice - discountedPrice
          const discountPercent = discount > 0 ? Math.round((discount / originalPrice) * 100) : 0

          return (
            <div key={item.id} className='flex gap-4 rounded-lg border border-gray-200 bg-white p-4'>
              <div className='relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100'>
                {/* Placeholder for product image */}
                <div className='flex h-full w-full items-center justify-center bg-gray-200 text-xs text-gray-400'>
                  Image
                </div>
              </div>

              <div className='flex-1'>
                <h3 className='font-semibold text-gray-900'>{item.productSnapshot.name}</h3>
                <p className='text-sm text-gray-500'>Seller: Shreeji</p>

                <div className='mt-2 flex items-center gap-2'>
                  <span className='font-semibold text-gray-900'>
                    {currencyFormatter(discountedPrice * item.quantity, cart.currency)}
                  </span>
                  {discount > 0 && (
                    <>
                      <span className='text-sm text-gray-500 line-through'>
                        {currencyFormatter(originalPrice * item.quantity, cart.currency)}
                      </span>
                      <span className='text-sm font-medium text-green-600'>({discountPercent}% offer)</span>
                    </>
                  )}
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

