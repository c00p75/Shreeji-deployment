'use client'

import { useState, useEffect } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useClientAuth } from '@/app/contexts/ClientAuthContext'
import clientApi from '@/app/lib/client/api'
import toast from 'react-hot-toast'

interface WishlistButtonProps {
  productId: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function WishlistButton({ productId, className = '', size = 'md' }: WishlistButtonProps) {
  const { isAuthenticated } = useClientAuth()
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      checkWishlistStatus()
    } else {
      setChecking(false)
    }
  }, [isAuthenticated, productId])

  const checkWishlistStatus = async () => {
    try {
      setChecking(true)
      const response = await clientApi.checkInWishlist(productId)
      setIsInWishlist(response.inWishlist)
    } catch (error) {
      setIsInWishlist(false)
    } finally {
      setChecking(false)
    }
  }

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist')
      return
    }

    try {
      setLoading(true)
      if (isInWishlist) {
        await clientApi.removeFromWishlist(productId)
        setIsInWishlist(false)
        toast.success('Removed from wishlist')
      } else {
        await clientApi.addToWishlist(productId)
        setIsInWishlist(true)
        toast.success('Added to wishlist')
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update wishlist')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }

  if (checking) {
    return (
      <button
        type="button"
        className={`${sizeClasses[size]} ${className} flex items-center justify-center text-gray-400`}
        disabled
      >
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className={`${sizeClasses[size]} ${className} flex items-center justify-center transition-colors ${
        isInWishlist
          ? 'text-red-500 hover:text-red-600'
          : 'text-gray-400 hover:text-red-500'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
      ) : isInWishlist ? (
        <HeartIconSolid className="h-full w-full" />
      ) : (
        <HeartIcon className="h-full w-full" />
      )}
    </button>
  )
}

