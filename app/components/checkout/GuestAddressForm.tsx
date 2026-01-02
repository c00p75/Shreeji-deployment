'use client'

import { useState, useEffect } from 'react'
import { CheckoutAddressInput } from '@/app/lib/ecommerce/api'

interface GuestAddressFormProps {
  addressData: CheckoutAddressInput | null
  onAddressDataChange: (data: CheckoutAddressInput) => void
}

export default function GuestAddressForm({
  addressData,
  onAddressDataChange,
}: GuestAddressFormProps) {
  const [formData, setFormData] = useState<CheckoutAddressInput>({
    firstName: addressData?.firstName || '',
    lastName: addressData?.lastName || '',
    addressLine1: addressData?.addressLine1 || '',
    addressLine2: addressData?.addressLine2 || '',
    city: addressData?.city || '',
    state: addressData?.state || '',
    postalCode: addressData?.postalCode || '',
    country: addressData?.country || 'Zambia',
    phone: addressData?.phone || '',
  })
  const [errors, setErrors] = useState<{
    firstName?: string
    lastName?: string
    addressLine1?: string
    city?: string
    postalCode?: string
    country?: string
  }>({})

  useEffect(() => {
    if (addressData) {
      setFormData(addressData)
    }
  }, [addressData])

  const handleChange = (field: keyof CheckoutAddressInput, value: string) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    
    // Clear error for this field
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: undefined })
    }
    
    // Validate required fields
    const newErrors: typeof errors = {}
    
    if (field === 'firstName' && !value.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (field === 'lastName' && !value.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (field === 'addressLine1' && !value.trim()) {
      newErrors.addressLine1 = 'Address line 1 is required'
    } else if (field === 'city' && !value.trim()) {
      newErrors.city = 'City is required'
    } else if (field === 'postalCode' && !value.trim()) {
      newErrors.postalCode = 'Postal code is required'
    } else if (field === 'country' && !value.trim()) {
      newErrors.country = 'Country is required'
    }
    
    setErrors(newErrors)
    onAddressDataChange(updated)
  }

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            First Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            required
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--shreeji-primary)] focus:border-transparent ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='Enter first name'
          />
          {errors.firstName && (
            <p className='mt-1 text-xs text-red-600'>{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Last Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            required
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--shreeji-primary)] focus:border-transparent ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='Enter last name'
          />
          {errors.lastName && (
            <p className='mt-1 text-xs text-red-600'>{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Address Line 1 <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          required
          value={formData.addressLine1}
          onChange={(e) => handleChange('addressLine1', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--shreeji-primary)] focus:border-transparent ${
            errors.addressLine1 ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder='Street address, P.O. Box, etc.'
        />
        {errors.addressLine1 && (
          <p className='mt-1 text-xs text-red-600'>{errors.addressLine1}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Address Line 2 <span className='text-gray-400'>(Optional)</span>
        </label>
        <input
          type='text'
          value={formData.addressLine2 || ''}
          onChange={(e) => handleChange('addressLine2', e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--shreeji-primary)] focus:border-transparent'
          placeholder='Apartment, suite, unit, building, floor, etc.'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            City <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            required
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--shreeji-primary)] focus:border-transparent ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='Enter city'
          />
          {errors.city && (
            <p className='mt-1 text-xs text-red-600'>{errors.city}</p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            State/Province <span className='text-gray-400'>(Optional)</span>
          </label>
          <input
            type='text'
            value={formData.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--shreeji-primary)] focus:border-transparent'
            placeholder='Enter state/province'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Postal Code <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            required
            value={formData.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--shreeji-primary)] focus:border-transparent ${
              errors.postalCode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='Enter postal code'
          />
          {errors.postalCode && (
            <p className='mt-1 text-xs text-red-600'>{errors.postalCode}</p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Country <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            required
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--shreeji-primary)] focus:border-transparent ${
              errors.country ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='Enter country'
          />
          {errors.country && (
            <p className='mt-1 text-xs text-red-600'>{errors.country}</p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Phone <span className='text-gray-400'>(Optional)</span>
          </label>
          <input
            type='tel'
            value={formData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--shreeji-primary)] focus:border-transparent'
            placeholder='+260 77 123 4567'
          />
        </div>
      </div>
    </div>
  )
}

