'use client'

interface CheckoutAlertsProps {
  cartError: string | null
  formError: string | null
  success: { orderNumber: string; paymentStatus: string } | null
}

export default function CheckoutAlerts({ cartError, formError, success }: CheckoutAlertsProps) {
  return (
    <>
      {cartError && <p className='mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700'>{cartError}</p>}
      {formError && <p className='mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700'>{formError}</p>}
      {success && (
        <div className='mb-6 rounded-md bg-green-50 p-4 text-green-800'>
          <p className='font-semibold'>Order {success.orderNumber} placed successfully.</p>
          <p className='text-sm'>Payment status: {success.paymentStatus}. You can track your order from the client portal.</p>
        </div>
      )}
    </>
  )
}

