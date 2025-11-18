'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/app/contexts/CartContext'

export default function CartButton() {
  const { cart, loading, updating } = useCart()
  const count = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0
  const disabled = loading || updating

  return (
    <Link
      href="/checkout"
      className={`relative flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        disabled ? 'pointer-events-none opacity-70' : 'hover:bg-[var(--primary)] hover:text-white'
      }`}
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="hidden md:inline">Cart</span>
      <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--primary)] px-1 text-xs text-white">
        {count}
      </span>
    </Link>
  )
}
