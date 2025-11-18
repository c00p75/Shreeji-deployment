'use client'

import { MapPin } from 'lucide-react'

export default function PickupLocationSection() {
  return (
    <div className='space-y-6'>
      <div className='space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6'>
        <div className='flex items-center gap-3'>
          <MapPin className='h-5 w-5 text-[#544829]' />
          <h3 className='text-lg font-semibold text-gray-900'>Pickup Location</h3>
        </div>

        <div className='space-y-2 text-sm text-gray-700'>
          <p className='font-semibold text-gray-900'>Shreeji House</p>
          <p>Plot No. 1209, Addis Ababa Drive</p>
          <p>Lusaka, Zambia</p>
          <p className='mt-4'>
            <span className='font-semibold'>Phone:</span> +260 97 774 0588
          </p>
          <p>
            <span className='font-semibold'>Hours:</span> Mon - Sat: 9:00 AM - 6:00 PM
          </p>
        </div>
    {/* Google Map */}
    <div className='rounded-2xl overflow-hidden shadow-lg'>
        <iframe
          className='w-full h-[400px]'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.5344434981585!2d28.307104199999998!3d-15.401679699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19408b36cfc88f83%3A0x35e0f42d1a0f1487!2sShreeji%20House!5e0!3m2!1sen!2szm!4v1743500618985!5m2!1sen!2szm'
          loading='lazy'
          allowFullScreen
          referrerPolicy='no-referrer-when-downgrade'
          title='Shreeji House Location'
        ></iframe>
      </div>
        <div className='mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800'>
          <p className='font-semibold'>Pickup Instructions:</p>
          <p className='mt-1'>Please bring a valid ID and your order confirmation when collecting your items. We'll notify you when your order is ready for pickup.</p>
        </div>
      </div>
    </div>
  )
}

