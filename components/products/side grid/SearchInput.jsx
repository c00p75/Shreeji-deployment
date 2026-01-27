'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const router = useRouter()

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/products/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const handleClear = () => {
    setSearchTerm('')
    setDebouncedTerm('')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mb-5">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-3 bg-white border border-white/20 rounded-2xl text-[#423922] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  )
}

