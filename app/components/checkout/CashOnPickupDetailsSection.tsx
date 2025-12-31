'use client'

import { Calendar, Clock, User, Car, FileText, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useClientAuth } from '@/app/contexts/ClientAuthContext'
import clientApi from '@/app/lib/client/api'

export interface CashOnPickupDetails {
  preferredPickupDate: string
  preferredPickupTime: string
  collectingPersonName?: string
  collectingPersonPhone?: string
  collectingPersonRelationship?: string
  vehicleInfo?: string
  idType?: 'nrc' | 'passport' | 'drivers_license' | 'other'
  idNumber?: string
  specialInstructions?: string
}

interface CashOnPickupDetailsSectionProps {
  onDetailsChange: (details: CashOnPickupDetails) => void
  customerName?: string
  customerPhone?: string
}

export default function CashOnPickupDetailsSection({
  onDetailsChange,
  customerName,
  customerPhone,
}: CashOnPickupDetailsSectionProps) {
  const { isAuthenticated } = useClientAuth()
  const [details, setDetails] = useState<CashOnPickupDetails>({
    preferredPickupDate: '',
    preferredPickupTime: '',
    collectingPersonName: '',
    collectingPersonPhone: '',
    collectingPersonRelationship: '',
    vehicleInfo: '',
    idType: 'nrc',
    idNumber: '',
    specialInstructions: '',
  })

  const [isDifferentPerson, setIsDifferentPerson] = useState(false)
  const [loadingPreviousData, setLoadingPreviousData] = useState(false)

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
  ]

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // Get maximum date (30 days from now)
  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    return maxDate.toISOString().split('T')[0]
  }

  const updateDetails = (field: keyof CashOnPickupDetails, value: any) => {
    const newDetails = { ...details, [field]: value }
    setDetails(newDetails)
    onDetailsChange(newDetails)
  }

  // Fetch previous pickup details when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadPreviousPickupDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const loadPreviousPickupDetails = async () => {
    try {
      setLoadingPreviousData(true)
      const response = await clientApi.getOrders({
        pagination: { page: 1, pageSize: 10 },
      })

      // Find the most recent cash on pickup order
      const copOrders = response.data.filter((order: any) => 
        order.paymentMethod === 'cash_on_pickup' && 
        order.preferredPickupDate && 
        order.idType && 
        order.idNumber
      )

      if (copOrders.length > 0) {
        // Get the most recent order
        const mostRecentOrder = copOrders.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0]

        // Pre-fill form with previous data
        const previousDetails: CashOnPickupDetails = {
          preferredPickupDate: '',
          preferredPickupTime: mostRecentOrder.preferredPickupTime || '',
          collectingPersonName: mostRecentOrder.collectingPersonName || '',
          collectingPersonPhone: mostRecentOrder.collectingPersonPhone || '',
          collectingPersonRelationship: mostRecentOrder.collectingPersonRelationship || '',
          vehicleInfo: mostRecentOrder.vehicleInfo || '',
          idType: mostRecentOrder.idType || 'nrc',
          idNumber: mostRecentOrder.idNumber || '',
          specialInstructions: mostRecentOrder.pickupSpecialInstructions || '',
        }

        // Set different person checkbox if collecting person info exists
        if (mostRecentOrder.collectingPersonName) {
          setIsDifferentPerson(true)
        }

        setDetails(previousDetails)
      }
    } catch (error) {
      console.error('Failed to load previous pickup details:', error)
    } finally {
      setLoadingPreviousData(false)
    }
  }

  // Notify parent when details change
  useEffect(() => {
    onDetailsChange(details)
  }, [details, onDetailsChange])

  return (
    <div className='space-y-6 rounded-lg border-2 border-amber-200 bg-amber-50/30 p-6'>
      <div className='flex items-center gap-3'>
        <AlertCircle className='h-5 w-5 text-amber-600' />
        <h3 className='text-lg font-semibold text-gray-900'>
          Pickup Collection Details
        </h3>
      </div>
      <p className='text-sm text-gray-600'>
        Please provide the following information to help us prepare your order for pickup.
        {isAuthenticated && (
          <span className='ml-1 text-amber-700 font-medium'>
            (Some fields may be pre-filled from your previous orders)
          </span>
        )}
      </p>

      {loadingPreviousData && (
        <div className='rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800'>
          Loading your previous pickup details...
        </div>
      )}

      {/* Preferred Pickup Date */}
      <div>
        <label className='mb-2 flex items-center gap-2 text-sm font-medium text-gray-700'>
          <Calendar className='h-4 w-4' />
          Preferred Pickup Date <span className='text-red-500'>*</span>
        </label>
        <input
          type='date'
          value={details.preferredPickupDate}
          onChange={(e) => updateDetails('preferredPickupDate', e.target.value)}
          min={getMinDate()}
          max={getMaxDate()}
          required
          className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
        />
        <p className='mt-1 text-xs text-gray-500'>
          Please select a date at least 24 hours in advance
        </p>
      </div>

      {/* Preferred Pickup Time */}
      <div>
        <label className='mb-2 flex items-center gap-2 text-sm font-medium text-gray-700'>
          <Clock className='h-4 w-4' />
          Preferred Pickup Time <span className='text-red-500'>*</span>
        </label>
        <select
          value={details.preferredPickupTime}
          onChange={(e) => updateDetails('preferredPickupTime', e.target.value)}
          required
          className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
        >
          <option value=''>Select a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <p className='mt-1 text-xs text-gray-500'>
          Operating hours: Monday - Saturday, 9:00 AM - 6:00 PM
        </p>
      </div>

      {/* Different Person Collecting */}
      <div>
        <label className='mb-2 flex items-center gap-2'>
          <input
            type='checkbox'
            checked={isDifferentPerson}
            onChange={(e) => {
              setIsDifferentPerson(e.target.checked)
              if (!e.target.checked) {
                updateDetails('collectingPersonName', '')
                updateDetails('collectingPersonPhone', '')
                updateDetails('collectingPersonRelationship', '')
              }
            }}
            className='h-4 w-4 text-amber-600 focus:ring-amber-500'
          />
          <span className='text-sm font-medium text-gray-700'>
            Someone else will collect the order
          </span>
        </label>
      </div>

      {/* Collecting Person Details */}
      {isDifferentPerson && (
        <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4'>
          <h4 className='text-sm font-semibold text-gray-900'>
            Person Collecting Details
          </h4>
          
          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Full Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              value={details.collectingPersonName || ''}
              onChange={(e) => updateDetails('collectingPersonName', e.target.value)}
              required={isDifferentPerson}
              placeholder='Enter full name'
              className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
            />
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Phone Number <span className='text-red-500'>*</span>
            </label>
            <input
              type='tel'
              value={details.collectingPersonPhone || ''}
              onChange={(e) => updateDetails('collectingPersonPhone', e.target.value)}
              required={isDifferentPerson}
              placeholder='0977123456'
              className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
            />
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Relationship to Customer
            </label>
            <select
              value={details.collectingPersonRelationship || ''}
              onChange={(e) => updateDetails('collectingPersonRelationship', e.target.value)}
              className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
            >
              <option value=''>Select relationship</option>
              <option value='family_member'>Family Member</option>
              <option value='friend'>Friend</option>
              <option value='colleague'>Colleague</option>
              <option value='employee'>Employee</option>
              <option value='other'>Other</option>
            </select>
          </div>
        </div>
      )}

      {/* ID Verification */}
      <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4'>
        <h4 className='text-sm font-semibold text-gray-900 flex items-center gap-2'>
          <FileText className='h-4 w-4' />
          ID Verification (Required for Collection)
        </h4>
        
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            ID Type <span className='text-red-500'>*</span>
          </label>
          <select
            value={details.idType || 'nrc'}
            onChange={(e) => updateDetails('idType', e.target.value as any)}
            required
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
          >
            <option value='nrc'>NRC (National Registration Card)</option>
            <option value='passport'>Passport</option>
            <option value='drivers_license'>Driver's License</option>
            <option value='other'>Other</option>
          </select>
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            ID Number <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={details.idNumber || ''}
            onChange={(e) => updateDetails('idNumber', e.target.value)}
            required
            placeholder='Enter ID number'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
          />
          <p className='mt-1 text-xs text-gray-500'>
            Please bring this ID when collecting your order
          </p>
        </div>
      </div>

      {/* Vehicle Information */}
      <div>
        <label className='mb-2 flex items-center gap-2 text-sm font-medium text-gray-700'>
          <Car className='h-4 w-4' />
          Vehicle Information (Optional)
        </label>
        <input
          type='text'
          value={details.vehicleInfo || ''}
          onChange={(e) => updateDetails('vehicleInfo', e.target.value)}
          placeholder='e.g., Toyota Hilux, White, ABC 1234'
          className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
        />
        <p className='mt-1 text-xs text-gray-500'>
          Helpful for large items or if you need assistance loading
        </p>
      </div>

      {/* Special Instructions */}
      <div>
        <label className='mb-2 block text-sm font-medium text-gray-700'>
          Special Instructions or Notes
        </label>
        <textarea
          value={details.specialInstructions || ''}
          onChange={(e) => updateDetails('specialInstructions', e.target.value)}
          rows={3}
          placeholder='Any special requirements, access instructions, or notes for our team...'
          className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
        />
      </div>

      {/* Important Notice */}
      <div className='rounded-lg border border-amber-300 bg-amber-50 p-4'>
        <p className='text-sm font-semibold text-amber-900 mb-2'>
          ⚠️ Important Reminders:
        </p>
        <ul className='list-inside list-disc space-y-1 text-xs text-amber-800'>
          <li>Please bring a valid ID matching the details above</li>
          <li>Have the exact cash amount ready (we may not have change)</li>
          <li>Arrive during your selected time slot</li>
          <li>We'll notify you when your order is ready for pickup</li>
        </ul>
      </div>
    </div>
  )
}

