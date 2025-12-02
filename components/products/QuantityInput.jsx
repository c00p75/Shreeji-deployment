'use client'

import { Minus, Plus } from 'lucide-react'

export default function QuantityInput({ value, onChange, min = 1, max, className = '' }) {
  const handleDecrement = () => {
    const newValue = Math.max(min, value - 1)
    onChange(newValue)
  }

  const handleIncrement = () => {
    const newValue = max ? Math.min(max, value + 1) : value + 1
    onChange(newValue)
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    if (inputValue === '') {
      onChange(min)
      return
    }
    const numValue = Number(inputValue)
    if (!isNaN(numValue)) {
      const clampedValue = max 
        ? Math.max(min, Math.min(max, numValue))
        : Math.max(min, numValue)
      onChange(clampedValue)
    }
  }

  return (
    <div className={`flex h-[-webkit-fill-available] items-center rounded-2xl bg-[var(--shreeji-primary)] overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="flex h-full items-center justify-center pl-3 py-2 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        className="w-16 border-0 bg-transparent py-2 text-center text-white focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      
      <button
        type="button"
        onClick={handleIncrement}
        disabled={max !== undefined && value >= max}
        className="flex h-full items-center justify-center pr-3 py-2 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

