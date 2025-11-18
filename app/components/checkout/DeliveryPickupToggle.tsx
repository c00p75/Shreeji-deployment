'use client'

import { Truck, Store } from 'lucide-react'

interface DeliveryPickupToggleProps {
  fulfillmentType: 'pickup' | 'delivery'
  onFulfillmentTypeChange: (type: 'delivery' | 'pickup') => void
}

export default function DeliveryPickupToggle({
  fulfillmentType,
  onFulfillmentTypeChange,
}: DeliveryPickupToggleProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <Truck className='h-5 w-5 text-[#544829]' />
        <h2 className='text-xl font-semibold text-gray-900'>Fulfillment Method</h2>
      </div>

      <div className='grid grid-cols-2 gap-4'>

        <button
          type='button'
          onClick={() => onFulfillmentTypeChange('pickup')}
          className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 p-6 transition-all ${
            fulfillmentType === 'pickup'
              ? 'border-[var(--shreeji-primary)] bg-[var(--shreeji-primary)] text-white'
              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
          }`}
        >
          <Store className={`h-8 w-8 ${fulfillmentType === 'pickup' ? 'text-white' : 'text-gray-600'}`} />
          <div className='text-center'>
            <p className='font-semibold'>Pickup</p>
            <p className='text-xs opacity-80'>Collect from our store</p>
          </div>
        </button>

        <button
          type='button'
          onClick={() => onFulfillmentTypeChange('delivery')}
          className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 p-6 transition-all ${
            fulfillmentType === 'delivery'
              ? 'border-[var(--shreeji-primary)] bg-[var(--shreeji-primary)] text-white'
              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
          }`}
        >
          <Truck className={`h-8 w-8 ${fulfillmentType === 'delivery' ? 'text-white' : 'text-gray-600'}`} />
          <div className='text-center'>
            <p className='font-semibold'>Delivery</p>
            <p className='text-xs opacity-80'>We'll deliver to your address</p>
          </div>
        </button>
      </div>
    </div>
  )
}

