'use client'

interface AddressData {
  firstName: string
  lastName: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface CheckoutBillingFormProps {
  billing: AddressData
  onChange: (field: string, value: string) => void
}

export default function CheckoutBillingForm({ billing, onChange }: CheckoutBillingFormProps) {
  return (
    <div>
      <h2 className='text-xl font-semibold text-gray-900'>Billing address</h2>
      <div className='mt-4 grid gap-4 md:grid-cols-2'>
        <input
          type='text'
          placeholder='First name'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={billing.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
        />
        <input
          type='text'
          placeholder='Last name'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={billing.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
        />
        <input
          type='text'
          placeholder='Address line 1'
          className='rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none md:col-span-2'
          value={billing.addressLine1}
          onChange={(e) => onChange('addressLine1', e.target.value)}
        />
        <input
          type='text'
          placeholder='Address line 2'
          className='rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none md:col-span-2'
          value={billing.addressLine2}
          onChange={(e) => onChange('addressLine2', e.target.value)}
        />
        <input
          type='text'
          placeholder='City'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={billing.city}
          onChange={(e) => onChange('city', e.target.value)}
        />
        <input
          type='text'
          placeholder='State'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={billing.state}
          onChange={(e) => onChange('state', e.target.value)}
        />
        <input
          type='text'
          placeholder='Postal code'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={billing.postalCode}
          onChange={(e) => onChange('postalCode', e.target.value)}
        />
        <input
          type='text'
          placeholder='Country'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={billing.country}
          onChange={(e) => onChange('country', e.target.value)}
        />
        <input
          type='text'
          placeholder='Phone'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={billing.phone}
          onChange={(e) => onChange('phone', e.target.value)}
        />
      </div>
    </div>
  )
}

