'use client'

import Link from 'next/link'
import { useCart } from '@/app/contexts/CartContext'
import { currencyFormatter } from './currency-formatter'

export default function CheckoutCartItems() {
  const { cart, removeItem, updateItem } = useCart()

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    if (quantity < 1) return
    await updateItem(itemId, quantity)
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className='mt-4 space-y-4 rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500'>
        <p>Your cart is empty.</p>
        <Link
          href='/products'
          className='mt-4 inline-flex items-center justify-center rounded-full border border-[var(--shreeji-primary)] px-6 py-3 text-[var(--shreeji-primary)] transition hover:bg-[var(--shreeji-primary)] hover:text-white'
        >
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className='mt-4 space-y-4'>
      {cart.items.map((item) => (
        <div
          key={item.id}
          className='flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between'
        >
          <div className='flex-1'>
            <p className='text-lg font-semibold text-gray-900'>{item.productSnapshot.name}</p>
            <p className='text-sm text-gray-500'>SKU: {item.productSnapshot.sku}</p>
          </div>
          <div className='flex items-center gap-3'>
            <label htmlFor={`qty-${item.id}`} className='text-sm text-gray-500'>
              Qty
            </label>
            <input
              id={`qty-${item.id}`}
              type='number'
              min={1}
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
              className='w-20 rounded-md border border-gray-300 px-2 py-1 text-center focus:border-[var(--shreeji-primary)] focus:outline-none'
            />
          </div>
          <div className='text-right'>
            <p className='text-base font-semibold text-gray-900'>{currencyFormatter(item.subtotal, cart.currency)}</p>
            <button
              type='button'
              className='text-sm text-red-500 hover:text-red-700'
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

