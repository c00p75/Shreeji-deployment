'use client'

import { useState, useEffect } from 'react'
import api from '@/app/lib/admin/api'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import StarRating from '../products/StarRating'

interface FlaggedReview {
  id: number
  product: {
    id: number
    name: string
  }
  customer: {
    id: number
    firstName?: string
    lastName?: string
    email?: string
  }
  rating: number
  title?: string
  comment?: string
  reportedCount: number
  reportedBy: number[]
  isFlagged: boolean
  createdAt: string
}

export default function FlaggedReviewsManagement() {
  const [reviews, setReviews] = useState<FlaggedReview[]>([])
  const [loading, setLoading] = useState(true)
  const [moderating, setModerating] = useState<number | null>(null)

  useEffect(() => {
    loadFlaggedReviews()
  }, [])

  const loadFlaggedReviews = async () => {
    try {
      setLoading(true)
      const response = await api.getFlaggedReviews()
      setReviews(response.data || [])
    } catch (error: any) {
      console.error('Failed to load flagged reviews:', error)
      toast.error(error.message || 'Failed to load flagged reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleModerate = async (reviewId: number, action: 'approve' | 'dismiss') => {
    try {
      setModerating(reviewId)
      await api.moderateReview(reviewId, action)
      toast.success(`Review ${action === 'approve' ? 'approved' : 'dismissed'} successfully`)
      loadFlaggedReviews()
    } catch (error: any) {
      toast.error(error.message || `Failed to ${action} review`)
    } finally {
      setModerating(null)
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading flagged reviews...
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p className="text-lg font-medium mb-2">No Flagged Reviews</p>
        <p className="text-sm">All reviews are clean!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Flagged Reviews</h2>
        <span className="text-sm text-gray-600">
          {reviews.length} review{reviews.length !== 1 ? 's' : ''} flagged
        </span>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => {
          const customerName =
            review.customer?.firstName && review.customer?.lastName
              ? `${review.customer.firstName} ${review.customer.lastName}`
              : review.customer?.firstName || review.customer?.email?.split('@')[0] || 'Anonymous'

          return (
            <div
              key={review.id}
              className="border border-red-200 rounded-lg p-6 bg-red-50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{customerName}</h3>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                      {review.reportedCount} report{review.reportedCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="mb-2">
                    <StarRating rating={review.rating} readonly size="sm" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Product: <span className="font-medium">{review.product.name}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {review.title && (
                <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
              )}

              {review.comment && (
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{review.comment}</p>
              )}

              <div className="flex items-center space-x-3 pt-4 border-t border-red-200">
                <button
                  onClick={() => handleModerate(review.id, 'approve')}
                  disabled={moderating === review.id}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckIcon className="h-5 w-5" />
                  <span>Approve & Clear Flags</span>
                </button>
                <button
                  onClick={() => handleModerate(review.id, 'dismiss')}
                  disabled={moderating === review.id}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <XMarkIcon className="h-5 w-5" />
                  <span>Dismiss Reports</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}



