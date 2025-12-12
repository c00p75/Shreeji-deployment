'use client'

import { useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { CheckBadgeIcon, HandThumbUpIcon, FlagIcon } from '@heroicons/react/24/outline'
import StarRating from './StarRating'
import ReportReviewModal from './ReportReviewModal'

interface ReviewCardProps {
  review: {
    id: number
    customer?: {
      id?: number
      firstName?: string
      lastName?: string
      email?: string
    }
    rating: number
    title?: string
    comment?: string
    helpfulCount?: number
    isVerifiedPurchase?: boolean
    createdAt: string
  }
  onHelpful?: (reviewId: number) => void
  showHelpful?: boolean
  currentCustomerId?: number
}

export default function ReviewCard({ review, onHelpful, showHelpful = true, currentCustomerId }: ReviewCardProps) {
  const [showReportModal, setShowReportModal] = useState(false)
  const customerName =
    review.customer?.firstName && review.customer?.lastName
      ? `${review.customer.firstName} ${review.customer.lastName}`
      : review.customer?.firstName || review.customer?.email?.split('@')[0] || 'Anonymous'
  
  // Don't show report button if user is viewing their own review
  const canReport = currentCustomerId !== undefined && review.customer?.id !== currentCustomerId

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-semibold text-gray-900">{customerName}</h4>
            {review.isVerifiedPurchase && (
              <span className="inline-flex items-center text-xs text-green-600" title="Verified Purchase">
                <CheckBadgeIcon className="h-4 w-4 mr-1" />
                Verified Purchase
              </span>
            )}
          </div>
          <StarRating rating={review.rating} readonly size="sm" />
        </div>
        <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
      </div>

      {review.title && (
        <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
      )}

      {review.comment && (
        <p className="text-gray-700 mb-3 whitespace-pre-wrap">{review.comment}</p>
      )}

      <div className="flex items-center space-x-4">
        {showHelpful && (
          <button
            onClick={() => onHelpful?.(review.id)}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <HandThumbUpIcon className="h-4 w-4" />
            <span>Helpful ({review.helpfulCount || 0})</span>
          </button>
        )}
        {canReport && (
          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
            title="Report this review"
          >
            <FlagIcon className="h-4 w-4" />
            <span>Report</span>
          </button>
        )}
      </div>

      <ReportReviewModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        reviewId={review.id}
      />
    </div>
  )
}

