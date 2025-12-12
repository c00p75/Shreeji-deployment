'use client'

import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import api from '@/app/lib/admin/api'
import toast from 'react-hot-toast'

interface CancelOrderModalProps {
  isOpen: boolean
  onClose: () => void
  orderId: string | number
  orderNumber: string
  onSuccess: () => void
}

const CANCELLATION_REASONS = [
  'Customer requested cancellation',
  'Payment failed',
  'Out of stock',
  'Fraudulent order',
  'Duplicate order',
  'Other',
]

export default function CancelOrderModal({
  isOpen,
  onClose,
  orderId,
  orderNumber,
  onSuccess,
}: CancelOrderModalProps) {
  const [reason, setReason] = useState('')
  const [customReason, setCustomReason] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!reason) {
      toast.error('Please select a cancellation reason')
      return
    }

    if (reason === 'Other' && !customReason.trim()) {
      toast.error('Please provide a reason for cancellation')
      return
    }

    try {
      setLoading(true)
      const cancellationReason = reason === 'Other' ? customReason : reason
      await api.cancelOrder(orderId, cancellationReason)
      
      toast.success('Order cancelled successfully')
      onSuccess()
      onClose()
      
      // Reset form
      setReason('')
      setCustomReason('')
    } catch (error: any) {
      console.error('Error cancelling order:', error)
      toast.error(error.message || 'Failed to cancel order')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setReason('')
      setCustomReason('')
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Cancel Order #{orderNumber}
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none disabled:opacity-50"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="bg-white px-4 pt-5 sm:p-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Are you sure you want to cancel this order? This action cannot be undone.
                </p>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for cancellation <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  >
                    <option value="">Select a reason</option>
                    {CANCELLATION_REASONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {reason === 'Other' && (
                  <div>
                    <label htmlFor="customReason" className="block text-sm font-medium text-gray-700 mb-2">
                      Please specify <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="customReason"
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Please provide a reason for cancellation"
                      required
                    />
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> If the order has been paid, a refund will be processed automatically.
                    Inventory will also be restored.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Cancelling...' : 'Cancel Order'}
              </button>
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                Keep Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

