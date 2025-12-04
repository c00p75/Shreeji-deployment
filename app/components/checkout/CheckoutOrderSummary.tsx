'use client'

import { useCart } from '@/app/contexts/CartContext'
import { currencyFormatter } from './currency-formatter'

export default function CheckoutOrderSummary() {
  const { cart } = useCart()

  // Calculate VAT percentage
  let vatPercentage: number | null = null
  if (cart) {
    const taxRates = cart.items
      .map(item => item.taxRate || item.productSnapshot.taxRate)
      .filter((rate): rate is number => rate !== null && rate !== undefined)
    
    if (taxRates.length > 0) {
      // Check if all items have the same tax rate
      const uniqueRates = [...new Set(taxRates)]
      if (uniqueRates.length === 1) {
        vatPercentage = uniqueRates[0]
      } else {
        // If different rates, calculate from totals
        vatPercentage = cart.subtotal > 0 ? (cart.taxTotal / cart.subtotal) * 100 : null
      }
    } else if (cart.subtotal > 0 && cart.taxTotal > 0) {
      // Fallback: calculate from totals
      vatPercentage = (cart.taxTotal / cart.subtotal) * 100
    }
  }

  return (
    <aside className='order-1 min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-6 lg:order-2 lg:sticky lg:top-6 lg:h-fit'>
      <h2 className='text-xl font-semibold text-gray-900'>Order summary</h2>
      {cart ? (
        <div className='mt-6 space-y-3 text-sm'>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Subtotal</span>
            <span className='font-medium text-gray-900'>{currencyFormatter(cart.subtotal, cart.currency)}</span>
          </div>
          {cart.taxTotal > 0 && (
            <div className='flex justify-between'>
              <span className='text-gray-500'>
                Value Added Tax (VAT)
                {vatPercentage !== null && (
                  <span className='ml-1 text-xs text-gray-400'>({vatPercentage.toFixed(1)}%)</span>
                )}
              </span>
              <span className='font-medium text-gray-900'>{currencyFormatter(cart.taxTotal, cart.currency)}</span>
            </div>
          )}
          <div className='flex justify-between border-t border-dashed border-gray-200 pt-3 text-base font-semibold'>
            <span>Total</span>
            <span>{currencyFormatter(cart.total, cart.currency)}</span>
          </div>
        </div>
      ) : (
        <p className='mt-6 text-sm text-gray-500'>Cart totals will appear here.</p>
      )}

      <div className='mt-8 rounded-xl bg-gray-50 p-4 text-sm text-gray-600'>
        <p className='font-semibold text-gray-800'>Need help?</p>
        <p>
          Contact our sales team at{' '}
          <a className='text-[var(--shreeji-primary)]' href='tel:+260771161111'>
            +260 77 116 1111
          </a>{' '}
          or{' '}
          <a className='text-[var(--shreeji-primary)]' href='mailto:sales@shreeji.co.zm'>
            sales@shreeji.co.zm
          </a>
          .
        </p>
      </div>
    </aside>
  )
}

