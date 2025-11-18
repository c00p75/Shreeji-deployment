'use client'

interface CheckoutNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  canProceed: boolean
  isLastStep: boolean
  isProcessing?: boolean
  nextButtonLabel?: string
}

export default function CheckoutNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  canProceed,
  isLastStep,
  isProcessing = false,
  nextButtonLabel,
}: CheckoutNavigationProps) {
  return (
    <div className='mt-8 flex items-center justify-between border-t border-gray-200 pt-6'>
      <button
        type='button'
        onClick={onPrevious}
        disabled={currentStep === 1}
        className='rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
      >
        Previous
      </button>

      <button
        type='button'
        onClick={onNext}
        disabled={!canProceed || isProcessing}
        className='rounded-lg bg-[var(--shreeji-primary)] px-8 py-2.5 font-semibold text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {isProcessing
          ? 'Processing...'
          : isLastStep
            ? nextButtonLabel || 'Complete Order'
            : nextButtonLabel || 'Continue'}
      </button>
    </div>
  )
}

