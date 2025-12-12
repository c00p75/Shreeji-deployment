'use client'

import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import clientApi from '@/app/lib/client/api'
import toast from 'react-hot-toast'

interface ReportReviewModalProps {
  isOpen: boolean
  onClose: () => void
  reviewId: number
  onReported?: () => void
}

const REPORT_REASONS = [
  { value: 'spam', label: 'Spam' },
  { value: 'inappropriate', label: 'Inappropriate Content' },
  { value: 'false_information', label: 'False Information' },
  { value: 'offensive', label: 'Offensive Language' },
  { value: 'other', label: 'Other' },
]

export default function ReportReviewModal({
  isOpen,
  onClose,
  reviewId,
  onReported,
}: ReportReviewModalProps) {
  const [reason, setReason] = useState<string>('')
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reason) {
      toast.error('Please select a reason')
      return
    }

    try {
      setSubmitting(true)
      await clientApi.reportReview(reviewId, {
        reason: reason as any,
        comment: comment.trim() || undefined,
      })
      toast.success('Review reported successfully. Thank you for your feedback.')
      setReason('')
      setComment('')
      onReported?.()
      onClose()
    } catch (error: any) {
      toast.error(error.message || 'Failed to report review')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
      <div className="flex items-center justify-center min-h-screen px-4 py-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Report Review</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for reporting <span className="text-red-500">*</span>
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[var(--shreeji-primary)] focus:border-[var(--shreeji-primary)]"
              >
                <option value="">Select a reason</option>
                {REPORT_REASONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments (Optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[var(--shreeji-primary)] focus:border-[var(--shreeji-primary)]"
                placeholder="Please provide any additional details..."
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !reason}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Report Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}



