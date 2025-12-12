'use client'

import { useState } from 'react'
import { useClientAuth } from '@/app/contexts/ClientAuthContext'
import clientApi from '@/app/lib/client/api'
import StarRating from './StarRating'
import toast from 'react-hot-toast'

interface ReviewFormProps {
  productId: number
  orderId?: number
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ReviewForm({ productId, orderId, onSuccess, onCancel }: ReviewFormProps) {
  const { isAuthenticated } = useClientAuth()
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
        <p className="text-gray-600">Please login to write a review</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast.error('Please select a rating')
      return
    }

    if (!comment.trim()) {
      toast.error('Please write a comment')
      return
    }

    try {
      setSubmitting(true)
      await clientApi.createReview({
        productId,
        orderId,
        rating,
        title: title.trim() || undefined,
        comment: comment.trim(),
      })
      toast.success('Review submitted successfully! It will be published after approval.')
      setRating(0)
      setTitle('')
      setComment('')
      onSuccess?.()
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit review')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating <span className="text-red-500">*</span>
        </label>
        <StarRating
          rating={rating}
          interactive
          onRatingChange={setRating}
          size="lg"
        />
      </div>

      <div>
        <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 mb-2">
          Review Title (Optional)
        </label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[var(--shreeji-primary)] focus:ring-1 focus:ring-[var(--shreeji-primary)]"
          placeholder="Summarize your experience"
        />
      </div>

      <div>
        <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 mb-2">
          Your Review <span className="text-red-500">*</span>
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          required
          maxLength={1000}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[var(--shreeji-primary)] focus:ring-1 focus:ring-[var(--shreeji-primary)]"
          placeholder="Share your experience with this product..."
        />
        <p className="mt-1 text-xs text-gray-500">{comment.length}/1000 characters</p>
      </div>

      <div className="flex items-center space-x-3">
        <button
          type="submit"
          disabled={submitting || rating === 0 || !comment.trim()}
          className="px-6 py-2 bg-[var(--shreeji-primary)] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

