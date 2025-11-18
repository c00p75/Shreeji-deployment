'use client'

interface CheckoutPaymentMethodProps {
  paymentMethod: string
  onChange: (method: string) => void
}

export default function CheckoutPaymentMethod({ paymentMethod, onChange }: CheckoutPaymentMethodProps) {
  return (
    <div>
      <h2 className='text-xl font-semibold text-gray-900'>Payment</h2>
      <p className='text-sm text-gray-500'>Mock payments let you place practice orders before enabling live gateways.</p>
      <div className='mt-4 space-y-3'>
        <label className='flex items-center gap-3 rounded-lg border border-gray-200 p-4'>
          <input
            type='radio'
            name='paymentMethod'
            value='mock'
            checked={paymentMethod === 'mock'}
            onChange={(e) => onChange(e.target.value)}
            className='h-4 w-4 text-[var(--shreeji-primary)] focus:ring-[var(--shreeji-primary)]'
          />
          <div>
            <p className='font-medium text-gray-900'>Mock payment</p>
            <p className='text-sm text-gray-500'>Simulates Visa/MasterCard/mobile money without charging a card.</p>
          </div>
        </label>
      </div>
    </div>
  )
}

