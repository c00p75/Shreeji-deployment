'use client'

import { useState } from 'react'
import { Package, Pencil } from 'lucide-react'

interface Address {
  id: string
  name: string
  address: string
  phone: string
}

interface DeliveryAddressSectionProps {
  selectedAddressId: string | null
  onAddressSelect: (id: string) => void
  onAddAddress: () => void
}

const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'Suki Sind',
    address: '124.rd Cross. D S Croad. Kanakapura. Bangalore, Karnataka - 560078',
    phone: '08025908063',
  },
  {
    id: '2',
    name: 'David',
    address: '124.rd Cross. D S Croad. Kanakapura. Bangalore, Karnataka - 560078',
    phone: '08025908063',
  },
]

export default function DeliveryAddressSection({
  selectedAddressId,
  onAddressSelect,
  onAddAddress,
}: DeliveryAddressSectionProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <Package className='h-5 w-5 text-[#544829]' />
        <h2 className='text-xl font-semibold text-gray-900'>Delivery address</h2>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {mockAddresses.map((address) => (
          <div
            key={address.id}
            onClick={() => onAddressSelect(address.id)}
            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
              selectedAddressId === address.id
                ? 'border-[var(--shreeji-primary)] bg-white'
                : 'border-gray-200 bg-white hover:border-[var(--shreeji-secondary)]'
            }`}
          >
            {selectedAddressId === address.id && (
              <div className='absolute right-2 top-2'>
                <div className='flex h-6 w-6 items-center justify-center rounded-full bg-[var(--shreeji-primary)]'>
                  <svg className='h-4 w-4 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                </div>
              </div>
            )}
            <div className='pr-8'>
              <div className='mb-2 flex items-center justify-start gap-1'>
                <h3 className='font-semibold text-gray-900'>{address.name}</h3>
                <div className='group relative'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle edit
                    }}
                    className='flex items-center justify-center rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-[var(--shreeji-primary)]'
                    aria-label='Edit address'
                  >
                    <Pencil className='h-4 w-4' />
                  </button>
                  <div className='invisible absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:visible group-hover:opacity-100'>
                    Edit
                    <div className='absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900'></div>
                  </div>
                </div>
              </div>
              <p className='text-sm text-gray-600'>{address.address}</p>
              <p className='mt-2 text-sm text-gray-600'>Mobile No: {address.phone}</p>
            </div>
          </div>
        ))}

        <button
          onClick={onAddAddress}
          className='flex min-h-[120px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-100'
        >
          <svg className='mb-2 h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
          </svg>
          <span className='text-sm font-medium'>Add Address</span>
        </button>
      </div>
    </div>
  )
}

