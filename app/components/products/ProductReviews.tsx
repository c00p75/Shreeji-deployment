'use client'

import { useState, useEffect } from 'react'
import { useClientAuth } from '@/app/contexts/ClientAuthContext'
import clientApi from '@/app/lib/client/api'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import StarRating from './StarRating'
import { PencilIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface ProductReviewsProps {
  productId: number
  productSlug?: string
}

export default function ProductReviews({ productId, productSlug }: ProductReviewsProps) {
  const { isAuthenticated, user } = useClientAuth()
  const [reviews, setReviews] = useState<any[]>([])
  const [stats, setStats] = useState<{
    averageRating: number
    totalReviews: number
    ratingDistribution: Record<number, number>
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [customerReview, setCustomerReview] = useState<any | null>(null)

  useEffect(() => {
    loadReviews()
    loadStats()
    if (isAuthenticated) {
      loadCustomerReview()
    }
  }, [productId, isAuthenticated])

  const loadReviews = async () => {
    try {
      setLoading(true)
      const response = await clientApi.getProductReviews(productId)
      setReviews(response.data || [])
    } catch (error) {
      console.error('Failed to load reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await clientApi.getProductRatingStats(productId)
      setStats(response)
    } catch (error) {
      console.error('Failed to load rating stats:', error)
    }
  }

  const loadCustomerReview = async () => {
    try {
      const response = await clientApi.getCustomerReviews()
      const myReview = response.data?.find((r: any) => r.productId === productId)
      setCustomerReview(myReview || null)
    } catch (error) {
      console.error('Failed to load customer review:', error)
    }
  }

  const handleHelpful = async (reviewId: number) => {
    try {
      await clientApi.markReviewHelpful(reviewId)
      loadReviews() // Reload to get updated helpful count
      toast.success('Thank you for your feedback!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to mark as helpful')
    }
  }

  const handleReviewSuccess = () => {
    setShowForm(false)
    loadReviews()
    loadStats()
    loadCustomerReview()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          {stats && (
            <div className="mt-2 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <StarRating rating={stats.averageRating} size="lg" readonly />
                <span className="text-lg font-semibold text-gray-900">
                  {stats.averageRating.toFixed(1)} out of 5
                </span>
              </div>
              <span className="text-gray-500">
                Based on {stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          )}
        </div>
        {isAuthenticated && !customerReview && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[var(--shreeji-primary)] text-white rounded-lg hover:opacity-90 transition-all"
          >
            <PencilIcon className="h-5 w-5" />
            <span>Write a Review</span>
          </button>
        )}
      </div>

      {/* Rating Distribution */}
      {stats && stats.ratingDistribution && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Rating Distribution</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.ratingDistribution[rating] || 0
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 w-8">{rating} star</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
          <ReviewForm
            productId={productId}
            onSuccess={handleReviewSuccess}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Customer's Existing Review */}
      {customerReview && !showForm && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Review</h3>
            {customerReview.status === 'pending' && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                Pending Approval
              </span>
            )}
          </div>
          <ReviewCard review={customerReview} showHelpful={false} />
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onHelpful={handleHelpful}
              showHelpful={isAuthenticated}
              currentCustomerId={user?.id}
            />
          ))
        )}
      </div>
    </div>
  )
}

