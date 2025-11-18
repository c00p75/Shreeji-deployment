'use client'

export default function CheckoutTopBar() {
  return (
    <div className='bg-blue-600 px-4 py-2'>
      <div className='flex items-center gap-2'>
        <div className='flex gap-1.5'>
          <div className='h-3 w-3 rounded-full bg-red-500'></div>
          <div className='h-3 w-3 rounded-full bg-yellow-500'></div>
          <div className='h-3 w-3 rounded-full bg-green-500'></div>
        </div>
      </div>
    </div>
  )
}

