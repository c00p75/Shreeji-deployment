'use client'

interface CheckoutStepsProps {
  currentStep: number
  totalSteps: number
  steps: { label: string; number: number }[]
}

export default function CheckoutSteps({ currentStep, totalSteps, steps }: CheckoutStepsProps) {
  return (
    <div className='mb-8 -mr-[40%]'>
      <div className='flex items-center justify-between'>
        {steps.map((step, index) => (
          <div key={step.number} className='flex flex-1 items-center'>
            <div className='flex flex-col items-center'>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  currentStep >= step.number
                    ? 'border-[var(--shreeji-primary)] bg-[var(--shreeji-primary)] text-white'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {currentStep > step.number ? (
                  <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                ) : (
                  <span className='text-sm font-semibold'>{step.number}</span>
                )}
              </div>
              <p
                className={`mt-2 text-xs font-medium ${
                  currentStep >= step.number ? 'text-[var(--shreeji-primary)]' : 'text-gray-400'
                }`}
              >
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 transition-all ${
                  currentStep > step.number ? 'bg-[var(--shreeji-primary)]' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

