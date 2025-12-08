'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

interface ToastWithProgressProps {
  t: {
    id: string
  }
  duration?: number
}

export const ToastWithProgress = ({ t, duration = 8000 }: ToastWithProgressProps) => {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const decrement = 100 / (duration / 100)
        const newProgress = prev - decrement
        return newProgress <= 0 ? 0 : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [duration])

  return (
    <div className="relative flex flex-col items-center gap-4 p-2 pb-10">
      {/* Close button */}
      <button
        onClick={() => toast.dismiss(t.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
        aria-label="Close"
      >
        <X size={20} />
      </button>
      
      <div className="text-2xl font-bold text-[var(--shreeji-primary)]">✓ Added to Cart!</div>
      <p className="text-base text-gray-700 font-medium">Item successfully added to your shopping cart</p>
      <Link
        href="/checkout"
        onClick={() => toast.dismiss(t.id)}
        className="px-6 py-3 bg-[var(--shreeji-primary)] text-white rounded-xl text-base font-bold hover:opacity-90 transition-all hover:scale-105 shadow-lg"
      >
        Proceed to Checkout →
      </Link>
      
      {/* Progress bar */}
      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gray-200 rounded-b-[16px] overflow-hidden">
        <div
          className="h-full bg-[var(--shreeji-primary)] transition-all ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

