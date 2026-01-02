'use client'

import { useState } from 'react'
import { User } from 'lucide-react'
import { CheckoutCustomerInput } from '@/app/lib/ecommerce/api'

interface GuestCustomerInfoSectionProps {
  customerData: CheckoutCustomerInput | null
  onCustomerDataChange: (data: CheckoutCustomerInput) => void
}

export default function GuestCustomerInfoSection({
  customerData,
  onCustomerDataChange,
}: GuestCustomerInfoSectionProps) {
  const [formData, setFormData] = useState<CheckoutCustomerInput>({
    email: customerData?.email || '',
    firstName: customerData?.firstName || '',
    lastName: customerData?.lastName || '',
    phone: customerData?.phone || '',
  })
  const [errors, setErrors] = useState<{
    email?: string
    firstName?: string
    lastName?: string
  }>({})

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (field: keyof CheckoutCustomerInput, value: string) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    
    // Clear error for this field
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: undefined })
    }
    
    // Validate and update parent
    const newErrors: typeof errors = {}
    
    if (field === 'email') {
      if (!value.trim()) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(value)) {
        newErrors.email = 'Please enter a valid email address'
      }
    } else if (field === 'firstName') {
      if (!value.trim()) {
        newErrors.firstName = 'First name is required'
      } else if (value.trim().length < 2) {
        newErrors.firstName = 'First name must be at least 2 characters'
      }
    } else if (field === 'lastName') {
      if (!value.trim()) {
        newErrors.lastName = 'Last name is required'
      } else if (value.trim().length < 2) {
        newErrors.lastName = 'Last name must be at least 2 characters'
      }
    }
    
    setErrors(newErrors)
    onCustomerDataChange(updated)
  }

  return (
    <div className='space-y-4 rounded-lg border-t-4 border-[var(--shreeji-primary)] bg-white p-6 shadow-sm'>
      <div className='flex items-center gap-3'>
        <User className='h-5 w-5 text-[#544829]' />
        <h2 className='text-xl font-semibold text-gray-900'>Customer Information</h2>
      </div>

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
              placeholder='Enter your first name'
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
              placeholder='Enter your last name'
            />
            {errors.lastName && (
              <p className='mt-1 text-xs text-red-600'>{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Email <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            required
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--shreeji-primary)] focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='your.email@example.com'
          />
          {errors.email && (
            <p className='mt-1 text-xs text-red-600'>{errors.email}</p>
          )}
          <p className='mt-1 text-xs text-gray-500'>
            We'll send your order confirmation to this email
          </p>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Phone Number <span className='text-gray-400'>(Optional)</span>
          </label>
          <input
            type='tel'
            value={formData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--shreeji-primary)] focus:border-transparent'
            placeholder='+260 77 123 4567'
          />
          <p className='mt-1 text-xs text-gray-500'>
            We may contact you about your order
          </p>
        </div>
      </div>
    </div>
  )
}

