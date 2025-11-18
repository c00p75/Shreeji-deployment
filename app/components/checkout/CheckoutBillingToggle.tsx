'use client'

interface CheckoutBillingToggleProps {
  sameAsShipping: boolean
  onChange: (sameAsShipping: boolean) => void
}

export default function CheckoutBillingToggle({ sameAsShipping, onChange }: CheckoutBillingToggleProps) {
  return (
    <div className='rounded-xl border border-gray-200 p-4'>
      <label className='flex items-center gap-3'>
        <input
          type='checkbox'
          checked={sameAsShipping}
          onChange={(e) => onChange(e.target.checked)}
          className='h-4 w-4 rounded border-gray-300 text-[var(--shreeji-primary)] focus:ring-[var(--shreeji-primary)]'
        />
        <span className='text-sm text-gray-700'>Billing address is the same as shipping</span>
      </label>
    </div>
  )
}

