'use client'

import Link from 'next/link'
import React from 'react'
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

interface CheckoutAlertsProps {
  cartError: string | null
  formError: string | null
  success: { orderNumber: string; orderId: number; paymentStatus: string; redirectUrl?: string; requiresAction?: boolean } | null
  paymentMethod?: string
  onRetry?: () => void
}

export default function CheckoutAlerts({ cartError, formError, success, paymentMethod, onRetry }: CheckoutAlertsProps) {
  const getPaymentStatusMessage = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'completed':
        return { icon: CheckCircle, color: 'green', message: 'Payment completed successfully' }
      case 'pending':
        return { icon: Clock, color: 'yellow', message: 'Payment is pending confirmation' }
      case 'failed':
      case 'declined':
        return { icon: XCircle, color: 'red', message: 'Payment failed' }
      default:
        return { icon: AlertCircle, color: 'gray', message: `Payment status: ${status}` }
    }
  }

  return (
    <>
      {cartError && (
        <div className='mb-4 flex items-start gap-3 rounded-md bg-red-50 p-4 text-red-700'>
          <XCircle className='h-5 w-5 flex-shrink-0' />
          <div className='flex-1'>
            <p className='font-semibold'>Error</p>
            <p className='text-sm'>{cartError}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className='mt-2 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700'
              >
                Retry
              </button>
            )}
          </div>
        </div>
      )}
      {formError && (
        <div className='mb-4 flex items-start gap-3 rounded-md bg-red-50 p-4 text-red-700'>
          <XCircle className='h-5 w-5 flex-shrink-0' />
          <div className='flex-1'>
            <p className='font-semibold'>Validation Error</p>
            <p className='text-sm'>{formError}</p>
          </div>
        </div>
      )}
      {success && (
        <div className={`mb-6 rounded-md bg-${getPaymentStatusMessage(success.paymentStatus).color}-50 p-4 text-${getPaymentStatusMessage(success.paymentStatus).color}-800`}>
          <div className='flex items-start gap-3'>
            {React.createElement(getPaymentStatusMessage(success.paymentStatus).icon, {
              className: 'h-5 w-5 flex-shrink-0',
            })}
            <div className='flex-1'>
              <p className='font-semibold'>Order {success.orderNumber} placed successfully</p>
              <p className='mt-1 text-sm'>
                {getPaymentStatusMessage(success.paymentStatus).message}
              </p>
              
              {success.requiresAction && success.redirectUrl && (
                <p className='mt-2 text-sm font-medium'>
                  Redirecting to payment gateway...
                </p>
              )}

              {paymentMethod === 'bank_transfer' && success.paymentStatus === 'pending' && (
                <div className='mt-3 rounded bg-white p-3 text-sm'>
                  <p className='font-semibold'>Bank Transfer Instructions:</p>
                  <p className='mt-1'>Please transfer the order amount to:</p>
                  <ul className='mt-2 list-inside list-disc space-y-1'>
                    <li>Bank: [Your Bank Name]</li>
                    <li>Account Number: [Account Number]</li>
                    <li>Account Name: Shreeji</li>
                    <li>Reference: {success.orderNumber}</li>
                  </ul>
                  <p className='mt-2 text-xs'>Complete the transfer within 24 hours to confirm your order.</p>
                </div>
              )}

              {paymentMethod === 'cod' && success.paymentStatus === 'pending' && (
                <div className='mt-3 rounded bg-white p-3 text-sm'>
                  <p className='font-semibold'>Cash on Delivery Confirmed</p>
                  <p className='mt-1'>Please have the exact amount ready when your order arrives.</p>
                </div>
              )}

              <div className='mt-4 flex gap-3'>
                <Link
                  href={`/portal/orders/${success.orderId}`}
                  className='rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700'
                >
                  View Order Details
                </Link>
                <Link
                  href='/portal/orders'
                  className='rounded border border-green-600 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50'
                >
                  View All Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

