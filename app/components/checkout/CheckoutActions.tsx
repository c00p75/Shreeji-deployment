'use client'

import Link from 'next/link'

interface CheckoutActionsProps {
  isCheckingOut: boolean
  updating: boolean
  isCartEmpty: boolean
}

export default function CheckoutActions({ isCheckingOut, updating, isCartEmpty }: CheckoutActionsProps) {
  return (
    <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
      <Link href='/products' className='text-center text-[var(--shreeji-primary)] hover:underline'>
        Continue shopping
      </Link>
      <button
        type='submit'
        disabled={isCheckingOut || updating || isCartEmpty}
        className='rounded-full bg-[var(--shreeji-primary)] px-8 py-3 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
      >
        {isCheckingOut ? 'Processing...' : 'Place mock order'}
      </button>
    </div>
  )
}

