'use client'

interface CheckoutHeaderProps {
  itemsCount: number
}

export default function CheckoutHeader({ itemsCount }: CheckoutHeaderProps) {
  return (
    <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:mb-8'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Checkout</h1>
        <p className='text-gray-500'>Review your cart and provide shipping details to complete your order.</p>
      </div>
      <span className='inline-flex items-center justify-center rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600'>
        Items: {itemsCount}
      </span>
    </div>
  )
}

