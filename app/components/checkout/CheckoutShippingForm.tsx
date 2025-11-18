'use client'

interface AddressData {
  firstName: string
  lastName: string
  email?: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface CheckoutShippingFormProps {
  shipping: AddressData
  onChange: (field: string, value: string) => void
}

export default function CheckoutShippingForm({ shipping, onChange }: CheckoutShippingFormProps) {
  return (
    <div>
      <h2 className='text-xl font-semibold text-gray-900'>Contact & Shipping</h2>
      <div className='mt-4 grid gap-4 md:grid-cols-2'>
        <input
          type='text'
          placeholder='First name'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={shipping.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Last name'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={shipping.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          required
        />
        <input
          type='email'
          placeholder='Email address'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={shipping.email || ''}
          onChange={(e) => onChange('email', e.target.value)}
          required
        />
        <input
          type='tel'
          placeholder='Phone number'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={shipping.phone}
          onChange={(e) => onChange('phone', e.target.value)}
        />
        <input
          type='text'
          placeholder='Address line 1'
          className='rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none md:col-span-2'
          value={shipping.addressLine1}
          onChange={(e) => onChange('addressLine1', e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Address line 2 (optional)'
          className='rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none md:col-span-2'
          value={shipping.addressLine2}
          onChange={(e) => onChange('addressLine2', e.target.value)}
        />
        <input
          type='text'
          placeholder='City'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={shipping.city}
          onChange={(e) => onChange('city', e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='State / Province'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={shipping.state}
          onChange={(e) => onChange('state', e.target.value)}
        />
        <input
          type='text'
          placeholder='Postal code'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={shipping.postalCode}
          onChange={(e) => onChange('postalCode', e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Country'
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
          value={shipping.country}
          onChange={(e) => onChange('country', e.target.value)}
          required
        />
      </div>
    </div>
  )
}

