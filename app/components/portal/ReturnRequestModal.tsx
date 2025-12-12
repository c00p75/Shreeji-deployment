'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import clientApi from '@/app/lib/client/api'
import toast from 'react-hot-toast'

interface ReturnRequestModalProps {
  isOpen: boolean
  onClose: () => void
  order: any
  onSuccess: () => void
}

const RETURN_REASONS = [
  { value: 'defective', label: 'Defective Item' },
  { value: 'wrong_item', label: 'Wrong Item Received' },
  { value: 'not_as_described', label: 'Not as Described' },
  { value: 'damaged', label: 'Damaged During Shipping' },
  { value: 'size_issue', label: 'Size Issue' },
  { value: 'color_issue', label: 'Color Issue' },
  { value: 'other', label: 'Other' },
]

export default function ReturnRequestModal({
  isOpen,
  onClose,
  order,
  onSuccess,
}: ReturnRequestModalProps) {
  const [selectedItems, setSelectedItems] = useState<Record<number, number>>({})
  const [reason, setReason] = useState('')
  const [reasonDetails, setReasonDetails] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && order?.orderItems) {
      // Initialize with all items selected, quantity 1
      const initial: Record<number, number> = {}
      order.orderItems.forEach((item: any) => {
        initial[item.id] = 1
      })
      setSelectedItems(initial)
    }
  }, [isOpen, order])

  if (!isOpen || !order) return null

  const handleItemQuantityChange = (itemId: number, quantity: number) => {
    const maxQuantity = order.orderItems.find((item: any) => item.id === itemId)?.quantity || 1
    const newQuantity = Math.max(0, Math.min(quantity, maxQuantity))
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: newQuantity,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reason) {
      toast.error('Please select a return reason')
      return
    }

    const itemsToReturn = Object.entries(selectedItems)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => ({
        orderItemId: parseInt(itemId),
        quantity,
      }))

    if (itemsToReturn.length === 0) {
      toast.error('Please select at least one item to return')
      return
    }

    try {
      setLoading(true)
      await clientApi.createReturnRequest({
        orderId: order.id,
        reason,
        reasonDetails: reasonDetails || undefined,
        items: itemsToReturn,
      })

      toast.success('Return request submitted successfully')
      onSuccess()
      onClose()

      // Reset form
      setReason('')
      setReasonDetails('')
      setSelectedItems({})
    } catch (error: any) {
      console.error('Error creating return request:', error)
      toast.error(error.message || 'Failed to submit return request')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setReason('')
      setReasonDetails('')
      setSelectedItems({})
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Request Return - Order #{order.orderNumber || order.id}
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

            <div className="bg-white px-4 pt-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Items to Return
                  </label>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {order.orderItems?.map((item: any) => {
                      const product = item.product || item.productSnapshot || {}
                      const quantity = selectedItems[item.id] || 0
                      return (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{product.name || 'Product'}</p>
                            <p className="text-sm text-gray-500">Ordered: {item.quantity}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleItemQuantityChange(item.id, quantity - 1)}
                              disabled={quantity === 0}
                              className="px-2 py-1 border rounded disabled:opacity-50"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleItemQuantityChange(item.id, quantity + 1)}
                              disabled={quantity >= item.quantity}
                              className="px-2 py-1 border rounded disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Return <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  >
                    <option value="">Select a reason</option>
                    {RETURN_REASONS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="reasonDetails" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details (Optional)
                  </label>
                  <textarea
                    id="reasonDetails"
                    value={reasonDetails}
                    onChange={(e) => setReasonDetails(e.target.value)}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Please provide any additional details about your return"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Return Request'}
              </button>
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

